"use client";

import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { WHY_SECTION, WHY_ITEMS } from "@/data/site-content";

/* ------------------------- 05 — Why ABWcurious ----------------------------- */

export function WhyAbw() {
  return (
    <section
      id="why"
      aria-label="Why ABWcurious"
      className="relative scroll-mt-24 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow tone="muted" className="justify-center">
              {WHY_SECTION.eyebrow}
            </Eyebrow>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            <SplitText text={WHY_SECTION.title} immediate />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted">
              {WHY_SECTION.lede}
            </p>
          </Reveal>
        </div>

        {/* five commitments + one blue CTA tile — hairline gap-px grid */}
        <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.08} y={20}>
              <div className="group h-full bg-white p-6 transition-colors duration-200 hover:bg-ibm-layer lg:p-8">
                <span className="block size-2 bg-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-medium text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}

          {/* blue CTA tile — 6th cell */}
          <Reveal delay={0.16} y={20}>
            <div className="flex h-full flex-col justify-between bg-primary p-6 text-white lg:p-8">
              <div>
                <p className="text-sm text-white/80">Ready when you are</p>
                <p className="mt-3 text-xl font-light">
                  Tell us where you want to go — we&rsquo;ll bring the capabilities.
                </p>
              </div>
              <RollButton href="#contact" variant="light" arrow className="mt-6 self-start">
                Talk to Us
              </RollButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
