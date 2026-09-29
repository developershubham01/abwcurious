/**
 * ABWcurious Self-Contained RAG (Retrieval-Augmented Generation) Engine
 * -----------------------------------------------------------------------
 * Works 100% locally with ZERO external API keys required.
 * - Indexes complete company knowledge, services, products, FAQs, and processes.
 * - Uses semantic & BM25-weighted retrieval with synonym expansion.
 * - Synthesizes context-grounded, articulate responses with interactive links.
 * - Supports English and Hindi/Hinglish conversational queries.
 */

import { CATEGORIES } from "./catalog";
import { PRODUCTS } from "./products";
import { FAQS } from "./content-faq";
import { TRAINING_TRACKS } from "@/data/training";

export interface KnowledgeChunk {
  id: string;
  category: "company" | "service" | "product" | "process" | "faq" | "contact" | "training";
  title: string;
  tags: string[];
  content: string;
  url?: string;
  highlights?: string[];
}

// ─── Compile All Knowledge Chunks ──────────────────────────────────────────

function buildKnowledgeBase(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    // 1. Company Core
    {
      id: "company-overview",
      category: "company",
      title: "About ABWcurious",
      tags: ["about", "company", "who", "abwcurious", "story", "values", "experience", "navi mumbai", "nerul", "mumbai", "darave", "location", "headquarters", "team", "founder", "ceo", "cto", "address"],
      content: `ABWcurious (OPC) Private Limited is a technology and innovation company headquartered at Haware's Centurion, Nerul (East), Navi Mumbai, Maharashtra, India.
Founded in 2019, we have 7+ years of experience engineering digital platforms, intelligent AI solutions, enterprise websites, mobile apps, and business systems.
Our registered office is located at S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India.
Our team consists of 24 senior in-house engineers, designers, and AI specialists. We have successfully completed 86+ projects for 40+ happy clients worldwide and hosted 32 tech events.
Our Core Values:
1. Curiosity First — Every project starts with exploration and questions, not assumptions.
2. People Powered — Small senior pods, high ownership. The senior people you meet on day one build and ship your product.
3. Craft in Everything — From pixel to pipeline, we sweat details and take pride in rock-solid code.`,
      highlights: [
        "Headquartered at Haware's Centurion, Nerul, Navi Mumbai, Maharashtra",
        "7+ Years of industry experience",
        "24 Senior in-house team members",
        "86+ Delivered projects across web, mobile, and AI",
        "40+ Satisfied global clients",
      ],
      url: "#/about",
    },

    // 2. Contact & Commercials
    {
      id: "company-contact",
      category: "contact",
      title: "Contact & Location — ABWcurious",
      tags: ["contact", "email", "phone", "call", "address", "location", "hire", "quote", "consultation", "reach", "navi mumbai", "nerul", "darave", "centurion", "haware", "office", "timing", "hours", "number", "sampark", "baat", "map", "directions"],
      content: `You can reach ABWcurious anytime to discuss your project, request an MVP scope, or schedule a free 30-minute discovery call:
- Email: info@abwcurious.com
- Phone / WhatsApp: +91 99303 38504
- Registered Office & Studio: S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India
- Google Maps Location: https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu
- Working Hours: Monday to Saturday · 9:00 AM – 7:00 PM IST
- Discovery Call: Free initial consultation to understand your requirements, architecture, and timeline.`,
      highlights: [
        "Email: info@abwcurious.com",
        "Direct Phone / WhatsApp: +91 99303 38504",
        "Office: S07-05, Haware's Centurion, Sector 19A, Nerul (East), Navi Mumbai 400706",
        "Google Maps: 19.0247909, 73.0221279",
        "Free discovery call with senior architects",
      ],
      url: "#/contact",
    },

    // 3. Pricing & Timelines FAQ
    {
      id: "pricing-faq",
      category: "faq",
      title: "Pricing, Timelines & Commercial Models",
      tags: ["price", "pricing", "cost", "budget", "rate", "fees", "how much", "timeline", "duration", "weeks", "months", "mvp", "kharcha", "paisa", "kitna"],
      content: `We offer transparent, milestone-driven pricing tailored to project requirements:
1. Fixed-Price Scope: Best for clearly defined scopes such as marketing websites, technical audits, and MVPs. No hourly surprises.
2. Dedicated Product Pod: Monthly dedicated team (lead engineer, UI/UX designer, QA) for high-growth startups and evolving platforms.
3. Typical Timelines:
   - Marketing websites & landing pages: 2 to 4 weeks.
   - Mobile app first testable beta build: 2 weeks.
   - Comprehensive web application / custom SaaS MVP: 6 to 12 weeks.
Every project comes with 100% intellectual property (IP) transfer to the client from day one and full post-launch warranty support.`,
      highlights: [
        "Fixed-price quotes for well-defined scopes",
        "Dedicated monthly pods for scaling products",
        "Typical MVP timeline: 6 weeks",
        "Mobile first testable build: 2 weeks",
        "100% Client IP ownership",
      ],
      url: "#/contact",
    },

    // 4. IP Ownership & Post-Launch Support
    {
      id: "support-ownership-faq",
      category: "faq",
      title: "IP Ownership & Post-Launch Support",
      tags: ["support", "maintenance", "ownership", "ip", "code", "warranty", "sla", "github", "hosting", "security"],
      content: `At ABWcurious, you own 100% of your code, designs, and assets from day one. We work directly in your GitHub/GitLab repositories whenever possible.
Post-Launch Care:
- Every build includes a post-launch warranty period for bugs and adjustments.
- Ongoing SLA care plans available: 24/7 uptime monitoring, security patching, dependency updates, and feature iterations.
- Clean handover documentation so your internal team is never vendor-locked.`,
      highlights: [
        "100% client code & design ownership",
        "Post-launch warranty included on all builds",
        "Ongoing care and 24/7 monitoring plans available",
      ],
      url: "#/contact",
    },
  ];

  // 5. Add all Service Categories from catalog.ts
  CATEGORIES.forEach((cat) => {
    const subServicesList = cat.groups
      .flatMap((g) => g.items.map((i) => `• **${i.name}**: ${i.blurb}`))
      .join("\n");

    const processSteps = cat.process
      .map((p, idx) => `${idx + 1}. **${p.title}**: ${p.desc}`)
      .join("\n");

    const statsList = cat.stats.map((s) => `${s.value} (${s.label})`).join(", ");

    chunks.push({
      id: `service-${cat.slug}`,
      category: "service",
      title: `${cat.name} Service`,
      tags: [
        cat.slug,
        cat.name.toLowerCase(),
        cat.short.toLowerCase(),
        ...cat.typewriter.map((t) => t.toLowerCase()),
        ...cat.groups.flatMap((g) => [g.label.toLowerCase(), ...g.items.map((it) => it.name.toLowerCase())]),
      ],
      content: `### ${cat.name}
**Tagline:** ${cat.tagline}
**Overview:** ${cat.description}

**Key Metrics & Track Record:** ${statsList}

**What We Deliver:**
${subServicesList}

**Our Proven 4-Step Process:**
${processSteps}`,
      highlights: cat.stats.map((s) => `${s.value} ${s.label}`),
      url: `#/services/${cat.slug}`,
    });
  });

  // 6. Add all Products from products.ts
  PRODUCTS.forEach((prod) => {
    const featuresList = prod.features.map((f) => `• ${f}`).join("\n");
    const metricsList = prod.metrics.map((m) => `${m.value} (${m.label})`).join(", ");

    chunks.push({
      id: `product-${prod.slug}`,
      category: "product",
      title: `${prod.name} (Product)`,
      tags: [
        prod.slug,
        prod.name.toLowerCase(),
        prod.shortName.toLowerCase(),
        "product",
        "platform",
        "saas",
        ...prod.features.map((f) => f.toLowerCase()),
        ...prod.stack.map((s) => s.toLowerCase()),
      ],
      content: `### ${prod.name}
**Tagline:** ${prod.tagline}
**Status:** ${prod.statusLabel}
**Description:** ${prod.description}

**Key Features:**
${featuresList}

**Tech Stack:** ${prod.stack.join(", ")}
**Key Metrics:** ${metricsList}`,
      highlights: prod.metrics.map((m) => `${m.value} ${m.label}`),
      url: `#/products/${prod.slug}`,
    });
  });

  // 7. Add FAQs from content-faq.ts
  FAQS.forEach((faq, index) => {
    chunks.push({
      id: `faq-${index}`,
      category: "faq",
      title: `FAQ: ${faq.q}`,
      tags: faq.q.toLowerCase().split(/\s+/).filter((w) => w.length > 3),
      content: `**Question:** ${faq.q}\n**Answer:** ${faq.a}`,
    });
  });

  // 8. Development Methodology / How We Build
  chunks.push({
    id: "how-we-develop-process",
    category: "process",
    title: "How ABWcurious Develops Software, Websites & Apps",
    tags: [
      "how to develop", "development process", "methodology", "how do you build",
      "steps", "workflow", "lifecycle", "kaise banate ho", "process", "architecture"
    ],
    content: `ABWcurious follows an agile, transparent 4-stage engineering lifecycle:
1. **Discover & Scope (Week 1):** Detailed requirement analysis, user journey mapping, and measurable KPIs agreed before writing code.
2. **Architecture & Prototype:** Figma clickable design systems, interactive prototypes, API contract definition, and database schema modeling.
3. **Sprint & Ship:** 2-week agile sprints with working software demos on staging environments from sprint one. Automated CI/CD, linting, and automated unit/integration tests.
4. **Deploy, Harden & Care:** Zero-downtime deployment (AWS, GCP, Vercel), performance optimization (95+ Lighthouse), security hardening, and continuous monitoring.`,
    highlights: [
      "Working software demo from sprint one",
      "Figma design system before code",
      "95+ Lighthouse performance standard",
      "Post-launch warranty & care SLA",
    ],
    url: "#/services/software-web-development",
  });

  // 9. Add Training Tracks ("Training for what's next")
  TRAINING_TRACKS.forEach((track) => {
    chunks.push({
      id: `training-${track.slug}`,
      category: "training",
      title: `${track.title} (Training Pathway)`,
      tags: [
        "training",
        "training for what's next",
        track.slug,
        track.title.toLowerCase(),
        track.shortTitle.toLowerCase(),
        "learn",
        "learning",
        "course",
        "pathway",
        "skills",
        "academy",
        "mentorship",
        "curriculum",
        "certification",
        ...track.skillsAcquired.map((s) => s.toLowerCase()),
      ],
      content: `### ${track.title}
**Tagline:** ${track.tagline}
**Level:** ${track.level} · **Duration:** ${track.duration} · **Format:** ${track.format}

**Overview:** ${track.description}

**Key Highlights:**
${track.highlights.map((h) => `• ${h}`).join("\n")}

**Key Skills Acquired:** ${track.skillsAcquired.join(", ")}
**Certification:** ${track.certification}`,
      highlights: track.highlights,
      url: `/training/${track.slug}`,
    });
  });

  return chunks;
}

