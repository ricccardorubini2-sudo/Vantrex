export const inquiryCategories = [
  "Provide Liquidity / Capital Partnership",
  "Request Market Making",
  "Institutional OTC / Stablecoin Liquidity",
  "Strategic Partnership",
] as const;

export type InquiryCategory = (typeof inquiryCategories)[number];

export const inquiryParams = {
  capital: "Provide Liquidity / Capital Partnership",
  "market-making": "Request Market Making",
  otc: "Institutional OTC / Stablecoin Liquidity",
  strategic: "Strategic Partnership",
} as const;

export const routes = {
  home: "/",
  liquidity: "/liquidity-management",
  marketMaking: "/market-making",
  otc: "/institutional-otc",
  about: "/about",
  legal: "/legal",
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
  terms: "/terms-of-use",
  riskDisclosure: "/risk-disclosure",
  privacyRequest: "/privacy-request",
  accessibility: "/accessibility",
  solutions: "/#solutions",
  partnerships: "/#partnerships",
  contact: "/#contact",
  contactCapital: "/?inquiry=capital#contact",
  contactMarketMaking: "/?inquiry=market-making#contact",
  contactOtc: "/?inquiry=otc#contact",
  contactStrategic: "/?inquiry=strategic#contact",
} as const;

export const company = {
  name: "Vantrex",
  type: "Institutional Digital Asset Liquidity Firm",
  positioning: "Capital in Motion. Markets in Reach.",
  overview:
    "Vantrex sources, manages, and deploys institutional digital-asset liquidity across trading, investment, and payment markets.",
  through:
    "Through liquidity management, market making, and institutional OTC execution, the firm connects capital providers with exchanges, trading institutions, RWA platforms, DeFi protocols, and payment networks.",
  missionLabel: "Our mission:",
  mission:
    "Connect institutional liquidity supply with real market demand, creating trading opportunities, supporting efficient asset deployment, and enabling large-scale digital-asset transactions.",
  differentiation:
    "Vantrex does not merely trade digital assets. It connects institutional capital, market liquidity demand, and payment flows through one specialized liquidity network.",
  function:
    "Source institutional liquidity, manage it efficiently, and supply it wherever investment, trading, and payment markets require it.",
  complementary:
    "Liquidity Management builds and allocates the pool. Market Making deploys inventory into active markets and builds trading relationships. Institutional OTC sources, converts, and delivers digital assets to institutions.",
  hub: "Together, they position Vantrex as an institutional liquidity hub connecting VaultAlpha's investment ecosystem, Velorapay's payment network, and the broader digital-asset market.",
};

export const hero = {
  headline: "Capital in Motion. Markets in Reach.",
  description:
    "We source, manage, and deploy institutional digital-asset liquidity across trading venues, tokenized markets, and payment networks.",
  supporting: "Connecting liquidity supply with institutional market demand.",
  primaryCta: "Explore Solutions",
  secondaryCta: "Partner With Us",
};

export const metrics = {
  headline: "Liquidity at Scale. Markets in Motion.",
  subtitle: "Our institutional liquidity capacity, trading activity, and market connectivity.",
  rows: [
    { label: "Liquidity Under Management", value: "$18M", icon: "wallet" as const },
    { label: "Monthly Trading Volume", value: "$105M", icon: "chart-line" as const },
    { label: "Institutional Liquidity Partners", value: "10", icon: "users-round" as const },
    { label: "Connected CEXs", value: "8", icon: "globe" as const },
    { label: "Institutional Clients", value: "12", icon: "briefcase" as const },
    { label: "Supported Digital Assets", value: "6", icon: "coins" as const },
  ],
};

