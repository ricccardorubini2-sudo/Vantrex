import type { Metadata, Viewport } from "next";
import { Inter, Onest } from "next/font/google";
import { ConsentManager } from "@/components/ConsentManager";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { configuredSocials } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/config";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const onest = Onest({ subsets: ["latin"], display: "swap", variable: "--font-onest" });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Vantrex | Institutional Digital Asset Liquidity",
    template: "%s | Vantrex",
  },
  description:
    "We source, manage, and deploy institutional digital-asset liquidity across trading venues, tokenized markets, and payment networks.",
  applicationName: "Vantrex",
  openGraph: {
    type: "website",
    siteName: "Vantrex",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#081426",
  width: "device-width",
  initialScale: 1,
};

function organizationJsonLd() {
  const sameAs = configuredSocials().map((network) => network.href);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    legalName: siteConfig.legalName,
    description: siteConfig.footerDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "US",
    },
  };
  if (siteUrl) {
    data.url = siteUrl;
    data.logo = `${siteUrl}/logo.png`;
  }
  if (sameAs.length > 0) data.sameAs = sameAs;
  return data;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${onest.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ConsentManager />
      </body>
    </html>
  );
}
