import Image from "next/image";
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
import { Icon, type IconName } from "./Icon";
import { MetricsBand } from "./MetricsBand";
import { PartnershipTable } from "./PartnershipTable";

const solutionIcons: IconName[] = ["droplets", "chart-candlestick", "handshake"];
const counterpartyIcons: IconName[] = ["building-2", "briefcase", "network", "credit-card", "landmark"];
const groupLogos: Record<string, { src: string; width: number; height: number }> = {
  VaultAlpha: { src: "/group/vaultalpha.png", width: 173, height: 118 },
  Velorapay: { src: "/group/velorapay.png", width: 600, height: 389 },
  Vantrex: { src: "/group/vantrex.png", width: 800, height: 292 },
};

export function HomePage() {
  return (
    <>
      <section className="relative -mt-[68px] flex min-h-dvh items-center overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-liquidity-bg.jpg')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/80"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1020px] flex-col items-center px-5 pb-40 pt-[calc(68px+1rem)] text-center sm:px-8 md:pb-52 md:pt-[calc(68px+1.5rem)]">
          <p className="text-base font-medium text-silver">{company.type}</p>
          <h1 className="mt-5 text-balance text-[clamp(2.75rem,6.2vw,4.5rem)] leading-[1.08] text-white">{hero.headline}</h1>
          <p className="mt-6 max-w-2xl text-xl font-normal leading-7 text-white/90">{hero.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.solutions} variant="accent">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={routes.partnerships} variant="inverse">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
          <p className="mt-10 text-base text-silver">{hero.supporting}</p>
        </div>
      </section>

      <MetricsBand />

      <section id="solutions" className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{solutions.headline}</h2>
            <p className="mt-5 text-xl leading-8 text-ink">{company.complementary}</p>
          </div>
          <ul className="mt-14 grid gap-0 border-y border-line lg:grid-cols-3">
            {solutions.items.map((item, index) => (
              <li
                key={item.name}
                className="group flex flex-col border-b border-line py-10 transition-colors duration-200 last:border-b-0 hover:bg-offwhite/70 lg:border-b-0 lg:px-8 lg:py-12 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center border border-line bg-offwhite text-blue transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                    <Icon name={solutionIcons[index] ?? "layers"} className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-medium text-silver">0{index + 1}</span>
                </div>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-accent">{item.name}</p>
                <h3 className="mt-2 text-[1.875rem] leading-10 text-navy">{item.headline}</h3>
                <p className="mt-3 text-base leading-7 text-ink">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-2 self-start pt-7 text-base font-medium text-blue transition-colors duration-200 hover:text-accent"
                >
                  {item.name}
                  <Icon name="arrow-up-right" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 lg:py-[90px]">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-white">{ecosystem.headline}</h2>
            <p className="mt-5 text-xl leading-8 text-[#d7e0ea]">{ecosystem.intro}</p>
          </div>
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {ecosystem.counterparties.map((item, index) => (
              <li key={item} className="flex items-start gap-4 border-b border-white/15 py-5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-silver">
                  <Icon name={counterpartyIcons[index] ?? "building-2"} className="h-5 w-5" />
                </span>
                <span className="text-lg leading-7 text-white">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-xl leading-8 text-white">{ecosystem.reciprocity}</p>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <p className="flex items-center gap-3 text-sm font-medium text-blue">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {group.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{group.headline}</h2>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-ink">{group.intro}</p>

          <div className="mt-12 hidden items-center gap-3 lg:flex" aria-hidden="true">
            {group.companies.map((item, index) => (
              <div key={item.name} className="flex min-w-0 flex-1 items-center gap-3">
                <span className={`h-2.5 w-2.5 shrink-0 ${item.name === "Vantrex" ? "bg-accent" : "bg-navy"}`} />
                <span className="text-sm font-medium text-ink">{item.name}</span>
                {index < group.companies.length - 1 ? <span className="h-px flex-1 bg-silver" /> : null}
              </div>
            ))}
          </div>

          <ul className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line lg:border lg:border-line lg:bg-white">
            {group.companies.map((item) => {
              const hub = item.name === "Vantrex";
              return (
                <li
                  key={item.name}
                  className={`min-w-0 px-6 py-8 md:px-8 lg:py-10 ${
                    hub ? "border border-navy bg-navy text-white lg:border-0" : "border border-line bg-white text-ink lg:border-0"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {groupLogos[item.name] ? (
                      <Image
                        src={groupLogos[item.name].src}
                        alt=""
                        aria-hidden="true"
                        width={groupLogos[item.name].width}
                        height={groupLogos[item.name].height}
                        className="h-9 w-auto shrink-0 object-contain"
                      />
                    ) : null}
                    <h3 className={`text-[1.7rem] leading-9 ${hub ? "text-white" : "text-navy"}`}>{item.name}</h3>
                  </div>
                  <p className={`mt-4 text-base leading-7 ${hub ? "text-white/90" : "text-ink"}`}>{item.summary}</p>
                  <div className={`mt-8 border-t pt-5 ${hub ? "border-white/20" : "border-line"}`}>
                    <p className={`text-xs font-medium uppercase tracking-[0.08em] ${hub ? "text-silver" : "text-blue"}`}>
                      Core business
                    </p>
                    <p className={`mt-2 text-base leading-7 ${hub ? "text-white" : "text-ink"}`}>{item.coreBusiness}</p>
                  </div>
                  <div className="mt-5">
                    <p className={`text-xs font-medium uppercase tracking-[0.08em] ${hub ? "text-silver" : "text-blue"}`}>
                      Relationship with Vantrex
                    </p>
                    <p className={`mt-2 text-base leading-7 ${hub ? "text-white" : "text-ink"}`}>{item.relationship}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 max-w-3xl text-xl leading-8 text-ink">{group.together}</p>
        </div>
      </section>

      <section id="partnerships" className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{partnerships.headline}</h2>
            <p className="mt-5 text-xl leading-8 text-ink">{partnerships.intro}</p>
          </div>
          <PartnershipTable />
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

      <section id="contact" className="border-t border-line bg-offwhite">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div>
            <p className="flex items-center gap-3 text-sm font-medium text-blue">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Contact
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{contactCopy.headline}</h2>
            <p className="mt-5 text-xl leading-8 text-ink">{contactCopy.body}</p>
          </div>
          <div className="border border-line bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
