"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Link2, Check } from "lucide-react";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";
import { useInquiryStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const CASES = [
  {
    id: "nexacrm",
    client: "NexaCRM",
    industry: "B2B SaaS · Sales Intelligence",
    service: "AI & Automation",
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
    service: "AI & Automation",
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
    service: "Software & Web Development",
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

function caseFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/^#cases\/([a-z0-9-]+)$/i);
  return m ? m[1] : null;
}

function shareUrl(id: string) {
  return `${window.location.origin}/#cases/${id}`;
}

export function CaseStudy() {
  const setPresetService = useInquiryStore((s) => s.setPresetService);
  const { toast } = useToast();
  const [value, setValue] = useState<string>(CASES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /* Open deep-linked case (#cases/<id>) on first paint */
  useEffect(() => {
    const id = caseFromHash();
    if (!id || !CASES.some((c) => c.id === id)) return;
    const raf = requestAnimationFrame(() => setValue(id));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Keep tabs in sync with browser history (Back returns to previous case) */
  useEffect(() => {
    const onPop = () => {
      const id = caseFromHash();
      setValue(id && CASES.some((c) => c.id === id) ? id : CASES[0].id);
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const handleValueChange = useCallback((v: string) => {
    setValue(v);
    history.pushState(null, "", `#cases/${v}`);
  }, []);

  async function copyLink(id: string) {
    try {
      await navigator.clipboard.writeText(shareUrl(id));
      setCopiedId(id);
      toast({ title: "Link copied", description: "Shareable deep link is on your clipboard." });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  }

  return (
    <SectionFrame id="cases">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">07 / Case files</Eyebrow>
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
          <Tabs value={value} onValueChange={handleValueChange} className="mt-14">
            <TabsList
              className="h-auto w-full justify-start gap-0 rounded-none border border-hairline bg-transparent p-0"
              aria-label="Case files"
            >
              {CASES.map((c, i) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="group relative flex-1 flex-col items-start gap-1 rounded-none border-r border-hairline px-5 py-4 last:border-r-0 data-[state=active]:bg-ibm-blue/[0.06] data-[state=active]:shadow-none sm:flex-row sm:items-center sm:gap-3"
                >
                  {/* active-case IBM accent bar (left edge) */}
                  <span
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-ibm-blue to-ibm-cyan transition-transform duration-300 group-data-[state=active]:scale-y-100"
                    aria-hidden="true"
                  />
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[11px] text-ibm-bright" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="font-mono text-sm text-foreground">{c.client}</span>
                  </span>
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
                          "linear-gradient(to top, rgba(0,17,65,0.88), rgba(0,17,65,0.12) 55%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#a6c8ff]">
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

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <a
                        href="#contact"
                        onClick={() => setPresetService(c.service)}
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-ibm-soft transition-colors hover:text-ibm-bright focus-carbon"
                      >
                        Build something like this
                        <ArrowUpRight className="size-4" strokeWidth={1.5} />
                      </a>
                      <button
                        type="button"
                        onClick={() => copyLink(c.id)}
                        aria-label={`Copy shareable link to the ${c.client} case file`}
                        className="inline-flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
                      >
                        {copiedId === c.id ? (
                          <Check className="size-3.5 text-ibm-success" strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <Link2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                        )}
                        {copiedId === c.id ? "Copied" : "Copy link"}
                      </button>
                    </div>
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
