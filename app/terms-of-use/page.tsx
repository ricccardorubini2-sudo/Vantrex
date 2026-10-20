import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { routes } from "@/lib/content";
import { termsOfUse } from "@/lib/legal";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.terms, {
  title: "Terms of Use",
  description:
    "The terms governing use of the Vantrex website: informational purpose, permitted use, intellectual property, and third-party links.",
  openGraph: {
    title: "Terms of Use | Vantrex",
    description:
      "The terms governing use of the Vantrex website: informational purpose, permitted use, intellectual property, and third-party links.",
  },
});

export default function TermsOfUsePage() {
  return <LegalPage document={termsOfUse} />;
}
