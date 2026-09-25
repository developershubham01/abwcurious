"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Command as CommandIcon,
  Compass,
  IdCard,
  Layers,
  MailPlus,
  PenLine,
  Phone,
  Rss,
  Terminal,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { CATEGORIES } from "@/lib/catalog";
import { openCategory } from "@/lib/catalog-route";

/**
 * ⌘K command palette — Carbon WHITE & BLUE restyle of shadcn/cmdk.
 * Global Ctrl/Cmd+K toggles it; the header chip, the footer "Quick
 * actions" trigger and the mobile menu row all dispatch the
 * "abw:palette-open" window event this component listens for.
 *
 * Groups: Navigate (section anchors), Studio actions (copy contacts,
 * vCard, newsletter, start-a-project), Console, Resources (RSS).
 */

const SECTIONS: { label: string; id: string; hint: string }[] = [
  { label: "Top", id: "top", hint: "Back to the hero" },
  { label: "Services", id: "services", hint: "What we build" },
  { label: "Products", id: "products", hint: "Software we ship" },
  { label: "About", id: "about", hint: "The studio" },
  { label: "Process", id: "process", hint: "How we ship" },
  { label: "Tech stack", id: "stack", hint: "Tools we trust" },
  { label: "Work", id: "work", hint: "Selected projects" },
  { label: "Case studies", id: "cases", hint: "Deep dives" },
  { label: "Pricing", id: "pricing", hint: "Engagement models" },
  { label: "FAQ", id: "faq", hint: "Common questions" },
  { label: "Notes", id: "notes", hint: "Engineering field notes" },
  { label: "Careers", id: "careers", hint: "Open roles" },
  { label: "Contact", id: "contact", hint: "Get in touch" },
];

const EMAIL = "hello@abwcurious.com";
const PHONE = "+91 99999 99999";

/* Singleton page-level state (only one palette is ever mounted). Kept as
   module variables, not refs: they are written from event handlers and
   read back from lifecycle callbacks, never during render. */
