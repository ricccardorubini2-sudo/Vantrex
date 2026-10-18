import assert from "node:assert/strict";
import test from "node:test";
import {
  brandMessages,
  company,
  contactCopy,
  ecosystem,
  finalCta,
  group,
  hero,
  inquiryCategories,
  liquidityPage,
  marketMakingPage,
  otcPage,
  partnerships,
  solutions,
} from "./content";

const required = [
  hero.headline,
  hero.description,
  hero.supporting,
  hero.primaryCta,
  hero.secondaryCta,
  company.overview,
  company.through,
  company.mission,
  company.differentiation,
  company.function,
  company.complementary,
  company.hub,
  solutions.headline,
  ecosystem.headline,
  ecosystem.intro,
  ecosystem.reciprocity,
  group.headline,
  group.intro,
  group.together,
  partnerships.headline,
  partnerships.intro,
  partnerships.cta,
  finalCta.headline,
  finalCta.body,
  finalCta.primary,
  finalCta.secondary,
  contactCopy.headline,
  contactCopy.body,
  contactCopy.submit,
  liquidityPage.eyebrow,
  liquidityPage.title,
  liquidityPage.lede,
  liquidityPage.returnsNote,
  marketMakingPage.eyebrow,
  marketMakingPage.title,
  marketMakingPage.vaultAlpha,
  otcPage.eyebrow,
  otcPage.title,
  otcPage.whyBody,
  otcPage.paymentsBody,
  "independent investment consideration",
  "available liquidity",
  "selected digital assets",
  "eligible portfolio projects",
  "eligible tokens",
  "approved institutional liquidity arrangements",
  "other supported stablecoins",
  "Potential revenue",
  "potential strategic capital relationships",
  "potential investment introductions",
  "agreed liquidity",
  "agreed terms",
  "external institutional counterparties",
  "Velorapay's ecosystem",
];

test("published copy keeps the supplied lines and qualifiers", () => {
  const blob = JSON.stringify({
    brandMessages,
    company,
    hero,
    solutions,
    ecosystem,
    group,
    partnerships,
    finalCta,
    contactCopy,
    liquidityPage,
    marketMakingPage,
    otcPage,
  });
  for (const phrase of required) assert.ok(blob.includes(phrase), phrase);
});

test("structure counts match the brief", () => {
  assert.equal(solutions.items.length, 3);
  assert.equal(ecosystem.counterparties.length, 5);
  assert.equal(group.companies.length, 3);
  assert.equal(partnerships.rows.length, 5);
  assert.equal(inquiryCategories.length, 4);
  assert.equal(liquidityPage.services.length, 3);
  assert.equal(liquidityPage.benefits.length, 3);
  assert.equal(marketMakingPage.services.length, 3);
  assert.equal(marketMakingPage.principles.length, 3);
  assert.equal(otcPage.services.length, 3);
  assert.equal(otcPage.advantages.length, 3);
  assert.deepEqual(Object.values(brandMessages), [
    hero.headline,
    liquidityPage.title,
    marketMakingPage.title,
    otcPage.title,
    partnerships.headline,
    contactCopy.headline,
  ]);
});
