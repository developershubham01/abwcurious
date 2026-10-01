import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Building2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { ALL_INDUSTRIES } from "@/lib/industries";
import { Eyebrow, RollButton } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Industries We Serve — ABWcurious | Banking, Healthcare, EdTech, Retail & More",
  description:
    "Discover how ABWcurious transforms Banking & Financial Services, Healthcare, Education, Retail, Hospitality, Manufacturing, Professional Services, and Startups with tailored AI and software engineering.",
};

export default function IndustriesPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none pt-16 sm:pt-20 lg:pt-24">
      {/* Hero */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow tone="blue">Industry-Specific Engineering</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Technology built around
            <br />
            <span className="text-primary font-normal">your industry landscape.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every sector has unique regulatory mandates, operational challenges, and growth drivers. We combine deep domain understanding with high-velocity engineering to deliver custom AI, software, and IT solutions.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RollButton href="#industry-grid" variant="primary" arrow>
              Explore 8 Industry Sectors
            </RollButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-ink transition-colors"
            >
              <span>Request Industry Consultation</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section id="industry-grid" className="border-b border-hairline bg-ibm-layer py-16 sm:py-24 scroll-mt-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Eyebrow className="justify-start">01 / Industry Solutions</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Eight sectors engineered for impact.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Select an industry below to view dedicated capabilities, technology architectures, and case outcomes.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {ALL_INDUSTRIES.map((ind, i) => (
              <div
                key={ind.slug}
                className="group flex flex-col justify-between border border-hairline bg-white p-8 sm:p-10 transition-all hover:border-primary hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-hairline pb-4">
                    <span className="font-mono text-xs text-ibm-bright font-medium">
                      0{i + 1} / SECTOR
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-ibm-layer px-2.5 py-1 font-mono text-[11px] text-ink-muted">
                      {ind.badgeStat.split("·")[0]}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-light text-ink group-hover:text-primary transition-colors">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-primary">
                    {ind.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {ind.heroDescription}
                  </p>

                  {/* Core capabilities highlight */}
                  <div className="mt-6 space-y-2 border-t border-hairline/80 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-ibm-subtle">
                      Featured Capabilities:
                    </p>
                    <ul className="space-y-1.5">
                      {ind.solutions.slice(0, 3).map((sol) => (
                        <li key={sol.name} className="flex items-start gap-2 text-xs text-ink/80">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-ibm-bright" />
                          <span>{sol.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-medium hover:underline"
                  >
                    <span>Explore {ind.name} Page</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="font-mono text-xs text-ibm-subtle">
                    {ind.solutions.length} solutions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ABWcurious for Industries */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="blue" className="justify-center">Cross-Industry Standards</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Why leading organizations partner with ABWcurious.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              We bring enterprise rigor, rapid delivery pipelines, and unwavering commitment to security.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <div className="border border-hairline bg-ibm-layer p-8">
              <div className="flex size-10 items-center justify-center bg-white border border-hairline text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-ink">Compliance First</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Architectures built to satisfy HIPAA, PCI-DSS, RBI, GDPR, and ISO standards out of the box.
              </p>
            </div>

            <div className="border border-hairline bg-ibm-layer p-8">
              <div className="flex size-10 items-center justify-center bg-white border border-hairline text-primary">
                <Zap className="size-5" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-ink">Accelerated Time-to-Value</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Reusable industry modules and agile sprint models deliver production features 40% faster.
              </p>
            </div>

            <div className="border border-hairline bg-ibm-layer p-8">
              <div className="flex size-10 items-center justify-center bg-white border border-hairline text-primary">
                <Sparkles className="size-5" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-ink">AI + Human Expertise</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Practical machine learning pipelines engineered to solve specific industry pain points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ibm-blue py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Ready to transform your industry position?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Speak directly with our industry practice leaders and solutions architects to design your roadmap.
            </p>
          </div>
          <RollButton href="/contact" variant="light" arrow className="shrink-0">
            Talk to an Industry Expert
          </RollButton>
        </div>
      </section>
    </main>
  );
}
