"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Archive,
  ArchiveRestore,
  Check,
  Copy,
  Download,
  Inbox,
  LoaderCircle,
  Lock,
  LockKeyhole,
  Mail,
  MailOpen,
  RefreshCw,
  Search,
  SearchX,
  Terminal,
  Trash2,
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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ---------------- types ---------------- */

type MessageStatus = "new" | "read" | "archived";

interface StatsPayload {
  ok: boolean;
  totals: { contacts: number; subscribers: number; activity7d: number; services: number; unread: number };
  byService: { service: string; count: number }[];
  bySource: { source: string; count: number }[];
  days: { date: string; label: string; contacts: number; subscribers: number }[];
  generatedAt: string;
}

interface MessageRow {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

interface SubRow {
  id: string;
  email: string;
  source: string;
  createdAt: string;
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

/* Carbon-style eased count-up for stat tiles */
function useCountUp(target: number | undefined, active: boolean) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    if (!active || typeof target !== "number") return;
    const from = fromRef.current;
    const duration = 550;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return display;
}

/* ---------------- Studio Console (admin view) ---------------- */

const TOKEN_STORAGE = "abw-console-token";
const CONFIRM_WINDOW_MS = 3500;

type TabId = "overview" | "inbox" | "subscribers";
type InboxFilter = "all" | MessageStatus;

export function StudioConsole() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("overview");
  const [data, setData] = useState<StatsPayload | null>(null);
  const [messages, setMessages] = useState<MessageRow[] | null>(null);
  const [subs, setSubs] = useState<SubRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>("all");
  const [subQuery, setSubQuery] = useState("");
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const confirmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  /* passcode gate — the unlock exchange returns a signed session token
     (8h TTL) which lives in sessionStorage; the passcode itself is never
     persisted in the browser. */
  const [key, setKey] = useState<string | null>(null);
  const keyRef = useRef<string | null>(null);
  const [needKey, setNeedKey] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [keyError, setKeyError] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const handle401 = useCallback((json: { error?: string } | null) => {
    sessionStorage.removeItem(TOKEN_STORAGE);
    keyRef.current = null;
    setKey(null);
    setNeedKey(true);
    setKeyError(json?.error || "Session expired — unlock again.");
  }, []);

