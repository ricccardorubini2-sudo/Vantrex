import Link from "next/link";
import { routes } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";

type Action = {
  href: string;
  label: string;
  variant: "accent" | "light" | "outline" | "quiet";
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
    <section className="bg-navy text-offwhite">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-24">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.15rem)] text-offwhite">{title}</h2>
        <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[#d7e0ea]">{children}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {actions.map((action) => (
            <ButtonLink key={action.label} href={action.href} variant={action.variant}>
              {action.label}
            </ButtonLink>
          ))}
        </div>
        {showPartnerships ? (
          <p className="mt-8 text-[16px] text-[#d7e0ea]">
            <Link href={routes.partnerships} className="text-offwhite underline decoration-silver underline-offset-4">
              Institutional Partnerships
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
