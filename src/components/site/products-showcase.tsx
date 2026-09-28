"use client";

import { ArrowUpRight } from "lucide-react";
import { PRODUCTS_SECTION } from "@/data/site-content";
import { Eyebrow, Reveal, RollButton } from "@/components/site/primitives";
import { SplitText } from "@/components/site/text-anim";
import { PRODUCTS, productStatusTotals } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * ProductsShowcase — the "Innovation Beyond Services." home section.
 * White band (adjacent gray bands carry their own borders): five flat
 * hairline product cards + one solid IBM-blue CTA tile closing the grid.
 */
export function ProductsShowcase() {
  const totals = productStatusTotals();

  return (
    <section id="products" aria-label="Our products" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow tone="muted">{PRODUCTS_SECTION.eyebrow}</Eyebrow>
        <h2 className="mt-5 text-4xl font-light text-ink sm:text-5xl">
          <SplitText text={PRODUCTS_SECTION.title} immediate />
        </h2>
        <p className="mt-5 max-w-2xl text-base text-ink-muted">{PRODUCTS_SECTION.lede}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Reveal key={p.slug} className="h-full">
              <a
                href={`#/products/${p.slug}`}
                aria-label={`${p.name} — ${p.tagline}`}
                className="group flex h-full flex-col border border-hairline bg-white p-6 transition-colors duration-200 hover:border-primary lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm tabular-nums text-ibm-subtle">{p.num}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                    <span
                      className={cn("size-1.5 rounded-full", p.status === "soon" ? "bg-ibm-subtle" : "bg-primary")}
                      aria-hidden="true"
                    />
                    {p.statusLabel}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-light text-ink">{p.name}</h3>
                <p className="mt-1.5 text-sm font-medium text-ink">{p.tagline}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">{p.description}</p>
                <div className="flex-1" />
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Explore product
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>
          ))}

          {/* CTA tile — solid Carbon blue, mirrors the cta-banner pattern */}
          <div className="flex h-full flex-col justify-between bg-primary p-6 text-white lg:p-8">
            <div>
              <p className="text-sm text-white/80">The product line</p>
              <p className="mt-3 text-2xl font-light">Five platforms. One accountable team.</p>
              <div className="mt-6 flex gap-6 text-sm text-white/90">
                <span>
                  <span className="tabular-nums">{totals.live}</span> live
                </span>
                <span>
                  <span className="tabular-nums">{totals.soon}</span> coming soon
                </span>
              </div>
            </div>
            <div className="mt-8">
              <RollButton href={PRODUCTS_SECTION.cta.href} variant="light" arrow>
                {PRODUCTS_SECTION.cta.label}
              </RollButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
