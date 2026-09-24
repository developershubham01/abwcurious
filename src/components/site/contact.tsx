"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, LoaderCircle, CheckCircle2, Copy, Check, Sparkles } from "lucide-react";
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
import { useInquiryStore } from "@/lib/store";
import { Eyebrow, Reveal } from "./primitives";

const INFO = [
  { icon: Mail, label: "Email", value: "hello@abwcurious.com", href: "mailto:hello@abwcurious.com" },
  { icon: Phone, label: "Phone", value: "+91 99999 99999", href: "tel:+919999999999" },
  { icon: MapPin, label: "Studio", value: "Pune, Maharashtra — India", href: "#contact" },
  { icon: Clock, label: "Hours", value: "Mon–Sat · 9:00–19:00 IST", href: "#contact" },
];

export function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [service, setService] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const presetService = useInquiryStore((s) => s.presetService);
  const presetNonce = useInquiryStore((s) => s.presetNonce);
  const clearPreset = useInquiryStore((s) => s.clearPreset);
  const lastNonce = useRef(0);

  /* Prefill the service select when a service card (or case file) sent us here */
  useEffect(() => {
    if (presetService && presetNonce !== lastNonce.current) {
      lastNonce.current = presetNonce;
      setService(presetService);
      toast({
        title: "Service preselected",
        description: `${presetService} — tell us a little more below.`,
      });
      clearPreset();
    }
  }, [presetNonce, presetService, clearPreset, toast]);

  async function copyEmail(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText("hello@abwcurious.com");
      setCopied(true);
      toast({ title: "Email copied", description: "hello@abwcurious.com is on your clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  }

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
          service: service || "General",
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setDone(true);
      form.reset();
      setService("");
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
    <section id="contact" className="relative overflow-hidden border-y border-hairline">
      <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 85% 20%, rgba(15,98,254,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-24 lg:border-x lg:border-hairline">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Info */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="justify-start">10 / Get in touch</Eyebrow>
              <h2 className="mt-5 text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Have an idea? <span className="text-ibm-bright">Let&apos;s interrogate it.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Tell us what you are building. We reply within 24 hours with honest first thoughts —
                and never a generic sales pitch.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2">
                {INFO.map((item) => (
                  <div key={item.label} className="relative bg-card transition-colors hover:bg-ibm-blue/[0.05]">
                    <a
                      href={item.href}
                      className="group flex items-start gap-3.5 p-5 focus-carbon"
                    >
                      <item.icon className="mt-0.5 size-5 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                      <span>
                        <span className="block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm">{item.value}</span>
                      </span>
                    </a>
                    {item.label === "Email" && (
                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label="Copy email address to clipboard"
                        title="Copy email"
                        className="focus-carbon absolute right-3 top-3 z-10 flex size-8 items-center justify-center border border-hairline bg-background text-muted-foreground transition-colors hover:border-ibm-bright hover:text-ibm-bright"
                      >
                        {copied ? (
                          <Check className="size-3.5 text-ibm-success" strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <Copy className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 border border-ibm-bright/40 bg-ibm-blue/[0.07] p-5">
                <p className="font-mono text-sm text-ibm-soft">
                  Currently accepting projects for next quarter.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Two build slots remain — first call is free.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative border border-hairline-strong bg-card p-7 lg:p-10">
              <span className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-ibm-bright" aria-hidden="true" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-ibm-bright" aria-hidden="true" />

              {service && !done && (
                <div className="mb-6 flex items-center gap-2.5 border border-ibm-bright/40 bg-ibm-blue/[0.06] px-4 py-2.5" role="status">
                  <Sparkles className="size-4 shrink-0 text-ibm-bright" strokeWidth={1.5} aria-hidden="true" />
                  <p className="font-mono text-xs text-ibm-soft">
                    Preselected: <span className="text-foreground">{service}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setService("")}
                    className="focus-carbon ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-ibm-error"
                  >
                    Clear
                  </button>
                </div>
              )}

              {done ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="size-14 text-ibm-success" strokeWidth={1.25} aria-hidden="true" />
                  <h3 className="mt-6 text-2xl tracking-tight">Message received.</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Thanks for writing to ABWcurious. A real human will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-8 border border-hairline-strong px-5 py-2.5 font-mono text-sm transition-colors hover:border-ibm-bright hover:text-ibm-bright focus-carbon"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Ada Lovelace"
                        className="h-12 border-hairline-strong bg-white focus-visible:ring-ibm-bright focus-visible:border-ibm-bright"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ada@company.com"
                        className="h-12 border-hairline-strong bg-white focus-visible:ring-ibm-bright focus-visible:border-ibm-bright"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label htmlFor="phone" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 ..."
                        className="h-12 border-hairline-strong bg-white focus-visible:ring-ibm-bright focus-visible:border-ibm-bright"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="service" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        I&apos;m interested in *
                      </Label>
                      <Select value={service} onValueChange={setService} required>
                        <SelectTrigger
                          id="service"
                          className="h-12 border-hairline-strong bg-white data-[state=open]:border-ibm-bright focus:ring-ibm-bright"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-hairline-strong bg-popover">
                          {[
                            "AI Software Development",
                            "AI Solutions",
                            "Website Development",
                            "Design",
                            "Something else",
                          ].map((s) => (
                            <SelectItem key={s} value={s} className="rounded-none focus:bg-ibm-blue/10">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Project details *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you building? What does success look like? Any timeline in mind?"
                      className="min-h-[132px] border-hairline-strong bg-white focus-visible:ring-ibm-bright focus-visible:border-ibm-bright"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-roll group inline-flex h-13 w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 font-mono text-sm text-primary-foreground transition-colors hover:bg-ibm-blue-hover focus-carbon disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-center font-mono text-xs text-muted-foreground">
                    No spam. No newsletters. Just a reply.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
