import { partnerships } from "@/lib/content";
import { Icon, type IconName } from "./Icon";

const partnerIcons: Record<string, IconName> = {
  "Institutional Capital Providers": "landmark",
  "Exchanges & DEXs": "building-2",
  "Trading Firms & OTC Desks": "briefcase",
  "RWA & DeFi Protocols": "network",
  "Payment Institutions": "credit-card",
};

export function PartnershipTable() {
  return (
    <div className="mt-12 overflow-hidden border border-line bg-white text-left shadow-[0_24px_60px_rgba(8,20,38,0.06)]">
      <table className="w-full border-separate border-spacing-0 text-base">
        <caption className="sr-only">
          Institutional partner types, what they need, and what Vantrex provides
        </caption>
        <thead>
          <tr className="max-md:sr-only">
            <th scope="col" className="w-[30%] bg-navy px-6 py-4 text-left text-sm font-medium tracking-wide text-white">
              {partnerships.columns.type}
            </th>
            <th scope="col" className="w-[35%] bg-navy/95 px-6 py-4 text-left text-sm font-medium tracking-wide text-white">
              {partnerships.columns.need}
            </th>
            <th scope="col" className="w-[35%] bg-navy/90 px-6 py-4 text-left text-sm font-medium tracking-wide text-white">
              {partnerships.columns.provides}
            </th>
          </tr>
        </thead>
        <tbody>
          {partnerships.rows.map((row, index) => (
            <tr key={row.type} className={`max-md:block ${index % 2 === 1 ? "bg-offwhite/80" : "bg-white"}`}>
              <th
                scope="row"
                className="border-b border-line px-6 py-6 text-left align-top font-medium text-navy max-md:block max-md:border-b-0 max-md:bg-navy max-md:text-white"
              >
                <span className="flex items-start gap-3">
                  <Icon
                    name={partnerIcons[row.type] ?? "briefcase"}
                    className="mt-0.5 h-6 w-6 shrink-0 text-accent max-md:text-silver"
                  />
                  <span>{row.type}</span>
                </span>
              </th>
              <td className="border-b border-line px-6 py-6 align-top text-ink max-md:block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-blue md:sr-only">
                  {partnerships.columns.need}
                </span>
                {row.need}
              </td>
              <td className="border-b border-line px-6 py-6 align-top text-ink max-md:block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-blue md:sr-only">
                  {partnerships.columns.provides}
                </span>
                {row.provides}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
