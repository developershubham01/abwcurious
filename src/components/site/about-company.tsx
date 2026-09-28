"use client";

import { Sparkles, Users, Gem, Camera } from "lucide-react";
import { Eyebrow, Reveal, CountUp } from "./primitives";
import { SplitText } from "./text-anim";
import DitherVeil from "@/components/reactbits/DitherVeil";
import { COMPANY, VALUES, STATS, SAMPLE_NOTE } from "@/data/company";

const VALUE_ICONS = { sparkles: Sparkles, users: Users, gem: Gem } as const;

export function AboutCompany() {
  return (
    <section id="about" aria-label="About ABWcurious" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---------------- copy ---------------- */}
          <div>
            <Reveal>
              <Eyebrow tone="muted">01 — About the company</Eyebrow>
            </Reveal>

            <h2 className="mt-6 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              <SplitText text="Built by people." />{" "}
              <SplitText text="Powered by curiosity." delay={0.18} wordClassName="text-gradient" />
            </h2>

            {COMPANY.story.map((paragraph, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p className="mt-6 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {/* values — flat hairline tiles */}
            <ul className="mt-10 space-y-4">
              {VALUES.map((v, i) => {
                const Icon = VALUE_ICONS[v.icon];
                return (
                  <Reveal key={v.title} delay={0.1 + i * 0.09}>
                    <li className="group flex items-start gap-4 border border-hairline bg-white p-4 transition-colors duration-200 hover:bg-ibm-layer">
                      <span className="flex size-11 shrink-0 items-center justify-center bg-ink text-white">
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{v.description}</p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* ---------------- interactive visual ---------------- */}
          <Reveal delay={0.15} className="relative">
            <div className="relative">
              {/* square frame ornaments */}
              <div
                className="pointer-events-none absolute -left-3 -top-3 z-10 size-16 border-l-2 border-t-2 border-ink"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 z-10 size-16 border-b-2 border-r-2 border-ink"
                aria-hidden="true"
              />

              <figure className="group relative overflow-hidden border border-hairline bg-white">
                {/* DitherVeil — cursor reveals the studio photo through a dithered veil */}
                <div className="relative aspect-[4/3] w-full">
                  <DitherVeil
                    src="/images/gl-office.jpg"
                    fit="cover"
                    pattern="noise"
                    pixelSize={3}
                    inkColor="#161616"
                    paperColor="#ffffff"
                    rimColor="#0f62fe"
                    rim={0.55}
                    revealRadius={190}
                    softness={0.65}
                    linger={1.1}
                    wander
                    clickBurst
                    className="absolute inset-0"
                  />
                </div>

                {/* caption bar */}
                <figcaption className="flex items-center justify-between gap-3 border-t border-hairline bg-white px-5 py-3.5">
                  <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
                    <Camera className="size-3.5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                    Move your cursor — reveal the studio
                  </span>
                  <span className="hidden text-xs text-ibm-subtle sm:block">Live dither veil</span>
                </figcaption>
              </figure>

              {/* floating stat chip */}
              <div className="absolute -bottom-6 -left-4 flex items-center gap-3 border border-hairline bg-white px-5 py-3.5 sm:-left-8">
                <span className="flex size-9 items-center justify-center bg-ink text-white">
                  <Users className="size-4.5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold tabular-nums text-ink">24+ curious humans</p>
                  <p className="text-xs text-ibm-subtle">1 studio · Pune</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- stats band — flat surface-1 tile ---------------- */}
        <Reveal delay={0.1} className="mt-24">
          <div className="relative bg-ibm-layer px-6 py-12 sm:px-12">
            <div className="relative">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-2xl font-light tracking-tight text-ink sm:text-3xl">
                  ABWcurious, by the numbers
                </h3>
                <p className="text-xs text-ibm-subtle">Count-up on scroll</p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
                {STATS.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.08}>
                    <div className="group">
                      <dd className="text-4xl font-light tracking-tight text-ink sm:text-5xl">
                        <CountUp to={stat.value} suffix={stat.suffix ?? ""} className="tabular-nums" />
                      </dd>
                      <dt className="mt-2.5 border-t border-ink/15 pt-2.5 text-sm text-ink-muted">
                        {stat.label}
                      </dt>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <p className="mt-9 border-t border-ink/15 pt-4 text-xs text-ibm-subtle">
                {SAMPLE_NOTE}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
