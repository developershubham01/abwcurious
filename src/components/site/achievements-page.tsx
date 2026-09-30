"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Flag,
  Trophy,
  Globe2,
  Award,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { TIMELINE, MilestoneKind, COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { SplitText } from "./text-anim";

const KIND_META: Record<
  MilestoneKind,
  { icon: LucideIcon; label: string; badge: string; color: string; image?: string }
> = {
  founding: {
    icon: Rocket,
    label: "Founding",
    badge: "border-primary/40 bg-primary/10 text-primary",
    color: "border-primary",
    image: "/images/gl-office.jpg",
  },
  milestone: {
    icon: Flag,
    label: "Milestone",
    badge: "border-[#1192e8]/40 bg-[#1192e8]/10 text-[#1192e8]",
    color: "border-[#1192e8]",
    image: "/images/ev-launch.jpg",
  },
  achievement: {
    icon: Trophy,
    label: "Achievement",
    badge: "border-[#002d9c]/40 bg-[#002d9c]/10 text-[#002d9c]",
    color: "border-[#002d9c]",
    image: "/images/gl-award.jpg",
  },
  expansion: {
    icon: Globe2,
    label: "Expansion",
    badge: "border-[#24a148]/40 bg-[#24a148]/10 text-[#24a148]",
    color: "border-[#24a148]",
    image: "/images/ev-anniversary.jpg",
  },
};

const AWARDS = [
  {
    year: "2026",
    title: "AI Product Architecture Excellence",
    issuer: "Enterprise Tech Innovation Forum",
    desc: "Recognized for production LLM guardrail architectures, low-latency CRDT synchronization, and scalable inference infrastructure.",
    image: "/images/gl-award.jpg",
  },
  {
    year: "2025",
    title: "Top Emerging Digital Engineering Studio",
    issuer: "India Tech Leaders Summit",
    desc: "Awarded for exceptional velocity in shipping multi-tenant enterprise SaaS systems and high-converting modern web platforms.",
    image: "/images/ev-summit.jpg",
  },
  {
    year: "2024",
    title: "Carbon Design System Implementation Award",
    issuer: "Open Design Collective",
    desc: "Honored for pristine adherence to accessibility guidelines (WCAG 2.1 AA), design tokens, and modular UX component libraries.",
    image: "/images/ev-launch.jpg",
  },
  {
    year: "2023",
    title: "Cloud Migration & Resiliency Benchmark",
    issuer: "DevOps & Cloud Consortium",
    desc: "Achieved 99.99% uptime benchmark across distributed client deployments and automated CI/CD security pipelines.",
    image: "/images/ev-offsite.jpg",
  },
];

const METRICS = [
  { value: "120+", label: "Platforms & Sites Shipped", sub: "Production tested" },
  { value: "99.8%", label: "Average Client Retention", sub: "Long-term partners" },
  { value: "6+", label: "Proprietary SaaS Systems", sub: "Active IP" },
  { value: "100%", label: "SLA Accountability", sub: "Zero compromise" },
];

export function AchievementsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredTimeline =
    activeFilter === "all"
      ? TIMELINE
      : TIMELINE.filter((item) => item.kind === activeFilter);

  return (
    <div className="bg-background">
      {/* ================= Hero Section ================= */}
      <section className="relative overflow-hidden border-b border-hairline bg-[#04101f] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 40% 30%, rgba(95,208,225,0.22), transparent 70%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-medium tracking-wide text-[#79dce8] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#5fd0e1] animate-pulse-dot" />
              Company Milestones · Track Record of Impact
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              <SplitText text="Milestones that define our" immediate />{" "}
              <span className="bg-gradient-to-r from-[#79dce8] via-[#a6e5ff] to-white bg-clip-text text-transparent font-normal">
                momentum.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              From day one, ABWcurious has been driven by measurable output over marketing noise. Here is our story of steady growth, major technical breakthroughs, and industry recognition.
            </p>
          </Reveal>

          {/* Metrics Grid */}
          <Reveal delay={0.24}>
            <div className="mt-12 grid grid-cols-2 gap-4 border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:grid-cols-4 sm:gap-8">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div className="text-3xl font-light text-white sm:text-4xl">{m.value}</div>
                  <div className="mt-1 text-sm font-medium text-[#79dce8]">{m.label}</div>
                  <div className="text-xs text-white/50">{m.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Timeline Section ================= */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="max-w-xl">
              <Eyebrow tone="muted">Historical Timeline</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                The steps that brought us here.
              </h2>
            </div>

            {/* Kind Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "focus-carbon px-3.5 py-1.5 text-xs font-medium border transition-colors",
                  activeFilter === "all"
                    ? "border-primary bg-primary text-white"
                    : "border-hairline bg-white text-ink-muted hover:border-hairline-strong hover:text-ink"
                )}
              >
                All Milestones
              </button>
              {(Object.keys(KIND_META) as MilestoneKind[]).map((kind) => {
                const active = activeFilter === kind;
                return (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => setActiveFilter(kind)}
                    className={cn(
                      "focus-carbon px-3.5 py-1.5 text-xs font-medium border transition-colors capitalize",
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-hairline bg-white text-ink-muted hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {kind}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline List */}
          <div className="relative mt-12 pl-6 sm:pl-10 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-hairline">
            <div className="space-y-10 sm:space-y-12">
              {filteredTimeline.map((item, index) => {
                const meta = KIND_META[item.kind];
                const Icon = meta.icon;
                return (
                  <Reveal key={`${item.year}-${item.title}`} delay={0.06 * index}>
                    <div className="relative group">
                      {/* Node pin */}
                      <span
                        className={cn(
                          "absolute -left-[30px] sm:-left-[46px] top-1.5 flex size-6 sm:size-7 items-center justify-center border-2 bg-white shadow-sm transition-transform group-hover:scale-110",
                          meta.color
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="size-3 sm:size-3.5 text-ink" strokeWidth={2} />
                      </span>

                      {/* Card Content */}
                      <div className="border border-hairline bg-white transition-all hover:border-hairline-strong hover:shadow-md overflow-hidden">
                        <div className="grid sm:grid-cols-[1fr_200px] md:grid-cols-[1fr_240px]">
                          <div className="p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl sm:text-2xl font-light text-primary font-mono">
                                    {item.year}
                                  </span>
                                  <span
                                    className={cn(
                                      "border px-2.5 py-0.5 text-xs font-mono font-medium",
                                      meta.badge
                                    )}
                                  >
                                    {meta.label}
                                  </span>
                                </div>
                              </div>

                              <h3 className="mt-4 text-xl sm:text-2xl font-light text-ink">
                                {item.title}
                              </h3>

                              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-ibm-subtle">
                              <CheckCircle className="size-3.5 text-primary" />
                              Recorded milestone on studio roadmap
                            </div>
                          </div>

                          {meta.image && (
                            <div className="relative min-h-[160px] sm:min-h-full border-t sm:border-t-0 sm:border-l border-hairline bg-ibm-layer overflow-hidden">
                              <Image
                                src={meta.image}
                                alt={`${item.title} — event photograph`}
                                fill
                                sizes="(max-width: 640px) 100vw, 240px"
                                className="object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Honors & Awards Showcase ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="max-w-2xl">
              <Eyebrow tone="muted">Recognition & Industry Awards</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Industry recognition & standards.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Peer and industry validation of our engineering craftsmanship, design ethics, and delivery standards.
              </p>
            </div>

            <div className="flex items-center gap-2 border border-hairline bg-white px-3.5 py-2 text-xs font-mono text-ink-muted">
              <Trophy className="size-4 text-primary" />
              <span>4 Verified Citations</span>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {AWARDS.map((aw, i) => (
              <Reveal key={aw.title} delay={0.08 * i}>
                <div className="group flex h-full flex-col justify-between border border-hairline bg-white transition-all hover:border-primary hover:shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9] w-full bg-ibm-layer overflow-hidden border-b border-hairline">
                    <Image
                      src={aw.image}
                      alt={`${aw.title} recognition`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 border border-white/20 bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-mono text-white">
                      {aw.year} Award
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-hairline pb-4">
                        <span className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Award className="size-4" />
                          {aw.issuer}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-medium text-ink sm:text-xl">
                        {aw.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {aw.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#24a148]">
                      <CheckCircle className="size-3.5" />
                      Verified Citation
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Call to Action ================= */}
      <section className="border-t border-hairline py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border border-hairline bg-white p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Be Part of the Story</span>
              <h2 className="mt-2 text-2xl font-light text-ink sm:text-3xl">
                Ready to build something historic together?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                Whether you need a full-scale web ecosystem, custom AI agents, or modern mobile software, we bring verified velocity and craftsmanship to your team.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
              <RollButton href="/contact" variant="primary" arrow>
                Start a project
              </RollButton>
              <RollButton href="/careers" variant="outline">
                Join our team
              </RollButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
