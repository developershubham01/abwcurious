"use client";

import { create } from "zustand";
import { useCallback, useEffect } from "react";
import { CATEGORY_BY_SLUG } from "./catalog";

/**
 * Hash-based virtual pages for the service catalog.
 *
 * The app intentionally stays a single Next.js route (`/`), so category
 * "pages" live on hash deep-links:  `#/services/<slug>`.
 * Plain anchors (`#contact`, `#services`, `#note/x`) are untouched — the
 * router only reacts to hashes that begin with `#/services/`.
 */

interface CatalogRouteState {
  slug: string | null;
  _setSlug: (slug: string | null) => void;
}

export const useCatalogRoute = create<CatalogRouteState>((set) => ({
  slug: null,
  _setSlug: (slug) => set({ slug: slug && CATEGORY_BY_SLUG.has(slug) ? slug : null }),
}));

function slugFromLocation(): string | null {
  if (typeof window === "undefined") return null;
  const m = /^#\/services\/([\w-]+)/.exec(window.location.hash);
  return m ? m[1] : null;
}

export function openCategory(slug: string) {
  window.location.hash = `#/services/${slug}`;
}

/** Close is always history-linear: strip the hash in place (never back()),
 *  so closing lands on the clean site even after prev/next hopping. */
export function closeCategory() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  useCatalogRoute.getState()._setSlug(null);
}

/**
 * Subscribe the store to browser history (hashchange + popstate) so the
 * back/forward buttons and shared deep links open/close category pages.
 * Returns true when the initial URL already carried a category hash.
 */
export function useCatalogRouter(): boolean {
  const sync = useCallback(() => {
    useCatalogRoute.getState()._setSlug(slugFromLocation());
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

  // Deep-link / refresh with a category hash → we didn't push it ourselves.
  const initial = typeof window !== "undefined" && slugFromLocation() !== null;
  return initial;
}
