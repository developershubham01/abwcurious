"use client";

import { useState } from "react";
import {
  LoaderCircle,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ShieldCheck,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Logo } from "./logo";
import { SocialRow } from "./social-row";
import { Reveal } from "./primitives";
import { LeaderDialog } from "./leader-dialog";
import MaskedHeading from "@/components/reactbits/MaskedHeading";
import { useToast } from "@/hooks/use-toast";
import { COMPANY, ALL_LEADERS, type Leader } from "@/data/company";

/* ----------------------------- newsletter ------------------------------- */

function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [total, setTotal] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Subscription failed");
      if (typeof json.total === "number") setTotal(json.total);
      setState("done");
      toast({
        title: json.alreadySubscribed ? "Already subscribed" : "Subscribed",
        description:
          typeof json.total === "number" && !json.alreadySubscribed
            ? `${json.message} You're subscriber #${json.total}.`
            : (json.message ?? "See you in the next issue."),
      });
    } catch (err) {
      setState("idle");
      toast({
        title: "Could not subscribe",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-ibm-success/40 bg-ibm-success/10 px-4 py-3.5">
        <CheckCircle2 className="size-4 shrink-0 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
        <p className="font-mono text-xs text-white/85">
          You are on the list{total ? ` — subscriber #${total}` : ""}. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur transition-colors focus-within:border-[#78a9ff]"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="h-11 w-full min-w-0 bg-transparent px-4 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        aria-label="Subscribe to the newsletter"
        className="flex h-11 w-12 shrink-0 items-center justify-center bg-ibm-blue text-white transition-colors hover:bg-[#78a9ff] focus-carbon disabled:opacity-60"
      >
        {state === "loading" ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>
    </form>
  );
}

/* ------------------------------ legal dialog ----------------------------- */

const LEGAL: Record<"privacy" | "terms", { title: string; icon: LucideIcon; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    icon: ShieldCheck,
    body: [
      "Placeholder copy — replace with your real Privacy Policy. In short: we collect only what you give us (name, email, message) when you reach out or subscribe, we never sell it, and we only use it to reply.",
      "You can ask us to delete your data any time at the email listed in the contact column. Analytics, if any, are anonymised.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    icon: FileText,
    body: [
      "Placeholder copy — replace with your real Terms & Conditions. In short: content on this site describes our company and services, trademarks belong to their owners, and nothing here is legal advice.",
      "Project engagements are governed by individually signed agreements, not this page.",
    ],
  },
};

function LegalDialog({
  kind,
  open,
  onClose,
}: {
  kind: "privacy" | "terms" | null;
  open: boolean;
  onClose: () => void;
}) {
  const doc = kind ? LEGAL[kind] : null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[80dvh] w-[calc(100vw-2rem)] max-w-lg overflow-hidden rounded-3xl border-white/60 p-0 shadow-[0_40px_120px_-30px_rgba(15,98,254,0.5)]">
        {doc && (
          <div className="max-h-[80dvh] overflow-y-auto p-7 sm:p-9">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5 text-xl font-light tracking-tight">
                <doc.icon className="size-5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                {doc.title}
              </DialogTitle>
              <DialogDescription className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                Last updated — placeholder
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 space-y-4">
              {doc.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink/70">
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------- footer --------------------------------- */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_ITEMS = [
  { icon: Mail, label: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Phone, label: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: MapPin, label: COMPANY.address, href: "#contact" },
];

export function Footer() {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const [profile, setProfile] = useState<Leader | null>(null);

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#0a0f1e] text-white">
      {/* top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ibm-blue/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(15,98,254,0.7), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ------------------------- link columns ------------------------- */}
      <div className="relative mx-auto max-w-7xl px-6 pb-4 pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {COMPANY.description}
            </p>
            <SocialRow variant="dark" className="mt-6" />
          </div>

          {/* explore */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="focus-carbon group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-[#78a9ff]"
                  >
                    <span className="h-px w-0 bg-[#78a9ff] transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* leadership — opens the full profile dialog per person */}
          <nav aria-label="Leadership" className="lg:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Leadership
            </h3>
            <ul className="mt-5 space-y-3">
              {ALL_LEADERS.map((leader) => (
                <li key={leader.id}>
                  <button
                    type="button"
                    onClick={() => setProfile(leader)}
                    aria-haspopup="dialog"
                    aria-label={`Open profile: ${leader.name} — ${leader.role}`}
                    className="focus-carbon group flex w-full items-center gap-3 rounded-xl text-left text-sm text-white/65 transition-colors hover:text-[#78a9ff]"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] font-mono text-[9px] text-white/60 transition-colors group-hover:border-[#78a9ff]/50 group-hover:text-[#78a9ff]">
                      {leader.monogram}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate">{leader.name}</span>
                      <span className="block truncate font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                        {leader.role}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact + newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5">
              {CONTACT_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="focus-carbon group inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-[#78a9ff]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.06] text-white/60 transition-colors group-hover:border-[#78a9ff]/50 group-hover:text-[#78a9ff]">
                      <item.icon className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                Journey notes — monthly
              </h3>
              <p className="mb-3 mt-2 text-xs leading-relaxed text-white/50">
                One email a month: launches, events and lessons. Unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- giant image-filled wordmark ------------------- */}
      <div className="relative border-t border-white/[0.07]" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <MaskedHeading
            text={COMPANY.wordmark}
            tag="div"
            src="/images/footer-abw.jpg"
            align="center"
            weight={700}
            tracking={-0.02}
            lineHeight={1}
            textScale={0.128}
            fillScale={1.35}
            focalY={0.42}
            parallax={22}
            drift={12}
            reveal="wipe"
            trigger="view"
            duration={1.4}
            className="select-none"
          />
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
            People · Events · Journey — Pune, India
          </p>
        </div>
      </div>

      {/* --------------------------- bottom bar --------------------------- */}
      <div className="relative border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] font-mono text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}™. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => setLegal("privacy")}
              className="focus-carbon rounded-full transition-colors hover:text-[#78a9ff]"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegal("terms")}
              className="focus-carbon rounded-full transition-colors hover:text-[#78a9ff]"
            >
              Terms &amp; Conditions
            </button>
            <a
              href="#top"
              className="focus-carbon group inline-flex items-center gap-1.5 rounded-full transition-colors hover:text-[#78a9ff]"
            >
              Back to top
              <ArrowUp
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      <LegalDialog kind={legal} open={legal !== null} onClose={() => setLegal(null)} />
      <LeaderDialog leader={profile} onClose={() => setProfile(null)} />
    </footer>
  );
}
