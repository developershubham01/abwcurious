"use client";

import { Eyebrow, Reveal } from "./primitives";
import { VISION_MISSION_SECTION, VISION, MISSION } from "@/data/site-content";

/* ------------------------ 07 — Vision & mission ---------------------------- */

export function VisionMission() {
  return (
    <section
      id="vision"
      aria-label="Our vision and mission"
      className="relative scroll-mt-24 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow tone="muted">{VISION_MISSION_SECTION.eyebrow}</Eyebrow>
        </Reveal>

        {/* two-panel hairline gap-px grid */}
        <div className="mt-10 grid gap-px border border-hairline bg-hairline lg:grid-cols-2">
          <Reveal>
            <div className="h-full bg-white p-8 lg:p-12">
              <p className="text-sm font-medium text-primary">{VISION.eyebrow}</p>
              <h3 className="mt-4 text-balance text-2xl font-light leading-snug text-ink sm:text-3xl">
                {VISION.title}
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">
                {VISION.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Carbon 4px blue highlight left-border on the mission panel */}
            <div className="h-full border-l-4 border-l-primary bg-white p-8 lg:p-12">
              <p className="text-sm font-medium text-primary">{MISSION.eyebrow}</p>
              <h3 className="mt-4 text-balance text-2xl font-light leading-snug text-ink sm:text-3xl">
                {MISSION.title}
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">
                {MISSION.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