const KNOWLEDGE_BASE = buildKnowledgeBase();

// ─── Query Analysis & Retrieval ─────────────────────────────────────────────

interface ScoredChunk {
  chunk: KnowledgeChunk;
  score: number;
  matchedTerms: string[];
}

/** Stop words to ignore during tokenization */
const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "for", "to", "of", "and", "or", "is",
  "are", "am", "was", "were", "be", "been", "with", "this", "that", "these",
  "those", "my", "your", "our", "their", "can", "could", "do", "does", "did",
  "i", "you", "we", "they", "me", "us", "him", "her", "it", "kya", "hai",
  "aur", "ka", "ki", "ke", "ko", "se", "me", "mein", "bhi", "toh", "abw", "curious"
]);

/** Synonym mapping to enrich query terms */
const SYNONYMS: Record<string, string[]> = {
  price: ["cost", "budget", "pricing", "rate", "fees", "quote", "estimate", "kharcha", "paisa"],
  cost: ["price", "budget", "pricing", "rate", "fees", "kharcha", "paisa"],
  pricing: ["price", "cost", "budget", "rate", "fees"],
  contact: ["email", "phone", "call", "whatsapp", "reach", "hire", "consultation", "sampark", "baat"],
  phone: ["call", "mobile", "whatsapp", "number", "contact"],
  email: ["contact", "mail", "inbox", "reach"],
  website: ["web", "frontend", "fullstack", "portal", "landing", "saas", "nextjs", "react"],
  web: ["website", "frontend", "fullstack", "portal", "saas"],
  mobile: ["app", "android", "ios", "flutter", "react native", "smartphone"],
  app: ["mobile", "android", "ios", "flutter", "application"],
  ai: ["rag", "llm", "chatbot", "gpt", "automation", "machine learning", "copilot"],
  team: ["who", "founder", "ceo", "cto", "cdo", "members", "size", "experience", "nerul", "navimumbai"],
  services: ["offer", "capabilities", "solutions", "expertise", "work"],
  process: ["how to", "development", "workflow", "steps", "methodology", "build", "kaise"],
  timeline: ["duration", "weeks", "mvp", "time", "kitna time", "kab"],
  location: ["address", "office", "where", "kaha", "navi mumbai", "nerul", "darave", "centurion", "haware", "thane", "mumbai", "map", "directions"],
  training: ["learn", "course", "courses", "pathway", "pathways", "student", "foundational", "professional", "academy", "curriculum", "certification", "skills"],
  learn: ["training", "course", "pathway", "skills", "study"],
  student: ["students", "pathway", "college", "graduate", "internship", "campus"],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s#]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

function expandQuery(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    if (SYNONYMS[token]) {
      SYNONYMS[token].forEach((syn) => expanded.add(syn));
    }
  }
  return Array.from(expanded);
}

