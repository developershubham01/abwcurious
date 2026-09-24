"use client";

import { Eyebrow, Reveal, SectionFrame } from "./primitives";

const GROUPS: { label: string; items: string[] }[] = [
  {
    label: "Web & Product",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Python", "FastAPI", "GraphQL", "REST & Webhooks"],
  },
  {
    label: "AI & Machine Learning",
    items: ["OpenAI GPT", "Claude", "LangChain", "Vector Search", "PyTorch"],
  },
  {
    label: "Data & Cloud",
    items: ["PostgreSQL", "SQLite", "pgvector", "Docker", "AWS & Vercel"],
  },
];

export function TechStack() {
  return (
    <SectionFrame id="stack">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">04 / Stack</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Boring where it counts.{" "}
                <span className="text-ibm-bright">Cutting-edge where it pays.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              We pick proven, typed, well-supported technology — so your product stays fast to
              change and cheap to maintain.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.08} className="h-full">
              <div className="group h-full bg-card p-7 transition-colors duration-300 hover:bg-white/[0.04]">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ibm-soft">
                    {group.label}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    0{gi + 1}
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default border border-hairline bg-white/[0.03] px-3 py-1.5 font-mono text-[13px] text-foreground/80 transition-all duration-300 hover:border-ibm-bright/70 hover:bg-ibm-blue/10 hover:text-ibm-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-xs text-muted-foreground/70">
            {"// and whatever your project genuinely needs — we adopt, we never force."}
          </p>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
