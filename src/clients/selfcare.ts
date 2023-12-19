import nodeFetch from "node-fetch";
import { Client, createClient } from "../generated/selfcare/client";
import { pipe } from "fp-ts/lib/function";

export type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;

const withOcpApimSubscriptionKey =
  (token: string) =>
  (fetchApi: Fetch): Fetch =>
  async (input, init) =>
    fetchApi(input, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        ...{ ["Ocp-Apim-Subscription-Key"]: token },
      },
    });

export function SelfcareApiClient(
  baseUrl: string,
  token: string,
  fetchApi: Fetch = nodeFetch as unknown as Fetch
): Client<"bearerAuth"> {
  const selfcareFetch = pipe(
    fetchApi,
    withOcpApimSubscriptionKey(token)
  );

  return createClient<"bearerAuth">({
    baseUrl,
    fetchApi: selfcareFetch,
    withDefaults: (op) => (params) =>
      op({
        ...params,
        bearerAuth: "",
      }),
  });
}

export type SelfcareApiClient = typeof SelfcareApiClient;
