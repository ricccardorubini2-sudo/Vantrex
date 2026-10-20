export const privacyRequestTypes = [
  "Access my personal information",
  "Correct my personal information",
  "Request deletion",
  "Withdraw a relevant consent or make a privacy choice",
  "Other privacy enquiry",
] as const;

export type PrivacyRequestType = (typeof privacyRequestTypes)[number];

/** Request type that is handled by an immediate control, not the email form. */
export const immediateChoiceType: PrivacyRequestType = "Withdraw a relevant consent or make a privacy choice";

export const privacyRequestTypeParams: Record<string, PrivacyRequestType> = {
  access: "Access my personal information",
  correction: "Correct my personal information",
  deletion: "Request deletion",
  choice: immediateChoiceType,
  other: "Other privacy enquiry",
};

export const privacyRequestFields = {
  email: "email",
  requestType: "requestType",
  name: "name",
  company: "company",
  region: "region",
  details: "details",
  honeypot: "vx_company_site",
} as const;

export const privacyFieldLimits = {
  email: 254,
  name: 120,
  company: 160,
  region: 120,
  details: 2000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PrivacyRequestInput = {
  email: string;
  requestType: PrivacyRequestType;
  name: string;
  company: string;
  region: string;
  details: string;
};

export type PrivacyRequestErrors = Partial<Record<"email" | "requestType" | "details", string>>;

export function resolvePrivacyRequestParam(value: string | null | undefined): PrivacyRequestType | null {
  if (!value) return null;
  return privacyRequestTypeParams[value] ?? null;
}

function clean(value: string, allowNewlines: boolean) {
  const withoutControls = allowNewlines
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, "");
  return withoutControls.trim();
}

export function parsePrivacyRequest(input: unknown):
  | { ok: true; data: PrivacyRequestInput }
  | { ok: false; honeypot: true }
  | { ok: false; honeypot?: false; errors: PrivacyRequestErrors } {
  const source = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const read = (key: string) => (typeof source[key] === "string" ? source[key] : "");

  if (clean(read(privacyRequestFields.honeypot), false)) return { ok: false, honeypot: true };

  const email = clean(read(privacyRequestFields.email), false);
  const requestType = clean(read(privacyRequestFields.requestType), false);
  const name = clean(read(privacyRequestFields.name), false);
  const company = clean(read(privacyRequestFields.company), false);
  const region = clean(read(privacyRequestFields.region), false);
  const details = clean(read(privacyRequestFields.details), true);
  const errors: PrivacyRequestErrors = {};

  if (!email || !emailPattern.test(email) || email.length > privacyFieldLimits.email) {
    errors.email = "Enter a valid contact email.";
  }
  if (!privacyRequestTypes.includes(requestType as PrivacyRequestType)) {
    errors.requestType = "Select a request type.";
  }
  if (name.length > privacyFieldLimits.name) errors.details = "One of the fields is too long.";
  if (company.length > privacyFieldLimits.company) errors.details = "One of the fields is too long.";
  if (region.length > privacyFieldLimits.region) errors.details = "One of the fields is too long.";
  if (details.length > privacyFieldLimits.details) errors.details = "Details are too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: { email, requestType: requestType as PrivacyRequestType, name, company, region, details },
  };
}
