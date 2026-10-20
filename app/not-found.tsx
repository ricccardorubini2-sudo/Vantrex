import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not part of the Vantrex website.",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[840px] flex-col items-center px-5 py-24 text-center sm:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent">404</p>
      <h1 className="mt-4 text-[clamp(2.25rem,5vw,2.75rem)] text-navy">Page not found</h1>
      <p className="mt-4 max-w-xl text-xl leading-8 text-ink">
        This address is not part of the Vantrex website. It may have been moved, or the link may be incorrect.
      </p>
      <p className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={routes.home}
          className="inline-flex min-h-14 items-center rounded-full bg-accent px-7 font-display text-lg font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          Home
        </Link>
        <Link
          href={routes.contact}
          className="inline-flex min-h-14 items-center rounded-full border border-navy px-7 font-display text-lg font-medium text-navy transition-colors duration-200 hover:bg-offwhite"
        >
          Contact Vantrex
        </Link>
      </p>
      <p className="mt-10 text-base text-muted">
        Or explore our{" "}
        <Link href={routes.liquidity} className="font-medium text-accent underline underline-offset-4">
          Liquidity Management
        </Link>
        ,{" "}
        <Link href={routes.marketMaking} className="font-medium text-accent underline underline-offset-4">
          Market Making
        </Link>
        , and{" "}
        <Link href={routes.otc} className="font-medium text-accent underline underline-offset-4">
          Institutional OTC
        </Link>{" "}
        services.
      </p>
    </section>
  );
}
