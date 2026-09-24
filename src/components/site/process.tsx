"use client";

import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";

const STEPS = [
  {
    id: "01",
    icon: Search,
    title: "Discover",
    desc: "Workshops, audits and research to map the real problem — not the guessed one.",
    meta: "1–2 weeks",
  },
  {
    id: "02",
    icon: PenTool,
    title: "Design",
    desc: "Flows, prototypes and design systems validated with the people who will use them.",
    meta: "2–3 weeks",
  },
  {
    id: "03",
    icon: Code2,
    title: "Develop",
    desc: "Typed, tested, reviewed code in weekly increments you can click and try.",
    meta: "3–10 weeks",
  },
  {
    id: "04",
    icon: Rocket,
    title: "Deploy & grow",
    desc: "CI/CD launches, monitoring, iteration — we stay on after the confetti.",
    meta: "Ongoing",
  },
];

export function Process() {
  return (
    <SectionFrame id="process">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <Eyebrow>03 / Process</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
              A process tuned by <span className="text-ibm-bright">a hundred launches.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.1} className="h-full">
              <div className="group relative h-full bg-card p-8 transition-colors duration-300 hover:bg-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-ibm-bright">{step.id}</span>
                  <step.icon
                    className="size-6 text-muted-foreground transition-colors duration-300 group-hover:text-ibm-bright"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-16 text-xl tracking-tight">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                <div className="mt-6 inline-block border border-hairline px-2.5 py-1 font-mono text-xs text-muted-foreground">
                  {step.meta}
                </div>
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
