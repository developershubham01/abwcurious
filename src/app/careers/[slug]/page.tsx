import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug, JOBS_DATABASE } from "@/lib/jobs";
import { SEO_CONFIG } from "@/lib/seo-config";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { JobPostingSchema } from "@/components/seo/JobPostingSchema";
import { Reveal, RollButton } from "@/components/site/primitives";
import {
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOBS_DATABASE.filter((j) => j.status === "OPEN").map((j) => ({
    slug: j.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const job = getJobBySlug(resolvedParams.slug);

  if (!job) {
    return {
      title: "Job Position Not Found | ABWcurious",
    };
  }

  const title = `${job.title} Jobs in Navi Mumbai | ABWcurious`;
  const description = `${job.title} position at ABWcurious (${job.location}). Experience: ${job.experience}. Skills: ${job.requiredSkills.slice(0, 4).join(", ")}. Apply now.`;

  return {
    title,
    description,
    keywords: [job.title, ...job.requiredSkills, "ABWcurious careers", "IT jobs Navi Mumbai"],
    alternates: {
      canonical: `${SEO_CONFIG.canonicalBase}/careers/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.canonicalBase}/careers/${job.slug}`,
      siteName: SEO_CONFIG.siteName,
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const job = getJobBySlug(resolvedParams.slug);

  if (!job) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
    { name: job.title, url: `/careers/${job.slug}` },
  ];

  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbSchema items={breadcrumbItems} />
      <JobPostingSchema job={job} />

      {/* Header — About Page Theme */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
              <Link href="/careers" className="hover:underline">Careers</Link>
              <span>/</span>
              <span>{job.department}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 sm:mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {job.title}
            </h1>
          </Reveal>

          {/* Quick Specs Grid */}
          <Reveal delay={0.16} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px border border-hairline bg-hairline">
            <div className="bg-white p-4">
              <span className="block text-[10px] font-mono uppercase text-ibm-subtle">Location</span>
              <span className="text-sm font-normal text-ink mt-1 block">{job.location}</span>
            </div>
            <div className="bg-white p-4">
              <span className="block text-[10px] font-mono uppercase text-ibm-subtle">Employment Type</span>
              <span className="text-sm font-normal text-ink mt-1 block">{job.employmentType} ({job.workMode})</span>
            </div>
            <div className="bg-white p-4">
              <span className="block text-[10px] font-mono uppercase text-ibm-subtle">Experience</span>
              <span className="text-sm font-normal text-ink mt-1 block">{job.experience}</span>
            </div>
            <div className="bg-white p-4">
              <span className="block text-[10px] font-mono uppercase text-ibm-subtle">Program Structure</span>
              <span className="text-sm font-normal text-ink mt-1 block">
                {job.isInternship ? "4 Months Unpaid Internship" : "Full Time Role"}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 flex items-center gap-4">
            <RollButton href={`/careers/apply?job=${job.slug}`} variant="primary" arrow>
              Apply For This Position
            </RollButton>
            <span className="text-xs font-mono text-ibm-subtle">Job ID: {job.id}</span>
          </Reveal>
        </div>
      </section>

      {/* Role Overview */}
      <section className="border-b border-hairline bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Role Overview
            </h2>
            <p className="mt-2 text-xs font-mono text-ibm-subtle">Openings: {job.openings} &bull; Deadline: {job.deadline}</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              {job.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl mb-8">
            Key Responsibilities
          </h2>
          <ul className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="bg-white p-6 flex items-start gap-3">
                <span className="text-xs font-mono text-primary font-bold">{String(idx + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed text-ink-muted">{resp}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills & Education */}
      <section className="border-b border-hairline bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl mb-6">
              Required Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-ibm-layer border border-hairline text-ink font-mono text-xs px-3 py-1.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div>
              <h3 className="text-xl font-light text-ink mb-4">Preferred Skills (Bonus)</h3>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white border border-hairline text-ink-muted text-xs px-3 py-1.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-hairline bg-hairline">
            <div className="bg-white p-6">
              <span className="text-xs font-mono uppercase text-primary">Education Requirement</span>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{job.education}</p>
            </div>
            <div className="bg-white p-6">
              <span className="text-xs font-mono uppercase text-primary">Benefits & Perks</span>
              <ul className="mt-2 space-y-1 text-xs text-ink-muted">
                {job.benefits.map((b, idx) => (
                  <li key={idx}>&bull; {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-primary py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Ready to apply for {job.title}?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Submit your application in 2 minutes using your public Google Drive resume link.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <RollButton href={`/careers/apply?job=${job.slug}`} variant="light" arrow className="shrink-0">
              Apply For Position
            </RollButton>
          </div>
        </div>
      </section>
    </div>
  );
}
