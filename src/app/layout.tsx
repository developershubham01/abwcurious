import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FAQS } from "@/lib/content-faq";

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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ABWcurious",
  url: "https://abwcurious.com",
  logo: "https://abwcurious.com/logo-mark.svg",
  description:
    "Technology studio building AI software, intelligent AI solutions, websites and digital design.",
  email: "hello@abwcurious.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${plexSans.variable} ${plexMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
