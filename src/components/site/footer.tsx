"use client";

import { useState } from "react";
import { LoaderCircle, Send, CheckCircle2 } from "lucide-react";
import { Logo } from "./logo";
import { SocialRow } from "./header";
import { Reveal, RollButton } from "./primitives";
import { StudioConsole } from "./console";
import { useToast } from "@/hooks/use-toast";

const COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Process", "Careers", "Contact"],
    hrefs: ["#about", "#process", "#contact", "#contact"],
  },
  {
    title: "Services",
    links: ["AI Software Development", "AI Solutions", "Website Development", "Design"],
    hrefs: ["#services", "#services", "#services", "#services"],
  },
  {
    title: "Resources",
    links: ["Selected work", "Case files", "Pricing", "FAQ", "Field notes"],
    hrefs: ["#work", "#cases", "#pricing", "#faq", "#notes"],
  },
];

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
      <div className="flex items-center gap-2.5 border border-ibm-success/50 bg-ibm-success/10 px-4 py-3.5">
        <CheckCircle2 className="size-4 shrink-0 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
        <p className="font-mono text-xs text-foreground/90">
          You are on the list{total ? ` — subscriber #${total}` : ""}. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex border border-hairline-strong bg-white focus-within:border-ibm-bright">
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
        className="h-11 w-full min-w-0 bg-transparent px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        aria-label="Subscribe to newsletter"
        className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-ibm-blue-hover focus-carbon disabled:opacity-60"
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

export function Footer() {
  return (
    <footer className="mt-auto bg-[#f5f8fe]">
      {/* Big CTA banner */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 lg:border-x lg:border-hairline">
          <Reveal>
            <div className="relative overflow-hidden border border-ibm-blue/70 bg-ibm-blue px-8 py-12 text-center sm:px-12 lg:py-16">
              {/* white blueprint grid + glow ornaments */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full opacity-50 blur-3xl"
                aria-hidden="true"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full opacity-40 blur-3xl"
                aria-hidden="true"
                style={{ background: "radial-gradient(circle, rgba(166,200,255,0.5), transparent 70%)" }}
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/75">
                  Ready when you are
                </p>
                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light leading-tight tracking-tight text-white sm:text-5xl">
                  Build your next product with{" "}
                  <span className="text-[#a6c8ff]">curious minds.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Free discovery call. Written proposal in 48 hours. Working software in weeks, not
                  quarters.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <RollButton href="#contact" variant="light" arrow>
                    Get a Quote
                  </RollButton>
                  <RollButton href="#work" variant="outline-light">
                    See Our Work
                  </RollButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:border-x lg:border-hairline">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A technology studio building AI software, intelligent solutions, websites and design
              for ambitious businesses. Curious since day one.
            </p>
            <SocialRow className="mt-6" />
            <div className="mt-8 max-w-xs">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                Field notes — monthly
              </h3>
              <p className="mb-3 mt-2 text-xs text-muted-foreground">
                One email a month on AI, product engineering and design. Unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link, i) => (
                  <li key={link}>
                    <a
                      href={col.hrefs[i]}
                      className="text-sm text-muted-foreground transition-colors hover:text-ibm-bright focus-carbon"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 pr-20 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] font-mono text-xs text-muted-foreground sm:flex-row sm:pr-6">
          <p className="max-w-[calc(100vw-7.5rem)] sm:max-w-none">© {new Date().getFullYear()} ABWcurious™. All rights reserved.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <StudioConsole />
            <p className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ibm-success" aria-hidden="true" />
              Engineered with curiosity in Pune, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
