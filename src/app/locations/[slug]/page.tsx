import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCATIONS_DATA, getLocationBySlug } from "@/lib/locations";
import { SEO_CONFIG, DETAILED_SERVICES } from "@/lib/seo-config";
import { BreadcrumbSchema, FAQSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS_DATA.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);

  if (!location) {
    return {
      title: "Location Not Found | ABWcurious",
    };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: `${SEO_CONFIG.canonicalBase}/locations/${location.slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `${SEO_CONFIG.canonicalBase}/locations/${location.slug}`,
      siteName: SEO_CONFIG.siteName,
      type: "website",
    },
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);

  if (!location) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: location.cityName, url: `/locations/${location.slug}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema items={breadcrumbItems} />
      <LocalBusinessSchema />
      {location.faqs && <FAQSchema faqs={location.faqs} />}

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/locations" className="hover:text-cyan-400 transition-colors">
                Locations
              </Link>
            </li>
            <li>/</li>
            <li className="text-cyan-400 font-medium" aria-current="page">
              {location.cityName}
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6">
          {location.isPrimaryOffice && (
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full">
              Registered Head Office Location
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {location.heroTitle}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {location.heroSubtitle}
          </p>
        </header>

        {/* Quick Answer / GEO Section */}
        <section className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            Overview & Business Context in {location.cityName}
          </h2>
          <p className="text-slate-300 leading-relaxed">{location.introText}</p>
          <p className="text-slate-300 leading-relaxed">{location.localContext}</p>
        </section>

        {/* Primary Office Address Card if applicable */}
        {location.address && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">Office Contact & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div>
                <strong className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Address</strong>
                {location.address}
              </div>
              <div>
                <strong className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</strong>
                <a href={SEO_CONFIG.phoneHref} className="text-cyan-400 hover:underline">
                  {location.phone}
                </a>
              </div>
              <div>
                <strong className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Email</strong>
                <a href={`mailto:${location.email}`} className="text-cyan-400 hover:underline">
                  {location.email}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Key Areas Covered */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Areas & Industrial Hubs Served in {location.cityName}
          </h2>
          <div className="flex flex-wrap gap-2">
            {location.keyAreas.map((area) => (
              <span
                key={area}
                className="bg-slate-900 border border-slate-800 text-slate-200 text-sm px-3.5 py-1.5 rounded-lg"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* Featured IT Services */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            IT & Technology Services in {location.cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DETAILED_SERVICES.slice(0, 6).map((service) => (
              <div
                key={service.slug}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-6 space-y-3"
              >
                <h3 className="text-xl font-semibold text-white">
                  <Link href={`/services/${service.slug}`} className="hover:text-cyan-400 transition-colors">
                    {service.name}
                  </Link>
                </h3>
                <p className="text-sm text-slate-300 line-clamp-3">
                  {service.metaDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-block text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
                >
                  Explore {service.shortName} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        {location.faqs && location.faqs.length > 0 && (
          <section className="space-y-6 border-t border-slate-800 pt-10">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions — {location.cityName}
            </h2>
            <div className="space-y-4">
              {location.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-2">
                  <h3 className="text-base font-semibold text-white">{faq.q}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border border-cyan-500/40 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Start Your Tech Project in {location.cityName}?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Speak directly with our technical lead to discuss custom software development, web applications, cybersecurity audits, or cloud migration.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-colors"
            >
              Get in Touch with ABWcurious
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
