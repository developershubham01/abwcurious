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
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Compass,
  Package,
  Layers,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Logo } from "./logo";
import { SocialRow } from "./social-row";
import MaskedHeading from "@/components/reactbits/MaskedHeading";
import { useToast } from "@/hooks/use-toast";
import { COMPANY } from "@/data/company";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/catalog";

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
      <div className="flex items-center gap-2.5 border border-ibm-success/60 bg-ibm-success/10 px-4 py-3.5">
        <CheckCircle2 className="size-4 shrink-0 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
        <p className="text-sm text-[#c6c6c6]">
          You are on the list{total ? ` — subscriber #${total}` : ""}. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden border border-[#393939] bg-[#262626] transition-colors focus-within:border-[#78a9ff]"
    >
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
        className="h-11 w-full min-w-0 bg-transparent px-4 text-sm text-white placeholder:text-[#8d8d8d] focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        aria-label="Subscribe to the newsletter"
        className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-white transition-colors hover:bg-ibm-blue-hover active:bg-ibm-blue-active focus-carbon disabled:opacity-60"
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
      <DialogContent className="max-h-[80dvh] w-[calc(100vw-2rem)] max-w-lg overflow-hidden rounded-none border-hairline p-0 shadow-none">
        {doc && (
          <div className="max-h-[80dvh] overflow-y-auto p-7 sm:p-9">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5 text-xl font-normal">
                <doc.icon className="size-5 text-ink-muted" strokeWidth={1.5} aria-hidden="true" />
                {doc.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-ink-muted">
                Last updated — placeholder
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 space-y-4">
              {doc.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-muted">
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

const CONTACT_ITEMS = [
  { icon: Mail, label: `General: ${COMPANY.email}`, href: `mailto:${COMPANY.email}` },
  { icon: Mail, label: `Sales: ${COMPANY.emailSales}`, href: `mailto:${COMPANY.emailSales}` },
  { icon: Mail, label: `HR: ${COMPANY.emailHr}`, href: `mailto:${COMPANY.emailHr}` },
  { icon: Phone, label: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: MapPin, label: COMPANY.address, href: "/contact" },
];

/* ------------------------------- sitemap -------------------------------- */

/** Every page of the site, grouped — rendered as the footer sitemap band.
 *  Landing sections are plain anchors; products / services / blog / sitemap
 *  are hash-route pages opened by the ViewPortals mounted in the layout. */

const SITEMAP_GROUPS: {
  id: string;
  label: string;
  icon: LucideIcon;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    id: "sections",
    label: "Company",
    icon: Compass,
    links: [
      { label: "Home", href: "/" },
      { label: "About — company profile", href: "/about" },
      { label: "Industries we serve", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Events", href: "/events" },
      { label: "Social media", href: "/social" },
      { label: "Achievements", href: "/achievements" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    links: [
      { label: "All products", href: "/products" },
      ...PRODUCTS.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: Layers,
    links: CATEGORIES.map((c) => ({ label: c.name, href: `/services/${c.slug}` })),
  },
  {
    id: "resources",
    label: "Resources",
    icon: Newspaper,
    links: [
      { label: "Blog — field notes", href: "/blogs" },
      { label: "Full sitemap", href: "/sitemap" },
      { label: "vCard — contact card", href: "/api/vcard", external: true },
      { label: "RSS feed", href: "/api/rss", external: true },
      { label: "Sitemap XML", href: "/sitemap.xml", external: true },
    ],
  },
];

const FOOTER_MASKED_IMAGES = [
  "/images/footer-abw.jpg",
  "/images/nature-1.jpg",
  "/images/innovation-quantum.jpg",
  "/images/nature-2.jpg",
  "/images/hero-neural.jpg",
  "/images/nature-3.jpg",
  "/images/innovation-smart-city.jpg",
  "/images/nature-4.jpg",
];

export function Footer() {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="relative mt-auto overflow-hidden bg-canvas-inverse text-white">
      {/* ------------------------- link columns ------------------------- */}
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-6">
            <Logo onDark size="xl" />
            <div className="mt-4 space-y-1 text-xs text-[#a0a0a0] font-mono border-l-2 border-[#393939] pl-3 py-0.5">
              <p className="font-semibold text-white font-sans">{COMPANY.legalFullName}</p>
              <p>CIN NO : {COMPANY.cin}</p>
              <p>GST NO : {COMPANY.gst}</p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#c6c6c6]">
              {COMPANY.description}
            </p>
            <SocialRow variant="dark" className="mt-5" />
          </div>

          {/* contact + newsletter */}
          <div className="lg:col-span-6">
            <h3 className="text-sm font-medium text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5">
              {CONTACT_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="focus-carbon group inline-flex items-center gap-3 text-sm text-[#c6c6c6] transition-colors hover:text-white hover:underline"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center border border-[#393939] bg-[#262626] text-[#c6c6c6] transition-colors group-hover:text-white">
                      <item.icon className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-white">
                Journey notes — monthly
              </h3>
              <p className="mb-3 mt-2 text-sm leading-relaxed text-[#8d8d8d]">
                One email a month: launches, events and lessons. Unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ sitemap ------------------------------ */}
      <nav
        aria-label="Sitemap — every page"
        className="relative border-t border-[#393939]"
      >
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-medium text-white">
                Sitemap
              </h2>
              <p className="mt-2 text-sm text-[#8d8d8d]">
                Every page of the site — one click from anywhere.
              </p>
            </div>
            <a
              href="/sitemap"
              className="focus-carbon group inline-flex items-center gap-1.5 border border-white/40 px-4 py-2 text-sm text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Open the full sitemap
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {SITEMAP_GROUPS.map((group) => (
              <div key={group.id}>
                <h3 className="flex items-center gap-2 text-sm font-medium text-white">
                  <group.icon className="size-3.5 text-[#8d8d8d]" strokeWidth={1.5} aria-hidden="true" />
                  {group.label}
                  <span className="text-[#8d8d8d]" aria-hidden="true">·</span>
                  <span className="tabular-nums text-[#8d8d8d]">{group.links.length}</span>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="focus-carbon inline-flex max-w-full items-center gap-1.5 text-sm text-[#c6c6c6] transition-colors hover:text-white hover:underline"
                      >
                        <span className="truncate">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* ------------------- giant image-filled wordmark ------------------- */}
      <div className="relative border-t border-[#393939]" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <MaskedHeading
            text={COMPANY.wordmark}
            tag="div"
            src={FOOTER_MASKED_IMAGES[0]}
            images={FOOTER_MASKED_IMAGES}
            interval={3000}
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
          <p className="mt-4 text-center text-sm text-[#8d8d8d]">
            AI · Digital Engineering · Cybersecurity · IT · Education · Digital
            Growth · Talent — Nerul, Navi Mumbai, India
          </p>
        </div>
      </div>

      {/* --------------------------- bottom bar --------------------------- */}
      <div className="relative border-t border-[#393939]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-xs text-[#8d8d8d] sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.legalFullName}. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="/privacy"
              className="focus-carbon transition-colors hover:text-white hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="focus-carbon transition-colors hover:text-white hover:underline"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#top"
              className="focus-carbon group inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline"
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
    </footer>
  );
}
