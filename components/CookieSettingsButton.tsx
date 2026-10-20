"use client";

/**
 * Opens the cookie preferences dialog managed by ConsentManager.
 * Works from the footer and policy pages without coupling components:
 * ConsentManager listens for this event and restores focus afterwards.
 */
export const COOKIE_SETTINGS_EVENT = "vantrex:open-cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}

export function CookieSettingsButton({
  className = "",
  label = "Cookie settings",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  );
}
