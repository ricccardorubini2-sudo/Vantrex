import { Icon, type IconName } from "./Icon";

export function ProductHero({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <section className="border-b border-line bg-offwhite text-ink">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <p className="flex items-center gap-3 text-sm font-medium text-blue">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.35rem,4.5vw,3.375rem)] leading-[1.15] text-navy">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-ink">{lede}</p>
      </div>
    </section>
  );
}

/** Liquidity: connected vertical process with spine */
export function ProcessServices({
  title,
  services,
  icons,
}: {
  title: string;
  services: { name: string; activity: string }[];
  icons: IconName[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
        <ol className="relative mt-14 space-y-0">
          <span aria-hidden="true" className="absolute bottom-8 left-[1.15rem] top-8 hidden w-px bg-line md:block" />
          {services.map((service, index) => (
            <li key={service.name} className="relative grid gap-6 border-t border-line py-10 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-10">
              <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-blue">
                <Icon name={icons[index] ?? "layers"} className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-silver">0{index + 1}</p>
                <h3 className="mt-2 text-[1.65rem] leading-9 text-navy">{service.name}</h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-ink">{service.activity}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Market Making: alternating illustration-style rows */
export function AlternatingServices({
  title,
  services,
  icons,
}: {
  title: string;
  services: { name: string; activity: string }[];
  icons: IconName[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
        <div className="mt-6">
          {services.map((service, index) => (
            <article
              key={service.name}
              className="grid items-center gap-8 border-t border-line py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            >
              <div className={`flex min-h-[160px] items-center justify-center border border-line bg-offwhite ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Icon name={icons[index] ?? "chart-candlestick"} className="h-16 w-16 text-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-silver">0{index + 1}</p>
                <h3 className="mt-2 text-[1.7rem] leading-9 text-navy">{service.name}</h3>
                <p className="mt-3 text-base leading-7 text-ink">{service.activity}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** OTC: icon-led open rows */
export function IconServiceRows({
  title,
  services,
  icons,
}: {
  title: string;
  services: { name: string; activity: string }[];
  icons: IconName[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
        <ul className="mt-12">
          {services.map((service, index) => (
            <li key={service.name} className="grid gap-5 border-t border-line py-9 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8">
              <div className="flex h-14 w-14 items-center justify-center bg-navy text-white">
                <Icon name={icons[index] ?? "handshake"} className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-[1.55rem] leading-8 text-navy">{service.name}</h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-ink">{service.activity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Benefits: open numbered list (liquidity) */
export function NumberedBenefits({
  title,
  intro,
  points,
  note,
  icons,
}: {
  title: string;
  intro: string;
  points: { name?: string; detail: string }[];
  note?: string;
  icons: IconName[];
}) {
  return (
    <section className="border-t border-line bg-offwhite">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
          <p className="mt-5 text-xl leading-8 text-ink">{intro}</p>
        </div>
        <div>
          <ol>
            {points.map((point, index) => (
              <li key={point.detail} className="flex gap-4 border-t border-line py-6">
                <Icon name={icons[index] ?? "check"} className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-silver">0{index + 1}</p>
                  {point.name ? <h3 className="mt-1 text-[1.25rem] leading-7 text-navy">{point.name}</h3> : null}
                  <p className={`text-base leading-7 text-ink ${point.name ? "mt-2" : "mt-1"}`}>{point.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          {note ? <p className="border-t border-line pt-6 text-base leading-7 text-blue">{note}</p> : null}
        </div>
      </div>
    </section>
  );
}

/** Principles: typographic columns with top rule */
export function PrincipleColumns({
  title,
  intro,
  points,
  icons,
}: {
  title: string;
  intro: string;
  points: { name?: string; detail: string }[];
  icons: IconName[];
}) {
  return (
    <section className="border-t border-line bg-offwhite">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
        <p className="mt-5 max-w-3xl text-xl leading-8 text-ink">{intro}</p>
        <ul className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {points.map((point, index) => (
            <li key={point.detail} className="border-t-2 border-navy pt-6">
              <Icon name={icons[index] ?? "activity"} className="h-7 w-7 text-blue" />
              {point.name ? <h3 className="mt-5 text-[1.4rem] leading-8 text-navy">{point.name}</h3> : null}
              <p className={`text-base leading-7 text-ink ${point.name ? "mt-3" : "mt-5"}`}>{point.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Advantages: split composition */
export function AdvantageSplit({
  title,
  intro,
  points,
  icons,
}: {
  title: string;
  intro: string;
  points: { name?: string; detail: string }[];
  icons: IconName[];
}) {
  return (
    <section className="border-t border-line bg-offwhite">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
          <p className="mt-5 text-xl leading-8 text-ink">{intro}</p>
        </div>
        <ol>
          {points.map((point, index) => (
            <li key={point.detail} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-t border-line py-6">
              <div className="flex h-11 w-11 items-center justify-center border border-line bg-white text-blue">
                <Icon name={icons[index] ?? "shield"} className="h-5 w-5" />
              </div>
              <div>
                {point.name ? <h3 className="text-[1.3rem] leading-7 text-navy">{point.name}</h3> : null}
                <p className={`text-base leading-7 text-ink ${point.name ? "mt-2" : ""}`}>{point.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ProseSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[800px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-navy">{title}</h2>
        <div className="mt-5 space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`text-xl leading-8 text-ink ${index === paragraphs.length - 1 && paragraphs.length > 1 ? "border-l-2 border-accent pl-5" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
