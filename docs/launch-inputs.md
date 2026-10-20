# Internal launch inputs — Vantrex

Internal only. Not published on the website. Verified company facts live in
`lib/config.ts`; this file tracks what is still missing. Do not fill these in
by guessing.

## Verified and already implemented

- Legal entity: VANTREX LLC, a Florida Limited Liability Company.
- Florida document number: L26000141168 (a Florida document number — not an
  EIN, financial-services license, or regulatory approval).
- Principal and mailing address: 410 Georgian Park Drive, Jupiter, FL 33458,
  United States. Labelled "Principal and mailing address" in public copy; not
  described as a staffed office or trading floor.
- Florida record (Sunbiz) URL is stored in `lib/config.ts` and linked from
  /legal. The record was checked on 20 October 2026 (filing date March 9,
  2026; status ACTIVE at check time). Recheck status before publication.
- No analytics, tag managers, advertising pixels, embeds, or other optional
  third-party integrations exist in the codebase. The consent system is
  therefore necessary-only; see `lib/consent.ts` and the Cookie Policy.

## Still needed before launch

1. **Production domain.** Set `SITE_URL` (see `.env.example`). Until then,
   canonicals are omitted and the sitemap falls back to localhost.
2. **Official social URLs.** LinkedIn company page, Telegram, and X URLs are
   `null` in `lib/config.ts` (`siteConfig.socials`), so **no social links are
   currently visible** on the public site. Add each verified URL there; the
   footer "Connect" area appears automatically. Do not publish guessed
   handles.
3. **Monitored contact delivery.** Contact and privacy-request forms deliver
   only when the server-side SMTP variables are set (`SMTP_HOST`,
   `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`).
   Without them, both forms honestly report that delivery is unavailable and
   nothing is stored. Confirm the monitored inbox that receives both
   enquiry types, and the responsible role for triage.
4. **Privacy operations.** Confirm: responsible role for privacy requests,
   internal response deadlines actually applied, systems/vendors to search
   for a request, retention exceptions (e.g. legal holds), and how
   completion is recorded. The public pages describe the process without
   promising a single worldwide deadline.
5. **Legal review.** Owner/legal confirmation of the drafted Privacy Policy,
   Cookie Policy, Terms of Use, and Risk Disclosure, including which
   jurisdictions' privacy regimes actually apply to Vantrex's activities.
   Florida incorporation alone does not establish GDPR/UK GDPR/CCPA scope.
6. **Retention facts.** Confirm how long website enquiries and privacy
   requests are retained by the receiving mailbox/system so the Privacy
   Policy's retention criteria can be made more specific if desired.

## Operating instructions

- **Policies:** Edit the copy in `lib/legal.ts`, then update
  `siteConfig.policies` in `lib/config.ts` (version + `lastRevised`) in the
  same change. Dates never update automatically.
- **Social URLs:** Set the verified URL in `siteConfig.socials`. Only
  `https:` destinations render.
- **Cookie inventory:** Keep `lib/cookies.ts` in sync with reality. If an
  optional integration is ever added, register it in
  `siteConfig.consent.optionalIntegrations`, add its inventory rows, and
  gate its loading on the stored consent state before shipping.
- **Company facts:** Change entity details only in `lib/config.ts`; footer,
  legal pages, and structured data all read from there.
