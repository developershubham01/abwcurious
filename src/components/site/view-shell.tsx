"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";

/**
 * Shared chrome for every full-screen virtual "page" (products, product
 * detail, blogs, service categories, sitemap).
 *
 * Round-15 upgrade: each takeover now carries the site's REAL navbar —
 * utility bar, logo, the five primary items with their mega-dropdowns,
 * ⌘K and "Start a Project" — plus the site's REAL footer (link columns,
 * newsletter, giant ABWCURIOUS wordmark). The old simplified top bar /
 * footer band are gone: "every page has navbar + footer" now literally
 * means the same navbar and footer as the landing page.
 *
 * While a takeover is mounted, a capture-phase interceptor turns plain
 * `#section` anchors (footer CTAs, "About", "Start a Project", dropdown
 * rail links…) into close-then-glide navigations, so every link keeps
 * working inside the takeover.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Breadcrumb strip — sits under the navbar inside the takeover        */
/* ------------------------------------------------------------------ */

function ViewBreadcrumb({ crumb, onClose }: { crumb: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  /* Move focus into the page (dialog behaviour) — the close control is
     the primary escape hatch, so it gets first focus. */
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="sticky top-16 z-10 border-b border-hairline bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-10 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <li className="hidden sm:inline">ABWcurious</li>
            <li className="hidden sm:inline text-hairline-strong" aria-hidden="true">
              /
            </li>
            <li className="truncate text-foreground">{crumb}</li>
          </ol>
        </nav>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 md:inline-flex">
          <kbd className="border border-hairline bg-white px-1 py-0.5" aria-hidden="true">
            Esc
          </kbd>
          to close
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close page (Escape)"
          className="inline-flex size-8 shrink-0 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
        >
          <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Anchor interceptor — keeps #section links working inside takeovers  */
/* ------------------------------------------------------------------ */

function useViewAnchorInterceptor(onClose: () => void) {
  useEffect(() => {
    const onCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.startsWith("#/")) return;
      if (anchor.target === "_blank") return;
      /* In-takeover anchors leave the page: close, then glide to the
         section on the landing document (mirrors gotoSectionFromView). */
      e.preventDefault();
      onClose();
      const id = href.replace(/^#/, "");
      window.setTimeout(() => {
        if (id === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 420);
    };
    document.addEventListener("click", onCapture, true);
    return () => document.removeEventListener("click", onCapture, true);
  }, [onClose]);
}

/* ------------------------------------------------------------------ */
/* ViewShell                                                           */
/* ------------------------------------------------------------------ */

export function ViewShell({
  crumb,
  label,
  activeNav,
  onClose,
  children,
}: {
  crumb: string;
  /** Accessible dialog label for the takeover. */
  label: string;
  /** Which primary nav item to underline, e.g. "#products". */
  activeNav?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useViewAnchorInterceptor(onClose);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-background"
      initial={{ opacity: 0, y: 28, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.28, ease: "easeIn" } }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <Header variant="view" activeNav={activeNav} />
      <ViewBreadcrumb crumb={crumb} onClose={onClose} />
      {children}
      <Footer />
    </motion.div>
  );
}
