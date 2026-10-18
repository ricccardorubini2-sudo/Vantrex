import type { MetadataRoute } from "next";
import { routes } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const configured = getSiteUrl();
  if (!configured) {
    console.warn("SITE_URL is not set. Sitemap URLs use http://localhost:3000 until the production domain is configured.");
  }
  const siteUrl = configured ?? "http://localhost:3000";
  return [routes.home, routes.liquidity, routes.marketMaking, routes.otc].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  }));
}
