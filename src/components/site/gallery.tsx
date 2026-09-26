"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { GALLERY } from "@/data/company";
import { cn } from "@/lib/utils";

/* --------------------------- masonry gallery ----------------------------- */

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const total = GALLERY.length;

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  );

  /* keyboard navigation while the lightbox is open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <section id="gallery" aria-label="Company gallery" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="justify-center font-mono text-xs uppercase tracking-[0.22em] text-ibm-soft">
              05 — Gallery
            </p>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            <SplitText text="Life at" />{" "}
            <SplitText text="ABWcurious." delay={0.12} wordClassName="text-gradient font-normal" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/60 sm:text-lg">
              The office, the people, the conferences and the behind-the-scenes chaos — a wall of
              moments that never made the pitch deck but define the culture.
            </p>
          </Reveal>
        </div>

        {/* masonry */}
        <div className="mt-14 columns-2 gap-4 md:columns-3 [column-fill:_balance]">
          {GALLERY.map((item, i) => (
            <Reveal key={item.src + i} delay={(i % 3) * 0.08} y={20} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Open photo — ${item.caption}`}
                aria-haspopup="dialog"
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-ink/[0.07] bg-[#eef3ff] shadow-[0_8px_30px_-16px_rgba(15,98,254,0.3)] outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-ibm-blue/60 hover:shadow-[0_22px_50px_-20px_rgba(15,98,254,0.5)]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                {/* hover overlay */}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">{item.caption}</span>
                </span>
                <span
                  className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <Expand className="size-3.5" strokeWidth={1.75} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ------------------------------ lightbox ------------------------------ */}
      <Dialog open={open} onOpenChange={(v) => !v && setIndex(null)}>
        <DialogContent className="max-h-[94dvh] w-[calc(100vw-2rem)] max-w-5xl overflow-hidden rounded-3xl border-white/15 bg-[#0b0f1c] p-0 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)] focus:outline-none">
          <VisuallyHidden.Root>
            <DialogTitle>
              {index !== null ? `Photo — ${GALLERY[index].caption}` : "Photo viewer"}
            </DialogTitle>
          </VisuallyHidden.Root>
          <AnimatePresence mode="wait">
            {index !== null && (
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative flex max-h-[76dvh] items-center justify-center bg-[#0b0f1c]">
                  <Image
                    src={GALLERY[index].src}
                    alt={GALLERY[index].alt}
                    width={GALLERY[index].width}
                    height={GALLERY[index].height}
                    priority
                    className="max-h-[76dvh] w-auto max-w-full object-contain"
                  />
                </div>

                {/* caption bar */}
                <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{GALLERY[index].caption}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                      {GALLERY[index].category} · {index + 1} / {total}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="focus-carbon flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-ink"
                    >
                      <ChevronLeft className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="focus-carbon flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-ink"
                    >
                      <ChevronRight className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </div>
                </figcaption>

                {/* edge arrows (desktop) */}
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className={cn(
                    "focus-carbon absolute left-4 top-[38%] hidden size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition-all hover:scale-105 hover:bg-black/60 lg:flex"
                  )}
                >
                  <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="focus-carbon absolute right-4 top-[38%] hidden size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition-all hover:scale-105 hover:bg-black/60 lg:flex"
                >
                  <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </motion.figure>
            )}
          </AnimatePresence>

          {/* explicit close (also has the shadcn X) */}
          <button
            type="button"
            onClick={() => setIndex(null)}
            aria-label="Close photo viewer"
            className="focus-carbon absolute -top-12 right-0 hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur transition-colors hover:bg-white hover:text-ink sm:flex"
          >
            Close
            <X className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
