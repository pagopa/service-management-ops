import { SelfcareApiClient } from "../../clients/selfcare";
import { Command, Args } from "@oclif/core";
import { getRequiredStringEnv } from "@pagopa/io-functions-commons/dist/src/utils/env";
import chalk from "chalk";
import cli from "cli-ux";
import { constVoid, flow, pipe } from "fp-ts/lib/function";
import * as J from "fp-ts/lib/Json";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { OnboardingProductDto } from "../../generated/selfcare/OnboardingProductDto";
import { errorsToError } from "../../utils/conversions";

export class ManualOnboardingByBody extends Command {
  public static description = "Execute Manual Onboarding on Selfcare";

  // tslint:disable-next-line: readonly-array
  public static examples = ["$ service-management-ops selfcare:manual-onboarding-by-body '{}'"];

  // tslint:disable-next-line: readonly-array
  public static args = {
    body: Args.string({
      name: "body",
      required: true,
      description: "Selfcare manual onboarding body",
    }),
  };

  public static ocpHeader = "Ocp-Apim-Subscription-Key";

  // Run the command
  public async run(): Promise<void> {
    const { args } = await this.parse(ManualOnboardingByBody);
    // tslint:disable-next-line: no-console
    cli.action.start(
      chalk.blue.bold(`Executing Manual onboarding on Selfcare`),
      chalk.blueBright.bold("Running"),
      {
        stdout: true,
      }
    );

    return pipe(
      this.executeManualOnboardingByRawBody(
        SelfcareApiClient(
          getRequiredStringEnv("SELFCARE_BASE_URL"),
          getRequiredStringEnv("SELFCARE_OCP_APIM")
        ),
        args.body
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

  private executeManualOnboardingByRawBody = (
    apiClient: ReturnType<SelfcareApiClient>,
    rawBody: string
  ) =>
    pipe(
      rawBody,
      J.parse,
      E.mapLeft(E.toError),
      E.chain(flow(OnboardingProductDto.decode, E.mapLeft(errorsToError))),
      TE.fromEither,
      TE.chain((body) =>
        TE.tryCatch(
          () =>
            apiClient.onboardingUsingPOST({ "x-selfcare-uid": "ops", body }),
          E.toError
        )
      ),
      TE.chain(flow(E.mapLeft(errorsToError), TE.fromEither)),
      TE.filterOrElse(
        (response) => response.status == 201,
        (r) =>
          Error(
            `onboardingUsingPOST ERROR| status=${r.status}, error=${r.value}`
          )
      ),
      TE.map(constVoid)
    );
}
