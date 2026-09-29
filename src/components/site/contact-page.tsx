"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  LoaderCircle,
  CheckCircle2,
  HeartHandshake,
  Navigation,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eyebrow, Reveal, RollButton } from "./primitives";
import { SplitText } from "./text-anim";
import { SocialRow } from "./social-row";
import { COMPANY } from "@/data/company";
import { useInquiryStore } from "@/lib/store";

const MESSAGE_MAX = 800;

/** OpenStreetMap embed (no API key) built from COMPANY.map coords. */
const MAP_EMBED = (() => {
  const { lat, lng, span } = COMPANY.map;
  const bbox = [lng - span, lat - span * 0.6, lng + span, lat + span * 0.6]
    .map((n) => n.toFixed(4))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
})();

const DIRECT_CHANNELS = [
  { icon: Mail, label: "Direct Email", value: COMPANY.email, href: `mailto:${COMPANY.email}`, desc: "Monitored 24/7" },
  { icon: Phone, label: "Studio Phone", value: COMPANY.phone, href: COMPANY.phoneHref, desc: "Direct call & WhatsApp" },
  { icon: MapPin, label: "Studio Location", value: COMPANY.address, href: COMPANY.map.directionsUrl, desc: "OpenStreetMap verified" },
  { icon: Clock, label: "Operating Hours", value: COMPANY.hours, href: `mailto:${COMPANY.email}`, desc: "Indian Standard Time" },
];

const SERVICE_PRACTICES = [
  "Software & Web Development",
  "Mobile App Development",
  "AI & Automation",
  "Digital Marketing & Growth",
  "Recruitment & HR Solutions",
  "Cloud, IT & Business Solutions",
  "Future-Ready Education",
  "General Partnership / Hello",
];

const BUDGET_RANGES = [
  "< $5,000 / < ₹4 Lakhs",
  "$5,000 – $15,000 / ₹4L – ₹12L",
  "$15,000 – $50,000 / ₹12L – ₹40L",
  "$50,000+ / ₹40L+",
  "Flexible / Retainer Model",
];

const FAQS = [
  {
    q: "How fast do you respond to new enquiries?",
    a: "We review every incoming message and respond within 24 hours. For urgent production incidents, we respond within 4 hours.",
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes. We regularly execute bilateral NDAs prior to reviewing proprietary materials, codebases, or architecture designs.",
  },
  {
    q: "Who joins the first discovery call?",
    a: "You speak directly with a practicing engineering lead or solutions architect — not an aggressive sales representative.",
  },
  {
    q: "Can you take over an existing codebase or website?",
    a: "Absolutely. We routinely audit, stabilize, refactor, and modernize existing stacks without disrupting live customer traffic.",
  },
];

