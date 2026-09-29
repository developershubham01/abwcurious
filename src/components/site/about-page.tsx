"use client";

import { ArrowRight, Building2, Clock3, Mail, MapPin } from "lucide-react";
import { Reveal, RollButton } from "./primitives";
import { COMPANY, SAMPLE_NOTE, STATS, VALUES } from "@/data/company";

/**
 * About page (#/about) — the company profile, IBM-Carbon style:
 * light-weight display type, white/surface-1 rhythm, hairline tiles,
 * a single blue accent and one full-bleed cta-banner.
 */
export function AboutPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <section className="border-b border-hairline bg-background pt-14 pb-16 sm:pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="flex items-center gap-2.5 text-sm text-primary">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              About ABWcurious
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-light leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Curious minds.
              <br />
              Intelligent software.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              {COMPANY.tagline} {COMPANY.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story — two-column: heading + paragraphs (Carbon editorial row) */}
      <section className="border-b border-hairline bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Our story
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Established {COMPANY.established} · Nerul, Navi Mumbai, Maharashtra — India
            </p>
          </Reveal>
          <div className="space-y-6 lg:col-span-8">
            {COMPANY.story.map((para, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p className="max-w-3xl text-pretty text-base leading-relaxed text-ink-muted">
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="text-xs text-ibm-subtle">{SAMPLE_NOTE}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values — feature-card grid on surface-1 */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
              What we stand for
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={0.05 * i} className="h-full">
                  <div className="flex h-full flex-col bg-white p-6 transition-colors hover:bg-ibm-layer">
                    <span className="text-xs tabular-nums text-ibm-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-normal text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {v.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats + studio facts */}
      <section className="border-b border-hairline bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                The studio in numbers
              </h2>
            </Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white p-6">
                  <dt className="order-last mt-2 text-sm text-ink-muted">{s.label}</dt>
                  <dd className="text-4xl font-light tabular-nums tracking-tight text-ink">
                    {s.value}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-ibm-subtle">{SAMPLE_NOTE}</p>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border border-hairline bg-white">
              <div className="border-b border-hairline border-l-4 border-l-primary px-6 py-4">
                <h2 className="text-lg font-normal text-ink">Studio facts</h2>
              </div>
              <ul className="divide-y divide-hairline">
                {[
                  { icon: Building2, label: "Founded", value: COMPANY.established },
                  { icon: MapPin, label: "Base", value: COMPANY.address },
                  { icon: Clock3, label: "Hours", value: COMPANY.hours },
                  { icon: Mail, label: "Email", value: COMPANY.email },
                ].map((f) => (
                  <li key={f.label} className="flex items-center gap-4 px-6 py-4">
                    <span className="flex size-10 shrink-0 items-center justify-center border border-hairline bg-ibm-layer text-ink">
                      <f.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-ink">{f.value}</span>
                      <span className="block text-xs text-ibm-subtle">{f.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* cta-banner — the one full-bleed blue surface */}
      <section className="bg-primary py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Curious about working with us?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Tell us what you are building — we will bring the questions, the
              prototypes and the people.
            </p>
          </div>
          <RollButton href="#contact" variant="light" arrow className="shrink-0">
            Contact us
          </RollButton>
        </div>
      </section>
    </div>
  );
}
