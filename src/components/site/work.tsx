"use client";

import DriftWall from "@/components/reactbits/DriftWall";
import { Eyebrow, Reveal } from "./primitives";

const PROJECTS = [
  { image: "/images/work-crm.jpg", title: "NexaCRM — Sales intelligence platform" },
  { image: "/images/work-chatbot.jpg", title: "Askor — Multilingual AI chatbot" },
  { image: "/images/work-web.jpg", title: "Orbitly — Marketing website & CMS" },
  { image: "/images/work-erp.jpg", title: "FleetIQ — ERP for logistics" },
  { image: "/images/work-design.jpg", title: "Pulse — Design system & brand" },
  { image: "/images/work-mobile.jpg", title: "MediTrack — Patient mobile app" },
];

export function Work() {
  return (
    <section id="work" className="relative overflow-hidden border-y border-hairline">
      <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:pt-24 lg:border-x lg:border-hairline">
        <Reveal>
          <div className="flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">05 / Selected work</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Products we have <span className="text-ibm-bright">shipped with pride.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              A drifting wall of recent releases. Hover a tile to lift it out of the stack — every
              project behind it shipped to production.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative h-[440px] sm:h-[520px]">
        <DriftWall
          items={PROJECTS}
          columns={6}
          tileWidth={210}
          tileHeight={140}
          gap={16}
          radius={0}
          tilt={14}
          turn={-12}
          perspective={1300}
          depth={110}
          speed={38}
          direction="up"
          variance={0.5}
          parallax={0.55}
          lift={70}
          fade={0.65}
          dim={0.66}
          overlayColor="#060609"
          grayscale
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, transparent, #060609)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-14 lg:border-x lg:border-hairline">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 border border-hairline bg-card px-6 py-5 sm:flex-row sm:items-center">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-ibm-bright">120+</span> projects shipped ·{" "}
              <span className="text-ibm-bright">12</span> industries ·{" "}
              <span className="text-ibm-bright">4</span> continents
            </p>
            <a
              href="#contact"
              className="font-mono text-sm text-ibm-soft underline-offset-4 hover:underline focus-carbon"
            >
              Request the full case-study deck →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
