"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./logo";
import { RollButton } from "./primitives";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Services", href: "#services" },
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

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
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

      {/* Sticky header */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-hairline bg-background/85 backdrop-blur-md"
            : "border-transparent bg-background/60 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="focus-carbon" aria-label="ABWcurious home">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative font-mono text-xs xl:text-[13px] transition-colors focus-carbon",
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

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden border-t border-hairline bg-background/95 backdrop-blur-md transition-[max-height] duration-300",
            open ? "max-h-[620px]" : "max-h-0 border-t-0"
          )}
        >
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-hairline py-3.5 font-mono text-sm text-muted-foreground hover:text-foreground focus-carbon"
              >
                <span>
                  <span className="text-ibm-bright mr-3">0{i + 1}</span>
                  {item.label}
                </span>
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </a>
            ))}
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
  const socials = [
    { icon: Github, label: "GitHub" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Twitter, label: "X / Twitter" },
  ];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socials.map(({ icon: Icon, label }) => (
        <a
          key={label}
          href="#top"
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center border border-hairline text-muted-foreground hover:border-ibm-bright hover:text-ibm-bright transition-colors focus-carbon"
        >
          <Icon className="size-4" strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
