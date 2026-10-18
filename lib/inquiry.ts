import { inquiryCategories, inquiryParams, type InquiryCategory } from "./content";

export const inquiryFields = {
  company: "company",
  contactName: "contactName",
  email: "email",
  category: "category",
  message: "message",
  honeypot: "vx_company_site",
} as const;

export const fieldLimits = {
  company: 160,
  contactName: 120,
  email: 254,
  message: 4000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type InquiryInput = {
  company: string;
  contactName: string;
  email: string;
  category: InquiryCategory;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof typeof inquiryFields, string>>;

export function resolveInquiryParam(value: string | null | undefined): InquiryCategory | null {
  if (!value) return null;
  if (Object.prototype.hasOwnProperty.call(inquiryParams, value)) {
    return inquiryParams[value as keyof typeof inquiryParams];
  }
  return null;
}

function clean(value: string, allowNewlines: boolean) {
  const withoutControls = allowNewlines
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, "");
  return withoutControls.trim();
}

export function parseInquiry(input: unknown):
  | { ok: true; data: InquiryInput }
  | { ok: false; honeypot: true }
  | { ok: false; honeypot?: false; errors: InquiryErrors } {
  const source = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const read = (key: string) => (typeof source[key] === "string" ? source[key] : "");
  const honeypot = clean(String(read(inquiryFields.honeypot) ?? ""), false);
  if (honeypot) return { ok: false, honeypot: true };

  const company = clean(read(inquiryFields.company), false);
  const contactName = clean(read(inquiryFields.contactName), false);
  const email = clean(read(inquiryFields.email), false);
  const category = clean(read(inquiryFields.category), false);
  const message = clean(read(inquiryFields.message), true);
  const errors: InquiryErrors = {};

  if (!company) errors.company = "Enter your company name.";
  else if (company.length > fieldLimits.company) errors.company = "Company name is too long.";

  if (!contactName) errors.contactName = "Enter the contact name.";
  else if (contactName.length > fieldLimits.contactName) errors.contactName = "Contact name is too long.";

  if (!email || !emailPattern.test(email) || email.length > fieldLimits.email) {
    errors.email = "Enter a valid business email.";
  }

  if (!inquiryCategories.includes(category as InquiryCategory)) {
    errors.category = "Select an inquiry category.";
  }

  if (!message) errors.message = "Enter a message.";
  else if (message.length > fieldLimits.message) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      company,
      contactName,
      email,
      category: category as InquiryCategory,
      message,
    },
  };
}
