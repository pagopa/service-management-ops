import { SelfcareApiClient } from "../../clients/selfcare";
import { Command, Flags } from "@oclif/core";
import { getRequiredStringEnv } from "@pagopa/io-functions-commons/dist/src/utils/env";
import chalk from "chalk";
import cli from "cli-ux";
import { constVoid, flow, pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { errorsToError } from "../../utils/conversions";
import { EnvEnum, RoleEnum } from "../../generated/selfcare/Person";
import { DelegateInfo } from "../../definitions/selfcare";

export class AddDelegate extends Command {
  public static description = "Add delegate on Selfcare";

  // tslint:disable-next-line: readonly-array
  public static examples = ["$ service-management-ops selfcare:add-delegate '{}'"];

  // tslint:disable-next-line: readonly-array
  public static flags = {
    institutionTaxCode: Flags.string({
      char: 'i',
      name: "institutionTaxCode",
      required: true,
      description: "Selfcare institutionTaxCode",
    }),

    productId: Flags.string({
      char: 'p',
      name: "productId",
      required: true,
      description: "Selfcare productId",
    }),

    email: Flags.string({
      char: 'e',
      name: "email",
      required: true,
      description: "Selfcare delegate's email",
    }),

    name: Flags.string({
      char: 'n',
      name: "name",
      required: true,
      description: "Selfcare delegate's name",
    }),

    surname: Flags.string({
      char: 's',
      name: "surname",
      required: true,
      description: "Selfcare delegate's surname",
    }),

    taxCode: Flags.string({
      char: 't',
      name: "taxCode",
      required: true,
      description: "Selfcare delegate's taxCode",
    }),
  };

  // Run the command
  public async run(): Promise<void> {
    const { flags } = await this.parse(AddDelegate);
    // tslint:disable-next-line: no-console
    cli.action.start(
      chalk.blue.bold(`Executing Manual onboarding on Selfcare`),
      chalk.blueBright.bold("Running"),
      {
        stdout: true,
      }
    );

    return pipe(
      flags,
      DelegateInfo.decode,
      E.mapLeft(errorsToError),
      TE.fromEither,
      TE.chain(delegateInfo => 
      this.addDelegate(
        SelfcareApiClient(
          getRequiredStringEnv("SELFCARE_BASE_URL"),
          getRequiredStringEnv("SELFCARE_OCP_APIM")
        ),
        delegateInfo
      )),
      TE.bimap(
        (error) => {
          cli.action.stop(chalk.red(`Error : ${error}`));
        },
        () => {
          cli.action.stop(chalk.green(`Manual Onboarding Completed!`));
        }
      ),
      TE.toUnion
    )();
  }

  private addDelegate = (
    apiClient: ReturnType<SelfcareApiClient>,
    delegateInfo: DelegateInfo
  ) =>
    pipe(
      ({
          institutionTaxCode: delegateInfo.institutionTaxCode,
          productId: delegateInfo.productId,
          sendCreateUserNotificationEmail: false,
          users: [
            {
              ...delegateInfo,
              env: EnvEnum.ROOT,
              productRole: "admin",
              role: RoleEnum.SUB_DELEGATE,
              roleLabel: "Amministratore"
            }
          ]
        
      }),
      body => TE.tryCatch(
          () =>
            apiClient.onboardingInstitutionUsersUsingPOST({ body }),
          E.toError
        ),
      TE.chain(flow(E.mapLeft(errorsToError), TE.fromEither)),
      TE.filterOrElse(
        (response) => response.status == 200,
        (r) =>
          Error(
            `onboardingInstitutionUsersUsingPOST ERROR| status=${r.status}, error=${r.value}`
          )
      ),
      TE.map(constVoid)
    );
}
