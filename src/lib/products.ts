/**
 * ABWcurious product line — the studio's own SaaS platforms, shown in the
 * "Our products" home section, the navbar Products dropdown and their own
 * full-screen product pages (#/products/<slug>).
 *
 * Each product carries:
 *  - a `demo` kind rendered as a looping product-tour animation
 *  - `dither` props that tune the DitherVeil hero on its detail page
 *  - a `prefill` mapping to the 6 service categories so the contact-form
 *    pipeline stays consistent.
 */

export type ProductStatus = "live" | "beta" | "soon";

/** Which looping product-tour demo the detail page plays. */
export type ProductDemoKind = "radar" | "arena" | "orders" | "quiz" | "shelf" | "qr";

export interface Product {
  slug: string;
  num: string;
  name: string;
  /** Short name for tight UI (dropdown rows, chips). */
  shortName: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  image: string;
  imageAlt: string;
  features: string[];
  stack: string[];
  /** 3 headline metrics shown on the detail page. */
  metrics: { value: string; label: string }[];
  /** Category name from catalog.ts used to prefill the contact select. */
  prefill: string;
  cta: string;
  demo: ProductDemoKind;
  /** Caption above the demo window. */
  demoLabel: string;
  /** DitherVeil tuning for the detail-page hero. */
  dither: { pattern: "bayer" | "noise" | "atkinson" | "floyd" | "lines"; palette: "duotone" | "rgb" };
}

