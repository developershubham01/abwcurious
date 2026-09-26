"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, MousePointer2 } from "lucide-react";
import { LogoMarkImage } from "./logo";
import { Magnetic } from "./primitives";
import { SplitText, Ticker } from "./text-anim";
import { COMPANY } from "@/data/company";

/* Deterministic floating particles (no hydration mismatch — fixed values). */
const PARTICLES = [
  { left: "8%", top: "22%", size: 5, dur: 7.5, delay: 0 },
  { left: "16%", top: "64%", size: 4, dur: 9.2, delay: 1.1 },
  { left: "27%", top: "34%", size: 3, dur: 8.1, delay: 0.4 },
  { left: "38%", top: "78%", size: 5, dur: 10.4, delay: 2.2 },
  { left: "52%", top: "18%", size: 4, dur: 8.8, delay: 0.8 },
  { left: "63%", top: "70%", size: 3, dur: 7.9, delay: 1.6 },
  { left: "72%", top: "28%", size: 5, dur: 9.9, delay: 0.2 },
  { left: "84%", top: "58%", size: 4, dur: 8.4, delay: 2.8 },
  { left: "91%", top: "36%", size: 3, dur: 10.8, delay: 1.4 },
  { left: "45%", top: "48%", size: 3, dur: 11.2, delay: 3.1 },
];

const TICKER_ITEMS = [
  "People first",
  "Curiosity by default",
  "Craft in everything",
  "Built in public",
  "Celebrate the wins",
  "Pune · worldwide",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const entrance = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 26, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="top"
      aria-label="ABWcurious — introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-[#f4f8ff] via-white to-white"
    >
      {/* ---------- animated background ---------- */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* fine grid, radially faded */}
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_38%,black_25%,transparent_78%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,98,254,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.055) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* aurora blobs */}
        <motion.div
          className="absolute -left-32 top-[8%] size-[34rem] rounded-full opacity-45 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(15,98,254,0.32), transparent 65%)" }}
          animate={reduced ? undefined : { x: [0, 46, 0], y: [0, 28, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 top-[22%] size-[38rem] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(17,146,232,0.30), transparent 65%)" }}
          animate={reduced ? undefined : { x: [0, -52, 0], y: [0, 34, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[30%] size-[30rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(138,63,252,0.22), transparent 65%)" }}
          animate={reduced ? undefined : { x: [0, 34, 0], y: [0, -26, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        {/* floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-ibm-blue/35"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={
              reduced
                ? undefined
                : { y: [0, -22, 0], opacity: [0.25, 0.75, 0.25], scale: [1, 1.25, 1] }
            }
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
        {/* outlined floating rings */}
        <motion.div
          className="absolute right-[14%] top-[62%] hidden size-24 rounded-full border border-ibm-blue/20 md:block"
          animate={reduced ? undefined : { y: [0, -16, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[10%] top-[40%] hidden size-14 rounded-xl border border-ink/10 md:block"
          animate={reduced ? undefined : { y: [0, 14, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* ---------- content ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center sm:pt-36"
      >
        {/* logo mark */}
        <motion.div {...entrance(0.05)} className="flex flex-col items-center">
          <a
            href="#top"
            aria-label="ABWcurious home"
            className="focus-carbon rounded-2xl ring-ibm-blue/30 ring-offset-4 transition-transform duration-500 hover:scale-105"
          >
            <LogoMarkImage className="h-16 sm:h-20 drop-shadow-[0_10px_30px_rgba(15,98,254,0.25)]" />
          </a>
          <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-ibm-blue/15 bg-white/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/60 shadow-[0_4px_20px_-8px_rgba(15,98,254,0.3)] backdrop-blur-md sm:text-xs">
            <span className="size-1.5 rounded-full bg-ibm-cyan animate-pulse-dot" aria-hidden="true" />
            {COMPANY.name} · Technology &amp; design studio
          </p>
        </motion.div>

        {/* headline */}
        <h1 className="mt-8 max-w-5xl text-balance text-5xl font-light leading-[1.04] tracking-tight text-ink sm:text-7xl lg:text-8xl">
          <SplitText text="The people behind" immediate delay={0.28} />
          <br />
          <SplitText text="the products." immediate delay={0.62} wordClassName="text-gradient font-normal" />
        </h1>

        {/* description */}
        <motion.p
          {...entrance(0.9)}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ink/65 sm:text-lg"
        >
          {COMPANY.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...entrance(1.05)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#about"
              className="focus-carbon group inline-flex h-13 items-center gap-2.5 rounded-full bg-ibm-blue px-8 text-[15px] font-medium text-white shadow-[0_14px_34px_-10px_rgba(15,98,254,0.55)] transition-all duration-300 hover:bg-ibm-blue-hover hover:shadow-[0_18px_44px_-10px_rgba(15,98,254,0.65)]"
            >
              Explore Our Company
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#leadership"
              className="focus-carbon group inline-flex h-13 items-center gap-2.5 rounded-full border border-ink/12 bg-white/70 px-8 text-[15px] font-medium text-ink backdrop-blur transition-all duration-300 hover:border-ibm-blue/40 hover:text-ibm-bright hover:shadow-[0_14px_34px_-14px_rgba(15,98,254,0.4)]"
            >
              <Users className="size-4 text-ibm-bright" strokeWidth={1.75} aria-hidden="true" />
              Meet Our Team
            </a>
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
        className="focus-carbon group absolute bottom-[4.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 rounded-full sm:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink/50 backdrop-blur transition-colors group-hover:border-ibm-blue/40 group-hover:text-ibm-bright">
          <MousePointer2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-ink/10">
          <span
            className="absolute inset-x-0 top-0 h-3 bg-ibm-blue animate-scroll-hint"
            aria-hidden="true"
          />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/45">Scroll</span>
      </motion.a>

      {/* ---------- values ticker ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        className="relative border-t border-ink/[0.06] bg-white/60 py-4 backdrop-blur-md"
      >
        <Ticker items={TICKER_ITEMS} slow />
      </motion.div>
    </section>
  );
}
