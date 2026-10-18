import assert from "node:assert/strict";
import test from "node:test";
import { handleContact } from "./handle-contact";
import { parseInquiry, resolveInquiryParam } from "./inquiry";
import { resetRateLimit } from "./rate-limit";

const valid = {
  company: "Northwind Trading",
  contactName: "A. Morgan",
  email: "amorgan@example.com",
  category: "Request Market Making",
  message: "We would like to discuss market making for an exchange.",
  vx_company_site: "",
};

function requestFor(body: Record<string, string>, ip: string, asHtml = false) {
  const headers: Record<string, string> = {
    origin: "http://localhost:3000",
    host: "localhost:3000",
    "x-forwarded-for": ip,
    accept: asHtml ? "text/html" : "application/json",
    "content-type": asHtml ? "application/x-www-form-urlencoded" : "application/json",
  };
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers,
    body: asHtml ? new URLSearchParams(body).toString() : JSON.stringify(body),
  });
}

test("inquiry categories resolve only for the four allowed values", () => {
  assert.equal(resolveInquiryParam("capital"), "Provide Liquidity / Capital Partnership");
  assert.equal(resolveInquiryParam("market-making"), "Request Market Making");
  assert.equal(resolveInquiryParam("otc"), "Institutional OTC / Stablecoin Liquidity");
  assert.equal(resolveInquiryParam("strategic"), "Strategic Partnership");
  assert.equal(resolveInquiryParam("retail"), null);
  assert.equal(resolveInquiryParam(""), null);
  assert.equal(resolveInquiryParam(null), null);
});

test("server validation rejects bad email, unknown category, and honeypot", () => {
  assert.equal(parseInquiry(valid).ok, true);
  const email = parseInquiry({ ...valid, email: "not-an-email" });
  assert.equal(email.ok, false);
  if (!email.ok && "errors" in email) assert.equal(email.errors.email, "Enter a valid business email.");
  const category = parseInquiry({ ...valid, category: "Retail account" });
  assert.equal(category.ok, false);
  const honeypot = parseInquiry({ ...valid, vx_company_site: "https://spam.example" });
  assert.equal(honeypot.ok, false);
  if (!honeypot.ok && "honeypot" in honeypot) assert.equal(honeypot.honeypot, true);
});

test("mock delivery is distinct from live SMTP, and missing SMTP does not claim a send", async () => {
  (process.env as Record<string, string | undefined>).NODE_ENV = "test";
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_FROM;
  delete process.env.CONTACT_TO;
  resetRateLimit();

  process.env.CONTACT_DELIVERY = "mock";
  const mocked = await handleContact(requestFor(valid, "203.0.113.20"));
  const mockedBody = await mocked.json();
  assert.equal(mocked.status, 200);
  assert.equal(mockedBody.delivery, "mock");
  assert.notEqual(mockedBody.delivery, "smtp");

  delete process.env.CONTACT_DELIVERY;
  resetRateLimit();
  const unavailable = await handleContact(requestFor(valid, "203.0.113.21"));
  const unavailableBody = await unavailable.json();
  assert.equal(unavailable.status, 503);
  assert.equal(unavailableBody.ok, false);
  assert.equal(unavailableBody.code, "unconfigured");
  assert.match(unavailableBody.message, /not sent/i);
  assert.doesNotMatch(unavailableBody.message, /has been sent/i);

  const html = await handleContact(requestFor(valid, "203.0.113.22", true));
  const htmlBody = await html.text();
  assert.equal(html.status, 503);
  assert.match(htmlBody, /not sent/i);
  assert.equal(htmlBody.includes("has been sent"), false);

  process.env.CONTACT_DELIVERY = "mock";
  resetRateLimit();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await handleContact(requestFor(valid, "203.0.113.23"));
    assert.equal(response.status, 200);
  }
  const limited = await handleContact(requestFor(valid, "203.0.113.23"));
  assert.equal(limited.status, 429);
  const limitedBody = await limited.json();
  assert.equal(limitedBody.ok, false);
  assert.match(limitedBody.message, /not sent/i);
});
