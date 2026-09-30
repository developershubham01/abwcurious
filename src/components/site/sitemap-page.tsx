"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  FileCode2,
  Home,
  Layers,
  Map as MapIcon,
  Newspaper,
  Package,
  Search,
  XCircle,
} from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";
import { PRODUCTS } from "@/lib/products";
import { closeView, openAbout, openBlogs, openCareers, openEventsPage, openProduct, openProducts, openSocial, useViewRoute } from "@/lib/view-route";
import { openCategory } from "@/lib/catalog-route";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { Eyebrow, RollButton } from "./primitives";
import { SplitText, Typewriter } from "./text-anim";
import { ViewShell } from "./view-shell";

/**
 * Sitemap page (#/sitemap) — an index of EVERY page on the site:
 * the live landing sections, all 6 product pages, all 6 service-category
 * pages and the resource destinations. Filterable, keyboard friendly,
 * and every row navigates for real.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type RowKind = "anchor" | "view" | "category" | "external" | "link";

interface SitemapRow {
  num: string;
  label: string;
  desc: string;
  target: string;
  kind: RowKind;
  /** anchor → href; view/category → hash route opener; external → url; link → route path */
  arg: string;
}

interface SitemapGroup {
  id: string;
  label: string;
  desc: string;
  rows: SitemapRow[];
}

const LANDING_SECTIONS: { id: string; label: string; desc: string }[] = [
  { id: "top", label: "Home", desc: "The hero — where curiosity starts" },
  { id: "about", label: "About", desc: "Who ABWcurious is and what we build" },
  { id: "leadership", label: "Leadership", desc: "The people behind the products" },
  { id: "achievements", label: "Achievements", desc: "Milestones on the journey timeline" },
  { id: "events", label: "Events", desc: "Summits, launches, offsites and workshops" },
  { id: "gallery", label: "Gallery", desc: "Moments from life at the studio" },
  { id: "follow", label: "Follow the journey", desc: "Every social channel, one band" },
  { id: "contact", label: "Contact", desc: "Project brief, email, phone and map" },
];

function buildGroups(): SitemapGroup[] {
  let n = 0;
  const nextNum = () => String(++n).padStart(2, "0");

  return [
    {
      id: "main",
      label: "Main site",
      desc: "Landing page sections — every anchor is one glide away",
      rows: LANDING_SECTIONS.map((s) => ({
        num: nextNum(),
        label: s.label,
        desc: s.desc,
        target: `#${s.id}`,
        kind: "anchor" as const,
        arg: `#${s.id}`,
      })),
    },
    {
      id: "company",
      label: "Company pages & profiles",
      desc: "Full dedicated pages — profile, careers, events, blog, gallery, leadership & milestones",
      rows: [
        {
          num: nextNum(),
          label: "About — company profile",
          desc: "Story, values, stats and studio facts",
          target: "/about",
          kind: "link",
          arg: "/about",
        },
        {
          num: nextNum(),
          label: "Careers",
          desc: "Open roles at the studio",
          target: "/careers",
          kind: "link",
          arg: "/careers",
        },
        {
          num: nextNum(),
          label: "Events",
          desc: "Summits, workshops, meetups",
          target: "/events",
          kind: "link",
          arg: "/events",
        },
        {
          num: nextNum(),
          label: "Social media",
          desc: "Follow the journey",
          target: "/social",
          kind: "link",
          arg: "/social",
        },
        {
          num: nextNum(),
          label: "Blog",
          desc: "Field notes from the bench",
          target: "/blogs",
          kind: "link",
          arg: "/blogs",
        },
        {
          num: nextNum(),
          label: "Gallery",
          desc: "Life at the studio",
          target: "/gallery",
          kind: "link",
          arg: "/gallery",
        },
        {
          num: nextNum(),
          label: "Leadership",
          desc: "The people behind the products",
          target: "/leadership",
          kind: "link",
          arg: "/leadership",
        },
        {
          num: nextNum(),
          label: "Achievements",
          desc: "Milestones on the timeline",
          target: "/achievements",
          kind: "link",
          arg: "/achievements",
        },
        {
          num: nextNum(),
          label: "Sitemap",
          desc: "Every page, one map",
          target: "/sitemap",
          kind: "link",
          arg: "/sitemap",
        },
      ],
    },
    {
      id: "products",
      label: "Products",
      desc: "Full pages on hash routes — overview plus one page per platform",
      rows: [
        {
          num: nextNum(),
          label: "All products — overview",
          desc: "The full SaaS line with status, stack and demos",
          target: "#/products",
          kind: "view",
          arg: "products",
        },
        ...PRODUCTS.map((p) => ({
          num: nextNum(),
          label: p.name,
          desc: p.tagline,
          target: `#/products/${p.slug}`,
          kind: "view" as const,
          arg: p.slug,
        })),
      ],
    },
    {
      id: "services",
      label: "Services",
      desc: "Category playbooks — each opens a full page with 12 sub-services",
      rows: CATEGORIES.map((c) => ({
        num: nextNum(),
        label: c.name,
        desc: `${c.short} · ${c.num} practice`,
        target: `#/services/${c.slug}`,
        kind: "category" as const,
        arg: c.slug,
      })),
    },
    {
      id: "resources",
      label: "Resources",
      desc: "Blog, feeds and studio utilities",
      rows: [
        {
          num: nextNum(),
          label: "Blog — field notes",
          desc: "Long-form articles from the build floor",
          target: "#/blogs",
          kind: "view",
          arg: "blogs",
        },
        {
          num: nextNum(),
          label: "RSS feed",
          desc: "Syndicated XML — new notes land here first",
          target: "/api/rss",
          kind: "external",
          arg: "/api/rss",
        },
        {
          num: nextNum(),
          label: "vCard — contact card",
          desc: "One-tap save of the studio's details",
          target: "/api/vcard",
          kind: "external",
          arg: "/api/vcard",
        },
        {
          num: nextNum(),
          label: "Sitemap XML",
          desc: "Machine-readable index for crawlers",
          target: "/sitemap.xml",
          kind: "external",
          arg: "/sitemap.xml",
        },
      ],
    },
  ];
}

