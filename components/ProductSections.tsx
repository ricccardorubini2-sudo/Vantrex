export function ProductHero({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto flex w-full max-w-[920px] flex-col items-center px-5 py-20 text-center sm:px-8 md:py-28">
        <p className="text-base font-medium">{eyebrow}</p>
        <h1 className="mt-4 text-balance text-[clamp(2.25rem,4.5vw,3.375rem)] leading-[1.22] text-black">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-black">{lede}</p>
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
    <section className="mx-auto w-full max-w-[1200px] px-5 py-20 text-center sm:px-8 md:py-28">
      <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-black">{title}</h2>
      <ul className="mt-12 grid gap-2 text-left md:grid-cols-3">
        {services.map((service) => (
          <li key={service.name} className="min-w-0 bg-offwhite px-6 py-10 md:px-8">
            <h3 className="text-[1.5rem] leading-8 text-black">{service.name}</h3>
            <p className="mt-3 text-base leading-6 text-black">{service.activity}</p>
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
    <section className="bg-offwhite">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-black">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-black">{intro}</p>
        <ul className="mt-12 grid gap-2 text-left md:grid-cols-3">
          {points.map((point) => (
            <li key={point.detail} className="min-w-0 bg-white px-6 py-8 outline outline-1 -outline-offset-1 outline-[#d1d5db] md:px-8">
              {point.name ? <h3 className="text-[1.35rem] leading-8 text-black">{point.name}</h3> : null}
              <p className={point.name ? "mt-3 text-base leading-6 text-black" : "text-base leading-6 text-black"}>{point.detail}</p>
            </li>
          ))}
        </ul>
        {note ? <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-black">{note}</p> : null}
      </div>
    </section>
  );
}

export function ProseSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
      <h2 className="max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-black">{title}</h2>
      <div className="mt-5 max-w-3xl space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-xl leading-8 text-black">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
