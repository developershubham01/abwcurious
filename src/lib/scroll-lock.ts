/**
 * Shared scroll-lock with reference counting.
 *
 * Multiple full-screen layers (product/blog/category/sitemap takeovers,
 * dialogs) can overlap while one closes and another opens in the same
 * commit. Each layer capturing/restoring `body.overflow` independently
 * races: a portal opening while another is closing captures "hidden" as
 * the previous value, and the chain of restores leaks the lock — the
 * page becomes unscrollable.
 *
 * acquire() hides the scrollbar on the FIRST acquire (capturing the
 * original value once); release() restores it on the LAST release.
 */

let count = 0;
let previous: string | null = null;

export function lockScroll(): void {
  if (typeof document === "undefined") return;
  if (count === 0) {
    previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  count += 1;
}

export function unlockScroll(): void {
  if (typeof document === "undefined") return;
  count = Math.max(0, count - 1);
  if (count === 0) {
    document.body.style.overflow = previous ?? "";
    previous = null;
  }
}
