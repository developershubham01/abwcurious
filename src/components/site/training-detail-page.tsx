"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  GraduationCap,
  Layers,
  Sparkles,
  Award,
  Send,
  Users,
  Compass,
} from "lucide-react";
import { TrainingTrack, TRAINING_TRACKS } from "@/data/training";
import { cn } from "@/lib/utils";

export function TrainingDetailPage({ track }: { track: TrainingTrack }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "Student / Recent Graduate",
    message: "",
  });

  const otherTracks = TRAINING_TRACKS.filter((t) => t.slug !== track.slug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <article className="min-h-screen bg-ibm-layer text-ink selection:bg-ibm-blue selection:text-white">
      {/* ─── Breadcrumb & Top Bar ─────────────────────────────────────────── */}
      <div className="border-b border-hairline bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-ink-muted">
            <Link href="/" className="hover:text-ibm-blue transition">Home</Link>
            <span>/</span>
            <Link href="/training" className="hover:text-ibm-blue transition">Training</Link>
            <span>/</span>
            <span className="text-ink font-medium">{track.title}</span>
          </nav>
          <Link
            href="/training"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ibm-blue hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Pathways</span>
          </Link>
        </div>
      </div>

      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-hairline py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-ibm-blue/20 bg-ibm-blue/5 px-3.5 py-1 text-xs font-semibold text-ibm-blue">
                <Sparkles className="h-3.5 w-3.5 text-ibm-cyan" />
                <span>{track.badge}</span>
                <span className="text-ibm-blue/40">·</span>
                <span>Track {track.num}</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-ink font-sans">
                {track.title}
              </h1>

              <p className="mt-4 text-lg text-ink-muted leading-relaxed font-light">
                {track.tagline}
              </p>

              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                {track.description}
              </p>

              {/* Meta Specs Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-hairline pt-6">
                <div>
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock className="h-3.5 w-3.5 text-ibm-blue" /> Duration
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">{track.duration}</p>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Compass className="h-3.5 w-3.5 text-ibm-blue" /> Format
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">{track.format}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <GraduationCap className="h-3.5 w-3.5 text-ibm-blue" /> Level
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">{track.level}</p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#enroll"
                  className="inline-flex items-center gap-2 rounded-lg bg-ibm-blue px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-ibm-blue/90 hover:shadow-lg transition-all"
                >
                  <span>Apply for this Pathway</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 rounded-lg border border-hairline-strong bg-white px-5 py-3 text-sm font-medium text-ink hover:bg-ibm-layer transition"
                >
                  <span>View Curriculum</span>
                </a>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className={cn("relative w-full max-w-md rounded-3xl p-8 overflow-hidden shadow-lg border border-hairline", track.bgClass)}>
                <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 rounded-full overflow-hidden shadow-md ring-8 ring-white/90">
                  <Image
                    src={track.image}
                    alt={track.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 200px, 240px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-white/90 backdrop-blur-sm p-4 border border-white/60">
                  <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Key Highlights</p>
                  <ul className="mt-2.5 space-y-2">
                    {track.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-ink leading-snug">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Track Stats Bar ─────────────────────────────────────────────── */}
      <section className="border-b border-hairline bg-ibm-layer py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
            {track.stats.map((stat, i) => (
              <div key={i} className="px-4 py-2 text-center sm:text-left">
                <p className="text-3xl sm:text-4xl font-light text-ibm-blue font-mono">{stat.value}</p>
                <p className="mt-1 text-xs text-ink-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Overview & Details ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-hairline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-ibm-blue">Overview</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-light text-ink">
                Why we created the {track.title}
              </h2>

              <div className="mt-6 space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                {track.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="mt-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                  Core Technologies & Skills You Will Master
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {track.skillsAcquired.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-ibm-layer px-3.5 py-1.5 text-xs font-medium text-ink shadow-xs"
                    >
                      <Layers className="h-3 w-3 text-ibm-blue" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Audience & Certification */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-hairline bg-ibm-layer p-6">
                <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                  <Users className="h-4 w-4 text-ibm-blue" />
                  <span>Who This Pathway Is For</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {track.whoIsThisFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted">
                      <CheckCircle2 className="h-4 w-4 text-ibm-blue shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-hairline bg-ibm-layer p-6">
                <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span>Certification & Verification</span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {track.certification}
                </p>
                <p className="mt-3 text-xs text-ink-muted">
                  <strong>Prerequisites:</strong> {track.prerequisites}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Detailed Curriculum ─────────────────────────────────────────── */}
      <section id="curriculum" className="py-16 md:py-24 bg-ibm-layer border-b border-hairline scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-ibm-blue">Syllabus Breakdown</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-light text-ink">
              Comprehensive Week-by-Week Curriculum
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              Every module is accompanied by coding assignments, live code reviews, and production capstone deployments.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {track.curriculum.map((mod, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-hairline bg-white p-6 shadow-xs hover:border-ibm-blue/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-ibm-blue font-semibold">{mod.weeks}</span>
                    <span className="rounded-full bg-ibm-layer px-2.5 py-0.5 text-[11px] text-ink-muted">
                      Module 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink">{mod.module}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">{mod.summary}</p>

                  <div className="mt-4 border-t border-hairline pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Topics Covered:</p>
                    <ul className="mt-2 space-y-1.5">
                      {mod.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-ink-muted leading-snug">
                          <span className="h-1 w-1 rounded-full bg-ibm-blue mt-1.5 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Enrollment / Inquiry Form ────────────────────────────────────── */}
      <section id="enroll" className="py-16 md:py-24 bg-white border-b border-hairline scroll-mt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-hairline-strong bg-ibm-layer p-8 sm:p-12 shadow-lg">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-ibm-blue">Enrollment & Inquiries</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-light text-ink">
                Ready to begin the {track.title}?
              </h2>
              <p className="mt-3 text-sm text-ink-muted">
                Submit your application or request a consultation. Our academic advisors in Nerul, Navi Mumbai will reach out within 24 hours with schedule details and cohort availability.
              </p>
            </div>

            {formSubmitted ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <h3 className="mt-4 text-lg font-semibold text-emerald-950">Application Received!</h3>
                <p className="mt-2 text-sm text-emerald-800">
                  Thank you for applying for the <strong>{track.title}</strong>. An advisor from ABWcurious will contact you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-hairline-strong bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ibm-blue focus:outline-none focus:ring-1 focus:ring-ibm-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-hairline-strong bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ibm-blue focus:outline-none focus:ring-1 focus:ring-ibm-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1.5">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-hairline-strong bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ibm-blue focus:outline-none focus:ring-1 focus:ring-ibm-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1.5">Current Background</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full rounded-xl border border-hairline-strong bg-white px-3.5 py-2.5 text-sm text-ink focus:border-ibm-blue focus:outline-none focus:ring-1 focus:ring-ibm-blue"
                    >
                      <option value="Student / Recent Graduate">College Student / Recent Graduate</option>
                      <option value="Working Professional (1-3 yrs)">Working Professional (1-3 yrs)</option>
                      <option value="Senior Engineer / Tech Lead">Senior Engineer / Tech Lead</option>
                      <option value="Career Switcher">Career Switcher</option>
                      <option value="Corporate / Team Inquiry">Corporate / Team Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink mb-1.5">Questions or Specific Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about what you want to achieve or any questions regarding schedule and prerequisites..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-hairline-strong bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ibm-blue focus:outline-none focus:ring-1 focus:ring-ibm-blue"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-ink-muted">
                    Or email directly to <a href="mailto:info@abwcurious.com" className="text-ibm-blue underline">info@abwcurious.com</a>
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ibm-blue px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-ibm-blue/90 hover:shadow-lg transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── Explore Other Pathways ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-ibm-layer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ibm-blue">Explore More</span>
              <h2 className="mt-1 text-2xl font-light text-ink">Other Learning Pathways</h2>
            </div>
            <Link
              href="/training"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ibm-blue hover:underline"
            >
              <span>View all pathways</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherTracks.map((other) => (
              <Link
                key={other.slug}
                href={`/training/${other.slug}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-2xl border border-hairline bg-white p-6 shadow-xs hover:border-ibm-blue hover:shadow-md transition-all"
              >
                <div className={cn("relative h-24 w-24 rounded-full overflow-hidden shrink-0 ring-4 ring-white shadow-xs", other.bgClass)}>
                  <Image
                    src={other.image}
                    alt={other.imageAlt}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ibm-blue">
                    Track {other.num} · {other.badge}
                  </span>
                  <h3 className="text-base font-semibold text-ink group-hover:text-ibm-blue transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-muted line-clamp-2">{other.tagline}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ibm-blue">
                    <span>{other.linkText}</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
