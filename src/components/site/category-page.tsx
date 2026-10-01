"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CATEGORIES, CATEGORY_BY_SLUG, categoryServiceCount, slugify, type Category } from "@/lib/catalog";
import { closeCategory, openCategory, useCatalogRoute, useCatalogRouter } from "@/lib/catalog-route";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { useInquiryStore } from "@/lib/store";
import { Eyebrow, RollButton } from "./primitives";
import { SplitText, Typewriter, Ticker } from "./text-anim";
import { SaasDemo } from "./saas-demo";
import { ViewShell } from "./view-shell";

/**
 * Full-screen service-category "pages" on hash routes #/services/<slug>.
 * The site stays a single Next.js route; these are in-app takeovers with
 * their own scroll, deep-linkable and wired to the browser back button.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function CategoryPortal() {
  useCatalogRouter();
  const slug = useCatalogRoute((s) => s.slug);
  const category = slug ? CATEGORY_BY_SLUG.get(slug) : null;
  const lastFocused = useRef<HTMLElement | null>(null);

  /* focus capture + restore */
  useEffect(() => {
    if (category && !lastFocused.current) {
      lastFocused.current = document.activeElement as HTMLElement | null;
    }
    if (!category && lastFocused.current) {
      lastFocused.current.focus?.();
      lastFocused.current = null;
    }
  }, [category]);

  /* scroll lock + document title while a page is open */
  useEffect(() => {
    if (!category) return;
    const prevTitle = document.title;
    document.title = `${category.name} — ABWcurious Services`;
    lockScroll();
    return () => {
      document.title = prevTitle;
      unlockScroll();
    };
  }, [category]);

  return (
    <AnimatePresence mode="wait">
      {category && <CategoryPage key={category.slug} category={category} />}
    </AnimatePresence>
  );
}

