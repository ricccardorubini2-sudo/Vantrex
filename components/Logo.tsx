import Image from "next/image";
import Link from "next/link";

/**
 * Logo artwork in /public, processed from the supplied logo.png:
 * - logoSrc (navy VTX) for light backgrounds
 * - logoLightSrc (white VTX) for dark backgrounds (home hero header)
 * Both keep the teal X accent. Image is 800x299.
 */
export const logoSrc = "/logo.png";
export const logoLightSrc = "/logo-white.png";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const name = tone === "light" ? "text-offwhite" : "text-navy";
  const src = tone === "light" ? logoLightSrc : logoSrc;

  return (
    <Link href="/" className="inline-flex items-center gap-3 rounded-sm" aria-label="Vantrex home">
      <Image src={src} alt="" width={800} height={299} priority className="h-8 w-auto shrink-0" aria-hidden="true" />
      <span className={`text-[1.35rem] font-medium tracking-[-0.02em] ${name}`}>Vantrex</span>
    </Link>
  );
}
