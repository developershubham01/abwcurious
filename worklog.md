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
