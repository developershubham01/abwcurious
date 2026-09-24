"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  Download,
  Inbox,
  LoaderCircle,
  Mail,
  RefreshCw,
  Terminal,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ---------------- types ---------------- */

interface StatsPayload {
  ok: boolean;
  totals: { contacts: number; subscribers: number; activity7d: number; services: number };
  byService: { service: string; count: number }[];
  bySource: { source: string; count: number }[];
  days: { date: string; label: string; contacts: number; subscribers: number }[];
  recentContacts: {
    id: string;
    name: string;
    email: string;
    service: string;
    message: string;
    createdAt: string;
  }[];
  recentSubscribers: { id: string; email: string; source: string; createdAt: string }[];
  generatedAt: string;
}

/* ---------------- helpers ---------------- */

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ---------------- Studio Console (admin view) ---------------- */

export function StudioConsole() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load stats");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  }, []);

  /* Load on open + refresh every 30s while open */
  useEffect(() => {
    if (!open) return;
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [open, load]);

  /* Keyboard shortcut: Ctrl/Cmd + Shift + K */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const maxDay = data ? Math.max(1, ...data.days.map((d) => d.contacts + d.subscribers)) : 1;
  const maxService = data ? Math.max(1, ...data.byService.map((s) => s.count)) : 1;

  function exportCsv(type: "contacts" | "subscribers") {
    /* Direct navigation triggers the Content-Disposition download */
    window.location.href = `/api/export?type=${type}`;
  }

  const tiles = [
    { icon: Inbox, label: "Contact messages", value: data?.totals.contacts },
    { icon: Users, label: "Newsletter subs", value: data?.totals.subscribers },
    { icon: Activity, label: "Activity · 7 days", value: data?.totals.activity7d },
    { icon: Mail, label: "Services engaged", value: data?.totals.services },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="focus-carbon inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-ibm-bright"
          title="Studio console — Ctrl/Cmd + Shift + K"
          aria-label="Open studio console"
        >
          <Terminal className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Studio Console
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto rounded-none border-hairline-strong bg-background p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-hairline bg-card px-6 py-5">
          <div className="flex items-center justify-between gap-4 pr-8">
            <div>
              <DialogTitle className="flex items-center gap-2.5 font-mono text-sm uppercase tracking-[0.22em]">
                <Terminal className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                Studio Console
              </DialogTitle>
              <DialogDescription className="mt-1.5 font-mono text-xs text-muted-foreground">
                Live signals from abwcurious.com — press{" "}
                <kbd className="border border-hairline bg-background px-1 py-0.5 text-[10px]">
                  ⌘/Ctrl + ⇧ + K
                </kbd>{" "}
                anytime
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={load}
              disabled={loading}
              aria-label="Refresh stats"
              className="focus-carbon flex size-9 shrink-0 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="size-4" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          {error && (
            <div className="border border-ibm-error/40 bg-ibm-error/[0.06] px-4 py-3 font-mono text-xs text-ibm-error">
              {error}
            </div>
          )}

          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
            {tiles.map((t) => (
              <div key={t.label} className="bg-card px-4 py-4">
                <t.icon className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                <div className="mt-2.5 font-mono text-2xl text-foreground" aria-live="polite">
                  {loading && data === null ? (
                    <span className="text-muted-foreground/40">—</span>
                  ) : (
                    (t.value ?? 0)
                  )}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground">{t.label}</div>
              </div>
            ))}
          </div>

          {/* 7-day activity */}
          <div className="border border-hairline">
            <div className="border-b border-hairline bg-card px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Last 7 days
            </div>
            <div className="flex h-40 items-end gap-2 px-4 pb-3 pt-4">
              {(data?.days ?? []).map((d) => {
                const total = d.contacts + d.subscribers;
                /* px heights — % heights collapse inside auto-height flex columns */
                const h = Math.max(4, Math.round((total / maxDay) * 72));
                return (
                  <div key={d.date} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground">{total || ""}</span>
                    <div
                      className={cn(
                        "w-full transition-all duration-500",
                        total > 0 ? "bg-gradient-to-t from-ibm-blue to-ibm-cyan" : "bg-hairline"
                      )}
                      style={{ height: `${h}px` }}
                      title={`${d.label}: ${d.contacts} contacts, ${d.subscribers} subs`}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{d.label}</span>
                  </div>
                );
              })}
              {!data && !error && (
                <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                  Loading…
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Demand mix */}
            <div className="border border-hairline">
              <div className="border-b border-hairline bg-card px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Demand mix · by service
              </div>
              <div className="space-y-3 px-4 py-4">
                {(data?.byService ?? []).length === 0 && !loading && (
                  <p className="font-mono text-xs text-muted-foreground">No messages yet.</p>
                )}
                {(data?.byService ?? []).map((s) => (
                  <div key={s.service}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-xs text-foreground">{s.service}</span>
                      <span className="font-mono text-xs text-ibm-bright">{s.count}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-hairline">
                      <div
                        className="h-full bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-all duration-500"
                        style={{ width: `${(s.count / maxService) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                {loading && data === null && (
                  <p className="font-mono text-xs text-muted-foreground">Loading…</p>
                )}
              </div>
            </div>

            {/* Subscribers by source */}
            <div className="border border-hairline">
              <div className="border-b border-hairline bg-card px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Newsletter · by source
              </div>
              <div className="space-y-3 px-4 py-4">
                {(data?.bySource ?? []).length === 0 && !loading && (
                  <p className="font-mono text-xs text-muted-foreground">No subscribers yet.</p>
                )}
                {(data?.bySource ?? []).map((s) => (
                  <div key={s.source}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate font-mono text-xs text-foreground">{s.source}</span>
                      <span className="font-mono text-xs text-ibm-bright">{s.count}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-hairline">
                      <div
                        className="h-full bg-gradient-to-r from-ibm-cyan to-ibm-blue transition-all duration-500"
                        style={{ width: `${(s.count / maxService) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                {loading && data === null && (
                  <p className="font-mono text-xs text-muted-foreground">Loading…</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent messages */}
          <div className="border border-hairline">
            <div className="flex items-center justify-between border-b border-hairline bg-card px-4 py-2.5">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Recent messages
              </span>
              <span className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => exportCsv("contacts")}
                  className="focus-carbon inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-ibm-bright"
                  title="Download all contact messages as CSV"
                >
                  <Download className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Export CSV
                </button>
                <span className="font-mono text-[10px] text-muted-foreground">max-h scroll</span>
              </span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-hairline font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Service</th>
                    <th className="hidden px-4 py-2 font-medium sm:table-cell">Message</th>
                    <th className="px-4 py-2 text-right font-medium">When</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.recentContacts ?? []).map((c) => (
                    <tr key={c.id} className="border-b border-hairline/60 last:border-b-0">
                      <td className="px-4 py-2.5">
                        <div className="font-medium text-foreground">{c.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{c.email}</div>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-ibm-soft">{c.service}</td>
                      <td className="hidden max-w-[220px] truncate px-4 py-2.5 text-muted-foreground sm:table-cell">
                        {c.message}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-[10px] text-muted-foreground">
                        {timeAgo(c.createdAt)}
                      </td>
                    </tr>
                  ))}
                  {data && data.recentContacts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
                        Inbox zero. For now.
                      </td>
                    </tr>
                  )}
                  {!data && !error && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
                        Loading…
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent subscribers */}
          <div className="border border-hairline">
            <div className="flex items-center justify-between border-b border-hairline bg-card px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Recent subscribers
              <button
                type="button"
                onClick={() => exportCsv("subscribers")}
                className="focus-carbon inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-ibm-bright"
                title="Download all newsletter subscribers as CSV"
              >
                <Download className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                Export CSV
              </button>
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {(data?.recentSubscribers ?? []).map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-3 border-b border-hairline/60 px-4 py-2.5 last:border-b-0"
                >
                  <span className="truncate font-mono text-xs text-foreground">{s.email}</span>
                  <span className="flex shrink-0 items-center gap-3 font-mono text-[10px] text-muted-foreground">
                    <span className="border border-hairline px-1.5 py-0.5 uppercase tracking-wider">
                      {s.source}
                    </span>
                    {timeAgo(s.createdAt)}
                  </span>
                </li>
              ))}
              {data && data.recentSubscribers.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
                  No subscribers yet.
                </li>
              )}
              {!data && !error && (
                <li className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">Loading…</li>
              )}
            </ul>
          </div>

          <p className="text-center font-mono text-[10px] text-muted-foreground">
            {data ? `Synced ${timeAgo(data.generatedAt)} · auto-refresh 30s` : "—"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
