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
 * Plain anchors (`#contact`, `#services`, `#note/x`) are untouched — the
 * router only reacts to hashes that begin with `#/`.
 */

export type ViewRoute =
  | { kind: "none" }
  | { kind: "products" }
  | { kind: "product"; slug: string }
  | { kind: "blogs" }
  | { kind: "sitemap" };

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
  return { kind: "none" };
}

export function openProducts() {
  window.location.hash = "#/products";
}

export function openProduct(slug: string) {
  window.location.hash = `#/products/${slug}`;
}

export function openBlogs() {
  window.location.hash = "#/blogs";
}

export function openSitemap() {
  window.location.hash = "#/sitemap";
}

/** Close is always history-linear: strip the hash in place (never back()),
 *  so closing lands on the clean site even after hopping between pages. */
export function closeView() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  useViewRoute.getState()._set({ kind: "none" });
}

/** Close the takeover, then glide to a landing-page section anchor. */
export function gotoSectionFromView(hash: string) {
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
