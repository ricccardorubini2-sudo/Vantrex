import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { AdvantageSplit, IconServiceRows, ProductHero, ProseSection } from "@/components/ProductSections";
import { StatStrip } from "@/components/StatStrip";
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
      <div className="flex min-h-[calc(100dvh_-_4.25rem)] flex-col">
        <ProductHero eyebrow={otcPage.eyebrow} title={otcPage.title} lede={otcPage.lede} />
        <section className="flex flex-1 flex-col justify-center border-b border-line bg-offwhite">
          <div className="mx-auto w-full max-w-[1200px] px-5 pt-10 text-center sm:px-8 md:pt-12">
            <h2 className="text-balance text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{otcPage.performance.headline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-ink">{otcPage.performance.subtitle}</p>
          </div>
          <StatStrip items={otcPage.performance.stats} aria-label="Institutional OTC metrics" />
        </section>
      </div>
      <IconServiceRows
        title={otcPage.solutionsTitle}
        services={otcPage.services}
        icons={["package", "coins", "wallet"]}
      />
      <AdvantageSplit
        title={otcPage.whyTitle}
        intro={otcPage.whyBody}
        points={otcPage.advantages}
        icons={["download", "scale", "banknote"]}
      />
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
