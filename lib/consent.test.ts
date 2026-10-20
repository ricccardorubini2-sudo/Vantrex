import assert from "node:assert/strict";
import test from "node:test";
import { buildConsentState, optionalTrackingAllowed, parseConsentState } from "./consent";

const now = new Date("2026-10-20T12:00:00Z");

test("built consent state expires after the configured 180 days", () => {
  const state = buildConsentState(now, false);
  assert.equal(state.acknowledged, true);
  assert.equal(state.necessary, true);
  assert.equal(state.expiresAt, "2027-04-18T12:00:00.000Z");
  assert.deepEqual(parseConsentState(JSON.stringify(state), now), state);
});

test("absent, malformed, wrong-version, and expired states are treated as no consent", () => {
  assert.equal(parseConsentState(null, now), null);
  assert.equal(parseConsentState("not json", now), null);
  assert.equal(parseConsentState(JSON.stringify({ version: 999, necessary: true, acknowledged: true, savedAt: now.toISOString(), expiresAt: "2027-01-01T00:00:00.000Z" }), now), null);
  const expired = buildConsentState(new Date("2025-01-01T00:00:00Z"));
  assert.equal(parseConsentState(JSON.stringify(expired), now), null);
});

test("optional tracking is never allowed by stored state on a necessary-only site", () => {
  assert.equal(optionalTrackingAllowed(null), false);
  assert.equal(optionalTrackingAllowed(buildConsentState(now)), false);
});

test("a recorded GPC opt-out survives a round trip", () => {
  const state = buildConsentState(now, true);
  assert.equal(parseConsentState(JSON.stringify(state), now)?.gpcOptOut, true);
});
