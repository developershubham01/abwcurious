"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BadgeCheck } from "lucide-react";
import { LeaderSocial } from "./leaders";
import { RollButton } from "./primitives";
import { isPlaceholder, type Leader } from "@/data/company";

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
        className="max-h-[88dvh] w-[calc(100vw-2rem)] max-w-2xl gap-0 overflow-hidden rounded-none border-hairline bg-white p-0 focus:outline-none"
      >
        <div className="max-h-[88dvh] overflow-y-auto overscroll-contain">
          {leader && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* ---------- identity band ---------- */}
              <div className="relative overflow-hidden bg-ibm-layer px-6 pb-6 pt-7 sm:px-8">
                <div className="relative flex items-center gap-5">
                  {/* medallion — square Carbon avatar tile (mirrors the cards) */}
                  <div className="relative flex size-20 shrink-0 items-center justify-center border border-hairline bg-white sm:size-24">
                    {leader.photo ? (
                      <img
                        src={leader.photo}
                        alt={`Portrait of ${leader.name}`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <span
                        className="text-3xl font-light tracking-tight text-ink sm:text-4xl"
                        aria-hidden="true"
                      >
                        {leader.monogram}
                      </span>
                    )}
                    <span
                      className="pointer-events-none absolute inset-1.5 border border-dashed border-ibm-blue/40"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <DialogTitle asChild>
                      <h3 className="truncate text-balance text-2xl font-light tracking-tight text-ink sm:text-[1.75rem]">
                        {leader.name}
                      </h3>
                    </DialogTitle>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-muted">
                      <BadgeCheck className="size-3.5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                      {leader.role}
                    </p>
                    {nameIsPlaceholder && (
                      <p className="mt-2 text-xs text-ibm-subtle">
                        Placeholder profile — edit in src/data/company.ts
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------- body ---------- */}
              <div className="px-6 pb-7 pt-6 sm:px-8">
                <p className="text-pretty text-[15px] leading-relaxed text-ink-muted">
                  {leader.bio}
                </p>

                {/* highlights */}
                <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-hairline bg-hairline">
                  {leader.highlights.map((h) => (
                    <div key={h.label} className="bg-white px-3 py-3.5 text-center">
                      <dd className="text-[13px] font-semibold leading-tight tabular-nums text-ink">{h.value}</dd>
                      <dt className="mt-1 text-xs text-ibm-subtle">
                        {h.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                {/* expertise */}
                <div className="mt-6">
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

                {/* socials + jump link */}
                <div className="mt-7 flex flex-col gap-5 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-ink-muted">
                      Connect
                    </p>
                    <div className="mt-2.5">
                      <LeaderSocial leader={leader} />
                    </div>
                  </div>
                  <RollButton
                    href="#leadership"
                    onClick={onClose}
                    variant="outline"
                    className="shrink-0"
                    arrow
                  >
                    Full card in Leadership
                  </RollButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
