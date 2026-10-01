import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CATEGORY_BY_SLUG } from "@/lib/catalog";
import { DETAILED_SERVICES, getDetailedServiceBySlug, SEO_CONFIG } from "@/lib/seo-config";
import { CategoryPage } from "@/components/site/category-page";
import {
  BreadcrumbSchema,
  FAQSchema,
  ServiceSchema,
} from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const catSlugs = CATEGORIES.map((c) => ({ slug: c.slug }));
  const detailedSlugs = DETAILED_SERVICES.map((s) => ({ slug: s.slug }));
  return [...catSlugs, ...detailedSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detailed = getDetailedServiceBySlug(slug);
  if (detailed) {
    return {
      title: detailed.metaTitle,
      description: detailed.metaDescription,
      keywords: [detailed.targetKeyword, ...detailed.secondaryKeywords],
      alternates: {
        canonical: `${SEO_CONFIG.canonicalBase}/services/${detailed.slug}`,
      },
      openGraph: {
        title: detailed.metaTitle,
        description: detailed.metaDescription,
        url: `${SEO_CONFIG.canonicalBase}/services/${detailed.slug}`,
        siteName: SEO_CONFIG.siteName,
        type: "website",
      },
    };
  }

  const category = CATEGORY_BY_SLUG.get(slug);
  if (category) {
    return {
      title: `${category.name} Services | ${SEO_CONFIG.siteName}`,
      description: category.description,
      alternates: {
        canonical: `${SEO_CONFIG.canonicalBase}/services/${category.slug}`,
      },
    };
  }

  return {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Check detailed SEO service first
  const service = getDetailedServiceBySlug(slug);
  if (service) {
    const breadcrumbItems = [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.name, url: `/services/${service.slug}` },
    ];

    return (
      <main id="main" tabIndex={-1} className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 outline-none">
        <BreadcrumbSchema items={breadcrumbItems} />
        <ServiceSchema service={service} />
        <FAQSchema faqs={service.faqs} />

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          {/* Service Hero */}
          <header className="space-y-6">
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              {service.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {service.heroTitle}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              {service.heroSubtitle}
            </p>
          </header>

          {/* Answer-First / GEO Direct Answer Box */}
          <section className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
              <h2 className="text-xl font-bold text-white">
                Quick Summary: What ABWcurious Delivers
              </h2>
            </div>
            <p className="text-slate-200 text-base leading-relaxed">
              {service.solutionOverview}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-sm">
              <div>
                <strong className="text-slate-400 block text-xs uppercase tracking-wider">Business Impact</strong>
                <p className="text-slate-300 mt-1">{service.problemStatement}</p>
              </div>
              <div>
                <strong className="text-slate-400 block text-xs uppercase tracking-wider">Target Locations</strong>
                <p className="text-cyan-400 mt-1">{service.targetLocations.join(", ")}</p>
              </div>
            </div>
          </section>

          {/* Deliverables / Included Services */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is Included in Our {service.name} Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.includedServices.map((inc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{inc.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{inc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="space-y-4 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white">Technologies & Tools We Work With</h2>
            <div className="flex flex-wrap gap-2.5">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-800 text-cyan-300 border border-slate-700 text-sm font-mono px-3 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Development Process */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our 4-Step Execution Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.processSteps.map((step) => (
                <div key={step.step} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 font-mono">{step.step}</span>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          {service.useCases && service.useCases.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Real-World Case Studies & Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.useCases.map((uc, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-2">
                    <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="space-y-6 border-t border-slate-800 pt-10">
              <h2 className="text-2xl font-bold text-white">
                Frequently Asked Questions — {service.name}
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-2">
                    <h3 className="text-base font-semibold text-white">{faq.q}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Services */}
          <section className="space-y-4 border-t border-slate-800 pt-8">
            <h2 className="text-xl font-bold text-white">Explore Related Practice Verticals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {DETAILED_SERVICES.filter((s) => s.slug !== service.slug)
                .slice(0, 4)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-lg p-3 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {s.name} &rarr;
                  </Link>
                ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border border-cyan-500/40 rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Discuss Your {service.name} Project?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Speak directly with our senior engineers in Navi Mumbai. We provide scoping, technical assessment, and fixed-timeline proposals.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-colors"
              >
                Request a Free Consultation
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Fallback to Catalog Category page
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <CategoryPage category={category} />
    </main>
  );
}
