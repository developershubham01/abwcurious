/**
 * ABWcurious RAG Knowledge Base
 * -----------------------------------------------------------------------
 * This module compiles all site content into a single rich text corpus
 * used by the AI chat assistant to answer visitor queries.
 * It draws from catalog.ts (services) and company.ts (company info).
 */

import { CATEGORIES } from "./catalog";

// ─── Company knowledge ─────────────────────────────────────────────────────
const COMPANY_KNOWLEDGE = `
# About ABWcurious

**Company Name:** ABWcurious  
**Tagline:** Engineering a Better Future.  
**Founded:** 2019  
**Registered Office:** S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India  
**Google Maps Location:** https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu  
**Email:** info@abwcurious.com  
**Phone:** +91 99303 38504  
**Working Hours:** Mon–Sat · 9:00–19:00 IST  

## Description
ABWcurious is a technology and innovation company delivering intelligent digital solutions, future-ready education, cybersecurity, software engineering, IT services, and talent solutions. We help organizations innovate, transform, operate, and grow.

## Our Story
We started ABWcurious with a simple belief: great products come from curious people who enjoy building together. From the first whiteboard sketch to the latest launch, our journey has always been about the humans behind the work.
Today we design and engineer AI-powered software, websites and platforms for ambitious teams — and we document every step: the workshops, the offsites, the launches and the quiet wins in between.

## Our Values
1. **Curiosity First** — Every project starts with questions, not assumptions. We explore before we build.
2. **People Powered** — Small senior team, big ownership. The people you meet on day one ship your product.
3. **Craft in Everything** — From pixel to pipeline — we sweat details, and we celebrate the craft publicly.

## Key Statistics
- 7+ Years of Experience
- 24 Team Members
- 86+ Projects Completed
- 40+ Happy Clients
- 32 Events Hosted

## RAG AI Innovation
ABWcurious builds intelligent systems using Retrieval-Augmented Generation (RAG). By grounding advanced language models (LLMs) in proprietary enterprise data, we eliminate hallucinations and deliver highly accurate, contextual, and secure AI solutions.
Our RAG architectures connect vector databases and knowledge graphs to conversational agents, automating complex workflows and surfacing insights from millions of documents.

## Leadership
- **Founder & CEO** — Visionary leader focused on strategy and growth since day one.
- **Co-Founder & CTO** — Leads engineering & AI systems architecture.
- **Co-Founder & CDO** — Leads brand, product design and UX systems.

## Contact & Get Started
To start a project, visit our contact page or email us at info@abwcurious.com.
`;

// ─── Services knowledge (compiled from catalog) ────────────────────────────
function buildServicesKnowledge(): string {
  return CATEGORIES.map((cat) => {
    const items = cat.groups.flatMap((g) =>
      g.items.map((item) => `    - **${item.name}**: ${item.blurb}`)
    );
    const process = cat.process
      .map((p, i) => `  ${i + 1}. **${p.title}**: ${p.desc}`)
      .join("\n");
    const stats = cat.stats.map((s) => `  - ${s.value} ${s.label}`).join("\n");
    const groups = cat.groups
      .map(
        (g) =>
          `  ### ${g.label}\n` +
          g.items.map((it) => `    - **${it.name}**: ${it.blurb}`).join("\n")
      )
      .join("\n\n");

    return `
## ${cat.num}. ${cat.name}
**Tagline:** ${cat.tagline}
**Description:** ${cat.description}
**URL:** /services/${cat.slug}

### Key Stats
${stats}

### Sub-Services
${groups}

### Our Process for ${cat.name}
${process}
`;
  }).join("\n---\n");
}

// ─── Product knowledge ─────────────────────────────────────────────────────
const PRODUCTS_KNOWLEDGE = `
# ABWcurious Products

## IntelliQR
IntelliQR is ABWcurious's flagship product — a smart QR code management and analytics platform. It went public in April 2026 with a live stream demo, founder AMA, and saw 1,000 sign-ups in the first 24 hours.

## AI-Powered Solutions
ABWcurious develops custom AI-powered SaaS products for clients across industries, leveraging RAG architectures, LLM integrations, and intelligent automation pipelines.
`;

// ─── FAQ knowledge ─────────────────────────────────────────────────────────
const FAQ_KNOWLEDGE = `
# Frequently Asked Questions

**Q: How do I get started with ABWcurious?**  
A: Visit our Contact page or email info@abwcurious.com. We'll schedule a discovery call to understand your goals.

**Q: What is your typical project timeline?**  
A: A typical MVP takes around 6 weeks. Mobile apps have a first testable build in 2 weeks. We tailor timelines to your specific needs.

**Q: Do you offer support after launch?**  
A: Yes! We provide ongoing maintenance, monitoring, security updates, and dedicated technical support for all projects.

**Q: What technologies do you use?**  
A: We use modern stacks including Next.js, React, Flutter, Node.js, Python, AWS, GCP, Azure, PostgreSQL, RAG/LLM models (Gemini, GPT), and more.

**Q: Where is ABWcurious located?**  
A: Our registered office and studio is located at S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Thane, Maharashtra 400706, India ([Google Maps Location](https://www.google.com/maps/place/ABWcurious+OPC+Pvt.Ltd/@19.0247909,73.0221279,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3d076147f7b:0xe421751ae4517f6d!8m2!3d19.0247909!4d73.0221279!16s%2Fg%2F11zchgx3cf?entry=ttu)). We work with clients worldwide.

**Q: What is your pricing model?**  
A: We provide customized pricing based on project scope. Contact us for a detailed quote tailored to your requirements.

**Q: Can you build both web and mobile apps?**  
A: Absolutely! We build responsive web applications and native/cross-platform mobile apps for iOS and Android.

**Q: What makes ABWcurious different?**  
A: We combine deep engineering expertise with a product-focused mindset. The senior team you meet on day one is the team that ships your product. We're accountable for outcomes, not just output.
`;

// ─── Exported system prompt ────────────────────────────────────────────────
export function buildSystemPrompt(): string {
  return `
You are **Aria**, the AI assistant for **ABWcurious (OPC) Private Limited** — a technology and innovation company headquartered at Haware's Centurion, Nerul (East), Navi Mumbai, India. You help website visitors learn about ABWcurious's services, products, team, and how to get started.

Your personality:
- Friendly, professional, and concise
- Knowledgeable about all ABWcurious services and offerings
- Helpful in guiding visitors to the right service or contact option
- Use light markdown formatting in responses (bold, bullet points) for clarity
- Keep answers focused and under 200 words unless a detailed breakdown is needed

Always recommend visiting the relevant page or contacting ABWcurious for project-specific discussions.

---

# ABWcurious Knowledge Base

${COMPANY_KNOWLEDGE}

---

# Services

${buildServicesKnowledge()}

---

${PRODUCTS_KNOWLEDGE}

---

${FAQ_KNOWLEDGE}
`.trim();
}
