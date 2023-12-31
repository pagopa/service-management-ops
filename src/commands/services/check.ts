/**
 * this command allows to collect all services information
 * and print them in a csv format
 */
import * as cosmos from "@azure/cosmos";
import { Command } from "@oclif/core";
import cli from "cli-ux";
import { readableReport } from "@pagopa/ts-commons/lib/reporters";
import { ServicePublic } from "../../definitions/ServicePublic";
import { pickAzureConfig } from "../../utils/azure";
import * as E from "fp-ts/lib/Either";
import { getRequiredStringEnv } from "@pagopa/io-functions-commons/dist/src/utils/env";
import {
  asyncIteratorToArray,
  flattenAsyncIterator,
  mapAsyncIterable,
} from "@pagopa/io-functions-commons/dist/src/utils/async";

interface IGroupOptions {
  [key: string]: (a: ServicePublic, b: ServicePublic) => number;
}

/**
 * Define all predicates used for output sorting
 * The key is the sorting name and the value is a function that compares
 * 2 services and returns a number:
 * 0 => services are equal
 * -1 => service (a) comes before service (b)
 * 1 => service (a) comes after service (b)
 */
const groupByPredicates: IGroupOptions = {
  OrganizationName: (a: ServicePublic, b: ServicePublic) =>
    a.organizationName.localeCompare(b.organizationName),
  ServiceName: (a: ServicePublic, b: ServicePublic) =>
    a.serviceName.localeCompare(b.serviceName),
  Visibility: (a: ServicePublic, b: ServicePublic) => {
    if (a.isVisible && b.isVisible) {
      if (a.isVisible === b.isVisible) {
        return 0;
      }
      if (a.isVisible && !b.isVisible) {
        return -1;
      }
      return 1;
    } else if (a.isVisible) {
      return -1;
    } else if (b.isVisible) {
      return 1;
    }
    return 0;
  },
};

export default class ServicesCheck extends Command {
  // tslint:disable-next-line: cognitive-complexity
  public async run(): Promise<void> {
    try {
      const config = await pickAzureConfig();
      cli.action.stop();
      const cosmosConnectionString = getRequiredStringEnv(
        "COSMOS_CONNECTION_STRING"
      );
      const client = new cosmos.CosmosClient(cosmosConnectionString);
      const database = client.database(config.cosmosDatabaseName);
      const container = database.container(config.cosmosServicesContainer);

      // retrieve all visible services
      const responseIterator = container.items
        .query({
          query: `SELECT * FROM c`,
        })
        .getAsyncIterator();

      const itemsList = await asyncIteratorToArray(
        flattenAsyncIterator(
          mapAsyncIterable(
            responseIterator,
            (feedResponse) => feedResponse.resources
          )[Symbol.asyncIterator]()
        )
      );
      if (itemsList === undefined || itemsList.length === 0) {
        cli.log("no services found");
        this.exit();
        return;
      }
      const services = itemsList.reduce(
        (acc: ReadonlyArray<ServicePublic>, current) => {
          const maybeService = ServicePublic.decode(current);
          if (E.isRight(maybeService)) {
            // we want to keep only services with max version
            const versionIndex = acc.findIndex(
              (s) => s.serviceId === maybeService.right.serviceId
            );
            // if we have already collected the same service (same id) with a less version
            // we remove it from the collection in place of the new one

            if (
              versionIndex >= 0 &&
              acc[versionIndex].version < maybeService.right.version
            ) {
              return [
                ...acc.filter(
                  (s) => s.serviceId !== maybeService.right.serviceId
                ),
                maybeService.right,
              ];
            }

            return [...acc, maybeService.right];
          } else {
            // if the decoding fails we raise an exception with an Error
            // describing what is happened
            throw new Error(readableReport(maybeService.left));
          }
        },
        []
      );

      const columns = {
        orgName: {
          header: "Organization Name",
          // tslint:disable-next-line: no-any
          get: (row: any) =>
            `${row.organizationName} [${row.organizationFiscalCode}]`,
        },
        name: {
          header: "Service Name",
          // tslint:disable-next-line: no-any
          get: (row: any) =>
            `${row.serviceName} [${row.version} - ${row.serviceId}]`,
        },
        isVisible: {
          header: "is Visible",
          // tslint:disable-next-line: no-any
          get: (row: any) => (row.isVisible ? "✅" : "❌"),
        },
      };
      const predicatesName = Object.keys(groupByPredicates);
      const groupOptions = predicatesName
        .map((go: string, index: number) => `${index + 1} - ${go}`)
        .join("\n");
      // tslint:disable-next-line: no-let
      let groupOptionIndex = 0;
      groupOptionIndex = await cli.prompt(
        `Group results by\n${groupOptions}\n`,
        { default: "0" }
      );
      // if groupindex is out of possible range, fallback is index 0
      if (
        isNaN(groupOptionIndex) ||
        (groupOptionIndex <= 0 && groupOptionIndex >= predicatesName.length)
      ) {
        groupOptionIndex = 0;
      } else {
        // convert user choice to index-based
        groupOptionIndex -= 1;
      }
      const sortPredicate = groupByPredicates[predicatesName[groupOptionIndex]];
      const servicesSortedByOrganizationName = [...services].sort(
        sortPredicate
      );
      cli.table(servicesSortedByOrganizationName, columns);
    } catch (e) {
      cli.log(String(e));
      this.error(String(e));
    }

    return Promise.resolve();
  }
}
