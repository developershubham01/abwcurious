"use client";

import { Eyebrow, Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { APPROACH_SECTION, APPROACH_STEPS } from "@/data/site-content";

/* ------------------------- 04 — Our approach ------------------------------ */

export function Approach() {
  return (
    <section
      id="approach"
      aria-label="Our approach"
      className="relative scroll-mt-24 border-y border-hairline bg-ibm-layer py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow tone="muted" className="justify-center">
              {APPROACH_SECTION.eyebrow}
            </Eyebrow>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            <SplitText text={APPROACH_SECTION.title} immediate />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted">
              {APPROACH_SECTION.lede}
            </p>
          </Reveal>
        </div>

        {/* six disciplines — hairline gap-px grid */}
        <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {APPROACH_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={(i % 3) * 0.08} y={20}>
              <div className="group h-full bg-white p-6 transition-colors duration-200 hover:bg-ibm-layer lg:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium tabular-nums text-primary">{step.num}</span>
                  <span className="h-px w-6 bg-hairline" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-ink">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* continuous-transformation loop strip */}
        <Reveal delay={0.1}>
          <p
            className="mt-10 text-center text-sm text-ink-muted"
            aria-label="Discover, Define, Build, Secure, Operate, Optimize — then back to Discover."
          >
            <span aria-hidden="true">
              {APPROACH_STEPS.map((step, i) => (
                <span key={step.num}>
                  {step.name}
                  {i < APPROACH_STEPS.length - 1 ? (
                    <span className="text-primary">{" → "}</span>
                  ) : (
                    " — then back to Discover."
                  )}
                </span>
              ))}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