export const solutions = {
  headline: "One Liquidity Network. Three Capabilities.",
  items: [
    {
      name: "Liquidity Management",
      headline: "Build the Supply.",
      description:
        "Source institutional capital and digital assets, manage liquidity pools, and allocate resources across trading and settlement needs.",
      href: routes.liquidity,
    },
    {
      name: "Market Making",
      headline: "Activate the Market.",
      description:
        "Provide direct liquidity to centralized exchanges, decentralized protocols, and tokenized-asset markets.",
      href: routes.marketMaking,
    },
    {
      name: "Institutional OTC",
      headline: "Execute at Scale.",
      description:
        "Facilitate institutional block trades, digital-asset sourcing, and wholesale stablecoin conversions.",
      href: routes.otc,
    },
  ],
};

export const ecosystem = {
  headline: "Built for the Institutions Moving Digital Assets.",
  intro:
    "We connect liquidity providers with organizations requiring capital efficiency, active trading liquidity, and reliable asset execution.",
  counterparties: [
    "Exchanges and trading firms",
    "Institutional liquidity providers and OTC desks",
    "RWA platforms and DeFi protocols",
    "Stablecoin issuers and payment institutions",
    "Digital-asset funds and treasury operators",
  ],
  reciprocity:
    "Institutions can work with Vantrex both as liquidity suppliers and liquidity users, creating opportunities for reciprocal trading and long-term partnerships.",
};

export const group = {
  eyebrow: "Group Ecosystem",
  headline: "Connected by Capital. Powered by Liquidity.",
  intro: "Vantrex strengthens an interconnected digital-asset ecosystem:",
  together:
    "Together, the businesses connect investment capital, trading activity, and real payment demand.",
  companies: [
    {
      name: "VaultAlpha",
      summary:
        "Investment opportunities and strategic relationships across protocols, trading infrastructure, and RWA.",
      coreBusiness:
        "Venture capital investing in protocols, exchanges, trading firms, and RWA",
      relationship:
        "Access to institutional liquidity, investment execution, and liquidity support for eligible portfolio projects",
    },
    {
      name: "Velorapay",
      summary: "Institutional payment flows and recurring stablecoin settlement demand.",
      coreBusiness: "Institutional crypto payments and settlement",
      relationship: "Access to stablecoin reserves, wholesale conversions, and settlement liquidity",
    },
    {
      name: "Vantrex",
      summary: "Institutional liquidity sourcing, market making, and wholesale asset execution.",
      coreBusiness: "Liquidity management, market making, and OTC",
      relationship:
        "Sources and manages liquidity for group businesses and external institutional counterparties",
    },
  ],
};

export const partnerships = {
  headline: "Different Markets. Shared Opportunities.",
  intro:
    "Vantrex connects institutions that provide liquidity, operate trading markets, and require digital assets for investment, execution, or settlement.",
  columns: {
    type: "Partner Type",
    need: "What They Need",
    provides: "What Vantrex Provides",
  },
  rows: [
    {
      type: "Institutional Capital Providers",
      need: "Liquidity deployment and potential trading returns",
      provides: "Managed liquidity opportunities and defined commercial arrangements",
    },
    {
      type: "Exchanges & DEXs",
      need: "Trading depth and efficient execution",
      provides: "Direct market making and liquidity inventory",
    },
    {
      type: "Trading Firms & OTC Desks",
      need: "Wholesale inventory and new counterparties",
      provides: "Bilateral trades, asset sourcing, and institutional liquidity",
    },
    {
      type: "RWA & DeFi Protocols",
      need: "Market liquidity, trading counterparties, strategic capital access",
      provides: "Market making, liquidity solutions, and potential investment introductions",
    },
    {
      type: "Payment Institutions",
      need: "Stablecoin reserves and reliable conversions",
      provides: "OTC execution, wholesale stablecoins, and settlement liquidity",
    },
  ],
  cta: "Explore an Institutional Partnership",
};

export const finalCta = {
  headline: "Bring Liquidity to the Table.",
  body: "Whether you provide institutional capital, require trading liquidity, or need wholesale digital-asset execution, explore a commercial relationship with Vantrex.",
  primary: "Become a Liquidity Partner",
  secondary: "Request Liquidity",
};

