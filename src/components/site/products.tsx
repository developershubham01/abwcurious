"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Eyebrow, Reveal, RollButton, SectionFrame } from "./primitives";
import MaskedHeading from "@/components/reactbits/MaskedHeading";
import ParticleText from "@/components/reactbits/ParticleText";
import { DepthCard, DepthLayer } from "@/components/reactbits/DepthCard";
import { PRODUCTS, productStatusTotals, type Product, type ProductStatus } from "@/lib/products";
import { openProduct, openProducts } from "@/lib/view-route";
import { useInquiryStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * "Our products" — the studio's own SaaS line on the landing page:
 * a MaskedHeading (image fills the letterforms), a ParticleText banner,
 * mouse-responsive DepthCards and a "View all products" jump to the
 * full product page (#/products).
 */

const STATUS_STYLE: Record<ProductStatus, string> = {
  live: "border-ibm-success/40 text-ibm-success",
  beta: "border-ibm-blue/40 text-ibm-blue",
  soon: "border-hairline-strong text-muted-foreground",
};

function StatusChip({ status, label }: { status: ProductStatus; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
        STATUS_STYLE[status]
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "live" && "bg-ibm-success animate-pulse-dot",
          status === "beta" && "bg-ibm-blue animate-pulse-dot",
          status === "soon" && "bg-muted-foreground/60"
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const setPresetService = useInquiryStore((s) => s.setPresetService);

  /* Prefill the contact form's "What do you need?" select via the shared
     pipeline (same one the product pages use), then glide to #contact. */
  const requestAccess = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPresetService(product.prefill);
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <DepthCard
        maxTilt={7}
        lift={12}
        className="group h-full focus-within:ring-2 focus-within:ring-ibm-blue focus-within:ring-offset-2"
        ariaLabel={`${product.name} — ${product.statusLabel}`}
      >
        <article
          role="button"
          tabIndex={0}
          aria-label={`${product.name} — open the product page`}
          onClick={() => openProduct(product.slug)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProduct(product.slug);
            }
          }}
          className="flex h-full cursor-pointer flex-col border border-hairline bg-white transition-[border-color,box-shadow] duration-300 group-hover:border-ibm-blue/50 group-hover:shadow-[0_28px_56px_-28px_rgba(15,98,254,0.28)]"
        >
          {/* image plane — 2D zoom inside its own clip so the 3D chain above stays intact */}
          <DepthLayer z={18}>
            <div className="relative aspect-[16/8] overflow-hidden border-b border-hairline bg-card">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              />
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </div>
          </DepthLayer>

          <div className="flex flex-1 flex-col p-6 lg:p-7">
            <DepthLayer z={30}>
              <div className="flex items-center justify-between gap-3">
                <StatusChip status={product.status} label={product.statusLabel} />
                <span className="font-mono text-4xl font-light text-ink/[0.08]" aria-hidden="true">
                  {product.num}
                </span>
              </div>
              <h3 className="mt-4 text-2xl tracking-tight">{product.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{product.tagline}</p>
            </DepthLayer>

            <DepthLayer z={14}>
              <ul className="mt-5 space-y-2.5" aria-label={`${product.name} features`}>
                {product.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-ibm-bright" strokeWidth={2} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2" aria-label={`${product.name} stack`}>
                {product.stack.slice(0, 3).map((chip) => (
                  <span
                    key={chip}
                    className="border border-hairline bg-ibm-blue/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </DepthLayer>

            <DepthLayer z={36} className="mt-auto pt-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-ibm-soft transition-colors group-hover:text-ibm-blue"
                  aria-hidden="true"
                >
                  Explore product
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </span>
                <button
                  type="button"
                  onClick={requestAccess}
                  className="font-mono text-xs text-muted-foreground underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-ibm-blue hover:decoration-ibm-blue focus-carbon"
                  aria-label={`${product.cta} — pre-fills the contact form for ${product.prefill}`}
                >
                  {product.cta}
                </button>
              </div>
            </DepthLayer>
          </div>
        </article>
      </DepthCard>
    </Reveal>
  );
}

export function Products() {
  const totals = productStatusTotals();

  return (
    <SectionFrame id="products">
      <div className="py-20 lg:py-24">
        <Reveal>
          <Eyebrow className="justify-start">02 / Products</Eyebrow>
        </Reveal>

        {/* MaskedHeading — the artwork fills the letterforms, parallax on hover */}
        <div className="mt-8">
          <MaskedHeading
            text="SaaS platforms built for scale"
            tag="h2"
            src="/images/prod-masked-band.jpg"
            align="left"
            weight={600}
            tracking={-0.035}
            lineHeight={1.04}
            textScale={0.085}
            fillScale={1.22}
            focalY={0.5}
            parallax={18}
            drift={10}
            reveal="rise"
            trigger="view"
            duration={1.15}
            stagger={0.08}
            className="max-w-4xl"
          />
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Client work funds the lab — and the lab ships software we run
              ourselves. Every platform below grew out of a real engagement and
              is maintained by the same team you'd hire.
            </p>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3.5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
              {totals.total} products · {totals.live} live · {totals.beta} beta
            </p>
          </div>
        </Reveal>

        {/* ParticleText band — the section title sampled into particles */}
        <Reveal>
          <div className="mt-12 border border-hairline bg-ibm-blue/[0.02]">
            <div className="h-[220px] sm:h-[260px]">
              <ParticleText
                text="OUR PRODUCTS"
                color="#0f62fe"
                highlightColor="#78a9ff"
                particleSize={2}
                density={4}
                scatter={170}
                gatherDuration={1500}
                stagger={380}
                pointerRepel={52}
                repelRadius={130}
                idleDrift={0.6}
                trigger="mount"
                fontSize="clamp(2.6rem, 9vw, 7rem)"
                fontWeight={700}
                glow
              />
            </div>
            <p className="border-t border-hairline px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Move your cursor through the field — the particles react
            </p>
          </div>
        </Reveal>

        {/* product cards — mouse-responsive depth cards, each opens its own page */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* View all products → full product page */}
        <Reveal>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border border-hairline bg-ibm-blue/[0.03] px-6 py-6 sm:flex-row">
            <p className="text-center font-mono text-xs text-muted-foreground sm:text-left">
              Products run on the same stack we deliver for clients — Next.js, TypeScript, Prisma and modern AI SDKs.
            </p>
            <RollButton variant="primary" arrow onClick={() => openProducts()} className="shrink-0">
              View all products
            </RollButton>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
