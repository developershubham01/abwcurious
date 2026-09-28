"use client";

import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { SplitText } from "@/components/site/text-anim";
import { CAPABILITIES, CAPABILITIES_SECTION } from "@/data/site-content";

/**
 * "02 — Our capabilities" — gray Carbon band with a single bordered list
 * of the seven capability rows (number / copy / tags + explore link).
 */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-label="Our capabilities"
      className="relative scroll-mt-24 border-y border-hairline bg-ibm-layer py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow tone="muted" className="justify-center">
              {CAPABILITIES_SECTION.eyebrow}
            </Eyebrow>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            <SplitText text={CAPABILITIES_SECTION.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-base text-ink-muted">{CAPABILITIES_SECTION.lede}</p>
          </Reveal>
        </div>

        {/* capability rows */}
        <div className="mt-14 divide-y divide-hairline border border-hairline bg-white">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.num} delay={Math.min(i * 0.05, 0.2)}>
              <article className="group grid gap-5 p-6 transition-colors duration-200 hover:bg-ibm-layer lg:grid-cols-[72px_1fr_300px] lg:gap-8 lg:p-8">
                {/* number */}
                <span className="text-sm tabular-nums text-ibm-subtle">{c.num}</span>

                {/* copy */}
                <div>
                  <h3 className="text-2xl font-light text-ink">{c.name}</h3>
                  <p className="mt-1.5 text-base font-medium text-ink">{c.tagline}</p>
                  {c.lede && <p className="mt-3 text-sm text-primary">{c.lede}</p>}
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                  {c.bodyExtra && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.bodyExtra}</p>
                  )}
                </div>

                {/* tags + explore link */}
                <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
                  {c.flow ? (
                    <p className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 text-sm font-medium text-ink lg:justify-end">
                      {c.tags.map((tag, ti) => (
                        <Fragment key={tag}>
                          {ti > 0 && (
                            <span className="text-primary" aria-hidden="true">
                              →
                            </span>
                          )}
                          <span>{tag}</span>
                        </Fragment>
                      ))}
                    </p>
                  ) : (
                    <ul className="flex flex-wrap gap-2 lg:justify-end">
                      {c.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-block border border-hairline bg-ibm-layer px-3 py-1 text-xs text-ink-muted transition-colors duration-200 group-hover:bg-white">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={c.href}
                    className="focus-carbon inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {c.linkLabel}
                    <ArrowRight className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
