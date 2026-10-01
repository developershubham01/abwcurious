import React from "react";
import { SEO_CONFIG, ServiceDetail } from "@/lib/seo-config";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SEO_CONFIG.canonicalBase}/#organization`,
    name: SEO_CONFIG.companyName,
    alternateName: [SEO_CONFIG.siteName, SEO_CONFIG.legalName],
    url: SEO_CONFIG.canonicalBase,
    logo: {
      "@type": "ImageObject",
      url: SEO_CONFIG.logoUrl,
      width: 500,
      height: 120,
    },
    image: SEO_CONFIG.ogImageUrl,
    description: SEO_CONFIG.defaultDescription,
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO_CONFIG.address.streetAddress,
      addressLocality: SEO_CONFIG.address.addressLocality,
      addressRegion: SEO_CONFIG.address.addressRegion,
      postalCode: SEO_CONFIG.address.postalCode,
      addressCountry: SEO_CONFIG.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude,
    },
    sameAs: SEO_CONFIG.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SEO_CONFIG.phone,
        contactType: "customer service",
        areaServed: ["IN", "Global"],
        availableLanguage: ["English", "Hindi", "Marathi"],
        email: SEO_CONFIG.email,
      },
      {
        "@type": "ContactPoint",
        telephone: SEO_CONFIG.phone,
        contactType: "sales",
        areaServed: ["IN", "Global"],
        availableLanguage: ["English", "Hindi", "Marathi"],
        email: SEO_CONFIG.emailSales,
      },
    ],
    vatID: SEO_CONFIG.gst,
    taxID: SEO_CONFIG.cin,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SEO_CONFIG.canonicalBase}/#localbusiness`,
    name: SEO_CONFIG.companyName,
    url: SEO_CONFIG.canonicalBase,
    logo: SEO_CONFIG.logoUrl,
    image: SEO_CONFIG.ogImageUrl,
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    priceRange: SEO_CONFIG.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO_CONFIG.address.streetAddress,
      addressLocality: SEO_CONFIG.address.addressLocality,
      addressRegion: SEO_CONFIG.address.addressRegion,
      postalCode: SEO_CONFIG.address.postalCode,
      addressCountry: SEO_CONFIG.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Navi Mumbai" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Thane" },
      { "@type": "City", name: "Pune" },
      { "@type": "City", name: "Bangalore" },
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Delhi NCR" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: SEO_CONFIG.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.canonicalBase}/#website`,
    url: SEO_CONFIG.canonicalBase,
    name: SEO_CONFIG.siteName,
    alternateName: SEO_CONFIG.companyName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      "@id": `${SEO_CONFIG.canonicalBase}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({ service }: { service: ServiceDetail }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SEO_CONFIG.canonicalBase}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    category: service.category,
    description: service.metaDescription,
    url: `${SEO_CONFIG.canonicalBase}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.companyName,
      url: SEO_CONFIG.canonicalBase,
      logo: SEO_CONFIG.logoUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: SEO_CONFIG.address.streetAddress,
        addressLocality: SEO_CONFIG.address.addressLocality,
        addressRegion: SEO_CONFIG.address.addressRegion,
        postalCode: SEO_CONFIG.address.postalCode,
        addressCountry: SEO_CONFIG.address.addressCountry,
      },
    },
    areaServed: service.targetLocations.map((loc) => ({
      "@type": loc === "Global" ? "Country" : "City",
      name: loc,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} Deliverables`,
      itemListElement: service.includedServices.map((item, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.desc,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SEO_CONFIG.canonicalBase}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
