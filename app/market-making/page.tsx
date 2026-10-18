import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PointList, ProductHero, ProseSection, ServiceGrid } from "@/components/ProductSections";
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
      <ProductHero eyebrow={marketMakingPage.eyebrow} title={marketMakingPage.title} lede={marketMakingPage.lede} />
      <ServiceGrid title={marketMakingPage.solutionsTitle} services={marketMakingPage.services} />
      <PointList
        title={marketMakingPage.approachTitle}
        intro={marketMakingPage.approachBody}
        points={marketMakingPage.principles}
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
