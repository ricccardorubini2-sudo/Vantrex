import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not part of the Vantrex website.",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[840px] flex-col items-center px-5 py-24 text-center sm:px-8">
      <h1 className="text-[clamp(2.25rem,5vw,2.75rem)] text-black">Page not found</h1>
      <p className="mt-4 max-w-xl text-xl leading-8 text-black">This address is not part of the Vantrex website.</p>
      <p className="mt-8">
        <Link href="/" className="inline-flex min-h-14 items-center rounded-full bg-accent px-7 text-xl font-medium text-white hover:bg-[#0036cc]">
          Home
        </Link>
      </p>
    </section>
  );
}
