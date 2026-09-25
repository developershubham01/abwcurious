"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Command as CommandIcon,
} from "lucide-react";
import { Logo } from "./logo";
import { RollButton } from "./primitives";
import { CATEGORIES, categoryServiceCount, ALL_SUB_SERVICES } from "@/lib/catalog";
import { openCategory } from "@/lib/catalog-route";
import { cn } from "@/lib/utils";

/** Anchors rendered as plain links. Services is a dropdown; Products is a link. */
const NAV = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Notes", href: "#notes" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

/** Ticking studio clock (Asia/Calcutta) — hydration-safe, renders placeholder before mount. */
function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Calcutta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="inline-flex items-center gap-1.5 tabular-nums"
      title="Studio local time (IST)"
      suppressHydrationWarning
    >
      <span className="size-1.5 rounded-full bg-ibm-cyan animate-pulse-dot" aria-hidden="true" />
      {time ? `Studio time ${time} IST` : "Studio time — IST"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Services mega-dropdown (desktop)                                    */
/* ------------------------------------------------------------------ */

function ServicesDropdown({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const clearTimer = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const openWithIntent = () => {
    clearTimer();
    hoverTimer.current = window.setTimeout(() => setOpen(true), 90);
  };

  const closeWithIntent = () => {
    clearTimer();
    hoverTimer.current = window.setTimeout(() => setOpen(false), 260);
  };

  /* Escape closes and returns focus to the trigger; focus leaving the
     widget (tab through the panel) also closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panelPick = (fn: () => void) => () => {
    setOpen(false);
    clearTimer();
    fn();
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={openWithIntent}
      onMouseLeave={closeWithIntent}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
          clearTimer();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={openWithIntent}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-menu"
        aria-current={active === "#services" ? "true" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1 font-mono text-[11px] xl:text-[13px] transition-colors focus-carbon",
          active === "#services" || open ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Services
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {active === "#services" && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-[7px] left-0 h-[2px] w-full bg-gradient-to-r from-ibm-blue to-ibm-cyan"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Mega panel — anchored to the sticky header, spans the viewport width
          like a classic IBM mega menu, content aligned to the max-w-7xl rail */}
      <div
        id="services-menu"
        className={cn(
          "absolute inset-x-0 top-full z-50 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="border border-hairline-strong bg-background/97 shadow-[0_32px_64px_-32px_rgba(6,15,40,0.25)] backdrop-blur-md">
            <div className="h-0.5 bg-gradient-to-r from-ibm-blue to-ibm-cyan" aria-hidden="true" />
            <div className="grid gap-0 lg:grid-cols-[1fr_240px]">
              {/* category grid */}
              <div className="grid gap-px bg-hairline sm:grid-cols-2 xl:grid-cols-3">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={panelPick(() => openCategory(c.slug))}
                    className="group flex items-start gap-3 bg-white px-4 py-3.5 text-left transition-colors hover:bg-ibm-blue/[0.05] focus-carbon"
                  >
                    <span className="mt-0.5 font-mono text-[10px] text-ibm-bright" aria-hidden="true">
                      {c.num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{c.name}</span>
                        <ArrowUpRight
                          className="size-3.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ibm-bright"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {categoryServiceCount(c)} sub-services · {c.short}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {/* rail */}
              <div className="flex flex-col justify-between border-t border-hairline bg-ibm-blue/[0.03] p-5 lg:border-l lg:border-t-0">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
                    All services
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {ALL_SUB_SERVICES.length} sub-services across 6 practices — every card opens a full
                    playbook.
                  </p>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href="#services"
                    onClick={panelPick(() => {})}
                    className="inline-flex items-center justify-between border border-hairline-strong bg-white px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
                  >
                    Browse showcase
                    <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  <a
                    href="#products"
                    onClick={panelPick(() => {})}
                    className="inline-flex items-center justify-between px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-ibm-bright focus-carbon"
                  >
                    Our products
                    <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...NAV.map((n) => n.href.slice(1)), "services", "products"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* IBM-style utility bar */}
      <div className="hidden md:block border-b border-hairline bg-ibm-blue/[0.04]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3 text-ibm-bright" strokeWidth={1.5} />
              Pune, Maharashtra — India
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" aria-hidden="true" />
              Accepting new projects
            </span>
          </div>
          <div className="flex items-center gap-6">
            <LiveClock />
            <a
              href="mailto:hello@abwcurious.com"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail className="size-3 text-ibm-bright" strokeWidth={1.5} />
              hello@abwcurious.com
            </a>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone className="size-3 text-ibm-bright" strokeWidth={1.5} />
              +91 99999 99999
            </a>
          </div>
        </div>
      </div>

      {/* Sticky header — `relative` anchors the services mega panel */}
      <header
        className={cn(
          "relative sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-hairline bg-background/85 backdrop-blur-md"
            : "border-transparent bg-background/60 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="focus-carbon" aria-label="ABWcurious home">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-3 xl:gap-5" aria-label="Primary">
            <ServicesDropdown active={active} />
            <a
              href="#products"
              aria-current={active === "#products" ? "true" : undefined}
              className={cn(
                "relative font-mono text-[11px] xl:text-[13px] transition-colors focus-carbon",
                active === "#products"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Products
              {active === "#products" && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-[7px] left-0 h-[2px] w-full bg-gradient-to-r from-ibm-blue to-ibm-cyan"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              )}
            </a>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative font-mono text-[11px] xl:text-[13px] transition-colors focus-carbon",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-[7px] left-0 h-[2px] w-full bg-gradient-to-r from-ibm-blue to-ibm-cyan"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* ⌘K command palette trigger — desktop chip */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("abw:palette-open"))}
              aria-label="Open command palette (Ctrl or Cmd + K)"
              title="Command palette — ⌘K"
              className="hidden xl:inline-flex h-9 items-center gap-2 border border-hairline px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
            >
              <CommandIcon className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              K
            </button>
            <RollButton href="#contact" variant="primary" arrow className="hidden sm:inline-flex h-10 px-5 text-[13px]">
              Start a Project
            </RollButton>
            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-hairline-strong text-foreground focus-carbon"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile menu — Services expands inline with the 6 categories */}
        <div
          className={cn(
            "lg:hidden border-t border-hairline bg-background/95 backdrop-blur-md transition-[max-height] duration-300",
            open ? "max-h-[calc(100dvh-4rem)] overflow-y-auto" : "max-h-0 overflow-hidden border-t-0"
          )}
        >
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {/* Services accordion */}
            <div className="border-b border-hairline">
              <button
                type="button"
                onClick={() => setServicesExpanded((v) => !v)}
                aria-expanded={servicesExpanded}
                aria-controls="mobile-services"
                className="flex w-full items-center justify-between py-3.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground focus-carbon"
              >
                <span>
                  <span className="text-ibm-bright mr-3">01</span>
                  Services
                </span>
                <ChevronDown
                  className={cn("size-4 transition-transform duration-300", servicesExpanded && "rotate-180")}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
              <div
                id="mobile-services"
                className={cn(
                  "overflow-hidden transition-[max-height] duration-300",
                  servicesExpanded ? "max-h-[420px]" : "max-h-0"
                )}
              >
                <ul className="pb-2" aria-label="Service categories">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setServicesExpanded(false);
                          openCategory(c.slug);
                        }}
                        className="flex w-full items-center justify-between gap-3 py-2.5 pl-9 pr-2 text-left text-sm text-muted-foreground transition-colors hover:text-ibm-bright focus-carbon"
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                          {categoryServiceCount(c)} svc
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-hairline py-3.5 font-mono text-sm text-muted-foreground hover:text-foreground focus-carbon"
              >
                <span>
                  <span className="text-ibm-bright mr-3">0{i + 2}</span>
                  {item.label}
                </span>
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </a>
            ))}
            {/* ⌘K command palette trigger — mobile row */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new CustomEvent("abw:palette-open"));
              }}
              className="mt-4 flex w-full items-center justify-between border border-hairline px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
            >
              <span className="inline-flex items-center gap-2">
                <CommandIcon className="size-3.5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                Quick actions
              </span>
              <kbd className="border border-hairline bg-white px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <RollButton href="#contact" variant="primary" arrow className="mt-5 w-full" onClick={() => setOpen(false)}>
              Start a Project
            </RollButton>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SocialRow({ className }: { className?: string }) {
  /* Placeholder profile handles — swap for the studio's real profiles when available. */
  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/abwcurious" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/abwcurious" },
    { icon: Twitter, label: "X / Twitter", href: "https://x.com/abwcurious" },
  ];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socials.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} (opens in a new tab)`}
          title={label}
          className="inline-flex h-9 w-9 items-center justify-center border border-hairline text-muted-foreground hover:border-ibm-bright hover:text-ibm-bright transition-colors focus-carbon"
        >
          <Icon className="size-4" strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
