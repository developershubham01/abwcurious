export interface TrainingTrack {
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  linkText: string;
  linkIcon: "upRight" | "right";
  bgClass: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  badge: string;
  duration: string;
  format: string;
  level: string;
  highlights: string[];
  stats: { value: string; label: string }[];
  overview: string[];
  curriculum: {
    module: string;
    weeks: string;
    summary: string;
    topics: string[];
  }[];
  skillsAcquired: string[];
  whoIsThisFor: string[];
  prerequisites: string;
  certification: string;
}

export const TRAINING_TRACKS: TrainingTrack[] = [
  {
    slug: "student-pathways",
    num: "01",
    title: "Student pathways",
    shortTitle: "Students",
    tagline: "Elevate your career readiness with learning paths shaping tomorrow's jobs.",
    description:
      "Designed specifically for college students and recent graduates, our Student Pathways connect classroom theoretical computer science with high-impact, real-world industry engineering. Build production-grade capstones, master modern tools, and get mentored directly by senior engineers at ABWcurious.",
    linkText: "Begin your success journey",
    linkIcon: "upRight",
    bgClass: "bg-[#eaf4fc]",
    accentColor: "#0f62fe",
    image: "/images/training/students.jpg",
    imageAlt: "Two university students collaborating on code in a modern tech lounge",
    badge: "For Students & Grads",
    duration: "12 Weeks (Part-time / Weekend)",
    format: "Hybrid (Online Live Sprints + Nerul Navi Mumbai Studio Hackathons)",
    level: "Beginner to Intermediate",
    highlights: [
      "1-on-1 mentorship with senior full-stack & AI engineers",
      "3 Real-world portfolio projects deployed to production",
      "Direct fast-track interview consideration for ABWcurious internships",
      "Resume, GitHub portfolio, and technical interview prep",
    ],
    stats: [
      { value: "94%", label: "Placement & internship success" },
      { value: "3+", label: "Production projects shipped" },
      { value: "1:1", label: "Dedicated senior engineer mentor" },
    ],
    overview: [
      "Universities teach algorithms and data structures, but high-growth companies hire engineers who can ship resilient web applications, understand modern cloud deployment, collaborate via Git pull requests, and leverage AI tooling effectively.",
      "The ABWcurious Student Pathways bridge this gap. You won't just watch videos — you will join agile sprints, write clean TypeScript and React/Next.js code, build REST and GraphQL APIs, and deploy real software used by real users.",
    ],
    curriculum: [
      {
        module: "Module 1: Modern Web Engineering Foundations",
        weeks: "Weeks 1–3",
        summary: "Modern TypeScript, React 19, Next.js App Router, Tailwind CSS, and Git collaboration workflows.",
        topics: [
          "TypeScript type systems, generics, and strict mode best practices",
          "Component architecture, state management, and modern React hooks",
          "Next.js App Router, Server Components vs Client Components",
          "Responsive UI engineering with Tailwind CSS and accessible components",
        ],
      },
      {
        module: "Module 2: Backend, Databases & System Architecture",
        weeks: "Weeks 4–6",
        summary: "RESTful API engineering with Node.js/Express & Next.js route handlers, PostgreSQL, and Prisma ORM.",
        topics: [
          "Relational database design, migrations, indexing, and PostgreSQL",
          "Secure authentication with OAuth, JWT, and session management",
          "API validation, middleware, error boundaries, and logging",
          "Docker containerization basics and environment management",
        ],
      },
      {
        module: "Module 3: AI Integration & Practical Tooling",
        weeks: "Weeks 7–9",
        summary: "Integrating LLM APIs, prompt engineering, vector search, and AI-assisted developer workflows.",
        topics: [
          "LLM API integration (OpenAI, Gemini, Claude) with structured outputs",
          "Introduction to Embeddings and Vector Databases (pgvector)",
          "Building intelligent chatbots and automated document summarizers",
          "Developer productivity using Cursor, GitHub Copilot, and Claude Code",
        ],
      },
      {
        module: "Module 4: Production Capstone & Career Launchpad",
        weeks: "Weeks 10–12",
        summary: "End-to-end full-stack capstone build, CI/CD deployment, code reviews, and mock interviews.",
        topics: [
          "Team capstone sprint: scoping, building, and deploying a SaaS MVP",
          "CI/CD pipelines, Vercel/AWS deployment, and domain/DNS setup",
          "Lighthouse performance auditing, SEO, and accessibility tuning",
          "Portfolio showcase day, technical mock interviews, and resume reviews",
        ],
      },
    ],
    skillsAcquired: [
      "TypeScript & JavaScript (ESNext)",
      "Next.js & React Ecosystem",
      "Node.js & REST/GraphQL APIs",
      "PostgreSQL & Prisma ORM",
      "Git & GitHub Collaborative Sprints",
      "AI APIs & Vector Retrieval",
      "Docker & Vercel Deployment",
      "System Design Fundamentals",
    ],
    whoIsThisFor: [
      "B.Tech, BCA, MCA, or CS/IT students wanting industry-ready skills",
      "Self-taught developers looking to build a verified portfolio",
      "Recent college graduates targeting top software engineering roles",
    ],
    prerequisites: "Basic programming understanding (any language: C++, Java, Python, or JS). No prior web development experience required.",
    certification: "ABWcurious Certified Student Software Engineer credential + Verified Project Portfolio",
  },
  {
    slug: "foundational-skills",
    num: "02",
    title: "Foundational skills",
    shortTitle: "Foundations",
    tagline: "Develop essential skills, unlock new possibilities and get ready for the next stage.",
    description:
      "Build deep core competence in software engineering principles, cloud architecture, system design, and AI fundamentals. This track is crafted for early-career professionals, career switchers, and engineers wanting to modernize their technical foundation.",
    linkText: "Start shaping tomorrow",
    linkIcon: "upRight",
    bgClass: "bg-[#ebf8ee]",
    accentColor: "#24a148",
    image: "/images/training/foundational.jpg",
    imageAlt: "Young female engineer working on robotics and automation hardware in modern lab",
    badge: "Core Engineering",
    duration: "10 Weeks (Flexible / Evenings & Weekends)",
    format: "Interactive Online Labs + Live Code Reviews",
    level: "Intermediate",
    highlights: [
      "Hands-on architectural labs mirroring production enterprise codebases",
      "Master cloud orchestration, CI/CD, and scalable microservices",
      "Deep-dive into clean code, testing patterns, and design principles",
      "Personal code review sessions with ABWcurious tech leads",
    ],
    stats: [
      { value: "100%", label: "Hands-on coding labs" },
      { value: "10 wks", label: "Intensive deep-dive" },
      { value: "4.9★", label: "Alumni satisfaction rating" },
    ],
    overview: [
      "Frameworks come and go, but strong foundations in software architecture, clean patterns, distributed systems, and cloud infrastructure endure for decades.",
      "The Foundational Skills track removes the guesswork from engineering. We dissect how enterprise platforms scale to millions of requests, how to write automated test suites that prevent regressions, and how to operate cloud infrastructure cost-effectively.",
    ],
    curriculum: [
      {
        module: "Module 1: Architecture, Clean Code & Design Patterns",
        weeks: "Weeks 1–3",
        summary: "SOLID principles, modular monoliths, hexagonal architecture, and maintainable software design.",
        topics: [
          "SOLID design principles applied to modern TypeScript & Python",
          "Domain-Driven Design (DDD) concepts for scalable application cores",
          "Automated testing pyramids: unit, integration, and E2E with Playwright",
          "Refactoring legacy code without downtime or regressions",
        ],
      },
      {
        module: "Module 2: Cloud Infrastructure & DevOps Pipelines",
        weeks: "Weeks 4–6",
        summary: "Docker, Kubernetes fundamentals, AWS/GCP services, and Infrastructure as Code.",
        topics: [
          "Multi-stage Docker builds and container optimization",
          "GitHub Actions CI/CD: automated test runs, linting, and staged rollouts",
          "Cloud primitives on AWS: S3, RDS, ECS, Lambda, and CloudFront",
          "Observability, OpenTelemetry, structured logging, and uptime alerts",
        ],
      },
      {
        module: "Module 3: Database Engineering & Caching at Scale",
        weeks: "Weeks 7–8",
        summary: "Advanced SQL, query optimization, indexing strategies, Redis caching, and transactions.",
        topics: [
          "Query plan analysis, indexing strategies, and connection pooling",
          "Redis caching patterns: cache-aside, write-through, rate limiting",
          "Database sharding, read replicas, and event-driven data flows",
          "Data privacy, GDPR compliance, and encryption at rest/transit",
        ],
      },
      {
        module: "Module 4: System Design & Architectural Capstone",
        weeks: "Weeks 9–10",
        summary: "Designing scalable real-world systems: payment gateways, live order tracking, and notification hubs.",
        topics: [
          "High-level and low-level system design interview walkthroughs",
          "Handling concurrency, idempotency, and distributed race conditions",
          "Architectural review board: defend your capstone design to tech directors",
        ],
      },
    ],
    skillsAcquired: [
      "Clean Architecture & SOLID Principles",
      "Automated Testing (Jest / Vitest / Playwright)",
      "Docker & Container Orchestration",
      "AWS & Cloud Engineering",
      "GitHub Actions & CI/CD Automation",
      "Advanced PostgreSQL & Redis Caching",
      "System Design & Scalability Analysis",
      "Production Observability & Monitoring",
    ],
    whoIsThisFor: [
      "Engineers with 1–3 years experience seeking senior promotion",
      "Backend or frontend developers transitioning to full-stack roles",
      "Professionals switching into software engineering from other analytical domains",
    ],
    prerequisites: "1+ year of programming experience in JavaScript, TypeScript, Python, Java, or C#.",
    certification: "ABWcurious Certified Software Foundations Practitioner",
  },
  {
    slug: "professional-training",
    num: "03",
    title: "Professional training",
    shortTitle: "Professional",
    tagline: "Explore flexible courses and certifications to deepen your skills and prepare for new challenges.",
    description:
      "Executive and advanced technical mastery for senior engineers, tech leads, and enterprise teams. Specialize in Enterprise AI, Retrieval-Augmented Generation (RAG), AI Agent Workflows, and High-Scale Cloud Architecture under the direct guidance of ABWcurious AI architects.",
    linkText: "Strengthen your expertise",
    linkIcon: "right",
    bgClass: "bg-[#f4f5f7]",
    accentColor: "#6929c4",
    image: "/images/training/professional.jpg",
    imageAlt: "Two senior software engineers collaborating in a modern AI innovation lab",
    badge: "Advanced & Corporate",
    duration: "8 Weeks (Executive / Corporate Cohorts Available)",
    format: "Masterclass Sprints + Architecture Reviews",
    level: "Advanced",
    highlights: [
      "Production RAG architectures: embeddings, hybrid search, and reranking",
      "Autonomous multi-agent workflows with tool use and human-in-the-loop",
      "Enterprise security, latency optimization, and self-hosted model weights",
      "Custom corporate team training cohorts with tailored domain datasets",
    ],
    stats: [
      { value: "30+", label: "AI systems in production" },
      { value: "8 wks", label: "Executive sprint track" },
      { value: "100%", label: "Enterprise grade curriculum" },
    ],
    overview: [
      "As artificial intelligence transforms software development, engineering teams must evolve from consumer LLM wrappers to robust, enterprise-grade AI architectures that deliver verifiable accuracy and zero hallucination risk.",
      "The Professional Training program is delivered by engineers who build and deploy enterprise AI systems every day. Learn battle-tested patterns for RAG, vector database tuning, local model quantization, and agentic workflows.",
    ],
    curriculum: [
      {
        module: "Module 1: Production RAG Architectures & Vector Search",
        weeks: "Weeks 1–2",
        summary: "Advanced retrieval-augmented generation: chunking strategies, dense/sparse hybrid search, and cross-encoders.",
        topics: [
          "Document ingestion pipelines: chunking, semantic chunking, and metadata tagging",
          "Vector indexing algorithms: HNSW, IVFFlat in pgvector and Pinecone",
          "Hybrid search: BM25 keyword matching + dense cosine vector similarity",
          "Reranking with Cohere / cross-encoders for 98%+ precision",
        ],
      },
      {
        module: "Module 2: Autonomous Agents & Tool Execution",
        weeks: "Weeks 3–4",
        summary: "Building multi-agent systems, function calling, state machines, and LangGraph.",
        topics: [
          "Function calling, tool definitions, and schema validation",
          "Stateful multi-agent systems with LangGraph and autonomous loops",
          "Human-in-the-loop checkpoints, guardrails, and rollback strategies",
          "Long-term memory architectures and conversation state persistence",
        ],
      },
      {
        module: "Module 3: Model Evaluation, Fine-Tuning & Local LLMs",
        weeks: "Weeks 5–6",
        summary: "RAG triad evaluation (faithfulness, answer relevance), open-weights models (Llama 3, Mistral, DeepSeek), and LoRA fine-tuning.",
        topics: [
          "Continuous evaluation pipelines using Ragas, TruLens, and DeepEval",
          "Running local open-weight models with Ollama, vLLM, and TensorRT-LLM",
          "Parameter-Efficient Fine-Tuning (PEFT / LoRA) on custom domain datasets",
          "Cost, token latency optimization, and streaming infrastructure",
        ],
      },
      {
        module: "Module 4: Enterprise Security, Governance & Deployment",
        weeks: "Weeks 7–8",
        summary: "Data privacy, prompt injection defenses, audit logging, and enterprise production rollout.",
        topics: [
          "Prompt injection defense, jailbreak guards, and PII masking",
          "Compliance with enterprise data governance (SOC 2, HIPAA, GDPR)",
          "Building production AI microservices on Kubernetes with GPU pooling",
          "Capstone: deploy a fully evaluated, monitored enterprise RAG agent",
        ],
      },
    ],
    skillsAcquired: [
      "Enterprise RAG Architecture",
      "Vector Search & Hybrid BM25/Cosine Retrieval",
      "Multi-Agent Workflow Design",
      "LLM Evaluation & Ragas Benchmarking",
      "Local Open-Weights Serving (vLLM / Ollama)",
      "Prompt Security & Guardrails",
      "Kubernetes GPU Infrastructure",
      "Production AI Observability",
    ],
    whoIsThisFor: [
      "Senior Software Engineers, Tech Leads, and Engineering Managers",
      "Data Scientists moving into production AI software engineering",
      "Enterprise teams building proprietary AI platforms and copilots",
    ],
    prerequisites: "3+ years software engineering experience. Familiarity with Python, REST APIs, and basic machine learning concepts.",
    certification: "ABWcurious Certified Enterprise AI Systems Architect",
  },
];

export const TRAINING_BY_SLUG = new Map(TRAINING_TRACKS.map((t) => [t.slug, t]));
