"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import DitherVeil from "@/components/reactbits/DitherVeil";
import { CountUp, RollButton } from "./primitives";

const STATS = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 80, suffix: "+", label: "Happy clients" },
  { value: 97, suffix: "%", label: "Client satisfaction" },
  { value: 8, suffix: "+", label: "Years of craft" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop: blueprint grid + blue glow */}
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 72% 38%, rgba(15,98,254,0.09), transparent 65%), radial-gradient(ellipse 45% 40% at 12% 82%, rgba(17,146,232,0.05), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-16 lg:pt-20 lg:pb-24 lg:border-x lg:border-hairline">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2.5 border border-hairline-strong bg-ibm-blue/[0.04] px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-ibm-bright animate-pulse-dot" aria-hidden="true" />
                AI SOFTWARE DEVELOPMENT STUDIO
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.12)}
              className="mt-7 text-[2.6rem] leading-[1.08] font-light tracking-tight sm:text-6xl lg:text-[4.5rem] text-balance"
            >
              Curious minds.{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-ibm-bright via-ibm-soft to-ibm-cyan">
                  Intelligent
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-ibm-blue to-transparent"
                  aria-hidden="true"
                />
              </span>{" "}
              software.
            </motion.h1>

            <motion.p
              {...fadeUp(0.24)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              ABWcurious designs and engineers AI software, intelligent AI solutions, high-performance
              websites and memorable digital products — for businesses that refuse to stand still.
            </motion.p>

            <motion.div {...fadeUp(0.36)} className="mt-9 flex flex-wrap items-center gap-4">
              <RollButton href="#contact" variant="primary" arrow>
                Start a Project
              </RollButton>
              <RollButton href="#services" variant="outline">
                Explore Services
              </RollButton>
            </motion.div>

            {/* Stats */}
            <motion.dl
              {...fadeUp(0.48)}
              className="mt-12 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-background px-5 py-5">
                  <dd className="font-mono text-3xl text-ibm-bright">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* DitherVeil visual */}
          <motion.div
            {...fadeUp(0.3)}
            className="lg:col-span-5"
          >
            <div className="relative border border-hairline-strong bg-card">
              {/* corner ticks */}
              <span className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-ibm-bright" aria-hidden="true" />
              <span className="absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-ibm-bright" aria-hidden="true" />
              <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-ibm-bright" aria-hidden="true" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-ibm-bright" aria-hidden="true" />

              <div className="relative h-[380px] sm:h-[440px] lg:h-[500px]">
                <DitherVeil
                  src="/images/hero-neural.jpg"
                  fit="cover"
                  pattern="floyd"
                  pixelSize={3}
                  inkColor="#001141"
                  paperColor="#ffffff"
                  rimColor="#0f62fe"
                  rim={0.22}
                  revealRadius={190}
                  softness={0.65}
                  linger={1.2}
                  contrast={1.2}
                />
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className="absolute inset-0 border border-ink/5" />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-hairline px-4 py-3 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MousePointer2 className="size-3.5 text-ibm-bright" strokeWidth={1.5} />
                  Move cursor to reveal — click for a burst
                </span>
                <span className="hidden sm:inline text-ibm-soft">FIG. 01 / NEURAL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
