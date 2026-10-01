/* ==========================================================================
 * ABWcurious — COMPANY CONTENT FILE (single source of truth)
 * ==========================================================================
 * EVERYTHING the people / events / journey sections render lives here.
 * Replace the values below to update the whole site — no code changes needed.
 *
 * PLACEHOLDER CONVENTIONS
 * -----------------------
 * • Strings wrapped in [BRACKETS] are unresolved placeholders (links, names).
 *   The UI detects them (see `isPlaceholder`) and renders those links as
 *   disabled-but-styled controls with a hint tooltip instead of dead links.
 * • Numbers (stats, years) and event/gallery content are clearly-labelled
 *   SAMPLE values so the site looks alive before real data arrives. Every
 *   section shows a small "sample data" note; delete the note once real
 *   content is in place (each section reads `SAMPLE_NOTE`).
 * • Founder/co-founder photos intentionally have NO fake portraits — the UI
 *   renders an elegant monogram tile marked "Photo placeholder" until you
 *   drop real headshots into /public/images and set `photo` below.
 * ========================================================================== */

/* ------------------------------- helpers -------------------------------- */

/** True when a link is still an unresolved [PLACEHOLDER]. */
export const isPlaceholder = (v?: string | null): boolean =>
  !v || v.trim().startsWith("[");

/** Visible note rendered under sections (cleared for production). */
export const SAMPLE_NOTE = "";

/* ------------------------------- company -------------------------------- */

export const COMPANY = {
  name: "ABWcurious",
  wordmark: "ABWCURIOUS",
  /** Brand line — utility bar, footer (source: "ABWcurious Website.docx"). */
  tagline: "Engineering A Better World.",
  /** Short company description — hero + footer. */
  description:
    "ABWcurious is a technology and innovation company delivering intelligent digital solutions, future-ready education, cybersecurity, software engineering, IT services, and talent solutions.",
  /** Longer story paragraphs for the About section. */
  story: [
    "Our journey began in 2025 with a simple vision: to solve real challenges in education and business through technology and innovation.",
    "We started with a small idea and faced challenges in turning our concept into reality. Those challenges helped us learn, improve, and better understand the needs of students and business owners.",
    "That journey led to ABWcurious — a step toward building practical digital solutions that empower individuals and businesses. This is just the beginning of our journey.",
  ],
  email: "info@abwcurious.com",
  emailHr: "hr@abwcurious.com",
  emailSales: "sales@abwcurious.com",
  phone: "+91 99303 38504", // PLACEHOLDER number — replace with the real one
  phoneHref: "tel:+919930338504",
  legalName: "ABWcurious (OPC) Private Limited",
  legalFullName: "ABWCURIOUS (OPC) PRIVATE LIMITED",
  cin: "U62011MR2026OPC478364",
  gst: "27ABGCA1303A1ZI",
  address: "Navi Mumbai, Maharashtra 400706",
  fullAddress: "S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India",
  hours: "Mon–Sat · 9:00–19:00 IST",
  established: "2026", // SAMPLE year — replace with the real founding year
  /**
   * Studio location on the map. The embed is an OpenStreetMap iframe built
   * from these coords (no API key needed); `directionsUrl` opens a maps
   * search for the address above. Update lat/lng when the studio address
   * becomes real.
   */
  map: {
    lat: 19.0247909,
    lng: 73.0221279,
    /** Zoom span for the OSM embed bbox (degrees). */
    span: 0.015,
    directionsUrl:
      "https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu",
  },
} as const;

/** Values shown as feature rows in the About section. */
export const VALUES = [
  {
    title: "Curiosity first",
    description:
      "Every project starts with questions, not assumptions. We explore before we build.",
    icon: "sparkles",
  },
  {
    title: "People powered",
    description:
      "Small senior team, big ownership. The people you meet on day one ship your product.",
    icon: "users",
  },
  {
    title: "Craft in everything",
    description:
      "From pixel to pipeline — we sweat details, and we celebrate the craft publicly.",
    icon: "gem",
  },
] as const;

/* ------------------------------ leadership ------------------------------- */

