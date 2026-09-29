"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutGrid, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { SocialRow } from "./social-row";
import { COMPANY } from "@/data/company";
import { CATEGORIES } from "@/lib/catalog";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

/* ------------------------- nav model ------------------------- */

const MORE_LINKS = [
  { label: "Careers", href: "#/careers", desc: "Open roles at the studio" },
  { label: "Events", href: "#/events", desc: "Summits, workshops, meetups" },
  { label: "Social media", href: "#/social", desc: "Follow the journey" },
  { label: "Blog", href: "#/blogs", desc: "Field notes from the bench" },
  { label: "Gallery", href: "#gallery", desc: "Life at the studio" },
  { label: "Leadership", href: "#leadership", desc: "The people behind the products" },
  { label: "Achievements", href: "#achievements", desc: "Milestones on the timeline" },
  { label: "Sitemap", href: "#/sitemap", desc: "Every page, one map" },
] as const;

type MenuKey = "services" | "products" | "more";

const SPY_IDS = ["contact"];

/**
 * Carbon top-nav with IBM.com-style dropdown menus:
 *  - utility bar (32px #f4f4f4, hides below lg)
 *  - 48px white bar, 1px bottom hairline, 14px links
 *  - About · Services ▾ · Products ▾ · Contact us · [apps ▾]
 *  - active state = 2px IBM Blue underline
 *
 * Round-22: on virtual pages (variant="view" + onClose) the navbar gains
 * a square × close button after the CTA (desktop) and beside the
 * hamburger (mobile) — the takeover stays closable from anywhere now
 * that the breadcrumb strip scrolls away with the hero.
 */
