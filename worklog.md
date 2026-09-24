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
