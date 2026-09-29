"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { SocialButton, PLATFORM_ICONS } from "./social-row";
import { SOCIALS, isPlaceholder, SAMPLE_NOTE, COMPANY } from "@/data/company";
import { FINAL_CTA } from "@/data/site-content";

/* Carbon cta-banner signature: the one full-bleed IBM Blue surface on the page. */
export function JourneySocial() {
  const reduced = useReducedMotion();

  return (
    <section
      id="follow"
      aria-label="Let's build what's next — connect with ABWcurious"
      className="relative scroll-mt-24 overflow-hidden bg-primary text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-28">
        <div className="relative">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-sm text-white/80">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {FINAL_CTA.eyebrow}
            </p>
          </Reveal>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
            <SplitText text={FINAL_CTA.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg font-light leading-relaxed text-white sm:text-xl">
              {FINAL_CTA.sub}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/80">
              {FINAL_CTA.body}
            </p>
          </Reveal>

          {/* CTA row — Carbon button (white / outline-light on blue) */}
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
              <RollButton href={FINAL_CTA.ctas[0].href} variant="light" arrow>
                {FINAL_CTA.ctas[0].label}
              </RollButton>
              <RollButton href={FINAL_CTA.ctas[1].href} variant="outline-light">
                {FINAL_CTA.ctas[1].label}
              </RollButton>
            </div>
          </Reveal>

          {/* social buttons */}
          <Reveal delay={0.25}>
            <ul className="mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-8" aria-label="Social platforms">
              {SOCIALS.map((s, i) => {
                const Icon = PLATFORM_ICONS[s.platform];
                return (
                  <motion.li
                    key={s.platform}
                    initial={reduced ? undefined : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-3"
                  >
                    <SocialButton link={s} variant="dark" size="lg" />
                    <span className="flex items-center gap-1.5 text-sm text-white">
                      <Icon className="size-3" strokeWidth={1.75} aria-hidden="true" />
                      {s.label}
                    </span>
                    <span className="-mt-1.5 max-w-[9rem] truncate text-xs text-white/70">
                      {s.handle}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-12 text-xs text-white/60">
              {isPlaceholder(SOCIALS[0].href)
                ? `${SAMPLE_NOTE} — social URLs are placeholders`
                : `Say hello — ${COMPANY.email}`}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
