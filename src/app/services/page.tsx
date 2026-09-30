import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import { CATEGORIES, getAllServices } from "@/lib/catalog";
import { Eyebrow, RollButton } from "@/components/site/primitives";
import { AllServicesCatalog } from "@/components/site/all-services-catalog";

export const metadata: Metadata = {
  title: "Services & Practices — ABWcurious | Engineering a Better Future",
  description:
    "Explore our six specialized engineering practices and complete directory of 70 itemised services: Software Development, Mobile Apps, AI & Automation, Digital Marketing, Recruitment, and Cloud Solutions.",
};

export default function ServicesPage() {
  const flattenedServices = getAllServices().map((s) => ({
    categorySlug: s.category.slug,
    categoryName: s.category.name,
    categoryShort: s.category.short,
    categoryNum: s.category.num,
    groupLabel: s.groupLabel,
    name: s.item.name,
    blurb: s.item.blurb,
    itemSlug: s.slug,
  }));

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none pt-12 sm:pt-20">
      {/* Hero */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow tone="blue">Enterprise Engineering Practices</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Specialized capability.
            <br />
            <span className="text-primary font-normal">Full-lifecycle delivery.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From architecture discovery to production rollouts, our six core engineering practices operate with dedicated squads, modern stacks, and guaranteed SLAs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RollButton href="#all-services" variant="primary" arrow>
              Browse all {flattenedServices.length} services
            </RollButton>
            <Link
              href="#practices"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-ink transition-colors"
            >
              <span>View 6 practices</span>
              <ArrowDown className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of Practices */}
      <section id="practices" className="border-b border-hairline bg-ibm-layer py-16 sm:py-24 scroll-mt-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Eyebrow className="justify-start">01 / Practices</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Six specialized engineering studios.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Each practice is led by a principal engineer with dedicated squads and tailored delivery processes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="group flex flex-col justify-between border border-hairline bg-white p-8 transition-all hover:border-primary hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ibm-bright font-medium">{cat.num} / Practice</span>
                    <span className="text-xs text-muted-foreground font-mono">{cat.short}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-light text-ink group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-hairline pt-4">
                    {cat.typewriter.slice(0, 4).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-ink/80">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-ibm-bright" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between">
                  <Link
                    href={`/services/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:underline"
                  >
                    Explore Practice
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="font-mono text-xs text-muted-foreground hover:text-ink transition-colors"
                  >
                    Start Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All 70 Services Catalog Section with Live Search & Filter */}
      <section className="border-b border-hairline bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AllServicesCatalog services={flattenedServices} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ibm-blue py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Need a cross-functional squad?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              We frequently assemble cross-practice teams for hybrid web, mobile, and AI initiatives. Speak directly with a solutions architect today.
            </p>
          </div>
          <RollButton href="/contact" variant="light" arrow className="shrink-0">
            Get in touch
          </RollButton>
        </div>
      </section>
    </main>
  );
}
