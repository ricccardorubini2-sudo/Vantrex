import { postalAddressLines, siteConfig } from "./config";

/**
 * Copy for the supporting legal and privacy pages. Drafted for this
 * website's actual practices: an informational site with a contact form
 * and a privacy-request form, no accounts, no client portal, no
 * analytics or advertising integrations. Update the policy version and
 * dates in lib/config.ts whenever this copy genuinely changes.
 */

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
};

const addressLine = postalAddressLines().join(", ");

export const privacyPolicy: LegalDocument = {
  eyebrow: "Legal & Privacy",
  title: "Privacy Policy",
  introduction:
    "This policy explains what personal information this website collects, why, and the choices and rights available to you. Vantrex operates this website for institutional audiences. It is an informational website: it does not open accounts, hold assets, or execute transactions.",
  sections: [
    {
      id: "who-we-are",
      heading: "Who is responsible for your information",
      paragraphs: [
        `${siteConfig.legalName}, a ${siteConfig.entityType.toLowerCase()}, is responsible for personal information processed through this website. Our principal and mailing address is ${addressLine}.`,
        `You can reach us through the contact form on this website or by submitting a privacy request. We respond to privacy enquiries through those channels.`,
      ],
    },
    {
      id: "what-we-collect",
      heading: "Information we collect",
      paragraphs: ["We collect only what is needed to operate this website and respond to you:"],
      bullets: [
        "Enquiry information: when you use the contact form, we receive your company name, contact name, business email, enquiry category, and message.",
        "Privacy-request information: when you use the privacy-request form, we receive your contact email, the type of request, and any optional details you choose to provide (name, company, country or region, and a description of your request).",
        "Technical information: our hosting and email delivery systems automatically process standard technical data needed to serve pages and deliver messages, such as IP addresses, browser information, and timestamps in server and mail logs.",
        "Cookie preferences: if you dismiss the cookie notice or save cookie preferences, your browser stores that choice on your device. See the Cookie Policy for details.",
      ],
    },
    {
      id: "what-we-do-not-collect",
      heading: "What this website does not collect",
      paragraphs: [
        "This website does not ask for passwords, wallet information or private keys, identification documents, account balances, or transaction documents, and it does not operate client accounts. Any client onboarding, transaction, or custody relationship is governed separately, outside this website, and is not described by this policy. Never send credentials, private keys, or identity documents through these public forms.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use information",
      paragraphs: ["We use the information described above to:"],
      bullets: [
        "Respond to your enquiry or privacy request and manage that correspondence.",
        "Operate, secure, and troubleshoot the website, including preventing abuse of the public forms.",
        "Keep records of enquiries and requests for business administration and to demonstrate how a request was handled.",
        "Meet legal obligations that apply to us.",
      ],
    },
    {
      id: "lawful-bases",
      heading: "Lawful bases, where they apply",
      paragraphs: [
        "Where data-protection law requires a lawful basis, we rely on the basis that fits the activity: taking steps at your request when you contact us, our legitimate interests in operating and securing this website and responding to institutional enquiries, and compliance with legal obligations. An enquiry is permission to respond to that enquiry; it is not consent to marketing, profiling, or unrelated processing.",
      ],
    },
    {
      id: "who-receives",
      heading: "Who receives information",
      paragraphs: [
        "Enquiries and requests are delivered to the Vantrex mailbox configured for this website. The service providers that host this website and transmit email process personal information on our behalf as part of operating those systems. We do not add advertising, analytics, or social-media trackers to this website. We may disclose information where required by law or to protect our rights, and as part of a corporate transaction affecting the business, subject to applicable law.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep information",
      paragraphs: [
        "We keep enquiry and request records for as long as needed to respond, administer the correspondence, and maintain reasonable business and compliance records, after which they are deleted or anonymised. Technical logs are kept for a limited period needed for security and troubleshooting. If a legal obligation or an unresolved matter requires longer retention of specific records, those records are kept only for that purpose.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights and choices",
      paragraphs: [
        "Depending on the laws that apply to you, you may have rights to access, correct, or delete personal information we hold about you, to restrict or object to certain processing, and to withdraw consent where processing is based on consent. You can exercise these rights through the privacy-request page. We may ask for proportionate information to verify your identity before disclosing or deleting records; simple choices such as cookie preferences never require verification and can be changed directly in your browser at any time.",
        "If you believe your information has not been handled properly, you may contact us first so we can review it. Where applicable law gives you the right to complain to a data-protection or privacy regulator, you may also do so.",
      ],
    },
    {
      id: "international",
      heading: "International processing",
      paragraphs: [
        "Vantrex is based in the United States, and website information is processed there. If you contact us from another country or region, your information will be transferred to and processed in the United States, whose privacy laws may differ from those where you are located.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      paragraphs: [
        "This website links to third-party websites, including trading venues and the Florida company record. Those sites have their own privacy practices, which we do not control. Review their policies before providing information to them.",
      ],
    },
    {
      id: "audience-and-changes",
      heading: "Audience and changes to this policy",
      paragraphs: [
        "This website is intended for institutional and business audiences and is not directed at children. We may update this policy when our practices change; the version and revision date shown on this page identify the current text, and material changes will be reflected here before or as they take effect.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  eyebrow: "Legal & Privacy",
  title: "Cookie Policy",
  introduction:
    "This policy explains the cookies and similar browser technologies this website actually uses. The short version: this website sets no analytics, advertising, or social-media cookies, and loads no optional third-party tracking.",
  sections: [
    {
      id: "what-they-are",
      heading: "What cookies and similar technologies are",
      paragraphs: [
        "Cookies are small files a website asks your browser to store. Similar technologies include browser local storage, which works in a comparable way. They can be essential for a site to function, or optional, for example for analytics or advertising.",
      ],
    },
    {
      id: "what-we-use",
      heading: "What this website uses",
      paragraphs: [
        "The inventory below is the complete list at the time this policy was last revised. The one item is necessary for the site to remember your cookie-notice choice; it is not used to track you across sites, build profiles, or deliver advertising.",
      ],
    },
    {
      id: "what-we-do-not-use",
      heading: "What this website does not use",
      paragraphs: [
        "We do not use analytics cookies, advertising or retargeting pixels, social-media widgets, or session-replay tools on this website, and we do not load optional third-party scripts that set cookies. If that changes, this policy and the inventory will be updated and optional technologies will stay off until you choose to allow them.",
      ],
    },
    {
      id: "your-choices",
      heading: "Your choices",
      paragraphs: [
        "Use the Cookie settings button in the footer of every page to review the technologies in use and re-save your preferences. The preference record is stored in your browser for up to 180 days; you can also delete it at any time through your browser's site-data controls, which will cause the cookie notice to be shown again. Most browsers also let you block or delete cookies generally; blocking necessary storage may mean your notice choice is not remembered.",
        "Where your browser sends a Global Privacy Control (GPC) signal, we treat an affirmative signal as an opt-out of any sale, sharing, or targeted-advertising processing. This website does not perform those activities, and a GPC signal is never treated as consent or as a deletion request.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: [
        "If we add, remove, or change a cookie or similar technology, we will update the inventory on this page and revise the policy date shown here.",
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  eyebrow: "Legal & Privacy",
  title: "Terms of Use",
  introduction:
    "These terms govern your use of this website. By using the site, you agree to them. They cover the website only; they are not trading, liquidity, or client terms.",
  sections: [
    {
      id: "operator",
      heading: "Website operator",
      paragraphs: [
        `This website is operated by ${siteConfig.legalName}, a ${siteConfig.entityType.toLowerCase()}, principal and mailing address ${addressLine}. Company information, including our Florida document number and a link to the official Florida company record, is available on the Company Information page. Inclusion of that information is for transparency and is not a financial-services license or regulatory approval.`,
      ],
    },
    {
      id: "informational-purpose",
      heading: "Informational purpose only",
      paragraphs: [
        "Content on this website describes Vantrex's institutional liquidity capabilities in general terms for information only. It is not an offer, solicitation, recommendation, or advice to buy, sell, or hold any digital asset, and it is not directed at retail customers. Figures and descriptions on this website are provided as general information about the business and do not guarantee future volumes, pricing, liquidity, or availability.",
      ],
    },
    {
      id: "no-client-relationship",
      heading: "Enquiries do not create a client relationship or a trade",
      paragraphs: [
        "Submitting the contact form, requesting an indicative quote, or exchanging messages with us does not execute a trade, commit either party to a transaction, or establish a client, custody, or advisory relationship. Any commercial services are provided only under separate written agreements, after any applicable onboarding, and on the terms those agreements contain.",
      ],
    },
    {
      id: "permitted-use",
      heading: "Permitted use",
      paragraphs: ["You may use this website for lawful, informational purposes. You must not:"],
      bullets: [
        "Misuse the forms, including by submitting false information, automated bulk enquiries, or content that infringes others' rights or breaks the law.",
        "Attempt to gain unauthorised access to the website or its systems, interfere with its operation, or introduce malicious code.",
        "Scrape or harvest content or data from the website in a way that burdens the site or misrepresents Vantrex.",
        "Use the website or its content in a way that implies a partnership, endorsement, or regulatory status that does not exist.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        "The Vantrex name, logo, and the content and design of this website belong to Vantrex or its licensors. You may view and print pages for your internal business reference. You may not reproduce, distribute, or create derivative works from the site's branding or content for public or commercial use without our written permission. Third-party names and logos shown on this website belong to their owners and do not imply endorsement.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      paragraphs: [
        "Links to exchanges, protocols, the Florida company record, and other third-party sites are provided for convenience. We do not control or endorse those sites and are not responsible for their content, availability, or practices. Your use of them is at your own discretion and subject to their terms.",
      ],
    },
    {
      id: "availability-and-changes",
      heading: "Availability and changes",
      paragraphs: [
        "We work to keep the website accurate and available, but we do not guarantee uninterrupted access, and content may be corrected, updated, or removed at any time, including these terms. The revision date on this page identifies the current terms. Nothing in these terms limits any liability that cannot lawfully be limited.",
      ],
    },
    {
      id: "contact",
      heading: "Contact about these terms",
      paragraphs: [
        "Questions about these terms can be sent through the contact form on this website, selecting the category closest to your enquiry, or by post to the address above.",
      ],
    },
  ],
};

export const riskDisclosure: LegalDocument = {
  eyebrow: "Legal & Privacy",
  title: "Digital Asset Risk Disclosure",
  introduction:
    "Digital-asset markets involve material risks. This page summarises the main risks relevant to the liquidity services described on this website. It is general information, not an exhaustive list and not advice. Not every risk applies to every service or transaction, and actual terms are set in separate agreements.",
  sections: [
    {
      id: "no-guarantees",
      heading: "No guaranteed outcomes",
      paragraphs: [
        "Returns, liquidity, pricing, spreads, and execution outcomes are not guaranteed. Digital-asset activity can result in partial or total loss. Past activity, volumes, or availability shown on this website do not predict future results.",
      ],
    },
    {
      id: "volatility",
      heading: "Market volatility and price risk",
      paragraphs: [
        "Digital-asset prices can move sharply and without warning, including outside conventional market hours. Rapid moves can widen spreads, reduce available liquidity, and cause executed prices to differ materially from indicative or previously quoted prices.",
      ],
    },
    {
      id: "liquidity",
      heading: "Market liquidity risk",
      paragraphs: [
        "Liquidity varies by asset, venue, and market conditions. In stressed or thin markets, it may be difficult or impossible to trade a desired size at a desired price or time, and smaller or newer tokens and tokenized assets can be significantly less liquid than major digital assets.",
      ],
    },
    {
      id: "execution",
      heading: "Execution and slippage risk",
      paragraphs: [
        "Orders and bilaterally agreed trades are exposed to slippage, partial fills, latency, and venue outages between indication, agreement, and settlement. Quotes may be indicative only unless expressly agreed otherwise in a binding confirmation.",
      ],
    },
    {
      id: "counterparty-settlement",
      heading: "Counterparty and settlement risk",
      paragraphs: [
        "Transactions depend on counterparties, exchanges, custodians, and payment or banking rails performing as expected. A counterparty or venue failure, insolvency, freeze, or settlement delay can result in delayed, partial, or failed delivery of assets or funds.",
      ],
    },
    {
      id: "technology",
      heading: "Technology and cybersecurity risk",
      paragraphs: [
        "Trading and settlement rely on software, networks, APIs, wallets, and third-party infrastructure. Bugs, outages, cyberattacks, key compromise, and operational errors can disrupt execution or settlement and can cause loss. Blockchain networks can also experience congestion, forks, reorganisations, and protocol failures.",
      ],
    },
    {
      id: "smart-contract",
      heading: "Blockchain and smart-contract risk",
      paragraphs: [
        "Where activity involves decentralised protocols or tokenized assets, smart-contract defects, governance actions, oracle failures, and protocol exploits can affect value, redeemability, and the ability to withdraw or transfer assets, sometimes irreversibly.",
      ],
    },
    {
      id: "stablecoin",
      heading: "Stablecoin risk",
      paragraphs: [
        "Stablecoins are not guaranteed to maintain their peg. Issuer, reserve, banking, redemption, and regulatory risks can cause a stablecoin to trade below its target value or become unavailable on particular venues or networks, affecting conversion and settlement.",
      ],
    },
    {
      id: "legal-regulatory",
      heading: "Legal and regulatory risk",
      paragraphs: [
        "The legal treatment of digital assets, trading venues, and related services differs by jurisdiction and can change, including through new licensing, market, tax, sanctions, or transfer rules. Changes can restrict, delay, or prevent activities that were previously available, and can affect the value or transferability of assets.",
      ],
    },
    {
      id: "your-assessment",
      heading: "Your own assessment",
      paragraphs: [
        "Institutions considering digital-asset liquidity services should carry out their own legal, regulatory, tax, accounting, and risk assessment and read the Risk Disclosure together with the relevant product pages before entering into any separate agreement with Vantrex.",
      ],
    },
  ],
};

export const accessibilityStatement: LegalDocument = {
  eyebrow: "Legal & Privacy",
  title: "Accessibility",
  introduction:
    "Vantrex wants this website to be usable by as many people as possible. This page describes our accessibility approach, the standard we design and test against, and how to tell us about a problem.",
  sections: [
    {
      id: "our-target",
      heading: "Our target",
      paragraphs: [
        "We design and test this website against the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. This is a target we work to through design, development, and manual testing; it is not a certification, and we do not claim complete conformance for every page at all times.",
      ],
    },
    {
      id: "measures",
      heading: "Measures in place",
      paragraphs: ["The website is built with:"],
      bullets: [
        "Semantic page structure with landmarks, a single main heading per page, and logical heading order.",
        "Full keyboard operability for navigation, menus, dialogs, and forms, with visible focus indicators and a skip-to-content link.",
        "Form fields with persistent labels, described errors, and status messages announced to assistive technology.",
        "Colour combinations chosen for sufficient contrast, and information that does not rely on colour or icons alone.",
        "Respect for reduced-motion preferences, and layouts that reflow on narrow screens and at high browser zoom without hiding essential content.",
        "Comfortable touch targets on mobile layouts.",
      ],
    },
    {
      id: "known-limitations",
      heading: "Known limitations",
      paragraphs: [
        "Third-party logos and linked external websites are outside our control and may not meet the same standard. If any part of this website is difficult to use, the same information and enquiry routes are available through the contact form, and we will help you complete your enquiry another way.",
      ],
    },
    {
      id: "feedback",
      heading: "Accessibility feedback",
      paragraphs: [
        "If you encounter an accessibility barrier, please tell us through the contact form on this website and describe the page, the problem, and the assistive technology you were using, if any. We review accessibility reports and work to correct confirmed problems in the ordinary course of maintaining the site.",
      ],
    },
  ],
};