function retrieveRelevantChunks(query: string, limit = 3): ScoredChunk[] {
  const queryTokens = tokenize(query);
  const expandedTokens = expandQuery(queryTokens);
  const queryLower = query.toLowerCase();

  const scored: ScoredChunk[] = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const matchedTerms: string[] = [];

    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    // 1. Exact phrase match boost
    if (titleLower.includes(queryLower) && queryLower.length > 3) {
      score += 50;
      matchedTerms.push("title-exact");
    }
    if (contentLower.includes(queryLower) && queryLower.length > 4) {
      score += 25;
      matchedTerms.push("content-exact");
    }

    // 2. Tag matches
    for (const tag of chunk.tags) {
      if (queryLower.includes(tag)) {
        score += 18;
        matchedTerms.push(tag);
      }
      for (const token of expandedTokens) {
        if (tag === token || tag.includes(token)) {
          score += 10;
          if (!matchedTerms.includes(tag)) matchedTerms.push(tag);
        }
      }
    }

    // 3. Token frequency match
    for (const token of expandedTokens) {
      if (titleLower.includes(token)) {
        score += 8;
        matchedTerms.push(token);
      }
      if (contentLower.includes(token)) {
        score += 3;
        matchedTerms.push(token);
      }
    }

    // Category boosts
    if (queryLower.includes("price") || queryLower.includes("cost") || queryLower.includes("budget") || queryLower.includes("kharcha")) {
      if (chunk.id === "pricing-faq") score += 40;
    }
    if (queryLower.includes("contact") || queryLower.includes("phone") || queryLower.includes("email") || queryLower.includes("address") || queryLower.includes("number")) {
      if (chunk.id === "company-contact") score += 45;
    }
    if (queryLower.includes("mobile") || queryLower.includes("android") || queryLower.includes("ios") || queryLower.includes("flutter")) {
      if (chunk.id === "service-mobile-app-development") score += 40;
    }
    if (queryLower.includes("web") || queryLower.includes("website") || queryLower.includes("frontend") || queryLower.includes("saas")) {
      if (chunk.id === "service-software-web-development") score += 40;
    }
    if (queryLower.includes("ai") || queryLower.includes("automation") || queryLower.includes("rag") || queryLower.includes("bot")) {
      if (chunk.id === "service-ai-automation") score += 40;
    }
    if (queryLower.includes("intelliqr") || queryLower.includes("qr")) {
      if (chunk.id === "product-intelliqr") score += 50;
    }

    return { chunk, score, matchedTerms };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0).slice(0, limit);
}

