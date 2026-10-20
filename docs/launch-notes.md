# Internal launch notes

These notes are not part of the public website. The pages publish the supplied brief. They do not prove that every described capability is already operating.

## Metrics published on the homepage

Owner-supplied figures in the home metrics band (`lib/content.ts` → `metrics`):

- Liquidity Under Management: $18M
- Monthly Trading Volume: $105M
- Institutional Liquidity Partners: 10
- Connected CEXs: 8
- Institutional Clients: 12
- Supported Digital Assets: 6

Confirm these remain accurate before launch. Update the content module if any figure changes.

Liquidity Management page stat strip (`liquidityPage.stats`):

- Liquidity Under Management: $18M
- Institutional Liquidity Partners: 10
- Supported Assets: 6
- Institutional Clients: 12

Market Making page performance strip (`marketMakingPage.performance.stats`):

- Connected CEXs: 8
- DEX / DeFi Venues: 3
- Quoted Trading Pairs: 20
- Monthly Trading Volume: $75M
- Quoting Availability: 99%

Venue logos for the market-making flows are stored in `public/partners/` (Binance, OKX, Bybit, Gate, Bitget, MEXC, KuCoin, Coinstore, Uniswap, Curve, PancakeSwap).

Institutional OTC page performance strip (`otcPage.performance.stats`):

- Monthly OTC Trading Volume: $30M
- Active OTC Counterparties: 20
- Typical Transaction Size: $100K–$1.5M
- Dedicated Stablecoin Liquidity: $6M

## Needs owner confirmation

Confirm which of the following are operational before public launch. If a sentence is not yet true, say which one should change. Do not replace it with invented metrics outside the owner-supplied homepage and liquidity-page figures above.

- Liquidity sourcing for USDT, USDC, BTC, ETH, and selected digital assets.
- Liquidity pool management and deployment into selected market-making, OTC, and approved arrangements.
- Exchange market making, token and RWA secondary-market support, and DeFi liquidity provision.
- Institutional block trading, wholesale stablecoin coverage, and treasury or payment settlement liquidity.
- The VaultAlpha introduction path for suitable projects, including the independent-investment qualification.
- The Velorapay payment and settlement relationship.
- External institutional counterparty coverage.
- Legal entity details are now published from `lib/config.ts` (VANTREX LLC, Florida document number L26000141168, Jupiter, FL address) on the footer, About, and Company Information pages. No regulatory status or social profile has been supplied; see `docs/launch-inputs.md`.

## Supporting pages added (October 2026)

- `/about`, `/legal`, `/privacy-policy`, `/cookie-policy`, `/terms-of-use`,
  `/risk-disclosure`, `/privacy-request`, `/accessibility`, plus a custom
  error state. One typed configuration lives in `lib/config.ts`; cookie
  inventory in `lib/cookies.ts`; policy copy in `lib/legal.ts`.
- Cookie consent is necessary-only (no optional integrations exist in the
  codebase): versioned 180-day preference state in `lib/consent.ts`, banner
  and accessible preferences dialog in `components/ConsentManager.tsx`,
  footer "Cookie settings" control on every page.
- Privacy requests post to `/api/privacy-request` and share the SMTP
  delivery path with the contact form. Without SMTP they return an honest
  "delivery unavailable" state; a submission is never reported as completed
  deletion.
- Social links (LinkedIn, Telegram, X) are implemented but hidden until
  verified URLs are set in `lib/config.ts`. Outstanding inputs are listed
  in `docs/launch-inputs.md`.

## Needs configuration

- Logo is set: processed variants of the supplied `logo.png` live in `public/logo.png` (navy, for light backgrounds) and `public/logo-white.png` (white, for the dark home-hero header), wired up in `components/Logo.tsx`.
- Production domain in `SITE_URL`. Canonical links and the sitemap host stay unset, with a localhost sitemap fallback, until this is provided.
- Contact mailbox and SMTP settings: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `CONTACT_TO`. Leave them blank rather than inventing an address. The form states that delivery is unavailable and does not claim a message was sent.

## Reference sites

Gravity Team and Currency.com were not inspected in this build. The visual system follows the written navy, dark-blue, silver, and off-white direction, with Onest and Inter in place of the reference fonts.

## Image sources

- Home hero background: Fabian Kleiser, “Glass facade of a modern office building,” Unsplash (`public/hero-liquidity-bg.jpg`). Free under the [Unsplash License](https://unsplash.com/license). Source: https://unsplash.com/photos/glass-facade-of-a-modern-office-building-V5vF94h52r0
- UI icons: Lucide Icons (MIT License), downloaded into `public/icons/` from [lucide-static](https://www.npmjs.com/package/lucide-static). Source: https://lucide.dev
- Partner logos on Liquidity Management: retrieved by company domain via [Tomba Logo API](https://tomba.io/api/logo) into `public/partners/`, displayed in muted rounded tiles. Confirm trademark/branding permission before public launch if required.
