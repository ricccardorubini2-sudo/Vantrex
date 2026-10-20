/**
 * Central, typed company and site configuration.
 *
 * Only verified facts belong here. Unknown operational values (production
 * domain, monitored inboxes, official social URLs) stay `null` and are
 * tracked in docs/launch-inputs.md instead of being guessed. Public pages
 * hide anything that is null.
 *
 * The production site URL itself is read from the SITE_URL environment
 * variable via getSiteUrl() in lib/site.ts; it is intentionally not
 * duplicated here.
 */

export const siteConfig = {
  brand: "Vantrex",
  legalName: "VANTREX LLC",
  entityType: "Florida Limited Liability Company",
  formationJurisdiction: "Florida, United States",
  floridaDocumentNumber: "L26000141168",
  floridaRecordUrl:
    "https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?inquirytype=EntityName&directionType=Initial&searchNameOrder=VANTREX%20L26000141168&aggregateId=flal-l26000141168-070d1725-aa5c-4a9c-8349-d5b12feec9fc&searchTerm=VANTREX&listNameOrder=VANTREX%20L200001387050",
  address: {
    street: "410 Georgian Park Drive",
    city: "Jupiter",
    state: "FL",
    postalCode: "33458",
    country: "United States",
  },
  locationDescription: "Florida, United States",
  footerDescription: "Institutional liquidity across trading, tokenized markets, and payment networks.",

  /**
   * Verified contact channels. No public email inbox has been confirmed,
   * so both stay null; the working contact routes are the homepage
   * contact form (/#contact) and the privacy-request form
   * (/privacy-request), which deliver through server-side SMTP settings.
   */
  contact: {
    generalEmail: null as string | null,
    privacyEmail: null as string | null,
    contactRoute: "/#contact",
    privacyRequestRoute: "/privacy-request",
  },

  /** Official social destinations. Null = not yet verified; link is hidden. */
  socials: {
    linkedin: null as string | null,
    telegram: null as string | null,
    x: null as string | null,
  },

  /**
   * Policy versioning. Dates are maintained manually: change them only
   * when a policy is genuinely revised. They never update automatically.
   */
  policies: {
    version: "1.0",
    effectiveDate: "2026-10-20",
    lastRevised: "2026-10-20",
  },

  /**
   * Consent implementation settings. The audit found no analytics,
   * advertising, or other optional third-party integrations, so the only
   * category is "necessary". If optional integrations are ever added,
   * register them here and gate their loading on consent state.
   */
  consent: {
    storageKey: "vantrex-consent",
    stateVersion: 1,
    lifetimeDays: 180,
    optionalIntegrations: [] as readonly string[],
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function formatPolicyDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function postalAddressLines(): string[] {
  const { street, city, state, postalCode, country } = siteConfig.address;
  return [street, `${city}, ${state} ${postalCode}`, country];
}
