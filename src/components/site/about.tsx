"use client";

import { CheckCircle2, Award, Users, Zap } from "lucide-react";
import WebThreads from "@/components/reactbits/WebThreads";
import { Eyebrow, Reveal, CountUp } from "./primitives";

const PILLARS = [
  {
    icon: Zap,
    title: "Ship fast, ship right",
    desc: "Weekly demos, tight feedback loops and production discipline from day one.",
  },
  {
    icon: BrainCircuitIcon,
    title: "AI-native engineering",
    desc: "We build with the same tools we deliver — our own pipeline runs on automation.",
  },
  {
    icon: Users,
    title: "Senior, accountable team",
    desc: "No hand-offs to juniors. The people who scope your system build it.",
  },
  {
    icon: Award,
    title: "Quality as a habit",
    desc: "Typed codebases, automated tests, observable deployments — by default.",
  },
];

// small alias so the array above stays tidy
function BrainCircuitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-y border-hairline">
      {/* WebThreads glow behind content */}
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <WebThreads
          color1="#0f62fe"
          color2="#1192e8"
          color3="#a6c8ff"
          speed={0.16}
          threadCount={5}
          frequency={3.2}
          spread={0.16}
          thickness={1.35}
          glow={0.02}
          brightness={0.55}
          opacity={0.85}
          mouseInteraction
          mouseStrength={0.25}
          grain
          grainIntensity={0.04}
          position={0.62}
          backgroundColor="#ffffff"
          lightMode
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 30%, transparent 62%, #ffffff 100%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32 lg:border-x lg:border-hairline">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow className="justify-start">03 / The studio</Eyebrow>
              <h2 className="mt-5 text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                A studio built on one trait:{" "}
                <span className="text-ibm-bright">curiosity.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                ABWcurious began with a simple question — what would software feel like if every
                detail was questioned, tested and improved? That question became our name and our
                method. Today we partner with founders and enterprises to build AI-driven products
                that are fast, honest and quietly brilliant.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-8 space-y-3.5">
                {[
                  "End-to-end delivery — strategy, design, engineering, launch",
                  "Transparent pricing and weekly progress demos",
                  "AI-first workflows that cut build times, not corners",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-foreground/90">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-px border border-hairline bg-hairline">
                {[
                  { value: 24, suffix: "h", label: "Response time" },
                  { value: 40, suffix: "+", label: "AI models shipped" },
                  { value: 12, suffix: "", label: "Industries served" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background/85 px-4 py-5 backdrop-blur-sm">
                    <div className="font-mono text-2xl text-ibm-bright">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.08} className="h-full">
                  <div className="h-full bg-background/85 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-ibm-blue/[0.05]">
                    <pillar.icon className="size-7 text-ibm-bright" strokeWidth={1.25} aria-hidden="true" />
                    <h3 className="mt-5 text-lg tracking-tight">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <figure className="mt-6 border border-hairline bg-background/85 p-7 backdrop-blur-sm">
                <blockquote className="text-lg font-light leading-relaxed text-foreground/90">
                  “Curiosity is not a value on a wall. It is the habit of asking why the second
                  time — and the discipline of answering it in code.”
                </blockquote>
                <figcaption className="mt-4 font-mono text-sm text-muted-foreground">
                  — Founding team, <span className="text-ibm-soft">ABWcurious</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
