export const SEO_CONFIG = {
  siteName: "ABWcurious",
  companyName: "ABWcurious (OPC) Private Limited",
  legalName: "ABWCURIOUS (OPC) PRIVATE LIMITED",
  domain: "www.abwcurious.com",
  canonicalBase: "https://www.abwcurious.com",
  defaultTitle: "ABWcurious | IT Services & Software Development Company in India",
  defaultDescription:
    "ABWcurious provides custom software development, website and mobile app development, AI solutions, cybersecurity, IT support & business solutions, Marketing, and IT consulting for businesses in Navi Mumbai, Mumbai, India, and globally.",
  tagline: "Engineering A Better World.",
  cin: "U62011MR2026OPC478364",
  gst: "27ABGCA1303A1ZI",
  logoUrl: "https://www.abwcurious.com/images/logo-abw-white.png",
  ogImageUrl: "https://www.abwcurious.com/og-image.png",
  phone: "+91 99303 38504",
  phoneHref: "tel:+919930338504",
  email: "info@abwcurious.com",
  emailSales: "sales@abwcurious.com",
  emailHr: "hr@abwcurious.com",
  address: {
    streetAddress: "S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400706",
    addressCountry: "IN",
  },
  geo: {
    latitude: 19.0247909,
    longitude: 73.0221279,
  },
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "₹₹ - ₹₹₹",
  sameAs: [
    "https://in.linkedin.com/company/abwcurious?trk=public_post_feed-actor-name",
    "https://www.instagram.com/abwcurious?igsh=b2o3eGxxbGtlM2pu",
    "https://x.com/abwcurious?t=Y6CfDuM_ljg1gNvd7ByVQA&s=09",
    "https://www.youtube.com/@ABWcurious",
    "https://www.facebook.com/share/1aTRdmi65g/",
  ],
};

export interface ServiceDetail {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  heroTitle: string;
  heroSubtitle: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  problemStatement: string;
  solutionOverview: string;
  includedServices: { title: string; desc: string }[];
  technologies: string[];
  processSteps: { step: string; title: string; desc: string }[];
  useCases: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  targetLocations: string[];
}

