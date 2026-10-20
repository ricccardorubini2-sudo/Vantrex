import { siteConfig } from "@/lib/config";
import { Icon, type IconName } from "./Icon";

/**
 * Official social destinations from central configuration.
 * A link renders only when a verified https: URL is configured;
 * unconfigured networks stay hidden and are tracked in
 * docs/launch-inputs.md.
 */
const networks: { key: "linkedin" | "telegram" | "x"; label: string; icon: IconName }[] = [
  { key: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { key: "telegram", label: "Telegram", icon: "telegram" },
  { key: "x", label: "X", icon: "x" },
];

export function configuredSocials() {
  return networks
    .map((network) => ({ ...network, href: siteConfig.socials[network.key] }))
    .filter((network): network is typeof network & { href: string } => {
      if (!network.href) return false;
      try {
        return new URL(network.href).protocol === "https:";
      } catch {
        return false;
      }
    });
}

export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const socials = configuredSocials();
  if (socials.length === 0) return null;
  return (
    <ul className="flex items-center gap-3" aria-label="Vantrex on social media">
      {socials.map((network) => (
        <li key={network.key}>
          <a
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Vantrex on ${network.label} (opens in a new tab)`}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
              tone === "light"
                ? "border-white/25 text-white hover:border-white hover:bg-white/10"
                : "border-line text-navy hover:border-accent hover:text-accent"
            }`}
          >
            <Icon name={network.icon} className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
