"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateGoogleDriveUrl } from "@/lib/applications";

export default function SubmitGeneralResumePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    location: "",
    experienceLevel: "0-1 Years (Entry Level / Freshers)",
    preferredRole: "Full Stack / Frontend / Backend",
    primarySkills: "",
    highestQualification: "Bachelor's Degree",
    resumeUrl: "",
    coverMessage: "",
    privacyAccepted: false,
    honeypot: "",
  });

  const [driveUrlValid, setDriveUrlValid] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleResumeUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, resumeUrl: url }));
    if (!url.trim()) {
      setDriveUrlValid(null);
    } else {
      setDriveUrlValid(validateGoogleDriveUrl(url).valid);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required contact details.");
      return;
    }
    if (!formData.resumeUrl.trim() || !validateGoogleDriveUrl(formData.resumeUrl).valid) {
      setErrorMessage("Please provide a valid public Google Drive resume URL.");
      return;
    }
    if (!formData.privacyAccepted) {
      setErrorMessage("You must accept the privacy notice to submit your profile to our talent pool.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applyingFor: `Talent Pool (${formData.preferredRole})`,
          jobId: "GENERAL_RESUME",
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit resume.");
      }

      router.push(
        `/careers/success?id=${data.applicationId}&name=${encodeURIComponent(
          formData.fullName
        )}&job=${encodeURIComponent("General Talent Pool")}`
      );
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting your resume.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen text-ink">
      {/* Header — About Page Theme */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm mb-4">
            <Link href="/careers" className="hover:underline text-ink-muted">
              Careers
            </Link>
            <span className="text-ibm-subtle">/</span>
            <span className="text-ink font-semibold">Submit Resume</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-ink">
            Submit Resume for <span className="font-normal text-primary">Future Roles</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            Can&apos;t find an exact open position matching your profile? Submit your public Google Drive resume link to our candidate database. Our HR team reviews talent pool profiles for upcoming roles.
          </p>
        </div>
      </section>

      {/* Main Form Body */}
      <section className="py-12 sm:py-16 bg-ibm-layer">
        <div className="mx-auto max-w-4xl px-6">
          {errorMessage && (
            <div className="mb-8 p-4 bg-[#fff0f1] border border-ibm-danger text-ibm-danger text-sm">
              <p className="font-semibold">Submission Error</p>
              <p className="mt-0.5 text-xs text-ink">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Section 1 */}
            <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-normal text-ink border-b border-hairline pb-4">
                Candidate Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Full Name <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Email Address <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="candidate@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Phone Number <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Navi Mumbai / Mumbai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="0-1 Years (Entry Level / Freshers)">0–1 Years (Entry Level / Freshers)</option>
                    <option value="Internship (College / Fresh Graduate)">Internship (College / Fresh Graduate)</option>
                    <option value="1-3 Years (Junior)">1–3 Years (Junior)</option>
                    <option value="3-5 Years (Mid-level)">3–5 Years (Mid-level)</option>
                    <option value="5+ Years (Senior)">5+ Years (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Preferred Department / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full Stack Developer, Marketing, HR"
                    value={formData.preferredRole}
                    onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Primary Skills & Technologies
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React.js, Python, Node.js, Marketing, Sales"
                    value={formData.primarySkills}
                    onChange={(e) => setFormData({ ...formData, primarySkills: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-hairline p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-normal text-ink border-b border-hairline pb-4">
                Google Drive Resume Link <span className="text-ibm-danger">*</span>
              </h2>

              <div className="p-4 bg-ibm-layer border border-hairline text-xs text-ink-muted space-y-1">
                <p className="font-mono font-semibold text-ink uppercase tracking-wider text-[11px]">
                  Google Drive Share Instructions:
                </p>
                <p>Upload resume to Google Drive &rarr; Share &rarr; Set General Access to <strong>&ldquo;Anyone with the link&rdquo; (Viewer)</strong> &rarr; Copy & paste URL below.</p>
              </div>

              <div>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/123456789/view?usp=sharing"
                  value={formData.resumeUrl}
                  onChange={(e) => handleResumeUrlChange(e.target.value)}
                  className={`w-full bg-white border text-ink text-sm px-4 py-3 focus:outline-none font-mono transition-colors ${driveUrlValid === true
                    ? "border-[#0e8345] ring-1 ring-[#0e8345]"
                    : driveUrlValid === false
                      ? "border-ibm-danger ring-1 ring-ibm-danger"
                      : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                />
                {driveUrlValid === true && (
                  <p className="text-xs text-[#0e8345] font-mono mt-1.5">
                    ✓ Valid Google Drive link format detected.
                  </p>
                )}
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.privacyAccepted}
                  onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-primary bg-white border-hairline accent-primary"
                />
                <label htmlFor="consent" className="text-xs text-ink-muted leading-relaxed">
                  I agree that ABWcurious Pvt. Ltd. may keep my resume link in their talent pool database for future hiring consideration.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-hairline">
                <Link
                  href="/careers"
                  className="text-xs font-mono text-ink-muted hover:text-ink uppercase tracking-wider"
                >
                  &larr; Return to Careers
                </Link>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-sm font-medium hover:bg-ibm-hover disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Submitting Resume..." : "Submit Resume to Talent Pool"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
