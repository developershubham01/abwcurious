"use client";

import { Linkedin, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { SOCIALS, isPlaceholder, type SocialPlatform, type SocialLink } from "@/data/company";
import { cn } from "@/lib/utils";

export const PLATFORM_ICONS: Record<SocialPlatform, typeof Linkedin> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
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
      ? "size-14 rounded-2xl [&_svg]:size-6"
      : size === "sm"
        ? "size-8 rounded-lg [&_svg]:size-3.5"
        : "size-10 rounded-xl [&_svg]:size-[18px]";

  const variantCls =
    variant === "dark"
      ? "border-white/15 bg-white/10 text-white hover:border-white hover:bg-white hover:text-ibm-blue"
      : "border-ink/10 bg-white text-ink hover:border-ibm-blue hover:bg-ibm-blue hover:text-white";

  const shell = cn(
    "group/soc relative inline-flex shrink-0 items-center justify-center border shadow-[0_2px_10px_rgba(15,98,254,0.08)]",
    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(15,98,254,0.45)] focus-carbon",
    sizeCls,
    variantCls,
    dead && "cursor-default opacity-80 hover:translate-y-0",
    className
  );

  const hint = dead ? ` — placeholder, add the real URL in src/data/company.ts` : "";

  const body = (
    <>
      <Icon aria-hidden="true" strokeWidth={1.75} />
      {showLabel && (
        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover/soc:-translate-y-0.5 group-hover/soc:opacity-100">
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
