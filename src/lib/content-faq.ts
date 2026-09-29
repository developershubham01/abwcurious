/**
 * Shared FAQ content — single source of truth consumed by:
 * - the FAQ section (src/components/site/faq.tsx)
 * - the FAQPage JSON-LD structured data in src/app/layout.tsx
 */

export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQS: FaqEntry[] = [
  {
    q: "What does ABWcurious actually do?",
    a: "We are a technology studio covering four disciplines: AI software development, AI solutions, website development and design. In practice that means we can take a product from idea to production — strategy, UI/UX, engineering and launch — with one accountable team.",
  },
  {
    q: "How long does a typical project take?",
    a: "A marketing website usually ships in 2–4 weeks. A custom web application or AI feature typically runs 6–12 weeks depending on scope. We work in weekly increments, so you see working software from the first sprint — not a big reveal at the end.",
  },
  {
    q: "Can you integrate AI into our existing product?",
    a: "Yes — that is one of our most requested engagements. We audit your current stack, identify where AI creates measurable leverage (support, search, document processing, automation) and ship integrations that respect your existing data privacy and infrastructure constraints.",
  },
  {
    q: "What technologies do you work with?",
    a: "Modern, typed, well-supported stacks: Next.js and React on the web, Python and Node.js on the backend, PostgreSQL and vector databases for data, and major LLM providers plus open-source models. We choose boring technology where it counts and innovative technology where it pays.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed-price for well-defined scopes (websites, audits, MVPs), and a monthly product squad for evolving products. Every engagement starts with a free discovery call and a written proposal — no hourly surprises. See our plans above for typical ranges.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Every build includes a warranty period for fixes, and most clients continue on a care plan with monitoring, improvements and priority support. We also hand over clean documentation so you are never locked in.",
  },
  {
    q: "Who owns the code and designs?",
    a: "You do — 100%, from day one. We work in your repositories wherever possible, and every contract includes full IP transfer. Our job is to make ourselves unnecessary, not indispensable.",
  },
];
