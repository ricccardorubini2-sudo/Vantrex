type IconName =
  | "layers"
  | "git-branch"
  | "arrow-left-right"
  | "handshake"
  | "building-2"
  | "download"
  | "share-2"
  | "file-text"
  | "hexagon"
  | "package"
  | "coins"
  | "wallet"
  | "landmark"
  | "users"
  | "network"
  | "credit-card"
  | "refresh-cw"
  | "link-2"
  | "check"
  | "arrow-up-right"
  | "circle-dollar-sign"
  | "briefcase"
  | "shield"
  | "waypoints"
  | "scale"
  | "banknote"
  | "chart-column"
  | "chart-candlestick"
  | "chart-bar"
  | "chart-line"
  | "activity"
  | "trending-up"
  | "globe"
  | "gem"
  | "database"
  | "users-round"
  | "droplets"
  | "linkedin"
  | "telegram"
  | "x"
  | "hand-coins";

export function Icon({
  name,
  className = "h-7 w-7",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url(/icons/${name}.svg)`,
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export type { IconName };
