export type EmploymentType = "Full Time" | "Part Time" | "Internship" | "Contract" | "Freelance";
export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type JobStatus = "OPEN" | "CLOSED" | "DRAFT" | "PAUSED";

export interface JobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  experience: string;
  salary: string;
  openings: number;
  description: string;
  overview: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  education: string;
  benefits: string[];
  deadline: string;
  status: JobStatus;
  datePosted: string;
  isInternship?: boolean;
}

export const ALL_DEPARTMENTS = [
  "All",
  "Technology & Development",
  "Sales & Business Development",
  "Marketing",
  "UI/UX & Creative Design",
  "HR & Recruitment",
  "Operations & Analytics",
] as const;

export const JOBS_DATABASE: JobPosition[] = [
  {
    id: "JOB-2026-001",
    slug: "frontend-developer",
    title: "Frontend Developer (Next.js & React)",
    department: "Technology & Development",
    location: "Nerul, Navi Mumbai / Mumbai",
    employmentType: "Full Time",
    workMode: "Hybrid",
    experience: "0–1 Years",
    salary: "Full Time Role",
    openings: 3,
    description: "Build fast, SEO-optimized Next.js and React web applications for enterprise clients.",
    overview:
      "As a Frontend Developer at ABWcurious, you will engineer responsive web user interfaces using Next.js 15, TypeScript, and Tailwind CSS. You will collaborate directly with UI/UX designers and backend squads to ship high-performance web products.",
    responsibilities: [
      "Develop responsive Next.js and React web applications from Figma wireframes.",
      "Optimize web pages for Core Web Vitals, accessibility, and search engine crawlability.",
      "Integrate RESTful and GraphQL APIs with robust error handling.",
      "Participate in code reviews, automated unit testing, and agile sprint planning.",
    ],
    requiredSkills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    preferredSkills: ["Framer Motion", "GraphQL", "Vercel / Next.js SSR", "State Management (Zustand/Redux)"],
    education: "B.Tech / B.E. / BCA / B.Sc Computer Science or equivalent IT degree",
    benefits: [
      "Flexible hybrid work environment",
      "Mentorship from senior software architects",
      "Annual learning & certification allowance",
      "Health & medical insurance coverage",
    ],
    deadline: "2026-11-30",
    status: "OPEN",
    datePosted: "2026-10-01",
  },
  {
    id: "JOB-2026-002",
    slug: "full-stack-developer-intern",
    title: "Full Stack Developer Intern (Node.js & React)",
    department: "Technology & Development",
    location: "Nerul, Navi Mumbai",
    employmentType: "Internship",
    workMode: "On-site",
    experience: "0–1 Years",
    salary: "4 Months Unpaid Internship",
    openings: 4,
    description: "4 Months Unpaid Internship program working on real-world Node.js, Next.js, and database projects with 1-on-1 mentorship & PPO opportunity.",
    overview:
      "This is a 4 Months Unpaid Internship designed specifically for entry-level developers and recent graduates with 0 to 1 years of experience. You will receive 1-on-1 mentorship, write production code, earn a Certificate of Internship, and be evaluated for a Pre-Placement Offer (PPO).",
    responsibilities: [
      "Assist in building frontend React components and backend Node.js microservices.",
      "Write database queries in PostgreSQL and MongoDB.",
      "Fix bugs, optimize performance, and write documentation.",
      "Participate in daily engineering standups and code reviews.",
    ],
    requiredSkills: ["JavaScript", "HTML/CSS", "React.js Basics", "Node.js Basics", "Git"],
    preferredSkills: ["TypeScript", "Next.js", "SQL Basics", "Postman / REST API testing"],
    education: "Pursuing or completed B.E. / B.Tech / BCA / MCA",
    benefits: [
      "4 Months Unpaid Internship with Certificate of Completion",
      "Pre-Placement Offer (PPO) evaluation based on performance",
      "1-on-1 mentorship with Lead Engineers",
      "Hands-on production codebase exposure",
    ],
    deadline: "2026-11-15",
    status: "OPEN",
    datePosted: "2026-10-01",
    isInternship: true,
  },
  {
    id: "JOB-2026-003",
    slug: "business-development-executive",
    title: "Business Development Executive (B2B IT Sales)",
    department: "Sales & Business Development",
    location: "Navi Mumbai / Mumbai",
    employmentType: "Full Time",
    workMode: "On-site",
    experience: "0–1 Years",
    salary: "Full Time Role",
    openings: 2,
    description: "Drive B2B sales outreach, client relationship building, and IT project acquisition.",
    overview:
      "We are seeking an energetic Business Development Executive to identify business leads, pitch custom software development, mobile app, and digital solutions to startups and SMBs across India and internationally.",
    responsibilities: [
      "Identify prospect businesses across healthcare, logistics, e-commerce, and education.",
      "Conduct introductory discovery calls and present ABWcurious capability decks.",
      "Collaborate with solution architects to prepare commercial proposals and quotes.",
      "Maintain active client relationships and pipeline tracking in CRM.",
    ],
    requiredSkills: ["B2B Sales", "Client Communication", "Email Outreach", "Lead Generation", "Presentation Skills"],
    preferredSkills: ["IT Services Selling Knowledge", "LinkedIn Sales Navigator", "CRM Tools"],
    education: "Graduate in any stream / BBA / MBA Marketing preferred",
    benefits: ["Attractive performance bonus & commissions", "Travel & client meeting allowance", "Rapid career progression"],
    deadline: "2026-11-20",
    status: "OPEN",
    datePosted: "2026-10-01",
  },
  {
    id: "JOB-2026-004",
    slug: "digital-marketing-executive",
    title: "Marketing & SEO Executive",
    department: "Marketing",
    location: "Nerul, Navi Mumbai",
    employmentType: "Full Time",
    workMode: "Hybrid",
    experience: "0–1 Years",
    salary: "Full Time Role",
    openings: 2,
    description: "Execute technical SEO, keyword research, content optimization, and Google Ads campaigns.",
    overview:
      "Join our growth team to execute search engine optimization, performance marketing, and content strategies for ABWcurious and our client portfolio.",
    responsibilities: [
      "Perform keyword research and on-page SEO optimization.",
      "Manage Google Search Console, GA4 analytics, and SEMrush tracking.",
      "Assist in setting up and monitoring Google Ads & Meta PPC campaigns.",
      "Write SEO-friendly blog articles, meta tags, and landing page copy.",
    ],
    requiredSkills: ["SEO Basics", "Google Analytics", "Keyword Research", "On-Page SEO", "Content Writing"],
    preferredSkills: ["Google Ads Certification", "Technical SEO", "WordPress / Next.js SEO"],
    education: "Degree in Marketing, Communications, Mass Media, or IT",
    benefits: ["Hands-on budget management experience", "Hybrid work flexibility", "SEO tool access"],
    deadline: "2026-11-25",
    status: "OPEN",
    datePosted: "2026-10-01",
  },
  {
    id: "JOB-2026-005",
    slug: "mobile-app-developer-react-native",
    title: "Mobile App Developer (React Native / Flutter)",
    department: "Technology & Development",
    location: "Navi Mumbai / Remote",
    employmentType: "Full Time",
    workMode: "Hybrid",
    experience: "0–1 Years",
    salary: "Full Time Role",
    openings: 2,
    description: "Build cross-platform iOS and Android mobile apps with native UI and API integrations.",
    overview:
      "Engineering high-performance mobile applications using React Native and Flutter. Work closely with product leads to deliver smooth, touch-friendly mobile experiences.",
    responsibilities: [
      "Develop cross-platform mobile apps for iOS and Android.",
      "Integrate RESTful backends, Firebase notifications, and offline storage.",
      "Debug mobile app crashes and optimize device performance.",
      "Prepare builds for Apple App Store and Google Play Store publishing.",
    ],
    requiredSkills: ["React Native", "JavaScript / TypeScript", "Mobile UI Design", "REST APIs", "Git"],
    preferredSkills: ["Flutter / Dart", "Native iOS (Swift) / Android (Kotlin)", "Firebase"],
    education: "B.Tech / B.E. / BCA / MCA in CS / IT",
    benefits: ["Latest Mac / hardware allowance", "Flexible work schedule", "App store release ownership"],
    deadline: "2026-11-30",
    status: "OPEN",
    datePosted: "2026-10-01",
  },
  {
    id: "JOB-2026-006",
    slug: "ui-ux-designer",
    title: "UI/UX & Graphic Designer",
    department: "UI/UX & Creative Design",
    location: "Nerul, Navi Mumbai",
    employmentType: "Full Time",
    workMode: "Hybrid",
    experience: "0–1 Years",
    salary: "Full Time Role",
    openings: 2,
    description: "Design clean wireframes, web UI components, mobile interfaces, and brand assets in Figma.",
    overview:
      "Craft intuitive user interfaces for web apps, mobile apps, and marketing landing pages. You will create Figma prototypes and design systems for enterprise software.",
    responsibilities: [
      "Create wireframes, user flows, and high-fidelity Figma prototypes.",
      "Design web and mobile UI components following modern design principles.",
      "Collaborate with frontend developers to ensure design pixel perfection.",
      "Design marketing graphics, social media posts, and visual assets.",
    ],
    requiredSkills: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Adobe Photoshop / Illustrator"],
    preferredSkills: ["Design Systems", "Framer", "Micro-interactions", "HTML/CSS Awareness"],
    education: "Degree/Diploma in Design, Fine Arts, Multimedia, or IT",
    benefits: ["Creative freedom", "Design system ownership", "Mentorship from Senior Designers"],
    deadline: "2026-11-18",
    status: "OPEN",
    datePosted: "2026-10-01",
  },
  {
    id: "JOB-2026-007",
    slug: "hr-recruiter-intern",
    title: "HR Recruiter & Talent Acquisition Intern",
    department: "HR & Recruitment",
    location: "Nerul, Navi Mumbai",
    employmentType: "Internship",
    workMode: "On-site",
    experience: "0–1 Years",
    salary: "4 Months Unpaid Internship",
    openings: 3,
    description: "4 Months Unpaid Internship sourcing IT candidates, scheduling interviews, and assisting in talent recruitment drives.",
    overview:
      "This is a 4 Months Unpaid Internship ideal for HR graduates and entry-level recruiters looking to gain hands-on experience in IT recruitment, candidate screening, and employee onboarding. Includes HR mentorship, Certificate of Completion, and PPO evaluation.",
    responsibilities: [
      "Source candidate profiles from job portals, LinkedIn, and campus drives.",
      "Screen resumes against technical job descriptions.",
      "Coordinate interview schedules between candidates and technical leads.",
      "Maintain application records in recruitment dashboard and Google Sheets.",
    ],
    requiredSkills: ["Communication Skills", "Resume Screening", "Sourcing", "MS Excel / Google Sheets"],
    preferredSkills: ["LinkedIn Sourcing", "IT Roles Awareness", "HR Tools"],
    education: "MBA HR / BBA / Graduate in any discipline",
    benefits: [
      "4 Months Unpaid Internship with Certificate of Completion",
      "Pre-Placement Offer (PPO) evaluation opportunity",
      "HR mentorship & real talent acquisition training",
    ],
    deadline: "2026-11-10",
    status: "OPEN",
    datePosted: "2026-10-01",
    isInternship: true,
  },
  {
    id: "JOB-2026-008",
    slug: "it-support-engineer",
    title: "IT Support & Infrastructure Engineer",
    department: "Operations & Analytics",
    location: "Nerul, Navi Mumbai",
    employmentType: "Full Time",
    workMode: "On-site",
    experience: "0–1 Years",
    salary: "Full Time Role",
    openings: 2,
    description: "Manage studio workstations, internal network servers, security hardware, and helpdesk support.",
    overview:
      "Providing 1st/2nd line technical support, workstation configuration, network monitoring, and system maintenance for ABWcurious studio office.",
    responsibilities: [
      "Setup and configure developer workstations (macOS / Windows / Linux).",
      "Monitor office network routers, Wi-Fi access points, and firewall security.",
      "Troubleshoot software, VPN, and hardware issues for internal staff.",
      "Maintain hardware inventory and software licenses.",
    ],
    requiredSkills: ["Hardware & Networking", "Windows Server / Linux", "Troubleshooting", "System Admin"],
    preferredSkills: ["CCNA / Network+", "Active Directory", "Cloud Basics"],
    education: "Diploma / Degree in CS / IT / Hardware & Networking",
    benefits: ["On-site hands-on infrastructure training", "Health insurance", "Annual performance review"],
    deadline: "2026-11-22",
    status: "OPEN",
    datePosted: "2026-10-01",
  },
];

export function getOpenJobs(): JobPosition[] {
  return JOBS_DATABASE.filter((j) => j.status === "OPEN");
}

export function getJobBySlug(slug: string): JobPosition | undefined {
  return JOBS_DATABASE.find((j) => j.slug === slug && j.status === "OPEN");
}
