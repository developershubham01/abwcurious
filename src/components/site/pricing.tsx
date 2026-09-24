"use client";

import { Check } from "lucide-react";
import { Eyebrow, Reveal, RollButton, SectionFrame } from "./primitives";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: "$499",
    unit: "from / project",
    blurb: "A focused engagement for landing pages, audits and small features.",
    features: [
      "Marketing website or audit",
      "1 designer + 1 engineer",
      "2-week delivery window",
      "Weekly demo & report",
    ],
    cta: "Get a Quote",
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,999",
    unit: "from / month",
    blurb: "A dedicated product squad for web platforms and AI features.",
    features: [
      "Web app or AI product build",
      "Design + AI + engineering pod",
      "Sprint-based roadmap",
      "CI/CD & monitoring included",
      "Priority Slack support",
    ],
    cta: "Start for Free",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "tailored / scope",
    blurb: "End-to-end delivery for complex, multi-team AI transformations.",
    features: [
      "Custom AI software & ERP",
      "Dedicated cross-functional team",
      "SLA-backed support",
      "Security & compliance review",
      "Quarterly roadmap workshops",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <SectionFrame id="pricing">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <Eyebrow>07 / Plans & Pricing</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
              Flexible plans for <span className="text-ibm-bright">every stage of curious.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Transparent scopes, no surprise invoices. Every plan starts with a free discovery call.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col border bg-card p-8 transition-all duration-300 hover:-translate-y-1",
                  plan.featured
                    ? "border-ibm-bright/70 bg-ibm-blue/[0.045] shadow-[0_18px_50px_-24px_rgba(15,98,254,0.35)]"
                    : "border-hairline hover:border-ink/30"
                )}
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 border border-ibm-bright/40 bg-ibm-blue/10 px-3 py-1 font-mono text-xs text-ibm-bright">
                    Most Popular
                  </span>
                )}
                <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {plan.name}
                </h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className={cn("text-5xl font-light tracking-tight", plan.featured && "text-ibm-bright")}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.unit}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.blurb}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-ibm-bright" strokeWidth={2} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <RollButton
                  href="#contact"
                  variant={plan.featured ? "primary" : "outline"}
                  className="mt-8 w-full"
                  arrow
                >
                  {plan.cta}
                </RollButton>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
