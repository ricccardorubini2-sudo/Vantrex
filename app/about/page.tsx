import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon, type IconName } from "@/components/Icon";
import { postalAddressLines, siteConfig } from "@/lib/config";
import { company, routes } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.about, {
  title: "About Vantrex",
  description:
    "Vantrex is an institutional digital-asset liquidity firm connecting capital providers with trading, tokenized, and payment markets through liquidity management, market making, and institutional OTC execution.",
  openGraph: {
    title: "About Vantrex | Vantrex",
    description:
      "Vantrex is an institutional digital-asset liquidity firm connecting capital providers with trading, tokenized, and payment markets through liquidity management, market making, and institutional OTC execution.",
  },
});

const capabilities: { href: string; name: string; headline: string; detail: string; icon: IconName }[] = [
  {
    href: routes.liquidity,
    name: "Liquidity Management",
    headline: "Build the supply",
    detail:
      "We source institutional digital assets and capital, manage dedicated liquidity pools, and allocate them across trading and settlement needs.",
    icon: "droplets",
  },
  {
    href: routes.marketMaking,
    name: "Market Making",
    headline: "Activate the market",
    detail:
      "We deploy managed inventory into selected exchange, DeFi, and tokenized-asset markets, quoting prices and supporting order-book depth.",
    icon: "chart-candlestick",
  },
  {
    href: routes.otc,
    name: "Institutional OTC",
    headline: "Execute at scale",
    detail:
      "We source, convert, and deliver digital assets and stablecoins for institutional block transactions and treasury settlement.",
    icon: "handshake",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-offwhite">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <p className="flex items-center gap-3 text-sm font-medium text-blue">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            About Vantrex
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.35rem,4.5vw,3.375rem)] leading-[1.15] text-navy">
            An institutional liquidity firm, built around one network.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink">{company.overview}</p>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-ink">{company.through}</p>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="how-it-connects">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-24">
          <div className="max-w-3xl">
            <h2 id="how-it-connects" className="text-[clamp(2rem,4vw,2.75rem)] text-navy">
              How the three capabilities connect
            </h2>
            <p className="mt-5 text-xl leading-8 text-ink">{company.complementary}</p>
            <p className="mt-5 text-base leading-7 text-ink">{company.differentiation}</p>
          </div>
          <ul className="mt-12 grid gap-0 border-y border-line lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <li
                key={item.href}
                className="group border-b border-line py-10 last:border-b-0 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center border border-line bg-offwhite text-blue transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-medium text-silver">0{index + 1}</span>
                </div>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-accent">{item.name}</p>
                <h3 className="mt-2 text-[1.6rem] leading-8 text-navy">{item.headline}</h3>
                <p className="mt-3 text-base leading-7 text-ink">{item.detail}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-blue transition-colors hover:text-accent"
                >
                  Explore {item.name}
                  <Icon name="arrow-up-right" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-xl leading-8 text-ink">{company.hub}</p>
          <p className="mt-6 flex flex-wrap gap-3">
            <Link
              href={routes.partnerships}
              className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-display text-base font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Institutional Partnerships
            </Link>
            <Link
              href={routes.contact}
              className="inline-flex min-h-12 items-center rounded-full border border-navy px-6 font-display text-base font-medium text-navy transition-colors hover:bg-offwhite"
            >
              Contact Vantrex
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-offwhite" aria-labelledby="company-information">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <h2 id="company-information" className="text-[clamp(2rem,4vw,2.75rem)] text-navy">
              Company information
            </h2>
            <p className="mt-5 text-xl leading-8 text-ink">
              The legal entity behind this website and our services, as filed in Florida.
            </p>
            <Link
              href={routes.legal}
              className="mt-6 inline-flex items-center gap-2 text-base font-medium text-blue transition-colors hover:text-accent"
            >
              Company Information &amp; Legal
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </Link>
          </div>
          <dl className="border-t border-line">
            {[
              ["Legal entity", siteConfig.legalName],
              ["Entity type", siteConfig.entityType],
              ["Florida document number", siteConfig.floridaDocumentNumber],
            ].map(([term, value]) => (
              <div key={term} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium uppercase tracking-[0.06em] text-blue">{term}</dt>
                <dd className="text-base leading-7 text-ink">{value}</dd>
              </div>
            ))}
            <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
              <dt className="text-sm font-medium uppercase tracking-[0.06em] text-blue">
                Principal and mailing address
              </dt>
              <dd className="text-base leading-7 text-ink">
                {postalAddressLines().map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        title="Work with Vantrex."
        actions={[{ href: routes.contactStrategic, label: "Explore an Institutional Partnership", variant: "light" }]}
        showPartnerships
      >
        Discuss liquidity provision, market making, or OTC requirements with our team.
      </CtaBand>
    </>
  );
}
