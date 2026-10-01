import React from "react";
import Metadata from "next";
import Link from "next/link";
import { LOCATIONS_DATA } from "@/lib/locations";
import { SEO_CONFIG } from "@/lib/seo-config";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Target Service Locations in India & Maharashtra | ABWcurious",
  description:
    "Explore ABWcurious IT service locations across Navi Mumbai (Head Office), Mumbai, Thane, Pune, and India. Custom software, AI, cybersecurity & cloud services.",
  alternates: {
    canonical: `${SEO_CONFIG.canonicalBase}/locations`,
  },
};

export default function LocationsPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema items={breadcrumbItems} />
      <LocalBusinessSchema />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-cyan-400 font-medium" aria-current="page">
              Locations
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-400">
            Target Service Locations & Regional Hubs
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Headquartered in Navi Mumbai (Nerul), ABWcurious provides custom software development, Next.js web applications, cybersecurity VAPT audits, AI solutions, and cloud consulting across major commercial hubs in Maharashtra and India.
          </p>
        </header>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS_DATA.map((loc) => (
            <article
              key={loc.slug}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 space-y-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {loc.cityName}, {loc.region}
                  </h2>
                  {loc.isPrimaryOffice && (
                    <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full">
                      Head Office
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {loc.heroSubtitle}
                </p>

                {loc.address && (
                  <p className="text-xs text-slate-400 border-l-2 border-cyan-500 pl-3 py-1">
                    <strong className="text-slate-200">Address:</strong> {loc.address}
                  </p>
                )}

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Areas Served:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {loc.keyAreas.map((area) => (
                      <span
                        key={area}
                        className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors"
              >
                View IT Services in {loc.cityName} &rarr;
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Need Custom IT Solutions for Your Location?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Contact our engineering team to discuss your project requirements, schedule an in-person discovery meeting, or get a custom proposal.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors"
            >
              Contact ABWcurious Engineering Team
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
