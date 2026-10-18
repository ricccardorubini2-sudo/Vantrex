"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

const variants = {
  accent: "bg-accent text-white hover:bg-[#0036cc]",
  light: "bg-white text-black hover:bg-[#f3f4f6]",
  outline: "bg-[#f3f4f6] text-black hover:bg-[#e5e7eb]",
  inverse: "border border-white/70 bg-transparent text-white hover:bg-white/10",
  quiet: "bg-[#f3f4f6] text-black hover:bg-[#e5e7eb]",
} as const;

export function ButtonLink({
  href,
  variant = "accent",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const url = new URL(href, window.location.origin);
    if (url.pathname !== pathname) return;

    if (url.searchParams.has("inquiry")) {
      window.dispatchEvent(new CustomEvent("vantrex-inquiry", { detail: url.searchParams.get("inquiry") }));
    }

    if (url.hash) {
      event.preventDefault();
      router.replace(href, { scroll: false });
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.querySelector(url.hash)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-14 items-center justify-center rounded-full px-7 text-xl font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
