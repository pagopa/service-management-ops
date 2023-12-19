import { EmailString, FiscalCode, NonEmptyString, OrganizationFiscalCode } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const DelegateInfo = t.type({
    institutionTaxCode: OrganizationFiscalCode,
    productId: NonEmptyString,
    email: EmailString,
    name: NonEmptyString,
    surname: NonEmptyString,
    taxCode: FiscalCode
});

export type DelegateInfo = t.TypeOf<typeof DelegateInfo>;