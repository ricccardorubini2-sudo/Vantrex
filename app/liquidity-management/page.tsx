import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PointList, ProductHero, ServiceGrid } from "@/components/ProductSections";
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
      <ProductHero eyebrow={liquidityPage.eyebrow} title={liquidityPage.title} lede={liquidityPage.lede} />
      <ServiceGrid title={liquidityPage.solutionsTitle} services={liquidityPage.services} />
      <PointList
        title={liquidityPage.providersTitle}
        intro={liquidityPage.providersBody}
        points={liquidityPage.benefits.map((detail) => ({ detail }))}
        note={liquidityPage.returnsNote}
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
