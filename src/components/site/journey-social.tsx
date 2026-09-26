"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { SocialButton, PLATFORM_ICONS } from "./social-row";
import { SOCIALS, isPlaceholder, SAMPLE_NOTE } from "@/data/company";
import { COMPANY } from "@/data/company";

export function JourneySocial() {
  const reduced = useReducedMotion();

  return (
    <section
      id="follow"
      aria-label="Follow our journey on social media"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b2e8a] via-ibm-blue to-[#1192e8] px-6 py-16 text-center text-white shadow-[0_40px_100px_-40px_rgba(15,98,254,0.8)] sm:px-12 sm:py-20">
          {/* ornaments */}
          <div
            className="pointer-events-none absolute inset-0 opacity-45"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <motion.div
            className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)" }}
            aria-hidden="true"
            animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-32 -right-20 size-[26rem] rounded-full opacity-35 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(190,215,255,0.6), transparent 70%)" }}
            aria-hidden="true"
            animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/70">
                06 — Social
              </p>
            </Reveal>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl">
              <SplitText text="Follow" />{" "}
              <span className="font-normal text-[#a6c8ff]">
                <SplitText text="our journey" delay={0.12} />
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80">
                Launches, workshop recaps, team moments and behind-the-scenes stories — the whole
                journey lives on our socials. Come say hi.
              </p>
            </Reveal>

            {/* social buttons */}
            <Reveal delay={0.2}>
              <ul className="mt-12 flex flex-wrap items-start justify-center gap-5 sm:gap-7" aria-label="Social platforms">
                {SOCIALS.map((s, i) => {
                  const Icon = PLATFORM_ICONS[s.platform];
                  const dead = isPlaceholder(s.href);
                  return (
                    <motion.li
                      key={s.platform}
                      initial={reduced ? undefined : { opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center gap-3"
                    >
                      <SocialButton link={s} variant="dark" size="lg" />
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                        <Icon className="size-3" strokeWidth={1.75} aria-hidden="true" />
                        {s.label}
                      </span>
                      <span className="-mt-1.5 max-w-[9rem] truncate text-xs text-white/50">
                        {s.handle}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                {isPlaceholder(SOCIALS[0].href)
                  ? `${SAMPLE_NOTE} — social URLs are placeholders`
                  : `Say hello — ${COMPANY.email}`}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
