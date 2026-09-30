"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORIES, CATEGORY_BY_SLUG, categoryServiceCount, slugify, type Category } from "@/lib/catalog";
import { closeCategory, openCategory, useCatalogRoute, useCatalogRouter } from "@/lib/catalog-route";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { useInquiryStore } from "@/lib/store";
import { Eyebrow, RollButton } from "./primitives";
import { SplitText, Typewriter, Ticker } from "./text-anim";
import { SaasDemo } from "./saas-demo";
import { ViewShell } from "./view-shell";

/**
 * Full-screen service-category "pages" on hash routes #/services/<slug>.
 * The site stays a single Next.js route; these are in-app takeovers with
 * their own scroll, deep-linkable and wired to the browser back button.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function CategoryPortal() {
  useCatalogRouter();
  const slug = useCatalogRoute((s) => s.slug);
  const category = slug ? CATEGORY_BY_SLUG.get(slug) : null;
  const lastFocused = useRef<HTMLElement | null>(null);

  /* focus capture + restore */
  useEffect(() => {
    if (category && !lastFocused.current) {
      lastFocused.current = document.activeElement as HTMLElement | null;
    }
    if (!category && lastFocused.current) {
      lastFocused.current.focus?.();
      lastFocused.current = null;
    }
  }, [category]);

  /* scroll lock + document title while a page is open */
  useEffect(() => {
    if (!category) return;
    const prevTitle = document.title;
    document.title = `${category.name} — ABWcurious Services`;
    lockScroll();
    return () => {
      document.title = prevTitle;
      unlockScroll();
    };
  }, [category]);

  return (
    <AnimatePresence mode="wait">
      {category && <CategoryPage key={category.slug} category={category} />}
    </AnimatePresence>
  );
}

