import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { routes } from "@/lib/content";
import { privacyPolicy } from "@/lib/legal";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.privacyPolicy, {
  title: "Privacy Policy",
  description:
    "How VANTREX LLC collects, uses, and protects personal information submitted through this website, and how to exercise your privacy rights.",
  openGraph: {
    title: "Privacy Policy | Vantrex",
    description:
      "How VANTREX LLC collects, uses, and protects personal information submitted through this website, and how to exercise your privacy rights.",
  },
});

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
