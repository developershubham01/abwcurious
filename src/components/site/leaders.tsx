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
          "focus-carbon group/s relative inline-flex size-9 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink/70 shadow-sm backdrop-blur",
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-ibm-blue hover:bg-ibm-blue hover:text-white hover:shadow-[0_10px_22px_-8px_rgba(15,98,254,0.55)]",
          dead && "cursor-default hover:border-ink/10 hover:bg-white/90 hover:text-ink/70 hover:translate-y-0 hover:shadow-sm"
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
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          style={{
            background:
              "radial-gradient(120% 120% at 20% 0%, #e8f0ff 0%, #f6f9ff 45%, #eef3ff 100%)",
          }}
        >
          {/* faint grid */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,98,254,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.05) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
            aria-hidden="true"
          />
          {/* monogram medallion */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex size-32 items-center justify-center rounded-full border border-ibm-blue/25 bg-white/80 shadow-[0_20px_50px_-20px_rgba(15,98,254,0.4)] backdrop-blur transition-transform duration-500 group-hover:scale-105 sm:size-40">
              <span
                className="text-6xl font-light tracking-tight text-gradient sm:text-7xl"
                aria-hidden="true"
              >
                {leader.monogram}
              </span>
              <span
                className="absolute inset-0 rounded-full border border-dashed border-ibm-blue/30 [animation:spin_26s_linear_infinite]"
                aria-hidden="true"
              />
            </div>
          </div>
          {/* placeholder note */}
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 backdrop-blur">
            <Camera className="size-3" strokeWidth={1.5} aria-hidden="true" />
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
            "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/[0.07] bg-white",
            "shadow-[0_10px_44px_-18px_rgba(15,98,254,0.28)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-24px_rgba(15,98,254,0.45)]",
            leader.featured ? "lg:flex-row" : ""
          )}
        >
          {/* photo / monogram */}
          <div className={cn("relative shrink-0 overflow-hidden", leader.featured && "lg:w-[46%]")}>
            <LeaderPhoto leader={leader} />

            {/* role chip */}
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ibm-blue-active shadow-sm backdrop-blur">
              <BadgeCheck className="size-3.5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
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
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ibm-bright">
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
                    "text-sm leading-relaxed text-ink/65 transition-all",
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
                className="focus-carbon mt-2 inline-flex items-center gap-1 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] text-ibm-bright transition-colors hover:text-ibm-blue-active"
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
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45">
                Areas of expertise
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {leader.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-ibm-blue/15 bg-ibm-blue/[0.06] px-3 py-1 text-xs font-medium text-ibm-blue-active transition-colors hover:bg-ibm-blue hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* highlights */}
            <dl className="mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/[0.06] bg-ink/[0.05] pt-0">
              {leader.highlights.map((h) => (
                <div key={h.label} className="bg-[#f8faff] px-3 py-3.5 text-center">
                  <dd className="text-[13px] font-semibold leading-tight text-ink">{h.value}</dd>
                  <dt className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/45">
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
      className="relative scroll-mt-24 border-y border-ink/[0.05] bg-[#f6f9ff] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="justify-center font-mono text-xs uppercase tracking-[0.22em] text-ibm-soft">
              02 — Meet Our Leadership
            </p>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            <SplitText text="The minds leading" />{" "}
            <SplitText text="the curious." delay={0.15} wordClassName="text-gradient font-normal" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/60 sm:text-lg">
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
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">
            {SAMPLE_NOTE} — hover a card for socials · all links are placeholders
          </p>
        </Reveal>
      </div>
    </section>
  );
}