export function CategoryPage({ category }: { category: Category }) {
  const index = CATEGORIES.findIndex((c) => c.slug === category.slug);
  const prev = CATEGORIES[(index - 1 + CATEGORIES.length) % CATEGORIES.length];
  const next = CATEGORIES[(index + 1) % CATEGORIES.length];
  const count = categoryServiceCount(category);
  const setPresetService = useInquiryStore((s) => s.setPresetService);

  /* Escape closes — matching the site-wide dialog behaviour */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCategory();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close the takeover, then glide to the contact form with the category pre-filled */
  const startProject = () => {
    setPresetService(category.name);
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = `/contact?service=${encodeURIComponent(category.name)}`;
      return;
    }
    closeCategory();
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 420);
  };

  return (
    <ViewShell
      crumb={`Services / ${category.short}`}
      label={`${category.name} — service details`}
      activeNav="#/services"
      onClose={closeCategory}
    >
      {/* ================= hero ================= */}
      <div className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            >
              <Eyebrow className="justify-start">
                {category.num} / Category — {count} sub-services
              </Eyebrow>
            </motion.div>

            <h1 className="mt-5 text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <SplitText text={category.name} immediate delay={0.15} stagger={0.06} />
            </h1>

            <motion.p
              className="mt-5 text-sm text-primary sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Typewriter phrases={category.typewriter} prefix="→ " />
            </motion.p>

            <motion.p
              className="mt-5 max-w-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease: EASE }}
            >
              {category.description}
            </motion.p>

            {/* stats */}
            <motion.dl
              className="mt-8 grid grid-cols-3 divide-x divide-hairline border border-hairline bg-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
            >
              {category.stats.map((s, i) => (
                <div key={s.label} className={i === 0 ? "px-4 py-4" : "px-4 py-4"}>
                  <dt className="order-2 mt-1 text-xs text-ink-muted">
                    {s.label}
                  </dt>
                  <dd className="order-1 text-xl font-light tabular-nums text-ink sm:text-2xl">{s.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55, ease: EASE }}
            >
              <RollButton variant="primary" arrow onClick={startProject}>
                Start a project
              </RollButton>
              <RollButton
                variant="outline"
                onClick={() => document.getElementById("cat-services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse {count} services
              </RollButton>
            </motion.div>
          </div>

          {/* image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-hairline bg-card lg:mt-2">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* floating badge */}
            <span className="absolute -bottom-4 left-4 inline-flex items-center gap-2 border border-hairline bg-white px-3.5 py-2.5 text-xs text-ink-muted sm:left-6">
              <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" aria-hidden="true" />
              {count} services · SLA-backed
            </span>
          </motion.div>
        </div>
      </div>

      {/* ================= sub-service ticker ================= */}
      <Ticker
        items={category.groups.flatMap((g) => g.items.map((i) => i.name))}
        slow
        className="border-b border-hairline bg-ibm-layer py-3.5"
      />

      {/* ================= product tour (SaaS video) ================= */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">Product tour</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
                See the {category.short.toLowerCase()} motion.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              A looping look at how our {category.short.toLowerCase()} engagements run — live systems, real tooling,
              zero slideware.
            </p>
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mx-auto max-w-4xl">
              <SaasDemo demo={category.demo} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= services ================= */}
      <div id="cat-services" className="border-b border-hairline scroll-mt-14">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <Eyebrow className="justify-start">What&apos;s included</Eyebrow>
          <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
            Every {category.short.toLowerCase()} service, itemised.
          </h2>

          <div className="mt-10 flex flex-col gap-10">
            {category.groups.map((group, gi) => (
              <div key={group.label}>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm tabular-nums text-ibm-subtle">
                    {category.num}.{gi + 1}
                  </span>
                  <h3 className="text-sm font-medium text-ink">{group.label}</h3>
                  <span className="hidden h-px flex-1 bg-hairline sm:block" aria-hidden="true" />
                  <span className="text-xs tabular-nums text-ink-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item, ii) => {
                    const itemSlug = slugify(item.name);
                    const href = `/services/${category.slug}/${itemSlug}`;
                    return (
                      <motion.div
                        key={item.name}
                        className="h-full"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-32px" }}
                        transition={{ duration: 0.45, delay: Math.min(ii * 0.05, 0.25), ease: EASE }}
                      >
                        <Link
                          href={href}
                          onClick={() => {
                            closeCategory();
                          }}
                          className="group relative flex h-full flex-col justify-between bg-white p-5 transition-colors duration-300 hover:bg-ibm-layer"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-primary">
                                {item.name}
                              </h4>
                              <ArrowUpRight
                                className="mt-0.5 size-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <span>Explore service</span>
                            <span aria-hidden="true">→</span>
                          </div>
                          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-ibm-blue transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                        </Link>
                      </motion.div>
                    );
                  })}
                  {/* invisible fillers AFTER the items keep the hairline gap
                      pattern clean when a group doesn't fill its last row */}
                  {Array.from({ length: (3 - (group.items.length % 3)) % 3 }).map((_, f) => (
                    <div key={`f3-${f}`} className="hidden bg-white xl:block" aria-hidden="true" />
                  ))}
                  {Array.from({ length: (2 - (group.items.length % 2)) % 2 }).map((_, f) => (
                    <div key={`f2-${f}`} className="hidden bg-white sm:block xl:hidden" aria-hidden="true" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= process ================= */}
      <div className="border-b border-hairline bg-ibm-layer">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <Eyebrow className="justify-start">How it runs</Eyebrow>
          <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
            Four steps, zero mystery.
          </h2>
          <ol className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-4">
            {category.process.map((step, si) => (
              <li key={step.title} className="relative bg-card p-6">
                <span className="text-4xl font-light tabular-nums text-ink/10" aria-hidden="true">
                  {String(si + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                {si < category.process.length - 1 && (
                  <ArrowRight
                    className="absolute -right-[13px] top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-card text-primary md:block"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ================= Company Hiring Requirements Form ================= */}
      {category.slug === "recruitment-hr-solutions" && <CompanyHiringForm />}

      {/* ================= CTA band ================= */}
      <div className="bg-ibm-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-sm text-white/80">
                {category.num} / Get started
              </span>
              <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight tracking-tight sm:text-4xl">
                <SplitText text={`Ready to build with ${category.short}?`} immediate delay={0.1} />
              </h2>
              <p className="mt-3 max-w-xl text-white/75">
                Tell us the outcome you need. You&apos;ll get a scoped plan, a fixed timeline and a senior team on the
                first call.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <RollButton variant="light" arrow onClick={startProject}>
                Start a project
              </RollButton>
              <RollButton variant="outline-light" href="/services">
                All services
              </RollButton>
            </div>
          </div>
        </div>
      </div>

      {/* ================= prev / next ================= */}
      <nav aria-label="Category pagination" className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-hairline">
          <a
            href={`/services/${prev.slug}`}
            className="group flex flex-col items-start gap-1.5 px-4 py-6 text-left transition-colors hover:bg-ibm-layer focus-carbon sm:px-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
              Previous · {prev.num}
            </span>
            <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors sm:text-base">{prev.name}</span>
          </a>
          <a
            href={`/services/${next.slug}`}
            className="group flex flex-col items-end gap-1.5 px-4 py-6 text-right transition-colors hover:bg-ibm-layer focus-carbon sm:px-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              Next · {next.num}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors sm:text-base">{next.name}</span>
          </a>
        </div>
      </nav>
    </ViewShell>
  );
}

function CompanyHiringForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    hiringType: "Full-Time Permanent",
    roleTitle: "",
    primarySkills: "",
    experienceLevel: "Mid Level (2-5 yrs)",
    openingsCount: "1",
    workMode: "Hybrid",
    joiningTimeline: "Immediate (< 15 days)",
    jobDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fullMessage = `
[COMPANY HIRING REQUIREMENT SUBMISSION]
Company Name: ${formData.companyName}
Contact Person: ${formData.contactPerson}
Location: ${formData.location}
Hiring Type: ${formData.hiringType}
Role / Department: ${formData.roleTitle}
Primary Skills / Stack: ${formData.primarySkills}
Experience Level: ${formData.experienceLevel}
Number of Openings: ${formData.openingsCount}
Work Mode: ${formData.workMode}
Joining Timeline: ${formData.joiningTimeline}

Job Description & Requirements:
${formData.jobDescription}
      `.trim();

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.contactPerson} (${formData.companyName})`,
          email: formData.email,
          phone: formData.phone,
          service: "Recruitment & HR Solutions",
          budget: formData.hiringType,
          message: fullMessage,
        }),
      }).catch(() => null);

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="company-hiring-form" className="border-b border-hairline bg-white py-16 sm:py-24 scroll-mt-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="flex items-center justify-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary">
            <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
            Company Hiring Portal
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
            Drop Your Hiring & Talent Requirements
          </h2>
          <p className="mt-3 text-sm text-ink-muted leading-relaxed">
            Looking to hire top-tier developers, engineers, designers, or HR professionals? Submit your company requirements below — our recruitment team will reach out with pre-vetted candidate profiles.
          </p>
        </div>

        {submitted ? (
          <div className="border border-emerald-300/80 bg-emerald-50/60 p-8 sm:p-10 text-center space-y-4 animate-in fade-in duration-300">
            <div className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
              <CheckCircle2 className="size-7" />
            </div>
            <h3 className="text-2xl font-light text-slate-900">Requirement Submitted Successfully!</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Thank you, <strong className="text-slate-900">{formData.contactPerson}</strong>. Our senior HR & talent strategists at ABWcurious have received the details for <strong className="text-slate-900">{formData.companyName}</strong>. We will review your hiring profile and contact you at <span className="text-primary font-mono">{formData.email}</span> within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 border border-slate-300 bg-white text-xs font-mono uppercase tracking-wider text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Submit Another Requirement
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-hairline bg-ibm-layer p-6 sm:p-10 space-y-8">
            {/* Section 1: Company Information */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-ink border-b border-hairline pb-2 flex items-center gap-2">
                <span className="size-2 bg-primary inline-block"></span>
                1. Company & Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Company Name <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Solutions Pvt Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Contact Person & Designation <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins (Head of Talent)"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Official Work Email <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@acmetech.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Office Location / Headquarter City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Bengaluru, Remote, International"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Hiring & Position Details */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-ink border-b border-hairline pb-2 flex items-center gap-2">
                <span className="size-2 bg-primary inline-block"></span>
                2. Position & Hiring Requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Type of Hiring / Engagement
                  </label>
                  <select
                    value={formData.hiringType}
                    onChange={(e) => setFormData({ ...formData, hiringType: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="Full-Time Permanent">Full-Time Permanent</option>
                    <option value="Contractual / Deputation">Contractual / Deputation</option>
                    <option value="Executive Search">Executive Search</option>
                    <option value="Internship to Hire">Internship to Hire</option>
                    <option value="Fractional / Project-Based">Fractional / Project-Based</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Target Role / Department <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Primary Tech Stack & Skills <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. React.js, Node.js, Python, PostgreSQL, AWS"
                    value={formData.primarySkills}
                    onChange={(e) => setFormData({ ...formData, primarySkills: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Required Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="Entry Level (0-2 yrs)">Entry Level (0-2 yrs)</option>
                    <option value="Mid Level (2-5 yrs)">Mid Level (2-5 yrs)</option>
                    <option value="Senior Level (5-8 yrs)">Senior Level (5-8 yrs)</option>
                    <option value="Lead / Leadership (8+ yrs)">Lead / Leadership (8+ yrs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Number of Openings
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.openingsCount}
                    onChange={(e) => setFormData({ ...formData, openingsCount: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Work Mode
                  </label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Joining Timeline / Urgency
                  </label>
                  <select
                    value={formData.joiningTimeline}
                    onChange={(e) => setFormData({ ...formData, joiningTimeline: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="Immediate (< 15 days)">Immediate (&lt; 15 days)</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="Within 60 days">Within 60 days</option>
                    <option value="Exploring / Flexible">Exploring / Flexible</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Detailed Job Description / Specific Requirements <span className="text-ibm-danger">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the key responsibilities, team structure, or candidate preferences..."
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-ink-muted">
                🔒 Your company details are confidential and processed in compliance with strict privacy protocols.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting Requirement..." : "Submit Hiring Requirement"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
