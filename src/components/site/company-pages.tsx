"use client";

import { ExternalLink, Lock } from "lucide-react";
import { useViewRoute, closeView } from "@/lib/view-route";
import { ViewShell } from "./view-shell";
import { AboutPage } from "./about-page";
import { Events } from "./events";
import { Careers } from "./careers";
import { ContactPage } from "./contact-page";
import { SOCIALS, COMPANY, isPlaceholder, SAMPLE_NOTE } from "@/data/company";
import { Reveal } from "./primitives";
import { PLATFORM_ICONS } from "./social-row";

/* ------------------------------------------------------------------ */
/*  #/events — full events listing (reuses the landing Events section  */
/*  under a page-scoped id so anchors never collide).                  */
/* ------------------------------------------------------------------ */
export function EventsPage() {
  return (
    <div className="pt-6">
      <Events id="events-page" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  #/careers — open roles (revives the previously parked component).  */
/* ------------------------------------------------------------------ */
export function CareersPage() {
  return (
    <div className="pt-6">
      <Careers />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  #/social — every channel, Carbon resource-tile grid.               */
/* ------------------------------------------------------------------ */
export function SocialPage() {
  return (
    <div className="bg-background pt-14 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="flex items-center gap-2.5 text-sm text-primary">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            Social media
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-light leading-[1.15] tracking-tight text-ink sm:text-5xl">
            Follow the journey, everywhere.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            Launches, behind-the-scenes, event recaps and the occasional build
            log — pick your platform and ride along with {COMPANY.name}.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {SOCIALS.map((s, i) => {
            const dead = isPlaceholder(s.href);
            const Icon = PLATFORM_ICONS[s.platform];
            return (
              <li key={s.platform}>
                <Reveal delay={0.05 * i} className="h-full">
                  {dead ? (
                    <div
                      className="group flex h-full cursor-not-allowed flex-col bg-white p-6 opacity-75"
                      title="Link placeholder — add the real URL in src/data/company.ts"
                      aria-disabled="true"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {Icon && <Icon className="size-4 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />}
                          <h2 className="text-lg font-normal text-ink">{s.label}</h2>
                        </div>
                        <Lock className="size-4 text-ibm-subtle" strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-sm text-ink-muted">{s.handle}</p>
                      <p className="mt-auto pt-6 text-sm text-ibm-subtle">
                        Coming soon — URL not set yet
                      </p>
                    </div>
                  ) : (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-ibm-layer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {Icon && <Icon className="size-4 text-ink-muted transition-colors group-hover:text-primary" strokeWidth={1.75} aria-hidden="true" />}
                          <h2 className="text-lg font-normal text-ink">{s.label}</h2>
                        </div>
                        <ExternalLink
                          className="size-4 text-ibm-subtle transition-colors group-hover:text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-2 text-sm text-ink-muted">{s.handle}</p>
                      <p className="mt-auto pt-6 text-sm text-primary group-hover:underline">
                        Open channel
                      </p>
                    </a>
                  )}
                </Reveal>
              </li>
            );
          })}
          {/* 6th cell — email CTA so the gap-px grid never shows a hole */}
          <li>
            <Reveal delay={0.3} className="h-full">
              <a
                href={`mailto:${COMPANY.email}`}
                className="group flex h-full flex-col bg-primary p-6 text-white transition-colors hover:bg-ibm-blue-hover"
              >
                <h2 className="text-lg font-normal">Prefer email?</h2>
                <p className="mt-2 text-sm text-white/80">{COMPANY.email}</p>
                <p className="mt-auto flex items-center gap-1.5 pt-6 text-sm group-hover:underline">
                  Write to the studio
                  <ExternalLink className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                </p>
              </a>
            </Reveal>
          </li>
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-6 text-xs text-ibm-subtle">{SAMPLE_NOTE}</p>
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PagesPortal — mounts whichever company page the hash requests.     */
/* ------------------------------------------------------------------ */
export function CompanyPagesPortal() {
  const route = useViewRoute((s) => s.route);

  if (route.kind === "about") {
    return (
      <ViewShell crumb="About / Company profile" label="About ABWcurious" activeNav="#/about" onClose={closeView}>
        <AboutPage />
      </ViewShell>
    );
  }
  if (route.kind === "events") {
    return (
      <ViewShell crumb="Company / Events" label="ABWcurious events" activeNav="#more" onClose={closeView}>
        <EventsPage />
      </ViewShell>
    );
  }
  if (route.kind === "social") {
    return (
      <ViewShell crumb="Company / Social media" label="ABWcurious social media" activeNav="#more" onClose={closeView}>
        <SocialPage />
      </ViewShell>
    );
  }
  if (route.kind === "careers") {
    return (
      <ViewShell crumb="Company / Careers" label="Careers at ABWcurious" activeNav="#more" onClose={closeView}>
        <CareersPage />
      </ViewShell>
    );
  }
  if (route.kind === "contact") {
    return (
      <ViewShell crumb="Contact / Get in touch" label="Contact ABWcurious" activeNav="/contact" onClose={closeView}>
        <ContactPage />
      </ViewShell>
    );
  }
  return null;
}
