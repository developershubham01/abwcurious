"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CalendarPlus,
  Play,
  Images,
  BellRing,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_STATUS_LABEL,
  SOCIALS,
  type CompanyEvent,
  type EventCategory,
  type EventStatus,
} from "@/data/company";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type StatusFilter = "all" | EventStatus;
type CategoryFilter = "All" | EventCategory;

const STATUS_DOT: Record<EventStatus, string> = {
  upcoming: "bg-ibm-success",
  recent: "bg-primary",
  past: "bg-ibm-subtle",
};

/** Build a RFC 5545 .ics file for calendar export */
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

export function EventsPage() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [selected, setSelected] = useState<CompanyEvent | null>(null);
  const [shot, setShot] = useState(0);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

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

  const featured = EVENTS.find((e) => e.status === "upcoming") ?? EVENTS[0];

  const handleDownloadICS = (e: React.MouseEvent, event: CompanyEvent) => {
    e.stopPropagation();
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
      toast({
        title: "Calendar Event Downloaded",
        description: `Added "${event.name}" (.ics) to your downloads.`,
      });
    } catch {
      toast({
        title: "Download failed",
        description: "Please copy event dates manually.",
      });
    }
  };

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setSubscribed(true);
    toast({
      title: "RSVP Confirmed",
      description: `We'll send event access passes to ${emailInput}.`,
    });
  };

  return (
    <div className="bg-background">
      {/* ================= Hero Section ================= */}
      <section className="relative overflow-hidden border-b border-hairline bg-[#04101f] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(95,208,225,0.22), transparent 70%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-medium tracking-wide text-[#79dce8] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#5fd0e1] animate-pulse-dot" />
              Company Events · Summits, Workshops & Keynotes
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              <SplitText text="Summits, workshops, &" immediate />{" "}
              <span className="bg-gradient-to-r from-[#79dce8] via-[#a6e5ff] to-white bg-clip-text text-transparent font-normal">
                community meetups.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              We regularly host and speak at technical conferences, run production masterclasses for engineering teams, and bring the local developer community together in Nerul, Navi Mumbai.
            </p>
          </Reveal>

          {/* Quick Metrics */}
          <Reveal delay={0.24}>
            <div className="mt-10 grid grid-cols-2 gap-4 border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md sm:grid-cols-4 sm:gap-8">
              <div>
                <div className="text-2xl font-light text-white sm:text-3xl">{EVENTS.length}+</div>
                <div className="text-xs text-white/60">Annual events</div>
              </div>
              <div>
                <div className="text-2xl font-light text-[#79dce8] sm:text-3xl">1,200+</div>
                <div className="text-xs text-white/60">Engineers engaged</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white sm:text-3xl">4</div>
                <div className="text-xs text-white/60">Host locations</div>
              </div>
              <div>
                <div className="text-2xl font-light text-[#79dce8] sm:text-3xl">100%</div>
                <div className="text-xs text-white/60">Free tech access</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Featured Event Spotlight ================= */}
      {featured && (
        <section className="border-b border-hairline bg-ibm-layer py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="border border-hairline bg-white shadow-sm overflow-hidden">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative aspect-[16/10] lg:aspect-auto w-full min-h-[280px] sm:min-h-[380px] bg-ibm-layer overflow-hidden">
                  <Image
                    src={featured.cover}
                    alt={`${featured.name} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-mono text-white">
                      <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" />
                      Featured Spotlight
                    </span>
                    <span className="border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-mono text-white">
                      {featured.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1.5 font-mono text-primary">
                        <CalendarDays className="size-3.5" />
                        {featured.date}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <MapPin className="size-3.5 text-ibm-subtle" />
                        {featured.location}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl sm:text-3xl font-light text-ink tracking-tight">
                      {featured.name}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      {featured.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-hairline flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(featured);
                        setShot(0);
                      }}
                      className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-ibm-blue-hover focus-carbon"
                    >
                      View Event & Photos
                      <ArrowRight className="size-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDownloadICS(e, featured)}
                      className="inline-flex items-center gap-2 border border-hairline bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-hairline-strong hover:bg-ibm-layer focus-carbon"
                    >
                      <CalendarPlus className="size-4 text-primary" />
                      Add to Calendar (.ics)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= All Events Grid & Filters ================= */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div className="max-w-xl">
              <Eyebrow tone="muted">Full Event Archive</Eyebrow>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Explore all gatherings & sessions.
              </h2>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {(["all", "upcoming", "recent", "past"] as StatusFilter[]).map((s) => {
                const active = status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={cn(
                      "focus-carbon px-3.5 py-1.5 text-xs font-medium border transition-colors capitalize",
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-hairline bg-white text-ink-muted hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {s} ({counts[s]})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={0.06 * i} className="h-full">
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelected(item);
                    setShot(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(item);
                      setShot(0);
                    }
                  }}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden border border-hairline bg-white transition-all hover:border-primary hover:shadow-lg focus-carbon"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                    <Image
                      src={item.cover}
                      alt={`${item.name} cover photo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border border-white/20 bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-mono text-white">
                      <span className={cn("size-1.5 rounded-full", STATUS_DOT[item.status])} />
                      {EVENT_STATUS_LABEL[item.status]}
                    </span>

                    <span className="absolute top-3 right-3 border border-white/20 bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-mono text-white">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                        <span className="inline-flex items-center gap-1.5 font-mono text-primary">
                          <CalendarDays className="size-3.5" />
                          {item.date}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1.5 font-mono truncate max-w-[160px]">
                          <MapPin className="size-3.5 text-ibm-subtle shrink-0" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-medium text-ink transition-colors group-hover:text-primary">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs">
                      <span className="text-primary font-medium group-hover:underline inline-flex items-center gap-1">
                        View details
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDownloadICS(e, item)}
                        className="text-ink-muted hover:text-ink transition-colors"
                        title="Add to Calendar"
                      >
                        <CalendarPlus className="size-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Host / Partner CTA ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border border-hairline bg-white p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Community & Partnerships</span>
              <h2 className="mt-2 text-2xl font-light text-ink sm:text-3xl">
                Want to co-host an engineering workshop or tech meetup?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                We open our studio spaces and technical presentation gear for hands-on developer masterclasses, open source summits, and product demos.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
              <RollButton href="/contact" variant="primary" arrow>
                Propose an event
              </RollButton>
              <RollButton href="/social" variant="outline">
                Join our community
              </RollButton>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Detail Modal ================= */}
      <Dialog open={Boolean(selected)} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="max-h-[92dvh] w-[calc(100vw-2rem)] max-w-3xl gap-0 overflow-hidden rounded-none border-hairline bg-white p-0 focus:outline-none lg:max-w-4xl">
          {selected && (
            <div className="max-h-[92dvh] overflow-y-auto">
              {/* Photo Showcase */}
              <div className="relative aspect-[16/9] w-full bg-ibm-layer">
                <Image
                  src={[selected.cover, ...selected.gallery][shot] ?? selected.cover}
                  alt={`${selected.name} photograph`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-mono">
                      {selected.category}
                    </span>
                    <h3 className="mt-2 text-xl sm:text-2xl font-light">{selected.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-white/80">
                    {shot + 1} / {[selected.cover, ...selected.gallery].length}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {[selected.cover, ...selected.gallery].length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-4 border-b border-hairline bg-ibm-layer">
                  {[selected.cover, ...selected.gallery].map((src, idx) => (
                    <button
                      key={src + idx}
                      type="button"
                      onClick={() => setShot(idx)}
                      className={cn(
                        "relative h-14 w-20 shrink-0 overflow-hidden border-2 transition-all",
                        shot === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image src={src} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-muted border-b border-hairline pb-4">
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <CalendarDays className="size-4" />
                    {selected.date}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-ibm-subtle" />
                    {selected.location}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4 text-ibm-subtle" />
                    Status: {EVENT_STATUS_LABEL[selected.status]}
                  </span>
                </div>

                <p className="text-base leading-relaxed text-ink-muted">
                  {selected.description}
                </p>

                {/* RSVP / Notification Form */}
                <div className="border border-hairline border-l-4 border-l-primary bg-ibm-layer p-5">
                  <h4 className="text-sm font-medium text-ink">Get event reminder & materials</h4>
                  <p className="mt-1 text-xs text-ink-muted">
                    We'll email slides, code repositories, and event recording links once available.
                  </p>
                  {subscribed ? (
                    <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#24a148]">
                      <CheckCircle2 className="size-4" />
                      Registration confirmed! Check your inbox.
                    </div>
                  ) : (
                    <form onSubmit={handleRsvp} className="mt-3 flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="engineer@company.com"
                        className="h-10 flex-1 border border-hairline bg-white px-3 text-sm text-ink placeholder:text-ibm-subtle focus-carbon"
                      />
                      <button
                        type="submit"
                        className="h-10 bg-primary px-4 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-ibm-blue-hover focus-carbon"
                      >
                        Keep me updated
                      </button>
                    </form>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline">
                  <button
                    type="button"
                    onClick={(e) => handleDownloadICS(e, selected)}
                    className="inline-flex items-center gap-2 border border-hairline bg-white px-4 py-2 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-hairline-strong hover:bg-ibm-layer focus-carbon"
                  >
                    <CalendarPlus className="size-4 text-primary" />
                    Download .ics calendar
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="bg-ibm-layer border border-hairline px-4 py-2 text-xs sm:text-sm text-ink-muted hover:text-ink focus-carbon"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
