export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  heroDescription: string;
  badgeStat: string;
  overview: string;
  challenges: { title: string; desc: string }[];
  solutions: { name: string; desc: string }[];
  outcomes: string[];
  technologies: string[];
}

export const ALL_INDUSTRIES: Industry[] = [
  {
    slug: "banking-financial-services",
    name: "Banking & Financial Services",
    tagline: "Secure, compliant, and scalable fintech & banking engineering.",
    heroDescription:
      "From core banking modernization and fraud detection AI to payment gateways and regulatory compliance, we build digital financial infrastructure that scales securely.",
    badgeStat: "99.999% Uptime · PCI-DSS Compliant · Real-time Analytics",
    overview:
      "Financial institutions face unprecedented pressure to innovate rapidly while satisfying strict regulatory mandates. ABWcurious partners with banks, fintechs, insurance providers, and asset managers to engineer resilient, secure, high-throughput digital platforms.",
    challenges: [
      {
        title: "Legacy System Bottlenecks",
        desc: "Mainframe & monolithic systems preventing real-time customer experiences and fast feature rollouts.",
      },
      {
        title: "Evolving Cyber & Fraud Threats",
        desc: "Sophisticated fraudulent transactions requiring sub-second AI detection and continuous perimeter defense.",
      },
      {
        title: "IT Infrastructure Complexity",
        desc: "Modernize and manage complex IT environments across on-premise, cloud, and hybrid infrastructure.",
      },
    ],
    solutions: [
      {
        name: "Cybersecurity threats, vulnerabilities, and incident response",
        desc: "Proactive threat intelligence, vulnerability assessments, zero-trust architecture, and 24/7 rapid incident mitigation.",
      },
      {
        name: "Legacy-system modernization and digital transformation",
        desc: "Refactoring monolithic legacy applications into agile, cloud-native microservices and modern API architectures.",
      },
      {
        name: "Manual processes through intelligent automation",
        desc: "Streamlining repetitive operational workflows using AI-driven automation, robotic process automation (RPA), and smart data extraction.",
      },
      {
        name: "Cloud migration, infrastructure, and security",
        desc: "Seamless migration to secure, scalable multi-cloud environments with automated CI/CD pipelines and infrastructure as code.",
      },
      {
        name: "Compliance, risk management, and security monitoring",
        desc: "Continuous regulatory compliance auditing, automated risk scoring, real-time security logging, and threat governance.",
      },
      {
        name: "Technology skill gaps through industry-focused training and mentorship",
        desc: "Upskilling engineering teams and students with hands-on technical training, industry-aligned curricula, and expert mentorship.",
      },
    ],
    outcomes: [
      "Reduced transaction latency by 65% with cloud-native microservices",
      "Sub-second AI fraud detection protecting customer financial assets",
      "100% compliance with international financial security and privacy protocols",
    ],
    technologies: ["Node.js", "Python AI/ML", "AWS Financial", "PostgreSQL", "Kafka", "Kubernetes", "PCI-DSS SDKs"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "HIPAA-compliant digital health platforms and clinical AI.",
    heroDescription:
      "Empowering hospitals, diagnostics centers, telemedicine providers, and healthtech startups with secure EHR systems, clinical AI assistants, and patient engagement portals.",
    badgeStat: "HIPAA Compliant · Telehealth Ready · Interoperable FHIR/HL7",
    overview:
      "Healthcare technology demands zero-compromise security, patient data privacy, and seamless interoperability. ABWcurious builds next-generation healthtech solutions that improve clinical outcomes and streamline hospital operations.",
    challenges: [
      {
        title: "Siloed Patient Data & Fragmented Systems",
        desc: "Disjointed electronic health records making care coordination and patient history tracking difficult.",
      },
      {
        title: "Patient Engagement & Accessibility",
        desc: "Modern patients expect friction-free remote consultations, digital prescriptions, and online scheduling.",
      },
      {
        title: "Strict Health Data Governance",
        desc: "Ensuring end-to-end encryption and audit readiness across patient portals, IoT devices, and cloud storage.",
      },
    ],
    solutions: [
      {
        name: "Telemedicine & Virtual Care Platforms",
        desc: "Web and mobile apps featuring encrypted video consultations, digital prescription generation, and appointment booking.",
      },
      {
        name: "EHR/EMR Integration & FHIR Standards",
        desc: "Interoperable health data layer linking lab management, radiology, pharmacy, and patient record systems.",
      },
      {
        name: "AI Diagnostics & Clinical Assist",
        desc: "Machine learning pipelines for medical image classification, automated triage, and predictive health risk scoring.",
      },
      {
        name: "Hospital Information Management (HIMS)",
        desc: "Comprehensive modules for bed management, billing, doctor scheduling, and inventory tracking.",
      },
      {
        name: "Patient Engagement Mobile Apps",
        desc: "Empowering patients to view lab results, set medication reminders, and communicate securely with care providers.",
      },
    ],
    outcomes: [
      "Streamlined patient onboarding reducing wait times by over 40%",
      "Secure HD video consultation supporting thousands of daily appointments",
      "Automated appointment booking and digital lab report delivery",
    ],
    technologies: ["React / Next.js", "React Native", "FHIR / HL7 API", "Python PyTorch", "WebRTC", "PostgreSQL", "AWS Health"],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Future-ready EdTech, 3D AR learning, and AI tutoring systems.",
    heroDescription:
      "Pioneering interactive learning experiences through Kapikitab.in and custom EdTech platforms that combine AI tutoring, 3D concept visualization, and automated assessment.",
    badgeStat: "Interactive 3D · AI Tutoring · Multi-tenant LMS",
    overview:
      "Education is evolving beyond static textbooks and passive lectures. ABWcurious builds cutting-edge EdTech platforms, learning management systems, and AR/3D interactive tools that boost student engagement and academic mastery.",
    challenges: [
      {
        title: "Low Engagement with Static Textbooks",
        desc: "Students struggle to grasp complex scientific and mathematical concepts from 2D diagrams alone.",
      },
      {
        title: "Lack of Personalized Learning Paths",
        desc: "One-size-fits-all curricula failing to adapt to individual student pace and learning styles.",
      },
      {
        title: "Scalability for Online Assessments",
        desc: "Institutions needing secure, proctored, high-concurrency exam platforms for thousands of students.",
      },
    ],
    solutions: [
      {
        name: "Kapikitab.in — 3D AR Learning Platform",
        desc: "Our flagship product bringing textbooks to life with interactive 3D models, augmented reality, and AI tutoring.",
      },
      {
        name: "Custom Learning Management Systems (LMS)",
        desc: "Scalable course platforms with video streaming, interactive quizzes, progress tracking, and student analytics.",
      },
      {
        name: "AI Personalized Tutor & Adaptive Practice",
        desc: "Intelligent engines that generate custom practice questions and explain solutions based on student weaknesses.",
      },
      {
        name: "Online Examination & Proctoring Engines",
        desc: "Automated grading, anti-cheat monitoring, instant scorecard generation, and performance breakdown.",
      },
      {
        name: "Institution & Campus Management",
        desc: "All-in-one administrative software for attendance, fees, timetable scheduling, and parent communication.",
      },
    ],
    outcomes: [
      "Enhanced concept retention by 3.5x with interactive 3D learning models",
      "Automated grading and real-time student performance analytics for teachers",
      "Scalable infrastructure supporting 100,000+ concurrent active learners",
    ],
    technologies: ["Next.js", "Three.js / WebGL", "Python AI", "WebSockets", "Node.js", "Tailwind CSS", "Vercel / AWS"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    tagline: "Omnichannel commerce, personalized AI shopping, and high-conversion platforms.",
    heroDescription:
      "Engineering scalable D2C storefronts, marketplace architectures, inventory automation, and AI-driven recommendation engines for modern retailers.",
    badgeStat: "Headless Commerce · Sub-Second Search · AI Recommendations",
    overview:
      "Modern retail demands seamless experiences across digital and physical touchpoints. ABWcurious delivers headless e-commerce architectures, real-time inventory management, and hyper-personalized customer journeys.",
    challenges: [
      {
        title: "Flash Sale Traffic Surges",
        desc: "Traditional e-commerce monoliths crashing during promotional events and peak holiday shopping.",
      },
      {
        title: "Cart Abandonment & Friction",
        desc: "Slow page loads, complex checkouts, and unpersonalized product displays driving buyers away.",
      },
      {
        title: "Disconnected Online & Offline Inventory",
        desc: "Inaccurate stock levels between physical retail stores and online storefronts causing order cancellations.",
      },
    ],
    solutions: [
      {
        name: "Headless E-commerce Storefronts",
        desc: "Ultra-fast Next.js storefronts connected to Shopify, WooCommerce, or custom GraphQL backends.",
      },
      {
        name: "AI Product Recommendation & Search",
        desc: "Intelligent search and recommendation algorithms that tailor product grids to individual user intent.",
      },
      {
        name: "Multi-Vendor Marketplace Architecture",
        desc: "Comprehensive portals allowing multiple sellers to onboard, list items, and manage orders with vendor payouts.",
      },
      {
        name: "Real-Time Inventory & WMS Integration",
        desc: "Unified inventory synchronization connecting warehouses, retail POS, and online storefronts seamlessly.",
      },
      {
        name: "Omnichannel Mobile Shopping Apps",
        desc: "Native iOS and Android apps with push notifications, instant checkout, and barcode scanning.",
      },
    ],
    outcomes: [
      "Increased cart conversion rates by 38% using AI recommendations",
      "Handled 10x traffic spikes during flash sales with zero downtime",
      "Unified inventory visibility across online storefronts and physical stores",
    ],
    technologies: ["Next.js", "Shopify Storefront API", "GraphQL", "Tailwind CSS", "Stripe / Razorpay", "Redis", "Elasticsearch"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    tagline: "Guest experience platforms, smart booking engines, and hotel management.",
    heroDescription:
      "Transforming hotels, resorts, travel agencies, and dining chains with contactless check-in, dynamic pricing algorithms, and guest CRM systems.",
    badgeStat: "Contactless PMS · Dynamic Pricing · Unified Guest CRM",
    overview:
      "Hospitality thrives on memorable guest experiences and operational precision. ABWcurious builds modern reservation engines, contactless guest mobile keys, property management integrations, and automated guest communication.",
    challenges: [
      {
        title: "High OTA Commission Dependency",
        desc: "Loss of profit margins to third-party booking channels due to clunky direct website engines.",
      },
      {
        title: "Front Desk Bottlenecks",
        desc: "Long check-in queues frustrating arriving guests after long travel times.",
      },
      {
        title: "Fragmented Guest Profile Data",
        desc: "Inability to offer personalized stays or target repeat visitors across property locations.",
      },
    ],
    solutions: [
      {
        name: "Smart Direct Booking Engines",
        desc: "Fast, mobile-optimized booking engines with real-time room availability, add-on packages, and payment flow.",
      },
      {
        name: "Contactless Guest Mobile Keys & Kiosks",
        desc: "Allowing guests to complete check-in on their phone, upload ID, receive digital room keys, and skip lines.",
      },
      {
        name: "Property Management & Channel Integrations",
        desc: "Connecting direct channels with PMS systems (Oracle Opera, Cloudbeds) and OTAs in real time.",
      },
      {
        name: "AI Dynamic Pricing & Yield Management",
        desc: "Automated algorithms adjusting room rates dynamically based on demand, seasonality, and local events.",
      },
      {
        name: "Restaurant POS & Kitchen Display Systems (KDS)",
        desc: "QR menu ordering, table management, POS integration, and automated kitchen workflows.",
      },
    ],
    outcomes: [
      "Increased direct bookings by 45%, reducing OTA commission payouts",
      "Reduced front-desk check-in time to under 60 seconds with self-service web kiosks",
      "Automated guest feedback capture and real-time service recovery messaging",
    ],
    technologies: ["React / Next.js", "PWA / Mobile", "Node.js", "PostgreSQL", "Stripe", "Twilio WhatsApp API"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Smart factory IoT, predictive maintenance, and supply chain automation.",
    heroDescription:
      "Accelerating Industry 4.0 transformation with IoT sensor integration, digital twin technology, automated quality inspection, and ERP connectivity.",
    badgeStat: "Industry 4.0 · IoT Telemetry · Predictive Maintenance",
    overview:
      "Manufacturing leaders are digitizing factory floors to maximize yield, reduce equipment downtime, and optimize complex supply chains. ABWcurious delivers smart factory solutions that bridge OT and IT.",
    challenges: [
      {
        title: "Unplanned Equipment Downtime",
        desc: "Breakdowns of critical machinery halting production lines and inflating maintenance costs.",
      },
      {
        title: "Manual Quality Assurance",
        desc: "Human inspection errors leading to defective parts escaping to customers.",
      },
      {
        title: "Opaque Supply Chain Visibility",
        desc: "Lack of real-time tracking for raw materials, work-in-progress inventory, and finished goods shipment.",
      },
    ],
    solutions: [
      {
        name: "Industrial IoT Telemetry & Telematics",
        desc: "Connecting factory floor sensors to cloud dashboards for live temperature, vibration, and output tracking.",
      },
      {
        name: "AI Predictive Maintenance Systems",
        desc: "Anomaly detection models predicting machine failures days before breakdown occurs.",
      },
      {
        name: "Computer Vision Defect Inspection",
        desc: "High-speed camera pipelines inspecting products on conveyor belts to detect flaws instantly.",
      },
      {
        name: "Supply Chain & Track-and-Trace Portals",
        desc: "End-to-end visibility for logistics managers, suppliers, and distributors with RFID and QR tracking.",
      },
      {
        name: "OEE (Overall Equipment Effectiveness) Dashboards",
        desc: "Real-time analytics displaying availability, performance, and quality metrics per machine and plant.",
      },
    ],
    outcomes: [
      "Reduced unplanned machine downtime by 32% via predictive AI alerts",
      "Automated visual defect inspection operating at full assembly line speeds",
      "Real-time OEE visibility across multiple manufacturing facility locations",
    ],
    technologies: ["Python AI / OpenCV", "MQTT / IoT", "Node.js", "InfluxDB / Timescale", "Docker", "React / Next.js"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    tagline: "Automated workflows, client portals, and enterprise resource management.",
    heroDescription:
      "Equipping law firms, accounting practices, consulting agencies, and IT advisories with secure document management, billable time tracking, and client collaboration portals.",
    badgeStat: "Secure Client Portals · Automated Billing · Workflow AI",
    overview:
      "Professional service firms depend on speed, security, and exceptional client relationships. ABWcurious builds custom CRM tools, automated document workflows, billable hour tracking, and secure client communication vaults.",
    challenges: [
      {
        title: "Manual Document & Contract Reviews",
        desc: "High billable hours wasted on repetitive document formatting, data entry, and manual searches.",
      },
      {
        title: "Insecure File Sharing",
        desc: "Exchanging sensitive financial or legal files over unencrypted email attachments.",
      },
      {
        title: "Leaky Time Tracking & Delayed Invoicing",
        desc: "Incomplete billable hour tracking resulting in unbilled services and cash flow lags.",
      },
    ],
    solutions: [
      {
        name: "Secure Client Portals & File Vaults",
        desc: "Branded client portals with end-to-end encrypted document sharing, electronic signatures, and approval flows.",
      },
      {
        name: "Automated Time Tracking & Billing Systems",
        desc: "Integrated billable hour tracking with automated invoice generation and client payment collection.",
      },
      {
        name: "AI Document Search & Extraction",
        desc: "Intelligent search engines scanning contracts and reports to extract key clauses, dates, and terms instantly.",
      },
      {
        name: "Practice & Resource Management Software",
        desc: "Scheduling, consultant utilization tracking, project milestones, and profitability dashboards.",
      },
      {
        name: "Custom Agency CRM & Sales Pipeline",
        desc: "Tailored CRM workflows managing lead capture, proposal generation, and client retention history.",
      },
    ],
    outcomes: [
      "Saved 15+ hours per consultant weekly through automated document workflows",
      "Encrypted client portals ensuring strict confidentiality and audit readiness",
      "Accelerated billing cycles with integrated time tracking and automated invoices",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS S3 Encryption", "Stripe Invoicing", "PDF.js"],
  },
  {
    slug: "startups-emerging-businesses",
    name: "Startups & Emerging Businesses",
    tagline: "Rapid MVP development, cloud architecture, and fractional CTO advisory.",
    heroDescription:
      "Partnering with founders to move from concept to scalable product with rapid prototyping, robust MVP builds, pitch deck tech validation, and scalable cloud foundations.",
    badgeStat: "Rapid 6-Week MVP · Cloud Native · Fractional Tech Leadership",
    overview:
      "Startups need speed to market without accumulating crippling tech debt. ABWcurious acts as an end-to-end technology partner for high-growth startups, delivering scalable MVPs, architecture blueprints, and agile dev squads.",
    challenges: [
      {
        title: "Slow Time-to-Market",
        desc: "Founders spending months trying to hire developers or over-engineering features before launch.",
      },
      {
        title: "Technical Debt & Unscalable Stack",
        desc: "Quick-fix codebases breaking under initial user growth or failing investor tech due diligence.",
      },
      {
        title: "Limited Budget & Resource Constraints",
        desc: "Needing high-quality senior engineering without the overhead of full-time C-suite salaries.",
      },
    ],
    solutions: [
      {
        name: "Rapid 6-to-8 Week MVP Development",
        desc: "Fast, production-ready web and mobile app builds focused on core value propositions for early adopters.",
      },
      {
        name: "Cloud Architecture & Serverless Blueprint",
        desc: "Future-proof cloud infrastructure on Vercel, Supabase, or AWS designed to auto-scale affordably.",
      },
      {
        name: "Fractional CTO & Tech Advisory",
        desc: "Senior technical guidance for architecture reviews, tech stacks, investor pitch prep, and hiring.",
      },
      {
        name: "Iterative Feature & Growth Engineering",
        desc: "Agile sprint execution to add features based on real user analytics and market feedback.",
      },
      {
        name: "Pitch Deck Tech Validation & Interactive Prototypes",
        desc: "Clickable UI prototypes and working demonstrations to wow investors and early customers.",
      },
    ],
    outcomes: [
      "Delivered market-ready MVPs in under 6 to 8 weeks",
      "Architected infrastructure ready for seed, Series A, and hyper-scale growth",
      "Helped tech founders secure venture funding with working product prototypes",
    ],
    technologies: ["Next.js", "React Native", "Supabase", "Tailwind CSS", "Vercel", "TypeScript", "Node.js"],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return ALL_INDUSTRIES.find((ind) => ind.slug === slug);
}
