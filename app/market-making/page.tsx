import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PartnerFlows } from "@/components/PartnerFlows";
import { AlternatingServices, PrincipleColumns, ProductHero, ProseSection } from "@/components/ProductSections";
import { StatStrip } from "@/components/StatStrip";
import { marketMakingPage, routes } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.marketMaking, {
  title: "Market Making",
  description: marketMakingPage.lede,
  openGraph: {
    title: "Market Making | Vantrex",
    description: marketMakingPage.lede,
  },
});

export default function MarketMakingPage() {
  return (
    <>
      <div className="flex min-h-[calc(100dvh_-_4.25rem)] flex-col">
        <ProductHero eyebrow={marketMakingPage.eyebrow} title={marketMakingPage.title} lede={marketMakingPage.lede} />
        <section className="flex flex-1 flex-col justify-center border-b border-line bg-offwhite">
          <div className="mx-auto w-full max-w-[1200px] px-5 pt-10 text-center sm:px-8 md:pt-12">
            <h2 className="text-balance text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{marketMakingPage.performance.headline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-ink">{marketMakingPage.performance.subtitle}</p>
          </div>
          <StatStrip items={marketMakingPage.performance.stats} aria-label="Market making metrics" />
        </section>
      </div>
      <section className="border-b border-navy bg-navy">
        <PartnerFlows
          primaryFlow={marketMakingPage.venues.cexFlow}
          secondaryFlow={marketMakingPage.venues.defiFlow}
          dark
        />
      </section>
      <AlternatingServices
        title={marketMakingPage.solutionsTitle}
        services={marketMakingPage.services}
        icons={["chart-candlestick", "file-text", "hexagon"]}
      />
      <PrincipleColumns
        title={marketMakingPage.approachTitle}
        intro={marketMakingPage.approachBody}
        points={marketMakingPage.principles}
        icons={["chart-column", "refresh-cw", "link-2"]}
      />
      <ProseSection
        title={marketMakingPage.strategicTitle}
        paragraphs={[marketMakingPage.strategicBody, marketMakingPage.vaultAlpha]}
      />
      <CtaBand
        title={marketMakingPage.ctaTitle}
        actions={[{ href: routes.contactMarketMaking, label: marketMakingPage.cta, variant: "light" }]}
        showPartnerships
      >
        {marketMakingPage.ctaBody}
      </CtaBand>
    </>
  );
}
