import Link from "next/link";
import { routes } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";

type Action = {
  href: string;
  label: string;
  variant: "accent" | "light" | "outline" | "inverse" | "quiet";
};

export function CtaBand({
  title,
  children,
  actions,
  showPartnerships = false,
}: {
  title: string;
  children: string;
  actions: Action[];
  showPartnerships?: boolean;
}) {
  return (
    <section className="bg-[#0036cc] text-white">
      <div className="mx-auto flex w-full max-w-[840px] flex-col items-center px-5 py-20 text-center sm:px-8 md:py-24">
        <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] text-white">{title}</h2>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-white">{children}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {actions.map((action) => (
            <ButtonLink key={action.label} href={action.href} variant={action.variant}>
              {action.label}
            </ButtonLink>
          ))}
        </div>
        {showPartnerships ? (
          <p className="mt-8 text-base text-white">
            <Link href={routes.partnerships} className="underline decoration-white/50 underline-offset-4 hover:decoration-white">
              Institutional Partnerships
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
