"use client";

import { ProductsPortal } from "./product-page";
import { CategoryPortal } from "./category-page";
import { SitemapPortal } from "./sitemap-page";
import { CompanyPagesPortal } from "./company-pages";

/**
 * Mounts every hash-route virtual "page" site-wide, from the root layout:
 *   #/products          → all-products overview      (ProductsPortal)
 *   #/products/<slug>   → one product's detail page  (ProductsPortal)
 *   #/blogs             → blog / field-notes page    (ProductsPortal)
 *   #/services/<slug>   → service category playbook  (CategoryPortal)
 *   #/sitemap           → full sitemap of the site   (SitemapPortal)
 *   #/about             → company profile page       (CompanyPagesPortal)
 *   #/events            → events listing page        (CompanyPagesPortal)
 *   #/social            → social media page          (CompanyPagesPortal)
 *   #/careers           → careers / open roles page  (CompanyPagesPortal)
 *
 * Each takeover renders inside ViewShell, so every page carries the
 * site's REAL navbar + footer. ProductsPortal owns the history listener
 * (useViewRouter) that keeps the view store in sync with the URL hash;
 * CategoryPortal owns the catalog listener (useCatalogRouter).
 */
export function ViewPortals() {
  return (
    <>
      <ProductsPortal />
      <CategoryPortal />
      <SitemapPortal />
      <CompanyPagesPortal />
    </>
  );
}