  const load = useCallback(
    async (k?: string | null) => {
      const kk = k !== undefined ? k : keyRef.current;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/stats", {
          cache: "no-store",
          headers: kk ? { "x-console-token": kk } : undefined,
        });
        const json = await res.json();
        if (res.status === 401) {
          handle401(json);
          return;
        }
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load stats");
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        setLoading(false);
      }
    },
    [handle401]
  );

  const loadInbox = useCallback(
    async (k?: string | null) => {
      const kk = k !== undefined ? k : keyRef.current;
      if (!kk) return;
      try {
        const res = await fetch("/api/messages", {
          cache: "no-store",
          headers: { "x-console-token": kk },
        });
        const json = await res.json();
        if (res.status === 401) {
          handle401(json);
          return;
        }
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load inbox");
        setMessages(json.messages as MessageRow[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load inbox");
      }
    },
    [handle401]
  );

  const loadSubs = useCallback(
    async (k?: string | null) => {
      const kk = k !== undefined ? k : keyRef.current;
      if (!kk) return;
      try {
        const res = await fetch("/api/subscribers", {
          cache: "no-store",
          headers: { "x-console-token": kk },
        });
        const json = await res.json();
        if (res.status === 401) {
          handle401(json);
          return;
        }
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load subscribers");
        setSubs(json.subscribers as SubRow[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load subscribers");
      }
    },
    [handle401]
  );

  const loadAll = useCallback(async () => {
    await Promise.all([load(), loadInbox(), loadSubs()]);
  }, [load, loadInbox, loadSubs]);

  /* Load on open (restoring a valid saved session token) + refresh every 30s */
  useEffect(() => {
    if (!open) return;
    const saved = sessionStorage.getItem(TOKEN_STORAGE);
    let restored = false;
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { token?: string; expiresAt?: string };
        const live =
          parsed.token &&
          parsed.expiresAt &&
          new Date(parsed.expiresAt).getTime() > Date.now() + 5000;
        if (live) {
          keyRef.current = parsed.token as string;
          setKey(parsed.token ?? null);
          setNeedKey(false);
          restored = true;
          loadAll();
        }
      } catch {
        /* fall through — treat as no session */
      }
    }
    if (!restored) {
      if (saved) sessionStorage.removeItem(TOKEN_STORAGE);
      setNeedKey(true);
    }
    const t = setInterval(() => {
      if (keyRef.current) loadAll();
    }, 30000);
    return () => clearInterval(t);
  }, [open, loadAll]);

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

  /* External open requests — the ⌘K command palette dispatches this */
  useEffect(() => {
    const openConsole = () => setOpen(true);
    window.addEventListener("abw:console-open", openConsole);
    return () => window.removeEventListener("abw:console-open", openConsole);
  }, []);

  /* Clear any pending remove-confirmation when the dialog closes */
  useEffect(() => {
    if (!open) {
      setConfirmRemoveId(null);
      setSubQuery("");
      setInboxFilter("all");
    }
  }, [open]);

  const maxDay = data ? Math.max(1, ...data.days.map((d) => d.contacts + d.subscribers)) : 1;
  const maxService = data ? Math.max(1, ...data.byService.map((s) => s.count)) : 1;

  function exportCsv(type: "contacts" | "subscribers") {
    /* Direct navigation triggers the Content-Disposition download; the
       session token rides along as ?t= for the gate. */
    const t = keyRef.current ? `&t=${encodeURIComponent(keyRef.current)}` : "";
    window.location.href = `/api/export?type=${type}${t}`;
  }

  async function patchStatus(row: MessageRow, status: MessageStatus) {
    if (!keyRef.current) return;
    const prev = messages;
    setMessages((rows) => (rows ?? []).map((r) => (r.id === row.id ? { ...r, status } : r)));
    try {
      const res = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-console-token": keyRef.current },
        body: JSON.stringify({ id: row.id, status }),
      });
      const json = await res.json();
      if (res.status === 401) {
        handle401(json);
        return;
      }
      if (!res.ok || !json.ok) throw new Error(json.error || "Update failed");
      const label = status === "archived" ? "archived" : status === "read" ? "marked read" : "marked new";
      toast({ title: `Message ${label}`, description: `${row.name} · ${row.service}` });
      load(); // refresh tiles quietly
    } catch (err) {
      setMessages(prev ?? null); // roll back optimistic update
      toast({
        title: "Could not update message",
        description: err instanceof Error ? err.message : "Try again",
        variant: "destructive",
      });
    }
  }

  async function removeSubscriber(row: SubRow) {
    if (!keyRef.current) return;
    try {
      const res = await fetch("/api/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-console-token": keyRef.current },
        body: JSON.stringify({ id: row.id }),
      });
      const json = await res.json();
      if (res.status === 401) {
        handle401(json);
        return;
      }
      if (!res.ok || !json.ok) throw new Error(json.error || "Remove failed");
      setSubs((rows) => (rows ?? []).filter((r) => r.id !== row.id));
      toast({ title: "Subscriber removed", description: `${row.email} is off the list.` });
      load(); // refresh tiles quietly
    } catch (err) {
      toast({
        title: "Could not remove subscriber",
        description: err instanceof Error ? err.message : "Try again",
        variant: "destructive",
      });
    }
  }

  function armConfirm(row: SubRow) {
    if (confirmTimer.current) clearTimeout(confirmTimer.current);
    if (confirmRemoveId === row.id) {
      setConfirmRemoveId(null);
      removeSubscriber(row);
      return;
    }
    setConfirmRemoveId(row.id);
    confirmTimer.current = setTimeout(() => setConfirmRemoveId(null), CONFIRM_WINDOW_MS);
  }

  async function unlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const k = passcode.trim();
    if (!k || unlocking) return;
    setUnlocking(true);
    setKeyError(null);
    try {
      /* Exchange the passcode for a signed session token (8h TTL). */
      const res = await fetch("/api/console/unlock", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: k }),
      });
      const json = await res.json();
      if (res.status === 429) {
        const ra = Number(res.headers.get("retry-after") || "0");
        throw new Error(ra > 0 ? `Too many attempts — retry in ${ra}s.` : "Too many attempts — try again later.");
      }
      if (!res.ok || !json.ok) {
        throw new Error(res.status === 401 ? "Invalid console key — try again." : json.error || "Unlock failed");
      }
      const session = { token: json.token as string, expiresAt: json.expiresAt as string };
      sessionStorage.setItem(TOKEN_STORAGE, JSON.stringify(session));
      keyRef.current = session.token;
      setKey(session.token);
      setNeedKey(false);
      setPasscode("");
      loadAll();
    } catch (err) {
      setKeyError(err instanceof Error ? err.message : "Invalid console key.");
    } finally {
      setUnlocking(false);
    }
  }

  function lockConsole() {
    sessionStorage.removeItem(TOKEN_STORAGE);
    keyRef.current = null;
    setKey(null);
    setData(null);
    setMessages(null);
    setSubs(null);
    setNeedKey(true);
    setPasscode("");
    setKeyError(null);
    setTab("overview");
  }

  /* ---------------- derived ---------------- */

  const filteredMessages = useMemo(() => {
    const rows = messages ?? [];
    if (inboxFilter === "all") return rows;
    return rows.filter((r) => r.status === inboxFilter);
  }, [messages, inboxFilter]);

  const inboxCounts = useMemo(() => {
    const rows = messages ?? [];
    return {
      all: rows.length,
      new: rows.filter((r) => r.status === "new").length,
      read: rows.filter((r) => r.status === "read").length,
      archived: rows.filter((r) => r.status === "archived").length,
    };
  }, [messages]);

  const filteredSubs = useMemo(() => {
    const rows = subs ?? [];
    const q = subQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.email.toLowerCase().includes(q) || r.source.toLowerCase().includes(q));
  }, [subs, subQuery]);

  const tiles = [
    { icon: Inbox, label: "Contact messages", value: data?.totals.contacts },
    { icon: Users, label: "Newsletter subs", value: data?.totals.subscribers },
    { icon: Activity, label: "Activity · 7 days", value: data?.totals.activity7d },
    { icon: MailOpen, label: "Unread inbox", value: data?.totals.unread },
  ];

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "inbox", label: "Inbox" },
    { id: "subscribers", label: "Subscribers" },
  ];

  const filters: { id: InboxFilter; label: string; count: number }[] = [
    { id: "all", label: "All", count: inboxCounts.all },
    { id: "new", label: "New", count: inboxCounts.new },
    { id: "read", label: "Read", count: inboxCounts.read },
    { id: "archived", label: "Archived", count: inboxCounts.archived },
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
              onClick={loadAll}
              disabled={loading || needKey}
              aria-label="Refresh console data"
              className="focus-carbon flex size-9 shrink-0 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="size-4" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
            {key && (
              <button
                type="button"
                onClick={lockConsole}
                aria-label="Lock console (end session)"
                title="Lock console"
                className="focus-carbon flex size-9 shrink-0 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright"
              >
                <Lock className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="px-6 py-6">
          {needKey ? (
            /* Passcode gate — Carbon restricted-access screen */
            <div className="mx-auto flex max-w-sm flex-col items-center py-8 text-center">
              <span className="flex size-12 items-center justify-center border border-hairline-strong bg-card">
                <LockKeyhole className="size-5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-mono text-sm uppercase tracking-[0.22em]">
                Restricted console
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Studio signals are behind a passcode. Enter the console key to
                read messages, exports and live activity — a signed session
                token (8h) is issued on unlock.
              </p>
              <form onSubmit={unlock} className="mt-6 w-full">
                <label htmlFor="console-key" className="sr-only">
                  Console key
                </label>
                <div className="flex border border-hairline-strong bg-white focus-within:border-ibm-bright">
                  <input
                    id="console-key"
                    type="password"
                    autoComplete="off"
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="console key"
                    className="h-11 w-full min-w-0 bg-transparent px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={unlocking}
                    className="flex h-11 shrink-0 items-center gap-2 bg-primary px-4 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-ibm-blue-hover focus-carbon disabled:opacity-60"
                  >
                    {unlocking ? (
                      <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      "Unlock"
                    )}
                  </button>
                </div>
                {keyError && (
                  <p
                    role="alert"
                    className="mt-3 border border-ibm-error/40 bg-ibm-error/[0.06] px-3 py-2 font-mono text-xs text-ibm-error"
                  >
                    {keyError}
                  </p>
                )}
                <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  Demo key: <span className="text-ibm-soft">abw-2026</span> — set
                  CONSOLE_PASSCODE env to change. 8 failed attempts locks the
                  console for 5 minutes.
                </p>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="border border-ibm-error/40 bg-ibm-error/[0.06] px-4 py-3 font-mono text-xs text-ibm-error">
                  {error}
                </div>
              )}

              {/* Stat tiles — count-up on change */}
              <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
                {tiles.map((t) => (
                  <StatTile key={t.label} icon={t.icon} label={t.label} value={t.value} loading={loading && data === null} />
                ))}
              </div>

              {/* Tabs — Carbon equal-cell tablist */}
              <div
                role="tablist"
                aria-label="Console views"
                className="grid grid-cols-3 gap-px border border-hairline bg-hairline"
              >
                {tabs.map((tb) => {
                  const badge =
                    tb.id === "inbox" && inboxCounts.new > 0
                      ? inboxCounts.new
                      : null;
                  return (
                    <button
                      key={tb.id}
                      role="tab"
                      aria-selected={tab === tb.id}
                      aria-controls={`console-panel-${tb.id}`}
                      id={`console-tab-${tb.id}`}
                      type="button"
                      onClick={() => {
                        setTab(tb.id);
                        /* quiet refresh on tab switch so lists are never stale */
                        if (!needKey && keyRef.current) {
                          if (tb.id === "inbox") loadInbox();
                          if (tb.id === "subscribers") loadSubs();
                        }
                      }}
                      className={cn(
                        "focus-carbon relative flex min-w-0 items-center justify-center gap-1.5 bg-card px-1.5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors sm:gap-2 sm:px-3 sm:text-xs sm:tracking-[0.16em]",
                        tab === tb.id
                          ? "text-ibm-bright"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tb.label}
                      {badge !== null && (
                        <span className="inline-flex min-w-5 items-center justify-center bg-primary px-1 font-mono text-[10px] leading-5 text-primary-foreground">
                          {badge}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-0.5 bg-primary transition-opacity",
                          tab === tb.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* ---------------- Overview ---------------- */}
              {tab === "overview" && (
                <div role="tabpanel" id="console-panel-overview" aria-labelledby="console-tab-overview" className="space-y-6">
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
                </div>
              )}

              {/* ---------------- Inbox ---------------- */}
              {tab === "inbox" && (
                <div role="tabpanel" id="console-panel-inbox" aria-labelledby="console-tab-inbox" className="space-y-4">
                  {/* Filter chips */}
                  <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter messages by status">
                    {filters.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setInboxFilter(f.id)}
                        aria-pressed={inboxFilter === f.id}
                        className={cn(
                          "focus-carbon inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                          inboxFilter === f.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-hairline bg-card text-muted-foreground hover:border-ibm-bright hover:text-ibm-bright"
                        )}
                      >
                        {f.label}
                        <span className={cn("text-[10px]", inboxFilter === f.id ? "text-primary-foreground/80" : "text-muted-foreground/70")}>
                          {f.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="border border-hairline">
                    <div className="border-b border-hairline bg-card px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Messages · {filteredMessages.length} shown
                    </div>
                    <div className="max-h-[420px] overflow-y-auto">
                      <ul>
                        {filteredMessages.map((m) => {
                          const unread = m.status === "new";
                          return (
                            <li
                              key={m.id}
                              className={cn(
                                "border-b border-hairline/60 py-3 pl-4 pr-3 last:border-b-0",
                                unread ? "border-l-2 border-l-primary bg-ibm-blue/[0.03]" : "border-l-2 border-l-transparent"
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                                    <span className={cn("text-sm", unread ? "font-semibold text-foreground" : "text-foreground")}>
                                      {m.name}
                                    </span>
                                    <span className="font-mono text-[11px] text-ibm-soft">{m.service}</span>
                                    {m.status === "archived" && (
                                      <span className="border border-hairline px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                                        archived
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard?.writeText(m.email);
                                      toast({ title: "Email copied", description: m.email });
                                    }}
                                    className="focus-carbon mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-ibm-bright"
                                    title="Copy email address"
                                  >
                                    {m.email}
                                    <Copy className="size-3" strokeWidth={1.5} aria-hidden="true" />
                                  </button>
                                  <p
                                    className={cn(
                                      "mt-1.5 max-w-[52ch] truncate text-xs leading-relaxed",
                                      m.status === "archived" ? "text-muted-foreground/60" : "text-muted-foreground"
                                    )}
                                    title={m.message}
                                  >
                                    {m.message}
                                  </p>
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-2">
                                  <span className="font-mono text-[10px] text-muted-foreground">{timeAgo(m.createdAt)}</span>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => patchStatus(m, unread ? "read" : "new")}
                                      aria-label={unread ? `Mark message from ${m.name} as read` : `Mark message from ${m.name} as new`}
                                      title={unread ? "Mark read" : "Mark new"}
                                      className="focus-carbon flex size-7 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright"
                                    >
                                      {unread ? (
                                        <MailOpen className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                                      ) : (
                                        <Mail className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => patchStatus(m, m.status === "archived" ? "read" : "archived")}
                                      aria-label={
                                        m.status === "archived"
                                          ? `Restore message from ${m.name} to the inbox`
                                          : `Archive message from ${m.name}`
                                      }
                                      title={m.status === "archived" ? "Restore" : "Archive"}
                                      className="focus-carbon flex size-7 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright"
                                    >
                                      {m.status === "archived" ? (
                                        <ArchiveRestore className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                                      ) : (
                                        <Archive className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                        {messages && filteredMessages.length === 0 && (
                          <li className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                            <SearchX className="size-5 text-muted-foreground/50" strokeWidth={1.5} aria-hidden="true" />
                            <p className="font-mono text-xs text-muted-foreground">
                              {inboxFilter === "all" ? "Inbox zero. For now." : `No ${inboxFilter} messages.`}
                            </p>
                          </li>
                        )}
                        {!messages && !error && (
                          <li className="px-4 py-10 text-center font-mono text-xs text-muted-foreground">Loading…</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- Subscribers ---------------- */}
              {tab === "subscribers" && (
                <div role="tabpanel" id="console-panel-subscribers" aria-labelledby="console-tab-subscribers" className="space-y-4">
                  {/* Search */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <label htmlFor="subscriber-search" className="sr-only">
                        Search subscribers by email or source
                      </label>
                      <input
                        id="subscriber-search"
                        type="text"
                        value={subQuery}
                        onChange={(e) => setSubQuery(e.target.value)}
                        placeholder="Search by email or source…"
                        className="focus-carbon h-10 w-full border border-hairline bg-card pl-9 pr-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-ibm-bright focus:outline-none"
                      />
                    </div>
                    <p aria-live="polite" className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {filteredSubs.length}/{subs?.length ?? 0}
                    </p>
                  </div>

                  <div className="border border-hairline">
                    <div className="flex items-center justify-between border-b border-hairline bg-card px-4 py-2.5">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Newsletter list
                      </span>
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
                    <div className="max-h-[420px] overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="sticky top-0 bg-card">
                          <tr className="border-b border-hairline font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            <th className="px-4 py-2 font-medium" scope="col">Email</th>
                            <th className="hidden px-4 py-2 font-medium sm:table-cell" scope="col">Source</th>
                            <th className="hidden px-4 py-2 font-medium md:table-cell" scope="col">Joined</th>
                            <th className="px-4 py-2 text-right font-medium" scope="col">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSubs.map((s) => {
                            const confirming = confirmRemoveId === s.id;
                            return (
                              <tr key={s.id} className="border-b border-hairline/60 transition-colors last:border-b-0 hover:bg-ibm-bright/[0.03]">
                                <td className="px-4 py-2.5 font-mono text-[11px] text-foreground">
                                  <span className="flex items-center gap-1.5">
                                    <span className="truncate">{s.email}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigator.clipboard?.writeText(s.email);
                                        toast({ title: "Email copied", description: s.email });
                                      }}
                                      aria-label={`Copy email address ${s.email}`}
                                      className="focus-carbon shrink-0 text-muted-foreground transition-colors hover:text-ibm-bright"
                                    >
                                      <Copy className="size-3" strokeWidth={1.5} aria-hidden="true" />
                                    </button>
                                  </span>
                                </td>
                                <td className="hidden px-4 py-2.5 sm:table-cell">
                                  <span className="border border-hairline px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                                    {s.source}
                                  </span>
                                </td>
                                <td className="hidden px-4 py-2.5 font-mono text-[10px] text-muted-foreground md:table-cell">
                                  {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                  <span className="ml-1.5 text-muted-foreground/60">{timeAgo(s.createdAt)}</span>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <button
                                    type="button"
                                    onClick={() => armConfirm(s)}
                                    onBlur={() => confirming && setTimeout(() => setConfirmRemoveId((cur) => (cur === s.id ? null : cur)), 0)}
                                    aria-label={confirming ? `Confirm removing ${s.email}` : `Remove subscriber ${s.email}`}
                                    title={confirming ? "Click again to confirm" : "Remove subscriber"}
                                    className={cn(
                                      "focus-carbon inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                                      confirming
                                        ? "border-ibm-error bg-ibm-error text-white"
                                        : "border-hairline text-muted-foreground hover:border-ibm-error hover:text-ibm-error"
                                    )}
                                  >
                                    {confirming ? (
                                      <>
                                        <Check className="size-3" strokeWidth={2} aria-hidden="true" />
                                        Confirm
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="size-3" strokeWidth={1.5} aria-hidden="true" />
                                        Remove
                                      </>
                                    )}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                          {subs && filteredSubs.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-4 py-8 text-center">
                                <SearchX className="mx-auto size-5 text-muted-foreground/50" strokeWidth={1.5} aria-hidden="true" />
                                <p className="mt-2 font-mono text-xs text-muted-foreground">
                                  {subQuery ? "No subscribers match the search." : "No subscribers yet."}
                                </p>
                                {subQuery && (
                                  <button
                                    type="button"
                                    onClick={() => setSubQuery("")}
                                    className="focus-carbon mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ibm-bright hover:underline"
                                  >
                                    Clear the search
                                  </button>
                                )}
                              </td>
                            </tr>
                          )}
                          {!subs && !error && (
                            <tr>
                              <td colSpan={4} className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                                Loading…
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-hairline pt-4 text-center font-mono text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" aria-hidden="true" />
                  LIVE
                </span>
                <span aria-hidden="true">·</span>
                {data ? (
                  <span>
                    Synced{" "}
                    {new Date(data.generatedAt).toLocaleTimeString("en-GB", {
                      timeZone: "Asia/Calcutta",
                      hour12: false,
                    })}{" "}
                    IST ({timeAgo(data.generatedAt)})
                  </span>
                ) : (
                  "—"
                )}
                <span aria-hidden="true">·</span>
                <span>auto-refresh 30s</span>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- stat tile with count-up ---------------- */

function StatTile({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" }>;
  label: string;
  value: number | undefined;
  loading: boolean;
}) {
  const show = !loading || typeof value === "number";
  const display = useCountUp(typeof value === "number" ? value : 0, show);
  return (
    <div className="bg-card px-4 py-4">
      <Icon className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
      <div className="mt-2.5 font-mono text-2xl text-foreground" aria-live="polite">
        {!show ? <span className="text-muted-foreground/40">—</span> : display}
      </div>
      <div className="mt-1 text-xs leading-snug text-muted-foreground">{label}</div>
    </div>
  );
}
