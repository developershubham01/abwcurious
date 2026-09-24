# ABWcurious Company Website — Worklog

Project: Next.js 16 + TypeScript + Tailwind 4 + shadcn/ui company website for **ABWcurious** (AI software studio), single-page app at `/`.

Design references: averonixs.com (structure), writemate.demos.tailgrids.com (dark hairline aesthetic), IBM Carbon design system via `npx getdesign@latest add ibm` (DESIGN.md at project root — IBM Plex Sans/Mono, IBM Blue #0f62fe, square corners, hairline borders, 4px grid).

React Bits components integrated: **DitherVeil**, **DriftWall**, **WebThreads** (all converted to TSX, `ogl` dependency installed).

---

## Task ID: 1
Agent: Z.ai Code (main)
Task: Research references, design system, and full initial build of the ABWcurious company website

Work Log:
- Researched averonixs.com (agency site structure: hero→stats→services→features→FAQ→process→testimonials→pricing→contact), writemate.demos.tailgrids.com (dark #030303 canvas, hairline white/20 frames, mono buttons, roll-up CTA hover, marquees, divide-line grids), and the IBM getdesign theme (Carbon tokens: IBM Plex Sans 300 displays, IBM Blue #0f62fe, radius 0, no shadows, hairlines)
- Ran `npx getdesign@latest add ibm --force` → DESIGN.md at project root
- Installed `ogl@1.0.11`
- Generated 7 AI images via z-ai-web-dev-sdk (scripts-gen.mjs): hero-neural.jpg + 6 work-*.jpg tiles in /public/images
- Converted React Bits JS components to typed TSX in src/components/reactbits/: DitherVeil.tsx (+CSS), DriftWall.tsx (+CSS), WebThreads.tsx (+CSS)
- Built globals.css: IBM Carbon dark theme (bg #060609, hairlines white/10, IBM blues, radius 0), blueprint grid utilities, marquee keyframes, roll-button CSS (in @layer components), logo arc draw animation, custom scrollbar, reduced-motion guards
- layout.tsx: IBM Plex Sans (300/400/500/600/700) + IBM Plex Mono via next/font, full SEO metadata, favicon /logo-mark.svg
- Site components (src/components/site/): logo.tsx (animated SVG ABWcurious swoosh recreation), primitives.tsx (Reveal/Eyebrow/RollButton/CountUp/SectionFrame), header.tsx (utility bar + sticky nav w/ scroll-spy + mobile menu), hero.tsx (DitherVeil visual + stats count-up), marquee.tsx, services.tsx (4 services from uploaded md files), about.tsx (WebThreads backdrop), process.tsx (4 steps), work.tsx (DriftWall showcase), testimonials.tsx (dual marquee), pricing.tsx (3 plans), faq.tsx (2-col accordion), contact.tsx (form + info), footer.tsx (CTA banner + columns + bottom bar)
- page.tsx: single-page composition, min-h-screen flex-col with footer mt-auto (sticky footer rule)
- Backend: prisma/schema.prisma ContactMessage model (db push done), /api/contact POST (zod validation → SQLite) + GET count
- Fixed lint errors: setState-in-effect in CountUp & DriftWall (rAF-wrapped), removed unused code
- Agent Browser verification: hero renders w/ DitherVeil dither + hover reveal + rim effect; scroll-spy nav works; services/about(WebThreads glow)/process/testimonials/pricing/faq/contact/footer all render; FAQ accordion opens; contact form submitted twice end-to-end (rows persisted in SQLite, service select verified); DriftWall 42 tiles drifting; 3 marquees animating; no console/page errors; mobile 390x844 verified (menu, form, footer geometry gapBelowFooter≈0)

Bugs found & fixed during verification:
1. RollButton showed both text layers → added .btn-roll__viewport (h-1.5em overflow-hidden wrapper) + white-space: nowrap
2. Tailwind `hidden` utility beaten by unlayered .btn-roll CSS on mobile header → moved .btn-roll rules into @layer components
3. Stale Turbopack CSS chunk after edits → clean .next + dev server restart (note: kill all `next dev`/`next-server` processes first, then rm -rf .next, then restart — killing by port alone is unreliable in this sandbox)

Stage Summary:
- ✅ Complete single-page company website for ABWcurious at `/` with IBM Carbon dark design, 3 React Bits WebGL/3D components, animated logo, contact backend
- ✅ All lint clean, dev server healthy (bun run dev, port 3000), browser-verified desktop + mobile
- Key decisions: dark adaptation of IBM Carbon (bg #060609 + IBM blues), IBM Plex Mono for eyebrows/buttons/numbers, square corners everywhere, local AI-generated images (CORS-safe for WebGL texture)
- Artifacts: DESIGN.md, /public/images/* (7 images), /public/logo-mark.svg, src/components/reactbits/*, src/components/site/*, src/app/api/contact/route.ts, prisma/schema.prisma, scripts-gen.mjs (image regen script)

Unresolved / next-phase recommendations:
- Contact page uses placeholder phone (+91 99999 99999) / email (hello@abwcurious.com) — replace with real details when provided
- Social links point to "#top" placeholders; wire real profiles
- Optional future: admin endpoint to list contact messages, newsletter block, blog/case-study sections, dark/light theme toggle (currently dark-only by design), OG image asset

---
Task ID: 2
Agent: Z.ai Code (main)
Task: Convert ABWcurious website theme from dark to WHITE & BLUE (user request: "make the theme white and blue")

Work Log:
- Converted src/app/globals.css `:root` tokens to IBM Carbon light: background #ffffff, foreground #161616, card #f7f9fe, blue-ink hairlines rgba(16,40,84,.14/.32), muted #51617a, ring/focus #0f62fe, white scrollbar w/ blue hover, solid blue selection, blue-tinted bg-grid utilities, pulse-dot keyframe retuned to rgb(15,98,254)
- Retuned IBM palette for text-safe contrast on white: ibm-bright #4589ff→#0043ce (blue-70), ibm-soft #78a9ff→#0f62fe, ibm-cyan #33b1ff→#1192e8 (cyan-50), hover #0353e9; canvas-inverse→#001141
- layout.tsx: removed `dark` class from <html> (site is now light-only)
- Site components de-darkened (bg-white/[0.0x]→bg-ibm-blue/[0.0x] or bg-white, border-white/x→border-ink/x, fades #060609→#ffffff): header, hero, services, techstack, process, testimonials, marquee, contact (white form inputs), casestudy (blue-100 image overlay rgba(0,17,65,.88) + #a6c8ff label), pricing (blue badge, blue-tint featured card)
- primitives.tsx RollButton: outline variant now ink-ringed for light bg; ADDED variants "light" (white solid/ blue text) + "outline-light" (white ghost) for use on solid blue surfaces
- footer.tsx: light footer bg #f5f8fe; CTA banner is now a SOLID IBM BLUE (#0f62fe) tile with white blueprint grid, white glows, white text, #a6c8ff accent span, variant="light" + "outline-light" buttons; newsletter input white
- about.tsx WebThreads: lightMode + backgroundColor #ffffff, colors #0f62fe/#1192e8/#a6c8ff (blue threads on white), fades→#ffffff
- work.tsx DriftWall: overlayColor #060609→#ffffff, dim 0.66→0.95
- DriftWall.css light retune: tile bg #0b0b12→#e3ebf7, per-tile overlay opacity 0.42→0.16, hover shadow rgba(0,0,0,.7)→rgba(16,40,84,.4), focus ring white→IBM blue
- hero.tsx DitherVeil: ink #08080d→#001141 (deep IBM blue-100 ink), paper→#ffffff = blue duotone on white
- logo.tsx inner arc #4589ff→#1192e8; public/logo-mark.svg favicon → white bg + blue arcs + blue ABW
- Clean restart: killed all next processes, rm -rf .next, bun run dev (port 3000)
- agent-browser verification (desktop 1440x900 + mobile 390x844): hero (blue dither + grid + gradient text), services, about (WebThreads visible on white), work (DriftWall crisp; hover lifts tile to full color), casestudy tab switch, pricing, FAQ accordion open, contact form END-TO-END (toast "Message sent", success panel, row persisted in SQLite via POST /api/contact 201), newsletter END-TO-END (toast "Subscribed", POST /api/newsletter 201), footer blue CTA + sticky footer geometry gapBelowFooter=0 on mobile, mobile menu works
- Bug found & fixed during verification: DriftWall tiles washed out on white (white overlay 0.42 + dim 0.66 double-fade) → overlay 0.16 + dim 0.95; hover shadows/focus ring re-tinted for light bg
- bun run lint clean; dev.log shows no runtime errors

Stage Summary:
- ✅ Full white & blue IBM Carbon light theme live at `/` — all 3 React Bits components retuned (blue-ink DitherVeil, white DriftWall, light-mode WebThreads), solid-blue footer CTA banner as the anchor statement
- ✅ Browser-verified desktop + mobile, all interactions + both API routes green
- Key decisions: text-safe blues (blue-60/70) instead of light blues for contrast; blue-ink hairlines; monochrome DriftWall tiles that colorize on hover
- Remaining (unchanged from Task 1): placeholder phone/email, social hrefs="#top"; optional: theme toggle, OG image

---
Task ID: 3
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + bug fix + new features (Studio Console admin, Field Notes blog) + styling details + SEO

Work Log:
- QA first: reviewed worklog.md, page.tsx, globals.css, layout.tsx, API routes, all site components; dev.log healthy; /api/contact total=3, /api/newsletter total=1
- agent-browser QA desktop 1440x900 + mobile 390x844: all sections render (full-page gray blocks = Reveal initial states only, verified via scroll-through), zero page errors, zero console errors, mobile menu + DriftWall + form fine
- BUG FIXED: testimonials marquee showed blank gap on the right for >50% of each animation loop — root cause: `justify-center` on rows whose track (2×4 cards ≈ 3.1k px) is wider than viewport, so centered overflow leaves the window outside the track at high translate fractions → removed justify-center (flex-start) and tripled each half (3×4 cards ≈ 4.7k px) so copy width ≥ viewport on ultrawide; verified gap-free via two timed screenshots
- FEATURE /api/stats (GET, force-dynamic): totals (contacts, subscribers, 7-day activity, distinct services), byService + bySource groupBy, 7-day daily histogram, recent 6 contacts + 6 subscribers; read-only, noted auth requirement for production
- FEATURE Studio Console (src/components/site/console.tsx): IBM Carbon admin dialog in-page (single-route rule respected) — footer bottom-bar trigger (Terminal icon) + Ctrl/Cmd+Shift+K shortcut; stat tiles, 7-day bar chart, demand-mix + source bars, recent messages table (max-h scroll), recent subscribers list, 30s auto-refresh while open; fixed % -height bar collapse with px heights during verify
- FEATURE Field Notes (src/components/site/notes.tsx): blog section "09 / Field notes" between FAQ and Contact (contact renumbered 10); 3 full articles (LLM production, RAG retrieval, design systems) with tag/date/read-time cards → shadcn Dialog reader with mono subheads, list + code blocks, "Put this to work" CTA; added Notes to header NAV + footer Resources links
- SEO: generated /public/og-image.png (1216x640, AI; first attempt rendered IBM trademark — regenerated with abstract concentric-arcs prompt, no text/logos); layout.tsx: metadataBase https://abwcurious.com, openGraph+twitter images, robots, JSON-LD Organization (name/url/logo/email/address) injected in <head>
- STYLING details: header scroll-spy active link now has animated sliding blue underline (framer-motion layoutId="nav-underline", spring); contact info tiles restructured with copy-to-clipboard email button (Copy→green Check + toast, verified); footer bottom bar respects iOS safe area via pb-[max(1.5rem,env(safe-area-inset-bottom))]
- Verification: agent-browser — console dialog opens via footer click AND Ctrl+Shift+K, tiles/chart/bars/tables live with real SQLite data (3 contacts, 1 sub); notes dialog reads fully; marquee gap-free; copy-email toast confirmed; mobile: 8-item menu, 2-col console tiles, footer trigger; curl /api/stats 200 JSON correct; /og-image.png 200 image/png 59KB; bun run lint clean; dev.log zero runtime errors

Stage Summary:
- ✅ Site stable → advanced: 1 QA bug fixed, 3 new features (stats API, Studio Console admin, Field Notes blog), SEO upgraded (OG image + JSON-LD + metadataBase), Carbon detail pass (nav underline, copy email, safe-area)
- Section order now: hero→marquee→services→about→process→stack→work→cases→testimonials→pricing→faq→notes(09)→contact(10)→footer(console trigger)
- Key decisions: admin view as in-page dialog (single-route constraint); px-based bar heights; abstract OG art to avoid IBM trademark; unauthenticated /api/stats flagged for auth before production
- Remaining: placeholder phone/email + social hrefs="#top" (need real data); /api/stats unauthenticated (add auth before real deployment); optional next: theme toggle, per-note deep-link (#notes/slug) via hash routing, newsletter double opt-in

---
Task ID: 4
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + new features (inquiry prefill, notes deep-links, CSV export, live clock, skip-link) + styling details

Work Log:
- QA first: read worklog.md; checked dev.log (healthy, all 200s); agent-browser pass at 1440x900 across hero/services/about(WebThreads)/work(DriftWall)/cases/pricing/notes/contact/footer — zero page errors, zero console errors; Studio Console opened via footer button + Ctrl/Cmd+Shift+K with live SQLite data (3 contacts, 1 sub); mobile 390x844 smoke test fine. Verdict: site STABLE, no blocking bugs → proceeded to feature round.
- FEATURE inquiry prefill (src/lib/store.ts): tiny zustand store (presetService + presetNonce). "Discuss this service" (services.tsx) and "Build something like this" (casestudy.tsx, per-case service field) now preset the contact form. contact.tsx effect (rAF-safe, nonce-guarded, toast "Service preselected") sets the Select + shows a dismissible blue "✦ Preselected: <service>" chip with CLEAR button above the form. Verified end-to-end in browser: click card → smooth scroll to #contact → toast + chip + select populated.
- FEATURE notes deep-linking (notes.tsx): controlled dialogs keyed by openSlug; opening pushes #note/<slug>, Escape/UI-close pops history; popstate+hashchange listeners keep dialog in sync (browser Back closes; direct visit to /#note/llm-in-production auto-opens); added "Copy link" button in dialog footer (copies origin + #note/slug, toast "Link copied"). Verified: deep link opens dialog, Escape pops hash back to previous (#contact), Back closes.
- FEATURE CSV export: new /api/export (GET ?type=contacts|subscribers) — proper CSV escaping, Content-Disposition attachment (abwcurious-contacts-YYYY-MM-DD.csv), no-store; verified via curl (headers + rows correct). Studio Console: "⬇ EXPORT CSV" mono buttons in Recent messages + Recent subscribers panel headers → window.location.href triggers download.
- STYLING details: (1) LiveClock in header utility bar — ticking "Studio time HH:MM:SS IST" (Intl.DateTimeFormat Asia/Calcutta, hydration-safe placeholder, cyan pulse dot); (2) IBM Carbon skip-to-content link — fixed top-left, solid #0f62fe, white mono, hidden via translateY(-120%) until :focus-visible (page.tsx skip link + id="main"/tabIndex={-1} + id="top" on wrapper; .skip-link CSS in globals.css); verified reveal on Tab.
- BUG FIXED: after editing globals.css the skip-link rendered UNHIDDEN (computed position:static) — stale Turbopack CSS chunk (same known issue as Task 1). Fix: kill all next processes → rm -rf .next → clean restart; re-verified computed style = fixed/translated, focus reveal works.
- Lint: fixed react-hooks/set-state-in-effect in notes.tsx (deep-link open now rAF-wrapped); bun run lint clean.

Stage Summary:
- ✅ Round 4 shipped: inquiry prefill flow (services + case files → contact form), shareable notes deep links (#note/<slug>) with copy-link, CSV export API + console buttons, live IST studio clock, Carbon skip-to-content.
- ✅ All verified in agent-browser (desktop + mobile); /api/export curl-verified; lint clean; zero runtime errors after clean restart.
- Key decisions: zustand single-purpose store (nonce pattern re-triggers on repeat clicks); pushState/popState pairing for dialog↔history sync; export via direct navigation + Content-Disposition (no blob plumbing).
- Remaining: placeholder phone/email + social hrefs="#top" (need real data); /api/stats + /api/export unauthenticated (add auth before real deployment); optional next: per-case-study deep links (#cases/<id>), newsletter double opt-in, footer BackToTop overlap on the "Engineered with curiosity" line at mobile widths (cosmetic, floating button by design).

---
Task ID: 5
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + feature round (case deep-links, char counter, newsletter social proof) + mobile overlap fix + Carbon detailing

Work Log:
- QA first: read worklog.md; dev.log healthy (all 200s, no runtime errors); lint clean. agent-browser sweep at 1440x900: hero (blue dither + stats + live clock), cases (tabs), notes, Studio Console (Ctrl+Shift+K, live data 3 contacts/1 sub), footer; zero page errors, zero console errors; mobile 390x844 hero clean. Verdict: STABLE, no blocking bugs → feature round.
- FEATURE case-study deep links (casestudy.tsx): Tabs converted to controlled state; hash ↔ tab sync — clicking a tab pushes #cases/<id>, direct visit to /#cases/askor auto-opens Askor (rAF-wrapped for lint), popstate+hashchange listeners keep tabs in sync (browser Back returns to previous case — verified askor→fleetiq→Back→askor). Per-case "COPY LINK" mono button (Link2 icon, Copy→green Check + toast) shares origin/#cases/<id>. NOTE: clipboard writeText requires document focus — real user clicks work; eval-driven clicks throw NotAllowedError (expected browser behavior).
- FEATURE Carbon text-input counter (contact.tsx + api/contact): message textarea now controlled with maxLength 600; live "N / 600" counter (aria-live=polite, tabular-nums) turns ibm-bright at ≥90% and ibm-error at limit; backend zod max lowered 5000→600 to match. Counter resets on successful submit. Verified 0→147/600 live; full form submit end-to-end (done panel + toast).
- FEATURE newsletter social proof (footer.tsx + api/newsletter): POST response now includes total subscriber count (both create + alreadySubscribed paths); toast reads "You're subscriber #N" and success panel reads "You are on the list — subscriber #N. No spam, ever." Verified end-to-end: subscribed qa-round5@abwcurious.test → "subscriber #2" in toast + panel; GET /api/newsletter total=2.
- BUG FIX (cosmetic, known from Task 4): floating BackToTop button overlapped footer bottom-bar © line at mobile widths → bottom bar container pr-20 (sm:pr-6) + © p max-w-[calc(100vw-7.5rem)]; geometry verified: © right edge 302px and "Engineered…" right edge 310px vs button left 322px → clearOfButton=true at 390x844.
- STYLING detailing (casestudy.tsx): case tabs now numbered 01/02/03 (mono, ibm-bright) matching mobile-menu numbering; active tab gained a 2px IBM blue→cyan left accent bar (origin-top scaleY spring-less transition, group-data-[state=active]); TabsList aria-label="Case files".
- Verification: agent-browser — deep link /#cases/askor auto-opens (active tab "02 Askor"), tab click pushes #cases/fleetiq, Back restores askor, Copy link shows "Copied"; counter 0→147/600; contact submit 201 (stats totals contacts=4, subscribers=2, activity7d=6); newsletter total=2; mobile cases tabs render numbered + accent bar; zero page/console errors; bun run lint clean.

Stage Summary:
- ✅ Round 5 shipped: shareable case-file deep links (#cases/<id>) with history sync + copy-link, Carbon message counter (600, front+back aligned), newsletter subscriber-count social proof, mobile footer overlap fix, numbered case tabs with IBM accent bar.
- ✅ All verified desktop + mobile; APIs curl-checked; lint clean; zero runtime errors.
- Key decisions: tabs (unlike dialogs) push on every change and fall back to first case when hash is absent (Back from a case lands on previous case, not section top); controlled textarea for counter accuracy; count computed after create for consistency.
- Remaining: placeholder phone/email + social hrefs="#top" (need real data); /api/stats + /api/export unauthenticated (add auth before real deployment); optional next: per-note "next article" pager in dialog, FAQ search/filter, OG image per-case (dynamic og route), newsletter double opt-in.

---
Task ID: 6
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + feature round (FAQ live search, notes prev/next pager, Careers section with apply-prefill) + responsive nav fix

Work Log:
- QA first: read worklog.md; dev.log healthy (200s, no runtime errors); agent-browser sweep at 1440x900 across hero/faq/notes/contact + APIs curl-checked (stats 200 {contacts:4,subs:2}, export 200, og 200) + notes deep-link auto-open verified; zero page errors, zero console errors. Verdict: STABLE, no blocking bugs → feature round.
- FEATURE FAQ live search (faq.tsx): Carbon mono search input (Search icon, blue focus ring, hairline border) with live filtering over q+a text, "N/7" result counter (aria-live), clear button, empty state (SearchX icon + "No answers match" + clear CTA); Accordion converted to controlled (value/onValueChange) and typing auto-opens the first match (event-driven, no effect); original numbering 01–07 preserved while filtered. Verified: "pricing" → 1/7 + item 05 auto-expanded; "zzzz" → empty state; clear restores 7 items.
- FEATURE notes prev/next pager (notes.tsx): pagination nav as last block in each note dialog (grid-cols-2 hairline tiles, mono PREVIOUS/NEXT labels + truncated target titles, disabled at ends, aria-label "Note pagination — X of 3"); goToNote uses history.replaceState so browser history stays linear (Back always exits the dialog, never reopens the previous note) — verified 01→02 (url #note/rag-retrieval-details) and Escape returns to clean /.
- FEATURE Careers "Join the studio" (new careers.tsx, section id="careers" numbered 10 between Notes and Contact): left sticky column (heading, blurb, pulse-dot "3 open roles" chip, 2×2 perks hairline grid) + right role accordion (3 roles: Senior AI Engineer / Product Designer (UI/UX) / Full-Stack Engineer (Next.js), each with mono index, type/location meta chips, expanded blurb + "What you'll do"/"You bring" bullet columns + Apply RollButton) + dashed "Don't see your role?" speculative-application card with mailto.
- FEATURE apply-prefill (store.ts + careers.tsx + contact.tsx): zustand extended with presetRole/roleNonce/clearPresetRole (same nonce pattern as services); Apply sets role → contact form shows briefcase "Application: <role>" chip, service auto-set to "Join the team" (new option in the select), message textarea prefilled with "Hi ABWcurious — I'd like to apply for the <role> role. A little about me: " (only if empty; counter reflects prefill, e.g. 86/600), toast "Application started"; chip Clear resets role+service; submit success clears role. VERIFIED END-TO-END: applied as QA Applicant → 201, /api/stats now contacts=5, byService "Join the team":1.
- RENumbering: contact eyebrow 10→11 ("11 / Get in touch"); section order now …faq(08)→notes(09)→careers(10)→contact(11).
- Nav/footer wiring: header NAV + mobile menu gained Careers (09 entries; mobile menu max-h 480→620px so 9 items + CTA no longer clip — verified all visible at 390x844); footer Company "Careers" href #contact→#careers.
- RESPONSIVE FIX (found during verify): with 9 items the desktop nav touched the CTA button at the 1024px lg breakpoint (gap 0) → nav gap-6→gap-5 (xl:7) and item text-[13px]→text-xs (xl:13px); re-measured gap=30px at 1024x768 (fits) and 110px at 1280.
- Verification: agent-browser desktop 1440 + 1280 + 1024 + mobile 390x844 — FAQ search/empty/clear, notes pager + Escape pop, careers accordion + apply prefill + form submit (done panel + toast), Studio Console (Ctrl+Shift+K) live with 5 contacts / 2 subs / "Join the team" in demand mix, footer links; zero page/console errors; bun run lint clean; dev.log clean.

Stage Summary:
- ✅ Round 6 shipped: FAQ live search with auto-open + empty state, notes prev/next pager with linear history, full Careers section (3 roles, perks, speculative-applications card) wired into nav/footer, apply-prefill flow into contact form with "Join the team" service, responsive nav tightening at lg, mobile menu height fix.
- ✅ All verified desktop (3 breakpoints) + mobile; application submitted end-to-end and visible in /api/stats + Studio Console; lint clean; zero runtime errors.
- Key decisions: replaceState (not pushState) for in-dialog note switching so Back exits cleanly; auto-open first FAQ match event-driven in the onChange handler (avoids effect lint pattern); applications reuse the contact pipeline (service="Join the team") instead of a new endpoint; role chip supersedes the service chip display while active.
- Remaining: placeholder phone/email + social hrefs="#top" (need real data); /api/stats + /api/export unauthenticated (add auth before real deployment); optional next: dynamic OG per case/note, newsletter double opt-in, auth gate for Studio Console.

---
Task ID: 7
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + hardening round (console passcode gate, FAQPage JSON-LD, vCard download, error boundaries)

Work Log:
- QA first: worklog reviewed (through Task 6); dev.log healthy; agent-browser sweep at 1440x900 — careers/faq/contact render, zero page errors; curl probes: stats 200, export 200, vcard 404 (not yet built = this round's feature). Verdict: STABLE → hardening round.
- FEATURE console passcode gate (new src/lib/console-auth.ts + api/stats + api/export + console.tsx): guardConsole() accepts x-console-key header OR ?key= param, validated against process.env.CONSOLE_PASSCODE (default demo key "abw-2026", surfaced honestly in the gate hint); both routes now 401 without/with-wrong key. Console UI: "RESTRICTED CONSOLE" gate screen (LockKeyhole icon, mono password input + UNLOCK, role=alert error line, demo-key hint) replaces dashboard until unlocked; key persisted in sessionStorage ("abw-console-key") → auto-unlock on reopen/reload; Lock button in header clears the session key; 401 mid-session (e.g. env changed) tears the key down and re-gates; CSV export URLs now append &key= for direct-navigation downloads. Verified curl matrix: nokey→401, badkey→401, header→200, query→200 (both routes); browser: gate renders, wrong key shows "Invalid console key — try again.", abw-2026 unlocks live dashboard (6 contacts / 3 subs incl. curl smoke rows), Lock re-gates, unlock→reload→reopen auto-unlocks.
- FEATURE FAQPage JSON-LD: FAQ content extracted to shared src/lib/content-faq.ts (single source of truth — faq.tsx now imports it); layout.tsx injects a second ld+json script with FAQPage/mainEntity (7 questions) mirroring the on-page FAQ for Google rich results. Verified in-browser: document head contains FAQPage JSON-LD with 7 questions.
- FEATURE vCard download (new /api/vcard + contact.tsx): proper VCARD 3.0 payload (FN/ORG/TITLE/EMAIL/TEL/URL/ADR/NOTE) served as text/vcard attachment abwcurious.vcf; "Save contact card" button with ContactRound icon + .vcf chip added under the availability card in the contact info column (fits 390px, verified). curl 200 + correct headers.
- FEATURE error boundaries: new src/app/error.tsx (client, "500 · Something broke — A wire came loose." + Try again (reset) + Back home + mailto + digest ref, blueprint-grid Carbon styling) and src/app/not-found.tsx ("404 · Page not found — Off the canvas." + Back home + Report a broken link). Verified /does-not-exist renders the styled 404. NOTE: standalone by design (header/footer live in page.tsx not layout.tsx, so boundaries render without chrome) — intentional to keep sticky-footer structure untouched.
- BUG (transient, diagnosed): during verification a ReferenceError "ContactRound is not defined" appeared in console history — stale Turbopack chunk mid-edit (component with new JSX compiled before the import edit); confirmed lucide-react exports ContactRound (node require check) and a fresh load renders zero errors + the button. Same known HMR quirk documented in Tasks 1/4; no code change needed.
- DB smoke rows added via curl during API testing: qa7@abwcurious.test contact + t7@abwcurious.test subscriber (visible in console: 6 contacts / 3 subs).
- Verification: curl auth matrix all green; browser desktop 1440 + mobile 390x844 (gate, dashboard 2-col tiles, vCard button, 404, JSON-LD); zero page errors on fresh load; bun run lint clean; dev.log clean.

Stage Summary:
- ✅ Round 7 shipped: passcode-gated Studio Console + stats/export APIs (session-persistent, lockable, configurable via CONSOLE_PASSCODE), FAQPage structured data via shared content module, downloadable studio vCard, Carbon-styled 404 + 500 error boundaries.
- ✅ Security TODO from Tasks 3–6 resolved (demo-grade gate, honest about its limits); all flows browser + curl verified; lint clean; zero runtime errors after fresh load.
- Key decisions: header OR query-param key (query needed for Content-Disposition downloads via direct navigation); sessionStorage not localStorage so keys die with the tab; FAQ content hoisted to lib to guarantee JSON-LD/page parity; error pages standalone (no header/footer) to avoid restructuring the page-level flex/sticky-footer wrapper.
- Remaining: placeholder phone/email + social hrefs="#top" (need real data — vCard TEL also placeholder until then); gate is demo-grade (swap for real sessions/auth before production); optional next: per-case/note dynamic OG images, newsletter double opt-in, move Header/Footer into layout for chrome'd error pages.

---
Task ID: 8
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + architecture round (chrome'd layout, RSS feed, real social links) + styling details

Work Log:
- QA first: worklog reviewed (through Task 7); dev.log healthy; agent-browser fresh-load sweep at 1440x900 — testimonials marquee, nav underline, zero page/console errors; mobile 390x844 sticky-footer geometry gapBelowFooter=0. Verdict: STABLE → architecture + content round.
- FEATURE chrome'd root layout (layout.tsx + page.tsx + error.tsx + not-found.tsx): moved skip-link, ScrollProgress, Header, Footer, BackToTop and the #top flex min-h-screen wrapper from page.tsx into the root layout; page.tsx now returns only <main id="main" tabIndex={-1} class="flex-1 outline-none"> with the 14 sections; error/not-found boundaries wrapped in the same main shell (id="main" gives the skip link a target on every route). Result: 404/500 pages now render with the full site chrome (utility bar, nav, footer CTA) — screenshot-verified /nope shows header + "Off the canvas" + footer banner. Sticky-footer rule preserved (flex column + mt-auto): gapBelowFooter=0 re-measured desktop + mobile after the move.
- FEATURE Field Notes RSS (new /api/rss + src/lib/content-notes.ts): NOTES content (types + 3 essays) extracted from notes.tsx to a shared lib module (same pattern as content-faq); notes.tsx imports it, ArticleBody renderer kept local. /api/rss serves RSS 2.0 XML (title/link/guid/pubDate RFC-822/category/description per item, atom:link self, 1h cache) with links to #note/<slug> deep links. Advertised via metadata alternates.types (renders <link rel="alternate" type="application/rss+xml" href="https://abwcurious.com/api/rss">) + footer Resources "Field notes RSS" row. curl-verified: 200, content-type application/rss+xml, 3 valid items.
- FEATURE real social URLs (header.tsx SocialRow): #top placeholders replaced with platform URLs under the studio handle (github.com/abwcurious, linkedin.com/company/abwcurious, x.com/abwcurious) with target=_blank rel=noopener noreferrer, title tooltips, "(opens in a new tab)" aria-labels; inline comment flags them as placeholder handles pending real profiles. Verified href in DOM.
- STYLING details: 404/500 boundary pages restyled to sit inside the chrome (flex-1 main, min-h-[70vh] centered panel, blueprint grid + radial glow retained); footer Resources column now 6 links (RSS last); social row tooltips.
- Lint fix: the scripted NOTES extraction initially clipped the ArticleBody renderer from notes.tsx (react/jsx-no-undef) → restored it; bun run lint clean.
- Verification: agent-browser — home renders all chrome elements (main/header/footer/skip-link/progress), notes dialog opens from shared content (deep link #note/rag-retrieval-details), 404 chrome'd, footer RSS link + head alternate link + GitHub social href present; desktop gapBelowFooter=0; mobile 390x844 menu (9 items + CTA, ctaBottom 590 < 844) clean; zero page/console errors; curl /api/rss 200 XML; bun run lint clean; dev.log clean (404 for /nope expected).

Stage Summary:
- ✅ Round 8 shipped: root layout now owns the site chrome (error/404 pages fully navigable), Field Notes published as RSS 2.0 (/api/rss + head alternate + footer link), social icons point at real platform URLs, notes content centralized in lib.
- ✅ All flows re-verified desktop + mobile after the layout restructure; lint clean; zero runtime errors.
- Key decisions: layout-level chrome over per-boundary headers (single source, sticky-footer semantics preserved by keeping the flex wrapper at layout); RSS at /api/rss (route allowed, /api prefix consistent with contact/newsletter/stats); #note hash links in RSS items match the site's existing deep-link routing; social handles documented as placeholders.
- Remaining: phone/email still placeholder (vCard TEL included) until real details arrive; social handles need real profiles; gate is demo-grade (swap for real sessions before production); optional next: per-case/note OG images (low value while deep links are hash-based), newsletter double opt-in (needs email infra), sitemap.xml (single-route site — marginal).

---
Task ID: 9
Agent: Z.ai Code (main)
Task: QA assessment (agent-browser) + admin tools round (newsletter admin view, inbox workflow, console tabs) + print stylesheet

Work Log:
- QA first: worklog reviewed (through Task 8); agent-browser fresh-load sweep at 1440x900 — zero page/console errors; all section ids verified (hero/testimonials are not ids by design, nav anchors all resolve); auth matrix curl-probed: stats 401 nokey → 200 with key, export 200, rss 200, vcard 200, og-image.png 200 (static file — /api/og from Task 6 notes no longer exists, not a bug); robots.txt present. Verdict: STABLE, no blocking bugs → feature round per candidate list ("newsletter admin view", "stats dashboard").
- SCHEMA: ContactMessage gained `status String @default("new")` (new|read|archived) via bun run db:push (SQLite column + client regenerated).
- NEW API /api/messages: GET full inbox (auth) + PATCH {id,status∈new|read|archived} (auth). curl matrix: nokey 401, valid 200, bad status 400 (zod), bad id 404.
- NEW API /api/subscribers: GET full list (auth) + DELETE {id} (auth, returns removed email + new total). curl matrix: nokey 401, delete 200, re-delete 404.
- STATS: /api/stats totals now includes `unread` (count of status="new"); recentContacts select includes status.
- CONSOLE OVERHAUL (console.tsx rewritten): stat tiles row (4th tile swapped "Services engaged"→"Unread inbox" with MailOpen icon) + NEW equal-cell Carbon tablist — Overview | Inbox | Subscribers (active = ibm-bright text + 2px blue bottom bar; Inbox tab carries a live blue unread-count badge). Overview keeps 7-day chart + demand/source mixes (redundant "recent" lists removed). INBOX tab: All/New/Read/Archived filter chips with counts (aria-pressed), full-message rows where unread = blue left rail + blue-tint bg + semibold name, archived = muted + "archived" chip; row actions = mark read/new (MailOpen/Mail) + archive/restore (Archive/ArchiveRestore); click-email-to-copy with toast. SUBSCRIBERS tab: mono search input (email/source filter, live N/M aria-live counter, empty state with clear CTA), full table (email+copy, source chip, joined date+timeAgo, sticky header), two-step remove — Remove arms a red "Confirm" (Check icon) for 3.5s, second click DELETEs; optimistic updates + rollback on error + toasts; Export CSV retained.
- DATA FLOW: loadAll() (stats+inbox+subs) on unlock & on 30s auto-refresh; tab switches trigger quiet reload of that tab's list; shared handle401() tears the session key down on mid-session 401; patchStatus/removeSubscriber optimistic with rollback; count-up animation (rAF, cubic ease-out) on stat tiles matching the site's hero CountUp pattern (React hooks lint rule respected — no sync setState in effect body).
- MOBILE FIX (found during verify): 3-tab tablist overflowed 390px (content 477px) → tab buttons got min-w-0 + px-1.5/text-[10px]/tracking-0.1em at mobile, sm: restores desktop sizing; re-measured right-edge 364 < 390, all three labels fully visible.
- STYLING detail: print stylesheet appended to globals.css (@media print — hides header/footer/skip-link/dialogs, [data-scroll-progress], [data-back-to-top], [data-reactbits-canvas] (DitherVeil), forces white bg, break-inside:avoid on sections, prints external link hrefs after anchors) + data attributes added to ScrollProgress/BackToTop/DitherVeil root.
- OPS incident (resolved): dev server's in-memory Prisma client went stale after client regeneration (new `status` field → PrismaClientValidationError on /api/messages). touch/db reload didn't invalidate it; the auto-started dev server was killed, supervisor did NOT auto-restart, and backgrounded relaunches died with the shell session. Working recipe: `(setsid bun run dev > /dev/null 2>&1 < /dev/null &)` double-fork detach — server now survives across tool calls (PIDs 23849/23852) and pipes to dev.log as before.
- DB smoke rows: qa9-remove@abwcurious.test subscriber created via POST /api/newsletter then removed through the UI two-step flow; qa9-del@abwcurious.test created+deleted via curl; QA Round Seven message exercised read→archive→restore through the UI.
- Verification: full curl matrix (401/400/404/200 on both new routes; stats unread correct); browser desktop 1440 — unlock → tabs/badge 5, mark-read (badge+tiles 5→4 live), archive (chips All6/New4/Read1/Archived0), archived filter shows rail-less muted row with chip, restore (Read 2, Archived 0), subscribers search "remove"→1 row, confirm-arm red state screenshot, confirm → row gone + tile 4→3 + "Subscriber removed" toast; session auto-unlock on reopen; mobile 390x844 — dialog full-width, no x-overflow, tiles 2-col, tabs fit, chips wrap clean; zero page/console errors both viewports; bun run lint clean; dev.log all 200s with status field in queries.

Stage Summary:
- ✅ Round 9 shipped: Studio Console is now a 3-tab admin tool — Overview (tiles+chart+mixes), Inbox (read/archive workflow with filters, unread rail, copy, toasts), Subscribers (searchable newsletter admin view with two-step unsubscribe + CSV export); /api/messages + /api/subscribers passcode-gated CRUD; stats unread metric; count-up tiles; print stylesheet; mobile tab fix.
- ✅ End-to-end verified via curl matrices + agent-browser at desktop and mobile; lint clean; zero runtime errors.
- Key decisions: status as plain string (SQLite-friendly) validated by zod enum at the API edge; optimistic updates with rollback for snappy admin UX; "Services engaged" tile traded for "Unread inbox" (services mix already visible in Overview); tab-switch quiet reloads keep lists fresh without waiting on the 30s poll; two-step inline confirm over a modal dialog (faster, still safe with 3.5s window + onBlur disarm).
- Remaining: phone/email still placeholder (vCard TEL included); social handles pending real profiles; gate demo-grade (swap for real sessions before production); optional next: command palette (⌘K) for section nav + actions, dynamic OG per note (low value while hash deep-links), newsletter double opt-in (needs email infra).

---
Task ID: 10
Agent: Z.ai Code (main)
Task: Round 10 — QA sweep, auth-gate hardening (session tokens + rate limiting), ⌘K command palette

Work Log:
- QA first: worklog reviewed (through Task 9); agent-browser desktop 1440x900 + mobile 390x844 fresh-load sweep — zero page/console errors, no x-overflow, console auto-unlock live (INBOX badge). Verdict: STABLE → feature round per remaining list ("gate demo-grade" + "command palette").
- AUTH HARDENING: console-auth.ts rewritten — passcode is now only an exchange credential. POST /api/console/unlock (zod {key}) validates timing-safely and issues an HMAC-SHA256 signed session token {v,iat,exp} (8h TTL, base64url payload.sig); secret = CONSOLE_SESSION_SECRET or derived from CONSOLE_PASSCODE (rotating either invalidates all sessions). guardConsole accepts x-console-token header / ?t= param (CSV downloads) or legacy x-console-key/?key=; every failed attempt feeds a per-IP bucket (8 failures / 5 min → 429 + Retry-After) stored on globalThis so ALL route bundles share one bucket (per-route module copies in dev silently split the bucket — found and fixed).
- Rate-limit matrix: 7×401 then 8th → 429, Retry-After: 300; unlock + export routes share the lock; valid-token requests from a blocked IP are also refused (fail2ban stance). Curl matrix: wrong key 401, bad body 400, valid unlock 200 {token,expiresAt}, stats via token 200, garbage/tampered token 401, legacy key 200, export ?t= and ?key= 200, no-creds 401; PATCH messages + DELETE subscribers via token 200.
- Console UI token flow: unlock() POSTs to /api/console/unlock; sessionStorage stores {token,expiresAt} under new key abw-console-token (old passcode key invalidated); all fetches send x-console-token; exportCsv appends ?t=; restore-on-open checks client-side expiry; copy now says a signed 8h token is issued + warns about the 8-attempt lockout. UI e2e: unlock gate → wrong key error → 429 surfaced live ("retry in 10s") → valid unlock → tabs + INBOX badge live; sessionStorage holds signed token, zero passcode leakage.
- ⌘K COMMAND PALETTE (new palette.tsx, cmdk/shadcn CommandDialog, Carbon restyle — blue top rail, square corners, hairlines, mono uppercase group headings, blue selected row + inset 2px blue bar, keyboard legend strip): Navigate (12 section anchors incl. #stack/#cases), Studio actions (copy email/phone with toast, vCard download, subscribe→footer box, start-a-project→contact form), Console (dispatches abw:console-open — console.tsx now listens), Resources (RSS). Global Ctrl/Cmd+K (Shift+K still console); triggers: header ⌘K chip (desktop), mobile-menu "Quick actions" row, footer "Quick actions ⌘K" beside Studio Console.
- cmdk filter fix: default fuzzy scoring let "newsletter" highlight "Work" (DOM order beats score) — CommandDialog now forwards a custom filter (every search word must be a literal substring of the value) via ui/command.tsx; also forwarded onCloseAutoFocus.
- Scroll reliability engineering (the long hunt): (1) stale Turbopack dev chunk in the browser cache masked every fix until a browser restart — server curl checks kept passing while the browser ran old code, and window.scrollTo patch proved calls:0; (2) scrolling the wall triggers a lazy-image cascade — layout drifts for 10+s after arrival, defeating one-shot scrollIntoView and every stability-heuristic exit; (3) two trackers fought (singleton now: new target cancels the previous). Final trackScroll: injects html{scroll-behavior:auto!important} during tracking, re-aims instantly every frame, exits on 10s without a needed correction (rAF timestamps), 60s cap, yields to wheel/touchmove. Also fixed a TDZ crash (navigate closed over trackScroll before declaration — component died at render).
- react-hooks/refs lint: pendingFocus/activeTrack moved from refs to module-scope singleton state (one palette per page).
- Styling detail: header/footer/mobile ⌘K affordances styled to Carbon (hairline chips, mono kbd, hover-blue), palette visually integrated (see tool-results/qa10-desktop-palette.png, qa10-mobile-palette.png).
- Verification: full palette e2e on fresh browser — correct selections for "newsletter"/"start a"/"pricing"/"copy email"/"console"; newsletter pinned (top 408), contact pinned (name 260) with singleton cancel, pricing nav top=96 + #pricing hash, copy toast, console opens, zero errors desktop+mobile; lint clean; dev.log all 200s.

Stage Summary:
- ✅ Round 10 shipped: Studio Console auth upgraded from static passcode to HMAC-signed 8h session tokens with per-IP rate limiting (8 fails/5min, globalThis-shared bucket) + timing-safe compares; console UI never persists the passcode; ⌘K command palette (19 commands, 4 groups) with Carbon styling and reflow-cascade-proof scrolling; triggers in header/footer/mobile menu.
- ✅ Verified end-to-end via curl auth matrices + agent-browser at 1440/390; lint clean; zero runtime errors.
- Key decisions: token over session-cookie (stateless, curl-friendly, passcode never stored client-side); fail2ban-style full-IP lock including valid tokens; custom cmdk substring-AND filter (DOM-order selection defeats fuzzy scoring); module-scope singleton state over refs (lint + single-instance semantics); rAF-timestamp quiet exit as the only drift-proof criterion.
- Remaining: real phone/email still placeholders (+91 99999 99999 / hello@abwcurious.com); social handles pending real profiles; gate is now session-based but still demo key abw-2026 (set CONSOLE_PASSCODE + CONSOLE_SESSION_SECRET in production); optional next: dynamic OG per note (low value while hash deep-links), newsletter double opt-in (needs email infra), focus field directly from palette actions if Radix focus-restore timing ever becomes reliable in headless.
