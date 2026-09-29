"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Text animation kit — Carbon-styled, reduced-motion aware.
 * Used by the home hero/sections and the service category pages.
 */

/* ---------------- SplitText: word-by-word mask rise ---------------- */

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  duration = 0.7,
  immediate = false,
  once = true,
}: {
  text: string;
  className?: string;
  /** Applied to every inner word span — use for background-clip gradients
   *  (gradients on an ancestor wrapper break in Chromium once the word
   *  spans get their own compositing layer via will-change:transform). */
  wordClassName?: string;
  /** seconds before the first word starts */
  delay?: number;
  /** seconds between words */
  stagger?: number;
  duration?: number;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    show: (i: number) => ({ transition: { staggerChildren: stagger, delayChildren: i } }),
  };
  const word = {
    hidden: { y: "115%" },
    show: {
      y: "0%",
      transition: { duration, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "show", custom: delay }
        : { whileInView: "show", viewport: { once, margin: "-48px" }, custom: delay })}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          aria-hidden="true"
        >
          <motion.span className={cn("inline-block will-change-transform", wordClassName)} variants={word}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ---------------- Typewriter: rotating phrases with caret ---------------- */

export function Typewriter({
  phrases,
  className,
  prefix,
  typingMs = 48,
  deletingMs = 24,
  holdMs = 1700,
  gapMs = 420,
}: {
  phrases: string[];
  className?: string;
  /** static text rendered before the animated part, e.g. "We build " */
  prefix?: string;
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
  gapMs?: number;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting" | "gap">("typing");

  useEffect(() => {
    if (reduced) return;
    const current = phrases[index % phrases.length] ?? "";
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "typing") {
      if (sub < current.length) t = setTimeout(() => setSub((s) => s + 1), typingMs);
      else t = setTimeout(() => setPhase("deleting"), holdMs);
    } else if (phase === "deleting") {
      if (sub > 0) t = setTimeout(() => setSub((s) => s - 1), deletingMs);
      else t = setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, gapMs);
    }
    return () => clearTimeout(t);
  }, [phase, sub, index, phrases, typingMs, deletingMs, holdMs, gapMs, reduced]);

  const shown = reduced
    ? phrases[0] ?? ""
    : (phrases[index % phrases.length] ?? "").slice(0, sub);

  return (
    <span className={cn("inline-flex items-baseline gap-[0.15em]", className)} aria-live="off">
      {prefix ? <span>{prefix}</span> : null}
      <span className="relative">
        {shown || "\u00A0"}
        <span
          className="ml-[2px] inline-block h-[1.05em] w-[8px] translate-y-[0.18em] bg-ibm-blue animate-blink"
          aria-hidden="true"
        />
        <span className="sr-only">{phrases.join(", ")}</span>
      </span>
    </span>
  );
}

/* ---------------- Ticker: marquee label row ---------------- */

export function Ticker({
  items,
  reverse = false,
  slow = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden mask-fade-x", className)} aria-hidden="true">
      <div
        className={cn(
          "flex w-max items-center gap-10 whitespace-nowrap",
          slow ? "animate-marquee-slow" : reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm text-ink-muted"
          >
            {item}
            <span className="size-1.5 bg-ibm-subtle" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- useMountedTick: simple interval re-render helper ---------------- */

export function useMountedTick(intervalMs: number, enabled = true): number {
  const [tick, setTick] = useState(0);
  const saved = useRef(intervalMs);
  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => setTick((n) => n + 1), saved.current);
    return () => clearInterval(t);
  }, [enabled]);
  return tick;
}
