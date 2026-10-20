import { metrics } from "@/lib/content";
import { Icon } from "./Icon";

export function MetricsBand() {
  return (
    <section className="border-t border-line bg-offwhite" aria-labelledby="metrics-heading">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 md:py-24">
        <h2 id="metrics-heading" className="max-w-3xl text-[clamp(2.25rem,4vw,2.75rem)] text-navy">
          {metrics.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-xl leading-8 text-ink">{metrics.subtitle}</p>

        <ul className="mt-12 overflow-hidden border border-line">
          {metrics.rows.map((row, index) => (
            <li
              key={row.label}
              className={`group border-b border-line last:border-b-0 transition-colors duration-200 hover:bg-accent focus-within:bg-accent ${
                index % 2 === 1 ? "bg-white" : "bg-[#eef2f7]"
              }`}
            >
              <div className="grid grid-cols-[minmax(0,20rem)_2.75rem_minmax(4.75rem,auto)] items-center gap-x-4 px-5 py-5 sm:grid-cols-[minmax(0,34rem)_3rem_minmax(5.5rem,auto)] sm:gap-x-5 sm:px-7 sm:py-6">
                <p className="text-base leading-6 text-ink transition-colors duration-200 group-hover:text-white group-focus-within:text-white sm:text-lg">
                  {row.label}
                </p>
                <span className="flex h-11 w-11 items-center justify-center justify-self-center border border-line bg-white text-blue transition-colors duration-200 group-hover:border-white/25 group-hover:bg-white/15 group-hover:text-white group-focus-within:border-white/25 group-focus-within:bg-white/15 group-focus-within:text-white sm:h-12 sm:w-12">
                  <Icon name={row.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <p className="text-left text-[clamp(1.75rem,3vw,2.35rem)] font-medium leading-none tracking-[-0.02em] text-navy transition-colors duration-200 group-hover:text-white group-focus-within:text-white">
                  {row.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
