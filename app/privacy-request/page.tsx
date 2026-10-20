import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyRequestForm } from "@/components/PrivacyRequestForm";
import { postalAddressLines, siteConfig } from "@/lib/config";
import { routes } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.privacyRequest, {
  title: "Privacy Requests",
  description:
    "Ask Vantrex to access, correct, or delete personal information held about you, or make a privacy choice. Cookie choices take effect directly in your browser.",
  openGraph: {
    title: "Privacy Requests | Vantrex",
    description:
      "Ask Vantrex to access, correct, or delete personal information held about you, or make a privacy choice. Cookie choices take effect directly in your browser.",
  },
});

export default function PrivacyRequestPage() {
  return (
    <>
      <section className="border-b border-line bg-offwhite">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium text-blue">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Legal &amp; Privacy
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.15] text-navy">
            Privacy Requests
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink">
            Use this page to ask {siteConfig.legalName} to review personal information it holds about you, or to make a
            privacy choice. Submitting a request starts a review — it does not by itself delete anything.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <h2 className="text-[1.9rem] leading-9 text-navy">Two different kinds of request</h2>
            <div className="mt-6 space-y-6 text-base leading-7 text-ink">
              <div className="border-t-2 border-navy pt-5">
                <h3 className="font-display text-[1.25rem] text-navy">Choices that apply immediately</h3>
                <p className="mt-2">
                  Changing this browser&apos;s cookie preferences — and any sale, sharing, or targeted-advertising
                  opt-out — takes effect directly, without email, an account, or identity verification. Select
                  “Withdraw a relevant consent or make a privacy choice” in the form to open that control. This
                  website currently uses no optional tracking technologies.
                </p>
              </div>
              <div className="border-t-2 border-navy pt-5">
                <h3 className="font-display text-[1.25rem] text-navy">Requests we review and answer</h3>
                <p className="mt-2">
                  Access, correction, and deletion requests are reviewed against the records we actually hold, which
                  for this website are normally enquiry correspondence. We may ask for proportionate information to
                  verify your identity before disclosing or deleting records, and some records may need to be kept
                  where a legal obligation or an unresolved matter requires it. We will explain the outcome when we
                  respond; a deletion request is acknowledged as a request, never as completed deletion.
                </p>
              </div>
              <div className="border-t-2 border-navy pt-5">
                <h3 className="font-display text-[1.25rem] text-navy">Other ways to reach us</h3>
                <p className="mt-2">
                  You can also write to {siteConfig.legalName} at {postalAddressLines().join(", ")}, or use the{" "}
                  <Link href={routes.contact} className="font-medium text-accent underline underline-offset-4">
                    contact form
                  </Link>
                  . Our{" "}
                  <Link href={routes.privacyPolicy} className="font-medium text-accent underline underline-offset-4">
                    Privacy Policy
                  </Link>{" "}
                  explains what this website collects and why.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-8">
            <PrivacyRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
