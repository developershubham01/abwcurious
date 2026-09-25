/**
 * ABWcurious product line — the studio's own software products, shown in
 * the "Our products" home section. Each product maps to one of the 6
 * service categories so the contact-form prefill stays consistent.
 */

export type ProductStatus = "live" | "beta" | "soon";

export interface Product {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  image: string;
  imageAlt: string;
  features: string[];
  stack: string[];
  /** Category name from catalog.ts used to prefill the contact select. */
  prefill: string;
  cta: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "chatnest",
    num: "P1",
    name: "ChatNest",
    tagline: "AI customer support that answers in seconds, escalates with context.",
    description:
      "A grounded AI chatbot suite for websites and apps — trained on your docs, wired to your helpdesk, and handoff-ready for human agents.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-chatnest.jpg",
    imageAlt: "Isometric illustration of an AI chatbot platform with chat bubbles and a geometric assistant",
    features: [
      "Grounded replies on your own docs",
      "Human handoff with full transcript",
      "Leads & tickets straight to CRM",
    ],
    stack: ["RAG", "Next.js", "Vector DB"],
    prefill: "AI & Automation",
    cta: "Get a demo",
  },
  {
    slug: "hireflow",
    num: "P2",
    name: "HireFlow",
    tagline: "Recruitment pipeline software from sourcing to offer letter.",
    description:
      "An applicant-tracking workspace for lean teams — kanban pipelines, automated screening, interview scheduling and offer tracking in one board.",
    status: "live",
    statusLabel: "Live",
    image: "/images/prod-hireflow.jpg",
    imageAlt: "Isometric illustration of a recruitment kanban board with candidate cards in pipeline columns",
    features: [
      "Drag-and-drop hiring pipelines",
      "AI screening & rank scoring",
      "Interview scheduling built in",
    ],
    stack: ["ATS", "Prisma", "Calendar API"],
    prefill: "Recruitment & HR Solutions",
    cta: "Get a demo",
  },
  {
    slug: "billmint",
    num: "P3",
    name: "BillMint",
    tagline: "GST-ready invoicing for Indian SMBs, without the clutter.",
    description:
      "Create branded invoices in seconds, reconcile payments, and file-ready GST summaries export in one click — built for shops, studios and agencies.",
    status: "beta",
    statusLabel: "Beta",
    image: "/images/prod-billmint.jpg",
    imageAlt: "Isometric illustration of invoicing software with documents, calculator and charts",
    features: [
      "GST + e-invoice templates",
      "Payment reminders on autopilot",
      "One-click account exports",
    ],
    stack: ["Invoicing", "PDF engine", "UPI"],
    prefill: "Cloud, IT & Business Solutions",
    cta: "Join the beta",
  },
  {
    slug: "documind",
    num: "P4",
    name: "DocuMind",
    tagline: "AI resume & document toolkit — parse, score, and draft.",
    description:
      "Drop in resumes, contracts or reports and get structured data back: skill extraction, scoring rubrics and one-command document drafting.",
    status: "soon",
    statusLabel: "Coming soon",
    image: "/images/prod-documind.jpg",
    imageAlt: "Isometric illustration of an AI document toolkit scanning pages with an AI chip",
    features: [
      "Resume parsing to clean JSON",
      "Role-fit scoring rubrics",
      "Draft contracts & cover letters",
    ],
    stack: ["LLM", "OCR", "Workflows"],
    prefill: "AI & Automation",
    cta: "Join the waitlist",
  },
];
