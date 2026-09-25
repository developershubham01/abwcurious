import { cn } from "@/lib/utils";

/**
 * ABWcurious logo — a faithful SVG recreation of the brand mark:
 * two blue swoosh arcs forming a circle + "ABW" (bold) + "curious" (light blue) + TM.
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

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <LogoMark className={cn("shrink-0", compact ? "h-8 w-8" : "h-9 w-9")} />
      <span className="flex items-baseline leading-none whitespace-nowrap">
        <span className={cn("font-bold tracking-tight", compact ? "text-xl" : "text-2xl")}>
          ABW
        </span>
        <span
          className={cn(
            "font-light text-ibm-bright tracking-tight",
            compact ? "text-xl" : "text-2xl"
          )}
        >
          curious
        </span>
        <span className="text-[9px] font-mono text-ibm-soft ml-0.5 -translate-y-2">™</span>
      </span>
    </span>
  );
}
