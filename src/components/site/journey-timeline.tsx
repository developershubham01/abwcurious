"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Rocket, Flag, Trophy, Globe2, type LucideIcon } from "lucide-react";
import { Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { TIMELINE, SAMPLE_NOTE, type MilestoneKind } from "@/data/company";
import { cn } from "@/lib/utils";

const KIND_META: Record<MilestoneKind, { icon: LucideIcon; label: string; dot: string; chip: string }> = {
  founding: {
    icon: Rocket,
    label: "Founded",
    dot: "border-ibm-blue",
    chip: "bg-ibm-blue text-white",
  },
  milestone: {
    icon: Flag,
    label: "Milestone",
    dot: "border-ibm-cyan",
    chip: "bg-ibm-cyan text-white",
  },
  achievement: {
    icon: Trophy,
    label: "Achievement",
    dot: "border-[#8a3ffc]",
    chip: "bg-[#8a3ffc] text-white",
  },
  expansion: {
    icon: Globe2,
    label: "Expansion",
    dot: "border-ibm-success",
    chip: "bg-ibm-success text-white",
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
            <p className="justify-center font-mono text-xs uppercase tracking-[0.22em] text-ibm-soft">
              03 — Our Journey
            </p>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            <SplitText text="Milestones that" />{" "}
            <SplitText text="made us." delay={0.15} wordClassName="text-gradient font-normal" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/60 sm:text-lg">
              From a two-person idea to a studio with its own products — the moments that shaped
              ABWcurious, revealed as you scroll.
            </p>
          </Reveal>
        </div>

        {/* timeline */}
        <div ref={trackRef} className="relative mx-auto mt-16 max-w-4xl">
          {/* rail */}
          <div
            className="absolute bottom-0 left-[13px] top-0 w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* scroll fill */}
          <motion.div
            style={reduced ? { scaleY: 1 } : { scaleY: fill }}
            className="absolute bottom-0 left-[13px] top-0 w-px origin-top bg-gradient-to-b from-ibm-blue via-ibm-cyan to-[#8a3ffc] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-14">
            {TIMELINE.map((item, i) => {
              const meta = KIND_META[item.kind];
              const Icon = meta.icon;
              const leftSide = i % 2 === 0;
              return (
                <li key={`${item.year}-${item.title}`} className="relative">
                  {/* node */}
                  <span
                    className={cn(
                      "absolute left-[13px] top-6 z-10 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.9)] md:left-1/2",
                      meta.dot
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="size-3 text-ibm-blue-active" strokeWidth={2} />
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
                      <article
                        className={cn(
                          "group relative rounded-2xl border border-ink/[0.07] bg-white/85 p-6 shadow-[0_10px_36px_-18px_rgba(15,98,254,0.3)] backdrop-blur transition-all duration-300",
                          "hover:-translate-y-1 hover:shadow-[0_24px_54px_-22px_rgba(15,98,254,0.45)]"
                        )}
                      >
                        <div
                          className={cn(
                            "flex flex-wrap items-center gap-3",
                            leftSide && "md:flex-row-reverse"
                          )}
                        >
                          <span className="font-mono text-2xl font-light tracking-tight text-ibm-bright">
                            {item.year}
                          </span>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]",
                              meta.chip
                            )}
                          >
                            <Icon className="size-3" strokeWidth={2} aria-hidden="true" />
                            {meta.label}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-medium tracking-tight text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
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
          <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">
            {SAMPLE_NOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
