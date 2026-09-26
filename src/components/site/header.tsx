"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { SocialRow } from "./social-row";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

const SPY_IDS = ["about", "leadership", "events", "gallery", "achievements", "contact"];

export function Header({
  /* Kept for API compatibility with the parked view-shell chrome. */
  variant = "site",
  activeNav = null,
}: {
  variant?: "site" | "view";
  activeNav?: string | null;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  /* Compact-on-scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy — highlights the section currently in view */
  useEffect(() => {
    if (variant === "view") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [variant]);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const highlighted = activeNav ?? active;

  return (
    <>
      <header
        data-site-header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled || open
            ? "border-b border-ink/[0.06] bg-white/75 shadow-[0_10px_40px_-18px_rgba(15,98,254,0.25)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500 ease-out",
              scrolled ? "h-14" : "h-16 sm:h-20"
            )}
          >
            <a
              href="#top"
              aria-label="ABWcurious — back to top"
              className="focus-carbon rounded-xl transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo compact={scrolled} />
            </a>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = highlighted === item.href.slice(1);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "focus-carbon relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                          isActive ? "text-ibm-blue-active" : "text-ink/75 hover:text-ink"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 rounded-full bg-ibm-blue/[0.09] ring-1 ring-inset ring-ibm-blue/15"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="focus-carbon inline-flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink shadow-sm backdrop-blur transition-all duration-300 hover:border-ibm-blue hover:text-ibm-bright lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  {open ? (
                    <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-white/95 pt-24 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto px-6 pb-10">
              <ul className="space-y-1.5">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="focus-carbon group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-colors hover:border-ibm-blue/15 hover:bg-ibm-blue/[0.05]"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-ibm-bright">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xl font-light tracking-tight text-ink">{item.label}</span>
                      </span>
                      <ArrowUpRight
                        className="size-4 text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ibm-bright"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="mt-10 space-y-5 border-t border-ink/[0.07] pt-8"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
                    Follow the journey
                  </p>
                  <SocialRow className="mt-3" />
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="focus-carbon inline-flex items-center gap-2 font-mono text-sm text-ibm-bright"
                >
                  {COMPANY.email}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
