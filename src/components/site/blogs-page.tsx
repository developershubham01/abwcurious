"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, Minus, Plus, Rss } from "lucide-react";
import { NOTES, type Block } from "@/lib/content-notes";
import { closeView, gotoSectionFromView } from "@/lib/view-route";
import { Eyebrow, RollButton } from "./primitives";
import { SplitText, Typewriter } from "./text-anim";
import { ViewShell } from "./view-shell";
import { cn } from "@/lib/utils";

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
          {block.type === "p" && <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{block.text}</p>}
          {block.type === "h" && (
            <h4 className="flex items-center gap-2.5 pt-1 font-mono text-xs uppercase tracking-[0.18em] text-foreground">
              <span className="h-px w-5 bg-ibm-bright" aria-hidden="true" />
              {block.text}
            </h4>
          )}
          {block.type === "ul" && (
            <ul className="max-w-3xl space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground/85">
                  <span className="mt-2.5 size-1.5 shrink-0 bg-ibm-bright" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {block.type === "code" && (
            <figure className="max-w-3xl border border-hairline-strong">
              <figcaption className="border-b border-hairline bg-ibm-blue/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {block.caption}
              </figcaption>
              <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-foreground/85">
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn("border-b border-hairline last:border-b-0", open && "bg-ibm-blue/[0.015]")}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`blog-${note.slug}`}
        className="group flex w-full items-start gap-4 px-2 py-6 text-left focus-carbon sm:gap-6 sm:px-4"
      >
        <span className="mt-1 hidden font-mono text-sm text-ibm-bright sm:block" aria-hidden="true">
          {note.index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2.5">
            <span className="border border-hairline bg-ibm-blue/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {note.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <CalendarDays className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              {fmtDate.format(new Date(note.date))}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <Clock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              {note.readTime}
            </span>
          </span>
          <span className="mt-2.5 block text-xl tracking-tight text-foreground transition-colors group-hover:text-ibm-blue sm:text-2xl">
            {note.title}
          </span>
          <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-muted-foreground">{note.excerpt}</span>
        </span>
        <span
          className={cn(
            "mt-1 inline-flex size-9 shrink-0 items-center justify-center border transition-colors",
            open ? "border-ibm-bright bg-ibm-blue text-white" : "border-hairline text-muted-foreground group-hover:border-ibm-bright group-hover:text-ibm-bright"
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
            <div className="px-2 pb-8 sm:px-4 sm:pl-[4.5rem]">
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

  return (
    <ViewShell
      crumb="Blog / Field notes"
      label="Blog — ABWcurious field notes"
      onClose={closeView}
    >
      <main className="flex-1">
        {/* hero */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <Eyebrow className="justify-start">Blog — the engineering journal</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
              <SplitText text="Notes from" immediate />
              <br />
              <span className="text-ibm-bright">
                <SplitText text="the build floor" immediate delay={0.2} />
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              What we learn shipping AI products, SaaS platforms and stubborn
              migrations — written by the engineers who did the work.
            </p>
            <div className="mt-5 max-w-xl">
              <Typewriter
                prefix="This month: "
                phrases={["LLMs in production", "evals before features", "humans in the loop", "guardrails over vibes"]}
                className="font-mono text-sm text-ibm-soft"
              />
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { v: String(NOTES.length).padStart(2, "0"), l: "Long-form articles" },
                { v: "Monthly", l: "Publishing cadence" },
                { v: "RSS", l: "Syndicated feed", span: true },
              ].map((s) => (
                <div key={s.l} className={cn("bg-background px-4 py-4", s.span && "max-sm:col-span-2")}>
                  <dd className="font-mono text-2xl text-ibm-bright">{s.v}</dd>
                  <dt className="mt-1 text-xs text-muted-foreground">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* articles */}
        <section aria-label="Articles" className="border-b border-hairline">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="border-t border-hairline">
              {NOTES.map((note) => (
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
            <div className="flex flex-col items-start justify-between gap-6 border border-hairline bg-ibm-blue/[0.03] px-6 py-8 sm:px-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-2xl tracking-tight">Prefer a monthly email instead?</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  One email a month on AI, product engineering and design. Unsubscribe anytime.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/api/rss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 border border-hairline-strong bg-white px-5 font-mono text-[13px] text-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
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
