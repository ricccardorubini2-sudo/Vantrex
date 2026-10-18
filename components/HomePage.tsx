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

export function HomePage() {
  return (
    <>
      <section className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[920px] flex-col items-center px-5 py-20 text-center sm:px-8 md:py-28">
          <p className="text-base font-medium">{company.type}</p>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,3.375rem)] leading-[1.22] text-black">{hero.headline}</h1>
          <p className="mt-6 max-w-2xl text-xl font-normal leading-7 text-black">{hero.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.solutions} variant="accent">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={routes.partnerships} variant="outline">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
          <p className="mt-10 text-base text-muted">{hero.supporting}</p>
        </div>
      </section>

      <section id="solutions" className="mx-auto w-full max-w-[1200px] px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-black">{solutions.headline}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-black">{company.complementary}</p>
        <ul className="mt-12 grid gap-2 text-left lg:grid-cols-3">
          {solutions.items.map((item) => (
            <li key={item.name} className="flex min-w-0 flex-col bg-offwhite px-6 py-10 md:px-8">
              <p className="text-base font-medium text-accent">{item.name}</p>
              <h3 className="mt-3 text-[1.875rem] leading-10 text-black">{item.headline}</h3>
              <p className="mt-3 flex-1 text-base leading-6 text-black">{item.description}</p>
              <Link href={item.href} className="mt-6 inline-flex text-base font-medium text-accent">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-[90px]">
          <div>
            <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-white">{ecosystem.headline}</h2>
            <p className="mt-5 text-xl leading-8 text-white">{ecosystem.intro}</p>
          </div>
          <ul>
            {ecosystem.counterparties.map((item) => (
              <li key={item} className="flex gap-3 border-b border-white/15 py-4 text-xl leading-7 text-white">
                <span aria-hidden="true" className="mt-1 text-base text-white">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8 md:pb-24">
          <p className="max-w-3xl text-xl leading-8 text-white">{ecosystem.reciprocity}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 py-20 text-center sm:px-8 md:py-28">
        <p className="text-base font-medium text-black">{group.eyebrow}</p>
        <h2 className="mt-3 text-[clamp(2.25rem,4vw,2.75rem)] text-black">{group.headline}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-black">{group.intro}</p>
        <ul className="mt-12 grid gap-2 text-left lg:grid-cols-3">
          {group.companies.map((item) => {
            const hub = item.name === "Vantrex";
            return (
              <li key={item.name} className={`min-w-0 px-6 py-10 md:px-8 ${hub ? "bg-navy text-white" : "bg-offwhite text-black"}`}>
                <h3 className={`text-[1.875rem] leading-10 ${hub ? "text-white" : "text-black"}`}>{item.name}</h3>
                <p className={`mt-3 text-base leading-6 ${hub ? "text-white" : "text-black"}`}>{item.summary}</p>
                <p className={`mt-5 text-sm font-medium ${hub ? "text-white/70" : "text-muted"}`}>Core business</p>
                <p className={`mt-1 text-base leading-6 ${hub ? "text-white" : "text-black"}`}>{item.coreBusiness}</p>
                <p className={`mt-5 text-sm font-medium ${hub ? "text-white/70" : "text-muted"}`}>Relationship with Vantrex</p>
                <p className={`mt-1 text-base leading-6 ${hub ? "text-white" : "text-black"}`}>{item.relationship}</p>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-black">{group.together}</p>
      </section>

      <section id="partnerships" className="bg-offwhite">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 text-center sm:px-8 md:py-28">
          <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-black">{partnerships.headline}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-black">{partnerships.intro}</p>
          <div className="mt-12 overflow-x-auto rounded-2xl bg-white text-left outline outline-1 -outline-offset-1 outline-[#d1d5db]">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-base">
              <thead>
                <tr>
                  <th scope="col" className="bg-[#16181d] px-5 py-3 text-left font-medium text-white">
                    {partnerships.columns.type}
                  </th>
                  <th scope="col" className="border-b border-[#e5e7eb] px-5 py-3 text-left font-medium text-black">
                    {partnerships.columns.need}
                  </th>
                  <th scope="col" className="border-b border-[#e5e7eb] px-5 py-3 text-left font-medium text-black">
                    {partnerships.columns.provides}
                  </th>
                </tr>
              </thead>
              <tbody>
                {partnerships.rows.map((row) => (
                  <tr key={row.type}>
                    <th scope="row" className="bg-[#16181d] px-5 py-3 text-left font-normal text-white">
                      {row.type}
                    </th>
                    <td className="border-b border-[#e5e7eb] px-5 py-3 align-top text-black">{row.need}</td>
                    <td className="border-b border-[#e5e7eb] px-5 py-3 align-top text-black">{row.provides}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          { href: routes.contact, label: finalCta.secondary, variant: "inverse" },
        ]}
      >
        {finalCta.body}
      </CtaBand>

      <section id="contact" className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-black">{contactCopy.headline}</h2>
          <p className="mt-5 text-xl leading-8 text-black">{contactCopy.body}</p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
