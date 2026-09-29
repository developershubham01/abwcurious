"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { LogoMarkImage } from "./logo";
import { Magnetic } from "./primitives";
import { SplitText, Ticker } from "./text-anim";
import { HERO } from "@/data/site-content";
import { cn } from "@/lib/utils";

const TICKER_ITEMS: string[] = [...HERO.ticker];

type PlanetKey = "earth" | "venus" | "mars";

interface PlanetAsset {
  key: PlanetKey;
  name: string;
  clip: string;
  poster: string;
  cutout: string;
  tagline: string;
}

const PLANETS: Record<PlanetKey, PlanetAsset> = {
  earth: {
    key: "earth",
    name: "Earth",
    clip: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4",
    poster: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png",
    cutout: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png",
    tagline: "Our Home World",
  },
  venus: {
    key: "venus",
    name: "Venus",
    clip: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4",
    poster: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png",
    cutout: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202012_640b239a-d08a-4200-adb2-741bbe129ac8.png",
    tagline: "Atmospheric Energy",
  },
  mars: {
    key: "mars",
    name: "Mars",
    clip: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4",
    poster: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png",
    cutout: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202018_3d559490-f613-4ed7-a3bb-3b7e9fc90fb8.png",
    tagline: "The Next Frontier",
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRefs = useRef<Record<PlanetKey, HTMLVideoElement | null>>({
    earth: null,
    venus: null,
    mars: null,
  });
  const [activePlanet, setActivePlanet] = useState<PlanetKey>("earth");
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const switchPlanet = (key: PlanetKey) => {
    if (key === activePlanet) return;
    setActivePlanet(key);
    const targetVideo = videoRefs.current[key];
    if (targetVideo) {
      if (!targetVideo.src && targetVideo.dataset.src) {
        targetVideo.src = targetVideo.dataset.src;
      }
      targetVideo.play().catch(() => {});
    }
    // Pause other videos
    (["earth", "venus", "mars"] as const).forEach((p) => {
      if (p !== key && videoRefs.current[p]) {
        videoRefs.current[p]?.pause();
      }
    });
  };

  // Preload and play active video on mount
  useEffect(() => {
    const vid = videoRefs.current.earth;
    if (vid) {
      vid.play().catch(() => {});
    }
  }, []);

  const entrance = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const activeData = PLANETS[activePlanet];

  return (
    <section
      ref={ref}
      id="top"
      aria-label="ABWcurious — introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#04101f] text-white"
    >
      {/* ---------- Cinematic Space Planet Video Backdrop ---------- */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Fallback image (active poster) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${activeData.poster})` }}
        />

        {/* Looping Planet Videos */}
        {!reduced && (
          <>
            {(["earth", "venus", "mars"] as const).map((key) => {
              const p = PLANETS[key];
              const isActive = activePlanet === key;
              return (
                <video
                  key={key}
                  ref={(el) => {
                    videoRefs.current[key] = el;
                  }}
                  src={key === "earth" ? p.clip : undefined}
                  data-src={p.clip}
                  poster={p.poster}
                  autoPlay={key === "earth"}
                  muted
                  loop
                  playsInline
                  preload={key === "earth" ? "auto" : "none"}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              );
            })}
          </>
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
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:pt-36 lg:pt-40"
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

        {/* CTAs */}
        <motion.div
          {...entrance(0.68)}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href={HERO.ctas[0].href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-b from-white via-[#d6e8f8] to-white px-8 text-sm font-semibold tracking-wide text-[#071227] shadow-[0_0_28px_rgba(121,220,232,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.9)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_rgba(121,220,232,0.65)] active:scale-95"
            >
              {HERO.ctas[0].label}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={HERO.ctas[1].href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95"
            >
              {HERO.ctas[1].label}
            </a>
          </Magnetic>
        </motion.div>

        {/* Interactive Planet View Switcher */}
        <motion.div
          {...entrance(0.78)}
          className="mt-8 flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[#09152a]/75 p-1.5 backdrop-blur-md shadow-2xl"
          role="tablist"
          aria-label="Planet background switcher"
        >
          <span className="hidden pl-3 text-xs font-medium uppercase tracking-wider text-cyan-200/70 sm:inline-block">
            Orbit View:
          </span>
          {(["earth", "venus", "mars"] as const).map((key) => {
            const p = PLANETS[key];
            const isSelected = activePlanet === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => switchPlanet(key)}
                className={cn(
                  "group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
                  isSelected
                    ? "bg-white text-[#071227] shadow-[0_0_18px_rgba(121,220,232,0.5)] scale-105"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <img
                  src={p.cutout}
                  alt=""
                  aria-hidden="true"
                  className="size-4 rounded-full object-contain transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                />
                <span>{p.name}</span>
              </button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ---------- Scroll Indicator ---------- */}
      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="focus-carbon group absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-[#09152a]/80 text-cyan-200 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(121,220,232,0.5)]">
          <MousePointer2 className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-cyan-200/80">Scroll</span>
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

