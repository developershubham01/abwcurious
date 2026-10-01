export interface LocationDetail {
  slug: string;
  cityName: string;
  region: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  introText: string;
  isPrimaryOffice?: boolean;
  address?: string;
  phone?: string;
  email?: string;
  keyAreas: string[];
  featuredServices: { slug: string; name: string; desc: string }[];
  localContext: string;
  faqs: { q: string; a: string }[];
}

export const LOCATIONS_DATA: LocationDetail[] = [
  {
    slug: "navi-mumbai",
    cityName: "Navi Mumbai",
    region: "Maharashtra",
    country: "India",
    isPrimaryOffice: true,
    address: "S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Maharashtra 400706",
    phone: "+91 99303 38504",
    email: "info@abwcurious.com",
    metaTitle: "IT Services & Software Development Company in Navi Mumbai | ABWcurious",
    metaDescription:
      "ABWcurious Pvt. Ltd. is a leading IT services and custom software development company in Navi Mumbai (Nerul), offering web apps, AI, cybersecurity, IT support & digital marketing.",
    heroTitle: "IT Services & Software Development Company in Navi Mumbai",
    heroSubtitle:
      "Headquartered in Nerul East, Navi Mumbai. Delivering enterprise custom software, web apps, AI automation, cybersecurity, and IT support & business solutions.",
    introText:
      "ABWcurious Pvt. Ltd. operates directly out of Haware's Centurion Mall in Nerul East, Navi Mumbai. We serve local enterprises, industrial hubs, logistics providers, and technology startups across Navi Mumbai and the MMR region with world-class digital engineering.",
    keyAreas: ["Nerul", "Vashi", "Belapur", "Kharghar", "Mahape (TTC Industrial Area)", "Airoli", "Panvel", "Ghansoli"],
    featuredServices: [
      {
        slug: "software-development",
        name: "Custom Software Engineering",
        desc: "Tailored ERP, CRM, portal, and enterprise workflow software built for local businesses.",
      },
      {
        slug: "website-development",
        name: "Next.js Web Development",
        desc: "Ultra-fast Next.js business websites and e-commerce portals optimized for Core Web Vitals.",
      },
      {
        slug: "cybersecurity",
        name: "Cybersecurity & VAPT Audits",
        desc: "Application security audits, network penetration testing, and ISO/compliance readiness.",
      },
      {
        slug: "ai-solutions",
        name: "AI & Business Process Automation",
        desc: "RAG knowledge engines, custom chatbots, and automated document workflow processing.",
      },
    ],
    localContext:
      "As a registered technology company in Navi Mumbai, ABWcurious provides rapid on-site consulting, dedicated development squads, and 24/7 technical support for businesses across the TTC Industrial Belt, Millennium Business Park in Mahape, and Mindspace Airoli.",
    faqs: [
      {
        q: "Where is ABWcurious located in Navi Mumbai?",
        a: "Our registered office is at S07-05, Haware's Centurion, Sector 19A, Nerul (East), Darave, Navi Mumbai, Maharashtra 400706.",
      },
      {
        q: "Does ABWcurious offer in-person IT consulting in Navi Mumbai?",
        a: "Yes, our engineering leadership and consultants provide direct in-person discovery meetings, security audits, and project discussions across Navi Mumbai.",
      },
      {
        q: "What IT services does ABWcurious provide in Navi Mumbai?",
        a: "We offer custom software development, Next.js web development, mobile apps (React Native/Flutter), AI & RAG development, VAPT cybersecurity, IT support & AMC services, and digital marketing.",
      },
    ],
  },
  {
    slug: "mumbai",
    cityName: "Mumbai",
    region: "Maharashtra",
    country: "India",
    metaTitle: "IT Services & Software Development Company in Mumbai | ABWcurious",
    metaDescription:
      "Looking for a reliable software development & IT company in Mumbai? ABWcurious delivers custom software, web applications, cybersecurity, AI, and IT support & business solutions.",
    heroTitle: "IT Services & Software Development Company in Mumbai",
    heroSubtitle:
      "Partnering with Mumbai's leading financial institutions, enterprises, healthcare providers, and startups for digital transformation.",
    introText:
      "ABWcurious provides high-performance custom software development, mobile apps, cybersecurity audits, and digital marketing services to businesses throughout Mumbai.",
    keyAreas: ["BKC (Bandra Kurla Complex)", "Andheri East & West", "Lower Parel", "Nariman Point", "Powai", "Worli", "Goregaon"],
    featuredServices: [
      {
        slug: "software-development",
        name: "Enterprise Software Engineering",
        desc: "Scalable microservices, multi-tenant SaaS platforms, and secure API gateways.",
      },
      {
        slug: "cybersecurity",
        name: "VAPT & Financial Security",
        desc: "Penetration testing and vulnerability management for BFSI and fintech organizations.",
      },
      {
        slug: "it-support-business-solutions",
        name: "IT Support & Infrastructure",
        desc: "24/7 technical support, IT AMC, and business software solutions.",
      },
    ],
    localContext:
      "Mumbai's dynamic business environment demands reliable, high-uptime technology infrastructure. ABWcurious acts as a strategic technology partner for Mumbai-based firms navigating digital growth.",
    faqs: [
      {
        q: "Why choose ABWcurious for software development in Mumbai?",
        a: "We combine local proximity in the Mumbai Metropolitan Region with modern technology stacks like Next.js, Python, and AI integration, delivering projects on time and within budget.",
      },
      {
        q: "Does ABWcurious work with startups in Mumbai?",
        a: "Yes, we partner with early-stage and venture-backed startups in Mumbai to build rapid MVPs, scalable backends, and cross-platform mobile apps.",
      },
    ],
  },
  {
    slug: "thane",
    cityName: "Thane",
    region: "Maharashtra",
    country: "India",
    metaTitle: "IT Services & Software Development Company in Thane | ABWcurious",
    metaDescription:
      "ABWcurious provides custom software development, web app engineering, cybersecurity, and IT support & business solutions for growing businesses in Thane.",
    heroTitle: "IT Services & Software Development Company in Thane",
    heroSubtitle:
      "Accelerating technology adoption and digital automation for businesses across Thane and Wagle Estate.",
    introText:
      "ABWcurious serves commercial enterprises, manufacturing units, and healthcare providers in Thane with scalable digital solutions.",
    keyAreas: ["Wagle Estate", "Ghodbunder Road", "Thane West", "Majiwada", "Naupada"],
    featuredServices: [
      {
        slug: "website-development",
        name: "Business Website Development",
        desc: "SEO-optimized corporate websites and interactive portals.",
      },
      {
        slug: "process-automation",
        name: "Workflow & Process Automation",
        desc: "RPA and API automation reducing manual document processing.",
      },
    ],
    localContext:
      "Thane is rapidly evolving into a major corporate and tech hub. ABWcurious delivers modern IT consulting and software modernization to Thane's business community.",
    faqs: [
      {
        q: "Does ABWcurious serve clients in Wagle Estate, Thane?",
        a: "Yes, we regularly consult and deliver software solutions for industrial and IT clients located in Wagle Industrial Estate and along Ghodbunder Road.",
      },
    ],
  },
  {
    slug: "pune",
    cityName: "Pune",
    region: "Maharashtra",
    country: "India",
    metaTitle: "IT Services & Software Development Company in Pune | ABWcurious",
    metaDescription:
      "ABWcurious provides custom software development, AI solutions, mobile apps, and DevOps services for tech companies and enterprises in Pune.",
    heroTitle: "IT Services & Software Development Company in Pune",
    heroSubtitle:
      "Empowering Pune's tech ecosystem with software engineering, AI models, and DevOps automation.",
    introText:
      "Pune is one of India's premier IT hubs. ABWcurious collaborates with Pune-based product companies, automotive tech firms, and software enterprises to accelerate digital engineering.",
    keyAreas: ["Hinjewadi", "Kharadi", "Viman Nagar", "Baner", "Magarpatta", "Aundh"],
    featuredServices: [
      {
        slug: "ai-solutions",
        name: "AI & Machine Learning",
        desc: "Generative AI, LLM integration, and vector search systems.",
      },
      {
        slug: "devops",
        name: "DevOps & CI/CD Pipelines",
        desc: "Docker, Kubernetes, and Terraform infrastructure management.",
      },
    ],
    localContext:
      "With deep expertise in modern JavaScript/Python frameworks and software architectures, ABWcurious seamlessly integrates with Pune engineering teams as a high-velocity development partner.",
    faqs: [
      {
        q: "Can ABWcurious provide dedicated development teams for Pune enterprises?",
        a: "Yes, we offer dedicated software engineering squads and project-based execution for firms in Hinjewadi Phase 1-3, Kharadi, and Baner.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationDetail | undefined {
  return LOCATIONS_DATA.find((loc) => loc.slug === slug);
}
