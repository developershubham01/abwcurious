"use client";

import { create } from "zustand";
import { useCallback, useEffect } from "react";
import { PRODUCT_BY_SLUG } from "./products";

/**
 * Hash-based virtual pages for the product line and the blog.
 *
 * The app intentionally stays a single Next.js route (`/`), so these
 * "pages" live on hash deep-links:
 *   #/products          → all-products overview
 *   #/products/<slug>   → one product's detail page
 *   #/blogs             → the blog / field-notes page
 *   #/sitemap           → the full sitemap (every page of the site)
 *   #/about             → company profile page
 *   #/events            → events & meetups page
 *   #/social            → social media page
 *   #/careers           → careers / open roles page
 * Plain anchors (`#contact`, `#services`, `#note/x`) are untouched — the
 * router only reacts to hashes that begin with `#/`.
 */

export type ViewRoute =
  | { kind: "none" }
  | { kind: "products" }
  | { kind: "product"; slug: string }
  | { kind: "blogs" }
  | { kind: "sitemap" }
  | { kind: "about" }
  | { kind: "events" }
  | { kind: "social" }
  | { kind: "careers" }
  | { kind: "contact" };

interface ViewState {
  route: ViewRoute;
  _set: (route: ViewRoute) => void;
}

export const useViewRoute = create<ViewState>((set) => ({
  route: { kind: "none" },
  _set: (route) => set({ route }),
}));

function routeFromLocation(): ViewRoute {
  if (typeof window === "undefined") return { kind: "none" };
  const hash = window.location.hash;
  const product = /^#\/products\/([\w-]+)/.exec(hash);
  if (product) {
    return PRODUCT_BY_SLUG.has(product[1]) ? { kind: "product", slug: product[1] } : { kind: "products" };
  }
  if (/^#\/products\/?/.test(hash)) return { kind: "products" };
  if (/^#\/blogs\/?/.test(hash)) return { kind: "blogs" };
  if (/^#\/sitemap\/?/.test(hash)) return { kind: "sitemap" };
  if (/^#\/about\/?/.test(hash)) return { kind: "about" };
  if (/^#\/events\/?/.test(hash)) return { kind: "events" };
  if (/^#\/social\/?/.test(hash)) return { kind: "social" };
  if (/^#\/careers\/?/.test(hash)) return { kind: "careers" };
  if (/^#\/contact\/?/.test(hash)) return { kind: "contact" };
  return { kind: "none" };
}

export function openProducts() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/products";
    return;
  }
  window.location.hash = "#/products";
}

export function openProduct(slug: string) {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = `/products/${slug}`;
    return;
  }
  window.location.hash = `#/products/${slug}`;
}

export function openBlogs() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/blogs";
    return;
  }
  window.location.hash = "#/blogs";
}

export function openSitemap() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/sitemap";
    return;
  }
  window.location.hash = "#/sitemap";
}

export function openAbout() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/about";
    return;
  }
  window.location.hash = "#/about";
}

export function openEventsPage() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/events";
    return;
  }
  window.location.hash = "#/events";
}

export function openSocial() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/social";
    return;
  }
  window.location.hash = "#/social";
}

export function openCareers() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/careers";
    return;
  }
  window.location.hash = "#/careers";
}

export function openContact() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/contact";
    return;
  }
  window.location.hash = "#/contact";
}

/** Close is always history-linear: strip the hash in place (never back()),
 *  so closing lands on the clean site even after hopping between pages. */
export function closeView() {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/";
    return;
  }
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  useViewRoute.getState()._set({ kind: "none" });
}

/** Close the takeover, then glide to a landing-page section anchor, or route to contact page. */
export function gotoSectionFromView(hash: string) {
  if (hash === "#contact" || hash === "#/contact") {
    openContact();
    return;
  }
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = `/${hash}`;
    return;
  }
  closeView();
  const id = hash.replace(/^#/, "");
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 420);
}

/**
 * Subscribe the store to browser history (hashchange + popstate) so the
 * back/forward buttons and shared deep links open/close the pages.
 * Returns true when the initial URL already carried a view hash.
 */
export function useViewRouter(): boolean {
  const sync = useCallback(() => {
    useViewRoute.getState()._set(routeFromLocation());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [sync]);

  const initial = typeof window !== "undefined" && routeFromLocation().kind !== "none";
  return initial;
}
