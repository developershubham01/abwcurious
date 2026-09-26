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
import { Reveal } from "./primitives";
import { SplitText } from "./text-anim";
import { SocialRow } from "./social-row";
import { COMPANY } from "@/data/company";

const MESSAGE_MAX = 600;

/** OpenStreetMap embed (no API key) built from COMPANY.map coords. */
const MAP_EMBED = (() => {
  const { lat, lng, span } = COMPANY.map;
  const bbox = [lng - span, lat - span * 0.6, lng + span, lat + span * 0.6]
    .map((n) => n.toFixed(4))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
})();

const INFO = [
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Phone, label: "Phone", value: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: MapPin, label: "Studio", value: COMPANY.address, href: "#contact" },
  { icon: Clock, label: "Hours", value: COMPANY.hours, href: "#contact" },
];

const TOPICS = [
  "General hello",
  "Work with us",
  "Partnerships",
  "Press & media",
  "Join the team",
  "Events & meetups",
];

export function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [topic, setTopic] = useState<string>("");
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
          service: topic || "General hello",
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setDone(true);
      form.reset();
      setTopic("");
      setMessage("");
      toast({
        title: "Message sent",
        description: "Thanks for reaching out — we reply within 24 hours.",
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
    <section id="contact" aria-label="Contact ABWcurious" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* ---------------- left: info ---------------- */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-ibm-soft">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                07 — Get in touch
              </p>
            </Reveal>
            <h2 className="mt-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
              <SplitText text="Say hello to" />{" "}
              <SplitText text="the team." delay={0.15} wordClassName="text-gradient font-normal" />
            </h2>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-ink/60 sm:text-lg">
                A project, a question, or just curiosity — the inbox reaches the whole team and we
                answer fast.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-ibm-success/25 bg-ibm-success/[0.08] px-4 py-2">
                <HeartHandshake className="size-4 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70">
                  We reply within 24 hours
                </span>
              </div>
            </Reveal>

            {/* info cards */}
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {INFO.map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.07}>
                  <li>
                    <a
                      href={item.href}
                      className="focus-carbon group flex items-start gap-3.5 rounded-2xl border border-ink/[0.07] bg-white p-4 shadow-[0_4px_20px_-10px_rgba(15,98,254,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ibm-blue/30 hover:shadow-[0_16px_40px_-16px_rgba(15,98,254,0.4)]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ibm-blue to-ibm-cyan text-white shadow-[0_8px_18px_-8px_rgba(15,98,254,0.6)] transition-transform duration-300 group-hover:scale-105">
                        <item.icon className="size-4.5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
                          {item.label}
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-ink">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  Or find us on social
                </p>
                <SocialRow className="mt-3" />
              </div>
            </Reveal>
          </div>
          {/* ---------------- right: form ---------------- */}
          <Reveal delay={0.15}>
            <div className="relative h-full">
              {/* soft gradient halo */}
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-ibm-blue/[0.08] via-transparent to-ibm-cyan/[0.1] blur-xl"
                aria-hidden="true"
              />
              <div className="relative h-full rounded-3xl border border-ink/[0.07] bg-white p-6 shadow-[0_24px_70px_-28px_rgba(15,98,254,0.4)] sm:p-9">
                {done ? (
                  <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                    <span className="flex size-16 items-center justify-center rounded-full bg-ibm-success/10 text-ibm-success">
                      <CheckCircle2 className="size-8" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-2xl font-light tracking-tight text-ink">
                      Message received
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
                      Thanks for writing in — a real human (probably two) will get back to you within
                      24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setDone(false)}
                      className="focus-carbon mt-8 rounded-full border border-ibm-blue/30 px-6 py-2.5 text-sm font-medium text-ibm-bright transition-colors hover:bg-ibm-blue hover:text-white"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                          Name *
                        </Label>
                        <Input
                          id="contact-name"
                          name="name"
                          required
                          placeholder="Your name"
                          autoComplete="name"
                          className="h-12 rounded-xl border-ink/12 bg-[#f8faff] focus-visible:ring-ibm-blue/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                          Email *
                        </Label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="h-12 rounded-xl border-ink/12 bg-[#f8faff] focus-visible:ring-ibm-blue/40"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone" className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                          Phone <span className="text-ink/30">(optional)</span>
                        </Label>
                        <Input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 …"
                          autoComplete="tel"
                          className="h-12 rounded-xl border-ink/12 bg-[#f8faff] focus-visible:ring-ibm-blue/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-topic" className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                          Topic
                        </Label>
                        <Select value={topic || undefined} onValueChange={setTopic}>
                          <SelectTrigger
                            id="contact-topic"
                            className="h-12 rounded-xl border-ink/12 bg-[#f8faff] focus-visible:ring-ibm-blue/40"
                          >
                            <SelectValue placeholder="What's this about?" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-ink/10">
                            {TOPICS.map((t) => (
                              <SelectItem key={t} value={t} className="rounded-lg">
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <Label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                          Message *
                        </Label>
                        <span className="font-mono text-[10px] tabular-nums text-ink/40">
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
                        placeholder="Tell us a little about what you have in mind…"
                        className="resize-none rounded-xl border-ink/12 bg-[#f8faff] focus-visible:ring-ibm-blue/40"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="focus-carbon group inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-ibm-blue text-[15px] font-medium text-white shadow-[0_14px_34px_-10px_rgba(15,98,254,0.55)] transition-all duration-300 hover:bg-ibm-blue-hover hover:shadow-[0_18px_44px_-10px_rgba(15,98,254,0.65)] disabled:opacity-60 sm:w-auto sm:px-10"
                    >
                      {submitting ? (
                        <>
                          Sending
                          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          Send message
                          <Send
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                    <p className="font-mono text-[10px] leading-relaxed tracking-[0.06em] text-ink/40">
                      By sending, you agree to be contacted about your enquiry. No newsletters unless
                      you ask.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- studio map ---------------- */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-[0_24px_70px_-30px_rgba(15,98,254,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] px-5 py-4 sm:px-7">
              <p className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                <MapPin className="size-3.5 text-ibm-bright" strokeWidth={1.75} aria-hidden="true" />
                Studio — {COMPANY.address}
              </p>
              <a
                href={COMPANY.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-carbon group inline-flex h-9 items-center gap-2 rounded-full bg-ibm-blue px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_-10px_rgba(15,98,254,0.6)] transition-colors hover:bg-ibm-blue-hover"
              >
                <Navigation
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Get directions
              </a>
            </div>
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <iframe
                src={MAP_EMBED}
                title={`Map — ABWcurious studio, ${COMPANY.address}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
              {/* hairline frame accent */}
              <div
                className="pointer-events-none absolute inset-0 rounded-b-3xl ring-1 ring-inset ring-ibm-blue/[0.08]"
                aria-hidden="true"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
