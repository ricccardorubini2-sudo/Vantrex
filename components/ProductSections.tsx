import { HeroDecor } from "./HeroDecor";

export function ProductHero({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-offwhite">
      <HeroDecor />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <p className="text-sm font-medium text-[#d5dde6]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance text-[clamp(2.25rem,4.6vw,4.15rem)] text-offwhite">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d5dde6]">{lede}</p>
      </div>
    </section>
  );
}

export function ServiceGrid({
  title,
  services,
}: {
  title: string;
  services: { name: string; activity: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
      <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] text-navy">{title}</h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.name} className="min-w-0 rounded-2xl border border-line bg-white p-6">
            <h3 className="text-[1.35rem] text-navy">{service.name}</h3>
            <p className="mt-3 text-[16px] leading-7 text-muted">{service.activity}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PointList({
  title,
  intro,
  points,
  note,
}: {
  title: string;
  intro: string;
  points: { name?: string; detail: string }[];
  note?: string;
}) {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] text-navy">{title}</h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-8 text-muted">{intro}</p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <li key={point.detail} className="min-w-0 rounded-2xl border border-line bg-offwhite p-6">
              {point.name ? <h3 className="text-[1.25rem] text-navy">{point.name}</h3> : null}
              <p className={point.name ? "mt-3 text-[16px] leading-7 text-ink" : "text-[16px] leading-7 text-ink"}>
                {point.detail}
              </p>
            </li>
          ))}
        </ul>
        {note ? <p className="mt-8 max-w-3xl text-[17px] leading-8 text-ink">{note}</p> : null}
      </div>
    </section>
  );
}

export function ProseSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
      <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] text-navy">{title}</h2>
      <div className="mt-5 max-w-3xl space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[17px] leading-8 text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
