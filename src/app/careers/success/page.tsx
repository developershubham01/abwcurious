"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/primitives";

function ApplicationSuccessContent() {
  const searchParams = useSearchParams();
  const appId = searchParams?.get("id") || "ABW-APP-2026-000123";
  const name = searchParams?.get("name") || "Candidate";
  const job = searchParams?.get("job") || "Open Position";

  return (
    <div className="bg-background min-h-screen text-ink pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white border border-hairline p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
        {/* Top Decorative accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#0e8345]"></div>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-[#0e8345]/10 border border-[#0e8345]/30 rounded-full flex items-center justify-center text-[#0e8345] mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Headline */}
        <div className="inline-block px-3 py-1 bg-[#0e8345]/10 text-[#0e8345] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
          Application Received
        </div>
        <h1 className="text-3xl sm:text-4xl font-light text-ink mb-3">
          Application Submitted <span className="font-normal text-primary">Successfully!</span>
        </h1>

        {/* Application ID Card */}
        <div className="my-6 p-4 bg-ibm-layer border border-hairline inline-block w-full max-w-md">
          <p className="text-xs text-ink-muted uppercase tracking-wider mb-1 font-mono">
            Application Reference ID
          </p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-primary tracking-wider select-all">
            {appId}
          </p>
        </div>

        {/* Core Message */}
        <div className="space-y-4 text-ink-muted text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          <p>
            Thank you <strong className="text-ink font-medium">{name}</strong> for applying to ABWcurious for the position of <strong className="text-ink font-medium">{job}</strong>.
          </p>
          <p className="text-xs sm:text-sm text-ibm-subtle">
            Our recruitment team will review your profile and Google Drive resume against our role requirements. If your skills match our team needs, we will contact you via email or phone using the details provided.
          </p>
        </div>

        {/* Next Steps Information */}
        <div className="p-5 bg-ibm-layer border border-hairline text-left text-xs text-ink-muted space-y-2 mb-8">
          <p className="font-mono font-semibold text-ink uppercase tracking-wider text-[11px]">What happens next?</p>
          <ul className="list-disc pl-5 space-y-1.5 text-ink-muted">
            <li><strong>Initial Screening:</strong> HR team evaluates candidate submissions (1–3 business days).</li>
            <li><strong>Technical / Functional Assessment:</strong> Shortlisted candidates receive interview invitations.</li>
            <li><strong>Keep Your Link Active:</strong> Ensure your Google Drive resume link remains set to &ldquo;Anyone with the link&rdquo; (Viewer).</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/careers"
            className="w-full sm:w-auto px-6 py-3.5 bg-primary text-white text-xs font-mono font-medium uppercase tracking-wider hover:bg-ibm-hover transition-colors flex items-center justify-center gap-2"
          >
            View More Jobs <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/careers"
            className="w-full sm:w-auto px-6 py-3.5 border border-hairline text-ink hover:border-ink text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Back to Careers Hub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-ink pt-32 text-center font-mono text-sm">Loading success page...</div>}>
      <ApplicationSuccessContent />
    </Suspense>
  );
}

