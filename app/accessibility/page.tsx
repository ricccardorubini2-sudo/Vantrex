import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { routes } from "@/lib/content";
import { accessibilityStatement } from "@/lib/legal";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.accessibility, {
  title: "Accessibility",
  description:
    "Vantrex's accessibility approach: our WCAG 2.2 AA design and testing target, measures in place, known limitations, and how to report a barrier.",
  openGraph: {
    title: "Accessibility | Vantrex",
    description:
      "Vantrex's accessibility approach: our WCAG 2.2 AA design and testing target, measures in place, known limitations, and how to report a barrier.",
  },
});

export default function AccessibilityPage() {
  return <LegalPage document={accessibilityStatement} />;
}
