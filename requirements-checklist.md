# Vantrex website requirements checklist

Statuses: Implemented, Needs configuration, Needs owner confirmation.

Verified on 17 October 2026: `npm run typecheck`, `npm run lint`, `npm test` (5 passing), and `npm run build` succeeded. Browser checks covered the four routes, 404, navigation, mobile menu, inquiry prefills, form validation, and the unconfigured delivery state at about 360, 768, 1024, and 1440 px. No horizontal page overflow was found. Mock delivery in tests is not live inbox delivery.

Reference sites (Gravity Team, Currency.com) were not inspected. The fetch was blocked, so visual decisions follow Section C of the prompt. Headings use Manrope and body text uses Inter.

| ID | Requirement | Source | Target | Status | Verification |
| --- | --- | --- | --- | --- | --- |
| A-01 | Brief is the content and scope source of truth | A, G | `lib/content.ts` | Implemented | Copy test and page review |
| A-02 | Supplied headlines, labels, CTAs, and qualifiers kept | A | All pages | Implemented | `lib/content.test.ts` and rendered pages |
| A-03 | Qualifiers kept: selected, eligible, approved, potential, agreed, available liquidity, supported, may, independent investment consideration | A | Product and group copy | Implemented | Content test |
| A-04 | Returns sentence visible beside liquidity-provider benefits | A, G §4 | `/liquidity-management` | Implemented | Browser |
| A-05 | No invented group brand, ownership, regulation, or extra relationship | A, G §1 | Group section | Implemented | Copy review |
| A-06 | No reference-site metrics, clients, logos, licenses, or history | A | All pages | Implemented | Copy review |
| A-07 | No fourth product or prohibited retail, token, staking, or dashboard features | A, G §9 | All pages | Implemented | Route and copy review |
| A-08 | No invented AUM, volumes, fees, contacts, dates, executives, or social URLs | A, G §9 | Site and config | Implemented | Copy and `.env.example` |
| A-09 | Operational facts recorded for owner confirmation, specified copy still published | A, F | `docs/launch-notes.md` | Implemented | File review |
| B-01 | Home route `/` | B | `app/page.tsx` | Implemented | Build and browser |
| B-02 | Liquidity Management `/liquidity-management` | B | `app/liquidity-management/page.tsx` | Implemented | Build and browser |
| B-03 | Market Making `/market-making` | B | `app/market-making/page.tsx` | Implemented | Build and browser |
| B-04 | Institutional OTC `/institutional-otc` | B | `app/institutional-otc/page.tsx` | Implemented | Build and browser |
| B-05 | Shared sections `/#partnerships`, `/#contact`, `/#solutions` | B | Home | Implemented | Browser |
| B-06 | Product pages link to Institutional Partnerships and the matching inquiry | B, D | Product CTAs | Implemented | Browser |
| B-07 | No separate About, Partnerships, or Contact pages | B | Routes | Implemented | Build |
| B-08 | Nav labels: Home, Solutions dropdown with three products, Contact | B, D | `SiteHeader` | Implemented | Browser, keyboard |
| B-09 | Mobile menu exposes the same destinations and closes with Escape | B, E | `SiteHeader` | Implemented | Browser |
| B-10 | Homepage sequence: hero, overview, solutions, ecosystem, group, partnerships, final CTA, contact, footer | B, G §3 | `app/page.tsx` | Implemented | Browser |
| B-11 | Hero headline, description, supporting statement, and both CTAs | G §3 | Home hero | Implemented | Browser |
| B-12 | Company overview, mission, and business-concept function represented without duplicate pages | B, G §1, Final concept | Home overview, solutions, group | Implemented | Copy review |
| B-13 | Three solution names, headlines, descriptions, and dedicated links | G §3 | `#solutions` | Implemented | Browser |
| B-14 | Five counterparty groups and supplier-and-user relationship | G §3 | Ecosystem | Implemented | Browser |
| B-15 | Group cards: VaultAlpha, Velorapay, Vantrex core businesses and relationships, plus group copy | G §1, §3 | Group section | Implemented | Browser |
| B-16 | Five partnership rows and partnership CTA | G §7 | `#partnerships` | Implemented | Browser |
| B-17 | Final CTA “Bring Liquidity to the Table.” with both buttons | G §3 | Home | Implemented | Browser |
| B-18 | Each product page has its eyebrow, hero, sections, services, benefits or principles, qualifications, and final CTA | B, G §4–6 | Product routes | Implemented | Browser |
| B-19 | Products stay distinct: source/manage/allocate; deploy/quote/trade; source/exchange/settle | B, G §4–6 | Product heroes | Implemented | Browser |
| C-01 | Premium institutional layout, navy / blue / silver / off-white, accent `#2D5BD1` | C, G §9 | `app/globals.css` | Implemented | Browser at four widths |
| C-02 | Manrope and Inter via centralized tokens; reference font files not copied | C | `app/layout.tsx`, CSS | Implemented | Implementation review |
| C-03 | Content width about 1200px, spacious sections, restrained cards | C | Shared layout | Implemented | Browser |
| C-04 | Reserved, replaceable logo slot; no invented group logos | C, user | `components/Logo.tsx` | Needs owner confirmation | Logo file not supplied |
| C-05 | Original lightweight graphics; group graphic matches supplied roles | C | Home group section, `HeroDecor` | Implemented | Browser |
| C-06 | No live-market widgets, charts, maps, or trader photography | C, G §9 | All pages | Implemented | Page review |
| C-07 | Hover, focus, short transitions, reduced motion, content visible without JS animation | C, E | CSS, forms, nav | Implemented | Browser; no-JS HTML response covered by unit test |
| C-08 | Anchor targets sit below the sticky header | C | CSS scroll margin | Implemented | Browser |
| D-01 | Explore Solutions → `/#solutions` | D | Home hero | Implemented | Browser |
| D-02 | Partner With Us → `/#partnerships` | D | Home hero | Implemented | Browser |
| D-03 | Become a Liquidity Partner → `/?inquiry=capital#contact` | D | Home and liquidity CTA | Implemented | Browser |
| D-04 | Request Liquidity → `/#contact` with category left to the visitor | D | Home final CTA | Implemented | Browser |
| D-05 | Discuss Market Making → `/?inquiry=market-making#contact` | D | Market making CTA | Implemented | Browser |
| D-06 | Request an OTC Quote → `/?inquiry=otc#contact` as an inquiry, not a quote screen | D | OTC CTA | Implemented | Browser |
| D-07 | Explore an Institutional Partnership → `/?inquiry=strategic#contact` | D | Partnerships | Implemented | Browser |
| D-08 | Unknown inquiry values leave the category unselected; category stays editable | D | `ContactForm` | Implemented | Browser and unit test |
| D-09 | Prefill works on cross-page navigation, direct URLs, and repeated same-page clicks | D | `ButtonLink`, `ContactForm` | Implemented | Browser |
| D-10 | No names, emails, or messages in URLs; no dead buttons or fake external links | D | Links and form | Implemented | Code review |
| E-01 | Five required fields: company, contact name, business email, category, message | E, G §8 | Contact form | Implemented | Browser |
| E-02 | Four exact inquiry categories | G §8 | Form and `lib/inquiry.ts` | Implemented | Unit test |
| E-03 | Inline errors, submitting state, preserved values, no duplicate submit | E | `ContactForm` | Implemented | Browser |
| E-04 | Success only after delivery is accepted; unconfigured state does not claim a send | E | API and form | Implemented | Unit test and browser |
| E-05 | Server validation, sanitization, honeypot, and request throttling | E | `lib/handle-contact.ts` | Implemented | Unit test |
| E-06 | SMTP via environment variables; secrets server-only; blank inbox left blank | E | `lib/mailer.ts`, `.env.example` | Needs configuration | No mailbox was supplied |
| E-07 | Next.js App Router, TypeScript, Tailwind, lockfile, server contact route | E | Project root | Implemented | Build |
| E-08 | Central copy and shared chrome | E | `lib/content.ts`, components | Implemented | File review |
| E-09 | Semantic headings, keyboard access, focus, one H1, metadata, favicon, 404 | E | Layout and pages | Implemented | Browser and build |
| E-10 | Canonical URLs and sitemap from `SITE_URL` only; no invented production domain | E | `lib/site.ts`, sitemap, robots | Needs configuration | Blank until the owner sets `SITE_URL` |
| E-11 | Footer: brand, descriptor, products, Partnerships, Contact, copyright; no empty legal pages | E | `SiteFooter` | Implemented | Browser |
| E-12 | README for install, content, form, build, and deployment | E, F | `README.md` | Implemented | File review |
| E-13 | Local build does not require logo or SMTP | E | Build | Implemented | `npm run build` |
| F-01 | Checklist reconciled after build, typecheck, lint, tests, and browser review | F | This file | Implemented | Updated at handoff |
| G-01 | Final brand messages match the messaging table | G §10 | Page H1s | Implemented | Content test |
| G-02 | Selected asset examples remain in liquidity and OTC services | G §4, §6 | Service cards | Implemented | Content test |
| G-03 | Managed inventory plus external liquidity remains on the OTC page | G §6 | OTC advantage section | Implemented | Browser |
| G-04 | Velorapay payment and settlement relationship remains | G §1, §6 | Group and OTC | Implemented | Browser |
| G-05 | Conditional VaultAlpha investment-introduction sentence remains | G §5 | Market making | Implemented | Browser |
