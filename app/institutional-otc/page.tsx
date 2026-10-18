import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PointList, ProductHero, ProseSection, ServiceGrid } from "@/components/ProductSections";
import { otcPage, routes } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.otc, {
  title: "Institutional OTC",
  description: otcPage.lede,
  openGraph: {
    title: "Institutional OTC | Vantrex",
    description: otcPage.lede,
  },
});

export default function InstitutionalOtcPage() {
  return (
    <>
      <ProductHero eyebrow={otcPage.eyebrow} title={otcPage.title} lede={otcPage.lede} />
      <ServiceGrid title={otcPage.solutionsTitle} services={otcPage.services} />
      <PointList title={otcPage.whyTitle} intro={otcPage.whyBody} points={otcPage.advantages} />
      <ProseSection title={otcPage.paymentsTitle} paragraphs={[otcPage.paymentsBody, otcPage.paymentsFollow]} />
      <CtaBand
        title={otcPage.ctaTitle}
        actions={[{ href: routes.contactOtc, label: otcPage.cta, variant: "light" }]}
        showPartnerships
      >
        {otcPage.ctaBody}
      </CtaBand>
    </>
  );
}
