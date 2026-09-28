"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Rocket, Flag, Trophy, Globe2, type LucideIcon } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { TIMELINE, SAMPLE_NOTE, type MilestoneKind } from "@/data/company";
import { cn } from "@/lib/utils";

/* Kind coding stays inside the documented Carbon ramp:
   IBM Blue (#0f62fe) / cyan-50 (#1192e8) / blue-80 (#002d9c) / semantic green (#24a148). */
const KIND_META: Record<MilestoneKind, { icon: LucideIcon; label: string; border: string; text: string }> = {
  founding: {
    icon: Rocket,
    label: "Founded",
    border: "border-ibm-blue",
    text: "text-primary",
  },
  milestone: {
    icon: Flag,
    label: "Milestone",
    border: "border-ibm-cyan",
    text: "text-ibm-cyan",
  },
  achievement: {
    icon: Trophy,
    label: "Achievement",
    border: "border-ibm-blue-active",
    text: "text-ibm-blue-active",
  },
  expansion: {
    icon: Globe2,
    label: "Expansion",
    border: "border-ibm-success",
    text: "text-ibm-success",
  },
};

export function JourneyTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.78", "end 0.45"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section
      id="achievements"
      aria-label="Our journey — milestones and achievements"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow tone="muted" className="justify-center">
              09 — Our journey
            </Eyebrow>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            <SplitText text="Milestones that" />{" "}
            <SplitText text="made us." delay={0.15} wordClassName="text-gradient" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              From a two-person idea to a studio with its own products — the moments that shaped
              ABWcurious, revealed as you scroll.
            </p>
          </Reveal>
        </div>

        {/* timeline */}
        <div ref={trackRef} className="relative mx-auto mt-16 max-w-4xl">
          {/* rail */}
          <div
            className="absolute bottom-0 left-[13px] top-0 w-px bg-hairline md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* scroll fill — solid IBM Blue progress line */}
          <motion.div
            style={reduced ? { scaleY: 1 } : { scaleY: fill }}
            className="absolute bottom-0 left-[13px] top-0 w-px origin-top bg-primary md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-14">
            {TIMELINE.map((item, i) => {
              const meta = KIND_META[item.kind];
              const Icon = meta.icon;
              const leftSide = i % 2 === 0;
              return (
                <li key={`${item.year}-${item.title}`} className="relative">
                  {/* square node */}
                  <span
                    className={cn(
                      "absolute left-[13px] top-6 z-10 flex size-7 -translate-x-1/2 items-center justify-center border-2 bg-white md:left-1/2",
                      meta.border
                    )}
                    aria-hidden="true"
                  >
                    <Icon className={cn("size-3", meta.text)} strokeWidth={2} />
                  </span>

                  <div
                    className={cn(
                      "pl-12 md:grid md:grid-cols-2 md:gap-14 md:pl-0",
                      leftSide ? "" : "md:[direction:rtl]"
                    )}
                  >
                    <Reveal
                      delay={0.08}
                      y={20}
                      className={cn(
                        "md:[direction:ltr]",
                        leftSide ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"
                      )}
                    >
                      <article className="group relative border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-ibm-layer">
                        <div
                          className={cn(
                            "flex flex-wrap items-center gap-3",
                            leftSide && "md:flex-row-reverse"
                          )}
                        >
                          <span className="text-2xl font-light tabular-nums tracking-tight text-ink">
                            {item.year}
                          </span>
                          <span className="inline-flex items-center gap-1.5 border border-hairline bg-white px-2 py-1 text-xs text-ink-muted">
                            <Icon className={cn("size-3", meta.text)} strokeWidth={2} aria-hidden="true" />
                            {meta.label}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-normal text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                      </article>
                    </Reveal>
                    <div className="hidden md:block md:[direction:ltr]" aria-hidden="true" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-center text-xs text-ibm-subtle">{SAMPLE_NOTE}</p>
        </Reveal>
      </div>
    </section>
  );
}
