"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BriefcaseBusiness,
  MapPin,
  Clock3,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Laptop,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  HelpCircle,
  Code2,
  Layers,
  Send,
} from "lucide-react";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { useInquiryStore } from "@/lib/store";
import { openContact } from "@/lib/view-route";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  title: string;
  dept: "Engineering" | "Design" | "AI & Cloud" | "Quality";
  type: string;
  location: string;
  experience: string;
  blurb: string;
  duties: string[];
  brings: string[];
  tech: string[];
}

const EXPANDED_ROLES: Role[] = [
  {
    id: "ai-engineer",
    title: "Senior AI & LLM Systems Engineer",
    dept: "AI & Cloud",
    type: "Full-time",
    location: "Nerul, Navi Mumbai · Hybrid / Remote",
    experience: "4+ years",
    blurb:
      "Own production AI systems end-to-end — from eval pipelines and retrieval architectures (RAG) to the guardrails, fallbacks, and cost controls that keep them performant at scale.",
    duties: [
      "Architect and ship production RAG systems, function-calling agents, and structured data extractors.",
      "Build rigorous evaluation suites, tracing observability, and latency benchmarking.",
      "Collaborate directly with client engineering teams to integrate AI seamlessly into existing stacks.",
      "Stay ahead of emergent foundation models, local weight quantization, and vector embeddings.",
    ],
    brings: [
      "4+ years shipping resilient backend systems in Python, Go, or TypeScript.",
      "Direct experience deploying LLMs in production with real user traffic.",
      "Deep understanding of embedding spaces, chunking strategies, and vector indexing.",
      "Clear, empathetic communication and a love for mentoring teammates.",
    ],
    tech: ["Python", "TypeScript", "LangChain / LlamaIndex", "pgvector", "FastAPI", "OpenAI / Anthropic"],
  },
  {
    id: "fullstack-lead",
    title: "Lead Full-Stack Engineer (Next.js & TypeScript)",
    dept: "Engineering",
    type: "Full-time",
    location: "Nerul, Navi Mumbai · Remote Friendly",
    experience: "5+ years",
    blurb:
      "Drive architecture and delivery across modern web apps, SaaS platforms, and client flagship sites. Lead by example with type safety, clean component boundaries, and sub-second performance.",
    duties: [
      "Lead architecture and technical execution across Next.js, React 19, and TypeScript projects.",
      "Ensure immaculate Core Web Vitals, server components best practices, and zero-layout-shift UI.",
      "Conduct code reviews, mentor junior and mid-level developers, and refine developer tooling.",
      "Work closely with product designers to implement pixel-perfect micro-interactions and animations.",
    ],
    brings: [
      "Proven track record building and scaling production Next.js applications.",
      "Expertise with relational databases (PostgreSQL / Prisma) and serverless / edge runtime patterns.",
      "Deep care for accessibility (a11y), responsive design, and defensive programming.",
      "Strong async communication skills in a distributed-first team.",
    ],
    tech: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Prisma / Postgres", "Node.js"],
  },
  {
    id: "product-designer",
    title: "Senior Product Designer (UI/UX & Systems)",
    dept: "Design",
    type: "Full-time",
    location: "Remote · IST ±3",
    experience: "3+ years",
    blurb:
      "Run discovery workshops, translate ambiguous problem spaces into elegant user journeys, and expand our Carbon-derived design system across web, mobile, and enterprise platforms.",
    duties: [
      "Lead user research and turn complex workflows into intuitive, high-converting interfaces.",
      "Maintain and evolve our shared design system with design tokens, reusable components, and documentation.",
      "Prototype rich micro-animations, gestures, and interactive states in Figma and motion tools.",
      "Partner seamlessly with frontend engineers during sprints to ensure high-fidelity implementation.",
    ],
    brings: [
      "A rich portfolio of shipped digital products and systems (live links preferred).",
      "Mastery of Figma, auto-layout, component variants, and tokenized design systems.",
      "Basic understanding of HTML/CSS/React mental models to collaborate smoothly with devs.",
      "Strong storytelling and presentation skills to defend design rationale to stakeholders.",
    ],
    tech: ["Figma", "Design Tokens", "Motion Prototyping", "Design Systems", "User Testing"],
  },
  {
    id: "devops-cloud",
    title: "Cloud & DevOps Infrastructure Specialist",
    dept: "AI & Cloud",
    type: "Full-time",
    location: "Remote / Hybrid",
    experience: "3+ years",
    blurb:
      "Design resilient multi-cloud architectures, CI/CD pipelines, containerization, and monitoring infrastructure ensuring high availability and zero-downtime releases.",
    duties: [
      "Manage cloud infrastructure on AWS and Vercel with Infrastructure as Code (Terraform).",
      "Build automated GitHub Actions CI/CD pipelines with integrated security scanning and testing.",
      "Implement observability (OpenTelemetry, Datadog/Grafana) and incident response automation.",
      "Enforce compliance, zero-trust security postures, and cost optimization across cloud resources.",
    ],
    brings: [
      "Experience deploying containerized services with Docker and Kubernetes.",
      "Strong automation scripting in Bash, Python, or TypeScript.",
      "Deep knowledge of DNS, CDN edge routing, SSL/TLS, and modern networking.",
    ],
    tech: ["AWS", "Docker", "Terraform", "GitHub Actions", "Kubernetes", "Datadog / Prometheus"],
  },
  {
    id: "mobile-engineer",
    title: "Mobile App Engineer (React Native / Flutter)",
    dept: "Engineering",
    type: "Full-time",
    location: "Nerul, Navi Mumbai · Hybrid",
    experience: "3+ years",
    blurb:
      "Build cross-platform iOS and Android applications with 60fps animations, robust offline sync, native module bridges, and seamless store deployment pipelines.",
    duties: [
      "Develop cross-platform apps with React Native or Flutter adhering to platform design guidelines.",
      "Build offline-first data synchronization, push notifications, and background location services.",
      "Optimize bundle size, startup times, memory consumption, and frame rendering rates.",
      "Manage App Store and Google Play releases, test flights, and compliance checklists.",
    ],
    brings: [
      "Multiple shipped apps published on the App Store and Google Play.",
      "Solid knowledge of native iOS (Swift) or Android (Kotlin) bridge integration.",
      "Experience with mobile state management, SQLite/WatermelonDB, and biometric authentication.",
    ],
    tech: ["React Native", "Flutter", "TypeScript", "iOS / Android Native", "Fastlane", "GraphQL / REST"],
  },
  {
    id: "qa-automation",
    title: "Quality Assurance & Test Automation Lead",
    dept: "Quality",
    type: "Full-time",
    location: "Nerul, Navi Mumbai · Hybrid",
    experience: "3+ years",
    blurb:
      "Establish test automation frameworks across end-to-end, API, and visual regression suites, ensuring that every release meets enterprise reliability standards.",
    duties: [
      "Architect and maintain end-to-end test suites using Playwright or Cypress.",
      "Perform automated API testing, load testing with k6, and security vulnerability scans.",
      "Integrate automated test runs into CI/CD pipelines with failure alert webhooks.",
      "Collaborate with developers to establish unit and integration test coverage thresholds.",
    ],
    brings: [
      "Deep hands-on experience with Playwright or Cypress in JavaScript/TypeScript.",
      "Strong understanding of web standards, HTTP semantics, and network request mocking.",
      "Passion for catching subtle regressions and edge cases before they reach production.",
    ],
    tech: ["Playwright", "TypeScript", "k6", "Postman / Newman", "Jest", "CI/CD Integration"],
  },
];

