/**
 * ABWcurious — HOMEPAGE COPY (single source of truth)
 * ==========================================================================
 * Source: "ABWcurious Website.docx" — the official website copy deck,
 * structured like a global IT-services homepage (hero → intro → capabilities
 * → products → approach → why → industries → vision/mission → CTA).
 *
 * Every new home section renders from this file — edit copy here, not in the
 * components. Emphasis runs from the document are carried as
 * `{ pre, strong, post }` triples so components can render <strong> exactly
 * where the deck bolds a phrase.
 * ==========================================================================
 */

/** A sentence split around its emphasised (bold-in-document) segment. */
export interface Emph {
  pre: string;
  strong: string;
  post: string;
}

/* ---------------------------------- hero --------------------------------- */

export const HERO = {
  eyebrow: "AI. Technology. Education. Innovation.",
  headline: "Engineering a Better Future.",
  identity: "ABWcurious · Technology & innovation company",
  description:
    "ABWcurious is a technology and innovation company delivering intelligent digital solutions, future-ready education, cybersecurity, software engineering, IT services, and talent solutions.",
  promise: {
    pre: "We help organizations ",
    strong: "innovate, transform, operate, and grow",
    post: " in a technology-driven world.",
  } as Emph,
  ctas: [
    { label: "Explore Capabilities", href: "#capabilities" },
    { label: "Talk to Us", href: "#/contact" },
  ] as const,
  /** Marquee refrain from the document's closing line of the intro. */
  ticker: [
    "Discover",
    "Design",
    "Build",
    "Secure",
    "Operate",
    "Scale",
    "AI. Technology. Education. Innovation.",
  ],
} as const;

/* --------------------------- transforming intro --------------------------- */

export const INTRO = {
  eyebrow: "01 — Who we are",
  title: "Transforming Possibilities Into Progress",
  lede: "Technology is reshaping every industry.",
  body1: {
    pre: "ABWcurious combines ",
    strong: "deep technology capabilities, practical innovation, and human expertise",
    post: " to help organizations respond to change and create new opportunities.",
  } as Emph,
  body2: {
    pre: "From emerging technologies and software engineering to cybersecurity, IT infrastructure, digital growth, education, and talent — we bring the capabilities needed to move from ",
    strong: "idea to impact",
    post: ".",
  } as Emph,
  refrain: "Discover. Design. Build. Secure. Operate. Scale.",
} as const;

/* ------------------------------- capabilities ----------------------------- */

/**
 * The seven capabilities from the document. `flow: true` renders the tag
 * list as an arrow lifecycle (A → B → C) instead of plain chips.
 */
export interface Capability {
  num: string;
  name: string;
  tagline: string;
  /** Short sentence placed between tagline and body (when the doc has one). */
  lede?: string;
  body: string;
  bodyExtra?: string;
  tags: string[];
  flow?: boolean;
  /** Internal destination — a service category page or product page. */
  href: string;
  linkLabel: string;
}

export const CAPABILITIES_SECTION = {
  eyebrow: "02 — Our capabilities",
  title: "Our Capabilities",
  lede: "Deep technology practices, delivered end to end — explore each one.",
} as const;

export const CAPABILITIES: Capability[] = [
  {
    num: "01",
    name: "Artificial Intelligence & Data",
    tagline: "Intelligence that creates business value.",
    body: "We help organizations explore and implement AI and machine learning to improve productivity, automation, decision-making, customer experience, and operational efficiency.",
    tags: ["AI & ML", "Generative AI", "Intelligent Automation", "Data & Analytics", "AI Applications"],
    href: "#/services/ai-automation",
    linkLabel: "Explore AI & Data",
  },
  {
    num: "02",
    name: "Cybersecurity",
    tagline: "Secure the digital enterprise.",
    lede: "Security is fundamental to digital transformation.",
    body: "Our cybersecurity capabilities help organizations protect critical systems, applications, infrastructure, and data while strengthening their overall security posture.",
    tags: ["Security Assessment", "Application Security", "Infrastructure Security", "Data Protection", "Monitoring", "Optimization"],
    href: "#/services/cloud-it-business-solutions",
    linkLabel: "Explore Cybersecurity",
  },
  {
    num: "03",
    name: "Digital Engineering",
    tagline: "Build technology for what comes next.",
    body: "We engineer modern digital experiences, applications, and platforms that are scalable, secure, and designed around business objectives.",
    tags: ["Web", "Mobile", "Enterprise Applications", "APIs", "Platforms", "Custom Software"],
    href: "#/services/software-web-development",
    linkLabel: "Explore Digital Engineering",
  },
  {
    num: "04",
    name: "IT & Infrastructure Services",
    tagline: "Technology that performs. Operations that endure.",
    body: "We help organizations implement, manage, monitor, support, and optimize their technology environments.",
    bodyExtra:
      "Our services support organizations across their technology lifecycle — helping maintain reliable, secure, and efficient digital operations.",
    tags: ["Implement", "Manage", "Monitor", "Support", "Optimize"],
    flow: true,
    href: "#/services/cloud-it-business-solutions",
    linkLabel: "Explore IT Services",
  },
  {
    num: "05",
    name: "Digital Growth",
    tagline: "Build stronger digital businesses.",
    body: "We combine technology, data, creativity, and strategy to help organizations strengthen their digital presence and create sustainable growth.",
    tags: ["Digital Strategy", "Performance Marketing", "Search", "Social", "Content", "Lead Generation"],
    href: "#/services/digital-marketing",
    linkLabel: "Explore Digital Growth",
  },
  {
    num: "06",
    name: "Talent & Staffing",
    tagline: "Connecting People With Opportunity.",
    lede: "Technology transformation requires the right people.",
    body: "ABWcurious provides recruitment and staffing solutions that connect organizations with skilled professionals across technology and business functions.",
    tags: ["Technology Recruitment", "IT Staffing", "Contract Staffing", "Permanent Hiring", "Workforce Solutions"],
    href: "#/services/recruitment-hr-solutions",
    linkLabel: "Explore Talent Solutions",
  },
  {
    num: "07",
    name: "Future-Ready Education",
    tagline: "Building the skills behind tomorrow's technology.",
    body: "Learning should not be limited to books and classrooms. At Kapikitab, we combine traditional learning with modern technology, helping students master concepts by visualizing them in 3D and practicing to excel in their goals.",
    bodyExtra:
      "By integrating artificial intelligence and augmented reality, we aren't just digitizing textbooks — we are creating a personalized, interactive environment where understanding comes naturally, and every student receives personalized tutoring.",
    tags: ["Learn", "Practice", "Build", "Apply", "Grow"],
    flow: true,
    href: "#/products/kapikitab",
    linkLabel: "Explore Education — Kapikitab.in",
  },
];

