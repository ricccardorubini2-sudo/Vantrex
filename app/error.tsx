"use client";

import Link from "next/link";
import { routes } from "@/lib/content";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex w-full max-w-[840px] flex-col items-center px-5 py-24 text-center sm:px-8">
      <h1 className="text-[clamp(2.25rem,5vw,2.75rem)] text-navy">Something went wrong</h1>
      <p className="mt-4 max-w-xl text-xl leading-8 text-ink">
        This page could not be displayed. You can try again, or return to a working page.
      </p>
      <p className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-14 items-center rounded-full bg-accent px-7 font-display text-lg font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          Try again
        </button>
        <Link
          href={routes.home}
          className="inline-flex min-h-14 items-center rounded-full border border-navy px-7 font-display text-lg font-medium text-navy transition-colors duration-200 hover:bg-offwhite"
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
    </section>
  );
}
