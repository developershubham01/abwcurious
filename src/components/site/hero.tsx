"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { LogoMarkImage } from "./logo";
import { Magnetic, RollButton } from "./primitives";
import { SplitText, Ticker } from "./text-anim";
import { HERO } from "@/data/site-content";

const TICKER_ITEMS: string[] = [...HERO.ticker];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const entrance = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="top"
      aria-label="ABWcurious — introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-[#f4f8ff] via-white to-white"
    >
      {/* ---------- hero backdrop: blueprint grid on the soft blue wash ---------- */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_38%,black_25%,transparent_78%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,98,254,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.055) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </motion.div>

      {/* ---------- content ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center sm:pt-36 lg:pt-40"
      >
        {/* logo mark */}
        <motion.div {...entrance(0.05)} className="flex flex-col items-center">
          <a
            href="#top"
            aria-label="ABWcurious home"
            className="focus-carbon transition-opacity duration-300 hover:opacity-80"
          >
            <LogoMarkImage className="h-16 sm:h-20" />
          </a>
          <p className="mt-5 inline-flex items-center gap-2.5 border border-hairline bg-white px-4 py-1.5 text-sm text-ink-muted">
            <span className="size-1.5 rounded-full bg-ibm-blue animate-pulse-dot" aria-hidden="true" />
            {HERO.identity}
          </p>
        </motion.div>

        {/* eyebrow — the document tagline, sentence-case kicker above the display line */}
        <motion.p
          {...entrance(0.2)}
          className="mt-8 text-sm font-medium text-primary sm:text-base"
        >
          {HERO.eyebrow}
        </motion.p>

        {/* headline — the brand line, IBM-style light display */}
        <h1 className="mt-4 max-w-5xl text-balance text-5xl font-light leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <SplitText text="Engineering a" immediate delay={0.28} />{" "}
          <SplitText
            text="Better Future."
            immediate
            delay={0.39}
            wordClassName="text-gradient"
          />
        </h1>

        {/* description */}
        <motion.p
          {...entrance(0.9)}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          {HERO.description}
        </motion.p>

        {/* promise — the document's bolded commitment line */}
        <motion.p
          {...entrance(0.98)}
          className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted sm:text-base"
        >
          {HERO.promise.pre}
          <strong className="font-medium text-ink">{HERO.promise.strong}</strong>
          {HERO.promise.post}
        </motion.p>

        {/* CTAs — Carbon button-primary / button-tertiary */}
        <motion.div
          {...entrance(1.05)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <RollButton href={HERO.ctas[0].href} variant="primary" arrow>
              {HERO.ctas[0].label}
            </RollButton>
          </Magnetic>
          <Magnetic>
            <RollButton href={HERO.ctas[1].href} variant="outline">
              {HERO.ctas[1].label}
            </RollButton>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ---------- scroll indicator ---------- */}
      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="focus-carbon group absolute bottom-[4.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 sm:flex"
      >
        <span className="flex size-9 items-center justify-center border border-hairline bg-white text-ink-muted transition-colors duration-200 group-hover:border-hairline-strong group-hover:text-ink">
          <MousePointer2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-hairline">
          <span
            className="absolute inset-x-0 top-0 h-3 bg-ibm-blue animate-scroll-hint"
            aria-hidden="true"
          />
        </span>
        <span className="text-xs text-ibm-subtle">Scroll</span>
      </motion.a>

      {/* ---------- values ticker ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        className="relative border-t border-hairline bg-white py-4"
      >
        <Ticker items={TICKER_ITEMS} slow />
      </motion.div>
    </section>
  );
}
