"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Camera,
  ChevronDown,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, TiltCard } from "./primitives";
import { SplitText } from "./text-anim";
import {
  FOUNDERS,
  CO_FOUNDERS,
  isPlaceholder,
  SAMPLE_NOTE,
  type Leader,
} from "@/data/company";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  website: Globe,
  youtube: Globe,
  github: Globe,
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "X (Twitter)",
  website: "Website",
  youtube: "YouTube",
  github: "GitHub",
};

export function LeaderSocial({ leader }: { leader: Leader }) {
  const entries = Object.entries(leader.socials).filter(([, href]) => href) as [
    string,
    string,
  ][];
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {entries.map(([key, href]) => {
        const Icon = SOCIAL_ICONS[key] ?? Globe;
        const dead = isPlaceholder(href);
        const hint = ` — placeholder, add the real URL in src/data/company.ts`;
        const shell = cn(
          "focus-carbon group/s relative inline-flex size-9 items-center justify-center border border-hairline bg-white text-ink-muted",
          "transition-colors duration-200 hover:border-ibm-blue hover:bg-ibm-blue hover:text-white",
          dead && "cursor-default hover:border-hairline hover:bg-white hover:text-ink-muted"
        );
        return (
          <li key={key}>
            {dead ? (
              <span role="link" aria-disabled="true" title={`${SOCIAL_LABELS[key] ?? key}${hint}`} className={shell}>
                <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${leader.name} on ${SOCIAL_LABELS[key] ?? key}`}
                title={`${SOCIAL_LABELS[key] ?? key}`}
                className={shell}
              >
                <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function LeaderPhoto({ leader }: { leader: Leader }) {
  return (
    <div className="group/pic relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:h-full">
      {leader.photo ? (
        <img
          src={leader.photo}
          alt={`Portrait of ${leader.name}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-ibm-layer transition-transform duration-700 ease-out group-hover:scale-[1.05]">
          {/* monogram tile — square Carbon avatar with a static dashed frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex size-32 items-center justify-center border border-hairline bg-white transition-colors duration-300 group-hover:border-ibm-blue sm:size-40">
              <span
                className="text-6xl font-light tracking-tight text-ink sm:text-7xl"
                aria-hidden="true"
              >
                {leader.monogram}
              </span>
              <span
                className="pointer-events-none absolute inset-1.5 border border-dashed border-ibm-blue/40"
                aria-hidden="true"
              />
            </div>
          </div>
          {/* placeholder note */}
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-[2px] border border-hairline bg-white px-3 py-1.5 text-xs text-ink-muted">
            <Camera className="size-3 text-ibm-subtle" strokeWidth={1.5} aria-hidden="true" />
            Photo placeholder
          </span>
        </div>
      )}
      {/* bottom gradient for legibility of the social row */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
    </div>
  );
}

function LeaderCard({ leader, delay = 0 }: { leader: Leader; delay?: number }) {
  const [expanded, setExpanded] = useState(false);
  const bioId = `bio-${leader.id}`;

  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={4} className="h-full">
        <article
          className={cn(
            "group relative flex h-full flex-col overflow-hidden border border-hairline bg-white",
            leader.featured ? "lg:flex-row" : ""
          )}
        >
          {/* photo / monogram */}
          <div className={cn("relative shrink-0 overflow-hidden", leader.featured && "lg:w-[46%]")}>
            <LeaderPhoto leader={leader} />

            {/* role chip */}
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[2px] border border-hairline bg-white px-3 py-1.5 text-xs text-ink-muted">
              <BadgeCheck className="size-3.5 text-primary" strokeWidth={1.5} aria-hidden="true" />
              {leader.role}
            </span>

            {/* socials — reveal on hover (desktop), always visible (touch) */}
            <div className="absolute inset-x-4 bottom-4 translate-y-0 opacity-100 transition-all duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <LeaderSocial leader={leader} />
            </div>
          </div>

          {/* body */}
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h3 className="text-2xl font-light tracking-tight text-ink sm:text-[1.7rem]">
              {leader.name}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {leader.role}
            </p>

            {/* bio with Read More */}
            <div id={bioId} className="mt-4">
              <motion.div
                initial={false}
                animate={{ height: "auto" }}
                className="relative"
              >
                <p
                  className={cn(
                    "text-sm leading-relaxed text-ink-muted transition-all",
                    !expanded && "line-clamp-3"
                  )}
                >
                  {leader.bio}
                </p>
              </motion.div>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls={bioId}
                className="focus-carbon mt-2 inline-flex items-center gap-1 self-start text-sm text-primary underline-offset-4 transition-colors hover:text-ibm-blue-active hover:underline"
              >
                {expanded ? "Read less" : "Read more"}
                <ChevronDown
                  className={cn("size-3.5 transition-transform duration-300", expanded && "rotate-180")}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* expertise */}
            <div className="mt-5">
              <p className="text-sm text-ink-muted">
                Areas of expertise
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {leader.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[2px] border border-hairline bg-ibm-layer px-3 py-1 text-xs text-ink-muted transition-colors hover:bg-ibm-layer-hover hover:text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* highlights */}
            <dl className="mt-auto grid grid-cols-3 gap-px overflow-hidden border border-hairline bg-hairline">
              {leader.highlights.map((h) => (
                <div key={h.label} className="bg-white px-3 py-3.5 text-center">
                  <dd className="text-[13px] font-semibold leading-tight tabular-nums text-ink">{h.value}</dd>
                  <dt className="mt-1 text-xs text-ibm-subtle">
                    {h.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function Leaders() {
  const founder = FOUNDERS[0];
  return (
    <section
      id="leadership"
      aria-label="Meet our leadership"
      className="relative scroll-mt-24 border-y border-hairline bg-ibm-layer py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="justify-center text-sm text-ink-muted">
              02 — Meet our leadership
            </p>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            <SplitText text="The minds leading" />{" "}
            <SplitText text="the curious." delay={0.15} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              Founders who still review pull-requests and join workshops — get to know the people
              setting the direction (and the vibe).
            </p>
          </Reveal>
        </div>

        {/* founder — featured card */}
        <div className="mt-14">
          {founder && <LeaderCard leader={founder} />}
        </div>

        {/* co-founders */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {CO_FOUNDERS.map((leader, i) => (
            <LeaderCard key={leader.id} leader={leader} delay={0.12 + i * 0.12} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-ibm-subtle">
            {SAMPLE_NOTE} — hover a card for socials · all links are placeholders
          </p>
        </Reveal>
      </div>
    </section>
  );
}
