"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";
import { SplitText, Ticker } from "./text-anim";
import { CATEGORIES, ALL_SUB_SERVICES, categoryServiceCount } from "@/lib/catalog";
import { openCategory } from "@/lib/catalog-route";

/**
 * Home showcase for the 6 core service practices.
 * Each card opens its full-screen category page (hash route #/services/<slug>).
 */

export function Services() {
  return (
    <SectionFrame id="services">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">01 / Services</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                <SplitText text="Six practices." />{" "}
                <span className="text-ibm-bright">
                  <SplitText text="One accountable team." delay={0.25} />
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              From your first landing page to ERP, AI and cloud — every service below opens a
              full playbook with scope, process and pricing paths.
            </p>
          </div>
        </Reveal>

        {/* category grid: featured 01 + 02, then the rest */}
        <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
          {CATEGORIES.map((category, i) => {
            const count = categoryServiceCount(category);
            const topChips = category.groups[0].items.slice(0, 3).map((it) => it.name);
            return (
              <motion.button
                key={category.slug}
                type="button"
                onClick={() => openCategory(category.slug)}
                aria-label={`Open ${category.name} — ${count} services`}
                className="group relative flex flex-col bg-white p-0 text-left transition-colors duration-300 hover:bg-ibm-blue/[0.03] focus-carbon"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* image */}
                <div className="relative aspect-[16/8] overflow-hidden border-b border-hairline bg-card">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-hairline-strong bg-white/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground backdrop-blur-sm">
                    <Layers className="size-3 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                    {count} services
                  </span>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <span
                    className="pointer-events-none absolute right-6 top-6 font-mono text-5xl font-light text-ink/[0.07] transition-colors duration-300 group-hover:text-ibm-blue/25"
                    aria-hidden="true"
                  >
                    {category.num}
                  </span>
                  <h3 className="text-2xl tracking-tight">{category.name}</h3>
                  <p className="mt-2.5 max-w-md leading-relaxed text-muted-foreground">{category.tagline}</p>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${category.name} highlights`}>
                    {topChips.map((chip) => (
                      <li key={chip} className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <span className="size-1 bg-ibm-blue" aria-hidden="true" />
                        {chip}
                      </li>
                    ))}
                    {count > 3 && (
                      <li className="font-mono text-xs text-ibm-bright">+{count - 3} more</li>
                    )}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-sm text-ibm-soft">
                    Explore category
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* full-catalog ticker — all 70 sub-services */}
        <Reveal>
          <div className="mt-10 border border-hairline bg-ibm-blue/[0.02] py-4">
            <div className="flex items-center justify-between px-6 pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Full catalog — {ALL_SUB_SERVICES.length} sub-services
              </p>
              <a
                href="/services#all-services"
                className="font-mono text-xs text-primary hover:underline"
              >
                Browse all {ALL_SUB_SERVICES.length} services →
              </a>
            </div>
            <Ticker items={ALL_SUB_SERVICES} slow />
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
