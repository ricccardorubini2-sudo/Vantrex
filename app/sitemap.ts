import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { routes } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const configured = getSiteUrl();
  if (!configured) {
    console.warn("SITE_URL is not set. Sitemap URLs use http://localhost:3000 until the production domain is configured.");
  }
  const siteUrl = configured ?? "http://localhost:3000";
  const lastModified = new Date(`${siteConfig.policies.lastRevised}T00:00:00Z`);
  return [
    routes.home,
    routes.liquidity,
    routes.marketMaking,
    routes.otc,
    routes.about,
    routes.legal,
    routes.privacyPolicy,
    routes.cookiePolicy,
    routes.terms,
    routes.riskDisclosure,
    routes.privacyRequest,
    routes.accessibility,
  ].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
  }));
}
