"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Clock3, Mail, MapPin } from "lucide-react";
import { Reveal, RollButton } from "./primitives";
import { COMPANY, SAMPLE_NOTE, STATS, VALUES } from "@/data/company";
import { CATEGORIES } from "@/lib/catalog";
import { VisionMission } from "./vision-mission";

/**
 * About page (#/about) — the company profile, IBM-Carbon style:
 * light-weight display type, white/surface-1 rhythm, hairline tiles,
 * a single blue accent and one full-bleed cta-banner.
 */
export function AboutPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
              About ABWcurious
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 sm:mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Curious minds.
              <br />
              <span className="text-primary font-normal">Intelligent software.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 sm:mt-8 max-w-3xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              {COMPANY.tagline} {COMPANY.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story — two-column: heading + paragraphs (Carbon editorial row) */}
      <section className="border-b border-hairline bg-white py-16 sm:py-24">
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
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

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

      {/* Stats Company facts */}
      <section className="border-b border-hairline bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Our Journey in numbers
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
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border border-hairline bg-white">
              <div className="border-b border-hairline border-l-4 border-l-primary px-6 py-4">
                <h2 className="text-lg font-normal text-ink">Company Facts</h2>
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

      {/* Engineering Capabilities — direct navigation to all 6 service practices */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary">
                Engineering Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Explore our six practices.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
            >
              <span>View all 70 services directory</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group relative flex flex-col justify-between bg-white p-6 transition-all hover:bg-ibm-layer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-primary">
                    <span>{cat.num} / Practice</span>
                    <ArrowUpRight className="size-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-ink group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-6 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open practice playbook →
                </div>
              </Link>
            ))}
          </div>
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
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <RollButton href="/contact" variant="light" arrow className="shrink-0">
              Contact us
            </RollButton>
            <RollButton href="/services" variant="outline-light" className="shrink-0">
              Explore services
            </RollButton>
          </div>
        </div>
      </section>
    </div>
  );
}
