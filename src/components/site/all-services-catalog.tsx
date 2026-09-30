"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, XCircle, Layers, Sparkles } from "lucide-react";
import { CATEGORIES, type Category, type ServiceItem } from "@/lib/catalog";
import { Eyebrow } from "./primitives";

interface FlattenedServiceItem {
  categorySlug: string;
  categoryName: string;
  categoryShort: string;
  categoryNum: string;
  groupLabel: string;
  name: string;
  blurb: string;
  itemSlug: string;
}

export function AllServicesCatalog({
  services,
}: {
  services: FlattenedServiceItem[];
}) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCat = selectedCat === "all" || s.categorySlug === selectedCat;
      const q = search.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.blurb.toLowerCase().includes(q) ||
        s.groupLabel.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [services, selectedCat, search]);

  return (
    <div id="all-services" className="scroll-mt-20">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow tone="blue">Complete Directory</Eyebrow>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
            All {services.length} services, itemised.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Search or filter by practice to find the exact engineering capability you need.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <label htmlFor="service-search" className="sr-only">
            Search services
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="service-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all services..."
            className="h-11 w-full border border-hairline bg-white pl-10 pr-9 text-sm text-ink placeholder:text-muted-foreground focus-carbon outline-none transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-ink"
            >
              <XCircle className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-hairline pb-4">
        <button
          type="button"
          onClick={() => setSelectedCat("all")}
          className={`focus-carbon px-3.5 py-1.5 text-xs font-medium transition-all ${
            selectedCat === "all"
              ? "bg-primary text-white shadow-sm"
              : "border border-hairline bg-white text-muted-foreground hover:border-primary/40 hover:text-ink"
          }`}
        >
          All practices ({services.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = services.filter((s) => s.categorySlug === cat.slug).length;
          const isActive = selectedCat === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCat(cat.slug)}
              className={`focus-carbon px-3.5 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "border border-hairline bg-white text-muted-foreground hover:border-primary/40 hover:text-ink"
              }`}
            >
              {cat.short} ({count})
            </button>
          );
        })}
      </div>

      {/* Results counter */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing <strong className="text-ink font-semibold">{filtered.length}</strong> of {services.length} services
        </span>
        {selectedCat !== "all" && (
          <button
            type="button"
            onClick={() => setSelectedCat("all")}
            className="text-primary hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Grid of services */}
      {filtered.length === 0 ? (
        <div className="mt-8 border border-dashed border-hairline p-12 text-center">
          <p className="text-base text-ink">No services match &ldquo;{search}&rdquo;.</p>
          <p className="mt-2 text-xs text-muted-foreground">Try clearing the search or choosing another category.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCat("all");
            }}
            className="mt-4 inline-flex items-center text-xs font-medium text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link
              key={item.categorySlug + "-" + item.itemSlug}
              href={`/services/${item.categorySlug}/${item.itemSlug}`}
              className="group relative flex flex-col justify-between bg-white p-6 transition-all duration-300 hover:bg-ibm-layer hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-primary font-medium">
                    {item.categoryNum} · {item.categoryShort}
                  </span>
                  <span className="truncate text-muted-foreground">{item.groupLabel}</span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium leading-snug text-ink transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.blurb}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-hairline/60 pt-3 text-xs">
                <span className="font-mono text-[11px] text-muted-foreground group-hover:text-ink transition-colors">
                  Dedicated playbook
                </span>
                <span className="font-mono text-[11px] font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Read details →
                </span>
              </div>
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