const PERKS = [
  {
    icon: Laptop,
    title: "Hardware of Your Choice",
    desc: "Top-tier MacBook Pro or Linux workstation, 4K displays, and premium peripherals refreshed regularly.",
  },
  {
    icon: GraduationCap,
    title: "Annual Learning Stipend",
    desc: "Dedicated budget for tech conferences, advanced certifications, books, and courses. Curiosity is the job.",
  },
  {
    icon: Clock3,
    title: "Flexible & Outcome Driven",
    desc: "No rigid punch-clocks. We measure what you ship, the quality of your code, and the impact you deliver.",
  },
  {
    icon: HeartHandshake,
    title: "Comprehensive Healthcare",
    desc: "Medical coverage for you and your dependents with wellness stipends and mental health support.",
  },
  {
    icon: Code2,
    title: "Open Source Days",
    desc: "Time dedicated to contributing back to open-source libraries, tooling, and technical research papers.",
  },
  {
    icon: Sparkles,
    title: "Direct Client Ownership",
    desc: "No game of telephone. You talk directly with founders and stakeholders, and your work ships with your name.",
  },
];

const STAGES = [
  {
    step: "01",
    title: "Application Review",
    time: "3-5 business days",
    desc: "We review your work, code samples, portfolio, or GitHub profile. No automated resume screeners — a senior engineer reads every application.",
  },
  {
    step: "02",
    title: "Discovery Call",
    time: "30 minutes",
    desc: "An informal conversation with a practice lead to discuss your background, what kind of challenges excite you, and what life at ABWcurious looks like.",
  },
  {
    step: "03",
    title: "Technical Pairing",
    time: "60-90 minutes",
    desc: "We work through a real-world engineering or design problem together. No trivia questions or inverted binary trees — just practical problem-solving.",
  },
  {
    step: "04",
    title: "Offer & Welcome",
    time: "Within 48 hours",
    desc: "We present a transparent offer with competitive salary, perks, and start dates, and prepare your onboarding machine and team welcome.",
  },
];

