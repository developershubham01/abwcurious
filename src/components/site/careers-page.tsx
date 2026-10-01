"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileText,
} from "lucide-react";
import { ALL_DEPARTMENTS, getOpenJobs, JobPosition } from "@/lib/jobs";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { Reveal, RollButton } from "./primitives";

export function CareersPage() {
  const openJobs = getOpenJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedExp, setSelectedExp] = useState("All");

  const filteredJobs = openJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "All" || job.department === selectedDept;

    const matchesExp =
      selectedExp === "All" ||
      (selectedExp === "0-1" && (job.experience.includes("0–1") || job.experience.includes("0-1"))) ||
      (selectedExp === "intern" && (job.isInternship || job.employmentType === "Internship"));

    return matchesSearch && matchesDept && matchesExp;
  });

  const internshipJobs = openJobs.filter((j) => j.isInternship || j.employmentType === "Internship");

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ];

  return (
    <div className="bg-background">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Page Header — About Page Theme */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
              Careers at ABWcurious
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 sm:mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Build Your Career With <span className="text-primary font-normal">ABWcurious</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 sm:mt-8 max-w-3xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              Join ABWcurious and work on technology, software, digital, marketing and business solutions while growing your skills with a dynamic team in Navi Mumbai & globally.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center gap-4">
            <RollButton href="#openings" variant="primary" arrow>
              View Open Positions ({openJobs.length})
            </RollButton>
            <RollButton href="/careers/submit-resume" variant="outline">
              Submit Your Resume
            </RollButton>
          </Reveal>
        </div>
      </section>

      {/* Why Join ABWcurious — Feature Grid */}
      <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Why Join ABWcurious?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              We empower curious engineers, designers, marketers, and problem solvers to build meaningful software.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Modern Tech & 1-on-1 Mentorship",
                desc: "Work directly with senior software architects on Next.js 15, Python AI models, React Native, and cloud microservices.",
              },
              {
                num: "02",
                title: "0–1 Years & Entry-Level Growth",
                desc: "We actively hire entry-level engineers and offer structured internship programs with fast-track Pre-Placement Offers (PPO).",
              },
              {
                num: "03",
                title: "Transparent & High Velocity",
                desc: "No bureaucracy. Small agile squads, weekly production releases, clear career growth ladders, and competitive compensation.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.06 * i} className="h-full">
                <div className="flex h-full flex-col bg-white p-6 transition-colors hover:bg-ibm-layer">
                  <span className="text-xs font-mono text-ibm-subtle">{item.num} / Benefit</span>
                  <h3 className="mt-4 text-lg font-normal text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Filter & Grid */}
      <section id="openings" className="border-b border-hairline bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Active Vacancies</p>
              <h2 className="mt-2 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Current Openings ({filteredJobs.length})
              </h2>
            </div>

            {/* Experience Pill Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All Experience", val: "All" },
                { label: "0 to 1 Years Exp", val: "0-1" },
                { label: "Internships", val: "intern" },
              ].map((btn) => (
                <button
                  key={btn.val}
                  type="button"
                  onClick={() => setSelectedExp(btn.val)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors border ${selectedExp === btn.val
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-ink-muted border-hairline hover:bg-ibm-layer hover:text-ink"
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar & Department Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ibm-subtle" />
              <input
                type="text"
                placeholder="Search jobs by title, skills (e.g. Next.js, Python, Sales, HR)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-ibm-layer border border-hairline text-ink text-sm placeholder:text-ibm-subtle focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full py-3 px-4 bg-ibm-layer border border-hairline text-ink text-sm focus:outline-none focus:border-primary transition-colors"
              >
                {ALL_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="border border-hairline bg-ibm-layer p-12 text-center space-y-4">
              <HelpCircle className="mx-auto size-10 text-ibm-subtle" />
              <h3 className="text-lg font-normal text-ink">No active open positions match your filter</h3>
              <p className="text-sm text-ink-muted max-w-md mx-auto">
                Try clearing your search filters or submit your resume directly to our general talent pool.
              </p>
              <Link
                href="/careers/submit-resume"
                className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-mono uppercase tracking-wider"
              >
                Submit Resume to Talent Pool
              </Link>
            </div>
          ) : (
            <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="group relative flex flex-col justify-between bg-white p-6 sm:p-8 transition-colors hover:bg-ibm-layer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-primary">
                          {job.department}
                        </span>
                        <h3 className="mt-1 text-xl font-normal text-ink group-hover:text-primary transition-colors">
                          <Link href={`/careers/${job.slug}`}>
                            {job.title}
                          </Link>
                        </h3>
                      </div>
                      {job.isInternship ? (
                        <span className="bg-[#0f62fe]/10 border border-[#0f62fe]/30 text-primary text-[11px] font-mono px-2 py-0.5 shrink-0 font-medium">
                          4 Months Unpaid Internship
                        </span>
                      ) : (
                        <span className="bg-ibm-layer border border-hairline text-ink-muted text-[11px] font-mono px-2 py-0.5 shrink-0">
                          Full Time
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-ink-muted line-clamp-2">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-ink-muted font-mono">
                      <div>Location: {job.location}</div>
                      <div>Work Mode: {job.workMode}</div>
                      <div>Exp: {job.experience}</div>
                      <div>Category: {job.isInternship ? "4 Months Unpaid Internship" : "Full Time Role"}</div>
                    </div>

                    {/* Required Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {job.requiredSkills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="bg-ibm-layer border border-hairline text-ink-muted text-[11px] font-mono px-2.5 py-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between gap-3">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="text-xs font-mono text-ink-muted hover:text-ink transition-colors"
                    >
                      View Details &rarr;
                    </Link>
                    <Link
                      href={`/careers/apply?job=${job.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-mono uppercase tracking-wider hover:bg-[#0353e9] transition-colors"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Internship Opportunities */}
      {internshipJobs.length > 0 && (
        <section className="border-b border-hairline bg-ibm-layer py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-primary">0 to 1 Years & Entry-Level</p>
              <h2 className="mt-2 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Internship & Entry-Level Hiring Programs
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted max-w-3xl">
                Are you a recent graduate or student with 0 to 1 years of experience? ABWcurious offers structured 3-to-6 month internship drives in Software Engineering, HR Sourcing, UI/UX, and Marketing with real stipend compensation and PPO conversions.
              </p>
            </div>
            <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {internshipJobs.map((ij) => (
                <div key={ij.id} className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-normal text-ink">{ij.title}</h3>
                    <span className="text-xs text-primary font-mono">{ij.salary}</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">{ij.description}</p>
                  <Link
                    href={`/careers/apply?job=${ij.slug}`}
                    className="inline-block text-xs font-mono text-primary hover:underline"
                  >
                    Apply for Internship &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4-Step Hiring Process */}
      <section className="border-b border-hairline bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Process</p>
            <h2 className="mt-2 text-3xl font-light tracking-tight text-ink sm:text-4xl">Our 4-Step Hiring Process</h2>
            <p className="mt-2 text-sm text-ink-muted">Transparent, fast, and respectful of candidate time.</p>
          </div>

          <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Online Application", desc: "Submit your profile details and share your public Google Drive resume link." },
              { step: "02", title: "Technical Screening", desc: "A 20-minute introductory call with a senior engineer or recruiter to align on expectations." },
              { step: "03", title: "Practical Task / Discussion", desc: "A real-world coding exercise or system design interview focused on practical skills." },
              { step: "04", title: "Offer & Onboarding", desc: "Receive your offer letter, complete onboarding paperwork, and join the ABWcurious team!" },
            ].map((s) => (
              <div key={s.step} className="bg-white p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-ibm-subtle">{s.step} / Step</span>
                  <h3 className="mt-4 text-base font-normal text-ink">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner — The About Page Blue Banner */}
      <section className="bg-primary py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              Can&apos;t find the right opening?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Send us your resume link and we will add your profile to our talent pool for upcoming software engineering, marketing, HR, and sales opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <RollButton href="/careers/submit-resume" variant="light" arrow className="shrink-0">
              Submit Your Resume
            </RollButton>
            <RollButton href="/contact" variant="outline-light" className="shrink-0">
              Contact Talent Team
            </RollButton>
          </div>
        </div>
      </section>
    </div>
  );
}
