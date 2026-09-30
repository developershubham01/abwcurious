import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ABWcurious logo — the REAL brand asset (user-supplied artwork):
 * blue swoosh ring + bold "ABW" + light "curious" + ®.
 *
 * Two official variants ship as tight-cropped transparent PNGs:
 *   /images/logo-abw.png        — dark "ABW" for light surfaces (header, hero)
 *   /images/logo-abw-white.png  — white "ABW" for dark surfaces (footer)
 * The standalone swoosh ring (/images/logo-abw-mark.png) is exposed via
 * <LogoMarkImage /> for decorative spots (hero medallion, favicon source).
 */

export const LOGO_RATIO = 471 / 231;

export function Logo({
  className,
  imageClassName,
  compact = false,
  onDark = false,
  size,
}: {
  className?: string;
  imageClassName?: string;
  compact?: boolean;
  onDark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClass = compact
    ? "h-9"
    : size === "sm"
      ? "h-8"
      : size === "md"
        ? "h-10"
        : size === "xl"
          ? "h-14 sm:h-16"
          : "h-11 sm:h-12"; // "lg" default (44px-48px) — perfectly proportioned for 64px navbar

  return (
    <span
      className={cn(
        "group inline-flex select-none items-center transition-transform duration-300 ease-out hover:scale-[1.03]",
        className
      )}
    >
      <Image
        src={onDark ? "/images/logo-abw-white.png" : "/images/logo-abw.png"}
        alt="ABWcurious — home"
        width={471}
        height={231}
        priority={!onDark}
        unoptimized
        draggable={false}
        className={cn(
          "w-auto max-h-none object-contain transition-[filter] duration-300 drop-shadow-sm",
          sizeClass,
          imageClassName,
          onDark
            ? "group-hover:drop-shadow-[0_0_16px_rgba(120,169,255,0.55)]"
            : "group-hover:drop-shadow-[0_4px_16px_rgba(15,98,254,0.4)]"
        )}
      />
    </span>
  );
}

/**
 * Standalone swoosh-ring mark (no wordmark) — real PNG, for decorative
 * medallion spots. Swaps to the white variant on dark surfaces.
 */
export function LogoMarkImage({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Image
      src={onDark ? "/images/logo-abw-mark-512.png" : "/images/logo-abw-mark.png"}
      alt=""
      aria-hidden="true"
      width={240}
      height={240}
      unoptimized
      draggable={false}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}

/**
 * Legacy SVG mark (animated arc draw). Kept for backwards compatibility
 * with parked modules; live chrome now uses the real PNG artwork above.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* outer swoosh */}
      <path
        className="logo-arc"
        style={{ ["--arc-len" as string]: "170", ["--arc-delay" as string]: "0s" }}
        d="M 60.5 15.5 A 30 30 0 1 0 65 42"
        stroke="#0f62fe"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* inner swoosh */}
      <path
        className="logo-arc"
        style={{ ["--arc-len" as string]: "120", ["--arc-delay" as string]: "0.25s" }}
        d="M 55 22 A 23 23 0 1 0 58.5 45"
        stroke="#1192e8"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* ABW core */}
      <text
        x="36"
        y="43.5"
        textAnchor="middle"
        fontFamily="var(--font-plex-sans), sans-serif"
        fontWeight="700"
        fontSize="24"
        letterSpacing="0.5"
        fill="currentColor"
      >
        ABW
      </text>
    </svg>
  );
}
