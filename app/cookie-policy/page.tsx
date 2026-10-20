import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { LegalPage } from "@/components/LegalPage";
import { routes } from "@/lib/content";
import { cookieInventory } from "@/lib/cookies";
import { cookiePolicy } from "@/lib/legal";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.cookiePolicy, {
  title: "Cookie Policy",
  description:
    "The cookies and similar technologies the Vantrex website actually uses, why, and how to review or change your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | Vantrex",
    description:
      "The cookies and similar technologies the Vantrex website actually uses, why, and how to review or change your cookie preferences.",
  },
});

function CookieInventory() {
  return (
    <div className="mt-8">
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[44rem] border-collapse text-left text-[15px] leading-6">
          <caption className="sr-only">Cookies and similar technologies used by this website</caption>
          <thead>
            <tr className="bg-offwhite text-navy">
              <th scope="col" className="px-4 py-3 font-medium">Identifier</th>
              <th scope="col" className="px-4 py-3 font-medium">Provider</th>
              <th scope="col" className="px-4 py-3 font-medium">Purpose</th>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium">Duration</th>
              <th scope="col" className="px-4 py-3 font-medium">When it loads</th>
            </tr>
          </thead>
          <tbody>
            {cookieInventory.map((item) => (
              <tr key={item.identifier} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-medium text-navy">{item.identifier}</th>
                <td className="px-4 py-3 text-ink">{item.provider}</td>
                <td className="px-4 py-3 text-ink">{item.purpose}</td>
                <td className="px-4 py-3 text-ink">{item.category}</td>
                <td className="px-4 py-3 text-ink">{item.duration}</td>
                <td className="px-4 py-3 text-ink">{item.loadsWhen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6">
        <CookieSettingsButton className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-display text-base font-medium text-white transition-colors hover:bg-accent-hover" />
      </p>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <LegalPage document={cookiePolicy}>
      <CookieInventory />
    </LegalPage>
  );
}
