"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { COOKIE_SETTINGS_EVENT } from "./CookieSettingsButton";
import { siteConfig } from "@/lib/config";
import { buildConsentState, detectGpc, parseConsentState, type ConsentState } from "@/lib/consent";
import { routes } from "@/lib/content";

/**
 * Cookie notice and preferences for a necessary-only website.
 *
 * - No optional technologies exist, so nothing is gated and no permission
 *   is requested for tracking. The banner informs; the dialog records a
 *   preference. Closing or pressing Escape never saves a state.
 * - State lives in localStorage under a versioned key for 180 days and is
 *   synchronised across tabs via the `storage` event.
 */
export function ConsentManager() {
  const [ready, setReady] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [savedState, setSavedState] = useState<ConsentState | null>(null);

  const bannerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const readStored = useCallback(() => {
    try {
      return parseConsentState(window.localStorage.getItem(siteConfig.consent.storageKey));
    } catch {
      return null;
    }
  }, []);

  const save = useCallback(() => {
    const state = buildConsentState(new Date(), detectGpc());
    try {
      window.localStorage.setItem(siteConfig.consent.storageKey, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode, disabled): keep the choice in memory only.
    }
    setSavedState(state);
    setBannerVisible(false);
    setDialogOpen(false);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stored = readStored();
      setSavedState(stored);
      setGpc(detectGpc());
      setBannerVisible(!stored);
      setReady(true);
    });

    function onStorage(event: StorageEvent) {
      if (event.key !== siteConfig.consent.storageKey) return;
      const next = parseConsentState(event.newValue);
      setSavedState(next);
      setBannerVisible(!next);
      if (next) setDialogOpen(false);
    }
    function onOpenSettings(event: Event) {
      lastTrigger.current =
        event instanceof CustomEvent && event.detail instanceof HTMLElement
          ? event.detail
          : (document.activeElement as HTMLElement | null);
      setDialogOpen(true);
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpenSettings);
    };
  }, [readStored]);

  // Focus containment for the preferences dialog.
  useEffect(() => {
    if (!dialogOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusables = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"));
    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setDialogOpen(false);
        lastTrigger.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
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
    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen]);

  if (!ready) return null;

  return (
    <>
      {bannerVisible && !dialogOpen ? (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 shadow-[0_-8px_30px_rgba(8,20,38,0.12)] backdrop-blur"
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-[15px] leading-6 text-ink">
              We use necessary technologies to operate this website. This website does not use optional analytics or
              advertising technologies. See our{" "}
              <Link href={routes.cookiePolicy} className="font-medium text-accent underline underline-offset-4">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={(event) => {
                  lastTrigger.current = event.currentTarget;
                  setDialogOpen(true);
                }}
                className="inline-flex min-h-11 items-center rounded-full border border-navy px-5 font-display text-[15px] font-medium text-navy transition-colors hover:bg-offwhite"
              >
                Cookie settings
              </button>
              <button
                type="button"
                onClick={save}
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Got it
              </button>
              <button
                type="button"
                aria-label="Dismiss cookie notice"
                onClick={() => setBannerVisible(false)}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] font-medium text-muted transition-colors hover:text-navy"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {dialogOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/60 p-4 sm:items-center" role="presentation">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="w-full max-w-lg bg-white p-6 shadow-2xl sm:p-8"
          >
            <h2 id="cookie-settings-title" className="font-display text-[1.6rem] leading-8 text-navy">
              Cookie settings
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-ink">
              This website uses only the technologies needed to operate it. There are no optional analytics,
              advertising, or social-media technologies to switch on or off.
            </p>

            <div className="mt-6 border border-line">
              <div className="flex items-start justify-between gap-4 px-4 py-4">
                <div>
                  <p className="font-display text-base font-medium text-navy">Necessary</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Remembers your cookie-notice choice in your browser for up to {siteConfig.consent.lifetimeDays}{" "}
                    days. Always active, because the site cannot remember your choice without it. Full details are in
                    the inventory in our{" "}
                    <Link href={routes.cookiePolicy} className="font-medium text-accent underline underline-offset-4">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
                <span
                  className="mt-1 inline-flex shrink-0 items-center rounded-full bg-offwhite px-3 py-1 text-xs font-medium text-navy"
                  aria-label="Necessary technologies are always active"
                >
                  Always active
                </span>
              </div>
            </div>

            {gpc ? (
              <p className="mt-4 border-l-4 border-accent bg-offwhite px-4 py-3 text-sm leading-6 text-ink">
                Your browser is sending a Global Privacy Control signal. We treat it as an opt-out of sale, sharing,
                or targeted advertising. This website does not perform those activities, and the signal is never
                treated as consent or as a deletion request.
              </p>
            ) : null}

            {savedState ? (
              <p className="mt-4 text-sm text-muted">
                Preferences last saved {new Date(savedState.savedAt).toLocaleDateString("en-US")} · Expire{" "}
                {new Date(savedState.expiresAt).toLocaleDateString("en-US")}. You can also delete this record any time
                through your browser&apos;s site-data controls.
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDialogOpen(false);
                  lastTrigger.current?.focus();
                }}
                className="inline-flex min-h-11 items-center rounded-full border border-navy px-5 font-display text-[15px] font-medium text-navy transition-colors hover:bg-offwhite"
              >
                Close
              </button>
              <button
                ref={settingsButtonRef}
                type="button"
                onClick={save}
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