export function ContactPage() {
  const { toast } = useToast();
  const presetService = useInquiryStore((s) => s.presetService);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [topic, setTopic] = useState<string>(presetService || "");
  const [budget, setBudget] = useState<string>("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: topic || presetService || "General hello",
          budget: budget || "Not specified",
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setDone(true);
      form.reset();
      setTopic("");
      setBudget("");
      setMessage("");
      toast({
        title: "Message received successfully",
        description: "Thank you for reaching out — our engineering team will reply within 24 hours.",
      });
    } catch (err) {
      toast({
        title: "Could not send message",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-1 bg-background text-foreground">
      {/* ================= Cinematic Hero Header ================= */}
      <section className="relative overflow-hidden bg-[#04101f] text-white py-16 sm:py-24 border-b border-white/10">
        {/* Subtle grid pattern & ambient blue lighting */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 98, 254, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 98, 254, 0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04101f]/85 via-[#04101f]/50 to-[#04101f]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2.5 border border-white/20 bg-black/55 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide text-white/95 backdrop-blur-md shadow-lg shadow-black/30">
            <span className="size-1.5 rounded-full bg-[#5fd0e1] animate-pulse-dot" aria-hidden="true" />
            13 · GET IN TOUCH
          </div>

          <p className="mt-6 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#79dce8]">
            Direct Technical Inquiry &amp; Client Onboarding
          </p>

          <h1 className="mt-4 max-w-4xl mx-auto text-balance text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            <SplitText text="Start a conversation with our engineering team." immediate delay={0.15} />
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Have a project in mind, need technical advisory, or want to discuss enterprise solutions?
            Connect directly with our leadership and technical teams.
          </p>

          {/* Quick Direct Channel Cards */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto text-left">
            {DIRECT_CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                className="group border border-white/15 bg-white/5 backdrop-blur-md p-4 transition-all duration-200 hover:border-white/35 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">{ch.label}</span>
                  <ch.icon className="size-4 text-[#5fd0e1] transition-transform duration-200 group-hover:scale-110" />
                </div>
                <p className="mt-2 text-sm font-medium text-white truncate">{ch.value}</p>
                <p className="mt-1 text-xs text-white/50">{ch.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Main Content: Form & Studio Details ================= */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-start">
            {/* Left: Interactive Form */}
            <div className="border border-hairline bg-card p-6 sm:p-10 shadow-sm">
              <div className="border-b border-hairline pb-6">
                <Eyebrow tone="blue">Project Inquiry</Eyebrow>
                <h2 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">
                  Tell us about your requirements
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill in the details below and we&apos;ll schedule a technical discovery call with our team.
                </p>
              </div>

              {done ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="flex size-16 items-center justify-center border border-hairline bg-ibm-success/[0.08] text-ibm-success">
                    <CheckCircle2 className="size-8" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-light tracking-tight text-ink">
                    Message Received
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you for writing to ABWcurious. A senior engineer will review your project requirements and get back to you within 24 hours.
                  </p>
                  <RollButton
                    variant="primary"
                    onClick={() => setDone(false)}
                    className="mt-8 px-6"
                  >
                    Send another inquiry
                  </RollButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate={false}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-sm font-medium">
                        Your Name *
                      </Label>
                      <Input
                        id="contact-name"
                        name="name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        autoComplete="name"
                        className="h-12 rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-sm font-medium">
                        Work Email *
                      </Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        autoComplete="email"
                        className="h-12 rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-sm font-medium">
                        Phone / WhatsApp <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 99999 99999"
                        autoComplete="tel"
                        className="h-12 rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-topic" className="text-sm font-medium">
                        Service Practice *
                      </Label>
                      <Select value={topic || undefined} onValueChange={setTopic}>
                        <SelectTrigger
                          id="contact-topic"
                          className="h-12 w-full rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                        >
                          <SelectValue placeholder="Select primary practice" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-hairline">
                          {SERVICE_PRACTICES.map((t) => (
                            <SelectItem key={t} value={t} className="rounded-none">
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-budget" className="text-sm font-medium">
                      Estimated Project Budget <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Select value={budget || undefined} onValueChange={setBudget}>
                      <SelectTrigger
                        id="contact-budget"
                        className="h-12 w-full rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                      >
                        <SelectValue placeholder="Select approximate investment range" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-hairline">
                        {BUDGET_RANGES.map((b) => (
                          <SelectItem key={b} value={b} className="rounded-none">
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <Label htmlFor="contact-message" className="text-sm font-medium">
                        Project Scope &amp; Details *
                      </Label>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {message.length}/{MESSAGE_MAX}
                      </span>
                    </div>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      maxLength={MESSAGE_MAX}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your timeline, goals, technical requirements, or key deliverables…"
                      className="resize-none rounded-none border-hairline bg-ibm-layer px-4 py-3 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <RollButton type="submit" disabled={submitting} className="w-full sm:w-auto px-8">
                      {submitting ? (
                        <>
                          Transmitting
                          <LoaderCircle className="size-4 shrink-0 animate-spin" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <Send
                            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RollButton>
                    <p className="text-xs text-muted-foreground">
                      <ShieldCheck className="inline size-3.5 mr-1 text-ibm-success" />
                      Strict NDA &amp; privacy guaranteed.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Studio Location, Map & Assurances */}
            <div className="space-y-8">
              {/* Studio Map Card */}
              <div className="overflow-hidden border border-hairline bg-card shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline border-l-4 border-l-primary px-5 py-4">
                  <div>
                    <h3 className="text-sm font-medium text-ink">Headquarters Studio</h3>
                    <p className="text-xs text-muted-foreground">{COMPANY.address}</p>
                  </div>
                  <a
                    href={COMPANY.map.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-carbon group inline-flex h-9 items-center gap-2 bg-primary px-4 text-xs font-medium text-white transition-colors hover:bg-ibm-blue-hover"
                  >
                    <Navigation
                      className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                    Directions
                  </a>
                </div>
                <div className="relative aspect-[16/10] w-full">
                  <iframe
                    src={MAP_EMBED}
                    title={`Map — ABWcurious studio, ${COMPANY.address}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>

              {/* Assurances & Guarantees */}
              <div className="border border-hairline bg-card p-6 divide-y divide-hairline">
                <div className="pb-4 flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center bg-ibm-blue/10 text-primary">
                    <Zap className="size-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ink">24-Hour SLA Response</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Every project inquiry is routed to our senior team. We acknowledge receipt within hours and return with scoping availability.
                    </p>
                  </div>
                </div>

                <div className="py-4 flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center bg-ibm-blue/10 text-primary">
                    <ShieldCheck className="size-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ink">Mutual NDA Protection</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Your business logic, architectures, and market plans are safe. We sign formal confidentiality agreements upfront.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center bg-ibm-blue/10 text-primary">
                    <Users className="size-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ink">Senior Team on Day One</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Zero sales intermediaries. You discuss requirements directly with the engineers and designers who build your solution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels Card */}
              <div className="border border-hairline bg-card p-6">
                <h4 className="text-sm font-medium text-ink">Follow Our Work &amp; Community</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Stay updated with our open-source tools, design teardowns, and engineering insights.
                </p>
                <div className="mt-4">
                  <SocialRow />
                </div>
              </div>
            </div>
          </div>

          {/* ================= FAQs ================= */}
          <div className="mt-20 border-t border-hairline pt-14">
            <div className="max-w-2xl">
              <Eyebrow tone="blue">Frequently Asked Questions</Eyebrow>
              <h2 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">
                What to expect when reaching out
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border border-hairline bg-card p-6">
                  <h3 className="text-base font-medium text-ink">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
