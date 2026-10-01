"use client";
import { useState } from "react";
import Link from "next/link";
import { JOBS_DATABASE, JobPosition, JobStatus } from "@/lib/jobs";
import { INITIAL_APPLICATIONS, CandidateApplication, ApplicationStatus } from "@/lib/applications";

export default function AdminCareersDashboard() {
  const [activeTab, setActiveTab] = useState<"applications" | "jobs" | "talent_pool" | "analytics">("applications");
  
  // Jobs state
  const [jobs, setJobs] = useState<JobPosition[]>(JOBS_DATABASE);
  
  // Applications state
  const [applications, setApplications] = useState<CandidateApplication[]>(INITIAL_APPLICATIONS);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [departmentFilter, setDepartmentFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Status Change Handler
  const updateCandidateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // Job Status Toggle Handler
  const toggleJobStatus = (id: string, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    if (activeTab === "talent_pool") {
      if (app.jobId !== "GENERAL_RESUME") return false;
    } else if (activeTab === "applications") {
      if (app.jobId === "GENERAL_RESUME") return false;
    }

    if (statusFilter !== "ALL" && app.status !== statusFilter) return false;
    if (departmentFilter !== "ALL") {
      const matchedJob = jobs.find((j) => j.id === app.jobId);
      if (!matchedJob || matchedJob.department !== departmentFilter) return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        app.fullName.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.applyingFor.toLowerCase().includes(q) ||
        app.primarySkills.toLowerCase().includes(q) ||
        app.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Metrics
  const totalApps = applications.length;
  const newApps = applications.filter((a) => a.status === "NEW").length;
  const shortlistedApps = applications.filter((a) => a.status === "SHORTLISTED").length;
  const interviewApps = applications.filter((a) => a.status === "INTERVIEW").length;
  const selectedApps = applications.filter((a) => a.status === "SELECTED").length;
  const talentPoolApps = applications.filter((a) => a.jobId === "GENERAL_RESUME").length;

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f4] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#262626] pb-6 mb-8 gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[#0f62fe]/10 text-[#0f62fe] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              Recruitment Management Console
            </div>
            <h1 className="text-3xl font-bold text-white">
              ABWcurious Admin Careers Dashboard
            </h1>
            <p className="text-[#a8a8a8] text-sm mt-1">
              Manage job vacancies, candidate applications, public Google Drive resumes, and talent pool pipelines.
            </p>
          </div>

          <Link
            href="/careers"
            target="_blank"
            className="px-4 py-2 border border-[#393939] hover:border-[#0f62fe] text-xs font-mono uppercase text-white transition-colors self-start md:self-auto"
          >
            View Public Careers Hub &rarr;
          </Link>
        </div>

        {/* Analytics Summary Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-[#161616] p-4 border border-[#262626]">
            <p className="text-[11px] font-mono text-[#a8a8a8] uppercase tracking-wider">Total Applications</p>
            <p className="text-2xl font-bold text-white mt-1">{totalApps}</p>
          </div>
          <div className="bg-[#161616] p-4 border border-[#0f62fe]/30">
            <p className="text-[11px] font-mono text-[#0f62fe] uppercase tracking-wider">New Submissions</p>
            <p className="text-2xl font-bold text-[#0f62fe] mt-1">{newApps}</p>
          </div>
          <div className="bg-[#161616] p-4 border border-[#f1c21b]/30">
            <p className="text-[11px] font-mono text-[#f1c21b] uppercase tracking-wider">Shortlisted</p>
            <p className="text-2xl font-bold text-[#f1c21b] mt-1">{shortlistedApps}</p>
          </div>
          <div className="bg-[#161616] p-4 border border-[#8a3ffC]/30">
            <p className="text-[11px] font-mono text-[#8a3ffc] uppercase tracking-wider">Interviews</p>
            <p className="text-2xl font-bold text-[#8a3ffc] mt-1">{interviewApps}</p>
          </div>
          <div className="bg-[#161616] p-4 border border-[#42be65]/30">
            <p className="text-[11px] font-mono text-[#42be65] uppercase tracking-wider">Selected / Joined</p>
            <p className="text-2xl font-bold text-[#42be65] mt-1">{selectedApps}</p>
          </div>
          <div className="bg-[#161616] p-4 border border-[#262626]">
            <p className="text-[11px] font-mono text-[#a8a8a8] uppercase tracking-wider">Talent Pool</p>
            <p className="text-2xl font-bold text-white mt-1">{talentPoolApps}</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#262626] mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "applications"
                ? "border-[#0f62fe] text-[#0f62fe] bg-[#161616]"
                : "border-transparent text-[#a8a8a8] hover:text-white"
            }`}
          >
            Job Applications ({applications.filter((a) => a.jobId !== "GENERAL_RESUME").length})
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "jobs"
                ? "border-[#0f62fe] text-[#0f62fe] bg-[#161616]"
                : "border-transparent text-[#a8a8a8] hover:text-white"
            }`}
          >
            Job Management ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("talent_pool")}
            className={`px-6 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "talent_pool"
                ? "border-[#0f62fe] text-[#0f62fe] bg-[#161616]"
                : "border-transparent text-[#a8a8a8] hover:text-white"
            }`}
          >
            Talent Pool ({talentPoolApps})
          </button>
        </div>

        {/* TAB 1 & 3: APPLICATIONS & TALENT POOL */}
        {(activeTab === "applications" || activeTab === "talent_pool") && (
          <div>
            {/* Filter Bar */}
            <div className="bg-[#161616] p-4 border border-[#262626] mb-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by candidate name, skills, email, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#262626] border border-[#393939] text-white text-xs px-4 py-2 focus:outline-none focus:border-[#0f62fe]"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#262626] border border-[#393939] text-white text-xs px-3 py-2 focus:outline-none focus:border-[#0f62fe]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="SCREENING">Screening</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="SELECTED">Selected</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="ON_HOLD">On Hold</option>
                </select>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-[#262626] border border-[#393939] text-white text-xs px-3 py-2 focus:outline-none focus:border-[#0f62fe]"
                >
                  <option value="ALL">All Departments</option>
                  <option value="Technology">Technology</option>
                  <option value="Business & Sales">Business & Sales</option>
                  <option value="Marketing & Creative">Marketing & Creative</option>
                  <option value="HR & Recruitment">HR & Recruitment</option>
                  <option value="Operations & Analytics">Operations</option>
                </select>
              </div>
            </div>

            {/* Applications List */}
            {filteredApps.length === 0 ? (
              <div className="p-12 text-center bg-[#161616] border border-[#262626] text-[#a8a8a8] font-mono text-sm">
                No candidates found matching the active filters.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-[#161616] border border-[#262626] p-6 hover:border-[#393939] transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#262626] pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-xs text-[#0f62fe] font-bold">{app.id}</span>
                          <span className="text-xs text-[#6f6f6f]">&bull;</span>
                          <span className="text-xs text-[#a8a8a8]">{app.createdAt}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                          {app.fullName}
                          <span className="text-xs font-normal text-[#a8a8a8] bg-[#262626] px-2 py-0.5 border border-[#393939]">
                            {app.experienceLevel}
                          </span>
                        </h3>
                        <p className="text-xs text-[#c6c6c6] mt-1">
                          Applied for: <strong className="text-white">{app.applyingFor}</strong> &bull; Location: {app.location}
                        </p>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-3 py-1 text-xs font-mono font-semibold uppercase ${
                            app.status === "NEW"
                              ? "bg-[#0f62fe]/20 text-[#0f62fe] border border-[#0f62fe]/40"
                              : app.status === "SHORTLISTED"
                              ? "bg-[#f1c21b]/20 text-[#f1c21b] border border-[#f1c21b]/40"
                              : app.status === "INTERVIEW"
                              ? "bg-[#8a3ffc]/20 text-[#8a3ffc] border border-[#8a3ffc]/40"
                              : app.status === "SELECTED"
                              ? "bg-[#42be65]/20 text-[#42be65] border border-[#42be65]/40"
                              : app.status === "REJECTED"
                              ? "bg-[#da1e28]/20 text-[#ff8389] border border-[#da1e28]/40"
                              : "bg-[#262626] text-[#a8a8a8] border border-[#393939]"
                          }`}
                        >
                          {app.status}
                        </span>

                        {/* Resume View Button */}
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#0f62fe] hover:bg-[#0353e9] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                        >
                          <span>View Resume (Google Drive)</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Candidate Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#a8a8a8]">
                      <div>
                        <span className="block font-mono uppercase text-[10px] text-[#6f6f6f]">Contact</span>
                        <p className="text-white font-mono mt-0.5">{app.email}</p>
                        <p className="text-[#c6c6c6] mt-0.5">{app.phone}</p>
                      </div>

                      <div>
                        <span className="block font-mono uppercase text-[10px] text-[#6f6f6f]">Education & Company</span>
                        <p className="text-white mt-0.5">{app.highestQualification} ({app.college || "N/A"})</p>
                        <p className="text-[#c6c6c6] mt-0.5">Current: {app.currentCompany || "Fresh Graduate"}</p>
                      </div>

                      <div>
                        <span className="block font-mono uppercase text-[10px] text-[#6f6f6f]">Salary & Notice</span>
                        <p className="text-white mt-0.5">Exp: {app.expectedSalary || "As per policy"}</p>
                        <p className="text-[#c6c6c6] mt-0.5">Notice: {app.noticePeriod}</p>
                      </div>

                      <div>
                        <span className="block font-mono uppercase text-[10px] text-[#6f6f6f]">Primary Skills</span>
                        <p className="text-white mt-0.5 line-clamp-2">{app.primarySkills}</p>
                      </div>
                    </div>

                    {/* Quick Status Change Actions */}
                    <div className="mt-4 pt-4 border-t border-[#262626] flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#6f6f6f] uppercase">Update Status:</span>
                      <button
                        onClick={() => updateCandidateStatus(app.id, "SHORTLISTED")}
                        className="px-2.5 py-1 bg-[#262626] hover:bg-[#393939] text-[#f1c21b] border border-[#393939]"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateCandidateStatus(app.id, "INTERVIEW")}
                        className="px-2.5 py-1 bg-[#262626] hover:bg-[#393939] text-[#8a3ffc] border border-[#393939]"
                      >
                        Schedule Interview
                      </button>
                      <button
                        onClick={() => updateCandidateStatus(app.id, "SELECTED")}
                        className="px-2.5 py-1 bg-[#262626] hover:bg-[#393939] text-[#42be65] border border-[#393939]"
                      >
                        Select
                      </button>
                      <button
                        onClick={() => updateCandidateStatus(app.id, "REJECTED")}
                        className="px-2.5 py-1 bg-[#262626] hover:bg-[#393939] text-[#ff8389] border border-[#393939]"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: JOBS MANAGEMENT */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="bg-[#161616] p-4 border border-[#262626] flex items-center justify-between">
              <p className="text-xs text-[#a8a8a8] font-mono">
                Active Job Vacancies: {jobs.filter((j) => j.status === "OPEN").length} / Total Listed: {jobs.length}
              </p>
              <Link
                href="/careers"
                target="_blank"
                className="text-xs text-[#0f62fe] font-mono hover:underline"
              >
                + View Public Job Postings Page
              </Link>
            </div>

            <div className="bg-[#161616] border border-[#262626] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#262626] text-[#a8a8a8] uppercase border-b border-[#393939]">
                  <tr>
                    <th className="p-4">Job Title & ID</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Openings</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-[#1f1f1f]">
                      <td className="p-4">
                        <Link href={`/careers/${j.slug}`} target="_blank" className="font-bold text-white hover:text-[#0f62fe] block">
                          {j.title}
                        </Link>
                        <span className="text-[10px] text-[#6f6f6f]">{j.id}</span>
                      </td>
                      <td className="p-4 text-[#c6c6c6]">{j.department}</td>
                      <td className="p-4 text-[#c6c6c6]">{j.location}</td>
                      <td className="p-4 text-[#c6c6c6]">{j.experience}</td>
                      <td className="p-4 text-[#c6c6c6]">{j.openings}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                            j.status === "OPEN"
                              ? "bg-[#42be65]/20 text-[#42be65] border border-[#42be65]/40"
                              : "bg-[#da1e28]/20 text-[#ff8389] border border-[#da1e28]/40"
                          }`}
                        >
                          {j.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() =>
                            toggleJobStatus(j.id, j.status === "OPEN" ? "CLOSED" : "OPEN")
                          }
                          className="px-3 py-1 bg-[#262626] hover:bg-[#393939] text-white border border-[#393939] text-[11px]"
                        >
                          {j.status === "OPEN" ? "Close Job" : "Publish Job"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
