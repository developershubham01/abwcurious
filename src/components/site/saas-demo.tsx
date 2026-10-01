"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleDot,
  Cloud,
  Gauge,
  Globe,
  Layers,
  Lock,
  MessageSquareText,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoKind } from "@/lib/catalog";

/**
 * SaaS "product video" mocks — looping, self-playing product demos rendered
 * entirely with DOM + CSS/framer-motion (no video files). One demo per
 * service category, all in the Carbon white/blue language.
 */

/* ================= shared window chrome ================= */

function DemoWindow({
  url,
  status,
  label,
  children,
  dark = false,
}: {
  url: string;
  status: string;
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Animated product demo: ${label}`}
      className="relative border border-hairline-strong bg-white select-none"
    >
      <div className="h-0.5 bg-primary" aria-hidden="true" />
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 border border-hairline-strong" />
          <span className="size-2 border border-hairline-strong" />
          <span className="size-2 bg-ibm-blue" />
        </span>
        <span className="truncate text-xs text-ink-muted">{url}</span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-xs text-ink-muted">
          <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" aria-hidden="true" />
          Live
        </span>
      </div>
      <div className={cn("relative aspect-[16/10] overflow-hidden", dark ? "bg-canvas-inverse" : "bg-white")}>
        {children}
      </div>
      <div className="flex items-center justify-between border-t border-hairline px-4 py-2">
        <span className="truncate text-xs text-ink-muted">
          {status}
        </span>
        <span className="hidden shrink-0 items-center gap-1.5 text-xs text-ink-muted sm:inline-flex">
          <Sparkles className="size-3 text-primary" strokeWidth={1.5} aria-hidden="true" />
          ABWcurious product tour
        </span>
      </div>
    </div>
  );
}

/** tiny skeleton block */
function Block({ className }: { className?: string }) {
  return <div className={cn("bg-ibm-layer border border-hairline", className)} aria-hidden="true" />;
}

/* ================= 01 · WEB — code to production ================= */

function WebDemo({ reduced }: { reduced: boolean }) {
  const codeLines = ["w-[46%]", "w-[72%]", "w-[58%]", "w-[84%]", "w-[38%]", "w-[66%]"];
  return (
    <div className="grid h-full grid-cols-2">
      {/* code editor */}
      <div className="flex flex-col gap-2.5 border-r border-hairline bg-canvas-inverse p-4">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Terminal className="size-3 text-ibm-cyan" strokeWidth={1.5} aria-hidden="true" />
          page.tsx
        </div>
        {codeLines.map((w, i) => (
          <motion.div
            key={i}
            className={cn("h-2.5 rounded-none", w)}
            style={{ background: i % 3 === 0 ? "#1192e8" : i % 3 === 1 ? "rgba(255,255,255,0.28)" : "#0f62fe" }}
            animate={reduced ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.28, ease: "easeInOut" }}
            aria-hidden="true"
          />
        ))}
        <motion.span
          className="mt-1 inline-block h-4 w-2 bg-ibm-cyan"
          animate={reduced ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          aria-hidden="true"
        />
      </div>
      {/* preview assembling */}
      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-muted">Preview</span>
          <span className="inline-flex items-center gap-1 text-xs text-ibm-success">
            <Check className="size-3" strokeWidth={2} aria-hidden="true" /> Build passing
          </span>
        </div>
        <Block className="h-3 w-1/3" />
        <motion.div
          className="flex flex-col gap-2"
          initial={false}
          animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Block className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-2">
            <Block className="h-8" />
            <Block className="h-8" />
          </div>
          <div className="h-6 w-24 bg-ibm-blue" aria-hidden="true" />
        </motion.div>
        <div className="mt-auto flex items-center gap-2 text-xs text-ink-muted">
          <Gauge className="size-3.5 text-primary" strokeWidth={1.5} aria-hidden="true" />
          Lighthouse 98 · CWV green
        </div>
      </div>
    </div>
  );
}

/* ================= 02 · MOBILE — app screens + push ================= */

const MOBILE_SCREENS = [
  { title: "Home feed", rows: 4 },
  { title: "Order tracking", rows: 3 },
  { title: "Payment success", rows: 2 },
] as const;

function MobileDemo({ reduced }: { reduced: boolean }) {
  const [screen, setScreen] = useState(0);
  const [push, setPush] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setScreen((s) => (s + 1) % MOBILE_SCREENS.length), 2600);
    const p = setInterval(() => {
      setPush(true);
      setTimeout(() => setPush(false), 1400);
    }, 5200);
    return () => {
      clearInterval(t);
      clearInterval(p);
    };
  }, [reduced]);

  const s = MOBILE_SCREENS[screen];

  return (
    <div className="flex h-full items-center justify-center gap-6 px-6">
      {/* floating platform chips */}
      <div className="hidden flex-col gap-3 sm:flex">
        {["Android", "iOS", "Flutter"].map((p, i) => (
          <motion.span
            key={p}
            className="inline-flex items-center gap-2 border border-hairline-strong bg-white px-3 py-1.5 text-xs text-ink"
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <Smartphone className="size-3 text-primary" strokeWidth={1.5} />
            {p}
          </motion.span>
        ))}
      </div>

      {/* phone */}
      <div className="relative h-[86%] w-[132px] shrink-0 border-2 border-ink bg-white sm:w-[148px]" aria-hidden="true">
        <div className="mx-auto mt-1.5 h-1 w-10 bg-ink/70" />
        <div className="absolute inset-x-0 top-6 bottom-0 overflow-hidden px-2.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={reduced ? false : { x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduced ? undefined : { x: -60, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 pt-1"
            >
              <Block className="h-8 w-full" />
              <Block className="h-2.5 w-2/3" />
              {Array.from({ length: s.rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 border border-hairline p-1.5">
                  <span className="size-4 bg-ibm-blue/25" />
                  <Block className="h-2 flex-1" />
                </div>
              ))}
              {s.title === "Payment success" && (
                <span className="mx-auto mt-1 flex size-8 items-center justify-center border border-ibm-success text-ibm-success">
                  <Check className="size-4" strokeWidth={2} />
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* push notification */}
        <AnimatePresence>
          {push && (
            <motion.div
              initial={reduced ? false : { y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-x-2 top-6 z-10 border border-hairline-strong bg-ink px-2 py-1.5"
            >
              <span className="flex items-center gap-1.5 text-[10px] text-white/70">
                <Zap className="size-2.5" strokeWidth={1.5} /> Push
              </span>
              <span className="block text-[9px] leading-tight text-white">Your order is out for delivery</span>
            </motion.div>
          )}
        </AnimatePresence>
        {/* tab bar */}
        <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-hairline bg-white py-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("h-1.5 w-6", i === 0 ? "bg-ibm-blue" : "bg-ibm-blue/25")} />
          ))}
        </div>
      </div>

      {/* right meta */}
      <div className="hidden flex-col gap-3 md:flex">
        <span className="text-xs text-ink-muted">Release</span>
        {["v2.4 staged", "Crash-free 99.8%", "Review: passed"].map((t, i) => (
          <motion.span
            key={t}
            className="inline-flex items-center gap-2 border border-hairline bg-card px-3 py-1.5 text-xs text-ink"
            animate={reduced ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.6 }}
            aria-hidden="true"
          >
            <ShieldCheck className="size-3 text-ibm-success" strokeWidth={1.5} /> {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ================= 03 · AI — chat + automation flow ================= */

function AiDemo({ reduced }: { reduced: boolean }) {
  const [round, setRound] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setRound((r) => r + 1), 6400);
    return () => clearInterval(t);
  }, [reduced]);

  const nodes = [
    { icon: MessageSquareText, label: "Trigger" },
    { icon: Layers, label: "RAG" },
    { icon: Sparkles, label: "AI reply" },
    { icon: Send, label: "CRM" },
  ];

  return (
    <div className="grid h-full grid-cols-5">
      {/* chat */}
      <div className="col-span-3 flex flex-col gap-2.5 border-r border-hairline p-4" aria-hidden="true">
        <span className="text-xs text-ink-muted">
          Support assistant
        </span>
        <div key={round} className="flex flex-col gap-2.5">
          <motion.div
            className="ml-auto max-w-[75%] border border-hairline-strong bg-card px-3 py-2 text-xs"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Where is my order #4821?
          </motion.div>
          {!reduced && (
            <motion.div
              className="flex gap-1 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 0.8, duration: 1.2, times: [0, 0.4, 1] }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 bg-ibm-blue"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </motion.div>
          )}
          <motion.div
            className="max-w-[85%] border border-hairline bg-ibm-layer px-3 py-2 text-xs"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.4 }}
          >
            It&apos;s out for delivery — arriving today 4–6 PM. I&apos;ve sent the live map to your WhatsApp. ✦
          </motion.div>
          <motion.span
            className="inline-flex w-fit items-center gap-1.5 border border-ibm-success/50 px-2 py-1 text-[10px] font-medium text-ibm-success"
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.9, duration: 0.3 }}
          >
            <Check className="size-3" strokeWidth={2} /> Resolved · 0 humans needed
          </motion.span>
        </div>
        <div className="mt-auto flex items-center gap-2 border border-hairline px-3 py-2 text-[10px] text-muted-foreground">
          Ask anything…
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-primary">
            Grounded on 12,400 docs
          </span>
        </div>
      </div>
      {/* workflow */}
      <div className="col-span-2 flex flex-col items-center justify-center gap-2 p-4">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex w-full flex-col items-center gap-2" aria-hidden="true">
            <motion.span
              className={cn(
                "flex w-full items-center gap-2 border px-3 py-2 text-xs",
                i === 2 ? "border-primary bg-ibm-layer text-primary" : "border-hairline text-ink"
              )}
              animate={reduced ? undefined : { borderColor: i === 2 ? ["#a6c8ff", "#0043ce", "#a6c8ff"] : undefined }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <n.icon className="size-3.5" strokeWidth={1.5} /> {n.label}
            </motion.span>
            {i < nodes.length - 1 && (
              <div className="relative h-4 w-px bg-hairline">
                {!reduced && (
                  <motion.span
                    className="absolute left-1/2 size-1.5 -translate-x-1/2 bg-ibm-blue"
                    animate={{ top: ["-2px", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.45 }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        <span className="mt-1 text-xs text-ink-muted">
          Automated 24/7
        </span>
      </div>
    </div>
  );
}

/* ================= 04 · MARKETING — dashboard ================= */

function MarketingDemo({ reduced }: { reduced: boolean }) {
  const bars = [42, 68, 55, 84, 62, 92];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-muted">
          Growth dashboard
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-primary">
          <TrendingUp className="size-3.5" strokeWidth={1.5} aria-hidden="true" /> +184% organic / 6 mo
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { k: "Leads", v: "1,284" },
          { k: "ROAS", v: "3.2×" },
          { k: "CPA", v: "₹86" },
          { k: "CTR", v: "4.9%" },
        ].map((t, i) => (
          <motion.div
            key={t.k}
            className="border border-hairline bg-card px-2.5 py-2"
            animate={reduced ? undefined : { opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4 }}
            aria-hidden="true"
          >
            <span className="block text-[10px] text-ink-muted">{t.k}</span>
            <span className="block text-sm font-medium tabular-nums">{t.v}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-5 gap-3">
        {/* bars */}
        <div className="col-span-3 flex items-end gap-2 border border-hairline p-3" aria-hidden="true">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className={cn("flex-1", i === bars.length - 1 ? "bg-ibm-blue" : "bg-ibm-blue/30")}
              animate={reduced ? { height: `${h}%` } : { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
              transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {/* line chart */}
        <div className="col-span-2 border border-hairline p-3">
          <svg viewBox="0 0 100 60" className="h-full w-full" aria-hidden="true">
            <motion.path
              d="M0 50 L15 44 L30 46 L45 32 L60 26 L75 18 L100 6"
              fill="none"
              stroke="#0f62fe"
              strokeWidth="2"
              strokeDasharray="160"
              animate={reduced ? undefined : { strokeDashoffset: [160, 0, 0, -160] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <path d="M0 55 L100 55" stroke="#e0e0e0" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2" aria-hidden="true">
        {["SEO", "Google Ads", "Meta", "Email"].map((c, i) => (
          <span
            key={c}
            className="inline-flex items-center gap-1.5 border border-hairline px-2.5 py-1 text-xs text-ink-muted"
          >
            <motion.span
              className="size-1.5 rounded-full bg-ibm-success"
              animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
            />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================= 05 · HR — live pipeline board ================= */

const HR_NAMES = ["Aarav · React", "Diya · Python", "Kabir · Sales", "Meera · Figma", "Rohan · DevOps", "Anaya · QA"];
const HR_COLS = ["Sourced", "Screened", "Interview", "Offer"];

function HrDemo({ reduced }: { reduced: boolean }) {
  const [cols, setCols] = useState<number[][]>([[0, 1], [2], [3], []]);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setCols((prev) => {
        const next = prev.map((c) => [...c]);
        // find first column with a card (0..2), move its first card right
        for (let i = 0; i < 3; i++) {
          if (next[i].length > 0) {
            const [card] = next[i].splice(0, 1);
            next[i + 1].push(card);
            // recycle: offer -> back into sourced (wrap)
            if (next[3].length > 1) {
              const done = next[3].shift()!;
              next[0].push(done);
            }
            break;
          }
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between pb-2.5">
        <span className="text-xs text-ink-muted">
          Hiring pipeline — Senior Engineer
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-primary">
          <Users className="size-3.5" strokeWidth={1.5} aria-hidden="true" /> 42 in process
        </span>
      </div>
      <LayoutGroup>
        <div className="grid flex-1 grid-cols-4 gap-2" aria-hidden="true">
          {HR_COLS.map((col, ci) => (
            <div key={col} className="flex flex-col gap-2 border border-hairline bg-ibm-layer p-2">
              <span className="flex items-center justify-between text-[10px] text-ink-muted">
                {col}
                <span className={cn("tabular-nums", cols[ci].length ? "text-primary" : "text-muted-foreground/50")}>
                  {cols[ci].length}
                </span>
              </span>
              <div className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {cols[ci].map((id) => (
                    <motion.div
                      key={id}
                      layout
                      layoutId={`hr-card-${id}`}
                      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? undefined : { opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "flex items-center gap-1.5 border bg-white px-2 py-1.5",
                        ci === 3 ? "border-ibm-success/60" : "border-hairline"
                      )}
                    >
                      <span className="size-4 shrink-0 bg-ibm-blue/25" />
                      <span className="truncate text-[9px] leading-none text-foreground">{HR_NAMES[id % HR_NAMES.length]}</span>
                      {ci === 3 && <Check className="ml-auto size-3 shrink-0 text-ibm-success" strokeWidth={2} />}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
      <div className="flex items-center justify-between pt-2.5 text-xs text-ink-muted">
        <span>Median time-to-offer · 18 days</span>
        <span className="inline-flex items-center gap-1 text-primary">
          Screening <ArrowRight className="size-3" strokeWidth={1.5} /> Interview-ready only
        </span>
      </div>
    </div>
  );
}

/* ================= 06 · CLOUD — deploy terminal ================= */

const CLOUD_STEPS = [
  { text: "$ abw deploy --prod", tone: "cmd" },
  { text: "→ building image… done (42s)", tone: "dim" },
  { text: "✓ 0 vulnerabilities found", tone: "ok" },
  { text: "✓ migrations applied (14)", tone: "ok" },
  { text: "✓ SSL active · HSTS enforced", tone: "ok" },
  { text: "▲ live in 8 regions", tone: "live" },
] as const;

const REGIONS = ["BLR", "BOM", "DEL", "SGP", "FRA", "IAD", "LHR", "SYD"];

function CloudDemo({ reduced }: { reduced: boolean }) {
  const [step, setStep] = useState(reduced ? CLOUD_STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setStep((s) => (s >= CLOUD_STEPS.length ? 0 : s + 1));
    }, 900);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="grid h-full grid-cols-5">
      {/* terminal */}
      <div className="col-span-3 flex flex-col gap-2 border-r border-hairline bg-canvas-inverse p-4" aria-hidden="true">
        <span className="flex items-center gap-2 text-xs text-white/50">
          <Terminal className="size-3 text-ibm-cyan" strokeWidth={1.5} /> deploy.log
        </span>
        {CLOUD_STEPS.slice(0, step).map((l, i) => (
          <motion.span
            key={`${step}-${i}`}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "font-mono text-[11px] leading-relaxed",
              l.tone === "cmd" && "text-white",
              l.tone === "dim" && "text-white/50",
              l.tone === "ok" && "text-[#42be65]",
              l.tone === "live" && "text-ibm-cyan"
            )}
          >
            {l.text}
          </motion.span>
        ))}
        {!reduced && <span className="inline-block h-3.5 w-2 animate-blink bg-ibm-cyan" />}
      </div>
      {/* infra status */}
      <div className="col-span-2 flex flex-col gap-2.5 p-4">
        <span className="text-xs text-ink-muted" aria-hidden="true">
          Regions
        </span>
        <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
          {REGIONS.map((r, i) => {
            const up = i < step + 2;
            return (
              <span
                key={r}
                className={cn(
                  "flex items-center justify-center gap-1 border px-1 py-1.5 text-[10px]",
                  up ? "border-ibm-success/50 text-ibm-success" : "border-hairline text-muted-foreground/50"
                )}
              >
                <CircleDot className="size-2.5" strokeWidth={1.5} /> {r}
              </span>
            );
          })}
        </div>
        <div className="mt-auto flex flex-col gap-2" aria-hidden="true">
          <span className="inline-flex items-center gap-2 border border-ibm-success/50 bg-ibm-success/[0.06] px-2.5 py-1.5 text-xs font-medium text-ibm-success">
            <ShieldCheck className="size-3.5" strokeWidth={1.5} /> Uptime 99.98%
          </span>
          <div className="flex items-center gap-3 border border-hairline px-2.5 py-1.5 text-xs text-ink-muted">
            <Cloud className="size-3.5 text-primary" strokeWidth={1.5} />
            <span className="inline-flex items-center gap-1"><Lock className="size-3" strokeWidth={1.5} /> TLS 1.3</span>
            <span className="inline-flex items-center gap-1"><Globe className="size-3" strokeWidth={1.5} /> CDN on</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= switch ================= */

const DEMO_META: Record<DemoKind, { url: string; status: string; label: string }> = {
  web: { url: "studio.abwcurious.app/web", status: "Ship websites · stores · SaaS", label: "Web build pipeline" },
  mobile: { url: "studio.abwcurious.app/mobile", status: "Android · iOS · Flutter", label: "Mobile app release tour" },
  ai: { url: "studio.abwcurious.app/ai", status: "Chatbots · automation · copilots", label: "AI assistant demo" },
  marketing: { url: "studio.abwcurious.app/growth", status: "SEO · Ads · Social · Email", label: "Marketing dashboard demo" },
  hr: { url: "studio.abwcurious.app/talent", status: "Sourcing · screening · offers", label: "Recruitment pipeline demo" },
  cloud: { url: "studio.abwcurious.app/infra", status: "Deploy · secure · support", label: "Cloud deployment demo" },
};

export function SaasDemo({ demo }: { demo: DemoKind }) {
  const reduced = useReducedMotion();
  const meta = DEMO_META[demo];
  return (
    <div className="flex flex-col gap-6">
      <DemoWindow url={meta.url} status={meta.status} label={meta.label}>
        {demo === "web" && <WebDemo reduced={!!reduced} />}
        {demo === "mobile" && <MobileDemo reduced={!!reduced} />}
        {demo === "ai" && <AiDemo reduced={!!reduced} />}
        {demo === "marketing" && <MarketingDemo reduced={!!reduced} />}
        {demo === "hr" && <HrDemo reduced={!!reduced} />}
        {demo === "cloud" && <CloudDemo reduced={!!reduced} />}
      </DemoWindow>
      <div className="flex items-center justify-center pt-2">
        <a
          href="/contact"
          className="inline-flex h-12 items-center justify-center gap-2.5 border border-[#0f62fe] bg-[#0f62fe] px-8 text-sm font-medium text-white transition-colors hover:bg-[#0043ce] shadow-sm"
        >
          <span>Let&apos;s connect with us</span>
          <ArrowRight className="size-4 shrink-0" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