export type LeaderSocials = {
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  github?: string;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  /** Path under /public (e.g. "/images/founder.jpg") — leave undefined to show the monogram placeholder tile. */
  photo?: string;
  /** Initials shown on the placeholder tile. */
  monogram: string;
  bio: string;
  expertise: string[];
  highlights: { label: string; value: string }[];
  socials: LeaderSocials;
  /** Featured card (founder) renders wider than the co-founder grid cards. */
  featured?: boolean;
};

export const FOUNDERS: Leader[] = [
  {
    id: "founder",
    name: "[Founder Name]",
    role: "Founder & Chief Executive Officer",
    // photo: "/images/founder.jpg", // ← set this when the real photo is ready
    monogram: "F",
    bio: "Placeholder biography — introduce the founder here: the spark that started ABWcurious, the problems they love solving, and the vision they are chasing next. Two or three sentences is perfect.",
    expertise: ["Vision & Strategy", "Product Leadership", "Partnerships"],
    highlights: [
      { label: "Journey", value: "Since day one" },
      { label: "Focus", value: "Vision & growth" },
      { label: "Based in", value: "Nerul, Navi Mumbai" },
    ],
    socials: {
      linkedin: "[LINKEDIN_URL]",
      instagram: "[INSTAGRAM_URL]",
      twitter: "[X_URL]",
      website: "[WEBSITE_URL]",
    },
    featured: true,
  },
];

export const CO_FOUNDERS: Leader[] = [
  {
    id: "co-founder-tech",
    name: "[Co-Founder Name]",
    role: "Co-Founder & Chief Technology Officer",
    monogram: "C",
    bio: "Placeholder biography — describe the co-founder's engineering story: what they build, how they lead the team, and the technical philosophy they bring to every ABWcurious product.",
    expertise: ["Engineering & Architecture", "AI Systems", "Mentorship"],
    highlights: [
      { label: "Leads", value: "Engineering" },
      { label: "Shipped", value: "6 platforms" },
      { label: "Based in", value: "Nerul, Navi Mumbai" },
    ],
    socials: {
      linkedin: "[LINKEDIN_URL]",
      twitter: "[X_URL]",
      website: "[WEBSITE_URL]",
    },
  },
  {
    id: "co-founder-design",
    name: "[Co-Founder Name]",
    role: "Co-Founder & Chief Design Officer",
    monogram: "C",
    bio: "Placeholder biography — describe the co-founder's design journey: the craft they obsess over, the experiences they shape, and how they keep the brand honest across every touchpoint.",
    expertise: ["Brand & Product Design", "Experience Strategy", "Design Systems"],
    highlights: [
      { label: "Leads", value: "Design" },
      { label: "Craft", value: "UX · UI · Brand" },
      { label: "Based in", value: "Nerul, Navi Mumbai" },
    ],
    socials: {
      linkedin: "[LINKEDIN_URL]",
      instagram: "[INSTAGRAM_URL]",
      youtube: "[YOUTUBE_URL]",
    },
  },
];

export const ALL_LEADERS: Leader[] = [...FOUNDERS, ...CO_FOUNDERS];

/* ---------------------------- journey timeline --------------------------- */

export type MilestoneKind = "founding" | "milestone" | "achievement" | "expansion";

export type Milestone = {
  year: string;
  title: string;
  description: string;
  kind: MilestoneKind;
};

export const TIMELINE: Milestone[] = [
  {
    year: "2025",
    title: "Our Journey Begins",
    description:
      "Our journey began in 2025 with a simple vision: to solve real challenges in education and business through technology and innovation. Overcoming early concept challenges helped us learn, improve, and better understand student and business needs.",
    kind: "milestone",
  },
  {
    year: "2026",
    title: "The idea becomes a company",
    description:
      "ABWcurious was founded in Navi Mumbai around one conviction: curious people build better software. A step toward building practical digital solutions that empower individuals and businesses.",
    kind: "founding",
  },
];

/* -------------------------------- events --------------------------------- */

export const EVENT_CATEGORIES = [
  "Conferences",
  "Team Events",
  "Workshops",
  "Celebrations",
  "Product Events",
  "Corporate Events",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
export type EventStatus = "upcoming" | "recent" | "past";

export const EVENT_STATUS_LABEL: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  recent: "Recent",
  past: "Past",
};

