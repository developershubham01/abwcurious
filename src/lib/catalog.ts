/**
 * ABWcurious service catalog — the 6 core practices and every sub-service
 * we offer. Powers the home-page showcase, the full-screen category pages
 * (hash routes `#/services/<slug>`) and the contact-form prefill flow.
 */

export type DemoKind = "web" | "mobile" | "ai" | "marketing" | "hr" | "cloud";

export interface ServiceItem {
  name: string;
  blurb: string;
}

export interface ServiceGroup {
  label: string;
  items: ServiceItem[];
}

export interface Category {
  slug: string;
  num: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  demo: DemoKind;
  typewriter: string[];
  stats: { value: string; label: string }[];
  groups: ServiceGroup[];
  process: { title: string; desc: string }[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "software-web-development",
    num: "01",
    name: "Software & Web Development",
    short: "Software & Web",
    tagline: "Websites, platforms and custom software engineered to ship fast and scale harder.",
    description:
      "From a five-page business website to a multi-tenant SaaS platform, we design and build the whole spectrum. Modern stack, clean architecture, measurable performance — and a team that stays accountable after launch.",
    image: "/images/cat-webdev.jpg",
    imageAlt: "Isometric illustration of browser windows and code panels — software and web development",
    demo: "web",
    typewriter: ["Business websites", "E-commerce stores", "SaaS platforms", "CRM & ERP systems", "Custom software"],
    stats: [
      { value: "120+", label: "Websites & apps shipped" },
      { value: "98", label: "Avg. Lighthouse score" },
      { value: "6 wks", label: "Typical MVP timeline" },
    ],
    groups: [
      {
        label: "Websites & Commerce",
        items: [
          { name: "Website Design & Development", blurb: "End-to-end builds — strategy, design, code and launch." },
          { name: "Business Website Development", blurb: "Corporate sites that convert visitors into enquiries." },
          { name: "E-commerce Website Development", blurb: "Storefronts with payments, inventory and analytics wired in." },
          { name: "Landing Page Design", blurb: "High-conversion pages for campaigns and product launches." },
        ],
      },
      {
        label: "Software & Platforms",
        items: [
          { name: "Custom Web Application Development", blurb: "Portals, dashboards and internal tools built to spec." },
          { name: "SaaS Product Development", blurb: "Multi-tenant products from MVP to enterprise-ready." },
          { name: "CRM / ERP Development", blurb: "Systems shaped around your pipeline, not the reverse." },
          { name: "Custom Software Development", blurb: "Bespoke engineering when off-the-shelf won't cut it." },
        ],
      },
      {
        label: "Design & Prototyping",
        items: [
          { name: "UI/UX Design", blurb: "Research-led interfaces people can use on day one." },
          { name: "Website UI Design", blurb: "Page systems, components and interaction states." },
          { name: "Figma Design & Prototyping", blurb: "Clickable prototypes before a line of code is written." },
          { name: "Branding & Creative Design", blurb: "Identity systems, logos and campaign creative." },
        ],
      },
      {
        label: "APIs & Care",
        items: [
          { name: "API Development & Integration", blurb: "REST/GraphQL APIs and third-party services, connected." },
          { name: "Website Maintenance & Support", blurb: "Updates, backups, monitoring and on-call fixes." },
        ],
      },
    ],
    process: [
      { title: "Discover", desc: "Requirements, users and success metrics in one week." },
      { title: "Architect", desc: "Stack, data model and delivery milestones — no surprises." },
      { title: "Build & Test", desc: "Weekly demos, automated tests, staging from day one." },
      { title: "Launch & Support", desc: "Zero-downtime deploy, monitoring, and a care plan." },
    ],
  },
  {
    slug: "mobile-app-development",
    num: "02",
    name: "Mobile App Development",
    short: "Mobile Apps",
    tagline: "Native and cross-platform apps that feel fast, look sharp and pass store review.",
    description:
      "We ship Android, iOS and Flutter apps with production-grade quality — from the first wireframe to Play Store and App Store release, plus the update cadence that keeps ratings high.",
    image: "/images/cat-mobile.jpg",
    imageAlt: "Isometric illustration of smartphones with app screens — mobile app development",
    demo: "mobile",
    typewriter: ["Android apps", "iOS apps", "Flutter apps", "App UI/UX", "Store releases"],
    stats: [
      { value: "40+", label: "Apps on the stores" },
      { value: "4.8★", label: "Avg. store rating" },
      { value: "2 wks", label: "To first testable build" },
    ],
    groups: [
      {
        label: "Native & Cross-Platform",
        items: [
          { name: "Android App Development", blurb: "Kotlin-first apps tuned for the whole device range." },
          { name: "iOS App Development", blurb: "Swift apps that clear App Store review first try." },
          { name: "Cross-Platform App Development", blurb: "One codebase, both stores, native-grade feel." },
          { name: "Flutter App Development", blurb: "Pixel-perfect Flutter builds with fast iteration." },
        ],
      },
      {
        label: "Experience & Care",
        items: [
          { name: "Mobile App UI/UX", blurb: "Gesture-first flows, design systems and motion." },
          { name: "App Maintenance & Updates", blurb: "OS upgrades, crash fixes, feature ships — on schedule." },
        ],
      },
    ],
    process: [
      { title: "Scope", desc: "Feature map, store strategy and device matrix." },
      { title: "Prototype", desc: "Tappable flows before heavy engineering begins." },
      { title: "Build & Beta", desc: "TestFlight / Play Console betas every sprint." },
      { title: "Release & Iterate", desc: "Store submission, analytics, staged rollouts." },
    ],
  },
  {
    slug: "ai-automation",
    num: "03",
    name: "AI & Automation",
    short: "AI & Automation",
    tagline: "Chatbots, copilots and process automation that quietly do the boring work.",
    description:
      "We put AI where it pays for itself: support inboxes answered, documents extracted, leads qualified, workflows triggered. Practical models, grounded on your data, monitored in production.",
    image: "/images/cat-ai.jpg",
    imageAlt: "Isometric illustration of neural network nodes and chat bubbles — AI and automation",
    demo: "ai",
    typewriter: ["AI chatbots", "Customer-support AI", "Document tools", "Process automation", "AI-powered SaaS"],
    stats: [
      { value: "65%", label: "Avg. ticket load cut" },
      { value: "30+", label: "AI systems in production" },
      { value: "24/7", label: "Autonomous operation" },
    ],
    groups: [
      {
        label: "Conversational AI",
        items: [
          { name: "AI Website Integration", blurb: "Assistants embedded right into your site or product." },
          { name: "AI Chatbots", blurb: "Sales and support bots grounded on your content." },
          { name: "AI Customer Support", blurb: "Ticket triage, suggested replies, instant answers." },
        ],
      },
      {
        label: "Intelligent Tools",
        items: [
          { name: "AI Resume/Document Tools", blurb: "Parse, score and generate documents automatically." },
          { name: "AI-powered SaaS Development", blurb: "AI as the core feature, not a bolt-on." },
          { name: "API & AI Model Integration", blurb: "GPT-class models wired into your existing stack." },
        ],
      },
      {
        label: "Automation",
        items: [
          { name: "Business Process Automation", blurb: "Repetitive ops automated end-to-end, with audit trails." },
        ],
      },
    ],
    process: [
      { title: "Identify ROI", desc: "Find the workflows where automation pays back fastest." },
      { title: "Ground the Model", desc: "Your data, your tone, guardrails and eval sets." },
      { title: "Integrate", desc: "Into your CRM, inbox, site — wherever work happens." },
      { title: "Monitor & Tune", desc: "Quality dashboards, drift alerts, prompt versioning." },
    ],
  },
  {
    slug: "digital-marketing",
    num: "04",
    name: "Digital Marketing",
    short: "Digital Marketing",
    tagline: "SEO, ads and content systems that turn attention into a pipeline.",
    description:
      "Full-funnel growth under one roof — technical SEO, paid media on Google and Meta, social and email programmes. Every rupee tracked from click to closed deal.",
    image: "/images/cat-marketing.jpg",
    imageAlt: "Isometric illustration of rising analytics charts and campaign icons — digital marketing",
    demo: "marketing",
    typewriter: ["SEO & Local SEO", "Google Ads", "Meta Ads", "Email journeys", "Lead generation"],
    stats: [
      { value: "3.2×", label: "Avg. ROAS on paid media" },
      { value: "180%", label: "Median organic growth" },
      { value: "12k+", label: "Leads generated / yr" },
    ],
    groups: [
      {
        label: "SEO & Discovery",
        items: [
          { name: "SEO", blurb: "Technical, on-page and authority work that compounds." },
          { name: "Local SEO", blurb: "Map rankings and 'near me' visibility for your city." },
          { name: "Google Business Profile Optimization", blurb: "Photos, posts, reviews — a profile that sells." },
          { name: "Content Marketing", blurb: "Articles and assets engineered to rank and convert." },
        ],
      },
      {
        label: "Paid Media",
        items: [
          { name: "Google Ads / PPC", blurb: "Search, shopping and performance-max, tightly managed." },
          { name: "Meta Ads", blurb: "Creative-tested Facebook & Instagram campaigns." },
          { name: "Lead Generation", blurb: "Landing pages, forms and nurturing that fill the CRM." },
        ],
      },
      {
        label: "Social & Retention",
        items: [
          { name: "Social Media Management", blurb: "Calendars, creation and community — handled." },
          { name: "Social Media Marketing", blurb: "Paid + organic programmes that build audience." },
          { name: "Email Marketing", blurb: "Journeys and newsletters people actually open." },
        ],
      },
      {
        label: "Strategy",
        items: [
          { name: "Digital Marketing Strategy", blurb: "Channel plan, budgets and targets in one roadmap." },
        ],
      },
    ],
    process: [
      { title: "Audit", desc: "Site, channels and competitors benchmarked." },
      { title: "Plan", desc: "Channel mix, calendar and target CPAs." },
      { title: "Launch", desc: "Campaigns live with tracking end-to-end." },
      { title: "Optimize", desc: "Weekly experiments, monthly reporting, no vanity metrics." },
    ],
  },
  {
    slug: "recruitment-hr-solutions",
    num: "05",
    name: "Recruitment & HR Solutions",
    short: "Recruitment & HR",
    tagline: "IT, non-IT and blue-collar hiring — sourced, screened and delivered on time.",
    description:
      "A recruiting engine built for scale: 40,000+ candidate network, structured screening and weekly interview-ready shortlists. From one critical hire to bulk seasonal ramp-ups.",
    image: "/images/cat-hr.jpg",
    imageAlt: "Isometric illustration of candidate profile cards on a hiring pipeline — recruitment and HR",
    demo: "hr",
    typewriter: ["IT recruitment", "Bulk hiring", "Contract staffing", "Permanent staffing", "Executive search"],
    stats: [
      { value: "3,000+", label: "Placements made" },
      { value: "18 days", label: "Median time-to-offer" },
      { value: "92%", label: "1-year retention" },
    ],
    groups: [
      {
        label: "Specialist Hiring",
        items: [
          { name: "IT Recruitment", blurb: "Engineers, data, DevOps and product talent." },
          { name: "Non-IT Recruitment", blurb: "Sales, finance, ops and marketing roles." },
          { name: "Blue-Collar Recruitment", blurb: "Verified, high-volume floor and field staffing." },
          { name: "White-Collar Recruitment", blurb: "Executives to mid-management, discreetly handled." },
        ],
      },
      {
        label: "Scale & Models",
        items: [
          { name: "Bulk Hiring", blurb: "100+ seat drives with dedicated sourcing pods." },
          { name: "Contract Staffing", blurb: "Compliant, payroll-handled flexible teams." },
          { name: "Permanent Staffing", blurb: "Full-time hires with replacement guarantees." },
          { name: "Recruitment Partner Services", blurb: "Your outsourced TA function, end to end." },
        ],
      },
      {
        label: "Sourcing",
        items: [
          { name: "Candidate Sourcing & Screening", blurb: "Vetted shortlists — only interview-ready profiles." },
        ],
      },
    ],
    process: [
      { title: "Intake", desc: "Role scorecard, budget and timeline agreed." },
      { title: "Source", desc: "Database, referrals and headhunt in parallel." },
      { title: "Screen", desc: "Skill tests + structured interviews before you see CVs." },
      { title: "Close & Onboard", desc: "Offer management, documents, day-one readiness." },
    ],
  },
  {
    slug: "cloud-it-business-solutions",
    num: "06",
    name: "Cloud, IT & Business Solutions",
    short: "Cloud & Business IT",
    tagline: "Infrastructure, ready-made business systems and support that never sleeps.",
    description:
      "The operational backbone: cloud deployment, domains, SSL, CI/CD and performance — plus business systems like ERP, HRMS, billing and booking, and a maintenance desk that keeps it all healthy.",
    image: "/images/cat-cloud.jpg",
    imageAlt: "Isometric illustration of cloud infrastructure, servers and security shield — cloud and business IT",
    demo: "cloud",
    typewriter: ["Cloud deployment", "ERP & CRM systems", "DevOps & CI/CD", "Security updates", "24/7 support"],
    stats: [
      { value: "99.98%", label: "Managed uptime" },
      { value: "80+", label: "Business systems delivered" },
      { value: "<1 hr", label: "Support response SLA" },
    ],
    groups: [
      {
        label: "Cloud & Deployment",
        items: [
          { name: "Cloud Deployment", blurb: "AWS / GCP / Azure architectures, sized right." },
          { name: "Server Setup", blurb: "Hardened, monitored, documented from day one." },
          { name: "Cloudflare Setup", blurb: "CDN, WAF and DNS tuned for speed and safety." },
          { name: "Database Setup", blurb: "Schema, migrations, backups and recovery drills." },
          { name: "Domain & DNS Configuration", blurb: "Registrar to resolver, zero-downtime migrations." },
          { name: "SSL & Security Setup", blurb: "Certificates, headers, scanning and hardening." },
          { name: "CI/CD & Deployment", blurb: "Pipelines that make releases boring." },
          { name: "Website Performance Optimization", blurb: "Core Web Vitals in the green, every page." },
        ],
      },
      {
        label: "Business Systems",
        items: [
          { name: "CRM Solutions", blurb: "Pipeline, follow-ups and reporting out of the box." },
          { name: "HRMS Solutions", blurb: "Attendance, payroll and leave on one dashboard." },
          { name: "ERP Solutions", blurb: "Inventory to accounts, one source of truth." },
          { name: "Inventory Management Systems", blurb: "Live stock, GST-ready billing, low-stock alerts." },
          { name: "Billing & Invoice Systems", blurb: "Quotes to payment reconciliation, automated." },
          { name: "Restaurant Management Systems", blurb: "KOT, tables, menu and daily sales in one place." },
          { name: "Appointment Management Systems", blurb: "Booking pages, reminders and no-show control." },
          { name: "Custom Business Automation", blurb: "Your quirky process, turned into software." },
        ],
      },
      {
        label: "Maintenance & Support",
        items: [
          { name: "Website Bug Fixing", blurb: "Fast triage and fixes for live issues." },
          { name: "Software Maintenance", blurb: "Dependency upgrades, refactors, health reports." },
          { name: "Performance Optimization", blurb: "Profiling, caching and query tuning." },
          { name: "Security Updates", blurb: "Patches applied and verified on a schedule." },
          { name: "Technical Support", blurb: "A named engineer, not a ticket black hole." },
          { name: "Third-Party Integration", blurb: "Payment, WhatsApp, shipping, accounting — connected." },
          { name: "Existing Website Modernization", blurb: "Legacy stacks rebuilt without losing SEO." },
        ],
      },
    ],
    process: [
      { title: "Assess", desc: "Infrastructure and process audit with a priority list." },
      { title: "Stabilize", desc: "Backups, security and monitoring before anything else." },
      { title: "Deploy / Automate", desc: "Systems live in staged, reversible steps." },
      { title: "Support", desc: "SLA-backed desk with monthly health reporting." },
    ],
  },
];

