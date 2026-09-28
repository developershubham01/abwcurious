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

/**
 * Carbon top-nav per DESIGN.md:
 *  - `utility-bar`  : 32px #f4f4f4 ribbon, caption type, hides below lg
 *  - `top-nav`      : 48px solid white bar, 1px bottom hairline, 14px links
 *  - active state   : 2px IBM Blue underline (Carbon selected-nav treatment)
 * No blur, no transparency, no rounded pills — engineered, flat, square.
 */
export function Header({
  /* Kept for API compatibility with the parked view-shell chrome. */
  variant = "site",
  activeNav = null,
}: {
  variant?: "site" | "view";
  activeNav?: string | null;
} = {}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

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
      <div className="fixed inset-x-0 top-0 z-50">
        {/* Carbon utility bar (32px, hides below lg per DESIGN.md) */}
        <div className="hidden h-8 items-center border-b border-hairline bg-ibm-layer text-xs text-ink-muted lg:flex">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
            <p className="truncate">{COMPANY.tagline}</p>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${COMPANY.email}`}
                className="focus-carbon transition-colors hover:text-ibm-bright"
              >
                {COMPANY.email}
              </a>
              <span aria-hidden="true" className="h-3 w-px bg-ink/25" />
              <span>{COMPANY.address}</span>
            </div>
          </div>
        </div>

        {/* Carbon top-nav (48px, solid white, 1px bottom hairline) */}
        <header data-site-header className="border-b border-hairline bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-12 items-center justify-between">
              <a
                href="#top"
                aria-label="ABWcurious — back to top"
                className="focus-carbon -m-1 p-1"
              >
                <Logo compact />
              </a>

              {/* Desktop navigation — Carbon selected = 2px blue underline */}
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-stretch">
                  {NAV_ITEMS.map((item) => {
                    const isActive = highlighted === item.href.slice(1);
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "focus-carbon relative inline-flex h-12 items-center border-b-2 px-4 text-sm transition-colors duration-150",
                            isActive
                              ? "border-primary font-medium text-ink"
                              : "border-transparent text-ink-muted hover:border-ink/40 hover:text-ink"
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-1">
                {/* Square primary CTA — Carbon button-primary at 36px bar height */}
                <a
                  href="#contact"
                  className="focus-carbon mr-1 hidden h-9 items-center bg-primary px-4 text-sm text-white transition-colors duration-150 hover:bg-ibm-blue-hover active:bg-ibm-blue-active lg:inline-flex"
                >
                  Start a project
                </a>

                {/* Mobile hamburger — square 48px touch target, no border */}
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="focus-carbon inline-flex size-12 items-center justify-center text-ink transition-colors hover:bg-ibm-layer lg:hidden"
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
          </div>
        </header>
      </div>

      {/* Mobile menu overlay — flat white sheet with hairline-divided rows */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-white pt-16 lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto px-6 pb-10">
              <ul className="divide-y divide-hairline border-y border-hairline">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="focus-carbon group flex items-center justify-between px-2 py-4 transition-colors hover:bg-ibm-layer"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-xs text-ibm-subtle">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-lg font-light text-ink">{item.label}</span>
                      </span>
                      <ArrowUpRight
                        className="size-4 text-ink/30 transition-colors group-hover:text-primary"
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
                transition={{ delay: 0.34, duration: 0.35 }}
                className="mt-8 space-y-5"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="focus-carbon flex h-12 items-center justify-center bg-primary text-sm text-white transition-colors hover:bg-ibm-blue-hover active:bg-ibm-blue-active"
                >
                  Start a project
                </a>
                <div>
                  <p className="text-sm text-ink-muted">Follow the journey</p>
                  <SocialRow className="mt-3" />
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  onClick={() => setOpen(false)}
                  className="focus-carbon inline-flex items-center gap-2 text-sm text-primary"
                >
                  {COMPANY.email}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href="#/sitemap"
                  onClick={() => setOpen(false)}
                  className="focus-carbon block inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  Sitemap — every page
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
