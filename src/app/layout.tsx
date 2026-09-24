import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FAQS } from "@/lib/content-faq";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollProgress, BackToTop } from "@/components/site/chrome";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abwcurious.com"),
  title: "ABWcurious — AI Software Development, AI Solutions & Website Development",
  description:
    "ABWcurious is a technology studio building AI software, intelligent AI solutions, high-performance websites and memorable digital design for ambitious businesses.",
  keywords: [
    "ABWcurious",
    "AI software development",
    "AI solutions",
    "website development",
    "web app development",
    "UI UX design",
    "chatbot development",
    "machine learning",
  ],
  authors: [{ name: "ABWcurious" }],
  icons: {
    icon: "/logo-mark.svg",
  },
  openGraph: {
    title: "ABWcurious — Curious Minds. Intelligent Software.",
    description:
      "AI software development, AI solutions, website development and design — engineered with curiosity.",
    siteName: "ABWcurious",
    type: "website",
    url: "https://abwcurious.com",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1216,
        height: 640,
        alt: "ABWcurious — AI software development studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABWcurious — Curious Minds. Intelligent Software.",
    description:
      "AI software development, AI solutions, website development and design — engineered with curiosity.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  alternates: {
    types: { "application/rss+xml": "/api/rss" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://abwcurious.com/#organization",
  name: "ABWcurious",
  url: "https://abwcurious.com",
  logo: "https://abwcurious.com/logo-mark.svg",
  description:
    "Technology studio building AI software, intelligent AI solutions, websites and digital design.",
  slogan: "Curious minds. Intelligent software.",
  email: "hello@abwcurious.com",
  knowsAbout: [
    "AI software development",
    "LLM integration",
    "Web application development",
    "UI/UX design",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [],
};

/* WebSite node ties the single-page document to the organization and
   lets crawlers associate the RSS feed as the site's update channel. */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://abwcurious.com/#website",
  name: "ABWcurious",
  url: "https://abwcurious.com",
  description:
    "AI software development, AI solutions, website development and design — engineered with curiosity.",
  inLanguage: "en",
  publisher: { "@id": "https://abwcurious.com/#organization" },
};

/* FAQPage rich-result structured data — mirrors the on-page FAQ (shared content module) */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${plexSans.variable} ${plexMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {/* Chrome (skip link, progress line, header, footer, back-to-top) lives
            in the root layout so error/404 boundaries render with full site
            navigation. page.tsx contributes only <main id="main">. */}
        <div id="top" className="flex min-h-screen flex-col bg-background text-foreground">
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <BackToTop />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
