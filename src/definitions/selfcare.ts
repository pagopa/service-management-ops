import {
  EmailString,
  FiscalCode,
  NonEmptyString,
  OrganizationFiscalCode,
} from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const addDelegateCommonParams = t.type({
  institutionTaxCode: OrganizationFiscalCode,
  productId: NonEmptyString,
});

export type addDelegateCommonParams = t.TypeOf<typeof addDelegateCommonParams>;

export const DelegateInfo = t.type({
  email: EmailString,
  name: NonEmptyString,
  surname: NonEmptyString,
  taxCode: FiscalCode,
});

export type DelegateInfo = t.TypeOf<typeof DelegateInfo>;

export const AddDelegatesParams = t.intersection([
  addDelegateCommonParams,
  t.type({ delegates: t.readonlyArray(DelegateInfo) }),
]);

export type AddDelegatesParams = t.TypeOf<typeof AddDelegatesParams>;