export const contactCopy = {
  headline: "Let's Put Liquidity to Work.",
  body: "Connect with Vantrex to discuss liquidity provision, market making, OTC transactions, and institutional partnerships.",
  submit: "Send Inquiry",
};

export const liquidityPage = {
  eyebrow: "Product 01 — Source · Manage · Allocate",
  title: "Capital That Finds Its Market.",
  lede: "We connect institutional digital-asset capital with defined liquidity opportunities across trading, investment, and payment markets.",
  stats: [
    { value: "$18M", label: "Liquidity Under Management" },
    { value: "10", label: "Institutional Liquidity Partners" },
    { value: "6", label: "Supported Assets" },
    { value: "12", label: "Institutional Clients" },
  ],
  network: {
    headline: "Institutional Liquidity. Measurable Scale.",
    subtitle:
      "Capital, trusted relationships, and active liquidity mandates supporting institutional digital-asset markets.",
    liquidityFlow: [
      { name: "FinchTrade", href: "https://finchtrade.com", logo: "/partners/finchtrade.png" },
      { name: "Kairon Labs", href: "https://kaironlabs.com", logo: "/partners/kairon-labs.png" },
      { name: "Keyrock", href: "https://keyrock.com", logo: "/partners/keyrock.png" },
      { name: "GSR", href: "https://www.gsr.io", logo: "/partners/gsr.png" },
      { name: "Wintermute", href: "https://www.wintermute.com", logo: "/partners/wintermute.png" },
      { name: "flovtec", href: "https://www.flovtec.com", logo: "/partners/flovtec.png" },
      { name: "Caladan", href: "https://caladan.xyz", logo: "/partners/caladan.png" },
      { name: "Auros", href: "https://www.auros.global", logo: "/partners/auros.png" },
      { name: "B2C2", href: "https://www.b2c2.com", logo: "/partners/b2c2.png" },
      { name: "Flowdesk", href: "https://www.flowdesk.co", logo: "/partners/flowdesk.png" },
    ],
    infrastructureFlow: [
      { name: "Talos", href: "https://www.talos.com", logo: "/partners/talos.png" },
      { name: "Copper", href: "https://copper.co", logo: "/partners/copper.png" },
      { name: "Finery Markets", href: "https://finerymarkets.com", logo: "/partners/finery-markets.png" },
      { name: "Uniswap", href: "https://uniswap.org", logo: "/partners/uniswap.png" },
      { name: "Fireblocks", href: "https://www.fireblocks.com", logo: "/partners/fireblocks.png" },
      { name: "BitGo", href: "https://www.bitgo.com", logo: "/partners/bitgo.png" },
      { name: "Chainlink", href: "https://chain.link", logo: "/partners/chainlink.png" },
      { name: "Aave", href: "https://aave.com", logo: "/partners/aave.png" },
    ],
  },
  solutionsTitle: "Liquidity Sourced. Liquidity Allocated.",
  services: [
    {
      name: "Institutional Liquidity Sourcing",
      activity:
        "Source USDT, USDC, BTC, ETH, and selected digital assets through institutional capital providers, OTC desks, and trading counterparties.",
    },
    {
      name: "Liquidity Pool Management",
      activity:
        "Manage dedicated asset reserves and liquidity allocations for trading, market making, settlement, and institutional transactions.",
    },
    {
      name: "Liquidity Deployment",
      activity:
        "Allocate liquidity to selected market-making strategies, OTC transactions, and approved institutional liquidity arrangements.",
    },
  ],
  providersTitle: "Put Digital Assets to Work.",
  providersBody:
    "Vantrex offers institutional liquidity partners opportunities to deploy their assets through defined market-making, trading, and liquidity strategies.",
  benefits: [
    "Access to institutional liquidity demand and trading opportunities.",
    "Potential revenue from agreed liquidity and trading arrangements.",
    "Exposure to a broader network of exchanges, market makers, and institutional counterparties.",
  ],
  returnsNote: "Returns depend on strategy performance, market conditions, and agreed terms.",
  ctaTitle: "Have Liquidity? Find Its Next Opportunity.",
  ctaBody:
    "Connect with Vantrex to explore institutional liquidity-sourcing and capital deployment partnerships.",
  cta: "Become a Liquidity Partner",
};

