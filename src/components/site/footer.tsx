"use client";

import { Logo } from "./logo";
import { SocialRow } from "./header";
import { Reveal, RollButton } from "./primitives";

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
    links: ["Selected work", "Pricing", "FAQ", "Privacy Policy"],
    hrefs: ["#work", "#pricing", "#faq", "#top"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#0a0a10]">
      {/* Big CTA banner */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 lg:border-x lg:border-hairline">
          <Reveal>
            <div className="relative overflow-hidden border border-ibm-bright/50 bg-gradient-to-br from-ibm-blue/15 via-transparent to-ibm-cyan/10 px-8 py-12 text-center sm:px-12 lg:py-16">
              <div
                className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-ibm-soft">
                  Ready when you are
                </p>
                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light leading-tight tracking-tight sm:text-5xl">
                  Build your next product with{" "}
                  <span className="text-ibm-bright">curious minds.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  Free discovery call. Written proposal in 48 hours. Working software in weeks, not
                  quarters.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <RollButton href="#contact" variant="primary" arrow>
                    Get a Quote
                  </RollButton>
                  <RollButton href="#work" variant="outline">
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 font-mono text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} ABWcurious™. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ibm-success" aria-hidden="true" />
            Engineered with curiosity in Pune, India
          </p>
        </div>
      </div>
    </footer>
  );
}
