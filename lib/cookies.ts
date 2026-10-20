/**
 * Maintainable inventory of cookies and similar technologies this website
 * actually uses. The Cookie Policy page renders this table. Keep it in
 * sync with reality: do not list analytics, advertising, or social-media
 * technologies that are not implemented.
 *
 * Audit result (October 2026): the site sets no tracking cookies and loads
 * no optional third-party integrations. The only browser storage created
 * by the site itself is the consent-preference record below.
 */

export type CookieCategory = "Necessary";

export type CookieInventoryItem = {
  identifier: string;
  provider: string;
  purpose: string;
  category: CookieCategory;
  duration: string;
  loadsWhen: string;
};

export const cookieInventory: CookieInventoryItem[] = [
  {
    identifier: "vantrex-consent (browser local storage)",
    provider: "Vantrex (this website)",
    purpose:
      "Remembers that you have seen the cookie notice and any cookie preferences you save, so the site can respect them on later visits.",
    category: "Necessary",
    duration: "Up to 180 days, or until you clear your browser storage",
    loadsWhen: "Created only when you dismiss the cookie notice or save cookie preferences",
  },
];

/** True when the audit basis changes; flip only with a real integration. */
export const hasOptionalTechnologies = false;
