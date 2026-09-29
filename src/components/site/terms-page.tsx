"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, FileText, Mail, MapPin, Phone, Shield } from "lucide-react";
import { COMPANY } from "@/data/company";

interface Section {
  id: string;
  num: string;
  title: string;
}

const SECTIONS: Section[] = [
  { id: "acceptance", num: "1", title: "Acceptance of Terms" },
  { id: "services", num: "2", title: "Services Description" },
  { id: "accounts", num: "3", title: "User Accounts" },
  { id: "intellectual-property", num: "4", title: "Intellectual Property" },
  { id: "liability", num: "5", title: "Limitation of Liability" },
  { id: "indemnification", num: "6", title: "Indemnification" },
  { id: "governing-law", num: "7", title: "Governing Law" },
  { id: "dispute-resolution", num: "8", title: "Dispute Resolution" },
  { id: "modifications", num: "9", title: "Modifications to Terms" },
  { id: "contact", num: "10", title: "Contact Information" },
];

export function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");

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

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* ----------------- Breadcrumb strip ----------------- */}
      <div className="border-b border-hairline bg-ibm-layer">
        <div className="mx-auto flex h-10 max-w-7xl items-center px-4 sm:px-6 text-xs text-ink-muted">
          <a href="/" className="hover:text-ink transition-colors">Home</a>
          <ChevronRight className="mx-2 size-3 text-ibm-subtle" />
          <span>Legal</span>
          <ChevronRight className="mx-2 size-3 text-ibm-subtle" />
          <span className="text-ink font-medium">Terms &amp; Conditions</span>
        </div>
      </div>

      {/* ----------------- Hero header ----------------- */}
      <header className="border-b border-hairline bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-primary uppercase tracking-wider">
            <Shield className="size-3.5" />
            <span>Legal Agreement &amp; Compliance · ABWcurious OPC Pvt. Ltd.</span>
          </div>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-muted sm:text-lg">
            These Terms and Conditions constitute a legally binding agreement between you and ABWcurious OPC Pvt. Ltd. governing your access to and use of our technology services, platforms, and websites.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-ibm-subtle">
            <span className="border border-hairline bg-ibm-layer px-3 py-1.5 text-ink">
              Last Updated: January 1, 2023
            </span>
            <span>Version: 2.1 · Jurisdiction: Navi Mumbai, India</span>
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
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`group flex items-center justify-between border-l-2 px-3 py-2 text-xs transition-colors ${
                          activeSection === s.id
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
                <p className="font-medium text-ink">Need legal clarification?</p>
                <p className="mt-1">Our compliance team is available for contractual inquiries.</p>
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
            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 01</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">1. Acceptance of Terms</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  By accessing or using the services provided by <strong>ABWcurious OPC Pvt. Ltd.</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to these Terms, you must not use our services. These Terms constitute a legally binding agreement between you and ABWcurious OPC Pvt. Ltd.
                </p>
                <p>
                  Your continued use of our services following the posting of any changes to these Terms constitutes acceptance of those changes. We reserve the right to modify, update, or replace any part of these Terms at our sole discretion.
                </p>
              </div>
            </section>

            {/* 2. Services Description */}
            <section id="services" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 02</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">2. Services Description</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  ABWcurious OPC Pvt. Ltd. provides a range of technology services including, but not limited to, cybersecurity consulting, vulnerability assessment and penetration testing (VAPT), digital forensics, web and mobile application development, artificial intelligence and machine learning solutions, annual maintenance contracts (AMC), and educational programs in the fields of cybersecurity and AI.
                </p>
                <p>
                  We reserve the right to modify, suspend, or discontinue any service at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.
                </p>
                <p>
                  The specifics of the services to be provided, including scope, deliverables, timelines, and fees, shall be governed by separate service agreements or statements of work executed between the parties.
                </p>
              </div>
            </section>

            {/* 3. User Accounts */}
            <section id="accounts" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 03</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">3. User Accounts</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  To access certain features of our services, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <p className="font-medium text-ink">You agree to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Provide accurate, current, and complete information during registration;</li>
                  <li>Maintain and promptly update your account information;</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access;</li>
                  <li>Immediately notify us of any unauthorized use of your account;</li>
                  <li>Not create accounts using automated means or under false pretenses.</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete, or if we have reasonable grounds to suspect fraud, abuse, or violation of these Terms.
                </p>
              </div>
            </section>

            {/* 4. Intellectual Property */}
            <section id="intellectual-property" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 04</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">4. Intellectual Property</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  All content, materials, software, and intellectual property provided as part of our services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the property of ABWcurious Pvt. Ltd. or its licensors and are protected by Indian and international copyright, trademark, patent, and other intellectual property laws.
                </p>
                <p>
                  No part of our services or materials may be reproduced, distributed, transmitted, displayed, published, broadcast, or modified without the prior written consent of ABWcurious Pvt. Ltd., except as expressly permitted by these Terms or applicable law.
                </p>
                <p>
                  Any reports, assessments, or deliverables created as part of our consulting services remain the intellectual property of ABWcurious Pvt. Ltd. unless expressly transferred in a separate written agreement. Clients receive a limited, non-exclusive license to use such deliverables for their internal business purposes.
                </p>
              </div>
            </section>

            {/* 5. Limitation of Liability */}
            <section id="liability" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 05</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">5. Limitation of Liability</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  To the maximum extent permitted by applicable law, in no event shall ABWcurious OPC Pvt. Ltd., its directors, employees, partners, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Your access to or use of, or inability to access or use the services;</li>
                  <li>Any conduct or content of any third party on the services;</li>
                  <li>Any content obtained from or through the services; or</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
                <p>
                  In no event shall the aggregate liability of ABWcurious OPC Pvt. Ltd. exceed the total amount paid by you to the company for the specific services giving rise to the claim during the six (6) months preceding the event, or INR 10,000, whichever is lower.
                </p>
              </div>
            </section>

            {/* 6. Indemnification */}
            <section id="indemnification" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 06</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">6. Indemnification</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  You agree to defend, indemnify, and hold harmless ABWcurious Pvt. Ltd. and its directors, employees, partners, agents, suppliers, and affiliates from and against any claims, actions, demands, liabilities, and settlements including legal fees, arising from:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Your use of our services;</li>
                  <li>Your violation of these Terms;</li>
                  <li>Your violation of any applicable law or regulation;</li>
                  <li>Your violation of any rights of a third party, including intellectual property rights;</li>
                  <li>Any content you submit, post, or transmit through our services.</li>
                </ul>
                <p>
                  ABWcurious Pvt. Ltd. reserves the right to assume exclusive defense and control of any matter subject to indemnification by you, and you shall not settle any such matter without our prior written consent.
                </p>
              </div>
            </section>

            {/* 7. Governing Law */}
            <section id="governing-law" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 07</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">7. Governing Law</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions. The courts of <strong>Navi Mumbai, Maharashtra, India</strong> shall have exclusive jurisdiction over any disputes arising out of or relating to these Terms.
                </p>
                <p>
                  For any disputes arising from international transactions or clients based outside India, the parties agree to attempt good-faith negotiation first, and if unsuccessful, the dispute shall be resolved in the courts of Navi Mumbai, Maharashtra, India.
                </p>
              </div>
            </section>

            {/* 8. Dispute Resolution */}
            <section id="dispute-resolution" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 08</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">8. Dispute Resolution</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall be resolved through the following structured process:
                </p>
                <div className="space-y-4 pt-2">
                  <div className="border border-hairline bg-ibm-layer p-4">
                    <p className="font-medium text-ink">1. Negotiation</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      The parties shall first attempt to resolve the dispute through good-faith negotiation. Either party may initiate the negotiation process by providing written notice to the other party.
                    </p>
                  </div>
                  <div className="border border-hairline bg-ibm-layer p-4">
                    <p className="font-medium text-ink">2. Mediation</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      If the dispute is not resolved within thirty (30) days of the initiation of negotiation, either party may submit the dispute to mediation under the rules of the Indian Council of Arbitration.
                    </p>
                  </div>
                  <div className="border border-hairline bg-ibm-layer p-4">
                    <p className="font-medium text-ink">3. Arbitration</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      If mediation fails, the dispute shall be finally resolved by binding arbitration administered under the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in English in Navi Mumbai, Maharashtra, India.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. Modifications to Terms */}
            <section id="modifications" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 09</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">9. Modifications to Terms</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least thirty (30) days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  We will notify you of significant changes by posting the new Terms on our website and updating the &quot;Last Updated&quot; date. Your continued use of our services after the effective date of any changes constitutes your acceptance of the revised Terms.
                </p>
                <p>
                  It is your responsibility to review these Terms periodically. We recommend bookmarking this page for your reference.
                </p>
              </div>
            </section>

            {/* 10. Contact Information */}
            <section id="contact" className="scroll-mt-24 border border-hairline bg-white p-8">
              <span className="font-mono text-xs text-primary font-medium">SECTION 10</span>
              <h2 className="mt-2 text-2xl font-normal text-ink">10. Contact Information</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  If you have questions, notices, or formal correspondence regarding these Terms &amp; Conditions, please reach out to our legal department:
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="border border-hairline bg-ibm-layer p-4">
                    <p className="font-medium text-ink">ABWcurious OPC Pvt. Ltd.</p>
                    <p className="mt-1 text-xs text-ink-muted">Enterprise Software, Cybersecurity &amp; AI Studio</p>
                    <div className="mt-3 space-y-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3.5 text-primary" />
                        <a href="mailto:info@abwcurious.com" className="hover:underline text-ink">info@abwcurious.com</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-3.5 text-primary" />
                        <a href="tel:+919930338504" className="hover:underline text-ink">+91 99303 38504</a>
                      </div>
                    </div>
                  </div>
                  <div className="border border-hairline bg-ibm-layer p-4">
                    <p className="font-medium text-ink">Legal Jurisdiction &amp; Offices</p>
                    <p className="mt-1 text-xs text-ink-muted">Nerul, Navi Mumbai, Maharashtra, India</p>
                    <div className="mt-3 flex items-start gap-2 text-xs text-ink-muted">
                      <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                      <span>{COMPANY.address}</span>
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
