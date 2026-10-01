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
  
  const category = CATEGORY_BY_SLUG.get(slug);
  if (category) {
    return {
      title: `${category.name} Services | ${SEO_CONFIG.siteName}`,
      description: category.description,
      alternates: {
        canonical: `${SEO_CONFIG.canonicalBase}/services/${category.slug}`,
      },
      openGraph: {
        title: `${category.name} Services | ${SEO_CONFIG.siteName}`,
        description: category.description,
        url: `${SEO_CONFIG.canonicalBase}/services/${category.slug}`,
        siteName: SEO_CONFIG.siteName,
        type: "website",
      },
    };
  }

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

  return {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Prioritize Catalog Category page if slug matches a main category (e.g. software-web-development, mobile-app-development, digital-marketing)
  const category = CATEGORY_BY_SLUG.get(slug);
  if (category) {
    return (
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <CategoryPage category={category} />
      </main>
    );
  }

  // Check detailed SEO sub-service
  const service = getDetailedServiceBySlug(slug);
  if (service) {
    const breadcrumbItems = [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.name, url: `/services/${service.slug}` },
    ];

    return (
      <main id="main" tabIndex={-1} className="min-h-screen bg-background text-ink pt-28 pb-20 px-4 sm:px-6 lg:px-8 outline-none">
        <BreadcrumbSchema items={breadcrumbItems} />
        <ServiceSchema service={service} />
        <FAQSchema faqs={service.faqs} />

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-ink-muted">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>/</li>
              <li className="text-primary font-medium" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          {/* Service Hero */}
          <header className="space-y-5 border-b border-hairline pb-10">
            <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
              {service.category}
            </p>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-ink leading-[1.12]">
              {service.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl">
              {service.heroSubtitle}
            </p>
          </header>

          {/* Answer-First / Summary Box (Carbon border-l-4 style) */}
          <section className="bg-white border border-hairline border-l-4 border-l-primary p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h2 className="text-lg font-medium text-ink">
                Executive Overview: What ABWcurious Delivers
              </h2>
            </div>
            <p className="text-ink-muted text-base leading-relaxed">
              {service.solutionOverview}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-hairline text-sm">
              <div>
                <strong className="text-ibm-subtle block text-xs font-mono uppercase tracking-wider">Business Impact</strong>
                <p className="text-ink mt-1">{service.problemStatement}</p>
              </div>
              <div>
                <strong className="text-ibm-subtle block text-xs font-mono uppercase tracking-wider">Target Locations & Deployment</strong>
                <p className="text-primary font-mono text-xs mt-1">{service.targetLocations.join(" · ")}</p>
              </div>
            </div>
          </section>

          {/* Deliverables / Included Services */}
          <section className="space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Practice Deliverables</p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-ink mt-1">
                What is included in our {service.name} services
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-hairline bg-hairline">
              {service.includedServices.map((inc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 space-y-2 hover:bg-ibm-layer transition-colors"
                >
                  <span className="text-xs font-mono text-ibm-subtle tabular-nums">0{idx + 1}</span>
                  <h3 className="text-lg font-normal text-ink">{inc.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{inc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="space-y-4 bg-ibm-layer border border-hairline p-6 sm:p-8">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Technical Stack</p>
            <h2 className="text-xl font-light text-ink">Technologies & Frameworks We Engineer With</h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-white border border-hairline text-ink font-mono text-xs font-medium px-3 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Development Process */}
          <section className="space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Execution Model</p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-ink mt-1">Our 4-Step Engineering Process</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-hairline bg-hairline">
              {service.processSteps.map((step) => (
                <div key={step.step} className="bg-white p-6 space-y-2">
                  <span className="text-xs font-mono font-bold text-primary">{step.step}</span>
                  <h3 className="text-base font-normal text-ink">{step.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          {service.useCases && service.useCases.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-light text-ink">Real-World Case Studies & Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-hairline bg-hairline">
                {service.useCases.map((uc, idx) => (
                  <div key={idx} className="bg-white p-6 space-y-2">
                    <h3 className="text-lg font-normal text-ink">{uc.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="space-y-6 border-t border-hairline pt-10">
              <h2 className="text-2xl font-light text-ink">
                Frequently Asked Questions — {service.name}
              </h2>
              <div className="divide-y divide-hairline border border-hairline bg-white">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 space-y-2">
                    <h3 className="text-base font-normal text-ink">{faq.q}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <section className="bg-primary text-white p-8 sm:p-12 space-y-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                Ready to Discuss Your {service.name} Project?
              </h2>
              <p className="text-white/80 max-w-xl text-sm sm:text-base mt-2">
                Speak directly with our senior engineers in Navi Mumbai. We provide scoping, technical assessment, and fixed-timeline proposals.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white bg-white text-primary text-sm font-medium hover:bg-slate-100 transition-colors shrink-0"
            >
              Request a Free Consultation
            </Link>
          </section>
        </div>
      </main>
    );
  }

  notFound();
}