const GROUP_ICONS: Record<string, typeof Home> = {
  main: Home,
  company: Home,
  products: Package,
  services: Layers,
  resources: Newspaper,
};

export function SitemapPortal() {
  const route = useViewRoute((s) => s.route);
  const open = route.kind === "sitemap";
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open && !lastFocused.current) {
      lastFocused.current = document.activeElement as HTMLElement | null;
    }
    if (!open && lastFocused.current) {
      lastFocused.current?.focus?.();
      lastFocused.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevTitle = document.title;
    document.title = "Sitemap — ABWcurious";
    lockScroll();
    return () => {
      document.title = prevTitle;
      unlockScroll();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return <AnimatePresence mode="wait">{open && <SitemapPage key="sitemap" />}</AnimatePresence>;
}

function SitemapRowButton({
  row,
  index,
  total,
}: {
  row: SitemapRow;
  index: number;
  total: number;
}) {
  const inner = (
    <>
      <span className="w-7 shrink-0 text-sm text-ibm-subtle tabular-nums" aria-hidden="true">
        {row.num}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-ink">{row.label}</span>
        <span className="mt-0.5 block truncate text-sm text-ink-muted">{row.desc}</span>
      </span>
      <span
        className="hidden shrink-0 text-xs text-ibm-subtle tabular-nums md:block"
        aria-hidden="true"
      >
        {row.target}
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-ibm-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </>
  );

  const cls =
    "group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-ibm-layer focus-carbon sm:gap-4 sm:px-5";

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.4), ease: EASE }}
      style={{ width: "100%" }}
      aria-setsize={total}
      aria-posinset={index + 1}
    >
      {row.kind === "link" ? (
        <Link href={row.arg} className={cls}>
          {inner}
        </Link>
      ) : row.kind === "anchor" ? (
        <a href={row.arg} className={cls}>
          {inner}
        </a>
      ) : row.kind === "external" ? (
        <a href={row.arg} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : row.kind === "view" ? (
        <button
          type="button"
          onClick={() =>
            row.arg === "products"
              ? openProducts()
              : row.arg === "blogs"
                ? openBlogs()
                : row.arg === "about"
                  ? openAbout()
                  : row.arg === "careers"
                    ? openCareers()
                    : row.arg === "events"
                      ? openEventsPage()
                      : row.arg === "social"
                        ? openSocial()
                        : openProduct(row.arg)
          }
          className={cls}
        >
          {inner}
        </button>
      ) : (
        /* category — service category playbook page */
        <button
          type="button"
          onClick={() => openCategory(row.arg)}
          className={cls}
        >
          {inner}
        </button>
      )}
    </motion.li>
  );
}

