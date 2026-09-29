"use client";

import { ExternalLink, Lock, Share2, MessageSquare, Sparkles, Rss, Mail, ShieldCheck } from "lucide-react";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SOCIALS, COMPANY, isPlaceholder } from "@/data/company";
import { XIcon } from "./x-icon";
import { cn } from "@/lib/utils";

const EXTENDED_CHANNELS = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "@abwcurious",
    href: "https://www.linkedin.com/company/abwcurious",
    tagline: "Executive thoughts, engineering culture, and company milestones.",
    cadence: "Weekly updates",
    focus: "Enterprise & Tech Leadership",
  },
  {
    platform: "github",
    label: "GitHub",
    handle: "github.com/abwcurious",
    href: "https://github.com",
    tagline: "Open-source tools, starter kits, benchmarks, and architectural demos.",
    cadence: "Continuous releases",
    focus: "Code & Engineering",
  },
  {
    platform: "twitter",
    label: "X (Twitter)",
    handle: "@ABWcurious",
    href: "https://x.com/abwcurious",
    tagline: "Real-time build logs, tech commentary, launch alerts, and hot takes.",
    cadence: "Daily dispatches",
    focus: "Discussions & Launches",
  },
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@abwcurious_studio",
    href: "https://instagram.com/abwcurious",
    tagline: "Behind the scenes, studio life, design prototypes, and team culture.",
    cadence: "3x / week",
    focus: "Design & Studio Culture",
  },
  {
    platform: "youtube",
    label: "YouTube",
    handle: "ABWcurious Engineering",
    href: "https://youtube.com",
    tagline: "System teardowns, conference talks, and deep-dive technical tutorials.",
    cadence: "Bi-weekly videos",
    focus: "Video Demos & Teardowns",
  },
  {
    platform: "discord",
    label: "Developer Community",
    handle: "discord.gg/abwcurious",
    href: "https://discord.com",
    tagline: "Open discussions with our engineers, peer troubleshooting, and tech chats.",
    cadence: "24/7 Community",
    focus: "Community & Support",
  },
];

export function SocialMediaPage() {
  return (
    <div className="bg-background">
      {/* ================= Hero Section ================= */}
      <section className="relative overflow-hidden border-b border-hairline bg-[#04101f] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 30%, rgba(95,208,225,0.22), transparent 70%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-medium tracking-wide text-[#79dce8] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#5fd0e1] animate-pulse-dot" />
              Community & Dispatches · Official Social Hub
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              Follow the journey,{" "}
              <span className="bg-gradient-to-r from-[#79dce8] via-[#a6e5ff] to-white bg-clip-text text-transparent font-normal">
                wherever you build.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              Launches, architectural deep-dives, live demo days, and studio dispatches. Pick your preferred platform and stay in the loop with {COMPANY.name}.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5">
                <ShieldCheck className="size-3.5 text-[#5fd0e1]" />
                All handles verified
              </span>
              <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5">
                <Sparkles className="size-3.5 text-[#5fd0e1]" />
                Active community
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Social Grid Section ================= */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Verified Channels</Eyebrow>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Connect with our practices & creators.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Choose the channels that match your interests — whether you prefer code releases on GitHub, live updates on X, or in-depth insights on LinkedIn.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXTENDED_CHANNELS.map((item, i) => (
              <Reveal key={item.platform} delay={0.06 * i} className="h-full">
                <div className="group flex h-full flex-col justify-between border border-hairline bg-white p-6 sm:p-8 transition-all hover:border-primary hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-hairline pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg font-medium text-ink">{item.label}</span>
                      </div>
                      <span className="border border-hairline bg-ibm-layer px-2 py-0.5 text-[11px] font-mono text-ink-muted">
                        {item.focus}
                      </span>
                    </div>

                    <p className="mt-3 font-mono text-xs text-primary">{item.handle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {item.tagline}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-hairline pt-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-ink-muted">{item.cadence}</span>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary transition-colors hover:text-ibm-blue-hover hover:underline"
                    >
                      Follow channel
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Direct Email Card */}
            <Reveal delay={0.36} className="h-full">
              <div className="group flex h-full flex-col justify-between border border-hairline bg-primary p-6 sm:p-8 text-white transition-all hover:bg-ibm-blue-hover">
                <div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-4">
                    <span className="text-lg font-medium">Direct Email</span>
                    <Mail className="size-5" />
                  </div>
                  <p className="mt-3 font-mono text-xs text-white/80">{COMPANY.email}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/90">
                    Prefer direct conversations? Send partnerships, press inquiries, and project briefs directly to our team inbox.
                  </p>
                </div>
                <div className="mt-8 border-t border-white/20 pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/70">Response &lt; 24h</span>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white hover:underline"
                  >
                    Write to us
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Media & Brand Inquiries ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border border-hairline bg-white p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Press & Media</span>
              <h2 className="mt-2 text-2xl font-light text-ink sm:text-3xl">
                Covering ABWcurious or seeking commentary?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                We frequently provide technical commentary, data perspectives, and product insights on AI, web development, cloud computing, and digital transformation.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
              <RollButton href={`mailto:${COMPANY.email}?subject=Media%20Inquiry`} variant="primary" arrow>
                Contact press team
              </RollButton>
              <RollButton href="/blogs" variant="outline">
                Read engineering blog
              </RollButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
