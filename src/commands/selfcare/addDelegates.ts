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
import { AddDelegatesParams } from "../../definitions/selfcare";

export class AddDelegates extends Command {
  public static description = "Add delegate on Selfcare";

  // tslint:disable-next-line: readonly-array
  public static examples = ["$ service-management-ops selfcare:add-delegates "];

  // tslint:disable-next-line: readonly-array
  public static flags = {
    institutionTaxCode: Flags.string({
      char: "i",
      name: "institutionTaxCode",
      required: true,
      description: "Selfcare institutionTaxCode",
    }),

    productId: Flags.string({
      char: "p",
      name: "productId",
      required: true,
      description: "Selfcare productId",
    }),

    delegates: Flags.string({
      char: "d",
      name: "delegates",
      required: true,
      description: "Selfcare delegates",
    }),
  };

  // Run the command
  public async run(): Promise<void> {
    const { flags } = await this.parse(AddDelegates);
    // tslint:disable-next-line: no-console
    cli.action.start(
      chalk.blue.bold(`Executing Manual delegate onboarding on Selfcare`),
      chalk.blueBright.bold("Running"),
      {
        stdout: true,
      }
    );

    return pipe(
      flags,
      AddDelegatesParams.decode,
      E.mapLeft(errorsToError),
      TE.fromEither,
      TE.chain((addDelegatesParams) =>
        this.addDelegates(
          SelfcareApiClient(
            getRequiredStringEnv("SELFCARE_BASE_URL"),
            getRequiredStringEnv("SELFCARE_OCP_APIM")
          ),
          addDelegatesParams
        )
      ),
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

  private addDelegates = (
    apiClient: ReturnType<SelfcareApiClient>,
    addDelegatesParams: AddDelegatesParams
  ) =>
    pipe(
      {
        institutionTaxCode: addDelegatesParams.institutionTaxCode,
        productId: addDelegatesParams.productId,
        sendCreateUserNotificationEmail: false,
        users: addDelegatesParams.delegates.map((delegateInfo) => ({
          ...delegateInfo,
          env: EnvEnum.ROOT,
          productRole: "admin",
          role: RoleEnum.SUB_DELEGATE,
          roleLabel: "Amministratore",
        })),
      },
      (body) =>
        TE.tryCatch(
          () => apiClient.onboardingInstitutionUsersUsingPOST({ body }),
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
