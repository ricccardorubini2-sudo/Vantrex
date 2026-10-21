"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { nav, routes } from "@/lib/content";
import { Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";

const productIcons: IconName[] = ["droplets", "chart-candlestick", "handshake"];

export function SiteHeader() {
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [overHero, setOverHero] = useState(pathname === routes.home);
  const [path, setPath] = useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setSolutionsOpen(false);
    setMobileOpen(false);
    setOverHero(pathname === routes.home);
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
    if (pathname !== routes.home) return;

    function update() {
      setOverHero(window.scrollY < Math.max(window.innerHeight - 96, 120));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

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

  const solutionsActive = nav.products.some((product) => product.href === pathname);
  const onHero = pathname === routes.home && overHero && !mobileOpen;
  const linkClass = (active: boolean) =>
    `relative inline-flex h-10 items-center px-3 font-display text-base font-medium transition-colors duration-200 ${
      onHero ? "text-white" : "text-ink"
    } ${active ? "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent" : ""}`;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        onHero ? "border-b border-transparent bg-transparent" : "border-b border-line bg-white"
      }`}
    >
      <div className="relative mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 sm:px-8" inert={mobileOpen ? true : undefined}>
        <Logo tone={onHero ? "light" : "dark"} />
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex" aria-label="Primary">
          <Link href={nav.home.href} aria-current={pathname === nav.home.href ? "page" : undefined} className={linkClass(pathname === nav.home.href)}>
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
              className={`${linkClass(solutionsActive)} gap-1`}
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
              <div
                id={solutionsId}
                className={`absolute left-0 top-full z-20 mt-3 w-80 rounded-2xl border p-2 shadow-[0_16px_40px_rgba(8,20,38,0.14)] ${
                  onHero
                    ? "border-white/20 bg-navy/95 backdrop-blur-xl"
                    : "border-line bg-white"
                }`}
              >
                {nav.products.map((product, index) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    aria-current={pathname === product.href ? "page" : undefined}
                    className={`flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${onHero ? "hover:bg-white/10" : "hover:bg-navy/5"}`}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    <Icon
                      name={productIcons[index] ?? "layers"}
                      className={`mt-0.5 h-6 w-6 ${onHero ? "text-white" : "text-accent"}`}
                    />
                    <span className="min-w-0">
                      <span className={`block font-display text-base font-medium ${onHero ? "text-white" : "text-navy"}`}>{product.label}</span>
                      <span className={`mt-1 block text-sm ${onHero ? "text-white/80" : "text-muted"}`}>{product.headline}</span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>
        <div className="hidden md:block">
          <Link href={nav.contact.href} className="inline-flex h-10 items-center rounded-full bg-accent px-[22px] font-display text-base font-medium uppercase tracking-[0.06em] text-white transition-colors duration-200 hover:bg-accent-hover">
            Get in Touch
          </Link>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className={`inline-flex h-10 items-center rounded-full px-4 font-display text-base font-medium md:hidden ${
            onHero ? "bg-white/15 text-white" : "bg-offwhite text-ink"
          }`}
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close menu" : "Menu"}
        </button>
      </div>
      {mobileOpen ? (
        <div ref={mobileRef} id={mobileId} className="fixed inset-0 z-50 overflow-y-auto bg-white px-5 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="order-2 inline-flex h-10 items-center rounded-full bg-[#f3f4f6] px-4 text-base font-medium text-black"
              onClick={closeMobile}
            >
              Close menu
            </button>
            <div className="order-1">
              <Logo />
            </div>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col">
            <Link href={nav.home.href} className="border-b border-line py-4 text-2xl text-black" onClick={() => setMobileOpen(false)}>
              {nav.home.label}
            </Link>
            <p className="pb-2 pt-6 text-sm font-medium text-muted">{nav.solutionsLabel}</p>
            {nav.products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="border-b border-line py-4 text-xl text-black"
                onClick={() => setMobileOpen(false)}
              >
                {product.label}
              </Link>
            ))}
            <Link href={nav.contact.href} className="py-4 text-2xl text-black" onClick={() => setMobileOpen(false)}>
              {nav.contact.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
