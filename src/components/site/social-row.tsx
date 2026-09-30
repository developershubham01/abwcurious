"use client";

import { Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import { XIcon } from "./x-icon";
import { SOCIALS, isPlaceholder, type SocialPlatform, type SocialLink } from "@/data/company";
import { cn } from "@/lib/utils";

export const PLATFORM_ICONS: Record<SocialPlatform, React.ComponentType<{ className?: string; strokeWidth?: number; size?: number | string; [key: string]: any }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: XIcon,
  youtube: Youtube,
  facebook: Facebook,
};

/**
 * Placeholder-aware social link.
 * Unresolved [PLACEHOLDER] hrefs render as a styled, non-navigating control
 * with a tooltip telling the editor where to add the real URL.
 */
export function SocialButton({
  link,
  variant = "light",
  size = "md",
  showLabel = false,
  className,
}: {
  link: SocialLink;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const Icon = PLATFORM_ICONS[link.platform];
  const dead = isPlaceholder(link.href);

  const sizeCls =
    size === "lg"
      ? "size-14 [&_svg]:size-6"
      : size === "sm"
        ? "size-8 [&_svg]:size-3.5"
        : "size-10 [&_svg]:size-[18px]";

  const variantCls =
    variant === "dark"
      ? "border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ibm-blue-active"
      : "border-hairline bg-white text-ink hover:border-ink hover:bg-ink hover:text-white";

  const shell = cn(
    "group/soc relative inline-flex shrink-0 items-center justify-center border transition-colors duration-200 focus-carbon",
    sizeCls,
    variantCls,
    dead && "cursor-default opacity-80",
    className
  );

  const hint = dead ? ` — placeholder, add the real URL in src/data/company.ts` : "";

  const body = (
    <>
      <Icon aria-hidden="true" strokeWidth={1.75} />
      {showLabel && (
        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs opacity-0 transition-all duration-300 group-hover/soc:-translate-y-0.5 group-hover/soc:opacity-100">
          {link.label}
        </span>
      )}
    </>
  );

  if (dead) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={`${link.label}${hint}`}
        className={shell}
      >
        {body}
      </span>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.label} — ${link.handle}${hint}`}
      title={`${link.label}${hint}`}
      className={shell}
    >
      {body}
    </a>
  );
}

/** Compact inline row of the brand's social buttons. */
export function SocialRow({
  variant = "light",
  size = "md",
  className,
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)} aria-label="Social media">
      {SOCIALS.map((s) => (
        <li key={s.platform}>
          <SocialButton link={s} variant={variant} size={size} />
        </li>
      ))}
    </ul>
  );
}
