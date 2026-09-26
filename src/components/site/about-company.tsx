"use client";

import { Sparkles, Users, Gem, Camera } from "lucide-react";
import { Reveal, CountUp } from "./primitives";
import { SplitText } from "./text-anim";
import DitherVeil from "@/components/reactbits/DitherVeil";
import { COMPANY, VALUES, STATS, SAMPLE_NOTE } from "@/data/company";

const VALUE_ICONS = { sparkles: Sparkles, users: Users, gem: Gem } as const;

export function AboutCompany() {
  return (
    <section id="about" aria-label="About ABWcurious" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      {/* soft background wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#f4f8ff] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---------------- copy ---------------- */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-ibm-soft">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                01 — About the company
              </p>
            </Reveal>

            <h2 className="mt-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              <SplitText text="Built by people." />{" "}
              <SplitText text="Powered by curiosity." delay={0.18} wordClassName="text-gradient font-normal" />
            </h2>

            {COMPANY.story.map((paragraph, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p className="mt-6 text-pretty text-base leading-relaxed text-ink/65 sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {/* values */}
            <ul className="mt-10 space-y-4">
              {VALUES.map((v, i) => {
                const Icon = VALUE_ICONS[v.icon];
                return (
                  <Reveal key={v.title} delay={0.1 + i * 0.09}>
                    <li className="group flex items-start gap-4 rounded-2xl border border-ink/[0.06] bg-white/70 p-4 shadow-[0_2px_14px_-6px_rgba(15,98,254,0.12)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-ibm-blue/25 hover:shadow-[0_14px_34px_-14px_rgba(15,98,254,0.35)]">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ibm-blue to-ibm-cyan text-white shadow-[0_8px_20px_-8px_rgba(15,98,254,0.6)] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold tracking-tight text-ink">{v.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink/60">{v.description}</p>
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
              {/* floating frame ornaments */}
              <div
                className="pointer-events-none absolute -left-3 -top-3 z-10 size-16 rounded-tl-3xl border-l-2 border-t-2 border-ibm-blue/50"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 z-10 size-16 rounded-br-3xl border-b-2 border-r-2 border-ibm-blue/50"
                aria-hidden="true"
              />

              <figure className="group relative overflow-hidden rounded-3xl border border-ink/[0.08] bg-white shadow-[0_24px_70px_-24px_rgba(15,98,254,0.35)]">
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
                <figcaption className="flex items-center justify-between gap-3 border-t border-ink/[0.06] bg-white/85 px-5 py-3.5 backdrop-blur">
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                    <Camera className="size-3.5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                    Move your cursor — reveal the studio
                  </span>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-ibm-bright sm:block">
                    Live dither veil
                  </span>
                </figcaption>
              </figure>

              {/* floating glass chip */}
              <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-3.5 shadow-[0_16px_40px_-16px_rgba(15,98,254,0.45)] backdrop-blur-xl sm:-left-8">
                <span className="flex size-9 items-center justify-center rounded-xl bg-ibm-blue/10 text-ibm-bright">
                  <Users className="size-4.5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">24+ curious humans</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                    1 studio · Pune
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- stats band ---------------- */}
        <Reveal delay={0.1} className="mt-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ibm-blue via-[#1355c9] to-ibm-blue-active px-6 py-12 text-white shadow-[0_30px_80px_-30px_rgba(15,98,254,0.65)] sm:px-12">
            {/* white grid + glow ornaments */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div
              className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full opacity-45 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full opacity-35 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(166,200,255,0.55), transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-2xl font-light tracking-tight sm:text-3xl">
                  ABWcurious, by the numbers
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                  Count-up on scroll
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
                {STATS.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.08}>
                    <div className="group">
                      <dd className="text-4xl font-light tracking-tight sm:text-5xl">
                        <CountUp to={stat.value} suffix={stat.suffix ?? ""} className="tabular-nums" />
                      </dd>
                      <dt className="mt-2.5 border-t border-white/20 pt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                        {stat.label}
                      </dt>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <p className="mt-9 border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                {SAMPLE_NOTE}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
