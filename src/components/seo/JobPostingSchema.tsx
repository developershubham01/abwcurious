import React from "react";
import { JobPosition } from "@/lib/jobs";
import { SEO_CONFIG } from "@/lib/seo-config";

export function JobPostingSchema({ job }: { job: JobPosition }) {
  if (!job || job.status !== "OPEN") return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.overview}\n\nKey Responsibilities:\n${job.responsibilities.join("\n")}\n\nRequired Skills:\n${job.requiredSkills.join(", ")}`,
    datePosted: job.datePosted,
    validThrough: job.deadline,
    employmentType: job.employmentType === "Full Time" ? "FULL_TIME" : job.employmentType === "Internship" ? "INTERN" : "CONTRACT",
    hiringOrganization: {
      "@type": "Organization",
      name: SEO_CONFIG.companyName,
      sameAs: SEO_CONFIG.canonicalBase,
      logo: SEO_CONFIG.logoUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: SEO_CONFIG.address.streetAddress,
        addressLocality: SEO_CONFIG.address.addressLocality,
        addressRegion: SEO_CONFIG.address.addressRegion,
        postalCode: SEO_CONFIG.address.postalCode,
        addressCountry: SEO_CONFIG.address.addressCountry,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        unitText: job.employmentType === "Internship" ? "MONTH" : "YEAR",
        value: job.salary,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