/* --------------------------------- products ------------------------------- */

export const PRODUCTS_SECTION = {
  eyebrow: "03 — Products",
  title: "Innovation Beyond Services.",
  lede: "ABWcurious creates and operates technology products designed to address real-world challenges.",
  cta: { label: "Explore Our Products", href: "#/products" },
} as const;

/* --------------------------------- approach ------------------------------- */

export const APPROACH_SECTION = {
  eyebrow: "04 — Our approach",
  title: "From Strategy to Continuous Transformation.",
  lede: "Six disciplines, one continuous loop — the way we take every engagement from first question to compounding value.",
} as const;

export interface ApproachStep {
  num: string;
  name: string;
  description: string;
}

export const APPROACH_STEPS: ApproachStep[] = [
  {
    num: "01",
    name: "Discover",
    description: "Understand your business, technology landscape, challenges, and opportunities.",
  },
  {
    num: "02",
    name: "Define",
    description: "Create the strategy, architecture, roadmap, and priorities.",
  },
  {
    num: "03",
    name: "Build",
    description: "Engineer technology solutions aligned with your objectives.",
  },
  {
    num: "04",
    name: "Secure",
    description: "Build security into the technology lifecycle.",
  },
  {
    num: "05",
    name: "Operate",
    description: "Manage, monitor, support, and maintain your technology environment.",
  },
  {
    num: "06",
    name: "Optimize",
    description: "Continuously improve performance, efficiency, security, and scalability.",
  },
];

/* ------------------------------ why ABWcurious ---------------------------- */

export interface WhyItem {
  name: string;
  description: string;
}

export const WHY_SECTION = {
  eyebrow: "05 — Why ABWcurious",
  title: "Technology With Purpose.",
  lede: "Five commitments that shape how we work with every client, student, and partner.",
} as const;

export const WHY_ITEMS: WhyItem[] = [
  {
    name: "End-to-End Capabilities",
    description:
      "From education and consulting to engineering, cybersecurity, IT operations, digital growth, and talent.",
  },
  {
    name: "Future-Focused",
    description:
      "We work with technologies and capabilities shaping the next generation of digital business.",
  },
  {
    name: "Business-Led",
    description:
      "Technology should create measurable business value. We keep business objectives at the center.",
  },
  {
    name: "Innovation-Driven",
    description:
      "We explore emerging technologies and transform promising ideas into practical solutions.",
  },
  {
    name: "Human + Technology",
    description:
      "Technology creates possibilities. People turn those possibilities into progress.",
  },
];

/* -------------------------------- industries ------------------------------ */

export const INDUSTRIES_SECTION = {
  eyebrow: "06 — Industries",
  title: "Technology Built Around Your Business.",
  lede: "Our capabilities can support organizations across industries, including:",
  cta: { label: "Explore Industries", href: "#/contact" },
} as const;

export const INDUSTRIES: string[] = [
  "Banking & Financial Services",
  "Healthcare",
  "Education",
  "Retail & E-commerce",
  "Hospitality",
  "Manufacturing",
  "Professional Services",
  "Startups & Emerging Businesses",
];

/* ----------------------------- vision & mission --------------------------- */

export const VISION = {
  eyebrow: "Our vision",
  title: "A Better World Through Technology, Education & Innovation.",
  body: "We envision a world where technology expands human potential, education creates opportunity, and innovation enables individuals and organizations to thrive.",
} as const;

export const MISSION = {
  eyebrow: "Our mission",
  title: "Bridging Technology and Human Potential.",
  body: "Our mission is to empower individuals and organizations through transformative education, intelligent technology, and innovative business solutions that enable sustainable growth.",
} as const;

export const VISION_MISSION_SECTION = {
  eyebrow: "07 — Vision & mission",
} as const;

/* ------------------------------ final CTA banner --------------------------- */

export const FINAL_CTA = {
  eyebrow: "12 — Connect",
  title: "Let's Build What's Next.",
  sub: "Ready to transform your next idea into impact?",
  body: "Whether you're exploring AI, modernizing your technology environment, building a digital product, strengthening cybersecurity, developing talent, or preparing your workforce for the future — ABWcurious is ready to work with you.",
  ctas: [
    { label: "Talk to Us", href: "#/contact" },
    { label: "Explore Capabilities", href: "#capabilities" },
  ] as const,
} as const;
