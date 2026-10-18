import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not part of the Vantrex website.",
};

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8">
      <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] text-navy">Page not found</h1>
      <p className="mt-4 max-w-xl text-[17px] leading-8 text-muted">This address is not part of the Vantrex website.</p>
      <p className="mt-8">
        <Link href="/" className="inline-flex min-h-11 items-center font-medium text-navy underline decoration-silver underline-offset-4">
          Home
        </Link>
      </p>
    </section>
  );
}
