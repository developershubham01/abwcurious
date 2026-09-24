import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "ABWcurious — Curious Minds. Intelligent Software.",
    description:
      "AI software development, AI solutions, website development and design — engineered with curiosity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plexSans.variable} ${plexMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
