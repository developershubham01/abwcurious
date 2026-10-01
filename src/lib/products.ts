/**
 * ABWcurious product line — the company's own platforms, shown in the
 * "Innovation Beyond Services" home section, the navbar Products dropdown
 * and their own full-screen product pages (#/products/<slug>).
 *
 * Source of the product names + taglines: "ABWcurious Website.docx"
 * (Kapikitab.in · TheCodeArena.com · Restaurant360 · Business360 · IntelliQR).
 *
 * Each product carries:
 *  - a `demo` kind rendered as a looping product-tour animation
 *  - `dither` props that tune the DitherVeil hero on its detail page
 *  - a `prefill` mapping to the 6 service categories so the contact-form
 *    pipeline stays consistent.
 */

export type ProductStatus = "live" | "beta" | "soon";

/** Which looping product-tour demo the detail page plays. */
export type ProductDemoKind = "radar" | "arena" | "orders" | "quiz" | "shelf" | "qr" | "ops";

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
    slug: "kapikitab",
    num: "P1",
    name: "Kapikitab.in",
    shortName: "Kapikitab",
    tagline: "Digital learning for a changing world.",
    description:
      "Learning should not be limited to books and classrooms. Kapikitab combines traditional learning with modern technology — helping students master concepts by visualizing them in 3D and practicing to excel in their goals. By integrating artificial intelligence and augmented reality, we aren't just digitizing textbooks: we are creating a personalized, interactive environment where understanding comes naturally, and every student receives personalized tutoring.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-kapikitab.jpg",
    imageAlt:
      "Isometric illustration of a digital education platform with 3D geometry models rising from a laptop, AR book layers and an AI tutor panel",
    features: [
      "Concepts visualized in interactive 3D",
      "AI personalized tutoring for every student",
      "Augmented-reality layers on top of textbooks",
      "Learn → Practice → Build → Apply → Grow paths",
    ],
    stack: ["3D", "AR", "AI tutoring", "Web + Mobile"],
    metrics: [
      { value: "3D", label: "Core concepts visualized" },
      { value: "1:1", label: "AI tutoring per student" },
      { value: "5", label: "Stages: learn to grow" },
    ],
    prefill: "AI & Automation",
    cta: "Explore Kapikitab.in",
    demo: "shelf",
    demoLabel: "The shelf — your library, annotated and alive",
    dither: { pattern: "atkinson", palette: "duotone" },
  },
  {
    slug: "thecodearena",
    num: "P2",
    name: "TheCodeArena.com",
    shortName: "CodeArena",
    tagline: "A platform for learning, coding, and technology skills.",
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
    tagline: "Digital solutions for modern restaurant operations.",
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
    slug: "business360",
    num: "P4",
    name: "Business360",
    shortName: "Biz360",
    tagline: "Technology for connected business operations and decision-making.",
    description:
      "One connected core for the whole company: CRM, HRMS, inventory, billing and analytics on a single operational layer. Business360 turns everyday transactions into live dashboards and decision-ready insight — so leaders steer by evidence, not guesswork, and every team works from the same source of truth.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-business360.jpg",
    imageAlt:
      "Isometric illustration of a connected business operations platform with CRM pipeline, HRMS panels, invoice and inventory cards flowing into one analytics dashboard",
    features: [
      "CRM, HRMS & billing on one operational core",
      "Live dashboards for revenue, stock & people",
      "Decision-ready reports for every role",
      "Integrations — payments, WhatsApp, accounting",
    ],
    stack: ["CRM", "HRMS", "ERP", "Analytics"],
    metrics: [
      { value: "360°", label: "View of your operations" },
      { value: "80+", label: "Business systems delivered" },
      { value: "<1 hr", label: "Support response SLA" },
    ],
    prefill: "IT Support & Business Solutions",
    cta: "See Business360 in action",
    demo: "ops",
    demoLabel: "The operations board — pipeline, tickets and cash flowing live",
    dither: { pattern: "bayer", palette: "duotone" },
  },
  {
    slug: "intelliqr",
    num: "P5",
    name: "IntelliQR",
    shortName: "IntelliQR",
    tagline: "Intelligent QR for developers. Built for the intelligence age.",
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
    prefill: "Marketing",
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