export type CompanyEvent = {
  id: string;
  name: string;
  /** Display date string — keep it human, e.g. "Mar 14, 2026". */
  date: string;
  location: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  /** Cover image path under /public. */
  cover: string;
  /** Extra photos shown in the event detail modal. */
  gallery: string[];
  /** Video URL (YouTube/Vimeo embed or mp4) — leave a [PLACEHOLDER] to hide the player. */
  video?: string;
  /** External event page URL (LinkedIn post, landing page…). */
  url?: string;
};

export const EVENTS: CompanyEvent[] = [
  {
    id: "annual-summit-2026",
    name: "ABWcurious Annual Summit",
    date: "Dec 12, 2026",
    location: "Nerul, Navi Mumbai, India",
    description:
      "Our flagship internal summit: a full day of product engineering demos, architecture roadmaps and hackathon finales.",
    category: "Product Events",
    status: "upcoming",
    cover: "/images/ev-summit.jpg",
    gallery: ["/images/ev-launch.jpg", "/images/gl-team.jpg", "/images/ev-keynote.jpg"],
    url: "https://www.abwcurious.com/events",
  },
  {
    id: "ai-workshop-series",
    name: "Applied AI Workshop Series",
    date: "Oct 04, 2026",
    location: "ABWcurious Studio, Nerul, Navi Mumbai",
    description:
      "A hands-on workshop series where engineers and designers pair up to prototype LLM and RAG features.",
    category: "Workshops",
    status: "recent",
    cover: "/images/ev-workshop.jpg",
    gallery: ["/images/gl-office.jpg", "/images/ev-summit.jpg"],
    url: "https://www.abwcurious.com/events",
  },
  {
    id: "leadership-roundtable",
    name: "Leadership Roundtable with Partners",
    date: "Sep 18, 2026",
    location: "Navi Mumbai, Maharashtra",
    description:
      "An evening roundtable with client partners on responsible AI, software architecture strategy, and enterprise digital growth.",
    category: "Corporate Events",
    status: "recent",
    cover: "/images/ev-roundtable.jpg",
    gallery: ["/images/ev-keynote.jpg", "/images/gl-award.jpg"],
    url: "https://www.abwcurious.com/events",
  },
  {
    id: "team-offsite-ghats",
    name: "Team Offsite — Western Ghats",
    date: "Jun 21, 2026",
    location: "Lonavala, India",
    description:
      "Strategy sessions, team bonding, and technical roadmap planning surrounded by nature in the Western Ghats.",
    category: "Team Events",
    status: "past",
    cover: "/images/ev-offsite.jpg",
    gallery: ["/images/gl-team.jpg", "/images/gl-office.jpg"],
    url: "https://www.abwcurious.com/events",
  },
  {
    id: "intelliqr-launch",
    name: "IntelliQR Public Launch",
    date: "Apr 02, 2026",
    location: "Navi Mumbai, India",
    description:
      "Launching IntelliQR dynamic QR code technology engine with live demos and analytics dashboard walkthroughs.",
    category: "Product Events",
    status: "past",
    cover: "/images/ev-launch.jpg",
    gallery: ["/images/ev-summit.jpg", "/images/ev-workshop.jpg"],
    url: "https://www.abwcurious.com/events",
  },
  {
    id: "devcon-keynote",
    name: "Keynote — DevCon Mumbai",
    date: "Feb 14, 2026",
    location: "DevCon, Mumbai",
    description:
      "ABWcurious technical leaders sharing insights on shipping scalable AI and Next.js applications.",
    category: "Conferences",
    status: "past",
    cover: "/images/ev-keynote.jpg",
    gallery: ["/images/ev-roundtable.jpg"],
    url: "https://www.abwcurious.com/events",
  },
  {
    id: "founders-day-2026",
    name: "Founders' Day Celebration",
    date: "Jan 09, 2026",
    location: "ABWcurious Studio, Nerul, Navi Mumbai",
    description:
      "Celebrating growth, engineering milestones, and the team behind ABWcurious.",
    category: "Celebrations",
    status: "past",
    cover: "/images/ev-anniversary.jpg",
    gallery: ["/images/gl-team.jpg", "/images/gl-award.jpg", "/images/gl-office.jpg"],
    url: "https://www.abwcurious.com/events",
  },
];

