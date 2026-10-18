"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { nav } from "@/lib/content";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [path, setPath] = useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setSolutionsOpen(false);
    setMobileOpen(false);
  }
  const solutionsRef = useRef<HTMLDivElement>(null);
  const solutionsButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const focusFirstSolution = useRef(false);
  const returnFocus = useRef(false);
  const solutionsId = useId();
  const mobileId = useId();

  useEffect(() => {
    if (solutionsOpen && focusFirstSolution.current) {
      focusFirstSolution.current = false;
      solutionsRef.current?.querySelector("a")?.focus();
    }
  }, [solutionsOpen]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!solutionsRef.current?.contains(event.target as Node)) setSolutionsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (solutionsOpen) {
        setSolutionsOpen(false);
        solutionsButtonRef.current?.focus();
      }
      if (mobileOpen) {
        returnFocus.current = true;
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [solutionsOpen, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !mobileRef.current) return;
    const root = mobileRef.current;
    const getItems = () => Array.from(root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    getItems()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const items = getItems();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen && returnFocus.current) {
      returnFocus.current = false;
      menuButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  function closeMobile() {
    returnFocus.current = true;
    setMobileOpen(false);
  }

  function onSolutionsKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const current = links.findIndex((link) => link === document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!solutionsOpen) {
        focusFirstSolution.current = true;
        setSolutionsOpen(true);
        return;
      }
      (links[current + 1] ?? links[0])?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!solutionsOpen) return;
      (current <= 0 ? links[links.length - 1] : links[current - 1])?.focus();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-offwhite/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8" inert={mobileOpen ? true : undefined}>
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <Link
            href={nav.home.href}
            aria-current={pathname === nav.home.href ? "page" : undefined}
            className="rounded-md px-3 py-2 text-[15px] font-medium text-navy hover:bg-white"
          >
            {nav.home.label}
          </Link>
          <div
            ref={solutionsRef}
            className="relative"
            onKeyDown={onSolutionsKeyDown}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setSolutionsOpen(false);
            }}
          >
            <button
              ref={solutionsButtonRef}
              type="button"
              className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-[15px] font-medium text-navy hover:bg-white"
              aria-expanded={solutionsOpen}
              aria-controls={solutionsId}
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              {nav.solutionsLabel}
              <span aria-hidden="true" className="text-xs">
                ▾
              </span>
            </button>
            {solutionsOpen ? (
              <div id={solutionsId} className="absolute right-0 top-full z-20 mt-2 w-80 rounded-xl border border-line bg-white p-2 shadow-[0_12px_40px_rgba(8,20,38,0.08)]">
                {nav.products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    aria-current={pathname === product.href ? "page" : undefined}
                    className="block rounded-lg px-3 py-3 hover:bg-offwhite"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    <span className="block text-[15px] font-medium text-navy">{product.label}</span>
                    <span className="mt-1 block text-sm text-muted">{product.headline}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link href={nav.contact.href} className="rounded-md px-3 py-2 text-[15px] font-medium text-navy hover:bg-white">
            {nav.contact.label}
          </Link>
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 items-center rounded-md px-3 text-[15px] font-medium text-navy md:hidden"
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close menu" : "Menu"}
        </button>
      </div>
      {mobileOpen ? (
        <div ref={mobileRef} id={mobileId} className="fixed inset-0 z-50 overflow-y-auto bg-offwhite px-5 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="order-2 inline-flex min-h-11 items-center rounded-md px-3 text-[15px] font-medium text-navy"
              onClick={closeMobile}
            >
              Close menu
            </button>
            <div className="order-1">
              <Logo />
            </div>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col">
            <Link href={nav.home.href} className="border-b border-line py-4 text-2xl text-navy" onClick={() => setMobileOpen(false)}>
              {nav.home.label}
            </Link>
            <p className="pb-2 pt-6 text-sm font-medium text-muted">{nav.solutionsLabel}</p>
            {nav.products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="border-b border-line py-4 text-xl text-navy"
                onClick={() => setMobileOpen(false)}
              >
                {product.label}
              </Link>
            ))}
            <Link href={nav.contact.href} className="py-4 text-2xl text-navy" onClick={() => setMobileOpen(false)}>
              {nav.contact.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
