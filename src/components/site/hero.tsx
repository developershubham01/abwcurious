"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LogoMarkImage } from "./logo";
import { Magnetic } from "./primitives";
import { SplitText, Ticker } from "./text-anim";
import { HERO } from "@/data/site-content";

const TICKER_ITEMS: string[] = [...HERO.ticker];

const EARTH_CLIP =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4";
const EARTH_POSTER =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

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
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#04101f] text-white"
    >
      {/* ---------- Cinematic Space Earth Video Backdrop ---------- */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Fallback image (Earth poster) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${EARTH_POSTER})` }}
        />

        {/* Looping Earth Video */}
        {!reduced && (
          <video
            ref={videoRef}
            src={EARTH_CLIP}
            poster={EARTH_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Blueprint grid matrix overlay */}
        <div
          className="absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black_20%,transparent_80%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(121,220,232,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(121,220,232,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Cosmic vignette & legibility scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 48%, rgba(4,16,31,0.42) 0%, rgba(4,16,31,0.88) 85%, #04101f 100%), linear-gradient(to bottom, rgba(4,16,31,0.7) 0%, transparent 28%, rgba(4,16,31,0.7) 72%, #04101f 100%)",
          }}
        />
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center sm:pt-36 lg:pt-40"
      >
        {/* Brand Medallion */}
        <motion.div {...entrance(0.05)} className="flex flex-col items-center">
          <a
            href="#top"
            aria-label="ABWcurious home"
            className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-xl transition-all duration-300 group-hover:bg-cyan-400/30" />
            <LogoMarkImage onDark className="relative h-16 drop-shadow-[0_0_24px_rgba(121,220,232,0.45)] sm:h-20" />
          </a>
          <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-cyan-200 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#5fd0e1] animate-pulse" aria-hidden="true" />
            {HERO.identity}
          </p>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...entrance(0.2)}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#79dce8] drop-shadow-[0_0_12px_rgba(121,220,232,0.4)] sm:text-sm"
        >
          {HERO.eyebrow}
        </motion.p>

        {/* Headline */}
        <h1 className="mt-4 max-w-5xl text-balance text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <SplitText text="Engineering a" immediate delay={0.28} />{" "}
          <span className="bg-gradient-to-r from-white via-cyan-100 to-[#79dce8] bg-clip-text font-normal text-transparent drop-shadow-[0_0_35px_rgba(121,220,232,0.4)]">
            <SplitText text="Better Future." immediate delay={0.39} />
          </span>
        </h1>

        {/* Cyan accent rule */}
        <motion.div {...entrance(0.42)} className="mt-6 flex items-center justify-center">
          <span className="h-1 w-24 rounded-full bg-[#79dce8] shadow-[0_0_14px_#79dce8]" />
        </motion.div>

        {/* Description */}
        <motion.p
          {...entrance(0.5)}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-200 drop-shadow sm:text-lg"
        >
          {HERO.description}
        </motion.p>

        {/* Promise */}
        <motion.p
          {...entrance(0.58)}
          className="mt-3.5 max-w-2xl text-pretty text-sm leading-relaxed text-slate-300 drop-shadow sm:text-base"
        >
          {HERO.promise.pre}
          <strong className="font-semibold text-white drop-shadow">{HERO.promise.strong}</strong>
          {HERO.promise.post}
        </motion.p>

        {/* CTAs matching exact user reference */}
        <motion.div
          {...entrance(0.68)}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#/contact"
              className="group inline-flex h-12 min-w-[155px] items-center justify-center gap-2.5 border border-white bg-white px-7 text-sm font-medium text-[#0f62fe] transition-all duration-200 hover:bg-slate-100 hover:shadow-lg active:scale-[0.98] sm:text-base"
            >
              <span>Talk to Us</span>
              <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#capabilities"
              className="inline-flex h-12 min-w-[175px] items-center justify-center border border-white bg-transparent px-7 text-sm font-medium text-white transition-all duration-200 hover:bg-white/15 hover:shadow-lg active:scale-[0.98] sm:text-base"
            >
              <span>Explore Capabilities</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ---------- Scroll Indicator ---------- */}
      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="focus-carbon group absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 transition-transform duration-300 hover:scale-105"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-[#09152a]/85 text-cyan-200 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:border-cyan-300 group-hover:bg-[#09152a] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(121,220,232,0.5)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4.5 animate-bounce"
            aria-hidden="true"
          >
            <path
              d="M12 4v16m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-[11px] font-medium uppercase tracking-widest text-cyan-200/80 group-hover:text-white">
          Scroll
        </span>
      </motion.a>

      {/* ---------- Values Ticker ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.9 }}
        className="relative z-10 border-t border-white/10 bg-[#04101f]/85 py-4 backdrop-blur-md"
      >
        <Ticker items={TICKER_ITEMS} slow className="text-white/80" />
      </motion.div>
    </section>
  );
}