export const PRODUCTS: Product[] = [
  {
    slug: "cyberintelligence360",
    num: "P1",
    name: "CyberIntelligence360",
    shortName: "Cyber360",
    tagline: "Enterprise AI-powered cybersecurity platform",
    description:
      "A unified threat-intelligence platform that watches your entire stack — cloud, endpoints and identities — and turns raw signals into ranked, actionable incidents. AI correlation cuts alert noise so your team sees the five threats that matter, not the five thousand that don't.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-cyber360.jpg",
    imageAlt:
      "Isometric illustration of an AI cybersecurity platform with a glowing shield over a data center, radar sweeps and a world threat map",
    features: [
      "AI threat detection across cloud & endpoints",
      "24/7 SOC-style monitoring dashboards",
      "Automated incident response playbooks",
      "Compliance reports — ISO 27001, SOC 2, GDPR",
    ],
    stack: ["SIEM", "EDR", "Zero Trust", "MITRE ATT&CK"],
    metrics: [
      { value: "99.2%", label: "Threat detection accuracy" },
      { value: "<40s", label: "Median alert-to-triage" },
      { value: "24/7", label: "Autonomous monitoring" },
    ],
    prefill: "Cloud, IT & Business Solutions",
    cta: "Request a security demo",
    demo: "radar",
    demoLabel: "Live threat operations — radar sweep, blips and the AI incident feed",
    dither: { pattern: "lines", palette: "duotone" },
  },
  {
    slug: "thecodearena",
    num: "P2",
    name: "TheCodeArena",
    shortName: "CodeArena",
    tagline: "Developer ecosystem for coding & collaboration",
    description:
      "Where developers sharpen each other: realtime coding arenas, ranked challenges and git-native project rooms with AI review copilots. Teams run pair-programming battles, hiring assessments and open-source sprints in one collaborative surface.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-codearena.jpg",
    imageAlt:
      "Isometric illustration of a developer collaboration platform with floating code editors, a git branch graph, trophy and leaderboard panels",
    features: [
      "Realtime collaborative code arenas",
      "Ranked challenges & global leaderboards",
      "AI code-review copilot on every submission",
      "Git-native rooms for teams & hiring",
    ],
    stack: ["CRDT", "WebRTC", "Monaco", "CI bots"],
    metrics: [
      { value: "12k+", label: "Developers in the arena" },
      { value: "480ms", label: "Typical sync latency" },
      { value: "35+", label: "Languages & runtimes" },
    ],
    prefill: "Software & Web Development",
    cta: "Enter the arena",
    demo: "arena",
    demoLabel: "Arena mode — two developers, one problem, live typing race",
    dither: { pattern: "bayer", palette: "duotone" },
  },
  {
    slug: "restaurant360",
    num: "P3",
    name: "Restaurant360",
    shortName: "Resto360",
    tagline: "All-in-one restaurant management SaaS",
    description:
      "One system of record for the whole house: POS, kitchen display, QR menu ordering, inventory and staff intelligence — synced in real time. Owners see food cost and table turns live; kitchens see tickets the second a guest taps order.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-restaurant360.jpg",
    imageAlt:
      "Isometric illustration of restaurant management software with a floor plan of tables, POS terminal, kitchen tickets and analytics panels",
    features: [
      "POS + KDS + inventory in one system",
      "QR menu ordering with live carts",
      "Table, staff & delivery floor intelligence",
      "Food-cost and GST-ready reporting",
    ],
    stack: ["POS", "KDS", "Payments", "CRM"],
    metrics: [
      { value: "310+", label: "Outlets onboarded" },
      { value: "22%", label: "Average food-cost saved" },
      { value: "9s", label: "Order-to-kitchen latency" },
    ],
    prefill: "Software & Web Development",
    cta: "Book a restaurant demo",
    demo: "orders",
    demoLabel: "Service floor — live orders flowing from New to Cooking to Served",
    dither: { pattern: "noise", palette: "duotone" },
  },
  {
    slug: "studyspark",
    num: "P4",
    name: "StudySpark",
    shortName: "StudySpark",
    tagline: "AI-powered adaptive learning platform",
    description:
      "An adaptive tutor that rebuilds the learning path after every answer: spaced repetition, instant doubt-solving and gamified streaks keep students moving, while educator dashboards show exactly where a cohort is struggling.",
    status: "beta",
    statusLabel: "Beta",
    image: "/images/prod-studyspark.jpg",
    imageAlt:
      "Isometric illustration of an adaptive learning platform with an open book and spark, quiz cards, rising progress chart and a graduation cap",
    features: [
      "Adaptive learning paths per student",
      "AI tutor with instant doubt-solving",
      "Gamified quizzes, streaks & badges",
      "Educator analytics for every cohort",
    ],
    stack: ["LLM", "Spaced repetition", "Analytics", "PWA"],
    metrics: [
      { value: "1.8x", label: "Concept retention uplift" },
      { value: "26k", label: "Questions attempted daily" },
      { value: "92%", label: "Weekly active learners" },
    ],
    prefill: "AI & Automation",
    cta: "Join the beta",
    demo: "quiz",
    demoLabel: "Adaptive session — the path rebuilds after every answer",
    dither: { pattern: "floyd", palette: "duotone" },
  },
  {
    slug: "kapikitab",
    num: "P5",
    name: "KapiKitab",
    shortName: "KapiKitab",
    tagline: "Digital knowledge management & book discovery",
    description:
      "Your library, superintelligent: import books and papers, get AI summaries and key-idea extraction, discover what to read next from your taste graph, and share annotated reading circles with your team or book club.",
    status: "beta",
    statusLabel: "Beta",
    image: "/images/prod-kapikitab.jpg",
    imageAlt:
      "Isometric illustration of a digital book discovery platform with floating hardcover books rising from a laptop, library shelf and tag chips",
    features: [
      "Personal cloud library for books & papers",
      "AI summaries & key-idea extraction",
      "Taste-graph based book discovery",
      "Reading circles with shared notes",
    ],
    stack: ["Embeddings", "OCR", "Recsys", "Web+Mobile"],
    metrics: [
      { value: "40k+", label: "Titles catalogued" },
      { value: "3 min", label: "Average summary read" },
      { value: "1.4k", label: "Active reading circles" },
    ],
    prefill: "AI & Automation",
    cta: "Join the beta",
    demo: "shelf",
    demoLabel: "The shelf — your library, annotated and alive",
    dither: { pattern: "atkinson", palette: "duotone" },
  },
  {
    slug: "intelliqr",
    num: "P6",
    name: "IntelliQR",
    shortName: "IntelliQR",
    tagline: "Dynamic QR codes with real-time analytics",
    description:
      "Print once, retarget forever: dynamic QR destinations you can edit after the poster goes up, with real-time scan analytics, geo maps, device breakdowns and smart fallback pages that A/B test themselves.",
    status: "soon",
    statusLabel: "Coming soon",
    image: "/images/prod-intelliqr.jpg",
    imageAlt:
      "Isometric illustration of a dynamic QR analytics platform with a QR code of floating blue cubes, a scanning beam, phones and live analytics charts",
    features: [
      "Dynamic destinations — editable after print",
      "Real-time scan analytics & geo maps",
      "Bulk generation with brand styling",
      "Smart fallback pages with A/B tests",
    ],
    stack: ["Edge redirects", "Analytics", "SVG engine", "CDN"],
    metrics: [
      { value: "12M+", label: "Scans projected / year" },
      { value: "99.99%", label: "Redirect uptime SLA" },
      { value: "180ms", label: "Global redirect latency" },
    ],
    prefill: "Digital Marketing",
    cta: "Join the waitlist",
    demo: "qr",
    demoLabel: "Scan intelligence — the matrix, the sweep and the live counters",
    dither: { pattern: "noise", palette: "duotone" },
  },
];

export const PRODUCT_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function productStatusTotals() {
  return {
    total: PRODUCTS.length,
    live: PRODUCTS.filter((p) => p.status === "live").length,
    beta: PRODUCTS.filter((p) => p.status === "beta").length,
    soon: PRODUCTS.filter((p) => p.status === "soon").length,
  };
}