export function CategoryPage({ category }: { category: Category }) {
  const index = CATEGORIES.findIndex((c) => c.slug === category.slug);
  const prev = CATEGORIES[(index - 1 + CATEGORIES.length) % CATEGORIES.length];
  const next = CATEGORIES[(index + 1) % CATEGORIES.length];
  const count = categoryServiceCount(category);
  const setPresetService = useInquiryStore((s) => s.setPresetService);

  /* Escape closes — matching the site-wide dialog behaviour */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCategory();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close the takeover, then glide to the contact form with the category pre-filled */
  const startProject = () => {
    setPresetService(category.name);
    closeCategory();
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 420);
  };

  return (
    <ViewShell
      crumb={`Services / ${category.short}`}
      label={`${category.name} — service details`}
      activeNav="#/services"
      onClose={closeCategory}
    >
      {/* ================= hero ================= */}
      <div className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            >
              <Eyebrow className="justify-start">
                {category.num} / Category — {count} sub-services
              </Eyebrow>
            </motion.div>

            <h1 className="mt-5 text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <SplitText text={category.name} immediate delay={0.15} stagger={0.06} />
            </h1>

            <motion.p
              className="mt-5 text-sm text-primary sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Typewriter phrases={category.typewriter} prefix="→ " />
            </motion.p>

            <motion.p
              className="mt-5 max-w-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease: EASE }}
            >
              {category.description}
            </motion.p>

            {/* stats */}
            <motion.dl
              className="mt-8 grid grid-cols-3 divide-x divide-hairline border border-hairline bg-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
            >
              {category.stats.map((s, i) => (
                <div key={s.label} className={i === 0 ? "px-4 py-4" : "px-4 py-4"}>
                  <dt className="order-2 mt-1 text-xs text-ink-muted">
                    {s.label}
                  </dt>
                  <dd className="order-1 text-xl font-light tabular-nums text-ink sm:text-2xl">{s.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55, ease: EASE }}
            >
              <RollButton variant="primary" arrow onClick={startProject}>
                Start a project
              </RollButton>
              <RollButton
                variant="outline"
                onClick={() => document.getElementById("cat-services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse {count} services
              </RollButton>
            </motion.div>
          </div>

          {/* image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-hairline bg-card lg:mt-2">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* floating badge */}
            <span className="absolute -bottom-4 left-4 inline-flex items-center gap-2 border border-hairline bg-white px-3.5 py-2.5 text-xs text-ink-muted sm:left-6">
              <span className="size-1.5 rounded-full bg-ibm-success animate-pulse-dot" aria-hidden="true" />
              {count} services · SLA-backed
            </span>
          </motion.div>
        </div>
      </div>

      {/* ================= sub-service ticker ================= */}
      <Ticker
        items={category.groups.flatMap((g) => g.items.map((i) => i.name))}
        slow
        className="border-b border-hairline bg-ibm-layer py-3.5"
      />

      {/* ================= product tour (SaaS video) ================= */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">Product tour</Eyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
                See the {category.short.toLowerCase()} motion.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              A looping look at how our {category.short.toLowerCase()} engagements run — live systems, real tooling,
              zero slideware.
            </p>
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mx-auto max-w-4xl">
              <SaasDemo demo={category.demo} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= services ================= */}
      <div id="cat-services" className="border-b border-hairline scroll-mt-14">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <Eyebrow className="justify-start">What&apos;s included</Eyebrow>
          <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
            Every {category.short.toLowerCase()} service, itemised.
          </h2>

          <div className="mt-10 flex flex-col gap-10">
            {category.groups.map((group, gi) => (
              <div key={group.label}>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm tabular-nums text-ibm-subtle">
                    {category.num}.{gi + 1}
                  </span>
                  <h3 className="text-sm font-medium text-ink">{group.label}</h3>
                  <span className="hidden h-px flex-1 bg-hairline sm:block" aria-hidden="true" />
                  <span className="text-xs tabular-nums text-ink-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item, ii) => {
                    const itemSlug = slugify(item.name);
                    const href = `/services/${category.slug}/${itemSlug}`;
                    return (
                      <motion.div
                        key={item.name}
                        className="h-full"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-32px" }}
                        transition={{ duration: 0.45, delay: Math.min(ii * 0.05, 0.25), ease: EASE }}
                      >
                        <Link
                          href={href}
                          onClick={() => {
                            closeCategory();
                          }}
                          className="group relative flex h-full flex-col justify-between bg-white p-5 transition-colors duration-300 hover:bg-ibm-layer"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-primary">
                                {item.name}
                              </h4>
                              <ArrowUpRight
                                className="mt-0.5 size-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <span>Explore service</span>
                            <span aria-hidden="true">→</span>
                          </div>
                          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-ibm-blue transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                        </Link>
                      </motion.div>
                    );
                  })}
                  {/* invisible fillers AFTER the items keep the hairline gap
                      pattern clean when a group doesn't fill its last row */}
                  {Array.from({ length: (3 - (group.items.length % 3)) % 3 }).map((_, f) => (
                    <div key={`f3-${f}`} className="hidden bg-white xl:block" aria-hidden="true" />
                  ))}
                  {Array.from({ length: (2 - (group.items.length % 2)) % 2 }).map((_, f) => (
                    <div key={`f2-${f}`} className="hidden bg-white sm:block xl:hidden" aria-hidden="true" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= process ================= */}
      <div className="border-b border-hairline bg-ibm-layer">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <Eyebrow className="justify-start">How it runs</Eyebrow>
          <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
            Four steps, zero mystery.
          </h2>
          <ol className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-4">
            {category.process.map((step, si) => (
              <li key={step.title} className="relative bg-card p-6">
                <span className="text-4xl font-light tabular-nums text-ink/10" aria-hidden="true">
                  {String(si + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                {si < category.process.length - 1 && (
                  <ArrowRight
                    className="absolute -right-[13px] top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-card text-primary md:block"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ================= CTA band ================= */}
      <div className="bg-ibm-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-sm text-white/80">
                {category.num} / Get started
              </span>
              <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight tracking-tight sm:text-4xl">
                <SplitText text={`Ready to build with ${category.short}?`} immediate delay={0.1} />
              </h2>
              <p className="mt-3 max-w-xl text-white/75">
                Tell us the outcome you need. You&apos;ll get a scoped plan, a fixed timeline and a senior team on the
                first call.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <RollButton variant="light" arrow onClick={startProject}>
                Start a project
              </RollButton>
              <RollButton variant="outline-light" onClick={closeCategory}>
                Back to site
              </RollButton>
            </div>
          </div>
        </div>
      </div>

      {/* ================= prev / next ================= */}
      <nav aria-label="Category pagination" className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-hairline">
          <button
            type="button"
            onClick={() => openCategory(prev.slug)}
            className="group flex flex-col items-start gap-1.5 px-4 py-6 text-left transition-colors hover:bg-ibm-layer focus-carbon sm:px-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
              Previous · {prev.num}
            </span>
            <span className="text-sm sm:text-base">{prev.name}</span>
          </button>
          <button
            type="button"
            onClick={() => openCategory(next.slug)}
            className="group flex flex-col items-end gap-1.5 px-4 py-6 text-right transition-colors hover:bg-ibm-layer focus-carbon sm:px-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              Next · {next.num}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-sm sm:text-base">{next.name}</span>
          </button>
        </div>
      </nav>
    </ViewShell>
  );
}
