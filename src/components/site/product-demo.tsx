"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Flame,
  QrCode,
  ScanLine,
  ShieldAlert,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ProductDemoKind } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * ProductDemo — six looping "product tour" animations, one per product.
 * Pure DOM/SVG/framer-motion loops (transform/opacity/width only),
 * reduced-motion aware (static end state) and fully deterministic so
 * hydration stays clean.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Shared window chrome                                                */
/* ------------------------------------------------------------------ */

export function DemoWindow({
  label,
  product,
  children,
  status,
}: {
  label: string;
  product: string;
  children: React.ReactNode;
  status: string;
}) {
  return (
    <div className="overflow-hidden border border-hairline-strong bg-white shadow-[0_28px_56px_-32px_rgba(6,15,40,0.25)]">
      <div className="h-0.5 bg-gradient-to-r from-ibm-blue to-ibm-cyan" aria-hidden="true" />
      <div className="flex items-center gap-3 border-b border-hairline bg-ibm-blue/[0.03] px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ibm-bright">
          <span className="size-1.5 rounded-full bg-ibm-error animate-pulse-dot" aria-hidden="true" />
          Live
        </span>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {product} — product tour
        </span>
        <span className="ml-auto hidden truncate font-mono text-[10px] text-muted-foreground/70 sm:block">
          abwcurious.app/{product.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>
      <p className="border-b border-hairline px-4 py-2 text-xs text-muted-foreground">{label}</p>
      <div className="p-4 sm:p-5">{children}</div>
      <p className="border-t border-hairline bg-ibm-blue/[0.02] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {status}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — CyberIntelligence360: threat radar + AI incident feed           */
/* ------------------------------------------------------------------ */

const RADAR_BLIPS = [
  { x: 62, y: 34, r: 3, sev: "critical", delay: 0 },
  { x: 108, y: 82, r: 2.5, sev: "high", delay: 0.9 },
  { x: 48, y: 118, r: 2.5, sev: "low", delay: 1.6 },
  { x: 132, y: 140, r: 3, sev: "high", delay: 2.2 },
  { x: 92, y: 58, r: 2, sev: "low", delay: 2.8 },
] as const;

const INCIDENT_FEED = [
  { sev: "CRITICAL", tone: "text-ibm-error border-ibm-error/40 bg-ibm-error/[0.06]", msg: "Credential stuffing wave on api-eu-2", src: "Edge WAF" },
  { sev: "HIGH", tone: "text-ibm-warning border-ibm-warning/40 bg-ibm-warning/[0.06]", msg: "Anomalous S3 egress from analytics-vpc", src: "Cloud trail" },
  { sev: "HIGH", tone: "text-ibm-warning border-ibm-warning/40 bg-ibm-warning/[0.06]", msg: "Privilege escalation attempt — svc-k8s", src: "Identity" },
  { sev: "LOW", tone: "text-ibm-blue border-ibm-blue/40 bg-ibm-blue/[0.05]", msg: "New device fingerprint on VPN pool", src: "Zero trust" },
] as const;

function RadarDemo({ reduced }: { reduced: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setCount((c) => c + 1), 2100);
    return () => window.clearInterval(t);
  }, [reduced]);

  const visible = useMemo(() => {
    const end = Math.min(4, 1 + (count % 5));
    return INCIDENT_FEED.slice(0, end);
  }, [count]);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
      {/* radar */}
      <div className="relative flex items-center justify-center border border-hairline bg-ibm-blue/[0.02] p-3">
        <svg viewBox="0 0 180 180" className="h-auto w-full max-w-[300px]" role="img" aria-label="Threat radar with rotating sweep and detected blips">
          <defs>
            <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f62fe" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0f62fe" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[28, 52, 76].map((r) => (
            <circle key={r} cx="90" cy="90" r={r} fill="none" stroke="#0f62fe" strokeOpacity="0.22" strokeWidth="0.8" />
          ))}
          <line x1="90" y1="12" x2="90" y2="168" stroke="#0f62fe" strokeOpacity="0.14" strokeWidth="0.7" />
          <line x1="12" y1="90" x2="168" y2="90" stroke="#0f62fe" strokeOpacity="0.14" strokeWidth="0.7" />
          <motion.path
            d="M90 90 L90 14 A76 76 0 0 1 150 36 Z"
            fill="url(#sweepGrad)"
            style={{ originX: "90px", originY: "90px" }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 5.2, ease: "linear", repeat: Infinity }}
          />
          {RADAR_BLIPS.map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={b.sev === "critical" ? "#da1e28" : b.sev === "high" ? "#ff832b" : "#0f62fe"} />
              {!reduced && (
                <motion.circle
                  cx={b.x}
                  cy={b.y}
                  r={b.r}
                  fill="none"
                  stroke={b.sev === "critical" ? "#da1e28" : b.sev === "high" ? "#ff832b" : "#0f62fe"}
                  strokeWidth="1"
                  animate={{ r: [b.r, b.r + 9], opacity: [0.7, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
                />
              )}
            </g>
          ))}
        </svg>
        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Global threat map
        </span>
      </div>

      {/* AI incident feed */}
      <div className="flex flex-col border border-hairline">
        <p className="border-b border-hairline bg-ibm-blue/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
          AI incident feed
        </p>
        <ul className="flex flex-1 flex-col gap-2 p-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((inc) => (
              <motion.li
                key={inc.msg}
                layout
                initial={reduced ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="border border-hairline bg-white px-3 py-2"
              >
                <span className={cn("inline-block border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em]", inc.tone)}>
                  {inc.sev}
                </span>
                <p className="mt-1 text-xs leading-snug text-foreground/90">{inc.msg}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{inc.src}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — TheCodeArena: live typing race                                  */
/* ------------------------------------------------------------------ */

const ARENA_CODE = [
  {
    name: "cypher_9",
    rank: "Rank #12",
    lines: ["fn solve(nums: Vec<i32>)", "  let win = nums.windows(3);", "  win.map(|w| w.iter().sum())", "    .max().unwrap_or(0)"],
  },
  {
    name: "delta_wave",
    rank: "Rank #27",
    lines: ["def solve(nums):", "  return max(", "    sum(nums[i:i+3])", "    for i in range(len(nums)-2))"],
  },
] as const;

function ArenaDemo({ reduced }: { reduced: boolean }) {
  const total = 72;
  const [chars, setChars] = useState(0);
  const done = chars >= total;

  useEffect(() => {
    if (reduced) return;
    if (done) {
      const hold = window.setTimeout(() => setChars(0), 2600);
      return () => window.clearTimeout(hold);
    }
    const t = window.setInterval(() => setChars((c) => Math.min(total, c + 1)), 42);
    return () => window.clearInterval(t);
  }, [done, reduced]);

  return (
    <div>
      <div className="relative grid gap-3 sm:grid-cols-2">
        {/* VS badge */}
        <motion.span
          initial={false}
          animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 border border-hairline-strong bg-white px-2.5 py-1 font-mono text-xs font-semibold text-ibm-bright sm:block"
          aria-hidden="true"
        >
          VS
        </motion.span>
        {ARENA_CODE.map((p) => {
          const text = p.lines.join("\n");
          const shown = reduced ? text : text.slice(0, Math.round((chars / total) * text.length));
          const pct = Math.min(100, Math.round(((chars / total) * text.length * 100) / text.length));
          return (
            <div key={p.name} className="border border-hairline">
              <div className="flex items-center justify-between border-b border-hairline bg-ibm-blue/[0.03] px-3 py-1.5">
                <span className="font-mono text-[11px] text-foreground">{p.name}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{p.rank}</span>
              </div>
              <pre className="min-h-[104px] overflow-hidden px-3 py-2.5 font-mono text-[11px] leading-relaxed text-foreground/85">
                {shown}
                {!done && !reduced && <span className="ml-0.5 inline-block h-3 w-[7px] animate-pulse bg-ibm-bright align-middle" aria-hidden="true" />}
              </pre>
              <div className="h-1 border-t border-hairline bg-hairline" aria-hidden="true">
                <div className="h-full bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-[width] duration-100" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-3 flex items-center gap-2.5 border border-ibm-success/40 bg-ibm-success/[0.07] px-4 py-2.5"
            aria-live="polite"
          >
            <Trophy className="size-4 shrink-0 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
            <p className="font-mono text-xs text-foreground">
              cypher_9 wins · all tests green · <span className="text-ibm-success">12% faster</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Restaurant360: live order kanban                                */
/* ------------------------------------------------------------------ */

const ORDER_POOL = [
  { id: "R-241", table: "T4", items: 3, note: "2× spicy" },
  { id: "R-242", table: "T11", items: 5, note: "no nuts" },
  { id: "R-243", table: "QR-2", items: 2, note: "takeaway" },
  { id: "R-244", table: "T7", items: 4, note: "birthday" },
  { id: "R-245", table: "QR-5", items: 1, note: "extra raita" },
  { id: "R-246", table: "T2", items: 6, note: "family bowl" },
] as const;

type Column = "New" | "Cooking" | "Served";

function OrdersDemo({ reduced }: { reduced: boolean }) {
  /* Deterministic cycle: every 2.4s each order advances one column. */
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setTick((v) => v + 1), 2400);
    return () => window.clearInterval(t);
  }, [reduced]);

  const columns = useMemo(() => {
    const cols: Record<Column, { id: string; table: string; items: number; note: string }[]> = {
      New: [],
      Cooking: [],
      Served: [],
    };
    const orders = ORDER_POOL.map((o, i) => ({ ...o, phase: (tick + i * 5) % 9 }));
    orders.forEach((o) => {
      const card = { id: o.id, table: o.table, items: o.items, note: o.note };
      if (o.phase <= 2) cols.New.push(card);
      else if (o.phase <= 5) cols.Cooking.push(card);
      else cols.Served.push(card);
    });
    cols.Served = cols.Served.slice(-3);
    return cols;
  }, [tick]);

  const meta = [
    { col: "New" as Column, tone: "text-ibm-blue", bar: "bg-ibm-blue" },
    { col: "Cooking" as Column, tone: "text-ibm-warning", bar: "bg-ibm-warning" },
    { col: "Served" as Column, tone: "text-ibm-success", bar: "bg-ibm-success" },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {meta.map(({ col, tone, bar }) => (
          <div key={col} className="border border-hairline">
            <p className={cn("flex items-center justify-between border-b border-hairline bg-ibm-blue/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]", tone)}>
              {col}
              <span className="text-muted-foreground">{columns[col].length}</span>
            </p>
            <ul className="flex min-h-[150px] flex-col gap-2 p-2.5">
              <AnimatePresence mode="popLayout" initial={false}>
                {columns[col].map((o) => (
                  <motion.li
                    key={o.id}
                    layout
                    initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="border border-hairline bg-white px-2.5 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-foreground">{o.id}</span>
                      <span className="border border-hairline px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{o.table}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {o.items} items · {o.note}
                    </p>
                    {col === "Cooking" && !reduced && (
                      <div className="mt-1.5 h-0.5 overflow-hidden bg-hairline" aria-hidden="true">
                        <motion.div
                          className={cn("h-full", bar)}
                          animate={{ width: ["8%", "96%"] }}
                          transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" aria-hidden="true" />
        orders today {String(148 + tick).padStart(3, "0")} · avg ticket 14:32 · kitchen load {60 + (tick % 3) * 8}%
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — StudySpark: adaptive quiz loop                                  */
/* ------------------------------------------------------------------ */

const QUIZ = [
  { q: "Solve: 2x² − 8 = 0", options: ["x = ±2", "x = ±4", "x = 2 only", "x = ±√8"], correct: 0, skill: "Algebra · quadratics" },
  { q: "Derivative of sin(2x)?", options: ["2cos(2x)", "cos(2x)", "2sin(x)", "−2cos(2x)"], correct: 0, skill: "Calculus · chain rule" },
  { q: "SI unit of magnetic flux?", options: ["Tesla", "Weber", "Henry", "Gauss"], correct: 1, skill: "Physics · magnetism" },
] as const;

function QuizDemo({ reduced }: { reduced: boolean }) {
  /* Phase machine, tick-driven: pick option → mark correct → flip → next. */
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setStep((s) => s + 1), 1400);
    return () => window.clearInterval(t);
  }, [reduced]);

  const cycle = Math.floor(step / 4);
  const phase = reduced ? 2 : step % 4; // 0 pick, 1 correct, 2/3 flip
  const q = QUIZ[cycle % QUIZ.length];
  const picked = phase >= 0 ? q.correct : -1;
  const solved = phase >= 1;
  const difficulty = reduced ? 71 : Math.min(86, 42 + cycle * 14);
  const dots = reduced ? 6 : Math.min(6, 2 + cycle * 2);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
      {/* question card */}
      <div className="[perspective:900px]">
        <motion.div
          key={cycle}
          initial={reduced ? false : { rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="border border-hairline-strong bg-white p-4 [transform-style:preserve-3d]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {q.skill} · adaptive pick
          </p>
          <p className="mt-2 text-base font-medium text-foreground sm:text-lg">{q.q}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const isPicked = solved && i === picked;
              const isDim = solved && i !== picked;
              return (
                <motion.li
                  key={opt}
                  animate={
                    reduced
                      ? undefined
                      : isPicked
                        ? { scale: [1, 1.03, 1], borderColor: "rgba(36,161,72,0.6)" }
                        : isDim
                          ? { opacity: 0.45 }
                          : { opacity: 1 }
                  }
                  transition={{ duration: 0.4, delay: isPicked ? 0.15 : 0 }}
                  className={cn(
                    "flex items-center gap-2 border px-3 py-2 text-sm",
                    isPicked ? "border-ibm-success/60 bg-ibm-success/[0.07] text-foreground" : "border-hairline text-foreground/85"
                  )}
                >
                  {isPicked ? (
                    <Check className="size-4 shrink-0 text-ibm-success" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <span className="font-mono text-[10px] text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                  )}
                  {opt}
                </motion.li>
              );
            })}
          </ul>
          <AnimatePresence>
            {solved && (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                className="mt-3 flex items-center gap-2 border border-hairline bg-ibm-blue/[0.03] px-3 py-2 text-xs text-muted-foreground"
              >
                <Sparkles className="size-3.5 shrink-0 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                Path rebuilt: spacing +12% on {q.skill.split("·")[0].trim()}, micro-review queued
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* adaptive rail */}
      <div className="flex flex-col gap-3">
        <div className="border border-hairline p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Difficulty</p>
          <p className="mt-1 font-mono text-2xl text-ibm-bright">{difficulty}%</p>
          <div className="mt-2 h-1 bg-hairline" aria-hidden="true">
            <motion.div className="h-full bg-gradient-to-r from-ibm-blue to-ibm-cyan" animate={{ width: `${difficulty}%` }} transition={{ duration: 0.8, ease: EASE }} />
          </div>
        </div>
        <div className="border border-hairline p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Session path</p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={cn("h-1.5 flex-1", i < dots ? "bg-ibm-blue" : "bg-hairline")} />
            ))}
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Flame className="size-3.5 text-ibm-warning" strokeWidth={1.5} aria-hidden="true" />
            streak ×{Math.max(3, 3 + cycle)} today
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — KapiKitab: the living bookshelf                                 */
/* ------------------------------------------------------------------ */

const SHELF_BOOKS = [
  { w: 26, h: 64, tone: "bg-ibm-blue" },
  { w: 20, h: 58, tone: "bg-ibm-cyan" },
  { w: 30, h: 68, tone: "bg-ink/80" },
  { w: 22, h: 56, tone: "bg-ibm-soft" },
  { w: 28, h: 62, tone: "bg-ibm-blue/70" },
  { w: 18, h: 52, tone: "bg-ibm-success/70" },
  { w: 24, h: 60, tone: "bg-ink/60" },
] as const;

const SHELF_TAGS = ["#systems-design", "#behavioral-econ", "#ml-papers", "#product", "#history-of-ideas"] as const;

function ShelfDemo({ reduced }: { reduced: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % 14), 850);
    return () => window.clearInterval(t);
  }, [reduced]);

  const placed = reduced ? SHELF_BOOKS.length : Math.min(SHELF_BOOKS.length, step + 3);
  const opened = reduced || step >= 8;
  const summaryLines = reduced ? 3 : Math.max(0, step - 7);
  const tag = SHELF_TAGS[(reduced ? 0 : step) % SHELF_TAGS.length];
  const progress = reduced ? 68 : Math.min(92, 24 + step * 6);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
      {/* shelf */}
      <div className="border border-hairline bg-ibm-blue/[0.02] p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Your shelf · 42 titles</p>
        <div className="mt-3 flex h-[86px] items-end gap-1.5 border-b-2 border-ink/70 pb-0" aria-hidden="true">
          {SHELF_BOOKS.map((b, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { y: 42, opacity: 0 }}
              animate={i < placed ? { y: 0, opacity: 1 } : { y: 42, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: i < placed ? i * 0.08 : 0 }}
              className={cn("origin-bottom", b.tone)}
              style={{ width: b.w, height: b.h }}
            />
          ))}
          {opened && (
            <motion.div
              initial={reduced ? false : { rotateY: -70, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="ml-2 flex h-[72px] w-[92px] origin-left flex-col overflow-hidden border border-hairline-strong bg-white px-2 py-1.5"
              style={{ transformPerspective: 600 }}
            >
              <BookOpen className="size-3 text-ibm-bright" strokeWidth={1.75} aria-hidden="true" />
              <span className="mt-1 block h-1 w-full bg-hairline" />
              <span className="mt-1 block h-1 w-4/5 bg-hairline" />
              <span className="mt-1 block h-1 w-3/5 bg-hairline" />
              <span className="mt-auto font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">open</span>
            </motion.div>
          )}
        </div>

        {/* AI summary card */}
        <div className="mt-4 border border-hairline bg-white p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">AI key ideas</p>
          <ul className="mt-2 space-y-1.5" aria-live="polite">
            {["Constraint loops beat willpower for habit design", "Rate of change matters more than averages"].map((line, i) => (
              <motion.li
                key={line}
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: i < summaryLines ? 1 : 0.25, x: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-start gap-2 text-xs text-foreground/85"
              >
                <span className="mt-1.5 size-1 shrink-0 bg-ibm-bright" aria-hidden="true" />
                {line}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* discovery rail */}
      <div className="flex flex-col gap-3">
        <div className="border border-hairline p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Taste graph</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={tag}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-2 border border-hairline bg-ibm-blue/[0.04] px-2 py-1 font-mono text-[11px] text-ibm-bright"
            >
              {tag}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-xs text-muted-foreground">Because you finished 3 systems titles this month.</p>
        </div>
        <div className="border border-hairline p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Now reading</p>
          <p className="mt-1 font-mono text-2xl text-ibm-bright">{progress}%</p>
          <div className="mt-2 h-1 bg-hairline" aria-hidden="true">
            <motion.div className="h-full bg-gradient-to-r from-ibm-blue to-ibm-cyan" animate={{ width: `${progress}%` }} transition={{ duration: 0.7, ease: EASE }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6 — IntelliQR: assembling matrix + scan analytics                   */
/* ------------------------------------------------------------------ */

/* deterministic 9x9 pseudo-QR matrix */
const QR_MATRIX: boolean[] = (() => {
  const size = 9;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    const finder =
      (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5)
        ? !((x === 1 && y === 1) || (x === 7 && y === 1) || (x === 1 && y === 7))
        : (x * 7 + y * 13 + ((x * y) % 5)) % 3 !== 0;
    cells.push(finder);
  }
  return cells;
})();

const QR_CITIES = [
  { city: "Pune", pct: 42 },
  { city: "Mumbai", pct: 27 },
  { city: "Bengaluru", pct: 18 },
  { city: "Other", pct: 13 },
] as const;

function QrDemo({ reduced }: { reduced: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setTick((v) => v + 1), 900);
    return () => window.clearInterval(t);
  }, [reduced]);

  const scans = 18432 + (reduced ? 612 : tick * 37);
  const channels = [
    { label: "Poster", pct: 44 },
    { label: "Menu", pct: 33 },
    { label: "Packaging", pct: 23 },
  ];
  const activeChannel = reduced ? 0 : tick % 3;

  return (
    <div className="grid gap-4 sm:grid-cols-[190px_minmax(0,1fr)]">
      {/* QR matrix */}
      <div className="relative flex items-center justify-center border border-hairline bg-ibm-blue/[0.02] p-4">
        <div className="relative">
          <div className="grid aspect-square w-[150px] grid-cols-9 gap-[2px]" role="img" aria-label="QR code assembling from modules with a scanning beam">
            {QR_MATRIX.map((on, i) => (
              <motion.span
                key={i}
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: on ? 1 : 0.2, opacity: on ? 1 : 0.15 }}
                transition={{ duration: 0.35, delay: reduced ? 0 : ((i % 9) + Math.floor(i / 9)) * 0.045, ease: EASE }}
                className={cn("aspect-square", on ? "bg-ink" : "bg-hairline")}
              />
            ))}
          </div>
          {!reduced && (
            <motion.span
              className="pointer-events-none absolute inset-x-[-6px] h-0.5 bg-ibm-bright shadow-[0_0_12px_2px_rgba(15,98,254,0.55)]"
              animate={{ top: ["-2px", "calc(100% + 2px)"] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
              aria-hidden="true"
            />
          )}
        </div>
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
          <QrCode className="size-3" strokeWidth={1.5} aria-hidden="true" />
          dynamic
        </span>
      </div>

      {/* analytics */}
      <div className="flex flex-col gap-3">
        <div className="flex items-stretch gap-3">
          <div className="flex-1 border border-hairline p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Scans today</p>
            <p className="mt-1 font-mono text-3xl tabular-nums text-ibm-bright">{scans.toLocaleString("en-IN")}</p>
          </div>
          <div className="hidden w-[150px] flex-col justify-center gap-1.5 border border-hairline p-3 sm:flex">
            {channels.map((c, i) => (
              <div key={c.label} className="flex items-center gap-2">
                <ScanLine className={cn("size-3.5 shrink-0", i === activeChannel ? "text-ibm-bright" : "text-muted-foreground/50")} strokeWidth={1.5} aria-hidden="true" />
                <span className={cn("font-mono text-[10px] uppercase tracking-[0.12em]", i === activeChannel ? "text-foreground" : "text-muted-foreground/60")}>
                  {c.label} {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 border border-hairline p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Live geo</p>
          <ul className="mt-2 space-y-2">
            {QR_CITIES.map((c, i) => (
              <li key={c.city} className="flex items-center gap-3">
                <span className="w-20 shrink-0 font-mono text-[11px] text-foreground/85">{c.city}</span>
                <span className="h-1.5 flex-1 bg-hairline" aria-hidden="true">
                  <motion.span
                    className="block h-full bg-gradient-to-r from-ibm-blue to-ibm-cyan"
                    animate={{ width: reduced ? `${c.pct}%` : [`0%`, `${c.pct + (i === tick % 4 ? 3 : 0)}%`] }}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                </span>
                <span className="w-9 shrink-0 text-right font-mono text-[10px] text-muted-foreground">{c.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dispatcher                                                          */
/* ------------------------------------------------------------------ */

const DEMO_META: Record<ProductDemoKind, { label: string; product: string; status: string }> = {
  radar: {
    label: "Live threat operations — radar sweep, blips and the AI-ranked incident feed",
    product: "CyberIntelligence360",
    status: "AI correlation active · alert noise filtered 99.4% · playbooks armed",
  },
  arena: {
    label: "Arena mode — two developers, one problem, live typing race",
    product: "TheCodeArena",
    status: "Room sync 480ms · tests run on every keystroke · ELO updated live",
  },
  orders: {
    label: "Service floor — live orders flowing from New to Cooking to Served",
    product: "Restaurant360",
    status: "POS + KDS synced in real time · food-cost engine watching every plate",
  },
  quiz: {
    label: "Adaptive session — the path rebuilds after every answer",
    product: "StudySpark",
    status: "Spaced repetition scheduler live · AI tutor watching every attempt",
  },
  shelf: {
    label: "The shelf — your library, annotated and alive",
    product: "KapiKitab",
    status: "Embeddings refreshed nightly · taste graph updating with every finish",
  },
  qr: {
    label: "Scan intelligence — the matrix, the sweep and the live counters",
    product: "IntelliQR",
    status: "Edge redirect 180ms · destination editable after print · uptime 99.99%",
  },
};

export function ProductDemo({ kind }: { kind: ProductDemoKind }) {
  const reduced = useReducedMotion();
  const meta = DEMO_META[kind];

  return (
    <DemoWindow label={meta.label} product={meta.product} status={meta.status}>
      {kind === "radar" && <RadarDemo reduced={!!reduced} />}
      {kind === "arena" && <ArenaDemo reduced={!!reduced} />}
      {kind === "orders" && <OrdersDemo reduced={!!reduced} />}
      {kind === "quiz" && <QuizDemo reduced={!!reduced} />}
      {kind === "shelf" && <ShelfDemo reduced={!!reduced} />}
      {kind === "qr" && <QrDemo reduced={!!reduced} />}
    </DemoWindow>
  );
}

/* re-usable severity icon (keeps lucide imports honest) */
export const DemoIcons = { ShieldAlert, AlertTriangle };