/* -------------------------------- gallery -------------------------------- */

export type GalleryItem = {
  src: string;
  /** Alt text (accessibility) — describe the moment. */
  alt: string;
  caption: string;
  category: string;
  /** Intrinsic pixel size of the file (used for aspect-ratio + next/image). */
  width: number;
  height: number;
};

const LAND = { width: 1344, height: 768 };
const SQ = { width: 1152, height: 864 };

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/ev-summit.jpg",
    alt: "Keynote stage with blue lighting at the annual summit",
    caption: "Annual Summit — main stage",
    category: "Events",
    ...LAND,
  },
  {
    src: "/images/gl-office.jpg",
    alt: "Modern studio interior with plants and blue accents",
    caption: "The studio, on a quiet morning",
    category: "Office",
    ...SQ,
  },
  {
    src: "/images/ev-offsite.jpg",
    alt: "Team celebrating outdoors on a hilltop at golden hour",
    caption: "Offsite — Western Ghats",
    category: "Team",
    ...LAND,
  },
  {
    src: "/images/gl-team.jpg",
    alt: "Team members laughing together in the office lounge",
    caption: "Friday, around 6 pm",
    category: "Team",
    ...SQ,
  },
  {
    src: "/images/ev-launch.jpg",
    alt: "Product launch demo on stage with a large dashboard screen",
    caption: "IntelliQR launch night",
    category: "Events",
    ...LAND,
  },
  {
    src: "/images/gl-award.jpg",
    alt: "Award ceremony on a blue-lit stage",
    caption: "Bringing home an award",
    category: "Awards",
    ...SQ,
  },
  {
    src: "/images/ev-workshop.jpg",
    alt: "Workshop table with laptops and sticky notes",
    caption: "Applied AI workshop",
    category: "Workshops",
    ...LAND,
  },
  {
    src: "/images/ev-anniversary.jpg",
    alt: "Office celebration with balloons and confetti",
    caption: "Founders' Day decorations",
    category: "Celebrations",
    ...LAND,
  },
  {
    src: "/images/ev-roundtable.jpg",
    alt: "Roundtable discussion in a glass boardroom",
    caption: "Partner roundtable",
    category: "Behind the scenes",
    ...LAND,
  },
  {
    src: "/images/ev-keynote.jpg",
    alt: "Speaker on stage at an industry conference",
    caption: "DevCon keynote",
    category: "Events",
    ...LAND,
  },
];

/* --------------------------------- stats --------------------------------- */

export type CompanyStat = { value: number; suffix?: string; label: string };

/** SAMPLE figures — replace with real numbers before going live. */
export const STATS: CompanyStat[] = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 86, suffix: "+", label: "Projects Completed" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Events Hosted" },
];

/* -------------------------------- socials -------------------------------- */

export type SocialPlatform = "linkedin" | "instagram" | "twitter" | "youtube" | "facebook";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
};

/** All brand socials — [PLACEHOLDER] URLs render as disabled controls. */
export const SOCIALS: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", handle: "ABWcurious", href: "https://in.linkedin.com/company/abwcurious?trk=public_post_feed-actor-name" },
  { platform: "instagram", label: "Instagram", handle: "@abwcurious", href: "https://www.instagram.com/abwcurious?igsh=b2o3eGxxbGtlM2pu" },
  { platform: "twitter", label: "X (Twitter)", handle: "@abwcurious", href: "https://x.com/abwcurious?t=Y6CfDuM_ljg1gNvd7ByVQA&s=09" },
  { platform: "youtube", label: "YouTube", handle: "ABWcurious Studio", href: "https://www.youtube.com/@ABWcurious" },
  { platform: "facebook", label: "Facebook", handle: "ABWcurious", href: "https://www.facebook.com/share/1aTRdmi65g/" },
];