export function SitemapPage() {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => buildGroups(), []);
  const total = groups.reduce((acc, g) => acc + g.rows.length, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        rows: g.rows.filter((r) =>
          `${r.label} ${r.desc} ${r.target}`.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.rows.length > 0);
  }, [groups, query]);

  const shown = filtered.reduce((acc, g) => acc + g.rows.length, 0);

  return (
    <ViewShell crumb="Sitemap / Every page" label="Sitemap — every page of the site" activeNav="#more" onClose={closeView}>
      <main className="flex-1">
        {/* ================= hero ================= */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <Eyebrow className="justify-start">
              Sitemap — {total} destinations · every page indexed
            </Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-6xl">
              <SplitText text="Every page," immediate />
              <br />
              <SplitText text="one map." immediate delay={0.22} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              The whole studio site on a single page — landing sections, all six product
              pages, all six service playbooks and the utilities. Pick a destination.
            </p>
            <div className="mt-5 max-w-xl">
              <Typewriter
                prefix="Try: "
                phrases={["“qr” finds IntelliQR", "“360” finds the 360 platforms", "“rss” finds the feed"]}
                className="text-sm text-ink-muted"
              />
            </div>

            {/* filter — Carbon text-input: gray field, charcoal rule, 2px blue focus underline */}
            <div className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-12 flex-1 items-center border-b border-[#8d8d8d] bg-ibm-layer transition-colors focus-within:border-b-2 focus-within:border-primary">
                <Search className="ml-3 size-4 shrink-0 text-ibm-subtle" strokeWidth={1.5} aria-hidden="true" />
                <label htmlFor="sitemap-filter" className="sr-only">
                  Filter destinations
                </label>
                <input
                  id="sitemap-filter"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter pages — try “qr” or “rss”"
                  className="h-full w-full min-w-0 bg-transparent px-3 text-sm text-ink placeholder:text-ibm-subtle focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear filter"
                    className="mr-2 inline-flex size-7 shrink-0 items-center justify-center text-ibm-subtle transition-colors hover:text-ink focus-carbon"
                  >
                    <XCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                )}
              </div>
              <p
                className="shrink-0 border border-hairline bg-ibm-layer px-3 py-2.5 text-sm text-ink-muted tabular-nums"
                role="status"
              >
                {shown} / {total} destinations
              </p>
            </div>
          </div>
        </section>

        {/* ================= groups ================= */}
        <section aria-label="All destinations" className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-12">
            {filtered.length === 0 ? (
              <div className="border border-hairline bg-ibm-layer px-6 py-14 text-center">
                <MapIcon className="mx-auto size-6 text-ibm-subtle" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-4 text-sm text-ink-muted">
                  No destinations match “{query}” — try “qr”, “blogs” or “rss”.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                {filtered.map((group, gi) => {
                  const GroupIcon = GROUP_ICONS[group.id] ?? MapIcon;
                  return (
                    <motion.section
                      key={group.id}
                      aria-label={group.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: gi * 0.08, ease: EASE }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t-2 border-ink pt-4">
                        <h2 className="inline-flex items-center gap-2.5 text-xl tracking-tight text-ink">
                          <GroupIcon className="size-4 text-ibm-subtle" strokeWidth={1.5} aria-hidden="true" />
                          {group.label}
                        </h2>
                        <p className="text-sm text-ink-muted tabular-nums">
                          {group.rows.length} {group.rows.length === 1 ? "page" : "pages"}
                        </p>
                      </div>
                      <p className="mt-1.5 text-sm text-ink-muted">{group.desc}</p>
                      <ul className="mt-4 divide-y divide-hairline border border-hairline bg-white">
                        {group.rows.map((row) => (
                          <SitemapRowButton
                            key={row.num}
                            row={row}
                            index={Number(row.num) - 1}
                            total={total}
                          />
                        ))}
                      </ul>
                    </motion.section>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex flex-col items-start justify-between gap-6 border border-hairline bg-ibm-layer px-6 py-8 sm:px-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-2xl tracking-tight text-ink">Can&apos;t find what you were looking for?</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
                  Skip the map — tell us what you need and a human answers within one business day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <RollButton href="/api/vcard" variant="outline">
                  <span className="inline-flex items-center gap-2">
                    <FileCode2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    Save contact card
                  </span>
                </RollButton>
                <RollButton href="#contact" variant="primary" arrow>
                  Get in touch
                </RollButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ViewShell>
  );
}
