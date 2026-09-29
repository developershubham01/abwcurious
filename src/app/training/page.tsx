import type { Metadata } from "next";
import Link from "next/link";
import { TrainingSection } from "@/components/site/training-section";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Training for What's Next — ABWcurious Learning Pathways",
  description:
    "Elevate your career readiness with Student Pathways, Foundational Skills, and Professional Training programs engineered by ABWcurious in Nerul, Navi Mumbai, India.",
};

export default function TrainingPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none bg-ibm-layer">
      {/* Page Header Banner */}
      <section className="bg-white border-b border-hairline py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ibm-blue/20 bg-ibm-blue/5 px-3.5 py-1 text-xs font-semibold text-ibm-blue">
              <Sparkles className="h-3.5 w-3.5 text-ibm-cyan" />
              <span>Future-Ready Engineering Academy</span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink font-sans">
              Training for <br className="hidden sm:inline" />
              what&apos;s next
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed font-light">
              Elevate your career readiness with specialized learning paths, hands-on production capstones, and direct mentorship from the engineering team at ABWcurious.
            </p>
          </div>
        </div>
      </section>

      {/* The 3 Main Pathways Grid Section */}
      <TrainingSection showHeading={false} className="bg-white py-12 md:py-16" />

      {/* Why Train with ABWcurious */}
      <section className="py-16 md:py-24 border-t border-hairline bg-ibm-layer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-ibm-blue">The ABWcurious Difference</span>
              <h2 className="mt-2 text-3xl font-light text-ink">
                Built by practitioners who ship software every day.
              </h2>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Traditional bootcamps teach obsolete boilerplates. At ABWcurious, our curriculum is pulled directly from our production client codebases: Next.js App Router, TypeScript, PostgreSQL, and enterprise RAG systems.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-hairline bg-white p-6 shadow-xs">
                <CheckCircle2 className="h-6 w-6 text-ibm-blue" />
                <h3 className="mt-3 text-sm font-semibold text-ink">Production Capstones</h3>
                <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                  No toy todo-apps. You build and deploy real SaaS products with authentication, databases, and CI/CD pipelines.
                </p>
              </div>
              <div className="rounded-2xl border border-hairline bg-white p-6 shadow-xs">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink">Direct Senior Mentorship</h3>
                <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                  Weekly 1-on-1 code reviews and architectural coaching from tech leads at ABWcurious.
                </p>
              </div>
              <div className="rounded-2xl border border-hairline bg-white p-6 shadow-xs">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink">Modern AI Integration</h3>
                <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                  Learn to build with AI: embeddings, vector databases, local open weights, and developer copilots.
                </p>
              </div>
              <div className="rounded-2xl border border-hairline bg-white p-6 shadow-xs">
                <CheckCircle2 className="h-6 w-6 text-amber-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink">Career & Hiring Pipeline</h3>
                <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                  Top performers receive fast-track interview consideration for roles and internships at ABWcurious and partner startups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
