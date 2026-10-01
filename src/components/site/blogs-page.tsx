"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, Minus, Plus, Rss, Search, Sparkles, XCircle } from "lucide-react";
import { NOTES, type Block, type Note } from "@/lib/content-notes";
import { closeView, gotoSectionFromView } from "@/lib/view-route";
import { Eyebrow, RollButton } from "./primitives";
import { SplitText, Typewriter } from "./text-anim";
import { ViewShell } from "./view-shell";
import { cn } from "@/lib/utils";

const NOTE_COVERS: Record<string, string> = {
  "llm-in-production": "/images/hero-neural.jpg",
  "rag-retrieval-details": "/images/cat-ai.jpg",
  "design-systems-still-matter": "/images/cat-webdev.jpg",
};

/**
 * Blog page (#/blogs) — the studio's engineering journal. Same content as
 * the home Field-notes section, presented as full expandable articles with
 * smooth text animations.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const fmtDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
        >
          {block.type === "p" && <p className="max-w-3xl text-base leading-relaxed text-ink-muted">{block.text}</p>}
          {block.type === "h" && (
            <h4 className="flex items-center gap-2.5 pt-1 text-sm font-medium text-ink">
              <span className="h-px w-5 bg-ink" aria-hidden="true" />
              {block.text}
            </h4>
          )}
          {block.type === "ul" && (
            <ul className="max-w-3xl space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-ink-muted">
                  <span className="mt-3 size-1.5 shrink-0 bg-ink-muted" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {block.type === "code" && (
            <figure className="max-w-3xl border border-hairline-strong">
              <figcaption className="border-b border-hairline bg-ibm-layer px-4 py-2 text-sm text-ink-muted">
                {block.caption}
              </figcaption>
              <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-ink">
                {block.lines.join("\n")}
              </pre>
            </figure>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function BlogRow({ note, open, onToggle }: { note: (typeof NOTES)[number]; open: boolean; onToggle: () => void }) {
  const cover = NOTE_COVERS[note.slug];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn("border-b border-hairline last:border-b-0", open && "bg-ibm-layer")}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`blog-${note.slug}`}
        className="group flex w-full items-start gap-4 px-2 py-6 text-left focus-carbon sm:gap-6 sm:px-4"
      >
        <span className="mt-1 hidden text-sm text-ibm-subtle tabular-nums sm:block" aria-hidden="true">
          {note.index}
        </span>
        {cover && (
          <div className="relative hidden sm:block size-20 shrink-0 overflow-hidden border border-hairline bg-ibm-layer">
            <Image src={cover} alt="" fill className="object-cover" />
          </div>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2.5">
            <span className="border border-hairline bg-ibm-layer px-2 py-0.5 text-xs text-ink-muted">
              {note.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted tabular-nums">
              <CalendarDays className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              {fmtDate.format(new Date(note.date))}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <Clock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              {note.readTime}
            </span>
          </span>
          <span className="mt-2.5 block text-xl tracking-tight text-ink transition-colors group-hover:text-primary sm:text-2xl">
            {note.title}
          </span>
          <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-ink-muted">{note.excerpt}</span>
        </span>
        <span
          className={cn(
            "mt-1 inline-flex size-9 shrink-0 items-center justify-center border transition-colors",
            open ? "border-primary bg-primary text-white" : "border-hairline text-ink-muted group-hover:border-ink group-hover:bg-ibm-layer group-hover:text-ink"
          )}
          aria-hidden="true"
        >
          {open ? <Minus className="size-4" strokeWidth={1.5} /> : <Plus className="size-4" strokeWidth={1.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`blog-${note.slug}`}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-8 sm:px-4 sm:pl-[6rem]">
              <ArticleBlocks blocks={note.blocks} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function BlogsPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(NOTES[0]?.slug ?? null);
  const [filterTag, setFilterTag] = useState<string>("All");

  const tags = useMemo(() => ["All", ...Array.from(new Set(NOTES.map((n) => n.tag)))], []);

  const filteredNotes = useMemo(
    () => (filterTag === "All" ? NOTES : NOTES.filter((n) => n.tag === filterTag)),
    [filterTag]
  );

  return (
    <ViewShell
      crumb="Blog / Field notes"
      label="Blog — ABWcurious field notes"
      activeNav="#more"
      onClose={closeView}
    >
      <main className="flex-1">
        {/* hero — About Page Theme */}
        <section className="relative border-b border-hairline bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-primary sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-current inline-block" />
              Blog & Field Notes
            </p>
            <h1 className="mt-5 sm:mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Field notes from <span className="text-primary font-normal">the build floor.</span>
            </h1>
            <p className="mt-6 sm:mt-8 max-w-3xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              What we learn shipping AI products, SaaS platforms and stubborn migrations — written by the engineers who did the work.
            </p>
            <div className="mt-5 max-w-xl">
              <Typewriter
                prefix="This month: "
                phrases={["LLMs in production", "evals before features", "humans in the loop", "guardrails over vibes"]}
                className="text-sm text-ink-muted"
              />
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { v: String(NOTES.length).padStart(2, "0"), l: "Long-form articles" },
                { v: "Monthly", l: "Publishing cadence" },
                { v: "RSS", l: "Syndicated feed", span: true },
              ].map((s) => (
                <div key={s.l} className={cn("bg-background px-4 py-4", s.span && "max-sm:col-span-2")}>
                  <dd className="text-2xl text-ink tabular-nums">{s.v}</dd>
                  <dt className="mt-1 text-sm text-ink-muted">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Featured Visual Cards */}
        <section aria-label="Featured dispatches" className="border-b border-hairline bg-ibm-layer py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hairline pb-6">
              <div>
                <Eyebrow tone="muted">Featured Dispatches</Eyebrow>
                <h2 className="mt-2 text-2xl font-light text-ink tracking-tight sm:text-3xl">
                  Deep dives from our technical bench.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilterTag(t)}
                    className={cn(
                      "focus-carbon px-3 py-1 text-xs font-medium border transition-colors",
                      filterTag === t
                        ? "border-primary bg-primary text-white"
                        : "border-hairline bg-white text-ink-muted hover:border-hairline-strong hover:text-ink"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => {
                const cover = NOTE_COVERS[note.slug];
                return (
                  <article
                    key={note.slug}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenSlug(note.slug)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenSlug(note.slug);
                      }
                    }}
                    className="group flex flex-col overflow-hidden border border-hairline bg-white transition-all hover:border-primary hover:shadow-lg focus-carbon cursor-pointer"
                  >
                    {cover && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ibm-layer">
                        <Image
                          src={cover}
                          alt={note.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-3 left-3 border border-white/20 bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono text-white">
                          {note.tag}
                        </span>
                      </div>
                    )}
                    <div className="p-6 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-ink-muted">
                          <span className="font-mono text-primary">{fmtDate.format(new Date(note.date))}</span>
                          <span>·</span>
                          <span>{note.readTime}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-medium text-ink transition-colors group-hover:text-primary">
                          {note.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
                          {note.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs text-primary font-medium">
                        <span>Read full article</span>
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* articles expandable list */}
        <section aria-label="Articles" className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h3 className="text-sm font-mono uppercase tracking-wider text-ink-muted mb-6">
              Full Article Reader & Code Excerpts
            </h3>
            <div className="border-t border-hairline">
              {filteredNotes.map((note) => (
                <BlogRow
                  key={note.slug}
                  note={note}
                  open={openSlug === note.slug}
                  onToggle={() => setOpenSlug((cur) => (cur === note.slug ? null : note.slug))}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex flex-col items-start justify-between gap-6 border border-hairline bg-ibm-layer px-6 py-8 sm:px-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-2xl tracking-tight text-ink">Prefer a monthly email instead?</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
                  One email a month on AI, product engineering and design. Unsubscribe anytime.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/api/rss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 bg-white px-4 text-sm text-primary ring-1 ring-inset ring-primary transition-colors hover:bg-primary hover:text-white focus-carbon"
                >
                  <Rss className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  RSS feed
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <RollButton variant="primary" arrow onClick={() => gotoSectionFromView("#contact")}>
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
