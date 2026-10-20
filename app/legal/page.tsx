import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { postalAddressLines, siteConfig } from "@/lib/config";
import { routes } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.legal, {
  title: "Company Information & Legal",
  description:
    "Legal entity information for VANTREX LLC, a Florida limited liability company, and a directory of Vantrex's legal and privacy pages.",
  openGraph: {
    title: "Company Information & Legal | Vantrex",
    description:
      "Legal entity information for VANTREX LLC, a Florida limited liability company, and a directory of Vantrex's legal and privacy pages.",
  },
});

const directory: { href: string; label: string; detail: string; icon: IconName }[] = [
  { href: routes.privacyPolicy, label: "Privacy Policy", detail: "What this website collects, why, and your rights.", icon: "shield" },
  { href: routes.cookiePolicy, label: "Cookie Policy", detail: "The cookies and browser storage this website actually uses.", icon: "file-text" },
  { href: routes.terms, label: "Terms of Use", detail: "The terms that govern use of this website.", icon: "scale" },
  { href: routes.riskDisclosure, label: "Digital Asset Risk Disclosure", detail: "Material risks relevant to our liquidity services.", icon: "activity" },
  { href: routes.privacyRequest, label: "Privacy Requests", detail: "Access, correct, or delete information, or make a privacy choice.", icon: "hand-coins" },
  { href: routes.accessibility, label: "Accessibility", detail: "Our accessibility target and how to report a barrier.", icon: "users" },
];

export default function LegalPage() {
  return (
    <>
      <section className="border-b border-line bg-offwhite">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium text-blue">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Company
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.15] text-navy">
            Company Information &amp; Legal
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink">
            This website is operated by {siteConfig.legalName}. This page identifies the company behind the site and
            brings together our legal and privacy pages. It is company information, not a register of financial
            licenses or regulatory approvals.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="text-[1.9rem] leading-9 text-navy">The company</h2>
            <dl className="mt-8 border-t border-line">
              {[
                ["Legal entity", siteConfig.legalName],
                ["Entity type", siteConfig.entityType],
                ["Formed in", siteConfig.formationJurisdiction],
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
            <p className="mt-6 text-base leading-7 text-ink">
              The Florida document number identifies our company filing. It is not an EIN, a financial-services
              license, or a regulatory approval.
            </p>
            <p className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.floridaRecordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-display text-base font-medium text-white transition-colors hover:bg-blue"
              >
                View Florida company record
                <Icon name="arrow-up-right" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link
                href={routes.contact}
                className="inline-flex min-h-12 items-center rounded-full border border-navy px-6 font-display text-base font-medium text-navy transition-colors hover:bg-offwhite"
              >
                Contact Vantrex
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-[1.9rem] leading-9 text-navy">Legal &amp; privacy pages</h2>
            <ul className="mt-8 border-t border-line">
              {directory.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-start gap-4 border-b border-line py-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-offwhite text-blue transition-colors group-hover:border-accent group-hover:text-accent">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-[1.25rem] leading-7 text-navy group-hover:text-accent">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-base leading-7 text-ink">{item.detail}</span>
                    </span>
                    <Icon name="arrow-up-right" className="ml-auto mt-1 h-5 w-5 shrink-0 text-silver transition-colors group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
