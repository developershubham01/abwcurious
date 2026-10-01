import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollProgress, BackToTop } from "@/components/site/chrome";
import { ViewPortals } from "@/components/site/view-portals";
import { ChatAssistant } from "@/components/site/chat-assistant";
import { WhatsAppWidget } from "@/components/site/whatsapp-widget";
import { SEO_CONFIG } from "@/lib/seo-config";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebSiteSchema,
} from "@/components/seo/JsonLd";

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
  metadataBase: new URL(SEO_CONFIG.canonicalBase),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  description: SEO_CONFIG.defaultDescription,
  keywords: [
    "ABWcurious",
    "IT services company Navi Mumbai",
    "custom software development company India",
    "software development company in Mumbai",
    "website development company in Mumbai",
    "mobile app development company India",
    "cybersecurity services Navi Mumbai",
    "VAPT company Mumbai",
    "AI development company India",
    "cloud migration company India",
    "Marketing company Mumbai",
  ],
  authors: [{ name: SEO_CONFIG.companyName, url: SEO_CONFIG.canonicalBase }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/images/logo-abw-mark-512.png", type: "image/png", sizes: "512x512" },
      { url: "/images/logo-abw-mark.png", type: "image/png", sizes: "240x240" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    siteName: SEO_CONFIG.siteName,
    type: "website",
    url: SEO_CONFIG.canonicalBase,
    locale: "en_US",
    images: [
      {
        url: SEO_CONFIG.ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ABWcurious — Custom Software Development, AI, Cybersecurity & IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [SEO_CONFIG.ogImageUrl],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SEO_CONFIG.canonicalBase,
    types: { "application/rss+xml": "/api/rss" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body
        className={`${plexSans.variable} ${plexMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {/* Chrome (skip link, progress line, header, footer, back-to-top) lives
            in the root layout so error/404 boundaries render with full site
            navigation. page.tsx contributes only <main id="main">. */}
        <div id="top" className="flex min-h-screen flex-col bg-background text-foreground">
          <a
            href="#main"
            className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:outline-none"
          >
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
          {/* RAG AI floating chat assistant — persists across all pages */}
          <ChatAssistant />
          {/* WhatsApp floating widget — left side */}
          <WhatsAppWidget />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
