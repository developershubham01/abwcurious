import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollProgress, BackToTop } from "@/components/site/chrome";
import { ViewPortals } from "@/components/site/view-portals";

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
  title: "ABWcurious — The People Behind the Products · Leadership, Events & Journey",
  description:
    "Meet the founders and team behind ABWcurious, explore our company events, milestones, gallery and social presence — a curious studio building AI software, websites and digital experiences.",
  keywords: [
    "ABWcurious",
    "about ABWcurious",
    "ABWcurious team",
    "founders",
    "co-founders",
    "company events",
    "company gallery",
    "leadership",
    "AI software studio",
    "Pune technology company",
  ],
  authors: [{ name: "ABWcurious" }],
  icons: {
    icon: [
      { url: "/images/logo-abw-mark-512.png", type: "image/png", sizes: "512x512" },
      { url: "/images/logo-abw-mark.png", type: "image/png", sizes: "240x240" },
      { url: "/logo-mark.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/logo-abw-mark-512.png",
    apple: "/images/logo-abw-mark-512.png",
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
  logo: "https://abwcurious.com/images/logo-abw-mark-512.png",
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
    "Meet the people behind ABWcurious — leadership, company events, gallery and journey.",
  inLanguage: "en",
  publisher: { "@id": "https://abwcurious.com/#organization" },
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
          {/* Hash-route virtual pages (products, product detail, blogs,
              service categories, sitemap) — fixed overlays that open above
              the landing page, each with the full navbar + footer. */}
          <ViewPortals />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
