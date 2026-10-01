export type ApplicationStatus = "NEW" | "SCREENING" | "SHORTLISTED" | "INTERVIEW" | "SELECTED" | "REJECTED" | "ON_HOLD";

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applyingFor: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  experienceLevel: string;
  currentJobTitle?: string;
  experienceYears: string;
  currentCompany?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  primarySkills: string;
  secondarySkills?: string;
  frameworks?: string;
  tools?: string;
  highestQualification: string;
  degree?: string;
  college?: string;
  graduationYear?: string;
  workModePreference?: string;
  preferredLocation?: string;
  coverMessage?: string;
  resumeUrl: string;
  privacyConsent: boolean;
  status: ApplicationStatus;
  source: string;
  createdAt: string;
  type: "JOB_APPLICATION" | "TALENT_POOL";
}

export const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: "ABW-APP-2026-001089",
    jobId: "JOB-2026-001",
    jobTitle: "Frontend Developer (Next.js & React)",
    applyingFor: "Frontend Developer (Next.js & React)",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98201 12345",
    location: "Navi Mumbai, MH",
    experienceLevel: "0–1 Years",
    experienceYears: "1",
    currentJobTitle: "Junior Frontend Developer",
    currentCompany: "TechSolutions India",
    noticePeriod: "Immediate",
    expectedSalary: "₹4.5L PA",
    primarySkills: "React.js, Next.js, TypeScript, Tailwind CSS",
    highestQualification: "B.Tech Computer Science",
    college: "Mumbai University",
    resumeUrl: "https://drive.google.com/file/d/1234567890/view?usp=sharing",
    privacyConsent: true,
    status: "NEW",
    source: "Website",
    createdAt: "2026-10-01 10:30 AM",
    type: "JOB_APPLICATION",
  },
  {
    id: "ABW-APP-2026-001090",
    jobId: "JOB-2026-002",
    jobTitle: "Full Stack Developer Intern (Node.js & React)",
    applyingFor: "Full Stack Developer Intern (Node.js & React)",
    fullName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98920 67890",
    location: "Thane, MH",
    experienceLevel: "0–1 Years (Fresh Graduate)",
    experienceYears: "0",
    currentJobTitle: "Student / Fresh Graduate",
    currentCompany: "VJTI Mumbai",
    noticePeriod: "Immediate",
    expectedSalary: "As per internship stipend policy",
    primarySkills: "JavaScript, React.js, Node.js, Express, MongoDB",
    highestQualification: "B.E. Information Technology",
    college: "VJTI Mumbai",
    resumeUrl: "https://drive.google.com/file/d/0987654321/view?usp=sharing",
    privacyConsent: true,
    status: "SHORTLISTED",
    source: "LinkedIn",
    createdAt: "2026-10-01 02:15 PM",
    type: "JOB_APPLICATION",
  },
  {
    id: "ABW-APP-2026-001091",
    jobId: "GENERAL_RESUME",
    jobTitle: "General Talent Pool",
    applyingFor: "General Talent Pool (Python / Data Engineering)",
    fullName: "Rohan Verma",
    email: "rohan.v@example.com",
    phone: "+91 97654 32109",
    location: "Navi Mumbai, MH",
    experienceLevel: "0–1 Years",
    experienceYears: "1",
    primarySkills: "Python, SQL, Fast API, Data Analysis",
    highestQualification: "B.Sc Computer Science",
    resumeUrl: "https://drive.google.com/file/d/1122334455/view?usp=sharing",
    privacyConsent: true,
    status: "NEW",
    source: "Website",
    createdAt: "2026-10-01 04:00 PM",
    type: "TALENT_POOL",
  },
];

// Memory store for demo / API runtime storage
const APPLICATIONS_STORE: CandidateApplication[] = [...INITIAL_APPLICATIONS];

export function validateGoogleDriveUrl(url: string): { valid: boolean; error?: string } {
  if (!url || typeof url !== "string") {
    return { valid: false, error: "Resume Google Drive link is required." };
  }

  const trimmed = url.trim();

  // Must start with http:// or https://
  if (!/^https?:\/\//i.test(trimmed)) {
    return { valid: false, error: "Link must start with https://drive.google.com/ or https://docs.google.com/" };
  }

  // Check domain is drive.google.com or docs.google.com
  const isDrive = trimmed.includes("drive.google.com") || trimmed.includes("docs.google.com");
  if (!isDrive) {
    return {
      valid: false,
      error: "Please provide a valid Google Drive or Google Docs shareable link (e.g. https://drive.google.com/file/d/...).",
    };
  }

  return { valid: true };
}

export function generateApplicationId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `ABW-APP-2026-${randomNum}`;
}

export function saveApplication(appData: Omit<CandidateApplication, "id" | "createdAt" | "status">): CandidateApplication {
  const newApp: CandidateApplication = {
    ...appData,
    id: generateApplicationId(),
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  APPLICATIONS_STORE.unshift(newApp);
  return newApp;
}

export function getApplicationsStore(): CandidateApplication[] {
  return APPLICATIONS_STORE;
}

export function updateApplicationStatus(id: string, status: CandidateApplication["status"]): boolean {
  const app = APPLICATIONS_STORE.find((a) => a.id === id);
  if (app) {
    app.status = status;
    return true;
  }
  return false;
}
