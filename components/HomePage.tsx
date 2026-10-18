import Link from "next/link";
import {
  company,
  contactCopy,
  ecosystem,
  finalCta,
  group,
  hero,
  partnerships,
  routes,
  solutions,
} from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { ContactForm } from "./ContactForm";
import { CtaBand } from "./CtaBand";
import { HeroDecor } from "./HeroDecor";

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-offwhite">
        <HeroDecor />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <p className="text-sm font-medium text-[#d5dde6]">{company.type}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-[clamp(2.5rem,6vw,4.85rem)] text-offwhite">{hero.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d5dde6]">{hero.description}</p>
          <p className="mt-6 flex items-center gap-3 text-[15px] text-[#d5dde6]">
            <span aria-hidden="true" className="h-px w-8 bg-silver" />
            {hero.supporting}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.solutions} variant="accent">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={routes.partnerships} variant="outline">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="solutions" className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] text-navy">{solutions.headline}</h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-8 text-muted">{company.complementary}</p>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {solutions.items.map((item, index) => (
            <li key={item.name} className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-medium text-muted">0{index + 1}</p>
              <p className="mt-4 text-sm font-medium text-blue">{item.name}</p>
              <h3 className="mt-2 text-[1.7rem] text-navy">{item.headline}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-7 text-muted">{item.description}</p>
              <Link href={item.href} className="mt-6 inline-flex text-[15px] font-medium text-navy underline decoration-silver underline-offset-4">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-navy">{ecosystem.headline}</h2>
            <p className="mt-5 text-[17px] leading-8 text-muted">{ecosystem.intro}</p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {ecosystem.counterparties.map((item) => (
              <li key={item} className="py-4 text-[17px] text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8 md:pb-28">
          <p className="max-w-3xl border-l-4 border-accent pl-5 text-[17px] leading-8 text-ink">{ecosystem.reciprocity}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <p className="text-sm font-medium text-blue">{group.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] text-navy">{group.headline}</h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-8 text-muted">{group.intro}</p>
        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-silver lg:block" />
          <ul className="relative grid gap-4 lg:grid-cols-3">
            {group.companies.map((item) => {
              const hub = item.name === "Vantrex";
              return (
                <li key={item.name} className={`min-w-0 rounded-2xl border p-6 ${hub ? "border-navy bg-navy text-offwhite" : "border-line bg-white"}`}>
                  <h3 className={`text-[1.6rem] ${hub ? "text-offwhite" : "text-navy"}`}>{item.name}</h3>
                  <p className={`mt-3 text-[16px] leading-7 ${hub ? "text-[#d7e0ea]" : "text-ink"}`}>{item.summary}</p>
                  <p className={`mt-5 text-sm font-medium ${hub ? "text-[#d7e0ea]" : "text-muted"}`}>Core business</p>
                  <p className={`mt-1 text-[16px] leading-7 ${hub ? "text-offwhite" : "text-ink"}`}>{item.coreBusiness}</p>
                  <p className={`mt-5 text-sm font-medium ${hub ? "text-[#d7e0ea]" : "text-muted"}`}>Relationship with Vantrex</p>
                  <p className={`mt-1 text-[16px] leading-7 ${hub ? "text-offwhite" : "text-ink"}`}>{item.relationship}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-8 max-w-3xl text-[17px] leading-8 text-ink">{group.together}</p>
      </section>

      <section id="partnerships" className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] text-navy">{partnerships.headline}</h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-8 text-muted">{partnerships.intro}</p>
          <ul className="mt-10 grid gap-4">
            {partnerships.rows.map((row) => (
              <li key={row.type} className="grid gap-5 rounded-2xl border border-line bg-offwhite p-5 md:grid-cols-3 md:bg-white">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{partnerships.columns.type}</p>
                  <h3 className="mt-2 text-[1.2rem] text-navy">{row.type}</h3>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{partnerships.columns.need}</p>
                  <p className="mt-2 text-[16px] leading-7 text-ink">{row.need}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{partnerships.columns.provides}</p>
                  <p className="mt-2 text-[16px] leading-7 text-ink">{row.provides}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href={routes.contactStrategic} variant="accent">
              {partnerships.cta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand
        title={finalCta.headline}
        actions={[
          { href: routes.contactCapital, label: finalCta.primary, variant: "light" },
          { href: routes.contact, label: finalCta.secondary, variant: "outline" },
        ]}
      >
        {finalCta.body}
      </CtaBand>

      <section id="contact" className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-navy">{contactCopy.headline}</h2>
          <p className="mt-5 text-[17px] leading-8 text-muted">{contactCopy.body}</p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
