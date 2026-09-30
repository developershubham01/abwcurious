"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Globe,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Compass,
  Cpu,
  Palette,
  MessageSquare,
  Award,
} from "lucide-react";
import { XIcon } from "./x-icon";
import { Eyebrow, Reveal, RollButton, SectionFrame } from "./primitives";
import { SplitText } from "./text-anim";
import { FOUNDERS, CO_FOUNDERS, Leader, COMPANY } from "@/data/company";
import { LeaderSocial } from "./leaders";
import { cn } from "@/lib/utils";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Curiosity As A Practice",
    desc: "We believe true innovation begins with refusing easy answers. We probe edge cases, explore emergent models, and never settle for off-the-shelf templates.",
  },
  {
    icon: Cpu,
    title: "Engineering Integrity",
    desc: "Performance, accessibility, and zero-downtime reliability are foundational requirements, not sprint extras. We engineer systems meant to last for years.",
  },
  {
    icon: Palette,
    title: "Precision Craftsmanship",
    desc: "Every pixel, motion transition, and API payload reflects the respect we hold for our users. Design and code exist in constant dialogue.",
  },
  {
    icon: Users,
    title: "Radical Transparency",
    desc: "No bureaucratic telephone games. Clients work directly with the leads and engineers who build their systems, ensuring clarity and velocity.",
  },
];

export function LeadershipPage() {
  const allLeaders = [...FOUNDERS, ...CO_FOUNDERS];

  return (
    <div className="bg-background">
      {/* ================= Hero Section ================= */}
      <section className="relative overflow-hidden border-b border-hairline bg-[#04101f] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 40%, rgba(95,208,225,0.2), transparent 70%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-medium tracking-wide text-[#79dce8] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#5fd0e1] animate-pulse-dot" />
              Leadership · Executive Team
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              <SplitText text="The people behind the" immediate />{" "}
              <span className="bg-gradient-to-r from-[#79dce8] via-[#a6e5ff] to-white bg-clip-text text-transparent font-normal">
                mission & platforms.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              Engineers, designers, and systems architects dedicated to shaping future-ready technology. Guided by principles of deep craft, user empathy, and measurable impact.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4 text-xs sm:text-sm text-white/70">
              <span className="border border-white/10 bg-white/5 px-4 py-2">
                <strong>HQ:</strong> Nerul, Navi Mumbai, Maharashtra, India
              </span>
              <span className="border border-white/10 bg-white/5 px-4 py-2">
                <strong>Focus:</strong> AI · SaaS · Full-Stack · Digital Growth
              </span>
              <span className="border border-white/10 bg-white/5 px-4 py-2">
                <strong>Ethos:</strong> People-first engineering
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Founders & Executive Profiles ================= */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Executive Leadership</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Steering strategy, engineering, and design.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Meet the founders and directors responsible for our technical architecture, product design system, and client partnerships.
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {allLeaders.map((leader, i) => (
              <Reveal key={leader.id} delay={0.08 * i}>
                <div className="border border-hairline bg-white transition-all duration-300 hover:border-hairline-strong hover:shadow-lg">
                  <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[300px_1fr] lg:gap-12">
                    {/* Leader Avatar / Monogram Tile */}
                    <div className="flex flex-col items-center sm:items-start">
                      <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden border border-hairline bg-ibm-layer">
                        {leader.photo ? (
                          <Image
                            src={leader.photo}
                            alt={`Portrait of ${leader.name}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                            <div className="flex size-24 items-center justify-center border border-hairline bg-white shadow-sm">
                              <span className="text-4xl font-light text-primary">
                                {leader.monogram}
                              </span>
                            </div>
                            <span className="mt-4 text-xs font-mono uppercase tracking-widest text-ink-muted">
                              {leader.role.includes("CEO")
                                ? "Executive Profile"
                                : leader.role.includes("CTO")
                                ? "Tech Lead"
                                : "Design Lead"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Social handles */}
                      <div className="mt-6 w-full">
                        <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Connect</p>
                        <LeaderSocial leader={leader} />
                      </div>
                    </div>

                    {/* Leader Bio & Accomplishments */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-4">
                          <div>
                            <h3 className="text-2xl font-light text-ink sm:text-3xl">
                              {leader.name}
                            </h3>
                            <p className="mt-1 text-sm font-medium text-primary">
                              {leader.role}
                            </p>
                          </div>
                          {leader.featured && (
                            <span className="border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              Founder
                            </span>
                          )}
                        </div>

                        <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                          {leader.bio}
                        </p>

                        {/* Expertise Pills */}
                        <div className="mt-6">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted">Core Focus & Expertise</h4>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {leader.expertise.map((exp) => (
                              <span
                                key={exp}
                                className="border border-hairline bg-ibm-layer px-3 py-1 text-xs font-medium text-ink"
                              >
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Highlights Strip */}
                      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-hairline pt-6 sm:grid-cols-3">
                        {leader.highlights.map((hl) => (
                          <div key={hl.label}>
                            <div className="text-xs font-mono text-ink-muted">{hl.label}</div>
                            <div className="mt-1 text-sm font-medium text-ink">{hl.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Leadership in Action Photography ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="max-w-2xl">
              <Eyebrow tone="muted">Studio Culture & Stewardship</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Practicing what we preach every day.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Our founders don't sit in ivory towers. They write code, design component tokens, conduct architecture reviews, and mentor engineers on the bench.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-ink-muted border border-hairline bg-white px-3.5 py-2">
              <Sparkles className="size-4 text-primary" />
              <span>Lead by example · Hands on keyboard</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="group relative overflow-hidden border border-hairline bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                <Image
                  src="/images/gl-team.jpg"
                  alt="ABWcurious leadership and engineering team in studio discussion"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                  Sprint Planning & Architecture Review
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-ink">Flat Structure, Rapid Decisions</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Technical decisions are vetted by technical rigor, not hierarchy. Anyone on the team can challenge an architectural choice with benchmarks.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden border border-hairline bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                <Image
                  src="/images/gl-office.jpg"
                  alt="Nerul studio engineering floor"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                  Studio Headquarters · Nerul, Navi Mumbai
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-ink">Long-Term Architectural Thinking</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  We build for longevity. Our systems are crafted to be maintainable by teams long after initial deployment, with comprehensive documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Leadership Principles ================= */}
      <section className="border-t border-hairline py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Our Philosophy</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Principles that govern our decisions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Technology evolves rapidly, but fundamental principles endure. Here is what guides how we hire, architect systems, and advise our clients.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-hairline bg-white p-6 transition-all hover:border-hairline-strong"
                >
                  <div className="flex size-10 items-center justify-center border border-hairline bg-ibm-layer text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-base font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Connect with Leadership ================= */}
      <section className="py-16 sm:py-20 border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border border-hairline bg-white p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Strategic Advisory</span>
              <h2 className="mt-2 text-2xl font-light text-ink sm:text-3xl">
                Looking for technical leadership or enterprise consulting?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                Our founders and practice heads consult directly on digital roadmaps, AI feasibility studies, and enterprise cloud migrations.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
              <RollButton href="/contact" variant="primary" arrow>
                Speak with leadership
              </RollButton>
              <RollButton href="/about" variant="outline">
                About our studio
              </RollButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