const FAQS = [
  {
    q: "Where is the team located?",
    a: "Our anchor studio is in Nerul, Navi Mumbai, Maharashtra, India. We support hybrid and remote setups within Indian Standard Time (IST ±3 hours).",
  },
  {
    q: "Do you hire junior engineers or interns?",
    a: "Yes! While many of our advertised roles look for senior experience, we frequently take on hungry, self-taught developers and design interns who demonstrate high curiosity and strong fundamentals.",
  },
  {
    q: "What is the typical interview turnaround time?",
    a: "We move fast. From initial application to final offer, the process typically takes between 7 to 14 days.",
  },
  {
    q: "Can I apply if my specific role isn't listed?",
    a: "Absolutely. We are always interested in meeting exceptional builders. Send us your portfolio or GitHub via our general inquiry form.",
  },
];

export function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const setPresetRole = useInquiryStore((s) => s.setPresetRole);

  const filteredRoles =
    selectedDept === "All"
      ? EXPANDED_ROLES
      : EXPANDED_ROLES.filter((r) => r.dept === selectedDept);

  function handleApply(roleTitle: string) {
    setPresetRole(roleTitle);
    openContact();
  }

  return (
    <div className="bg-background">
      {/* ================= Hero Section ================= */}
      <section className="relative overflow-hidden border-b border-hairline bg-[#04101f] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 30%, rgba(95,208,225,0.22), transparent 70%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-medium tracking-wide text-[#79dce8] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#5fd0e1] animate-pulse-dot" />
              Careers at ABWcurious · We Are Hiring
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              Build the future with{" "}
              <span className="bg-gradient-to-r from-[#79dce8] via-[#a6e5ff] to-white bg-clip-text text-transparent font-normal">
                curious minds.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              We are a team of product engineers, systems architects, and designers who sweat the craft. If you love solving tough problems and shipping clean software, your next chapter is here.
            </p>
          </Reveal>

          {/* Quick Stats */}
          <Reveal delay={0.24}>
            <div className="mt-10 grid grid-cols-2 gap-4 border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md sm:grid-cols-4 sm:gap-8">
              <div>
                <div className="text-2xl font-light text-white">{EXPANDED_ROLES.length} Open Roles</div>
                <div className="text-xs text-white/60">Reviewed weekly</div>
              </div>
              <div>
                <div className="text-2xl font-light text-[#79dce8]">Navi Mumbai · Remote</div>
                <div className="text-xs text-white/60">Flexible locations</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">4.9 / 5.0</div>
                <div className="text-xs text-white/60">Team culture score</div>
              </div>
              <div>
                <div className="text-2xl font-light text-[#79dce8]">Top 1%</div>
                <div className="text-xs text-white/60">Engineering craft</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Open Roles Section ================= */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="max-w-xl">
              <Eyebrow tone="muted">Available Opportunities</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Open positions across our practices.
              </h2>
            </div>

            {/* Department Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Engineering", "Design", "AI & Cloud", "Quality"].map((dept) => {
                const active = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={cn(
                      "focus-carbon px-3.5 py-1.5 text-xs font-medium border transition-colors",
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-hairline bg-white text-ink-muted hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion Roles List */}
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredRoles.map((role, i) => (
                <AccordionItem
                  key={role.id}
                  value={role.id}
                  className="border border-hairline bg-white transition-all hover:border-hairline-strong"
                >
                  <AccordionTrigger className="px-6 py-6 text-left hover:no-underline focus-carbon">
                    <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4 pr-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-primary font-semibold">
                            0{i + 1}
                          </span>
                          <span className="border border-hairline bg-ibm-layer px-2 py-0.5 text-[11px] font-mono text-ink-muted">
                            {role.dept}
                          </span>
                        </div>
                        <h3 className="mt-2 text-lg font-normal text-ink sm:text-xl">
                          {role.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                        <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-2.5 py-1">
                          <BriefcaseBusiness className="size-3 text-primary" />
                          {role.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-2.5 py-1">
                          <MapPin className="size-3 text-primary" />
                          {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-2.5 py-1">
                          <Clock3 className="size-3 text-primary" />
                          {role.experience}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="border-t border-hairline px-6 pt-6 pb-8">
                    <p className="text-base leading-relaxed text-ink-muted max-w-3xl">
                      {role.blurb}
                    </p>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                          What You Will Do
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {role.duties.map((duty, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-ink-muted">
                              <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                          What You Bring
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {role.brings.map((bring, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-ink-muted">
                              <CheckCircle2 className="size-4 shrink-0 text-[#24a148] mt-0.5" />
                              <span>{bring}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-8 border-t border-hairline pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-ink-muted uppercase mr-3">Tech:</span>
                        <div className="inline-flex flex-wrap gap-1.5 mt-2 sm:mt-0">
                          {role.tech.map((t) => (
                            <span key={t} className="border border-hairline bg-ibm-layer px-2 py-0.5 text-xs text-ink font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApply(role.title)}
                        className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-ibm-blue-hover focus-carbon self-start sm:self-auto"
                      >
                        Apply for this role
                        <ArrowUpRight className="size-4" />
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ================= Perks & Benefits ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Studio Benefits</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              An environment built for high craftsmanship.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              We invest in our team so they can focus on what they do best: building exceptional digital products.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="border border-hairline bg-white p-6 transition-all hover:border-hairline-strong"
                >
                  <div className="flex size-10 items-center justify-center border border-hairline bg-ibm-layer text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-ink">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Transparent Hiring Process ================= */}
      <section className="py-16 sm:py-24 border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Hiring Roadmap</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Our 4-stage transparent interview process.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              No black-box ghosting or weeks of waiting. We respect your time and provide actionable feedback at every milestone.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s) => (
              <div key={s.step} className="border border-hairline bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-hairline pb-3">
                    <span className="font-mono text-xl font-light text-primary">{s.step}</span>
                    <span className="font-mono text-[11px] text-ink-muted">{s.time}</span>
                  </div>
                  <h3 className="mt-4 text-base font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Candidate FAQ</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Frequently asked questions.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-hairline bg-white p-6">
                <h3 className="text-base font-medium text-ink flex items-start gap-2">
                  <HelpCircle className="size-4 shrink-0 text-primary mt-1" />
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* General Drop Banner */}
          <div className="mt-12 border border-hairline bg-white p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-light text-ink">Don&apos;t see your role?</h3>
              <p className="mt-1 text-sm text-ink-muted max-w-xl">
                We always make room for exceptional engineers and creative technologists. Send your resume or portfolio to {COMPANY.email}.
              </p>
            </div>
            <RollButton href={`mailto:${COMPANY.email}`} variant="primary" arrow>
              Send open application
            </RollButton>
          </div>
        </div>
      </section>
    </div>
  );
}
