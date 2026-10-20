import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { NumberedBenefits, ProcessServices, ProductHero } from "@/components/ProductSections";
import { PartnerFlows } from "@/components/PartnerFlows";
import { StatStrip } from "@/components/StatStrip";
import { liquidityPage, routes } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.liquidity, {
  title: "Liquidity Management",
  description: liquidityPage.lede,
  openGraph: {
    title: "Liquidity Management | Vantrex",
    description: liquidityPage.lede,
  },
});

export default function LiquidityManagementPage() {
  return (
    <>
      <div className="flex min-h-[calc(100dvh_-_4.25rem)] flex-col">
        <ProductHero eyebrow={liquidityPage.eyebrow} title={liquidityPage.title} lede={liquidityPage.lede} />
        <section className="flex flex-1 flex-col justify-center border-b border-line bg-offwhite">
          <div className="mx-auto w-full max-w-[1200px] px-5 pt-10 text-center sm:px-8 md:pt-12">
            <h2 className="text-balance text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{liquidityPage.network.headline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-ink">{liquidityPage.network.subtitle}</p>
          </div>
          <StatStrip items={liquidityPage.stats} aria-label="Liquidity metrics" />
        </section>
      </div>
      <section className="border-b border-navy bg-navy">
        <PartnerFlows
          primaryFlow={liquidityPage.network.liquidityFlow}
          secondaryFlow={liquidityPage.network.infrastructureFlow}
          dark
        />
      </section>
      <ProcessServices
        title={liquidityPage.solutionsTitle}
        services={liquidityPage.services}
        icons={["download", "layers", "share-2"]}
      />
      <NumberedBenefits
        title={liquidityPage.providersTitle}
        intro={liquidityPage.providersBody}
        points={liquidityPage.benefits.map((detail) => ({ detail }))}
        note={liquidityPage.returnsNote}
        icons={["link-2", "circle-dollar-sign", "network"]}
      />
      <CtaBand
        title={liquidityPage.ctaTitle}
        actions={[{ href: routes.contactCapital, label: liquidityPage.cta, variant: "light" }]}
        showPartnerships
      >
        {liquidityPage.ctaBody}
      </CtaBand>
    </>
  );
}
