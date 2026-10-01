"use client";

import LogoLoop, { LogoItem } from "@/components/reactbits/LogoLoop";
import { Cpu, ShieldCheck, Database, Cloud, Code2, Sparkles, Layers, Box, Terminal, Globe } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";

const TECH_PARTNER_LOGOS: LogoItem[] = [
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Code2 className="size-4 text-primary" />
        <span>Next.js / React</span>
      </div>
    ),
    title: "Next.js & React",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Sparkles className="size-4 text-violet-600" />
        <span>Generative AI & Python</span>
      </div>
    ),
    title: "Generative AI & Python",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Cloud className="size-4 text-sky-600" />
        <span>AWS & Cloud Native</span>
      </div>
    ),
    title: "AWS Cloud Native",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <ShieldCheck className="size-4 text-emerald-600" />
        <span>PCI-DSS & HIPAA Security</span>
      </div>
    ),
    title: "PCI-DSS & HIPAA Security",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Database className="size-4 text-indigo-600" />
        <span>PostgreSQL & Supabase</span>
      </div>
    ),
    title: "PostgreSQL & Supabase",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Box className="size-4 text-amber-600" />
        <span>Three.js 3D & WebGL</span>
      </div>
    ),
    title: "Three.js 3D & WebGL",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Cpu className="size-4 text-rose-600" />
        <span>Industrial IoT & MQTT</span>
      </div>
    ),
    title: "Industrial IoT & MQTT",
  },
  {
    node: (
      <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono font-medium text-ink shadow-sm">
        <Layers className="size-4 text-cyan-600" />
        <span>TypeScript & Node.js</span>
      </div>
    ),
    title: "TypeScript & Node.js",
  },
];

export function TechLogoLoopSection() {
  return (
    <section aria-label="Technologies we use to build your products" className="border-b border-hairline bg-ibm-layer py-12">
      <div className="mx-auto max-w-7xl px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Eyebrow tone="blue" className="justify-start">
            Technologies We Build With
          </Eyebrow>
          <h2 className="mt-2 text-2xl font-light text-ink sm:text-3xl">
            We develop your products with world-class, battle-tested technologies.
          </h2>
        </div>
        <p className="font-mono text-xs text-ibm-subtle max-w-sm">
          High-performance stacks, cloud infrastructure, AI models, and secure enterprise frameworks.
        </p>
      </div>

      <div className="relative overflow-hidden py-2">
        <LogoLoop
          logos={TECH_PARTNER_LOGOS}
          speed={60}
          direction="left"
          logoHeight={36}
          gap={24}
          fadeOut
          fadeOutColor="#f4f4f4"
          scaleOnHover
          ariaLabel="Technologies and stacks"
        />
      </div>
    </section>
  );
}