export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export const ALL_SUB_SERVICES: string[] = CATEGORIES.flatMap((c) =>
  c.groups.flatMap((g) => g.items.map((i) => i.name))
);

export function categoryServiceCount(c: Category): number {
  return c.groups.reduce((n, g) => n + g.items.length, 0);
}

/** Match a category page slug → hash route */
export function categoryHash(slug: string): string {
  return `#/services/${slug}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\/\\]+/g, "-") // Replace / or \ with - (e.g. UI/UX -> ui-ux)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function getServiceItemBySlug(category: Category, itemSlug: string): ServiceItem | undefined {
  const normalizedTarget = itemSlug.toLowerCase().trim();
  for (const group of category.groups) {
    for (const item of group.items) {
      const itemS = slugify(item.name);
      if (
        itemS === normalizedTarget ||
        itemS.replace(/-/g, "") === normalizedTarget.replace(/-/g, "")
      ) {
        return item;
      }
    }
  }
  return undefined;
}

export interface FlattenedService {
  category: Category;
  groupLabel: string;
  item: ServiceItem;
  slug: string;
}

export function getAllServices(): FlattenedService[] {
  const result: FlattenedService[] = [];
  for (const category of CATEGORIES) {
    for (const group of category.groups) {
      for (const item of group.items) {
        result.push({
          category,
          groupLabel: group.label,
          item,
          slug: slugify(item.name),
        });
      }
    }
  }
  return result;
}

export function getSiblingServices(category: Category, itemSlug: string) {
  const items = category.groups.flatMap((g) =>
    g.items.map((it) => ({
      ...it,
      slug: slugify(it.name),
    }))
  );
  const index = items.findIndex((it) => it.slug === itemSlug);
  const safeIndex = index >= 0 ? index : 0;
  const prev = items[(safeIndex - 1 + items.length) % items.length];
  const next = items[(safeIndex + 1) % items.length];
  const related = items.filter((it) => it.slug !== itemSlug).slice(0, 3);
  return { prev, next, related };
}

export function getPracticeTechStack(slug: string): string[] {
  switch (slug) {
    case "software-web-development":
      return ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "GraphQL", "REST APIs", "Redis"];
    case "mobile-app-development":
      return ["Kotlin", "Swift", "Flutter", "React Native", "Jetpack Compose", "SwiftUI", "Firebase", "Room DB", "Fastlane", "App Store Connect"];
    case "ai-automation":
      return ["OpenAI / GPT-4o", "Anthropic Claude", "LangChain", "LlamaIndex", "Python", "PyTorch", "Pinecone Vector DB", "HuggingFace", "FastAPI", "n8n"];
    case "digital-marketing":
      return ["Google Ads & P-Max", "Meta Ads Manager", "Google Analytics 4", "Semrush", "Ahrefs", "Google Search Console", "HubSpot", "Mailchimp", "Klaviyo"];
    case "recruitment-hr-solutions":
      return ["LinkedIn Recruiter", "Greenhouse ATS", "Lever", "HackerEarth", "Workday", "Structured Scorecards", "Background Verification", "Compliance Engine"];
    case "cloud-it-business-solutions":
      return ["Amazon Web Services (AWS)", "Google Cloud Platform", "Microsoft Azure", "Cloudflare CDN & WAF", "Terraform IaC", "Kubernetes & Docker", "GitHub Actions CI/CD", "Datadog / Prometheus"];
    default:
      return ["Modern Enterprise Stack", "Automated CI/CD", "Cloud Architecture", "REST & GraphQL", "Strict SLA Monitoring"];
  }
}

