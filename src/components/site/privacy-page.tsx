"use client";

import { useEffect, useState } from "react";
import { ChevronRight, FileText, Lock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/data/company";
import { openCookiePreferencesModal } from "./cookie-consent";

interface Section {
  id: string;
  num: string;
  title: string;
}

const PRIVACY_SECTIONS: Section[] = [
  { id: "intro", num: "1", title: "Introduction & Commitment" },
  { id: "collection", num: "2", title: "Information We Collect" },
  { id: "usage", num: "3", title: "How We Use Your Data" },
  { id: "legal-basis", num: "4", title: "Legal Basis & DPDP Compliance" },
  { id: "sharing", num: "5", title: "Data Sharing & Confidentiality" },
  { id: "security", num: "6", title: "Security & Encryption" },
  { id: "cookies", num: "7", title: "Cookies & Telemetry" },
  { id: "rights", num: "8", title: "Your Privacy Rights" },
  { id: "retention", num: "9", title: "Data Retention & Erasure" },
  { id: "contact", num: "10", title: "Grievance Officer & Contact" },
];

export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    PRIVACY_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground">

      {/* ----------------- Hero header ----------------- */}
      <header className="border-b border-hairline bg-white pt-28 pb-12 sm:pt-36 sm:pb-14 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-primary uppercase tracking-wider">
            <Lock className="size-3.5" />
            <span>Data Protection &amp; Confidentiality · ABWcurious OPC Pvt. Ltd.</span>
          </div>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-muted sm:text-lg">
            At ABWcurious OPC Pvt. Ltd., we treat client confidentiality and personal data protection as paramount engineering priorities. This policy outlines how we collect, safeguard, and respect your information across all our digital platforms and enterprise engagements.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-ibm-subtle">
            <span className="border border-hairline bg-ibm-layer px-3 py-1.5 text-ink">
              Last Updated: January 1, 2023
            </span>
            <span>Framework: DPDP Act (India) &amp; Global Privacy Standards</span>
          </div>
        </div>
      </header>

      {/* ----------------- Main body (TOC + Content) ----------------- */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sticky Table of Contents sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20 border border-hairline bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ibm-subtle">
                <FileText className="size-4 text-primary" />
                Table of Contents
              </h2>
              <nav aria-label="Table of contents" className="mt-5">
                <ul className="space-y-1.5">
                  {PRIVACY_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`group flex items-center justify-between border-l-2 px-3 py-2 text-xs transition-colors ${activeSection === s.id
                            ? "border-primary bg-ibm-layer font-medium text-primary"
                            : "border-transparent text-ink-muted hover:border-hairline hover:bg-ibm-layer hover:text-ink"
                          }`}
                      >
                        <span className="truncate">
                          <span className="font-mono text-ibm-subtle mr-2">{s.num}.</span>
                          {s.title}
                        </span>
                        <ChevronRight className="size-3 text-ibm-subtle transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 border-t border-hairline pt-6 text-xs text-ink-muted">
                <p className="font-medium text-ink">Privacy &amp; Data Rights Help</p>
                <p className="mt-1">Exercise your right to access, export, or delete your personal information.</p>
                <a
                  href="mailto:info@abwcurious.com"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-primary hover:underline"
                >
                  <Mail className="size-3.5" />
                  info@abwcurious.com
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Document Content */}
          <article className="prose-ibm lg:col-span-8 space-y-12">
            {/* 1. Introduction */}
            <section id="intro" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 01</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">1. Introduction &amp; Commitment</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  <strong>ABWcurious OPC Pvt. Ltd.</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides engineering solutions, cybersecurity consulting, artificial intelligence products, and educational platforms.
                </p>
                <p>
                  We are committed to preserving the privacy and security of everyone who visits our website, engages our consulting services, or utilizes our software products. We do not sell, rent, or trade your personal information to third parties.
                </p>
              </div>
            </section>

            {/* 2. Collection */}
            <section id="collection" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 02</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">2. Information We Collect</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>We only collect information necessary to deliver and improve our services:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Voluntarily Provided Data:</strong> Name, professional email address, phone number, company name, and project requirements submitted via contact forms, meeting requests, or email correspondence.</li>
                  <li><strong>Service &amp; Account Data:</strong> User account credentials, billing information, and access tokens for clients utilizing our software portals or educational platforms.</li>
                  <li><strong>Technical &amp; Telemetry Data:</strong> Browser user-agent, IP address, referral URLs, and pages accessed, collected automatically for server diagnostic and security monitoring purposes.</li>
                </ul>
              </div>
            </section>

            {/* 3. Usage */}
            <section id="usage" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 03</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">3. How We Use Your Data</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>Your data is processed strictly for legitimate operational purposes:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Responding to enterprise project inquiries and scoping requests;</li>
                  <li>Delivering custom software, cybersecurity assessments, and AI solutions under executed contracts;</li>
                  <li>Issuing critical administrative updates, security advisories, and invoices;</li>
                  <li>Maintaining the operational resilience, performance, and security of our systems;</li>
                  <li>Complying with statutory and legal obligations in India.</li>
                </ul>
              </div>
            </section>

            {/* 4. Legal Basis */}
            <section id="legal-basis" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 04</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">4. Legal Basis &amp; DPDP Compliance</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  We process personal data in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India and applicable international data privacy frameworks.
                </p>
                <p>
                  Processing is based either on your explicit consent (e.g. newsletter subscription or contact form submissions), contractual necessity (performance of services requested by you), or compliance with legal mandates.
                </p>
              </div>
            </section>

            {/* 5. Sharing */}
            <section id="sharing" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 05</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">5. Data Sharing &amp; Confidentiality</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  All project engagements and consulting materials are executed under strict bilateral Non-Disclosure Agreements (NDAs).
                </p>
                <p>
                  We do not disclose your personal or proprietary information to third parties except:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>To trusted cloud infrastructure and tooling providers (e.g. AWS, Vercel) bound by confidentiality obligations;</li>
                  <li>When required by enforceable legal process, judicial order, or government authority in India.</li>
                </ul>
              </div>
            </section>

            {/* 6. Security */}
            <section id="security" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 06</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">6. Security &amp; Encryption</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  As a technology and cybersecurity enterprise, ABWcurious implements rigorous security defenses:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>TLS 1.3 encryption across all network communications;</li>
                  <li>AES-256 encryption at rest for databases and file repositories;</li>
                  <li>Role-based access control (RBAC) and multi-factor authentication (MFA) for internal systems;</li>
                  <li>Routine automated vulnerability assessments and code penetration testing.</li>
                </ul>
              </div>
            </section>

            {/* 7. Cookies */}
            <section id="cookies" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 07</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">7. Cookies &amp; Telemetry</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  ABWcurious categorizes cookies into 4 distinct areas: <strong>Essential Cookies</strong> (security, CSRF, layout state), <strong>Analytics &amp; Performance Cookies</strong> (anonymized page stats), <strong>Functional Cookies</strong> (AI assistant state, form drafts), and <strong>Marketing &amp; Media Telemetry</strong> (video showcase analytics).
                </p>
                <p>
                  You can inspect, accept, decline, or customize your cookie consent options at any time.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openCookiePreferencesModal()}
                    className="inline-flex h-10 items-center justify-center gap-2 border border-primary bg-primary px-5 text-xs font-medium text-white transition-colors hover:bg-ibm-blue-hover"
                  >
                    <span>Manage Cookie Preferences</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 8. Rights */}
            <section id="rights" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 08</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">8. Your Privacy Rights</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>You possess full autonomy over your personal information:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Right to Access:</strong> Request a copy of personal data we retain about you;</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records;</li>
                  <li><strong>Right to Erasure:</strong> Request permanent deletion of your personal data (&quot;Right to be Forgotten&quot;);</li>
                  <li><strong>Right to Withdraw Consent:</strong> Unsubscribe from email updates or revoke previously granted consent at any time.</li>
                </ul>
              </div>
            </section>

            {/* 9. Retention */}
            <section id="retention" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 09</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">9. Data Retention &amp; Erasure</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable tax, accounting, and legal regulations in India. Upon expiration of the retention schedule or upon verified request, data is securely sanitized or purged.
                </p>
              </div>
            </section>

            {/* 10. Contact */}
            <section id="contact" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 10</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">10. Grievance Officer &amp; Contact</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  For any privacy inquiries, data deletion requests, or formal grievance redressal under Indian data protection law, please contact:
                </p>
                <div className="mt-6 border border-hairline bg-ibm-layer p-6">
                  <p className="font-medium text-ink">Grievance &amp; Data Protection Officer</p>
                  <p className="text-xs text-ink-muted">ABWcurious OPC Pvt. Ltd.</p>
                  <div className="mt-4 space-y-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-ink">
                      <Mail className="size-3.5 text-primary" />
                      <a href="mailto:info@abwcurious.com" className="hover:underline">info@abwcurious.com</a>
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <Phone className="size-3.5 text-primary" />
                      <a href="tel:+919930338504" className="hover:underline">+91 99303 38504</a>
                    </div>
                    <div className="flex items-start gap-2 text-ink-muted">
                      <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                      <span>{COMPANY.address} · Jurisdiction: Navi Mumbai, MH, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
