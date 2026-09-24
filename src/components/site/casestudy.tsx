"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";

const CASES = [
  {
    id: "nexacrm",
    client: "NexaCRM",
    industry: "B2B SaaS · Sales Intelligence",
    image: "/images/work-crm.jpg",
    challenge:
      "A growing SaaS team was drowning in manual lead triage — reps spent 11 hours a week scoring and routing leads by hand.",
    solution:
      "We built an AI scoring engine inside their existing CRM: LLM enrichment of every inbound lead, ML-based priority scoring, and auto-routing to the right rep with a full audit trail.",
    results: [
      { value: "11h", label: "saved / rep / week" },
      { value: "38%", label: "lift in conversions" },
      { value: "6 wks", label: "idea → production" },
    ],
  },
  {
    id: "askor",
    client: "Askor",
    industry: "Customer Support · Conversational AI",
    image: "/images/work-chatbot.jpg",
    challenge:
      "A consumer platform with 12,000 daily tickets across three languages needed support that scales without scaling headcount.",
    solution:
      "A multilingual RAG chatbot grounded in their knowledge base, with confidence-based handoff to humans and continuous learning from every resolved conversation.",
    results: [
      { value: "90%", label: "tickets auto-resolved" },
      { value: "3", label: "languages, one brain" },
      { value: "42s", label: "avg. first response" },
    ],
  },
  {
    id: "fleetiq",
    client: "FleetIQ",
    industry: "Logistics · ERP & Analytics",
    image: "/images/work-erp.jpg",
    challenge:
      "A logistics operator ran their fleet on spreadsheets — no live visibility, margins leaking through missed maintenance and empty return legs.",
    solution:
      "A custom ERP with live fleet telemetry, predictive maintenance and route-margin analytics, deployed across ops, finance and the driver mobile app.",
    results: [
      { value: "23%", label: "lower maintenance cost" },
      { value: "17%", label: "fewer empty legs" },
      { value: "100%", label: "fleet live visibility" },
    ],
  },
];

export function CaseStudy() {
  return (
    <SectionFrame id="cases">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">06 / Case files</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Deep-dive: <span className="text-ibm-bright">how curiosity pays.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Three engagements, three industries, one method. Open a file to see the problem, the
              build and the numbers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Tabs defaultValue={CASES[0].id} className="mt-14">
            <TabsList className="h-auto w-full justify-start gap-0 rounded-none border border-hairline bg-transparent p-0">
              {CASES.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="flex-1 flex-col items-start gap-1 rounded-none border-r border-hairline px-5 py-4 last:border-r-0 data-[state=active]:bg-white/[0.06] data-[state=active]:shadow-none sm:flex-row sm:items-center sm:gap-3"
                >
                  <span className="font-mono text-sm text-foreground">{c.client}</span>
                  <span className="hidden text-xs text-muted-foreground lg:inline">
                    {c.industry.split("·")[0]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {CASES.map((c) => (
              <TabsContent key={c.id} value={c.id} className="mt-0 focus-visible:outline-none">
                <article className="relative grid border border-t-0 border-hairline bg-card lg:grid-cols-12">
                  <span className="absolute -left-px -top-px z-10 h-3 w-3 border-l-2 border-t-2 border-ibm-bright" aria-hidden="true" />
                  <span className="absolute -bottom-px -right-px z-10 h-3 w-3 border-b-2 border-r-2 border-ibm-bright" aria-hidden="true" />

                  <div className="relative min-h-[260px] border-b border-hairline lg:col-span-5 lg:border-b-0 lg:border-r">
                    <Image
                      src={c.image}
                      alt={`${c.client} case study`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(6,6,9,0.85), rgba(6,6,9,0.1) 55%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ibm-soft">
                        {c.industry}
                      </p>
                      <p className="mt-1 text-2xl font-light tracking-tight text-white">
                        {c.client}
                      </p>
                    </div>
                  </div>

                  <div className="p-8 lg:col-span-7 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          The challenge
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          {c.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          What we built
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          {c.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-px border border-hairline bg-hairline">
                      {c.results.map((r) => (
                        <div key={r.label} className="bg-background px-4 py-4 text-center">
                          <div className="font-mono text-xl text-ibm-bright sm:text-2xl">
                            {r.value}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-ibm-soft transition-colors hover:text-ibm-bright focus-carbon"
                    >
                      Build something like this
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </a>
                  </div>
                </article>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
