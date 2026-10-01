"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  Zap,
  Layers,
  Cpu,
  Building2,
  ChevronRight,
} from "lucide-react";
import type { Industry } from "@/lib/industries";
import { ALL_INDUSTRIES } from "@/lib/industries";
import { Eyebrow, RollButton } from "./primitives";
import { Reveal } from "./primitives";

export function IndustryPage({ industry }: { industry: Industry }) {
  const otherIndustries = ALL_INDUSTRIES.filter((ind) => ind.slug !== industry.slug);

  return (
    <div className="pt-16 sm:pt-20 lg:pt-24">
      {/* Breadcrumb strip */}
      <div className="border-b border-hairline bg-ibm-layer py-3.5">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 text-xs text-ink-muted">
          <Link href="/industries" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="size-3" />
            <span>All Industries</span>
          </Link>
          <ChevronRight className="size-3 text-ibm-subtle" />
          <span className="font-medium text-ink truncate">{industry.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-ibm-layer px-3.5 py-1 text-xs font-mono text-primary mb-6">
              <Building2 className="size-3.5" />
              <span>{industry.badgeStat}</span>
            </div>

            <h1 className="max-w-4xl text-balance text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {industry.name}
            </h1>
            <p className="mt-3 text-xl font-normal text-primary">
              {industry.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {industry.heroDescription}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <RollButton href="/contact" variant="primary" arrow>
                Consult Our {industry.name} Team
              </RollButton>
              <Link
                href="#solutions"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-ink transition-colors"
              >
                <span>Explore Industry Solutions</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="border-b border-hairline bg-ibm-layer py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <Eyebrow className="justify-start">Executive Summary</Eyebrow>
            <p className="mt-4 text-lg font-light leading-relaxed text-ink sm:text-xl">
              {industry.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Industry Challenges & Pain Points */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow tone="muted" className="justify-start">01 / Industry Challenges</Eyebrow>
          <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
            Pain points we solve in {industry.name}.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Critical roadblocks holding back organizations in this sector, and how our engineering practices overcome them.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {industry.challenges.map((item, idx) => (
              <div
                key={item.title}
                className="border border-hairline bg-ibm-layer p-8 transition-colors hover:border-primary/60"
              >
                <div className="flex size-9 items-center justify-center bg-white border border-hairline text-amber-600 font-mono text-xs font-semibold">
                  0{idx + 1}
                </div>
                <h3 className="mt-6 text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailored Solutions & Services */}
      <section id="solutions" className="border-b border-hairline bg-ibm-layer py-16 sm:py-24 scroll-mt-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <Eyebrow className="justify-start">02 / Sector Capabilities</Eyebrow>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Tailored solutions for {industry.name}.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              End-to-end technology solutions engineered specifically to address domain requirements and compliance needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industry.solutions.map((sol, idx) => (
              <div
                key={sol.name}
                className="group flex flex-col justify-between border border-hairline bg-white p-8 transition-all hover:border-primary hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-xs text-ibm-bright font-medium">
                    Capability 0{idx + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-ink group-hover:text-primary transition-colors">
                    {sol.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {sol.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
                  >
                    <span>Request Solution Brief</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Impact & Outcomes */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow tone="blue" className="justify-start">03 / Measured Impact</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Tangible business outcomes.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our focus is always on delivering quantifiable performance improvements, operational efficiency, and risk reduction.
              </p>
              <div className="mt-8">
                <RollButton href="/contact" variant="primary" arrow>
                  Discuss Your Objectives
                </RollButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-4">
                {industry.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 border border-hairline bg-ibm-layer p-6 transition-colors hover:bg-white"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center bg-primary text-white font-mono text-xs">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div>
                      <p className="text-base font-normal text-ink">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack & Tools */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Eyebrow className="justify-start">Sector Tech Stack</Eyebrow>
              <h3 className="mt-2 text-2xl font-light text-ink">
                Built with modern, enterprise-grade technology.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xl">
              {industry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 border border-hairline bg-white px-3 py-1.5 font-mono text-xs font-medium text-ink"
                >
                  <Cpu className="size-3 text-primary" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Industries */}
      <section className="border-b border-hairline bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-xl font-light text-ink mb-8">
            Explore Other Industries We Serve:
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex items-center justify-between border border-hairline bg-ibm-layer p-4 transition-colors hover:bg-white hover:border-primary"
              >
                <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                  {ind.name}
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ibm-blue py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Engineering a better future for {industry.name}.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Ready to start your next initiative? Talk directly to our {industry.name} solutions team.
            </p>
          </div>
          <RollButton href="/contact" variant="light" arrow className="shrink-0">
            Start {industry.name} Engagement
          </RollButton>
        </div>
      </section>
    </div>
  );
}
