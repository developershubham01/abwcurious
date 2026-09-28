"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MousePointer2,
} from "lucide-react";
import DitherVeil from "@/components/reactbits/DitherVeil";
import { DepthCard, DepthLayer } from "@/components/reactbits/DepthCard";
import { PRODUCTS, PRODUCT_BY_SLUG, productStatusTotals, type Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/catalog";
import { openCategory, useCatalogRoute } from "@/lib/catalog-route";
import {
  closeView,
  gotoSectionFromView,
  openProduct,
  useViewRoute,
  useViewRouter,
} from "@/lib/view-route";
import { BlogsPage } from "./blogs-page";
import { useInquiryStore } from "@/lib/store";
import { Eyebrow, RollButton } from "./primitives";
import { SplitText, Typewriter, Ticker } from "./text-anim";
import { ProductDemo } from "./product-demo";
import { ViewShell } from "./view-shell";
import { cn } from "@/lib/utils";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * Full-screen virtual "pages" for the product line on hash routes:
 *   #/products        → all-platforms overview
 *   #/products/<slug> → one product's detail page
 * Every page carries the site's REAL navbar and footer (via ViewShell),
 * so the takeover feels like a first-class page of the site.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Portal — route sync, focus & scroll management                      */
/* ------------------------------------------------------------------ */

export function ProductsPortal() {
  useViewRouter();
  const route = useViewRoute((s) => s.route);
  const catalogOpen = useCatalogOpen();
  const lastFocused = useRef<HTMLElement | null>(null);

  const active = !catalogOpen && route.kind !== "none";
  const title =
    route.kind === "product"
      ? `${PRODUCT_BY_SLUG.get(route.slug)?.name ?? "Product"} — ABWcurious`
      : route.kind === "products"
        ? "Our products — ABWcurious"
        : route.kind === "blogs"
          ? "Blog — ABWcurious field notes"
          : "";

  useEffect(() => {
    if (active && !lastFocused.current) {
      lastFocused.current = document.activeElement as HTMLElement | null;
    }
    if (!active && lastFocused.current) {
      lastFocused.current.focus?.();
      lastFocused.current = null;
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const prevTitle = document.title;
    document.title = title;
    lockScroll();
    return () => {
      document.title = prevTitle;
      unlockScroll();
    };
  }, [active, title]);

  /* Escape closes the takeover — matching dialog behaviour site-wide */
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <AnimatePresence mode="wait">
      {active && route.kind === "products" && <ProductsIndexPage key="products" />}
      {active && route.kind === "product" && (
        <ProductDetailPage key={route.slug} product={PRODUCT_BY_SLUG.get(route.slug)!} />
      )}
      {active && route.kind === "blogs" && <BlogsPage key="blogs" />}
    </AnimatePresence>
  );
}

/* Category pages take precedence over virtual pages when both hashes collide. */
function useCatalogOpen(): boolean {
  return useCatalogRoute((s) => s.slug !== null);
}

/* ------------------------------------------------------------------ */
/* Products overview page (#/products)                                 */
/* ------------------------------------------------------------------ */

const STATUS_DOT: Record<Product["status"], string> = {
  live: "bg-ibm-success",
  beta: "bg-ibm-blue",
  soon: "bg-ibm-subtle",
};

function ProductIndexCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08 * index, ease: EASE }}
    >
      <DepthCard maxTilt={6} lift={10} className="group h-full" ariaLabel={`${product.name} — open product page`}>
        <button
          type="button"
          onClick={() => openProduct(product.slug)}
          className="flex h-full w-full flex-col border border-hairline bg-white text-left transition-colors duration-300 focus-carbon group-hover:border-primary"
        >
          <DepthLayer z={18}>
            <div className="relative aspect-[16/8] overflow-hidden border-b border-hairline bg-card">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-hairline bg-white px-2 py-1 text-xs text-ink-muted">
                <span className={cn("size-1.5 rounded-full", STATUS_DOT[product.status])} aria-hidden="true" />
                {product.statusLabel}
              </span>
            </div>
          </DepthLayer>
          <div className="flex flex-1 flex-col p-6 lg:p-8">
            <DepthLayer z={26}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm tabular-nums text-ibm-subtle">{product.num}</span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-2 text-xl tracking-tight">{product.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
            </DepthLayer>
            <DepthLayer z={12} className="mt-auto pt-4">
              <div className="flex flex-wrap gap-1.5" aria-label={`${product.name} stack`}>
                {product.stack.slice(0, 3).map((chip) => (
                  <span key={chip} className="border border-hairline bg-ibm-layer px-1.5 py-0.5 text-[11px] text-ink-muted">
                    {chip}
                  </span>
                ))}
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary transition-colors group-hover:text-ibm-blue-hover">
                Explore product
                <ArrowRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </DepthLayer>
          </div>
        </button>
      </DepthCard>
    </motion.div>
  );
}

