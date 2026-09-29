"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
 * Round-22: the header is the only fixed chrome — the breadcrumb strip
 * now lives ONLY in the page's hero section (it scrolls away with the
 * content instead of sticking under the navbar, where it used to be
 * clipped). A square × in the navbar itself keeps the takeover closable
 * from anywhere (desktop + mobile), so the strip no longer has to stick.
 *
 * While a takeover is mounted, a capture-phase interceptor turns plain
 * `#section` anchors (footer CTAs, "About", "Start a Project", dropdown
 * rail links…) into close-then-glide navigations, so every link keeps
 * working inside the takeover.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Anchor interceptor — keeps #section links working inside takeovers  */
/* ------------------------------------------------------------------ */

function useViewAnchorInterceptor(onClose: () => void) {
  useEffect(() => {
    const onCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
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
  const pathname = usePathname();
  const isStandalone = Boolean(pathname && pathname !== "/");

  useViewAnchorInterceptor(onClose);

  if (isStandalone) {
    return (
      <div className="flex-1 flex flex-col pt-12 lg:pt-20">
        {children}
      </div>
    );
  }

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
      <div className="flex-1 flex flex-col pt-12 lg:pt-20">
        {children}
      </div>
      <Footer />
    </motion.div>
  );
}
