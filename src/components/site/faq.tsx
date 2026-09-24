"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";

const FAQS = [
  {
    q: "What does ABWcurious actually do?",
    a: "We are a technology studio covering four disciplines: AI software development, AI solutions, website development and design. In practice that means we can take a product from idea to production — strategy, UI/UX, engineering and launch — with one accountable team.",
  },
  {
    q: "How long does a typical project take?",
    a: "A marketing website usually ships in 2–4 weeks. A custom web application or AI feature typically runs 6–12 weeks depending on scope. We work in weekly increments, so you see working software from the first sprint — not a big reveal at the end.",
  },
  {
    q: "Can you integrate AI into our existing product?",
    a: "Yes — that is one of our most requested engagements. We audit your current stack, identify where AI creates measurable leverage (support, search, document processing, automation) and ship integrations that respect your existing data privacy and infrastructure constraints.",
  },
  {
    q: "What technologies do you work with?",
    a: "Modern, typed, well-supported stacks: Next.js and React on the web, Python and Node.js on the backend, PostgreSQL and vector databases for data, and major LLM providers plus open-source models. We choose boring technology where it counts and innovative technology where it pays.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed-price for well-defined scopes (websites, audits, MVPs), and a monthly product squad for evolving products. Every engagement starts with a free discovery call and a written proposal — no hourly surprises. See our plans above for typical ranges.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Every build includes a warranty period for fixes, and most clients continue on a care plan with monitoring, improvements and priority support. We also hand over clean documentation so you are never locked in.",
  },
  {
    q: "Who owns the code and designs?",
    a: "You do — 100%, from day one. We work in your repositories wherever possible, and every contract includes full IP transfer. Our job is to make ourselves unnecessary, not indispensable.",
  },
];

export function Faq() {
  return (
    <SectionFrame id="faq">
      <div className="py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-28">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="justify-start">FAQ</Eyebrow>
              <h2 className="mt-5 text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Frequently asked <span className="text-ibm-bright">questions.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Everything clients usually want to know before the first call. Something missing?
                Write to us — a human replies within 24 hours.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 border border-hairline-strong px-5 py-3 font-mono text-sm text-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
              >
                Ask us anything →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-hairline">
                  <AccordionTrigger className="py-6 text-left font-normal hover:text-ibm-bright hover:no-underline focus-carbon">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-ibm-bright">0{i + 1}</span>
                      <span className="text-lg tracking-tight">{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-9 text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