function ProductsIndexPage() {
  const totals = productStatusTotals();

  return (
    <ViewShell
      crumb="Products / All platforms"
      label="Our products — all platforms"
      activeNav="#/products"
      onClose={closeView}
    >
      <main className="flex-1">
        {/* hero */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <Eyebrow className="justify-start">The product line</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
              <SplitText text="SaaS platforms" immediate />
              <br />
              <span className="text-primary">
                <SplitText text="built for scale" immediate delay={0.22} />
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Client work funds the lab — and the lab ships software we run
              ourselves. Six platforms, one accountable team.
            </p>
            <div className="mt-5 max-w-xl">
              <Typewriter
                prefix="Now shipping: "
                phrases={[
                  "CyberIntelligence360 — security that thinks",
                  "TheCodeArena — where developers sharpen each other",
                  "Restaurant360 — the whole house, one system",
                  "StudySpark — learning that adapts",
                  "KapiKitab — your library, superintelligent",
                  "IntelliQR — print once, retarget forever",
                ]}
                className="text-sm text-primary"
              />
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
              {[
                { v: String(totals.total), l: "Platforms" },
                { v: String(totals.live), l: "Live in production" },
                { v: String(totals.beta), l: "In open beta" },
                { v: "12M+", l: "Scans+events / day" },
              ].map((s) => (
                <div key={s.l} className="bg-background px-4 py-4">
                  <dt className="order-2 mt-1 text-xs text-muted-foreground">{s.l}</dt>
                  <dd className="text-2xl font-light tabular-nums text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* platform grid */}
        <section aria-label="All platforms" className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {PRODUCTS.map((p, i) => (
                <ProductIndexCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* stack ticker */}
        <section aria-hidden="true" className="border-b border-hairline py-5">
          <Ticker
            items={[
              "Next.js", "TypeScript", "Prisma", "LLM & RAG", "WebRTC", "SIEM", "POS", "KDS",
              "Embeddings", "Edge redirects", "CRDT", "Analytics",
            ]}
            slow
          />
        </section>

        {/* CTA band */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="relative overflow-hidden bg-primary px-8 py-12 text-center sm:px-12">
              <div className="relative">
                <p className="text-sm text-white/80">Need one of these tailored to you?</p>
                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl">
                  Every platform started as a client problem. Yours could be next.
                </h2>
                <div className="mt-8">
                  <RollButton variant="light" arrow onClick={() => gotoSectionFromView("#contact")}>
                    Start a project
                  </RollButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ViewShell>
  );
}

/* ------------------------------------------------------------------ */
/* Product detail page (#/products/<slug>)                             */
/* ------------------------------------------------------------------ */

function ProductDetailPage({ product }: { product: Product }) {
  const index = PRODUCTS.findIndex((p) => p.slug === product.slug);
  const prev = PRODUCTS[(index - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];
  const setPresetService = useInquiryStore((s) => s.setPresetService);
  const demoRef = useRef<HTMLDivElement | null>(null);

  const requestAccess = () => {
    setPresetService(product.prefill);
    closeView();
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 420);
  };

  const relatedSlug = CATEGORIES.find((c) => c.name === product.prefill)?.slug;

  return (
    <ViewShell
      crumb={`Products / ${product.shortName}`}
      label={`${product.name} — product page`}
      activeNav="#/products"
      onClose={closeView}
    >
      <main className="flex-1">
        {/* ================= hero ================= */}
        <section className="border-b border-hairline">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-2 lg:py-20">
            <div>
              <Eyebrow className="justify-start">
                {product.num} / SaaS platform — {product.statusLabel}
              </Eyebrow>
              <h1 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
                <SplitText text={product.name} immediate />
              </h1>
              <div className="mt-5 min-h-[2rem]">
                <Typewriter phrases={[product.tagline]} typingMs={34} deletingMs={0} holdMs={3600} gapMs={0} className="text-sm text-primary" />
              </div>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{product.description}</p>

              <dl className="mt-9 grid max-w-xl grid-cols-3 gap-px border border-hairline bg-hairline">
                {product.metrics.map((m) => (
                  <div key={m.label} className="bg-background px-4 py-4">
                    <dd className="text-xl font-light tabular-nums text-ink sm:text-2xl">{m.value}</dd>
                    <dt className="mt-1 text-[11px] leading-snug text-muted-foreground">{m.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <RollButton variant="primary" arrow onClick={requestAccess}>
                  {product.cta}
                </RollButton>
                <RollButton
                  variant="outline"
                  onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  See it in motion
                </RollButton>
              </div>
            </div>

            {/* DitherVeil hero — the product artwork, dithered & revealable */}
            <div className="lg:pt-2">
              <div className="relative border border-hairline bg-white">
                <div className="relative h-[300px] sm:h-[380px] lg:h-[440px]">
                  <DitherVeil
                    src={product.image}
                    fit="cover"
                    pattern={product.dither.pattern}
                    palette={product.dither.palette}
                    pixelSize={3}
                    inkColor="#161616"
                    paperColor="#ffffff"
                    rimColor="#0f62fe"
                    rim={0.24}
                    revealRadius={170}
                    softness={0.65}
                    linger={1.1}
                    contrast={1.22}
                  />
                </div>
                <p className="flex items-center gap-2 border-t border-hairline px-4 py-2.5 text-xs text-ink-muted">
                  <MousePointer2 className="size-3 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  Dither reveal — move to see the platform in full colour · click for a burst
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= product tour demo ================= */}
        <section className="border-b border-hairline bg-ibm-layer" ref={demoRef}>
          <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
            <Eyebrow className="justify-start">Product tour — live mock</Eyebrow>
            <h2 className="mt-5 text-2xl tracking-tight sm:text-3xl">
              <SplitText text="Watch it work" immediate />
            </h2>
            <div className="mt-8">
              <ProductDemo kind={product.demo} />
            </div>
          </div>
        </section>

        {/* ================= features ================= */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <Eyebrow className="justify-start">What ships in the box</Eyebrow>
            <div className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {product.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                  className="flex items-start gap-3 bg-white p-6"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-ink-muted">{feature}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 border border-hairline bg-ibm-layer px-5 py-4">
              <span className="mr-2 text-sm text-ink-muted">Stack</span>
              {product.stack.map((chip) => (
                <span key={chip} className="border border-hairline bg-white px-2.5 py-1 text-[11px] text-ink-muted">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA band ================= */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="relative overflow-hidden bg-primary px-8 py-12 sm:px-12">
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm text-white/80">{product.statusLabel} · {product.name}</p>
                  <h2 className="mt-3 max-w-xl text-2xl font-light leading-tight tracking-tight text-white sm:text-3xl">
                    {product.cta} — talk to the team that builds it.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <RollButton variant="light" arrow onClick={requestAccess}>
                    {product.cta}
                  </RollButton>
                  {relatedSlug && (
                    <RollButton
                      variant="outline-light"
                      onClick={() => {
                        closeView();
                        window.setTimeout(() => openCategory(relatedSlug), 60);
                      }}
                    >
                      Explore related services
                    </RollButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= prev / next ================= */}
        <nav aria-label="More products" className="border-b border-hairline">
          <div className="mx-auto grid max-w-7xl gap-px bg-hairline px-0 sm:grid-cols-2">
            {[
              { p: prev, dir: "Previous platform", Icon: ArrowLeft },
              { p: next, dir: "Next platform", Icon: ArrowRight },
            ].map(({ p, dir, Icon }) => (
              <button
                key={dir}
                type="button"
                onClick={() => openProduct(p.slug)}
                className="group flex items-center gap-4 bg-background px-6 py-6 text-left transition-colors hover:bg-ibm-layer focus-carbon"
              >
                <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.5} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs text-ink-muted">{dir}</span>
                  <span className="mt-1 block truncate text-lg tracking-tight text-ink group-hover:text-primary">{p.name}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>
      </main>
    </ViewShell>
  );
}
