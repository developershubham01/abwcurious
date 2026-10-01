"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TRAINING_TRACKS } from "@/data/training";
import { cn } from "@/lib/utils";

/**
 * Line-art decorative vectors matching the reference visual
 */
function CardGraphics({ trackSlug }: { trackSlug: string }) {
  if (trackSlug === "student-pathways") {
    return (
      <>
        {/* Top-left: Eye & orbital vision motif */}
        <div className="absolute top-4 left-4 pointer-events-none opacity-40 text-sky-700">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="24" cy="24" r="8" />
            <circle cx="24" cy="24" r="3" fill="currentColor" />
            <circle cx="10" cy="12" r="2.5" />
            <circle cx="38" cy="14" r="2" />
            <path d="M12 13 C 18 18, 20 20, 24 24" strokeDasharray="2 2" />
            <path d="M36 15 C 30 20, 28 22, 24 24" strokeDasharray="2 2" />
            <circle cx="14" cy="36" r="1.5" />
          </svg>
        </div>

        {/* Bottom-right: Wireframe UI window motif */}
        <div className="absolute bottom-3 right-3 pointer-events-none opacity-45 text-sky-700">
          <svg width="56" height="46" viewBox="0 0 56 46" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="52" height="42" rx="4" />
            <line x1="2" y1="12" x2="54" y2="12" />
            <circle cx="8" cy="7" r="1.5" fill="currentColor" />
            <circle cx="14" cy="7" r="1.5" fill="currentColor" />
            <rect x="8" y="18" width="16" height="10" rx="1.5" />
            <rect x="28" y="18" width="8" height="8" rx="1.5" />
            <rect x="38" y="18" width="8" height="8" rx="1.5" />
            <rect x="28" y="28" width="8" height="8" rx="1.5" />
            <rect x="38" y="28" width="8" height="8" rx="1.5" />
          </svg>
        </div>
      </>
    );
  }

  if (trackSlug === "foundational-skills") {
    return (
      <>
        {/* Top-left: Target bullseye motif */}
        <div className="absolute top-4 left-4 pointer-events-none opacity-40 text-emerald-800">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="20" cy="24" r="16" />
            <circle cx="20" cy="24" r="10" />
            <circle cx="20" cy="24" r="4" fill="currentColor" />
            <path d="M34 10 L 23 21" strokeWidth="2" />
            <path d="M30 10 L 34 10 L 34 14" strokeWidth="2" />
          </svg>
        </div>

        {/* Bottom-right: Document & speech bubble motif */}
        <div className="absolute bottom-3 right-3 pointer-events-none opacity-45 text-emerald-800">
          <svg width="54" height="48" viewBox="0 0 54 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Document sheet */}
            <rect x="18" y="4" width="32" height="38" rx="3" />
            <line x1="24" y1="12" x2="42" y2="12" />
            <line x1="24" y1="18" x2="42" y2="18" />
            <line x1="24" y1="24" x2="36" y2="24" />
            {/* Chat bubble overlay */}
            <path
              d="M6 30 C 6 25, 18 25, 18 30 C 18 34, 14 36, 12 38 L 8 40 L 9 36 C 7 34, 6 32, 6 30 Z"
              fill="#ebf8ee"
            />
            <path d="M6 30 C 6 25, 18 25, 18 30 C 18 34, 14 36, 12 38 L 8 40 L 9 36 C 7 34, 6 32, 6 30 Z" />
            <circle cx="10" cy="30" r="1" fill="currentColor" />
            <circle cx="13" cy="30" r="1" fill="currentColor" />
          </svg>
        </div>
      </>
    );
  }

  // Professional training
  return (
    <>
      {/* Top-left: Checklist motif */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-40 text-slate-700">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="6" width="10" height="10" rx="1.5" />
          <path d="M6 11 L 8 13 L 12 8" strokeWidth="1.8" />
          <line x1="20" y1="11" x2="42" y2="11" />

          <rect x="4" y="20" width="10" height="10" rx="1.5" />
          <path d="M6 25 L 8 27 L 12 22" strokeWidth="1.8" />
          <line x1="20" y1="25" x2="38" y2="25" />

          <rect x="4" y="34" width="10" height="10" rx="1.5" />
          <line x1="20" y1="39" x2="34" y2="39" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Bottom-right: Brain & neural network motif */}
      <div className="absolute bottom-3 right-3 pointer-events-none opacity-45 text-slate-700">
        <svg width="52" height="48" viewBox="0 0 52 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Stylized brain hemispheres */}
          <path d="M26 8 C 21 8, 16 12, 16 18 C 12 19, 10 23, 10 27 C 10 32, 14 36, 18 36 C 18 39, 21 42, 25 42 L 26 42" />
          <path d="M26 8 C 31 8, 36 12, 36 18 C 40 19, 42 23, 42 27 C 42 32, 38 36, 34 36 C 34 39, 31 42, 27 42 L 26 42" />
          <line x1="26" y1="8" x2="26" y2="42" />
          <circle cx="20" cy="22" r="1.5" fill="currentColor" />
          <circle cx="32" cy="22" r="1.5" fill="currentColor" />
          <circle cx="26" cy="30" r="1.5" fill="currentColor" />
          <path d="M20 22 L 26 30 L 32 22" strokeDasharray="1.5 1.5" />
        </svg>
      </div>
    </>
  );
}

