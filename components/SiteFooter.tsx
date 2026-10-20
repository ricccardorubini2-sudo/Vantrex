import Link from "next/link";
import { postalAddressLines, siteConfig } from "@/lib/config";
import { nav, routes } from "@/lib/content";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { Logo } from "./Logo";
import { configuredSocials, SocialLinks } from "./SocialLinks";

const companyLinks = [
  { href: routes.about, label: "About" },
  { href: routes.partnerships, label: "Institutional Partnerships" },
  { href: routes.contact, label: "Contact" },
  { href: routes.legal, label: "Company Information" },
];

const legalLinks = [
  { href: routes.privacyPolicy, label: "Privacy Policy" },
  { href: routes.cookiePolicy, label: "Cookie Policy" },
  { href: routes.terms, label: "Terms of Use" },
  { href: routes.riskDisclosure, label: "Risk Disclosure" },
  { href: routes.privacyRequest, label: "Privacy Requests" },
  { href: routes.accessibility, label: "Accessibility" },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={`Footer — ${title}`}>
      <p className="font-display text-base font-medium text-navy">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[15px] leading-6 text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const hasSocials = configuredSocials().length > 0;
  return (
    <footer className="border-t border-line bg-white text-ink">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-base leading-6 text-muted">{siteConfig.footerDescription}</p>
            <div className="mt-6 text-[15px] leading-6 text-ink">
              <p className="font-medium text-navy">
                {siteConfig.legalName} · {siteConfig.locationDescription}
              </p>
              <p className="mt-1 text-muted">Florida Document No. {siteConfig.floridaDocumentNumber}</p>
              <address className="mt-3 not-italic text-muted">
                {postalAddressLines().map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>

          <FooterColumn title={nav.solutionsLabel} links={nav.products.map((p) => ({ href: p.href, label: p.label }))} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal & Privacy" links={legalLinks} />

          {hasSocials ? (
            <div>
              <p className="font-display text-base font-medium text-navy">Connect</p>
              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>
          ) : null}
        </div>

        <p className="mt-14 max-w-3xl border-t border-line pt-8 text-sm leading-6 text-muted">
          This website is for institutional audiences and is for information only. It does not offer digital-asset
          services to the public. Read our{" "}
          <Link href={routes.terms} className="font-medium text-accent underline underline-offset-4">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href={routes.riskDisclosure} className="font-medium text-accent underline underline-offset-4">
            Risk Disclosure
          </Link>
          .
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <CookieSettingsButton className="text-sm font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent" />
          <Link
            href={`${routes.privacyRequest}?type=deletion`}
            className="text-sm font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Request data deletion
          </Link>
        </div>
      </div>
    </footer>
  );
}