export function Header({
  /* Kept for API compatibility with the view-shell chrome. */
  variant = "site",
  activeNav = null,
  onClose,
}: {
  variant?: "site" | "view";
  activeNav?: string | null;
  /** When provided the header renders a page-close × (view pages only). */
  onClose?: () => void;
} = {}) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* Scroll-spy — only Contact remains a landing anchor in the main nav */
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

  /* Close dropdown on outside pointer-down (capture: clicks inside panels bubble) */
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [menu]);

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

  const toggle = (key: MenuKey) => setMenu((m) => (m === key ? null : key));

  /* Shared classes for the three dropdown triggers */
  const triggerCls = (key: MenuKey, label: string, icon?: React.ReactNode) => {
    const isActive = highlighted === `#${key}` || (key === "more" && highlighted === "#more");
    const isOpen = menu === key;
    return (
      <button
        type="button"
        onClick={() => toggle(key)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`nav-menu-${key}`}
        className={cn(
          "focus-carbon relative inline-flex h-12 items-center gap-1.5 border-b-2 px-4 text-sm transition-colors duration-150",
          isActive || isOpen
            ? "border-primary font-medium text-ink"
            : "border-transparent text-ink-muted hover:border-ink/40 hover:text-ink"
        )}
      >
        {icon}
        {label}
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
    );
  };

  const panelCls =
    "absolute left-0 top-full z-50 min-w-[288px] border border-hairline bg-white py-2";

  const itemCls =
    "focus-carbon block px-4 py-2.5 text-sm text-ink-muted transition-colors hover:bg-ibm-layer hover:text-ink";

  const groupLabelCls = "px-4 pb-1 pt-2 text-xs text-ibm-subtle";

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

              {/* Desktop navigation — About / Services ▾ / Products ▾ / Contact us / [apps ▾] */}
              <div ref={navRef} className="hidden items-stretch lg:flex">
                <nav aria-label="Primary" className="flex items-stretch">
                  <ul className="flex items-stretch">
                    <li>
                      <a
                        href="#/about"
                        aria-current={highlighted === "#/about" ? "true" : undefined}
                        className={cn(
                          "focus-carbon relative inline-flex h-12 items-center border-b-2 px-4 text-sm transition-colors duration-150",
                          highlighted === "#/about"
                            ? "border-primary font-medium text-ink"
                            : "border-transparent text-ink-muted hover:border-ink/40 hover:text-ink"
                        )}
                      >
                        About
                      </a>
                    </li>
                    <li className="relative">
                      {triggerCls("services", "Services")}
                      {menu === "services" && (
                        <div id="nav-menu-services" className={panelCls} role="group" aria-label="Services menu">
                          <p className={groupLabelCls}>What we do — six playbooks</p>
                          <ul>
                            {CATEGORIES.map((c) => (
                              <li key={c.slug}>
                                <a
                                  href={`#/services/${c.slug}`}
                                  onClick={() => setMenu(null)}
                                  className={itemCls}
                                >
                                  {c.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="relative">
                      {triggerCls("products", "Products")}
                      {menu === "products" && (
                        <div id="nav-menu-products" className={panelCls} role="group" aria-label="Products menu">
                          <p className={groupLabelCls}>The product line</p>
                          <ul>
                            <li>
                              <a href="#/products" onClick={() => setMenu(null)} className={cn(itemCls, "font-medium text-ink")}>
                                All products — overview
                              </a>
                            </li>
                            {PRODUCTS.map((p) => (
                              <li key={p.slug}>
                                <a
                                  href={`#/products/${p.slug}`}
                                  onClick={() => setMenu(null)}
                                  className={itemCls}
                                >
                                  {p.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                    <li>
                      <a
                        href="#contact"
                        aria-current={highlighted === "contact" ? "true" : undefined}
                        className={cn(
                          "focus-carbon relative inline-flex h-12 items-center border-b-2 px-4 text-sm transition-colors duration-150",
                          highlighted === "contact"
                            ? "border-primary font-medium text-ink"
                            : "border-transparent text-ink-muted hover:border-ink/40 hover:text-ink"
                        )}
                      >
                        Contact us
                      </a>
                    </li>
                    <li className="relative">
                      {triggerCls("more", "More", <LayoutGrid className="size-4" strokeWidth={1.75} aria-hidden="true" />)}
                      {menu === "more" && (
                        <div
                          id="nav-menu-more"
                          className={cn(panelCls, "right-0 left-auto w-[320px]")}
                          role="group"
                          aria-label="Company pages menu"
                        >
                          <p className={groupLabelCls}>Company — pages & profiles</p>
                          <ul>
                            {MORE_LINKS.map((l) => (
                              <li key={l.href}>
                                <a
                                  href={l.href}
                                  onClick={() => setMenu(null)}
                                  className={cn(itemCls, "flex items-baseline justify-between gap-4")}
                                >
                                  <span className={cn(highlighted === "#more" && "text-ink")}>{l.label}</span>
                                  <span className="text-xs text-ibm-subtle">{l.desc}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  </ul>
                </nav>

                <a
                  href="#contact"
                  className="focus-carbon ml-3 inline-flex h-9 items-center self-center bg-primary px-4 text-sm text-white transition-colors duration-150 hover:bg-ibm-blue-hover active:bg-ibm-blue-active"
                >
                  Start a project
                </a>
              </div>

              {/* Hamburger — square 48px touch targets */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="focus-carbon inline-flex size-12 items-center justify-center text-ink transition-colors hover:bg-ibm-layer"
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

      {/* Mobile menu overlay — flat white sheet, grouped hairline rows */}
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
              {/* Primary */}
              <ul className="divide-y divide-hairline border-y border-hairline">
                {[
                  { label: "About", href: "#/about" },
                  { label: "Contact us", href: "#contact" },
                ].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
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

              {/* Services group */}
              <div className="mt-8">
                <p className="text-xs text-ibm-subtle">Services</p>
                <ul className="mt-2 divide-y divide-hairline border-y border-hairline">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <a
                        href={`#/services/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="focus-carbon block px-2 py-3 text-sm text-ink-muted transition-colors hover:bg-ibm-layer hover:text-ink"
                      >
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products group */}
              <div className="mt-8">
                <p className="text-xs text-ibm-subtle">Products</p>
                <ul className="mt-2 divide-y divide-hairline border-y border-hairline">
                  <li>
                    <a
                      href="#/products"
                      onClick={() => setOpen(false)}
                      className="focus-carbon block px-2 py-3 text-sm font-medium text-ink transition-colors hover:bg-ibm-layer"
                    >
                      All products — overview
                    </a>
                  </li>
                  {PRODUCTS.map((p) => (
                    <li key={p.slug}>
                      <a
                        href={`#/products/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="focus-carbon block px-2 py-3 text-sm text-ink-muted transition-colors hover:bg-ibm-layer hover:text-ink"
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company pages group */}
              <div className="mt-8">
                <p className="text-xs text-ibm-subtle">Company</p>
                <ul className="mt-2 divide-y divide-hairline border-y border-hairline">
                  {MORE_LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="focus-carbon block px-2 py-3 text-sm text-ink-muted transition-colors hover:bg-ibm-layer hover:text-ink"
                      >
                        {l.label}
                        <span className="ml-2 text-xs text-ibm-subtle">{l.desc}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
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
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
