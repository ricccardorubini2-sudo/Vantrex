import type { Metadata } from "next";

export function getSiteUrl(): string | null {
  const value = process.env.SITE_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function withCanonical(path: string, metadata: Metadata): Metadata {
  if (!getSiteUrl()) return metadata;
  const openGraph = metadata.openGraph;
  return {
    ...metadata,
    alternates: { canonical: path },
    openGraph: {
      ...(openGraph && typeof openGraph === "object" ? openGraph : {}),
      url: path,
    },
  };
}
