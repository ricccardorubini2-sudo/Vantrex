import { siteConfig } from "./config";

/**
 * Versioned consent state for the cookie notice and preferences dialog.
 *
 * The site currently uses only necessary technologies (see lib/cookies.ts),
 * so the state records acknowledgement/preferences rather than permission
 * for optional tracking. If optional integrations are added later, they
 * must stay off until a stored, unexpired state explicitly allows them;
 * absent, invalid, or expired state always means "optional off".
 */

export type ConsentState = {
  version: number;
  /** Necessary technologies are always active; they cannot be switched off. */
  necessary: true;
  /** Whether the visitor has seen and answered the cookie notice. */
  acknowledged: boolean;
  /** True when a Global Privacy Control opt-out signal was detected. */
  gpcOptOut: boolean;
  savedAt: string;
  expiresAt: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function buildConsentState(now = new Date(), gpcOptOut = false): ConsentState {
  const expires = new Date(now.getTime() + siteConfig.consent.lifetimeDays * DAY_MS);
  return {
    version: siteConfig.consent.stateVersion,
    necessary: true,
    acknowledged: true,
    gpcOptOut,
    savedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };
}

export function parseConsentState(raw: string | null, now = new Date()): ConsentState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (value.version !== siteConfig.consent.stateVersion) return null;
    if (value.necessary !== true || value.acknowledged !== true) return null;
    if (typeof value.savedAt !== "string" || typeof value.expiresAt !== "string") return null;
    const expires = Date.parse(value.expiresAt);
    if (Number.isNaN(expires) || expires <= now.getTime()) return null;
    return {
      version: siteConfig.consent.stateVersion,
      necessary: true,
      acknowledged: true,
      gpcOptOut: value.gpcOptOut === true,
      savedAt: value.savedAt,
      expiresAt: value.expiresAt,
    };
  } catch {
    return null;
  }
}

/** Optional tracking is permitted only with a valid, unexpired opt-in. */
export function optionalTrackingAllowed(state: ConsentState | null): boolean {
  // No optional integrations exist today, and no state grants them.
  void state;
  return false;
}

export function detectGpc(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}
