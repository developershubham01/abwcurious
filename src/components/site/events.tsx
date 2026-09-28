"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CalendarX2,
  CalendarPlus,
  Play,
  Link2,
  Images,
  BellRing,
  LoaderCircle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { SocialButton } from "./social-row";
import { useToast } from "@/hooks/use-toast";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_STATUS_LABEL,
  SOCIALS,
  isPlaceholder,
  SAMPLE_NOTE,
  type CompanyEvent,
  type EventCategory,
  type EventStatus,
} from "@/data/company";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | EventStatus;
type CategoryFilter = "All" | EventCategory;

const STATUS_DOT: Record<EventStatus, string> = {
  upcoming: "bg-ibm-success",
  recent: "bg-primary",
  past: "bg-ibm-subtle",
};

/** Flat Carbon chip: white tile + hairline; the dot alone carries the status color. */
const COVER_CHIP =
  "inline-flex items-center gap-1.5 rounded-[2px] border border-hairline bg-white px-2.5 py-1 text-xs text-ink-muted";

function Meta({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
      <Icon className="size-3.5 text-ibm-subtle" strokeWidth={1.75} aria-hidden="true" />
      {children}
    </span>
  );
}

/* ------------------------------ event card ------------------------------- */

function EventCard({ event, onOpen }: { event: CompanyEvent; onOpen: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -10 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-haspopup="dialog"
        aria-label={`Open event details: ${event.name}`}
        className="group flex h-full cursor-pointer flex-col overflow-hidden border border-hairline bg-white outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ibm-blue/60 hover:border-ibm-blue"
      >
        {/* cover */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.cover}
            alt={`${event.name} — cover photo`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-70"
            aria-hidden="true"
          />
          {/* status chip */}
          <span className={cn("absolute left-3.5 top-3.5", COVER_CHIP)}>
            <span
              className={cn(
                "size-1.5 rounded-full",
                STATUS_DOT[event.status],
                event.status === "upcoming" && "animate-pulse-dot"
              )}
              aria-hidden="true"
            />
            {EVENT_STATUS_LABEL[event.status]}
          </span>
          {/* category chip */}
          <span className={cn("absolute right-3.5 top-3.5", COVER_CHIP)}>
            {event.category}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <Meta icon={CalendarDays}>{event.date}</Meta>
            <Meta icon={MapPin}>{event.location}</Meta>
          </div>
          <h3 className="mt-3 text-lg leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">
            {event.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{event.description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-primary">
            View Event
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* --------------------------- upcoming toolkit ---------------------------- */

/** 1 Hz ticker shared by countdowns — external store keeps the hooks rule happy. */
function subscribeTick(onStoreChange: () => void) {
  const t = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(t);
}

/** Live countdown to the event date — "–" until the store ticks (hydration-safe). */
function Countdown({ dateStr }: { dateStr: string }) {
  const target = useMemo(() => new Date(dateStr).getTime(), [dateStr]);
  const now = useSyncExternalStore(
    subscribeTick,
    () => Math.floor(Date.now() / 1000),
    () => null
  );

  const valid = Number.isFinite(target);
  const diff = valid && now !== null ? Math.max(0, target - now * 1000) : null;
  const parts =
    diff === null
      ? null
      : {
          days: Math.floor(diff / 86_400_000),
          hours: Math.floor((diff % 86_400_000) / 3_600_000),
          minutes: Math.floor((diff % 3_600_000) / 60_000),
          seconds: Math.floor((diff % 60_000) / 1000),
        };

  const cells = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Min", value: parts?.minutes },
    { label: "Sec", value: parts?.seconds },
  ];

  return (
    <div className="flex items-center gap-2" role="timer" aria-label="Time until the event starts">
      {cells.map((c, i) => (
        <div key={c.label} className="flex items-center gap-2">
          <div className="min-w-[3.4rem] border border-hairline bg-white px-2 py-1.5 text-center">
            <span className="block text-base tabular-nums leading-none text-ink">
              {c.value === null || c.value === undefined ? "–" : String(c.value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-xs text-ibm-subtle">
              {c.label}
            </span>
          </div>
          {i < cells.length - 1 && (
            <span className="text-sm text-ibm-subtle" aria-hidden="true">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Build a RFC 5545 .ics file for the event (all-day-ish 8h hold, UTC). */
function buildICS(event: CompanyEvent): string {
  const start = new Date(event.date);
  const end = new Date(start.getTime() + 8 * 3_600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ABWcurious//Company Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@abwcurious`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(event.name)}`,
    `LOCATION:${esc(event.location)}`,
    `DESCRIPTION:${esc(event.description)}`,
    `URL:${typeof window !== "undefined" ? window.location.origin + window.location.pathname : ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function AddToCalendarButton({ event }: { event: CompanyEvent }) {
  const [done, setDone] = useState(false);

  function download() {
    try {
      const blob = new Blob([buildICS(event)], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${event.id}.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDone(true);
      window.setTimeout(() => setDone(false), 2600);
    } catch {
      /* download blocked — silent, button stays */
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      className={cn(
        "focus-carbon inline-flex h-10 items-center gap-2 bg-white px-4 text-sm ring-1 ring-inset ring-primary transition-colors",
        "hover:bg-primary hover:text-white active:bg-ibm-blue-active",
        done && "ring-ibm-success text-ibm-success hover:bg-ibm-success hover:text-white"
      )}
    >
      {done ? (
        <CheckCircle2 className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <CalendarPlus className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
      )}
      {done ? "Saved" : "Add to calendar"}
    </button>
  );
}

/** Email waitlist for upcoming events → /api/newsletter (source: "event:<id>"). */
function WaitlistForm({ event }: { event: CompanyEvent }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `event:${event.id}`.slice(0, 60) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not sign you up");
      setState("done");
      toast({
        title: json.alreadySubscribed ? "Already on the list" : "You're on the list",
        description: json.alreadySubscribed
          ? "We'll email you when this event opens up."
          : `We'll remind you before ${event.name}.`,
      });
    } catch (err) {
      setState("idle");
      toast({
        title: "Could not sign you up",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2.5 border border-hairline border-l-4 border-l-ibm-success bg-white px-4 py-3">
        <CheckCircle2 className="size-4 shrink-0 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
        <p className="text-sm text-ink-muted">
          Reminder set — see you there
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex overflow-hidden rounded-none border border-hairline bg-ibm-layer transition-colors focus-within:border-b-2 focus-within:border-primary"
    >
      <label htmlFor={`waitlist-${event.id}`} className="sr-only">
        Email for event reminders
      </label>
      <input
        id={`waitlist-${event.id}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        autoComplete="email"
        className="h-10 w-full min-w-0 bg-transparent px-4 text-sm text-ink placeholder:text-ibm-subtle focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 bg-primary px-4 text-sm text-white transition-colors hover:bg-ibm-blue-hover active:bg-ibm-blue-active focus-carbon disabled:opacity-60"
      >
        {state === "loading" ? (
          <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <BellRing className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
        )}
        Notify me
      </button>
    </form>
  );
}

/** Panel shown in the dialog for upcoming events: countdown + reminders. */
function UpcomingPanel({ event }: { event: CompanyEvent }) {
  const dateOK = Number.isFinite(new Date(event.date).getTime());
  return (
    <div className="mt-6 border border-hairline border-l-4 border-l-primary bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-ibm-success" aria-hidden="true" />
          Starts in
        </p>
        <AddToCalendarButton event={event} />
      </div>
      {dateOK && (
        <div className="mt-3">
          <Countdown dateStr={event.date} />
        </div>
      )}
      <div className="mt-4 flex flex-col gap-2.5 border-t border-hairline pt-4 sm:flex-row sm:items-center">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-ink-muted">
          Get an email reminder when doors open — no spam, one email.
        </p>
        <div className="w-full sm:w-80">
          <WaitlistForm event={event} />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- detail dialog ----------------------------- */

function EventDialog({ event, onClose }: { event: CompanyEvent | null; onClose: () => void }) {
  /* Viewer state keyed by event id — switches back to photo 0 whenever a
     different event is opened, without a state-syncing effect. */
  const [viewer, setViewer] = useState<{ id: string; shot: number }>({ id: "", shot: 0 });
  const shot = event && viewer.id === event.id ? viewer.shot : 0;
  const setShot = (n: number) => event && setViewer({ id: event.id, shot: n });
  const shots = event ? [event.cover, ...event.gallery] : [];
  const activeShot = shots[Math.min(shot, shots.length - 1)];
  const hasVideo = Boolean(event?.video) && !isPlaceholder(event?.video);
  const hasUrl = Boolean(event?.url) && !isPlaceholder(event?.url);
  const isUpcoming = event?.status === "upcoming";

  return (
    <Dialog open={Boolean(event)} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[92dvh] w-[calc(100vw-2rem)] max-w-3xl gap-0 overflow-hidden rounded-none border-hairline bg-white p-0 focus:outline-none lg:max-w-4xl">
        <div className="max-h-[92dvh] overflow-y-auto overscroll-contain">
          {event && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* main photo with in-dialog gallery */}
              <div className="relative aspect-[16/9] w-full bg-ibm-layer">
                <Image
                  key={activeShot}
                  src={activeShot}
                  alt={`${event.name} — photo ${shot + 1} of ${shots.length}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className={cn(COVER_CHIP)}>
                      <span className={cn("size-1.5 rounded-full", STATUS_DOT[event.status])} aria-hidden="true" />
                      {EVENT_STATUS_LABEL[event.status]}
                    </span>
                    <span className={cn(COVER_CHIP)}>
                      {event.category}
                    </span>
                  </div>
                  <span className="hidden items-center gap-1.5 text-xs text-white/85 sm:inline-flex">
                    <Images className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                    {shot + 1} / {shots.length}
                  </span>
                </div>
              </div>

              {/* thumbs */}
              {shots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-5 pt-4 sm:px-8" role="tablist" aria-label="Event photos">
                  {shots.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={i === shot}
                      aria-label={`Show photo ${i + 1}`}
                      onClick={() => setShot(i)}
                      className={cn(
                        "focus-carbon relative h-14 w-24 shrink-0 overflow-hidden rounded-none border-2 transition-colors duration-200",
                        i === shot
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="px-5 py-6 sm:px-8 sm:py-7">
                <DialogTitle asChild>
                  <h3 className="text-balance text-2xl font-light tracking-tight text-ink sm:text-3xl">
                    {event.name}
                  </h3>
                </DialogTitle>

                {/* meta grid */}
                <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-4">
                  {[
                    { icon: CalendarDays, label: "Date", value: event.date },
                    { icon: MapPin, label: "Location", value: event.location },
                    { icon: Images, label: "Category", value: event.category },
                    {
                      icon: Play,
                      label: "Status",
                      value: EVENT_STATUS_LABEL[event.status],
                    },
                  ].map((m) => (
                    <div key={m.label} className="bg-white px-4 py-3.5">
                      <dt className="flex items-center gap-1.5 text-xs text-ibm-subtle">
                        <m.icon className="size-3 text-ibm-subtle" strokeWidth={1.75} aria-hidden="true" />
                        {m.label}
                      </dt>
                      <dd className="mt-1.5 text-[13px] leading-snug text-ink">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-pretty text-[15px] leading-relaxed text-ink-muted">
                  {event.description}
                </p>

                {/* upcoming: countdown + waitlist + calendar */}
                {isUpcoming && <UpcomingPanel event={event} />}

                {/* video */}
                {event.video && (
                  <div className="mt-6">
                    {hasVideo ? (
                      <video
                        controls
                        preload="metadata"
                        src={event.video}
                        className="aspect-video w-full border border-hairline bg-ink object-cover"
                      />
                    ) : (
                      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 border border-dashed border-hairline bg-ibm-layer text-center">
                        <span className="flex size-12 items-center justify-center border border-hairline bg-white text-primary">
                          <Play className="size-5" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <p className="text-xs text-ibm-subtle">
                          Event video — add a URL in src/data/company.ts
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* socials + CTA */}
                <div className="mt-7 flex flex-col gap-5 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-ink-muted">
                      Relive it on social
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Social media posts">
                      {SOCIALS.slice(0, 4).map((s) => (
                        <li key={s.platform}>
                          <SocialButton link={s} size="sm" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  {hasUrl ? (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-carbon group inline-flex h-12 shrink-0 items-center gap-2 bg-primary px-4 text-sm text-white transition-colors hover:bg-ibm-blue-hover active:bg-ibm-blue-active"
                    >
                      View Event
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span
                      title="Add the real event URL in src/data/company.ts"
                      className="inline-flex h-12 shrink-0 cursor-default items-center gap-2 border border-dashed border-hairline px-4 text-sm text-ibm-subtle"
                    >
                      <Link2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      Event link — placeholder
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------- section --------------------------------- */

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "recent", label: "Recent" },
  { value: "past", label: "Past" },
];

export function Events() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [selected, setSelected] = useState<CompanyEvent | null>(null);

  const counts = useMemo(() => {
    const map: Record<StatusFilter, number> = { all: EVENTS.length, upcoming: 0, recent: 0, past: 0 };
    for (const e of EVENTS) map[e.status] += 1;
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      EVENTS.filter(
        (e) => (status === "all" || e.status === status) && (category === "All" || e.category === category)
      ),
    [status, category]
  );

  return (
    <section
      id="events"
      aria-label="Company events"
      className="relative scroll-mt-24 border-y border-hairline bg-ibm-layer py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="justify-center text-sm text-ink-muted">
              04 — Company events
            </p>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            <SplitText text="Moments we build" />{" "}
            <SplitText text="together." delay={0.15} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              Summits, workshops, launches and the occasional confetti explosion — every event is a
              chapter of the company story.
            </p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4">
            {/* status tabs */}
            <div
              role="tablist"
              aria-label="Filter events by status"
              className="inline-flex flex-wrap justify-center rounded-none border-b border-hairline bg-white"
            >
              {STATUS_TABS.map((tab) => {
                const isActive = status === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setStatus(tab.value)}
                    className={cn(
                      "focus-carbon relative -mb-px px-4 py-2.5 text-sm transition-colors duration-200",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="event-status-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {tab.label}
                      <span className={cn("ml-1.5 text-xs", isActive ? "text-ink-muted" : "text-ibm-subtle")}>
                        {counts[tab.value]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* category chips */}
            <div
              role="group"
              aria-label="Filter events by category"
              className="flex flex-wrap justify-center gap-2"
            >
              {(["All", ...EVENT_CATEGORIES] as CategoryFilter[]).map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "focus-carbon rounded-[2px] border px-4 py-1.5 text-sm transition-colors duration-200",
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-hairline bg-white text-ink-muted hover:border-ink hover:text-ink"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-12 min-h-[24rem]">
          {filtered.length > 0 ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((event) => (
                  <EventCard key={event.id} event={event} onOpen={() => setSelected(event)} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center border border-dashed border-hairline bg-white px-8 py-16 text-center"
            >
              <span className="flex size-12 items-center justify-center border border-hairline bg-ibm-layer text-primary">
                <CalendarX2 className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-medium text-ink">No events in this combination</p>
              <p className="mt-1 text-sm text-ink-muted">Try a different status or category.</p>
              <button
                type="button"
                onClick={() => {
                  setStatus("all");
                  setCategory("All");
                }}
                className="focus-carbon mt-5 bg-white px-4 py-2.5 text-sm text-primary ring-1 ring-inset ring-primary transition-colors hover:bg-primary hover:text-white active:bg-ibm-blue-active"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-sm text-ibm-subtle">
            {SAMPLE_NOTE}
          </p>
        </Reveal>
      </div>

      <EventDialog event={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
