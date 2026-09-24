"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3, Link2, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eyebrow, Reveal, SectionFrame } from "./primitives";
import { useToast } from "@/hooks/use-toast";
import { NOTES } from "@/lib/content-notes";
import type { Block } from "@/lib/content-notes";

/* ---------------- article renderer ---------------- */

function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if (b.type === "h") {
          return (
            <h3
              key={i}
              className="pt-3 font-mono text-xs uppercase tracking-[0.2em] text-ibm-soft"
            >
              <span className="mr-2 inline-block h-px w-5 bg-current align-middle" aria-hidden="true" />
              {b.text}
            </h3>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="space-y-2.5">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                  <span className="mt-2 size-1.5 shrink-0 bg-ibm-blue" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "code") {
          return (
            <figure key={i} className="border border-hairline bg-card">
              <figcaption className="border-b border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {b.caption}
              </figcaption>
              <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed text-foreground/90">
                {b.lines.join("\n")}
              </pre>
            </figure>
          );
        }
        return (
          <p key={i} className="text-[15px] leading-relaxed text-foreground/85">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

/* Content model + NOTES moved to src/lib/content-notes.ts (shared with /api/rss) */
/* ---------------- deep-link helpers ---------------- */

function slugFromHash(): string | null {
  const m = window.location.hash.match(/^#note\/([a-z0-9-]+)$/i);
  return m ? m[1] : null;
}

function shareUrl(slug: string) {
  return `${window.location.origin}/#note/${slug}`;
}

/* ---------------- section ---------------- */

export function Notes() {
  const { toast } = useToast();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  /* Open from deep link on first paint */
  useEffect(() => {
    const slug = slugFromHash();
    if (!slug || !NOTES.some((n) => n.slug === slug)) return;
    const raf = requestAnimationFrame(() => setOpenSlug(slug));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Keep dialog in sync with browser history (back button closes) */
  useEffect(() => {
    const onPop = () => {
      const slug = slugFromHash();
      setOpenSlug(slug && NOTES.some((n) => n.slug === slug) ? slug : null);
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const handleOpenChange = useCallback(
    (slug: string, open: boolean) => {
      if (open) {
        setOpenSlug(slug);
        history.pushState(null, "", `#note/${slug}`);
      } else {
        setOpenSlug(null);
        /* If we pushed a note hash, pop it so Back stays consistent */
        if (slugFromHash()) history.back();
      }
    },
    []
  );

  /* Jump between notes inside the open dialog; replaceState keeps history
     linear so the browser Back button always exits to the pre-dialog page. */
  const goToNote = useCallback((slug: string) => {
    setOpenSlug(slug);
    history.replaceState(null, "", `#note/${slug}`);
  }, []);

  async function copyLink(slug: string) {
    try {
      await navigator.clipboard.writeText(shareUrl(slug));
      setCopied(true);
      toast({ title: "Link copied", description: "Shareable deep link is on your clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  }

  return (
    <SectionFrame id="notes">
      <div className="py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow className="justify-start">09 / Field notes</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Notes from the <span className="text-ibm-bright">workbench.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Short, practical essays on AI engineering, retrieval and design systems — the same
              thinking we bring to client work.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-hairline bg-hairline lg:grid-cols-3">
          {NOTES.map((note, i) => (
            <Reveal key={note.slug} delay={0.08 * i} className="h-full">
              <Dialog
                open={openSlug === note.slug}
                onOpenChange={(open) => handleOpenChange(note.slug, open)}
              >
                <DialogTrigger asChild>
                  <article className="group flex h-full cursor-pointer flex-col bg-background p-7 transition-colors duration-300 hover:bg-ibm-blue/[0.04] focus-carbon">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-ibm-soft">{note.index}</span>
                      <span className="border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:border-ibm-bright group-hover:text-ibm-bright">
                        {note.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-normal leading-snug tracking-tight text-foreground transition-colors group-hover:text-ibm-bright">
                      {note.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {note.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-7">
                      <span className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                          {new Date(note.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                          {note.readTime}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-ibm-soft">
                        Read
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <span
                      className="mt-6 block h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-ibm-blue to-ibm-cyan transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </article>
                </DialogTrigger>

                <DialogContent className="max-h-[85vh] overflow-y-auto rounded-none border-hairline-strong bg-background p-0 sm:max-w-2xl">
                  <DialogHeader className="border-b border-hairline bg-card px-7 py-6">
                    <div className="flex items-center gap-3 pr-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      <span className="text-ibm-soft">{note.index}</span>
                      <span className="h-px w-4 bg-current" aria-hidden="true" />
                      <span className="border border-hairline px-2 py-0.5">{note.tag}</span>
                      <span className="ml-auto hidden sm:inline">{note.readTime} read</span>
                    </div>
                    <DialogTitle className="mt-4 pr-8 text-2xl font-light leading-snug tracking-tight sm:text-3xl">
                      {note.title}
                    </DialogTitle>
                    <DialogDescription className="sr-only">{note.excerpt}</DialogDescription>
                  </DialogHeader>

                  <div className="px-7 py-7">
                    <ArticleBody blocks={note.blocks} />

                    <div className="mt-9 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-xs text-muted-foreground">
                        — The ABWcurious field desk
                      </p>
                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          onClick={() => copyLink(note.slug)}
                          aria-label="Copy shareable link to this note"
                          className="focus-carbon inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-ibm-bright"
                        >
                          {copied ? (
                            <Check className="size-4 text-ibm-success" strokeWidth={2} aria-hidden="true" />
                          ) : (
                            <Link2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
                          )}
                          {copied ? "Copied" : "Copy link"}
                        </button>
                        <a
                          href="#contact"
                          className="focus-carbon inline-flex items-center gap-1.5 font-mono text-sm text-ibm-soft transition-colors hover:text-ibm-bright"
                        >
                          Put this to work
                          <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    {/* Prev / next article pager */}
                    {(() => {
                      const idx = NOTES.findIndex((n) => n.slug === note.slug);
                      const prev = idx > 0 ? NOTES[idx - 1] : null;
                      const next = idx < NOTES.length - 1 ? NOTES[idx + 1] : null;
                      return (
                        <nav
                          aria-label={`Note pagination — ${idx + 1} of ${NOTES.length}`}
                          className="mt-7 grid grid-cols-2 gap-px border border-hairline bg-hairline"
                        >
                          <button
                            type="button"
                            disabled={!prev}
                            onClick={() => prev && goToNote(prev.slug)}
                            className="group flex min-w-0 flex-col items-start gap-1 bg-background px-5 py-4 text-left transition-colors hover:bg-ibm-blue/[0.05] focus-carbon disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-background"
                          >
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                              Previous
                            </span>
                            <span className="w-full truncate text-sm text-foreground group-hover:text-ibm-bright">
                              {prev ? prev.title : "First note"}
                            </span>
                          </button>
                          <button
                            type="button"
                            disabled={!next}
                            onClick={() => next && goToNote(next.slug)}
                            className="group flex min-w-0 flex-col items-end gap-1 bg-background px-5 py-4 text-right transition-colors hover:bg-ibm-blue/[0.05] focus-carbon disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-background"
                          >
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                              Next
                              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                            </span>
                            <span className="w-full truncate text-sm text-foreground group-hover:text-ibm-bright">
                              {next ? next.title : "Last note"}
                            </span>
                          </button>
                        </nav>
                      );
                    })()}
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
