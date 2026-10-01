"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { JOBS_DATABASE, getJobBySlug, JobPosition } from "@/lib/jobs";
import { validateGoogleDriveUrl } from "@/lib/applications";
import { Reveal } from "@/components/site/primitives";
import { ArrowLeft, ArrowRight, Check, AlertTriangle, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

function ApplicationFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobSlugParam = searchParams?.get("job") || "";
  const isGeneralParam = searchParams?.get("type") === "general";

  const [selectedJobSlug, setSelectedJobSlug] = useState<string>(jobSlugParam);
  const [selectedJob, setSelectedJob] = useState<JobPosition | undefined>(
    getJobBySlug(jobSlugParam)
  );

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    location: "",
    city: "",
    state: "",
    country: "India",
    applyingFor: "",
    jobId: "",
    experienceLevel: "0-1 Years (Entry Level / Freshers)",
    currentJobTitle: "",
    experienceYears: "0",
    currentCompany: "",
    noticePeriod: "Immediate",
    expectedSalary: "",
    primarySkills: "",
    secondarySkills: "",
    technologies: "",
    highestQualification: "Bachelor's Degree",
    college: "",
    graduationYear: new Date().getFullYear().toString(),
    workMode: "Hybrid",
    preferredLocation: "Navi Mumbai / Remote",
    coverMessage: "",
    resumeUrl: "",
    source: "Website",
    privacyAccepted: false,
    honeypot: "", // anti-spam
  });

  const [driveUrlValid, setDriveUrlValid] = useState<boolean | null>(null);
  const [showDriveGuide, setShowDriveGuide] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (selectedJobSlug) {
      const job = getJobBySlug(selectedJobSlug);
      if (job) {
        setSelectedJob(job);
        setFormData((prev) => ({
          ...prev,
          applyingFor: job.title,
          jobId: job.id,
          experienceLevel: job.experience,
        }));
      }
    } else if (isGeneralParam) {
      setFormData((prev) => ({
        ...prev,
        applyingFor: "General Talent Pool",
        jobId: "GENERAL_RESUME",
      }));
    }
  }, [selectedJobSlug, isGeneralParam]);

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

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }
    if (!formData.location.trim()) {
      setErrorMessage("Please enter your current location.");
      return;
    }
    if (!formData.applyingFor.trim()) {
      setErrorMessage("Please select or specify the position you are applying for.");
      return;
    }
    if (!formData.primarySkills.trim()) {
      setErrorMessage("Please specify your primary technical or professional skills.");
      return;
    }
    if (!formData.highestQualification.trim()) {
      setErrorMessage("Please select your highest qualification.");
      return;
    }
    if (!formData.resumeUrl.trim()) {
      setErrorMessage("Please provide your public Google Drive resume link.");
      return;
    }
    if (!validateGoogleDriveUrl(formData.resumeUrl).valid) {
      setErrorMessage(
        "Invalid Google Drive URL. Please paste a valid public link starting with https://drive.google.com/ or https://docs.google.com/"
      );
      return;
    }
    if (!formData.privacyAccepted) {
      setErrorMessage("You must accept the privacy policy to submit your application.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application.");
      }

      // Redirect to success page with application ID
      router.push(`/careers/success?id=${data.applicationId}&name=${encodeURIComponent(formData.fullName)}&job=${encodeURIComponent(formData.applyingFor)}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen text-ink">
      {/* Page Header — About Page Theme */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm mb-4">
              <Link href="/careers" className="hover:underline text-ink-muted">
                Careers
              </Link>
              <span className="text-ibm-subtle">/</span>
              {selectedJob ? (
                <Link href={`/careers/${selectedJob.slug}`} className="hover:underline text-ink-muted">
                  {selectedJob.title}
                </Link>
              ) : (
                <span className="text-ink-muted">Apply</span>
              )}
              <span className="text-ibm-subtle">/</span>
              <span className="text-ink font-semibold">Candidate Application</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-ink">
              Online Candidate <span className="font-normal text-primary">Application</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-ink-muted leading-relaxed">
              {selectedJob ? (
                <>
                  Applying for <strong className="text-ink font-medium">{selectedJob.title}</strong> ({selectedJob.department} &bull; {selectedJob.location})
                </>
              ) : (
                "Submit your professional profile and Google Drive resume to join ABWcurious."
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Form Body */}
      <section className="py-12 sm:py-16 lg:py-20 bg-ibm-layer">
        <div className="mx-auto max-w-5xl px-6">
          {/* Submission Error Callout */}
          {errorMessage && (
            <Reveal className="mb-8">
              <div className="p-4 bg-[#fff0f1] border border-ibm-danger text-ibm-danger text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Submission Error</p>
                  <p className="mt-0.5 text-xs text-ink">{errorMessage}</p>
                </div>
              </div>
            </Reveal>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot for spam bots */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Section 1: Role & Work Preferences */}
            <Reveal>
              <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-hairline pb-4">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-mono font-bold flex items-center justify-center">
                    01
                  </span>
                  <h2 className="text-lg font-normal text-ink tracking-tight">
                    Position & Work Preferences
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Applying For Position <span className="text-ibm-danger">*</span>
                    </label>
                    <select
                      value={selectedJobSlug}
                      onChange={(e) => setSelectedJobSlug(e.target.value)}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">General Talent Pool (Any Suitable Role)</option>
                      {JOBS_DATABASE.map((j) => (
                        <option key={j.id} value={j.slug}>
                          {j.title} ({j.department} &bull; {j.experience})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Experience Level <span className="text-ibm-danger">*</span>
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
                      <option value="5+ Years (Senior / Management)">5+ Years (Senior / Management)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Preferred Work Mode <span className="text-ibm-danger">*</span>
                    </label>
                    <select
                      value={formData.workMode}
                      onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="Hybrid">Hybrid (Navi Mumbai Office + Remote)</option>
                      <option value="On-site">On-site (Navi Mumbai / Mumbai Office)</option>
                      <option value="Remote">Remote (Willing to work virtually)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Navi Mumbai, Mumbai, Remote"
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Section 2: Personal & Contact Information */}
            <Reveal delay={0.05}>
              <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-hairline pb-4">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-mono font-bold flex items-center justify-center">
                    02
                  </span>
                  <h2 className="text-lg font-normal text-ink tracking-tight">
                    Personal & Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Full Name <span className="text-ibm-danger">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
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
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Same as phone or separate number"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                    />
                  </div>

                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                        Current City / Location <span className="text-ibm-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Navi Mumbai / Thane"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value, city: e.target.value })}
                        className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Section 3: Professional Profile & Education */}
            <Reveal delay={0.1}>
              <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-hairline pb-4">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-mono font-bold flex items-center justify-center">
                    03
                  </span>
                  <h2 className="text-lg font-normal text-ink tracking-tight">
                    Professional Profile & Qualification
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Current / Previous Designation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Trainee Recruiter / HR Intern"
                      value={formData.currentJobTitle}
                      onChange={(e) => setFormData({ ...formData, currentJobTitle: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      College / Previous Employer
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai University / Tech Corp"
                      value={formData.currentCompany}
                      onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Notice Period / Availability
                    </label>
                    <select
                      value={formData.noticePeriod}
                      onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="Immediate">Immediate / Available Now</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="45+ Days">45+ Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Highest Qualification <span className="text-ibm-danger">*</span>
                    </label>
                    <select
                      value={formData.highestQualification}
                      onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="Bachelor's Degree">B.E. / B.Tech / B.Sc / BCA / BBA (Bachelor's)</option>
                      <option value="Master's Degree">M.E. / M.Tech / M.Sc / MCA / MBA (Master's)</option>
                      <option value="Diploma">Diploma (Polytechnic / IT)</option>
                      <option value="Higher Secondary / Other">12th Standard / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      College / University Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai University / VJTI"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                      Primary Skills & Competencies <span className="text-ibm-danger">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourcing, Screening, Communication, React, Node.js, Excel"
                      value={formData.primarySkills}
                      onChange={(e) => setFormData({ ...formData, primarySkills: e.target.value })}
                      className="w-full bg-white border border-hairline text-ink text-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Section 4: Public Google Drive Resume */}
            <Reveal delay={0.15}>
              <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-mono font-bold flex items-center justify-center">
                      04
                    </span>
                    <h2 className="text-lg font-normal text-ink tracking-tight">
                      Resume / CV (Public Google Drive Link) <span className="text-ibm-danger">*</span>
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowDriveGuide(!showDriveGuide)}
                    className="text-xs text-primary hover:underline font-mono"
                  >
                    {showDriveGuide ? "Hide Link Guide" : "Link Setup Guide"}
                  </button>
                </div>

                {/* Google Drive Guide Card */}
                {showDriveGuide && (
                  <div className="p-5 bg-ibm-layer border border-hairline text-xs text-ink-muted space-y-2">
                    <p className="font-mono font-semibold text-ink uppercase tracking-wider text-[11px] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      How to share your Google Drive resume link:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1.5 text-ink-muted">
                      <li>Upload your resume file (PDF or DOCX) to <strong>Google Drive</strong>.</li>
                      <li>Right-click the uploaded file and select <strong>Share &rarr; Share</strong>.</li>
                      <li>Under <strong>General Access</strong>, change setting from <em>Restricted</em> to <strong>&ldquo;Anyone with the link&rdquo;</strong>.</li>
                      <li>Ensure access level is set to <strong>Viewer</strong>.</li>
                      <li>Click <strong>Copy link</strong> and paste below.</li>
                    </ol>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider">
                    Google Drive Public Share Link <span className="text-ibm-danger">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/file/d/123456789/view?usp=sharing"
                    value={formData.resumeUrl}
                    onChange={(e) => handleResumeUrlChange(e.target.value)}
                    className={`w-full bg-white border text-ink text-sm px-4 py-3 focus:outline-none transition-colors font-mono ${
                      driveUrlValid === true
                        ? "border-[#0e8345] ring-1 ring-[#0e8345]"
                        : driveUrlValid === false
                        ? "border-ibm-danger ring-1 ring-ibm-danger"
                        : "border-hairline focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />

                  {driveUrlValid === true && (
                    <p className="text-xs text-[#0e8345] font-mono flex items-center gap-1 mt-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Valid Google Drive link format detected.
                    </p>
                  )}
                  {driveUrlValid === false && (
                    <p className="text-xs text-ibm-danger font-mono flex items-center gap-1 mt-1.5">
                      <AlertTriangle className="w-4 h-4" /> Link must start with https://drive.google.com/ or https://docs.google.com/
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-ink uppercase tracking-wider mb-2">
                    Cover Note / Message for Hiring Manager
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly share why you are interested in joining ABWcurious or key highlights of your career..."
                    value={formData.coverMessage}
                    onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
                    className="w-full bg-white border border-hairline text-ink text-sm p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-ibm-subtle"
                  />
                </div>
              </div>
            </Reveal>

            {/* Section 5: Consent & Submit */}
            <Reveal delay={0.2}>
              <div className="bg-white border border-hairline p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    required
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="mt-1 w-4 h-4 text-primary bg-white border-hairline focus:ring-0 accent-primary"
                  />
                  <label htmlFor="privacyAccepted" className="text-xs text-ink-muted leading-relaxed">
                    I agree that <strong>ABWcurious Pvt. Ltd.</strong> may store and evaluate my submitted information and resume for recruitment and hiring purposes in accordance with the{" "}
                    <Link href="/privacy" className="text-primary underline hover:text-ink">
                      Privacy Policy
                    </Link>
                    . Applications remain confidential and accessible only to hiring team members.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-hairline">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" /> Return to Open Roles
                  </Link>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-sm font-medium hover:bg-ibm-hover disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function ApplicationFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-ink pt-32 text-center font-mono text-sm">Loading application form...</div>}>
      <ApplicationFormContent />
    </Suspense>
  );
}