let pendingFocusEl: HTMLElement | null = null;
let activeTrackState: { done: boolean } | null = null;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  /* Global shortcuts + external open requests */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("abw:palette-open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("abw:palette-open", onOpen);
    };
  }, []);

  /* Tracked scroll state lives at module scope (see above). */

  /** Tracked scroll immune to the page's CSS smooth scrolling and to the
      lazy-image reflow cascade (scrolling near the wall triggers waves of
      image loads, each shifting the layout — the element keeps drifting
      away for many seconds). So: re-aim every frame, and stop only when 10s
      have passed without a needed correction (rAF timestamps — immune to
      the stability heuristics the bursty waves defeat), the 60s cap hits,
      or the user scrolls themselves. Defined early: navigate and the
      focus actions below close over it. */
  const trackScroll = useCallback((el: HTMLElement, align: "center" | "start") => {
    if (activeTrackState) activeTrackState.done = true;
    const state = { done: false };
    activeTrackState = state;
    const style = document.createElement("style");
    style.dataset.abwTrack = "1";
    style.textContent = "html{scroll-behavior:auto!important}";
    document.head.appendChild(style);
    const start = performance.now();
    let lastMove = start;
    const finish = () => {
      if (state.done) return;
      state.done = true;
      style.remove();
    };
    window.addEventListener("wheel", finish, { once: true, passive: true });
    window.addEventListener("touchmove", finish, { once: true, passive: true });
    const step = (now: number) => {
      if (state.done) return;
      const r = el.getBoundingClientRect();
      const target = align === "center" ? window.innerHeight / 2 - r.height / 2 : 96;
      const delta = r.top - target;
      if (Math.abs(delta) > 2) {
        window.scrollTo(0, window.scrollY + delta);
        lastMove = now;
      }
      if (now - lastMove > 10000 || now - start > 60000) {
        finish();
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  /** Hash navigation reuses the 96px scroll-padding offset. The tracked
      scroll keeps the section pinned through the lazy-image reflow waves. */
  const navigate = useCallback(
    (id: string) => {
      setOpen(false);
      requestAnimationFrame(() => {
        history.replaceState(null, "", `#${id}`);
        if (id === "top") {
          window.scrollTo(0, 0);
          return;
        }
        const el = document.getElementById(id);
        if (el) trackScroll(el, "start");
      });
    },
    [trackScroll]
  );

  const copyText = useCallback(
    async (text: string, label: string) => {
      setOpen(false);
      try {
        await navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard", description: `${label} · ${text}` });
      } catch {
        toast({ title: "Copy failed", description: "Clipboard unavailable in this context.", variant: "destructive" });
      }
    },
    [toast]
  );

  const downloadVcard = useCallback(() => {
    setOpen(false);
    window.location.href = "/api/vcard";
    toast({ title: "Downloading vCard", description: "ABWcurious contact card" });
  }, [toast]);

  const openConsole = useCallback(() => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("abw:console-open"));
  }, []);

  const openRss = useCallback(() => {
    setOpen(false);
    window.open("/api/rss", "_blank", "noopener");
  }, []);

  /** Scroll to the target field (locally captured) and toast so the
      result is discoverable. */
  const focusNewsletter = useCallback(() => {
    const el = document.getElementById("newsletter-email");
    pendingFocusEl = el;
    setOpen(false);
    toast({ title: "Newsletter box ready", description: "Scrolled to the footer — type your email." });
    if (el) trackScroll(el, "center");
  }, [toast, trackScroll]);

  const focusContactForm = useCallback(() => {
    const section = document.getElementById("contact");
    const el = document.getElementById("name");
    pendingFocusEl = el;
    setOpen(false);
    toast({ title: "Project brief opened", description: "Scrolled to the contact form." });
    if (section) trackScroll(section, "start");
  }, [toast, trackScroll]);

  const run = useCallback(
    (action: () => void) => () => action(),
    []
  );

  /** Substring AND-match over space-separated words. cmdk's default
      fuzzy filter lets loose subsequence matches through (query
      “newsletter” highlighted “Work” because DOM order beats score),
      so every search word must appear literally in the item value. */
  const filter = useCallback((value: string, search: string) => {
    const q = search.trim().toLowerCase();
    if (!q) return 1;
    const v = value.toLowerCase();
    return q.split(/\s+/).every((w) => v.includes(w)) ? 1 : 0;
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      onCloseAutoFocus={(e) => {
        e.preventDefault();
        const el = pendingFocusEl;
        pendingFocusEl = null;
        el?.focus({ preventScroll: true });
      }}
      filter={filter}
      title="Command palette"
      description="Jump to a section or run a studio action — Ctrl/Cmd + K"
      className="top-[8%] translate-y-0 rounded-none border-hairline-strong bg-white p-0 shadow-none sm:top-[10%]"
    >
      {/* Carbon top rail */}
      <div className="h-[3px] shrink-0 bg-gradient-to-r from-ibm-blue via-ibm-cyan to-ibm-blue" aria-hidden="true" />

      <CommandInput
        placeholder="Type a command or search sections…"
        className="h-12 font-mono text-sm rounded-none border-hairline"
      />

      <CommandList className="max-h-[min(420px,60vh)] rounded-none">
        <CommandEmpty className="py-8 font-mono text-xs text-muted-foreground">
          No commands match — try “pricing” or “copy”.
        </CommandEmpty>

        <CommandGroup heading="Navigate" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:text-[10px]">
          {SECTIONS.map((s) => (
            <CommandItem
              key={s.id}
              value={`navigate ${s.label} ${s.id} ${s.hint}`}
              onSelect={run(() => navigate(s.id))}
              className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
            >
              <Compass className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm">{s.label}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {s.id === "top" ? "#top" : `#${s.id}`}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-hairline" />

        <CommandGroup heading="Service catalogs" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:text-[10px]">
          {CATEGORIES.map((c) => (
            <CommandItem
              key={c.slug}
              value={`catalog ${c.name} ${c.slug} category playbook`}
              onSelect={run(() => {
                setOpen(false);
                openCategory(c.slug);
              })}
              className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
            >
              <Layers className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm">{c.name}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                #/services/{c.slug}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-hairline" />

        <CommandGroup heading="Studio actions" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:text-[10px]">
          <CommandItem
            value="copy email hello abwcurious"
            onSelect={run(() => copyText(EMAIL, "Email"))}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <Copy className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Copy email</span>
            <CommandShortcut className="font-mono">{EMAIL}</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="copy phone call number"
            onSelect={run(() => copyText(PHONE, "Phone"))}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <Phone className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Copy phone</span>
            <CommandShortcut className="font-mono">{PHONE}</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="download vcard contact card"
            onSelect={run(downloadVcard)}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <IdCard className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Download vCard</span>
            <CommandShortcut className="font-mono">.vcf</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="subscribe newsletter mailing list"
            onSelect={run(focusNewsletter)}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <MailPlus className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Subscribe to the newsletter</span>
            <CommandShortcut className="font-mono">footer</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="start a project contact form brief"
            onSelect={run(focusContactForm)}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <PenLine className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Start a project</span>
            <CommandShortcut className="font-mono">form</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-hairline" />

        <CommandGroup heading="Console & resources" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:text-[10px]">
          <CommandItem
            value="studio console admin unlock inbox stats"
            onSelect={run(openConsole)}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <Terminal className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Open Studio Console</span>
            <CommandShortcut className="font-mono">⇧⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="rss feed xml subscribe"
            onSelect={run(openRss)}
            className="rounded-none px-3 py-2.5 data-[selected=true]:bg-ibm-blue/[0.07] data-[selected=true]:shadow-[inset_2px_0_0_0_#0f62fe]"
          >
            <Rss className="size-4 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">RSS feed</span>
            <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          </CommandItem>
        </CommandGroup>
      </CommandList>

      {/* Keyboard legend — Carbon footer strip */}
      <div className="flex items-center gap-5 border-t border-hairline bg-card px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <kbd className="border border-hairline bg-white px-1 py-0.5">↑↓</kbd> navigate
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="border border-hairline bg-white px-1 py-0.5">↵</kbd> select
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="border border-hairline bg-white px-1 py-0.5">esc</kbd> close
        </span>
        <span className="ml-auto hidden items-center gap-1.5 sm:flex">
          <CommandIcon className="size-3 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" /> K toggles
        </span>
      </div>
    </CommandDialog>
  );
}
