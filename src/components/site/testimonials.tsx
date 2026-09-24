"use client";

import { Star } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  handle: string;
  quote: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    handle: "@priyabuilds",
    quote:
      "ABWcurious rebuilt our customer portal with an AI assistant. Support tickets dropped 40% in the first month. The demo cadence kept everyone honest.",
    initials: "PS",
  },
  {
    name: "Marcus Chen",
    handle: "@marcuschen_io",
    quote:
      "The most engineering-literate design team we have worked with. Zero hand-waving — every estimate came with a plan and every plan shipped.",
    initials: "MC",
  },
  {
    name: "Ananya Iyer",
    handle: "@ananya_iyr",
    quote:
      "Their RAG knowledge base now answers 90% of internal queries. Onboarding a new hire went from two weeks to two days.",
    initials: "AI",
  },
  {
    name: "Daniel Okafor",
    handle: "@danokafor",
    quote:
      "Fast, transparent, and genuinely curious about our business. They asked better questions than our own board did.",
    initials: "DO",
  },
  {
    name: "Elena Petrova",
    handle: "@elenapetrova",
    quote:
      "We went from Figma to a production e-commerce site in six weeks. Page speed went from 41 to 98. Revenue followed.",
    initials: "EP",
  },
  {
    name: "Rahul Mehta",
    handle: "@rahulmht",
    quote:
      "The chatbot they built handles 12,000 conversations a day across three languages. It just quietly works. That is the highest praise I can give.",
    initials: "RM",
  },
  {
    name: "Sarah Williams",
    handle: "@sarahwill_tech",
    quote:
      "Working with ABWcurious felt like adding a senior product team overnight. The weekly demos made our stakeholders feel included, not surprised.",
    initials: "SW",
  },
  {
    name: "James Carter",
    handle: "@jcarterdev",
    quote:
      "Their design system cut our feature build time in half. Two years later it is still the backbone of every screen we ship.",
    initials: "JC",
  },
];

function TweetCard({ t }: { t: Testimonial }) {
  return (
    <figure className="min-w-[320px] max-w-[420px] border border-hairline bg-white p-6 shadow-[0_1px_0_rgba(16,40,84,0.06)] transition-colors duration-300 hover:border-ibm-bright/50">
      <div className="flex items-center gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ibm-blue to-ibm-cyan font-mono text-sm font-medium text-white"
          aria-hidden="true"
        >
          {t.initials}
        </span>
        <div>
          <figcaption className="font-medium leading-tight">{t.name}</figcaption>
          <div className="font-mono text-xs text-muted-foreground">{t.handle}</div>
        </div>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ibm-soft">
          ★ 5.0
        </span>
      </div>
      <div className="mt-4 flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-ibm-bright text-ibm-bright" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">“{t.quote}”</blockquote>
    </figure>
  );
}

export function Testimonials() {
  const rowA = [...TESTIMONIALS.slice(0, 4), ...TESTIMONIALS.slice(0, 4)];
  const rowB = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(4)];
  return (
    <section className="border-y border-hairline py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Hear from our clients</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
              Teams that trusted the <span className="text-ibm-bright">curious ones.</span>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="flex justify-center gap-5 overflow-hidden">
          <div className="flex w-max gap-5 animate-marquee-slow hover:[animation-play-state:paused]">
            {rowA.map((t, i) => (
              <TweetCard key={`a-${i}`} t={t} />
            ))}
          </div>
        </div>
        <div className={cn("flex justify-center gap-5 overflow-hidden")}>
          <div className="flex w-max gap-5 animate-marquee-reverse hover:[animation-play-state:paused]">
            {rowB.map((t, i) => (
              <TweetCard key={`b-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
