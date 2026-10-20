import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { routes } from "@/lib/content";
import { riskDisclosure } from "@/lib/legal";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical(routes.riskDisclosure, {
  title: "Digital Asset Risk Disclosure",
  description:
    "Material risks relevant to Vantrex's institutional digital-asset liquidity services, including volatility, liquidity, execution, counterparty, technology, stablecoin, and regulatory risks.",
  openGraph: {
    title: "Digital Asset Risk Disclosure | Vantrex",
    description:
      "Material risks relevant to Vantrex's institutional digital-asset liquidity services, including volatility, liquidity, execution, counterparty, technology, stablecoin, and regulatory risks.",
  },
});

export default function RiskDisclosurePage() {
  return <LegalPage document={riskDisclosure} />;
}
