import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { CATEGORIES, CATEGORY_BY_SLUG, getServiceItemBySlug, slugify } from "@/lib/catalog";
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
    description: serviceItem.blurb,
  };
}

const GENERAL_PROCESS = [
  {
    title: "1. Strategy & Discovery",
    desc: "We begin by understanding your business objectives, target audience, and technical requirements. This phase includes competitive analysis and creating a clear roadmap for the project.",
  },
  {
    title: "2. Architecture & Design",
    desc: "Our architects and designers collaborate to create wireframes, UI/UX designs, and technical blueprints. We ensure the solution is scalable, secure, and intuitive.",
  },
  {
    title: "3. Agile Development",
    desc: "Using modern tech stacks and agile methodologies, our engineering teams build the solution in iterative sprints, ensuring transparency and flexibility throughout the process.",
  },
  {
    title: "4. Testing & QA",
    desc: "Rigorous testing is conducted at every stage. We perform automated, manual, security, and performance testing to guarantee a bug-free and smooth launch.",
  },
  {
    title: "5. Launch & Maintenance",
    desc: "After a successful deployment, we provide ongoing support, monitoring, and regular updates to keep your application running optimally and securely.",
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

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none pt-12 sm:pt-20 bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-hairline bg-ibm-layer">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/services" className="hover:text-ink transition-colors">Services</Link>
          <ChevronRight className="size-3" />
          <Link href={`/services/${category.slug}`} className="hover:text-ink transition-colors">{category.name}</Link>
          <ChevronRight className="size-3" />
          <span className="text-primary">{serviceItem.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-hairline py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow tone="blue">{category.short} Practice</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {serviceItem.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {serviceItem.blurb}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <RollButton href="/contact" variant="primary" arrow>
              Start this project
            </RollButton>
            <Link
              href={`/services/${category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to {category.short}
            </Link>
          </div>
        </div>
      </section>

      {/* How to Develop / Process Section */}
      <section className="bg-ibm-layer border-b border-hairline py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow className="justify-start">Development Process</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
              How we develop {serviceItem.name.toLowerCase()}
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our proven engineering lifecycle ensures high-quality delivery from concept to production.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GENERAL_PROCESS.map((step, index) => (
              <div key={index} className="bg-white p-8 border border-hairline hover:border-primary transition-colors shadow-sm">
                <Layers className="size-6 text-primary mb-6" />
                <h3 className="text-xl font-medium tracking-tight text-ink mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Features */}
      <section className="py-16 sm:py-24 bg-white border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="flex-1">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Why ABWcurious?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We bring deep engineering expertise and a product-focused mindset to every {serviceItem.name.toLowerCase()} engagement. 
              Our teams are accountable for outcomes, not just output.
            </p>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-6">
            {category.stats.map((stat, idx) => (
              <div key={idx} className="p-6 bg-ibm-layer border border-hairline">
                <div className="text-3xl font-light text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-ink">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ibm-blue py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Ready to execute?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Let's discuss your requirements for {serviceItem.name}. Our architects are ready to help.
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
