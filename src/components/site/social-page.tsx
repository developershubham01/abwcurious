"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Lock, Share2, MessageSquare, Sparkles, Rss, Mail, ShieldCheck, Linkedin, Github, Instagram, Youtube, MessageCircle, Copy, Check } from "lucide-react";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { SOCIALS, COMPANY, isPlaceholder } from "@/data/company";
import { XIcon } from "./x-icon";
import { cn } from "@/lib/utils";

const CHANNEL_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; size?: number | string; [key: string]: any }>> = {
  linkedin: Linkedin,
  github: Github,
  twitter: XIcon,
  instagram: Instagram,
  youtube: Youtube,
  discord: MessageCircle,
};

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
      {/* ================= Hero Section — About Page Theme ================= */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
              Social Media & Community
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 sm:mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Follow the journey, <span className="text-primary font-normal">wherever you build.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 sm:mt-8 max-w-3xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              Launches, architectural deep-dives, live demo days, and studio dispatches. Pick your preferred platform and stay in the loop with {COMPANY.name}.
            </p>
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
            {EXTENDED_CHANNELS.map((item, i) => {
              const ChannelIcon = CHANNEL_ICONS[item.platform];
              return (
              <Reveal key={item.platform} delay={0.06 * i} className="h-full">
                <div className="group flex h-full flex-col justify-between border border-hairline bg-white p-6 sm:p-8 transition-all hover:border-primary hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-hairline pb-4">
                      <div className="flex items-center gap-2.5">
                        {ChannelIcon && (
                          <span className="flex size-7 items-center justify-center border border-hairline bg-ibm-layer text-primary group-hover:border-primary transition-colors">
                            <ChannelIcon className="size-3.5" />
                          </span>
                        )}
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
            ); })}

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

      {/* ================= Live Dispatches & Community Moments ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="max-w-2xl">
              <Eyebrow tone="muted">Social Dispatches In The Wild</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                What we share with the ecosystem.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                From live product releases on X to deep architecture teardowns on YouTube, explore our public engineering footprint.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-ink-muted border border-hairline bg-white px-3.5 py-2">
              <Sparkles className="size-4 text-primary" />
              <span>Public Build Logs & Releases</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="group overflow-hidden border border-hairline bg-white transition-all hover:border-primary hover:shadow-lg">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                <Image
                  src="/images/ev-launch.jpg"
                  alt="Live streaming product launch event"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                  Launch Demo Days
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-medium text-ink">Build-in-Public Demos</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  We stream product debuts and host open AMAs covering technical architecture, benchmarks, and roadmaps.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden border border-hairline bg-white transition-all hover:border-primary hover:shadow-lg">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                <Image
                  src="/images/ev-summit.jpg"
                  alt="Annual tech summit stage presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                  Conference Keynotes
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-medium text-ink">Tech Talks & Keynotes</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  Dispatches and slidedecks from DevCon Mumbai, AI summits, and open source conferences worldwide.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden border border-hairline bg-white transition-all hover:border-primary hover:shadow-lg">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                <Image
                  src="/images/gl-team.jpg"
                  alt="Studio team celebrating release"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                  Studio Culture
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-medium text-ink">Behind the Scenes</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  Candid studio snapshots, whiteboard brainstorms, and moments from our engineering hub in Nerul, Navi Mumbai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Media & Brand Inquiries ================= */}
      <section className="border-t border-hairline py-16 sm:py-20">
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
