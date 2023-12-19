import { Command, Args } from "@oclif/core";
import chalk from "chalk";
import cli from "cli-ux";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
// tslint:disable-next-line: no-submodule-imports
import { getRequiredStringEnv } from "@pagopa/io-functions-commons/dist/src/utils/env";
import { ApiClient } from "../../clients/admin";
import { Service } from "../../generated/admin/Service";
import { errorsToError } from "../../utils/conversions";
import { flow, pipe } from "fp-ts/lib/function";

export class ServiceGet extends Command {
  public static description = "Get the service by serviceId";

  // tslint:disable-next-line: readonly-array
  public static examples = [`$ io-ops api-service:get  SERVICEID`];

  // tslint:disable-next-line: readonly-array
  public static args = {
    serviceId: Args.string({
      description: "id of the service",
      name: "serviceId",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    // can get args as an object
    const { args } = await this.parse(ServiceGet);
    // tslint:disable-next-line: no-console
    cli.action.start(
      chalk.blue.bold(`Getting info for service ${args.serviceId}`),
      chalk.blueBright.bold("Running"),
      {
        stdout: true,
      }
    );
    return pipe(
      this.get(args.serviceId),
      TE.bimap(
        (error) => {
          cli.action.stop(chalk.red(`Error : ${error}`));
        },
        (result) => {
          cli.action.stop(chalk.green(`Response: ${JSON.stringify(result)}`));
        }
      ),
      TE.toUnion
    )();
  }

  private getApiClient = () =>
    ApiClient(
      getRequiredStringEnv("BASE_URL_ADMIN"),
      getRequiredStringEnv("OCP_APIM")
    );

  private get = (serviceId: string): TE.TaskEither<Error, Service> =>
    pipe(
      TE.tryCatch(
        () => this.getApiClient().getService({ service_id: serviceId }),
        E.toError
      ),
      TE.chain(flow(E.mapLeft(errorsToError), TE.fromEither)),
      TE.chain(
        TE.fromPredicate(
          (response) => response.status === 200,
          () => Error(`Could not read service ${serviceId}`)
        )
      ),
      TE.map((response) => response.value),
      TE.chain(flow(Service.decode, E.mapLeft(errorsToError), TE.fromEither))
    );
}
