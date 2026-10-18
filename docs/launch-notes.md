# Internal launch notes

These notes are not part of the public website. The pages publish the supplied brief. They do not prove that every described capability is already operating.

## Needs owner confirmation

Confirm which of the following are operational before public launch. If a sentence is not yet true, say which one should change. Do not replace it with invented metrics.

- Liquidity sourcing for USDT, USDC, BTC, ETH, and selected digital assets.
- Liquidity pool management and deployment into selected market-making, OTC, and approved arrangements.
- Exchange market making, token and RWA secondary-market support, and DeFi liquidity provision.
- Institutional block trading, wholesale stablecoin coverage, and treasury or payment settlement liquidity.
- The VaultAlpha introduction path for suitable projects, including the independent-investment qualification.
- The Velorapay payment and settlement relationship.
- External institutional counterparty coverage.
- Any legal entity name, registration, address, regulatory status, or social profile that should appear. None were supplied, so none are published.

## Needs configuration

- Approved logo file. The header and footer keep an empty framed slot beside the Vantrex wordmark. Set `logoSrc` in `components/Logo.tsx` after adding the file to `public`.
- Production domain in `SITE_URL`. Canonical links and the sitemap host stay unset, with a localhost sitemap fallback, until this is provided.
- Contact mailbox and SMTP settings: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `CONTACT_TO`. Leave them blank rather than inventing an address. The form states that delivery is unavailable and does not claim a message was sent.

## Reference sites

Gravity Team and Currency.com were not inspected in this build. The visual system follows the written navy, dark-blue, silver, and off-white direction, with Manrope and Inter in place of the reference fonts.