export const marketMakingPage = {
  eyebrow: "Product 02 — Deploy · Quote · Trade",
  title: "Liquidity That Moves Markets.",
  lede: "We provide direct digital-asset liquidity to exchanges, tokenized-asset markets, and DeFi protocols, supporting market depth, efficient pricing, and active trading.",
  performance: {
    headline: "Liquidity in Action. Performance by Design.",
    subtitle: "Active market coverage, consistent quoting, and institutional liquidity across digital-asset markets.",
    stats: [
      { value: "8", label: "Connected CEXs" },
      { value: "3", label: "DEX / DeFi Venues" },
      { value: "20", label: "Quoted Trading Pairs" },
      { value: "$75M", label: "Monthly Trading Volume" },
      { value: "99%", label: "Quoting Availability" },
    ],
  },
  venues: {
    headline: "Connected Across Digital Asset Markets.",
    subtitle:
      "Supporting liquidity provision across centralized exchanges, decentralized trading venues, and emerging tokenized-asset markets.",
    cexFlow: [
      { name: "Binance", href: "https://www.binance.com", logo: "/partners/binance.png" },
      { name: "OKX", href: "https://www.okx.com", logo: "/partners/okx.png" },
      { name: "Bybit", href: "https://www.bybit.com", logo: "/partners/bybit.png" },
      { name: "Gate", href: "https://www.gate.io", logo: "/partners/gate.png" },
      { name: "Bitget", href: "https://www.bitget.com", logo: "/partners/bitget.png" },
      { name: "MEXC", href: "https://www.mexc.com", logo: "/partners/mexc.png" },
      { name: "KuCoin", href: "https://www.kucoin.com", logo: "/partners/kucoin.png" },
      { name: "Coinstore", href: "https://www.coinstore.com", logo: "/partners/coinstore.png" },
    ],
    defiFlow: [
      { name: "Uniswap", href: "https://uniswap.org", logo: "/partners/uniswap.png" },
      { name: "Curve", href: "https://curve.fi", logo: "/partners/curve.png" },
      { name: "PancakeSwap", href: "https://pancakeswap.finance", logo: "/partners/pancakeswap.png" },
    ],
  },
  solutionsTitle: "Where Markets Need Depth, We Bring Liquidity.",
  services: [
    {
      name: "Exchange Market Making",
      activity:
        "Provide continuous bid/ask quotes, trading inventory, and order-book liquidity for selected CEX markets.",
    },
    {
      name: "Token & RWA Liquidity",
      activity:
        "Support secondary-market trading for eligible tokens, RWA products, and tokenized financial assets.",
    },
    {
      name: "DeFi Liquidity Provision",
      activity:
        "Supply and manage liquidity across selected DEX markets, protocols, and on-chain liquidity pools.",
    },
  ],
  approachTitle: "More Than Quoting Prices.",
  approachBody:
    "Our market-making operations combine managed digital-asset inventory, execution strategies, and institutional counterparty relationships.",
  principles: [
    { name: "Market Depth", detail: "Maintain executable buy and sell liquidity." },
    { name: "Capital Efficiency", detail: "Deploy and rebalance inventory where it is needed." },
    {
      name: "Institutional Connectivity",
      detail: "Establish reciprocal trading relationships with exchanges, trading firms, and protocols.",
    },
  ],
  strategicTitle: "Liquidity With a Wider Network.",
  strategicBody:
    "Beyond market making, Vantrex connects trading venues and asset issuers with institutional liquidity partners, trading counterparties, and potential strategic capital relationships.",
  vaultAlpha:
    "Through the broader group ecosystem, suitable projects may also be introduced to VaultAlpha for independent investment consideration.",
  ctaTitle: "Build a More Liquid Market.",
  ctaBody:
    "Discuss market-making requirements for your exchange, RWA platform, token, or DeFi protocol.",
  cta: "Discuss Market Making",
};