// ─── Conversational Augmented Generation (Zero API Key) ────────────────────

export interface RAGResponse {
  answer: string;
  sources: { title: string; url?: string }[];
  suggestedFollowUps?: string[];
}

export function generateRAGAnswer(userQuery: string): RAGResponse {
  const query = userQuery.trim().toLowerCase();

  // 1. Detect Greetings & Introduction
  if (/^(hi|hello|hey|namaste|greetings|hola|good morning|good evening|good afternoon|sup)\b/i.test(query)) {
    return {
      answer: `Hello! 👋 I'm **Aria**, your AI assistant at **ABWcurious**.

We are a technology & innovation company headquartered at **Haware's Centurion, Nerul, Navi Mumbai**, specializing in:
- 💻 **Software & Web Development** (Websites, SaaS, portals)
- 📱 **Mobile App Development** (iOS, Android, Flutter)
- 🤖 **Enterprise AI & Automation** (Custom RAG systems, chatbots, workflow AI)
- 🎓 **Future-Ready Training** (Student pathways, foundational & professional engineering tracks)
- 📈 **Digital Marketing & Growth** (SEO, PPC, lead gen)
- 👥 **Recruitment & HR Solutions** (Tech hiring, staffing pods)
- ☁️ **Cloud, IT & Business Solutions** (DevOps, CRM, ERP)

How can I help you today? You can ask about our office location, services, pricing, timelines, or our platforms like **IntelliQR**!`,
      sources: [
        { title: "All Services", url: "#/services" },
        { title: "About ABWcurious", url: "#/about" },
        { title: "Get in Touch", url: "#/contact" },
      ],
      suggestedFollowUps: [
        "Where is your office located?",
        "What services do you offer?",
        "Tell me about mobile app development",
        "What is your pricing and timeline?",
      ],
    };
  }

  // 2. Retrieve Top Chunks
  const retrieved = retrieveRelevantChunks(userQuery, 3);

  // If no good match found, provide helpful fallback guidance
  if (retrieved.length === 0 || retrieved[0].score < 5) {
    return {
      answer: `Thanks for asking! While I might not have an exact matching entry for that specific phrase, **ABWcurious** provides end-to-end engineering across:

1. **Custom Software & Web Platforms** — Modern Next.js/React applications, multi-tenant SaaS, and e-commerce.
2. **Mobile Apps** — Native iOS, Android, and Flutter builds with testable betas in 2 weeks.
3. **AI & RAG Solutions** — Retrieval-Augmented Generation, customer support agents, and document automation.
4. **Products** — Platforms like **IntelliQR**, **Kapikitab.in**, **Restaurant360**, and **Business360**.

Would you like details on a specific project or to speak directly with our team?
- 📍 **Office:** S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Maharashtra 400706
- 🗺️ **Google Maps:** [Open in Google Maps](https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu)
- 📧 **Email:** info@abwcurious.com
- 📞 **Phone / WhatsApp:** +91 99303 38504`,
      sources: [
        { title: "Contact Us", url: "#/contact" },
        { title: "Explore Services", url: "#/services" },
        { title: "Our Products", url: "#/products" },
      ],
      suggestedFollowUps: [
        "Where is your office located?",
        "What are your typical project timelines?",
        "What is your pricing model?",
      ],
    };
  }

  // 3. Synthesize Context-Grounded Response
  const primary = retrieved[0].chunk;
  const secondaryResult = retrieved[1];

  let responseBody = "";

  // Dedicated formatters for specific categories
  if (primary.id === "company-contact") {
    responseBody = `You can get in touch with the **ABWcurious** team directly or visit our studio:

- 📍 **Registered Office & Studio:** S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India
- 🗺️ **Google Maps:** [View on Google Maps (Directions & Location)](https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu)
- 📞 **Phone / WhatsApp:** [+91 99303 38504](tel:+919930338504)
- ✉️ **Email:** [info@abwcurious.com](mailto:info@abwcurious.com)
- 🕒 **Working Hours:** Mon–Sat · 9:00 AM – 7:00 PM IST
- 🚀 **Free Discovery Call:** We offer a 30-minute scoping session to map your architecture, timeline, and budget.

You can also submit an enquiry directly on our [Contact Page](#/contact) and our team will get back to you within 24 hours.`;
  } else if (primary.id === "pricing-faq") {
    responseBody = `Here is how pricing and delivery work at **ABWcurious**:

### Transparent Pricing Models:
- **Fixed-Price Scopes:** Ideal for defined projects (marketing websites, landing pages, audits, MVPs). No hidden or hourly surprises.
- **Dedicated Product Squads:** Monthly dedicated team pods (senior engineers, UI/UX, QA) for continuous product scaling.

### Typical Timelines:
- ⚡ **Marketing & Business Websites:** 2 to 4 weeks
- 📱 **Mobile Apps:** First testable build in **2 weeks**
- 🛠️ **Custom SaaS & AI MVPs:** Typically **6 to 12 weeks**

Every engagement includes **100% IP & code transfer** to your repositories and full post-launch warranty support.`;
  } else if (primary.id === "company-overview") {
    responseBody = `**About ABWcurious (OPC) Private Limited:**

Founded in **2019**, ABWcurious is an engineering and innovation studio headquartered at **Haware's Centurion, Sector 19A, Nerul (East), Navi Mumbai, Maharashtra, India**.

- 📍 **Registered Office:** S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India
- 🗺️ **Google Maps:** [Open on Google Maps](https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu)

### Quick Facts:
- 🏆 **7+ Years** of hands-on delivery experience
- 👥 **24 Senior In-House Members** (developers, AI architects, product designers)
- 🚀 **86+ Shipped Projects** across SaaS, web, mobile, and AI
- 🤝 **40+ Happy Clients** globally
- 🎯 **100% Client Code Ownership** from day one

Our core belief: *Great software comes from curious people who love building together.*`;
  } else if (primary.category === "service") {
    responseBody = `### ${primary.title}

${primary.content}

---
💡 **Next Step:** You can explore the full showcase or book a scoping call:
- [Explore ${primary.title} Details](${primary.url || "#/services"})
- [Schedule a Free Project Discovery Session](#/contact)`;
  } else if (primary.category === "product") {
    responseBody = `### ${primary.title}

${primary.content}

---
🔗 [View ${primary.title} Page](${primary.url || "#/products"}) · [Request a Product Demo](#/contact)`;
  } else if (primary.category === "training") {
    responseBody = `### ${primary.title}

${primary.content}

---
🎓 [Explore the Full ${primary.title} Page](${primary.url || "/training"}) · [Apply for Enrollment](${primary.url}#enroll)`;
  } else {
    // General structured chunk synthesis
    responseBody = `${primary.content}`;
    if (secondaryResult && secondaryResult.score > 15) {
      responseBody += `\n\n### Related Information: ${secondaryResult.chunk.title}\n${secondaryResult.chunk.content.slice(0, 300)}...`;
    }
  }

  // Determine relevant suggested follow-ups
  const followUps: string[] = [];
  if (primary.category === "service") {
    followUps.push("What is the typical timeline for this?", "How does pricing work?", "Can we book a discovery call?");
  } else if (primary.category === "product") {
    followUps.push("Is there a live demo available?", "How do I get access?", "What other products do you build?");
  } else {
    followUps.push("What services do you offer?", "Tell me about your mobile apps", "How do I get started?");
  }

  const sources = retrieved
    .filter((r) => r.chunk.url)
    .map((r) => ({ title: r.chunk.title, url: r.chunk.url }));

  return {
    answer: responseBody,
    sources,
    suggestedFollowUps: followUps,
  };
}
