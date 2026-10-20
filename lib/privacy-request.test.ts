import assert from "node:assert/strict";
import test from "node:test";
import {
  immediateChoiceType,
  parsePrivacyRequest,
  privacyRequestFields,
  resolvePrivacyRequestParam,
} from "./privacy-request";

function payload(overrides: Record<string, string> = {}) {
  return {
    [privacyRequestFields.email]: "privacy@example.com",
    [privacyRequestFields.requestType]: "Request deletion",
    [privacyRequestFields.name]: "",
    [privacyRequestFields.company]: "",
    [privacyRequestFields.region]: "",
    [privacyRequestFields.details]: "Please review the enquiry emails from our company.",
    [privacyRequestFields.honeypot]: "",
    ...overrides,
  };
}

test("a complete deletion request parses", () => {
  const result = parsePrivacyRequest(payload());
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.requestType, "Request deletion");
    assert.equal(result.data.email, "privacy@example.com");
  }
});

test("email and request type are required and validated", () => {
  const badEmail = parsePrivacyRequest(payload({ [privacyRequestFields.email]: "not-an-email" }));
  assert.equal(badEmail.ok, false);
  if (!badEmail.ok && "errors" in badEmail) assert.ok(badEmail.errors.email);

  const badType = parsePrivacyRequest(payload({ [privacyRequestFields.requestType]: "Delete everything now" }));
  assert.equal(badType.ok, false);
  if (!badType.ok && "errors" in badType) assert.ok(badType.errors.requestType);
});

test("honeypot submissions are flagged separately", () => {
  const result = parsePrivacyRequest(payload({ [privacyRequestFields.honeypot]: "bot" }));
  assert.equal(result.ok, false);
  assert.equal("honeypot" in result && result.honeypot, true);
});

test("type URL parameters resolve, including the direct deletion link", () => {
  assert.equal(resolvePrivacyRequestParam("deletion"), "Request deletion");
  assert.equal(resolvePrivacyRequestParam("access"), "Access my personal information");
  assert.equal(resolvePrivacyRequestParam("choice"), immediateChoiceType);
  assert.equal(resolvePrivacyRequestParam("nonsense"), null);
  assert.equal(resolvePrivacyRequestParam(null), null);
});

test("oversized details are rejected", () => {
  const result = parsePrivacyRequest(payload({ [privacyRequestFields.details]: "x".repeat(2001) }));
  assert.equal(result.ok, false);
});
