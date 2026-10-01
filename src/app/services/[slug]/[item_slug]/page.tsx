import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  FileCheck2,
  HelpCircle,
  Layers,
  Rocket,
  ShieldCheck,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_BY_SLUG,
  getPracticeTechStack,
  getServiceItemBySlug,
  getSiblingServices,
  slugify,
} from "@/lib/catalog";
import { Eyebrow, RollButton } from "@/components/site/primitives";

export async function generateStaticParams() {
  const params: { slug: string; item_slug: string }[] = [];
  for (const cat of CATEGORIES) {
    for (const group of cat.groups) {
      for (const item of group.items) {
        params.push({ slug: cat.slug, item_slug: slugify(item.name) });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; item_slug: string }>;
}): Promise<Metadata> {
  const { slug, item_slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) return {};

  const serviceItem = getServiceItemBySlug(category, item_slug);
  if (!serviceItem) return {};

  return {
    title: `${serviceItem.name} — ${category.name} | ABWcurious`,
    description: `${serviceItem.blurb} Expert ${serviceItem.name.toLowerCase()} services engineered with high performance, strict SLAs, and full IP ownership.`,
    openGraph: {
      title: `${serviceItem.name} — ABWcurious Practice`,
      description: serviceItem.blurb,
    },
  };
}

const DELIVERABLES = [
  {
    icon: Code2,
    title: "Production-Grade Codebase",
    desc: "Clean, type-safe, and modular architecture adhering to strict engineering standards and automated testing suites.",
  },
  {
    icon: Workflow,
    title: "System Architecture & Design",
    desc: "Comprehensive technical blueprints, data schemas, API specifications, and interactive wireframes ready for scale.",
  },
  {
    icon: Rocket,
    title: "CI/CD & Cloud Deployment",
    desc: "Automated pipelines, staging environments, infrastructure-as-code, and zero-downtime production rollouts.",
  },
  {
    icon: ShieldCheck,
    title: "Security & QA Hardening",
    desc: "Multi-layered automated test runs, dependency security scans, performance benchmarks, and compliance verifications.",
  },
  {
    icon: FileCheck2,
    title: "Documentation & Runbooks",
    desc: "Exhaustive API documentation, architecture decision records (ADRs), deployment runbooks, and handover sessions.",
  },
  {
    icon: Zap,
    title: "30-Day Hypercare Support",
    desc: "Dedicated warranty window with high-priority triage, telemetry monitoring, and performance fine-tuning.",
  },
];

const LIFECYCLE_STEPS = [
  {
    num: "01",
    phase: "Discovery & Scope",
    duration: "Week 1",
    desc: "Requirements extraction, stakeholder interviews, technical feasibility analysis, and milestone scoping.",
  },
  {
    num: "02",
    phase: "Architecture & Prototype",
    duration: "Weeks 2–3",
    desc: "Data models, API contracts, interactive UI/UX prototypes, and foundation setup with CI/CD wired from day one.",
  },
  {
    num: "03",
    phase: "Agile Build & Weekly Demos",
    duration: "Weeks 4–8",
    desc: "Iterative two-week sprints with staging releases and weekly live demonstrations for complete visibility.",
  },
  {
    num: "04",
    phase: "Testing & Security Audit",
    duration: "Week 9",
    desc: "End-to-end automated testing, load benchmarks, cross-platform validation, and vulnerability mitigation.",
  },
  {
    num: "05",
    phase: "Launch & Operational Care",
    duration: "Ongoing",
    desc: "Zero-downtime production cutover, telemetry dashboards, SLA monitoring, and scheduled maintenance windows.",
  },
];

const FAQS = [
  {
    q: "How fast can an engagement kick off?",
    a: "We assemble and assign dedicated squads within 3 to 5 business days after scope finalization, with discovery starting in week one.",
  },
  {
    q: "Who owns the intellectual property and code?",
    a: "You retain 100% ownership of all source code, design assets, and intellectual property developed during the engagement from day one.",
  },
  {
    q: "How is progress communicated during the build?",
    a: "You have a dedicated solutions architect, shared Slack or Teams channels, weekly live demo sessions, and real-time sprint boards.",
  },
  {
    q: "What post-launch support is included?",
    a: "Every deliverable includes a 30-day hypercare warranty with bug resolution, plus flexible monthly SLA care plans for continuous evolution.",
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; item_slug: string }>;
}) {
  const { slug, item_slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  const serviceItem = getServiceItemBySlug(category, item_slug);
  if (!serviceItem) notFound();

  const techStack = getPracticeTechStack(category.slug);
  const { prev, next, related } = getSiblingServices(category, item_slug);

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none pt-16 sm:pt-20 lg:pt-24 bg-background">
      {/* Hero Section */}
      <section className="border-b border-hairline py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {category.num} / {category.short} Practice
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {serviceItem.name}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {serviceItem.blurb} Built with strict architectural rigor, dedicated engineering squads, and continuous quality assurance.
          </p>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-3 py-1.5 font-mono text-xs text-ink">
              <CheckCircle2 className="size-3.5 text-ibm-bright" />
              Dedicated Squad &amp; Tech Lead
            </span>
            <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-3 py-1.5 font-mono text-xs text-ink">
              <CheckCircle2 className="size-3.5 text-ibm-bright" />
              100% IP &amp; Code Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-3 py-1.5 font-mono text-xs text-ink">
              <CheckCircle2 className="size-3.5 text-ibm-bright" />
              Direct Slack / Teams Sync
            </span>
            <span className="inline-flex items-center gap-1.5 border border-hairline bg-ibm-layer px-3 py-1.5 font-mono text-xs text-ink">
              <CheckCircle2 className="size-3.5 text-ibm-bright" />
              SLA-backed Hypercare
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <RollButton href={`/contact?service=${encodeURIComponent(serviceItem.name)}`} variant="primary" arrow>
              Start this project
            </RollButton>
            <Link
              href={`/services/${category.slug}`}
              className="inline-flex items-center gap-2 border border-hairline bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ibm-layer hover:border-primary/40 focus-carbon"
            >
              <ArrowLeft className="size-4" />
              All {category.short} services
            </Link>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="border-b border-hairline bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow className="justify-start">Deliverables &amp; Output</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              What you receive with {serviceItem.name}.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Every deliverable is enterprise-ready, fully documented, and handed over with no proprietary lock-in.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((del) => (
              <div key={del.title} className="bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex size-10 items-center justify-center border border-hairline bg-ibm-layer text-primary mb-5">
                    <del.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-medium text-ink mb-2">{del.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{del.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tooling & Technology Stack */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Eyebrow className="justify-start">Tooling &amp; Frameworks</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Modern stacks for high velocity.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              We leverage production-hardened tools and current LTS releases for stability and maintainability.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs font-mono text-ink shadow-2xs"
              >
                <Cpu className="size-3.5 text-primary" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Lifecycle / Process */}
      <section className="border-b border-hairline bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow className="justify-start">Execution Framework</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Five steps from requirements to production.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Predictable timelines, transparent sprint cadences, and continuous staging verification.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {LIFECYCLE_STEPS.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col justify-between border border-hairline bg-ibm-layer p-6 transition-all hover:border-primary/60"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="text-xl font-light text-primary">{step.num}</span>
                    <span className="border border-hairline bg-white px-2 py-0.5 text-[11px] text-ink">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-medium text-ink">{step.phase}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ABWcurious Metrics */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <div className="flex-1">
            <Eyebrow className="justify-start">Accountability &amp; Standards</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
              Why partner with ABWcurious?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We operate as an extension of your product organization. You work directly with technical architects and engineers, with zero account-manager layers or communication roadblocks.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-ink"><strong className="font-semibold">Direct Engineering Access:</strong> Daily syncs and direct comms with the team writing your code.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-ink"><strong className="font-semibold">Transparent Milestones:</strong> Deliverables approved and tested in staging before milestone billing.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-ink"><strong className="font-semibold">Zero Vendor Lock-in:</strong> Clean repository setup, standard Docker configs, and full cloud portability.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full grid sm:grid-cols-2 gap-4">
            {category.stats.map((stat, idx) => (
              <div key={idx} className="p-6 bg-white border border-hairline shadow-2xs">
                <div className="text-3xl font-light text-primary mb-1">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
            <div className="p-6 bg-white border border-hairline shadow-2xs">
              <div className="text-3xl font-light text-primary mb-1">100%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">IP &amp; Code Ownership</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-hairline bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow className="justify-start">Answers</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
              Frequently asked questions.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-hairline bg-ibm-layer p-6">
                <div className="flex items-center gap-2 text-primary font-medium text-sm mb-2">
                  <HelpCircle className="size-4" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sibling Navigator: Previous / Next sub-service */}
      <nav aria-label="Sibling service pagination" className="border-b border-hairline bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-hairline">
          <Link
            href={`/services/${category.slug}/${prev.slug}`}
            className="group flex flex-col items-start gap-1.5 px-6 py-8 text-left transition-colors hover:bg-ibm-layer focus-carbon"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1 text-primary" />
              Previous in {category.short}
            </span>
            <span className="text-base font-medium text-ink group-hover:text-primary transition-colors">
              {prev.name}
            </span>
          </Link>

          <Link
            href={`/services/${category.slug}/${next.slug}`}
            className="group flex flex-col items-end gap-1.5 px-6 py-8 text-right transition-colors hover:bg-ibm-layer focus-carbon"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              Next in {category.short}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 text-primary" />
            </span>
            <span className="text-base font-medium text-ink group-hover:text-primary transition-colors">
              {next.name}
            </span>
          </Link>
        </div>
      </nav>

      {/* Related Services in Practice */}
      {related.length > 0 && (
        <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Eyebrow className="justify-start">Explore More</Eyebrow>
                <h2 className="mt-2 text-2xl font-light tracking-tight text-ink">
                  Related services in {category.name}
                </h2>
              </div>
              <Link
                href={`/services/${category.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
              >
                <span>View practice overview</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${category.slug}/${rel.slug}`}
                  className="group relative flex flex-col justify-between bg-white p-6 transition-colors hover:bg-ibm-layer"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-medium text-ink transition-colors group-hover:text-primary">
                        {rel.name}
                      </h3>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rel.blurb}</p>
                  </div>
                  <div className="mt-4 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read playbook →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="bg-ibm-blue py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/70">
              {category.short} Practice · Engineering Engagement
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-light tracking-tight sm:text-4xl">
              Ready to build your {serviceItem.name}?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Tell us the outcome you need. You&apos;ll get a scoped technical plan, milestone timeline, and a senior engineering lead on the first call.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <RollButton href={`/contact?service=${encodeURIComponent(serviceItem.name)}`} variant="light" arrow>
              Start a project
            </RollButton>
            <RollButton href="/services" variant="outline-light">
              All services
            </RollButton>
          </div>
        </div>
      </section>
    </main>
  );
}
