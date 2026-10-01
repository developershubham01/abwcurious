"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight, BriefcaseBusiness, MapPin, Clock3 } from "lucide-react";
import { Eyebrow, Reveal, SectionFrame, RollButton } from "./primitives";
import { useInquiryStore } from "@/lib/store";

/* ---------------- content model ---------------- */

interface Role {
  title: string;
  type: string;
  location: string;
  blurb: string;
  duties: string[];
  brings: string[];
}

const ROLES: Role[] = [
  {
    title: "Senior AI Engineer",
    type: "Full-time",
    location: "Nerul, Navi Mumbai · Hybrid",
    blurb:
      "Own LLM features end-to-end — from eval design and retrieval pipelines to the guardrails that keep them honest in production.",
    duties: [
      "Design and ship LLM features: RAG pipelines, agents, structured extraction.",
      "Build the boring parts on purpose — evals, tracing, fallbacks, cost controls.",
      "Pair with client teams to transfer what you know, not hoard it.",
    ],
    brings: [
      "4+ years shipping backend systems in Python or TypeScript.",
      "At least one LLM feature you pushed to real users — scars welcome.",
      "Strong opinions about retrieval, held loosely.",
    ],
  },
  {
    title: "Product Designer (UI/UX)",
    type: "Full-time",
    location: "Remote · IST ±3",
    blurb:
      "Run discovery, design in systems, and prototype in motion. You will shape products and the design system they ship from.",
    duties: [
      "Lead discovery workshops and turn fuzzy briefs into tested flows.",
      "Extend our Carbon-derived design system — tokens, primitives, documentation.",
      "Prototype interactions (including motion) and hand off with engineering, not against it.",
    ],
    brings: [
      "A portfolio of shipped product work — live URLs beat dribbble shots.",
      "Fluency in Figma and a tokens-first mindset.",
      "Enough React literacy to argue with the code when it matters.",
    ],
  },
  {
    title: "Full-Stack Engineer (Next.js)",
    type: "Contract",
    location: "Remote",
    blurb:
      "Build marketing sites and product MVPs on Next.js + TypeScript, with performance and accessibility treated as features, not chores.",
    duties: [
      "Ship fast, typed, accessible web apps on Next.js and Tailwind.",
      "Own Core Web Vitals and keyboard-level detail on everything you touch.",
      "Work directly with founders and designers — weekly increments, working software.",
    ],
    brings: [
      "Next.js + TypeScript fluency and real Tailwind mileage.",
      "Care for the last 10%: focus states, empty states, reduced motion.",
      "Reliable async communication — we are remote by default.",
    ],
  },
];

const PERKS = [
  {
    title: "Remote-friendly studio",
    desc: "Nerul, Navi Mumbai anchor office, IST ±3 welcome. We measure outcomes, not chairs.",
  },
  {
    title: "Learning budget",
    desc: "Courses, conferences and books on the studio — curiosity is the job.",
  },
  {
    title: "Hardware of your choice",
    desc: "Pick your machine; we refresh it. Your setup should fit your hands.",
  },
  {
    title: "No telephone game",
    desc: "You talk to clients directly and your work ships under your name.",
  },
];

/* ---------------- section ---------------- */

export function Careers() {
  const setPresetRole = useInquiryStore((s) => s.setPresetRole);

  function applyFor(role: Role) {
    setPresetRole(role.title);
  }

  return (
    <SectionFrame id="careers">
      <div className="py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-28">
          {/* Left: pitch + perks */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="justify-start">11 / Careers</Eyebrow>
              <h2 className="mt-5 text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Build with{" "}
                <span className="text-ink">curious people.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                We are a small studio by design — every hire changes what we can
                build. If you like owning problems end-to-end and shipping in
                weekly increments, there is a desk (or a headset) for you.
              </p>

              <div className="mt-8 inline-flex items-center gap-2.5 border border-ibm-bright/40 bg-ibm-blue/[0.06] px-4 py-2.5">
                <span
                  className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot"
                  aria-hidden="true"
                />
                <p className="text-xs text-primary">
                  {ROLES.length} open roles — reviewed within a week
                </p>
              </div>

              <ul className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
                {PERKS.map((perk) => (
                  <li
                    key={perk.title}
                    className="group bg-card p-5 transition-colors hover:bg-ibm-blue/[0.05]"
                  >
                    <span className="block text-xs text-ink-muted">
                      {perk.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {perk.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right: open roles */}
          <Reveal delay={0.12}>
            <Accordion type="single" collapsible className="w-full">
              {ROLES.map((role, i) => (
                <AccordionItem
                  key={role.title}
                  value={`role-${i}`}
                  className="border-b border-hairline"
                >
                  <AccordionTrigger className="py-6 text-left hover:no-underline focus-carbon">
                    <span className="flex min-w-0 flex-1 items-start gap-4">
                      <span className="mt-1 text-xs text-primary">
                        0{i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg tracking-tight text-ink transition-colors group-data-[state=open]:text-primary">
                          {role.title}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <BriefcaseBusiness
                              className="size-3.5 text-ibm-soft"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                            {role.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin
                              className="size-3.5 text-ibm-soft"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                            {role.location}
                          </span>
                        </span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 pl-9">
                    <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                      {role.blurb}
                    </p>

                    <div className="mt-6 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-medium text-ink">
                          What you&apos;ll do
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {role.duties.map((duty) => (
                            <li
                              key={duty}
                              className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                            >
                              <span
                                className="mt-[7px] size-1.5 shrink-0 bg-ibm-blue"
                                aria-hidden="true"
                              />
                              {duty}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-ink">
                          You bring
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {role.brings.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                            >
                              <span
                                className="mt-[7px] size-1.5 shrink-0 bg-ink/40"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-5">
                      <RollButton
                        href="/contact"
                        variant="primary"
                        arrow
                        className="h-10 px-5 text-xs"
                        onClick={() => applyFor(role)}
                      >
                        Apply for this role
                      </RollButton>
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                        <Clock3 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                        Reply within a week — always a human
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 flex items-start justify-between gap-4 border border-dashed border-hairline-strong px-5 py-4">
              <p className="text-sm text-muted-foreground">
                Don&apos;t see your role?{" "}
                <span className="text-foreground">
                  Convince us anyway — speculative applications welcome.
                </span>
              </p>
              <a
                href="mailto:hello@abwcurious.com?subject=Speculative%20application"
                className="focus-carbon inline-flex shrink-0 items-center gap-1 text-xs text-primary transition-colors hover:text-ibm-bright"
              >
                Write to us
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
