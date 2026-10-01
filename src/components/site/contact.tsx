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
import { Eyebrow, Reveal, RollButton } from "./primitives";
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
              <Eyebrow tone="muted">13 — Get in touch</Eyebrow>
            </Reveal>
            <h2 className="mt-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
              <SplitText text="Say hello to" />{" "}
              <SplitText text="the team." delay={0.15} wordClassName="text-gradient" />
            </h2>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
                A project, a question, or just curiosity — the inbox reaches the whole team and we
                answer fast.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-[2px] border border-ibm-success/40 bg-ibm-success/[0.08] px-4 py-2">
                <HeartHandshake className="size-4 shrink-0 text-ibm-success" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-sm text-ink">We reply within 24 hours</span>
              </div>
            </Reveal>

            {/* info cards */}
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {INFO.map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.07}>
                  <li>
                    <a
                      href={item.href}
                      className="focus-carbon group flex items-start gap-3.5 border border-hairline bg-white p-4 transition-colors duration-200 hover:border-hairline-strong"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center border border-hairline bg-ibm-layer text-ink">
                        <item.icon className="size-4.5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-ink-muted">
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
                <p className="text-sm text-ink-muted">Or find us on social</p>
                <SocialRow className="mt-3" />
              </div>
            </Reveal>
          </div>
          {/* ---------------- right: form ---------------- */}
          <Reveal delay={0.15}>
            <div className="relative h-full">
              <div className="relative h-full border border-hairline bg-white p-6 sm:p-9">
                {done ? (
                  <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                    <span className="flex size-16 items-center justify-center border border-hairline bg-ibm-success/[0.08] text-ibm-success">
                      <CheckCircle2 className="size-8" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-2xl font-light tracking-tight text-ink">
                      Message received
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
                      Thanks for writing in — a real human (probably two) will get back to you within
                      24 hours.
                    </p>
                    <RollButton
                      variant="outline"
                      onClick={() => setDone(false)}
                      className="mt-8"
                    >
                      Send another message
                    </RollButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="text-sm text-ink">
                          Name *
                        </Label>
                        <Input
                          id="contact-name"
                          name="name"
                          required
                          placeholder="Your name"
                          autoComplete="name"
                          className="h-12 rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-sm text-ink">
                          Email *
                        </Label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="h-12 rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone" className="text-sm text-ink">
                          Phone <span className="text-ibm-subtle">(optional)</span>
                        </Label>
                        <Input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 …"
                          autoComplete="tel"
                          className="h-12 rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-topic" className="text-sm text-ink">
                          Topic
                        </Label>
                        <Select value={topic || undefined} onValueChange={setTopic}>
                          <SelectTrigger
                            id="contact-topic"
                            className="h-12 w-full rounded-none border-hairline bg-ibm-layer px-4 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                          >
                            <SelectValue placeholder="What's this about?" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-hairline">
                            {TOPICS.map((t) => (
                              <SelectItem key={t} value={t} className="rounded-none">
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <Label htmlFor="contact-message" className="text-sm text-ink">
                          Message *
                        </Label>
                        <span className="text-xs tabular-nums text-ibm-subtle">
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
                        className="resize-none rounded-none border-hairline bg-ibm-layer px-4 py-2.5 shadow-none focus-visible:border-hairline focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0"
                      />
                    </div>

                    <RollButton type="submit" disabled={submitting} className="w-full sm:w-auto sm:px-10">
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
                    </RollButton>
                    <p className="text-xs leading-relaxed text-ink-muted">
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
          <div className="relative mt-14 overflow-hidden border border-hairline bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline border-l-4 border-l-primary px-5 py-4 sm:px-7">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <MapPin className="size-4 text-primary shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  Studio — Full Address
                </p>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">{COMPANY.fullAddress}</p>
              </div>
              <a
                href={COMPANY.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-carbon group inline-flex h-9 items-center gap-2 rounded-none bg-primary px-4 text-sm text-white transition-colors hover:bg-ibm-blue-hover active:bg-ibm-blue-active shrink-0"
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5589.069098648515!2d73.0221279!3d19.0247909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3d076147f7b%3A0xe421751ae4517f6d!2sABWcurious%20OPC%20Pvt.Ltd!5e1!3m2!1sen!2sin!4v1790846305053!5m2!1sen!2sin"
                title={`Google Map — ABWcurious studio, ${COMPANY.fullAddress}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
