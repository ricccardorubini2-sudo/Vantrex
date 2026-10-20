export function StatStrip({
  items,
  "aria-label": ariaLabel = "Key metrics",
}: {
  items: { value: string; label: string }[];
  "aria-label"?: string;
}) {
  const desktopCols =
    items.length >= 5 ? "lg:grid-cols-5" : items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 md:py-14" aria-label={ariaLabel}>
      <ul className={`grid grid-cols-2 gap-y-10 sm:grid-cols-3 ${desktopCols} lg:gap-y-0`}>
        {items.map((item, index) => (
          <li
            key={item.label}
            className={`relative flex flex-col items-center px-3 text-center sm:px-4 lg:px-5 ${
              index % 2 === 1 ? "max-sm:border-l max-sm:border-line" : ""
            }`}
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-line lg:block"
              />
            ) : null}
            <p className="whitespace-nowrap text-[clamp(1.65rem,2.8vw,2.85rem)] font-medium leading-none tracking-[-0.03em] text-navy">
              {item.value}
            </p>
            <p className="mt-3 max-w-[10.5rem] text-sm leading-5 text-muted sm:text-base sm:leading-6">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