export const DETAILED_SERVICES: ServiceDetail[] = [
  {
    slug: "software-development",
    name: "Custom Software Development",
    shortName: "Software Dev",
    category: "Digital Engineering",
    heroTitle: "Custom Software Development Company in India",
    heroSubtitle: "Engineering enterprise-grade business software, web applications, SaaS platforms, and APIs tailored to your business goals.",
    targetKeyword: "custom software development company India",
    secondaryKeywords: [
      "software development company in Mumbai",
      "custom business software development",
      "enterprise software development services",
      "SaaS product development",
    ],
    metaTitle: "Custom Software Development Company in India | ABWcurious",
    metaDescription:
      "ABWcurious provides enterprise custom software development, web application engineering, microservices, and SaaS solutions for startups and enterprises in Navi Mumbai, Mumbai & globally.",
    problemStatement:
      "Off-the-shelf software often fails to align with complex business workflows, causing operational bottlenecks, data silos, and recurring licensing costs.",
    solutionOverview:
      "ABWcurious designs and builds bespoke software architectures from discovery to deployment. We deliver scalable, secure, and maintainable systems engineered for business growth.",
    includedServices: [
      { title: "Enterprise Application Engineering", desc: "Building scalable ERP, CRM, and internal portal software with microservices architecture." },
      { title: "SaaS Product Development", desc: "End-to-end multi-tenant SaaS engineering with automated billing, subscription management, and analytics." },
      { title: "API Development & Integration", desc: "Designing secure RESTful and GraphQL APIs connecting legacy platforms with cloud applications." },
      { title: "Software Modernization & Refactoring", desc: "Refactoring monolithic legacy systems into cloud-native microservices with zero downtime." },
    ],
    technologies: ["Node.js", "TypeScript", "Python", "React / Next.js", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
    processSteps: [
      { step: "01", title: "Discovery & Blueprint", desc: "Requirements analysis, architecture design, and tech stack selection." },
      { step: "02", title: "Agile Development", desc: "Sprint-based engineering with continuous integration and code reviews." },
      { step: "03", title: "Quality & Security Assurance", desc: "Automated unit testing, security scanning, and performance profiling." },
      { step: "04", title: "Deployment & Support", desc: "CI/CD automated deployment, cloud monitoring, and 24/7 SLA maintenance." },
    ],
    useCases: [
      { title: "Automated Workflow Engine", desc: "Streamlining multi-department approvals and document tracking for logistics providers." },
      { title: "Multi-Tenant SaaS Portal", desc: "Building high-concurrency SaaS platforms supporting thousands of active subscription accounts." },
    ],
    faqs: [
      { q: "What does ABWcurious do as a software development company?", a: "ABWcurious provides full-lifecycle custom software engineering including requirements analysis, UI/UX, cloud architecture, development, QA testing, deployment, and ongoing maintenance." },
      { q: "How much does custom software development cost in India?", a: "Software development costs depend on feature complexity, user concurrency, and integrations. We provide transparent fixed-scope and dedicated squad pricing after initial discovery." },
      { q: "How long does it take to develop custom business software?", a: "Initial MVP releases typically launch within 6 to 8 weeks, while enterprise platform projects progress through structured 2-week agile sprints." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "Thane", "Pune", "India", "Global"],
  },
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Web Dev",
    category: "Digital Engineering",
    heroTitle: "Website Development Company in Mumbai & India",
    heroSubtitle: "Building ultra-fast Next.js, React, and headless CMS websites optimized for search engines, mobile responsiveness, and high conversion.",
    targetKeyword: "website development company in Mumbai",
    secondaryKeywords: [
      "web development company India",
      "Next.js web development",
      "React website development",
      "custom e-commerce website development",
      "website development company Navi Mumbai",
    ],
    metaTitle: "Website Development Company in Mumbai & Navi Mumbai | ABWcurious",
    metaDescription:
      "ABWcurious is a premier website development company in Mumbai & Navi Mumbai engineering high-performance Next.js websites, e-commerce storefronts, and web portals.",
    problemStatement:
      "Slow, unoptimized, and non-responsive websites lose search engine rankings and bounce potential customers before they convert.",
    solutionOverview:
      "We build modern Next.js and React web applications optimized for Core Web Vitals, SEO, accessibility, and high conversion rates across all devices.",
    includedServices: [
      { title: "Custom Business Websites", desc: "High-impact corporate websites built with Next.js, TypeScript, and modern CSS for lightning-fast loads." },
      { title: "Headless E-commerce Storefronts", desc: "High-conversion D2C online storefronts integrated with Shopify, WooCommerce, or custom backends." },
      { title: "Web Portals & Interactive Dashboards", desc: "Secure customer and partner portals with role-based access control and analytics." },
      { title: "SEO & Core Web Vitals Optimization", desc: "Auditing and optimizing page speed, schema structured data, and search engine crawlability." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js", "Vercel", "Shopify API"],
    processSteps: [
      { step: "01", title: "UX Wireframing", desc: "Designing user journeys and accessible component hierarchies." },
      { step: "02", title: "Next.js Frontend Build", desc: "Coding responsive, SEO-ready Next.js pages with server-side rendering." },
      { step: "03", title: "Content & SEO Integration", desc: "Integrating structured data schema, metadata, and analytics." },
      { step: "04", title: "Launch & Optimization", desc: "Lighthouse performance testing and production release." },
    ],
    useCases: [
      { title: "High-Traffic Corporate Portal", desc: "Re-engineering a legacy corporate site into Next.js, achieving 99+ Lighthouse performance scores." },
      { title: "E-Commerce Headless Storefront", desc: "Sub-second product search and seamless checkout increasing conversion by 35%." },
    ],
    faqs: [
      { q: "Why choose Next.js for business website development?", a: "Next.js offers server-side rendering, automatic image optimization, and superior Core Web Vitals, resulting in faster load times and higher Google rankings." },
      { q: "How long does website development take?", a: "Standard corporate websites take 2 to 4 weeks, while complex web portals and headless e-commerce platforms take 4 to 8 weeks." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "Thane", "Pune", "India", "Global"],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    category: "Digital Engineering",
    heroTitle: "Mobile App Development Company in India",
    heroSubtitle: "Engineering cross-platform iOS and Android mobile applications using React Native and Flutter for seamless user experiences.",
    targetKeyword: "mobile app development company in India",
    secondaryKeywords: [
      "React Native app development",
      "Flutter app development company",
      "Android app development Mumbai",
      "iOS app development company",
    ],
    metaTitle: "Mobile App Development Company in Mumbai & India | ABWcurious",
    metaDescription:
      "ABWcurious delivers iOS and Android mobile app development using React Native and Flutter. Get high-performance mobile apps built for scale.",
    problemStatement:
      "Developing separate native codebases for iOS and Android inflates development costs and slows feature delivery.",
    solutionOverview:
      "We engineer cross-platform mobile apps with native performance, offline capabilities, secure APIs, and intuitive mobile UI design.",
    includedServices: [
      { title: "React Native App Development", desc: "Cross-platform mobile apps sharing business logic across iOS and Android." },
      { title: "Flutter App Development", desc: "High-performance native mobile UI apps built with Dart and Flutter engine." },
      { title: "Mobile Backend & API Integration", desc: "Scalable Node.js and Supabase backends with push notifications and authentication." },
      { title: "App Store & Play Store Publishing", desc: "Handling app submission, compliance reviews, and release management." },
    ],
    technologies: ["React Native", "Flutter", "TypeScript", "Node.js", "Firebase", "Supabase", "REST API"],
    processSteps: [
      { step: "01", title: "Mobile UI/UX Design", desc: "Designing touch-friendly mobile interfaces." },
      { step: "02", title: "Cross-Platform Build", desc: "Coding shared business logic and native native modules." },
      { step: "03", title: "Device QA Testing", desc: "Testing across multiple iOS and Android screen resolutions." },
      { step: "04", title: "App Store Publishing", desc: "Deploying to Apple App Store and Google Play Store." },
    ],
    useCases: [
      { title: "On-Demand Delivery App", desc: "Real-time location tracking and push notifications for logistics mobile users." },
    ],
    faqs: [
      { q: "Is React Native suitable for enterprise mobile apps?", a: "Yes, React Native powers leading apps globally, offering near-native performance while reducing development costs by up to 40%." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "Thane", "India", "Global"],
  },
  {
    slug: "ai-solutions",
    name: "Artificial Intelligence & ML",
    shortName: "AI Solutions",
    category: "AI & Automation",
    heroTitle: "AI Development & Automation Company in India",
    heroSubtitle: "Empowering businesses with Generative AI, RAG knowledge engines, machine learning pipelines, and intelligent process automation.",
    targetKeyword: "AI development company in India",
    secondaryKeywords: [
      "AI automation company Mumbai",
      "Generative AI development",
      "RAG development services",
      "AI chatbot development",
    ],
    metaTitle: "AI Development & AI Automation Company | ABWcurious",
    metaDescription:
      "ABWcurious builds custom AI solutions, RAG knowledge engines, Generative AI models, and intelligent business automation systems for enterprise growth.",
    problemStatement:
      "Organizations sit on massive unstructured data but lack practical AI tools to automate workflows and extract insights.",
    solutionOverview:
      "We design custom RAG engines, AI chatbots, computer vision pipelines, and predictive analytics that integrate directly into your workflows.",
    includedServices: [
      { title: "Custom RAG & Knowledge Engines", desc: "Building secure AI search and Q&A engines over enterprise documentation and databases." },
      { title: "Generative AI & LLM Integration", desc: "Integrating OpenAI, Claude, and open-source Llama models for automated content and document processing." },
      { title: "Intelligent Business Automation", desc: "Automating repetitive data entry, email processing, and decision workflows with AI." },
      { title: "Predictive Analytics & Machine Learning", desc: "Building custom ML classification and forecasting models using PyTorch and Scikit-Learn." },
    ],
    technologies: ["Python", "PyTorch", "OpenAI API", "LangChain", "Pinecone / pgvector", "FastAPI", "Docker"],
    processSteps: [
      { step: "01", title: "Data Assessment", desc: "Evaluating data sources, privacy rules, and AI feasibility." },
      { step: "02", title: "Model & RAG Architecture", desc: "Designing vector embeddings and prompt engineering pipelines." },
      { step: "03", title: "Integration & Testing", desc: "Connecting AI backends with web/mobile applications." },
      { step: "04", title: "Deployment & Guardrails", desc: "Deploying secure, rate-limited AI microservices." },
    ],
    useCases: [
      { title: "Enterprise Knowledge Base AI", desc: "Enabling internal teams to query 50,000+ technical documents instantly with sub-second citations." },
    ],
    faqs: [
      { q: "What is a RAG (Retrieval-Augmented Generation) engine?", a: "RAG combines LLMs with your private business database to provide accurate, hallucination-free AI answers grounded strictly in your verified content." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "India", "Global"],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity & VAPT",
    shortName: "Cybersecurity",
    category: "Cloud & IT Solutions",
    heroTitle: "Cybersecurity Services & VAPT Company in Mumbai",
    heroSubtitle: "Protecting digital assets, applications, and networks with Vulnerability Assessment, Penetration Testing (VAPT), and security auditing.",
    targetKeyword: "cybersecurity company in Mumbai",
    secondaryKeywords: [
      "VAPT services Navi Mumbai",
      "application security testing",
      "network security services India",
      "cybersecurity consulting",
    ],
    metaTitle: "Cybersecurity Services & VAPT Company in Mumbai | ABWcurious",
    metaDescription:
      "ABWcurious offers cybersecurity services, VAPT penetration testing, web app security audits, and infrastructure hardening in Navi Mumbai, Mumbai & India.",
    problemStatement:
      "Cyber attacks and data breaches threaten business continuity, brand reputation, and regulatory compliance.",
    solutionOverview:
      "Our security specialists perform rigorous VAPT audits, application security reviews, and network security hardening to safeguard your environment.",
    includedServices: [
      { title: "Web & Mobile VAPT", desc: "Identifying OWASP Top 10 vulnerabilities in web applications and mobile apps." },
      { title: "Network & Infrastructure Penetration Testing", desc: "Simulating external and internal cyber attacks to patch firewall and server weaknesses." },
      { title: "Cloud Security Hardening", desc: "Configuring AWS and Azure IAM policies, security groups, and storage encryption." },
      { title: "Compliance Auditing", desc: "Preparing systems for ISO 27001, PCI-DSS, HIPAA, and Indian data protection standards." },
    ],
    technologies: ["Burp Suite", "OWASP ZAP", "Nmap", "Wireshark", "Metasploit", "AWS GuardDuty", "CloudFlare Security"],
    processSteps: [
      { step: "01", title: "Reconnaissance", desc: "Mapping digital attack surface and asset inventory." },
      { step: "02", title: "Vulnerability Scanning", desc: "Automated scanning for security flaws." },
      { step: "03", title: "Exploitation Testing", desc: "Manual penetration testing to verify security risks." },
      { step: "04", title: "Remediation Report", desc: "Delivering prioritized patch guidelines and re-testing." },
    ],
    useCases: [
      { title: "Fintech VAPT Audit", desc: "Identifying critical API authentication vulnerabilities prior to regulatory audit submission." },
    ],
    faqs: [
      { q: "What is VAPT?", a: "VAPT (Vulnerability Assessment and Penetration Testing) combines automated security scanning with ethical hacking to identify and remediate security vulnerabilities." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "Thane", "Pune", "India"],
  },
  {
    slug: "it-support-business-solutions",
    name: "IT Support & Business Solutions",
    shortName: "IT Support",
    category: "IT Support & Infrastructure",
    heroTitle: "IT Support & Business Solutions Company in India",
    heroSubtitle: "Providing 24/7 technical support, IT infrastructure management, ERP/CRM implementations, and business process solutions.",
    targetKeyword: "IT support company in India",
    secondaryKeywords: [
      "IT support services Navi Mumbai",
      "business software solutions Mumbai",
      "IT AMC services India",
      "ERP CRM implementation",
    ],
    metaTitle: "IT Support & Business Solutions | ABWcurious",
    metaDescription:
      "ABWcurious provides 24/7 IT support, IT AMC services, business software solutions, ERP/CRM setup, and infrastructure management in Navi Mumbai, Mumbai & India.",
    problemStatement:
      "System downtime, unmanaged IT infrastructure, and fragmented software tools slow down business operations and impact revenue.",
    solutionOverview:
      "We provide SLA-backed 24/7 IT support, server hardening, custom ERP/CRM software deployment, and proactive IT infrastructure maintenance.",
    includedServices: [
      { title: "24/7 Technical IT Support", desc: "Dedicated IT helpdesk, remote troubleshooting, and on-site support SLA." },
      { title: "IT AMC & Infrastructure Management", desc: "Annual Maintenance Contracts covering servers, networks, workstations, and security." },
      { title: "ERP & CRM System Deployment", desc: "Custom configuration and implementation of ERP, HRMS, and CRM business software." },
      { title: "System Maintenance & Bug Fixes", desc: "Routine patches, database maintenance, security upgrades, and performance tuning." },
    ],
    technologies: ["Node.js", "PostgreSQL", "Docker", "Linux Servers", "Windows Server", "Networking", "Security Monitoring"],
    processSteps: [
      { step: "01", title: "Infrastructure Audit", desc: "Evaluating current IT setup, hardware, and operational bottlenecks." },
      { step: "02", title: "Setup & Hardening", desc: "Configuring secure servers, domain DNS, and backup routines." },
      { step: "03", title: "Business App Integration", desc: "Deploying custom ERP, HRMS, and CRM portals." },
      { step: "04", title: "24/7 SLA Support", desc: "Proactive monitoring and rapid incident resolution." },
    ],
    useCases: [
      { title: "Enterprise IT AMC Support", desc: "Managing IT operations and server uptime for a 150+ employee regional business with zero unhandled downtime." },
    ],
    faqs: [
      { q: "What IT support services does ABWcurious provide?", a: "We provide 24/7 technical helpdesk support, IT AMC contracts, server management, custom ERP/CRM implementations, and software maintenance." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "Thane", "Pune", "India"],
  },
  {
    slug: "digital-marketing",
    name: "Marketing & SEO",
    shortName: "Digital Growth",
    category: "Digital Growth",
    heroTitle: "Marketing & SEO Company in Mumbai",
    heroSubtitle: "Driving organic traffic, search engine rankings, qualified leads, and brand authority through data-driven SEO and performance marketing.",
    targetKeyword: "Marketing company in Mumbai",
    secondaryKeywords: [
      "SEO company in Navi Mumbai",
      "SEO services Mumbai",
      "performance marketing agency India",
      "social media marketing company",
    ],
    metaTitle: "Marketing & SEO Company in Mumbai & Navi Mumbai | ABWcurious",
    metaDescription:
      "ABWcurious is a Marketing and SEO company in Navi Mumbai & Mumbai delivering search engine optimization, lead generation, and performance marketing.",
    problemStatement:
      "Without technical SEO and targeted growth strategies, businesses waste marketing budgets without reaching ready-to-buy customers.",
    solutionOverview:
      "We combine technical SEO, content strategy, Google Ads, social media marketing, and analytics to build sustainable organic growth.",
    includedServices: [
      { title: "Technical SEO & Schema Optimization", desc: "Optimizing website architecture, crawlability, Core Web Vitals, and JSON-LD structured data." },
      { title: "Content Marketing & Authority Building", desc: "Creating high-intent educational content and keyword-clustered articles that rank." },
      { title: "Google Ads & Performance PPC", desc: "Managing targeted Search, Display, and Remarketing ad campaigns for immediate lead flow." },
      { title: "Social Media & Brand Growth", desc: "Managing LinkedIn, Instagram, Facebook, and Twitter presence for B2B and D2C brands." },
    ],
    technologies: ["Google Analytics 4", "Search Console", "SEMrush", "Ahrefs", "Google Tag Manager", "Meta Ads Manager"],
    processSteps: [
      { step: "01", title: "SEO & Content Audit", desc: "Analyzing technical SEO flaws and competitor content gaps." },
      { step: "02", title: "Keyword Clustering", desc: "Mapping commercial search intent keywords to target pages." },
      { step: "03", title: "On-Page & Schema Build", desc: "Optimizing titles, headings, content depth, and JSON-LD." },
      { step: "04", title: "Performance Tracking", desc: "Tracking keyword rankings, organic traffic, and lead conversions." },
    ],
    useCases: [
      { title: "Organic Lead Surge", desc: "Increasing organic monthly search impressions by 250% for a regional IT services provider." },
    ],
    faqs: [
      { q: "How long does it take to see SEO results?", a: "Technical SEO improvements show initial impact within 4 to 8 weeks, with sustained organic traffic growth compounding over 3 to 6 months." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "Thane", "India", "Global"],
  },
  {
    slug: "devops",
    name: "DevOps & CI/CD Services",
    shortName: "DevOps",
    category: "Cloud & IT Solutions",
    heroTitle: "DevOps & CI/CD Consulting Company in India",
    heroSubtitle: "Automating software delivery pipelines, container orchestration, Infrastructure as Code, and continuous monitoring.",
    targetKeyword: "DevOps consulting company India",
    secondaryKeywords: [
      "Docker Kubernetes services",
      "CI CD implementation",
      "Infrastructure as Code Terraform",
      "DevOps company Mumbai",
    ],
    metaTitle: "DevOps & Infrastructure as Code Consulting | ABWcurious",
    metaDescription:
      "ABWcurious offers DevOps consulting, CI/CD pipeline automation, Docker containerization, Kubernetes management, and Terraform IaC.",
    problemStatement:
      "Manual deployment processes cause software release delays, deployment bugs, and environment inconsistencies.",
    solutionOverview:
      "We implement automated CI/CD pipelines, containerize applications, and define infrastructure using code for instant releases.",
    includedServices: [
      { title: "Automated CI/CD Pipelines", desc: "Setting up GitHub Actions, GitLab CI, or Jenkins pipelines for single-click releases." },
      { title: "Docker & Kubernetes Orchestration", desc: "Containerizing microservices and managing auto-scaling Kubernetes (EKS/GKE) clusters." },
      { title: "Infrastructure as Code (Terraform)", desc: "Version-controlling cloud topology using Terraform and Ansible scripts." },
    ],
    technologies: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Ansible", "Prometheus", "Grafana"],
    processSteps: [
      { step: "01", title: "Pipeline Assessment", desc: "Reviewing existing build and deployment workflows." },
      { step: "02", title: "IaC & Containerization", desc: "Writing Terraform scripts and Dockerfiles." },
      { step: "03", title: "CI/CD Setup", desc: "Automating build, test, and staging release flows." },
    ],
    useCases: [
      { title: "Zero-Downtime Deployments", desc: "Implementing Kubernetes blue/green deployments for a 24/7 web application." },
    ],
    faqs: [
      { q: "What are the benefits of implementing DevOps?", a: "DevOps reduces deployment failure rates, accelerates feature release cycles from months to hours, and improves system stability." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "India", "Global"],
  },
  {
    slug: "it-consulting",
    name: "IT & Technology Consulting",
    shortName: "IT Consulting",
    category: "Cloud & IT Solutions",
    heroTitle: "IT Consulting & Digital Transformation in India",
    heroSubtitle: "Strategic technology advisory, architecture audits, digital roadmap planning, and vendor selection for business growth.",
    targetKeyword: "IT consulting company in India",
    secondaryKeywords: [
      "digital transformation consulting",
      "technology consulting services Mumbai",
      "IT architecture audit",
    ],
    metaTitle: "IT Consulting & Digital Transformation Services | ABWcurious",
    metaDescription:
      "ABWcurious provides strategic IT consulting, software architecture audits, and digital transformation roadmaps for businesses in India & globally.",
    problemStatement:
      "Choosing incorrect technologies or lacking a clear digital roadmap results in wasted capital and obsolete software assets.",
    solutionOverview:
      "Our senior technology consultants provide objective architectural guidance, security audits, and actionable implementation plans.",
    includedServices: [
      { title: "Technology Roadmap & Advisory", desc: "Aligning software, cloud, and AI investments with long-term business goals." },
      { title: "Software Architecture Audit", desc: "Evaluating existing codebases for security, scalability, and technical debt." },
    ],
    technologies: ["AWS Architecture", "Enterprise Security", "Microservices", "AI Blueprints", "ISO Standards"],
    processSteps: [
      { step: "01", title: "Current State Audit", desc: "Assessing existing tech stack and operational bottlenecks." },
      { step: "02", title: "Strategic Roadmap", desc: "Defining prioritized tech investments and ROI timelines." },
    ],
    useCases: [
      { title: "Enterprise Digital Roadmap", desc: "Designing a 3-year technology modernization roadmap for a regional logistics provider." },
    ],
    faqs: [
      { q: "Who needs IT consulting services?", a: "Growing businesses, startups, and enterprises seeking expert guidance before investing in new software, cloud migration, or digital transformation." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "India", "Global"],
  },
  {
    slug: "process-automation",
    name: "Business Process Automation",
    shortName: "Automation",
    category: "AI & Automation",
    heroTitle: "Business Process Automation & RPA Company in India",
    heroSubtitle: "Automating manual business workflows, API integrations, data processing, and document extraction to boost operational velocity.",
    targetKeyword: "business process automation company India",
    secondaryKeywords: [
      "RPA services Mumbai",
      "workflow automation services",
      "API integration automation",
    ],
    metaTitle: "Business Process Automation & RPA Services | ABWcurious",
    metaDescription:
      "ABWcurious delivers business process automation, RPA, workflow automation, and custom API integrations in Navi Mumbai, Mumbai & India.",
    problemStatement:
      "Manual data entry and repetitive admin tasks slow business operations and introduce human error.",
    solutionOverview:
      "We design automated workflow scripts, custom connectors, and OCR data extractors that handle repetitive tasks reliably.",
    includedServices: [
      { title: "Workflow & API Integration", desc: "Connecting CRM, accounting, and ERP tools to pass data automatically without human intervention." },
      { title: "Automated Document Processing", desc: "Extracting data from invoices, POs, and forms using OCR and AI parsing." },
    ],
    technologies: ["Node.js", "Python", "Make / Zapier", "OCR / Tesseract", "REST APIs", "WebSockets"],
    processSteps: [
      { step: "01", title: "Workflow Mapping", desc: "Identifying manual steps suitable for automated execution." },
      { step: "02", title: "Automation Engine Build", desc: "Developing custom API scripts and error handlers." },
    ],
    useCases: [
      { title: "Invoice Processing Automation", desc: "Automating vendor invoice data extraction, reducing manual processing time by 80%." },
    ],
    faqs: [
      { q: "How does business process automation improve productivity?", a: "Automation eliminates repetitive manual tasks, reduces processing errors to zero, and frees employees for high-value strategic work." },
    ],
    targetLocations: ["Navi Mumbai", "Mumbai", "India", "Global"],
  },
];

export function getDetailedServiceBySlug(slug: string): ServiceDetail | undefined {
  return DETAILED_SERVICES.find((s) => s.slug === slug);
}
