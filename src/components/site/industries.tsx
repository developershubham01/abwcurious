import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { INDUSTRIES_SECTION } from "@/data/site-content";
import { ALL_INDUSTRIES } from "@/lib/industries";

/* --------------------------- 06 — Industries ------------------------------- */

export function Industries() {
  return (
    <section
      id="industries"
      aria-label="Industries we serve"
      className="relative scroll-mt-24 border-y border-hairline bg-ibm-layer py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header — left-aligned, alternating rhythm */}
        <Reveal>
          <Eyebrow tone="muted">{INDUSTRIES_SECTION.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            <SplitText text={INDUSTRIES_SECTION.title} />
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted">
            {INDUSTRIES_SECTION.lede}
          </p>
        </Reveal>

        {/* industry tiles — hairline gap-px grid */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {ALL_INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex min-h-24 items-center justify-between gap-3 bg-white p-5 transition-colors duration-200 hover:bg-ibm-layer"
              >
                <span className="text-base font-medium text-ink group-hover:text-primary transition-colors">
                  {ind.name}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-ink/30 transition-colors group-hover:text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Reveal>

        {/* footer CTA */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <RollButton href="/industries" variant="outline">
              Explore Industries
            </RollButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
