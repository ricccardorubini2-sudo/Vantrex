import Image from "next/image";

export type PartnerItem = {
  name: string;
  href: string;
  logo: string;
};

function PartnerChip({ partner, compact = false, dark = false }: { partner: PartnerItem; compact?: boolean; dark?: boolean }) {
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex shrink-0 items-center gap-2.5 sm:gap-3 ${compact ? "px-3 sm:px-4" : "pr-6 sm:pr-8"}`}
    >
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-[#eceff3] sm:h-11 sm:w-11">
        <Image
          src={partner.logo}
          alt=""
          width={36}
          height={36}
          className="h-6 w-6 object-contain opacity-90 grayscale contrast-125 sm:h-7 sm:w-7"
        />
      </span>
      <span className={`whitespace-nowrap text-[15px] font-medium sm:text-base ${dark ? "text-white" : "text-navy"}`}>{partner.name}</span>
    </a>
  );
}

function FlowRow({
  partners,
  reverse = false,
  dark = false,
}: {
  partners: PartnerItem[];
  reverse?: boolean;
  dark?: boolean;
}) {
  const short = partners.length <= 4;

  if (short) {
    return (
      <div className="flex justify-center py-2">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-y-2">
          {partners.map((partner) => (
            <PartnerChip key={partner.name} partner={partner} compact dark={dark} />
          ))}
        </div>
      </div>
    );
  }

  const loop = [...partners, ...partners];

  return (
    <div className="partner-flow relative overflow-hidden py-2">
      <div className={`partner-flow-track ${reverse ? "partner-flow-track-reverse" : ""}`}>
        {loop.map((partner, index) => (
          <PartnerChip key={`${partner.name}-${index}`} partner={partner} dark={dark} />
        ))}
      </div>
    </div>
  );
}

export function PartnerFlows({
  headline,
  subtitle,
  primaryFlow,
  secondaryFlow,
  dark = false,
}: {
  headline?: string;
  subtitle?: string;
  primaryFlow: PartnerItem[];
  secondaryFlow: PartnerItem[];
  dark?: boolean;
}) {
  return (
    <div className={dark ? (headline ? "pt-16 md:pt-20" : "pt-12 md:pt-14") : ""}>
      {headline ? (
        <div className="mx-auto w-full max-w-[1200px] px-5 text-center sm:px-8">
          <h2 className={`text-balance text-[clamp(2.25rem,4vw,2.75rem)] ${dark ? "text-white" : "text-navy"}`}>{headline}</h2>
          {subtitle ? (
            <p className={`mx-auto mt-4 max-w-3xl text-xl leading-8 ${dark ? "text-silver" : "text-ink"}`}>{subtitle}</p>
          ) : null}
        </div>
      ) : null}
      <div
        className={`mx-auto w-full max-w-[1100px] space-y-4 px-2 pb-14 sm:px-4 md:pb-16 ${headline ? "mt-10" : ""}`}
      >
        <FlowRow partners={primaryFlow} dark={dark} />
        <FlowRow partners={secondaryFlow} reverse dark={dark} />
      </div>
    </div>
  );
}
