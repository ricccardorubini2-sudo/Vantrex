import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { hero } from "@/lib/content";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical("/", {
  title: { absolute: "Vantrex | Institutional Digital Asset Liquidity" },
  description: hero.description,
  openGraph: {
    title: "Vantrex | Institutional Digital Asset Liquidity",
    description: hero.description,
  },
});

export default function Page() {
  return <HomePage />;
}
