import Image from "next/image";
import Link from "next/link";

/**
 * Leave logoSrc null until an approved logo is placed in /public.
 * Then set it to that public path, for example "/logo.svg".
 * The framed slot keeps the header and footer space reserved.
 */
export const logoSrc: string | null = null;

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const name = tone === "light" ? "text-offwhite" : "text-navy";
  const slot = tone === "light" ? "logo-slot logo-slot-light" : "logo-slot";

  return (
    <Link href="/" className="inline-flex items-center gap-3 rounded-sm" aria-label="Vantrex home">
      <span className={slot} data-logo-slot="reserved" aria-hidden="true">
        {logoSrc ? <Image src={logoSrc} alt="" width={40} height={40} /> : null}
      </span>
      <span className={`font-display text-[1.35rem] font-semibold tracking-[-0.03em] ${name}`}>Vantrex</span>
    </Link>
  );
}