export function TrainingSection({
  className,
  showHeading = true,
}: {
  className?: string;
  showHeading?: boolean;
}) {
  return (
    <section
      className={cn("w-full py-16 md:py-24 bg-white border-y border-hairline", className)}
      aria-label="Training for what's next"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Heading */}
          {showHeading && (
            <div className="lg:col-span-3 pt-2 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light leading-[1.12] tracking-tight text-ink font-sans">
                  Training for <br className="hidden sm:inline" />
                  what&apos;s next
                </h2>
                <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                  Empowering students, developers, and enterprise engineering teams through future-ready curricula, industry-verified capstone projects, and direct mentorship from experienced ABWcurious technology leaders, in collaboration with <b>Skill India</b>.
                </p>
              </div>

              {/* Skill India Collaboration Square Card Tile */}
              <div className="mt-6 w-full max-w-[220px] aspect-square rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex items-center justify-center shadow-2xs hover:bg-slate-50 hover:border-slate-300/90 transition-all">
                <Image
                  src="/images/skill-india-logo.svg"
                  alt="Skill India — Kaushal Bharat Kushal Bharat"
                  width={220}
                  height={175}
                  className="w-full h-auto max-h-[140px] object-contain drop-shadow-2xs"
                />
              </div>
            </div>
          )}

          {/* Right Columns: 3 Pathway Cards */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8",
              showHeading ? "lg:col-span-9" : "lg:col-span-12"
            )}
          >
            {TRAINING_TRACKS.map((track) => {
              const detailUrl = `/training/${track.slug}`;
              return (
                <div
                  key={track.slug}
                  className="group flex flex-col justify-between transition-all duration-200"
                >
                  <div>
                    {/* Visual box with soft pastel background, circular cutout, and outline graphics */}
                    <Link
                      href={detailUrl}
                      className={cn(
                        "relative block w-full rounded-2xl overflow-hidden aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.015] group-hover:shadow-md",
                        track.bgClass
                      )}
                    >
                      {/* Decorative Line-Art vector graphics */}
                      <CardGraphics trackSlug={track.slug} />

                      {/* Center Circular Photo Cutout */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-32 md:w-32 lg:h-36 lg:w-36 rounded-full overflow-hidden shadow-sm ring-4 ring-white/90">
                          <Image
                            src={track.image}
                            alt={track.imageAlt}
                            fill
                            sizes="(max-width: 768px) 140px, 160px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </Link>

                    {/* Title */}
                    <h3 className="mt-5 text-lg font-semibold text-ink group-hover:text-ibm-blue transition-colors">
                      <Link href={detailUrl} className="focus:outline-none">
                        {track.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                      {track.tagline}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-5 pt-1">
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ibm-blue hover:text-ibm-blue/80 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ibm-blue"
                    >
                      <span>{track.linkText}</span>
                      {track.linkIcon === "upRight" ? (
                        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      ) : (
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