export const otcPage = {
  eyebrow: "Product 03 — Source · Exchange · Settle",
  title: "The Assets You Need. The Liquidity to Move Them.",
  lede: "Access institutional digital-asset liquidity for large transactions, stablecoin conversions, and treasury settlement.",
  performance: {
    headline: "Institutional Execution. Liquidity at Scale.",
    subtitle:
      "Deep asset liquidity, competitive execution, and reliable settlement for institutional digital-asset transactions.",
    stats: [
      { value: "$30M", label: "Monthly OTC Trading Volume" },
      { value: "20", label: "Active OTC Counterparties" },
      { value: "$100K–$1.5M", label: "Typical Transaction Size" },
      { value: "$6M", label: "Dedicated Stablecoin Liquidity" },
    ],
  },
  solutionsTitle: "Institutional Liquidity, Without the Fragmentation.",
  services: [
    {
      name: "Institutional Block Trading",
      activity:
        "Facilitate large BTC, ETH, and selected digital-asset transactions through bilateral execution and professional counterparties.",
    },
    {
      name: "Stablecoin Liquidity",
      activity: "Source, exchange, and supply wholesale USDT, USDC, and other supported stablecoins.",
    },
    {
      name: "Treasury & Payment Liquidity",
      activity:
        "Provide asset conversion and settlement liquidity to payment companies, institutional treasuries, and trading businesses.",
    },
  ],
  whyTitle: "One Relationship. Broader Liquidity Access.",
  whyBody:
    "Vantrex combines managed inventory with external institutional liquidity relationships to help clients efficiently source and exchange digital assets.",
  advantages: [
    { name: "Asset Access", detail: "Obtain the required digital assets or stablecoin inventory." },
    {
      name: "Institutional Execution",
      detail: "Execute large transactions through available liquidity and competitive bilateral quotations.",
    },
    {
      name: "Settlement Liquidity",
      detail: "Support treasury conversion and payment-related asset requirements.",
    },
  ],
  paymentsTitle: "Liquidity Behind Digital Payments.",
  paymentsBody:
    "Vantrex supports payment institutions, including Velorapay's ecosystem, with wholesale stablecoin sourcing, asset conversions, and liquidity for cross-border settlement.",
  paymentsFollow:
    "This creates recurring liquidity demand and direct relationships with payment operators, exchanges, and trading firms.",
  ctaTitle: "Move Size. Access Liquidity.",
  ctaBody:
    "Connect with our institutional desk for block trading, stablecoin conversions, and wholesale liquidity requirements.",
  cta: "Request an OTC Quote",
};

export const nav = {
  home: { label: "Home", href: routes.home },
  solutionsLabel: "Solutions",
  contact: { label: "Contact", href: routes.contact },
  partnerships: { label: "Institutional Partnerships", href: routes.partnerships },
  products: [
    { label: "Liquidity Management", href: routes.liquidity, headline: "Build the Supply." },
    { label: "Market Making", href: routes.marketMaking, headline: "Activate the Market." },
    { label: "Institutional OTC", href: routes.otc, headline: "Execute at Scale." },
  ],
};

export const brandMessages = {
  company: "Capital in Motion. Markets in Reach.",
  liquidity: "Capital That Finds Its Market.",
  marketMaking: "Liquidity That Moves Markets.",
  otc: "The Assets You Need. The Liquidity to Move Them.",
  partnerships: "Different Markets. Shared Opportunities.",
  contact: "Let's Put Liquidity to Work.",
};
