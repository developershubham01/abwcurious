"use client";

import { Eyebrow, Reveal } from "./primitives";
import { SplitText } from "@/components/site/text-anim";
import { INTRO } from "@/data/site-content";

/**
 * "01 — Who we are" — Carbon editorial intro band.
 * White band (closes the hero's white zone) with a two-column editorial grid:
 * display title + lede left, emphasised body copy right, refrain strip below.
 */
export function Transforming() {
  const refrainWords = INTRO.refrain.split(" ");

  return (
    <section
      id="about"
      aria-label="About ABWcurious — who we are"
      className="relative scroll-mt-24 border-b border-hairline py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Left — eyebrow, display title, lede */}
          <div>
            <Reveal>
              <Eyebrow tone="muted">{INTRO.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
              <SplitText text={INTRO.title} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-xl font-light leading-snug text-ink sm:text-2xl">
                {INTRO.lede}
              </p>
            </Reveal>
          </div>

          {/* Right — emphasised body copy, vertically centred */}
          <div className="self-center lg:pt-2">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-ink-muted">
                {INTRO.body1.pre}
                <strong className="font-medium text-ink">{INTRO.body1.strong}</strong>
                {INTRO.body1.post}
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-5">
              <p className="text-base leading-relaxed text-ink-muted">
                {INTRO.body2.pre}
                <strong className="font-medium text-ink">{INTRO.body2.strong}</strong>
                {INTRO.body2.post}
              </p>
            </Reveal>
          </div>

          {/* Refrain strip — spans both columns */}
          <div className="col-span-full mt-14">
            <div className="border-t border-hairline pt-8">
              <p className="sr-only">{INTRO.refrain}</p>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2" aria-hidden="true">
                {refrainWords.map((word, i) => (
                  <Reveal key={word} delay={0.1 + i * 0.07} y={14} className="inline-flex items-baseline">
                    <span className="text-2xl font-light text-ink sm:text-3xl">
                      {word.replace(/\.$/, "")}
                      <span className="text-primary">.</span>
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
