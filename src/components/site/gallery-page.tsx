"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
  Camera,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Coffee,
  Layers,
  Heart,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { GALLERY, COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Studio", "Culture", "Events", "Workspace"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === "All"
    ? GALLERY
    : GALLERY.filter((item) => {
        const cat = (item.category || "").toLowerCase();
        if (selectedCategory === "Studio") return cat.includes("studio") || cat.includes("office");
        if (selectedCategory === "Culture") return cat.includes("culture") || cat.includes("people") || cat.includes("team");
        if (selectedCategory === "Events") return cat.includes("event") || cat.includes("summit") || cat.includes("conference");
        if (selectedCategory === "Workspace") return cat.includes("workspace") || cat.includes("gear") || cat.includes("desk");
        return true;
      });

  const total = filteredItems.length;

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, step]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-background">
      {/* ================= Hero Section — About Page Theme ================= */}
      <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
              Company Gallery
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 sm:mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Behind the builds. <span className="text-primary font-normal">Life at the studio.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 sm:mt-8 max-w-3xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              The keyboards, the whiteboard sketches, late-night deploys, and post-sprint celebrations. A living archive of the people and moments that define our engineering culture in Nerul, Navi Mumbai.
            </p>
          </Reveal>

          {/* Quick stats strip */}
          <Reveal delay={0.24}>
            <div className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
              <div className="bg-white p-6">
                <div className="text-3xl font-light text-ink tabular-nums">{GALLERY.length}+</div>
                <div className="text-xs text-ink-muted mt-1 font-mono uppercase">Curated moments</div>
              </div>
              <div className="bg-white p-6">
                <div className="text-3xl font-light text-primary">Navi Mumbai</div>
                <div className="text-xs text-ink-muted mt-1 font-mono uppercase">Studio location</div>
              </div>
              <div className="bg-white p-6">
                <div className="text-3xl font-light text-ink">Hybrid</div>
                <div className="text-xs text-ink-muted mt-1 font-mono uppercase">Distributed team</div>
              </div>
              <div className="bg-white p-6">
                <div className="text-3xl font-light text-primary">100%</div>
                <div className="text-xs text-ink-muted mt-1 font-mono uppercase">Curious culture</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Gallery Content & Filter ================= */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setLightboxIndex(null);
                    }}
                    className={cn(
                      "focus-carbon px-4 py-2 text-xs sm:text-sm font-medium transition-colors border",
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-hairline bg-white text-ink-muted hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-ink-muted">
              Showing {filteredItems.length} {filteredItems.length === 1 ? "photo" : "photos"}
            </p>
          </div>

          {/* Masonry Image Grid */}
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {filteredItems.map((item, i) => (
              <Reveal key={item.src + i} delay={(i % 3) * 0.06} y={15} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Open photo: ${item.caption}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden border border-hairline bg-ibm-layer outline-none transition-all duration-300 focus-carbon hover:border-primary hover:shadow-lg"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {/* Caption & category tags */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-2 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block border border-white/20 bg-black/60 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#79dce8] backdrop-blur-sm">
                      {item.category || "Studio"}
                    </span>
                    <h3 className="mt-2 text-sm font-medium text-white line-clamp-2">
                      {item.caption}
                    </h3>
                  </div>
                  {/* Expand icon pill */}
                  <span
                    className="absolute right-3 top-3 flex size-8 items-center justify-center bg-black/60 text-white backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Expand className="size-3.5" strokeWidth={1.75} />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Studio Culture & Pillars ================= */}
      <section className="border-t border-hairline bg-ibm-layer py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow tone="muted">Studio Culture</Eyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              How we build when the cameras aren&apos;t watching.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Great software isn&apos;t written in isolation. We treat our studio environment as an instrument designed for deep work, peer learning, and healthy irreverence for orthodoxy.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-hairline bg-white p-6 transition-all hover:border-hairline-strong">
              <div className="flex size-10 items-center justify-center border border-hairline bg-ibm-layer text-primary">
                <Coffee className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-ink">Open Coffee & Teardowns</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Every Friday afternoon, someone grabs the projector and tears down an interesting architecture, a quirky CSS technique, or an open-source paper.
              </p>
            </div>

            <div className="border border-hairline bg-white p-6 transition-all hover:border-hairline-strong">
              <div className="flex size-10 items-center justify-center border border-hairline bg-ibm-layer text-primary">
                <Layers className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-ink">Analog Meets Digital</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Before writing a single migration or React component, ideas live on magnetic glass boards. We prototype flow before writing code.
              </p>
            </div>

            <div className="border border-hairline bg-white p-6 transition-all hover:border-hairline-strong">
              <div className="flex size-10 items-center justify-center border border-hairline bg-ibm-layer text-primary">
                <Heart className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-ink">People Over Pedigree</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                We value curiosity, velocity, and craftsmanship over formal credentials. Some of our best engineers are self-taught tinkerers.
              </p>
            </div>
          </div>

          {/* Invitation Banner */}
          <div className="mt-14 border border-hairline bg-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Visit Our Studio</span>
              <h3 className="mt-2 text-2xl font-light text-ink">Passing through Nerul, Navi Mumbai?</h3>
              <p className="mt-1 text-sm text-ink-muted max-w-xl">
                We love meeting founders, fellow designers, and open-source contributors. Drop by our studio for a conversation.
              </p>
            </div>
            <RollButton href="/contact" variant="primary" arrow>
              Get in touch
            </RollButton>
          </div>
        </div>
      </section>

      {/* ================= Lightbox Dialog ================= */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(v) => {
          if (!v) setLightboxIndex(null);
        }}
      >
        <DialogContent
          className="max-w-5xl border border-white/10 bg-black/95 p-0 text-white shadow-2xl backdrop-blur-2xl"
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root>
            <DialogTitle>Photo Preview</DialogTitle>
          </VisuallyHidden.Root>

          {activeItem && (
            <div className="relative flex flex-col">
              {/* Media viewer */}
              <div className="relative aspect-[16/9] w-full items-center justify-center overflow-hidden bg-black p-2">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Left/Right nav buttons */}
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="focus-carbon absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="focus-carbon absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              {/* Caption footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 bg-zinc-950 px-6 py-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="border border-white/20 bg-white/10 px-2 py-0.5 text-xs font-mono text-[#79dce8]">
                      {activeItem.category || "Studio"}
                    </span>
                    <span className="text-xs text-white/50">
                      {lightboxIndex! + 1} of {filteredItems.length}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/90">{activeItem.caption}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs text-white/40 font-mono">Use ← → arrow keys</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
