"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BadgeCheck, ArrowUpRight } from "lucide-react";
import { LeaderSocial } from "./leaders";
import { isPlaceholder, type Leader } from "@/data/company";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * LeaderDialog — full-profile dialog for one leader.
 * Opened from the footer "Leadership" column (and reusable elsewhere).
 * Placeholder-aware: [BRACKETED] names render with the sample-content hint.
 * -------------------------------------------------------------------------- */

export function LeaderDialog({
  leader,
  onClose,
}: {
  leader: Leader | null;
  onClose: () => void;
}) {
  const nameIsPlaceholder = isPlaceholder(leader?.name);

  return (
    <Dialog open={Boolean(leader)} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        role="dialog"
        aria-label={leader ? `Profile — ${leader.name}` : "Leader profile"}
        className="max-h-[88dvh] w-[calc(100vw-2rem)] max-w-2xl gap-0 overflow-hidden rounded-3xl border-white/60 bg-white p-0 shadow-[0_40px_120px_-30px_rgba(15,98,254,0.55)] focus:outline-none"
      >
        <div className="max-h-[88dvh] overflow-y-auto overscroll-contain">
          {leader && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* ---------- identity band ---------- */}
              <div className="relative overflow-hidden bg-[#f6f9ff] px-6 pb-6 pt-7 sm:px-8">
                {/* faint grid + gradient wash, same language as the leader cards */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,98,254,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.05) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(15,98,254,0.35), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-5">
                  {/* medallion — mirrors the card placeholder tile */}
                  <div className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-ibm-blue/25 bg-white/85 shadow-[0_16px_40px_-18px_rgba(15,98,254,0.5)] sm:size-24">
                    {leader.photo ? (
                      <img
                        src={leader.photo}
                        alt={`Portrait of ${leader.name}`}
                        className="absolute inset-0 h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span
                        className="text-3xl font-light tracking-tight text-gradient sm:text-4xl"
                        aria-hidden="true"
                      >
                        {leader.monogram}
                      </span>
                    )}
                    <span
                      className="absolute inset-0 rounded-full border border-dashed border-ibm-blue/30 [animation:spin_26s_linear_infinite]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <DialogTitle asChild>
                      <h3 className="truncate text-balance text-2xl font-light tracking-tight text-ink sm:text-[1.75rem]">
                        {leader.name}
                      </h3>
                    </DialogTitle>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ibm-bright">
                      <BadgeCheck className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      {leader.role}
                    </p>
                    {nameIsPlaceholder && (
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40">
                        Placeholder profile — edit in src/data/company.ts
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------- body ---------- */}
              <div className="px-6 pb-7 pt-6 sm:px-8">
                <p className="text-pretty text-[15px] leading-relaxed text-ink/70">
                  {leader.bio}
                </p>

                {/* highlights */}
                <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/[0.07] bg-ink/[0.06]">
                  {leader.highlights.map((h) => (
                    <div key={h.label} className="bg-[#f8faff] px-3 py-3.5 text-center">
                      <dd className="text-[13px] font-semibold leading-tight text-ink">{h.value}</dd>
                      <dt className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/45">
                        {h.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                {/* expertise */}
                <div className="mt-6">
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

                {/* socials + jump link */}
                <div className="mt-7 flex flex-col gap-5 border-t border-ink/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45">
                      Connect
                    </p>
                    <div className="mt-2.5">
                      <LeaderSocial leader={leader} />
                    </div>
                  </div>
                  <a
                    href="#leadership"
                    onClick={onClose}
                    className={cn(
                      "focus-carbon group inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-ibm-blue/30 px-5",
                      "font-mono text-[11px] uppercase tracking-[0.14em] text-ibm-bright transition-colors hover:bg-ibm-blue hover:text-white"
                    )}
                  >
                    Full card in Leadership
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
