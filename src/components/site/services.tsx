"use client";

import { Bot, BrainCircuit, Code2, PenTool, ArrowUpRight, Check } from "lucide-react";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";

const SERVICES = [
  {
    id: "01",
    icon: Bot,
    title: "AI Software Development",
    desc: "Custom AI products engineered end-to-end — from model selection to production deployment and monitoring.",
    points: ["Custom AI applications", "Chatbots & copilots", "ML model integration", "MLOps & monitoring"],
  },
  {
    id: "02",
    icon: BrainCircuit,
    title: "AI Solutions",
    desc: "Practical intelligence woven into your existing stack — automate decisions, search and support.",
    points: ["RAG knowledge systems", "Document intelligence", "Predictive analytics", "Workflow automation"],
  },
  {
    id: "03",
    icon: Code2,
    title: "Website Development",
    desc: "Fast, accessible, conversion-focused websites and web applications built on a modern stack.",
    points: ["Marketing websites", "Web apps & portals", "E-commerce builds", "APIs & integrations"],
  },
  {
    id: "04",
    icon: PenTool,
    title: "Design",
    desc: "Interfaces people remember. Brand systems, product UI and motion that make software feel alive.",
    points: ["UI/UX design", "Design systems", "Brand identity", "Motion & interaction"],
  },
];

export function Services() {
  return (
    <SectionFrame id="services">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">01 / Services</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Everything your product needs,{" "}
                <span className="text-ibm-bright">under one roof.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Four disciplines, one accountable team. We take ideas from whiteboard sketch to
              production-grade software.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <article className="group relative h-full bg-card p-8 transition-colors duration-300 hover:bg-ibm-blue/[0.04] lg:p-10">
                <span
                  className="pointer-events-none absolute right-6 top-6 font-mono text-5xl font-light text-ink/[0.07] transition-colors duration-300 group-hover:text-ibm-blue/25"
                  aria-hidden="true"
                >
                  {service.id}
                </span>

                <div className="flex size-12 items-center justify-center border border-hairline-strong bg-ibm-blue/[0.05] text-ibm-bright transition-colors duration-300 group-hover:border-ibm-bright">
                  <service.icon className="size-6" strokeWidth={1.25} aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-2xl tracking-tight">{service.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.desc}</p>

                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <Check className="size-4 shrink-0 text-ibm-bright" strokeWidth={2} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-ibm-soft focus-carbon"
                >
                  Discuss this service
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </a>

                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
