# AGENTS.md — Portfolio Project

## Stack & Versions
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` syntax in `globals.css`)
- Framer Motion — used only for the dock, hover-preview card, palette, and
  scroll-progress bar. Scroll reveals are **CSS**, not Framer (see below).
- OpenAI API for chatbot (with offline fallback)
- Geist + Geist Mono via `next/font/google` (siblings, so mono labels sit on the same skeleton as body text)

## Design language
The site is a minimal single-page document: paper background with an 18px dot
lattice, ink text, hairline rules, deliberately small type (the `h1` is
`1.05rem`), and lowercase section labels. Content is **text rows, not image
cards**. Keep new work in that register — no big hero type, no gradient washes,
no glass panels.

## Architecture
- **`TopRail` is in the root layout** (`src/app/layout.tsx`) and renders
  **nothing on `/`** — the home page loads with no chrome at all. Navigation
  and search come from `SectionDock`, a floating top-centre bar that slides in
  once you scroll past the intro. Do not add a navbar to individual pages.
- **Home is one scroll**: `src/components/Home.tsx` composes the sections in
  `src/components/home/`. Section anchor ids (`notes`, `projects`,
  `experience`, `stack`, `certifications`, `contact`, `playground`) are shared
  by `SectionDock.DOCK_SECTIONS` and the command palette. Ids track the
  visible labels (`writing`, `projects`, `work`, `toolkit`, `credentials`,
  `contact`, `sandbox`) — change a label and change its id with it, in
  `SectionDock.tsx` **and** the section's own `<SectionHead id>`.
- **Internal navigation goes through `@/components/providers/RouteTransition`**,
  a drop-in `next/link` replacement that cross-fades routes with the View
  Transitions API. Import `Link` from there, not `next/link`, for any in-app
  href. Genuine `next/link` is still correct for `target="_blank"` and asset
  links (the resume PDF).
- **Client components** using Framer Motion (`motion`, `AnimatePresence`) must have `"use client"` at the top. Static generation fails without it.
- **Data sources**: `src/app/data/Profile.ts` (identity, socials, experience,
  stack, intro glossary), `Projects.ts`, `Blog.ts`, `Certifications.ts`, and
  `HeroIcons.tsx` (skill icons + `aboutText`, which the chat API prompt uses).
- **Blog**: `/blog` listing + `/blog/[slug]` detail. Static TypeScript posts (no MDX). Giscus comments are optional and not wired by default.
- **Theme system**: Custom light/dark/midnight via `localStorage` key `portfolio-theme`. The theme script runs inline in `layout.tsx` before React hydrates.

## Key Gotchas
- **Scroll reveals must stay CSS-driven.** `Reveal` ships content *visible* and
  the hidden state only applies under `html.js` (set by the inline bootstrap in
  `layout.tsx` before first paint). An earlier version used Framer's
  `whileInView`, which left every row stuck at `opacity: 0` whenever the
  observer did not fire — and served a blank page to no-JS clients. `Reveal`
  also carries a 2.5s failsafe that reveals regardless. Do not swap it back.
- **`DotField`** (`components/home/DotField.tsx`) is a fixed, `pointer-events-none`
  canvas at `-z-10`. It is phase-locked to the CSS dot lattice: the lattice is
  `background-size: 18px` so each dot centres at `n*18 + 9`. If you change
  `--dot-size`, change `GRID` in `DotField.tsx` and `CELL` in `LifeGrid.tsx` too.
- Canvas components read theme colours from CSS custom properties and re-read
  them via a `MutationObserver` on `documentElement`. New canvas work should do
  the same rather than hard-coding colours.
- **`DotField` parks its rAF loop** when the halo is static and wakes on
  pointer input, resize, or theme change. If you add work to its `tick`, keep
  the park/`wake()` contract — an always-on loop redraws a static page at 60fps.
- **Two view transitions share the root snapshot**, so each sets
  `documentElement.dataset.transition` (`"theme"` or `"route"`) before starting
  and clears it on `finished`. The CSS in `globals.css` is scoped on that flag —
  an unscoped `::view-transition-*` rule will break the other one.
- **Theme switching goes through `setTheme(pref, origin)`** in `AppUIProvider`,
  which runs a View Transitions circular reveal from `origin`. The DOM write is
  synchronous inside the transition callback (with `flushSync` for React), so
  the browser snapshots the new palette. Feature-detected; falls back to a
  plain swap on Firefox and under reduced motion.
- **Next.js `<Image>` does not handle SVGs well from `public/`**. Use conditional rendering: `.svg` → `<img>`, `.png`/`.jpg` → `<Image>`.
- **`.shell`** is the container: `min(62rem, 100% - 2*gutter)`, centred.
  `.page-shell` is the old wide container, kept only as a legacy alias.
- The dock floats over content at `top-3`, so section heads carry
  `scroll-mt-20` to clear it on anchor jumps. Keep that margin above the dock's
  bottom edge (~46px) if you change its offset or height.

## Common Patterns
- **Section**: `<SectionHead id label viewAll />` then a `<ul className="divide-y divide-[var(--line)]">` of `<Reveal as="li" delay={i * 0.055}>` rows.
- **Row anatomy**: `.row-title` + right-aligned `.meta`, then `.row-desc`, then `.chip` tags.
- **Hover previews**: wrap the page in `<PreviewProvider>` and spread `usePreviewHandlers(payload)` onto the row. One shared card follows the cursor. It is **fine-pointer only** — anything shown solely in that card is invisible to touch, so pair it with a `.row-thumb` (hidden on fine pointers via CSS, not JS, to avoid a desktop flash) or another non-hover path.
- **Glossary terms**: put prose in `<GlossaryParagraph>` and mark terms with `<GlossaryTerm>`. The definition renders *below* the paragraph, never inline after the term — a block mid-sentence pushes the rest of the clause onto its own line. The term is a real `<button aria-expanded aria-controls>` so keyboard, screen-reader, and touch users can reach the text the hover card cannot give them.
- **Search matching** (`matchesEntry` in `SearchPalette.tsx`) normalizes punctuation and requires every query term to hit the spaced *or* collapsed haystack, so "nextjs" finds "Next.js". Keep new searchable fields flowing through `normalize`.
- **Colours**: use the CSS variables (`var(--ink)`, `var(--muted-ink)`, `var(--dim)`, `var(--line)`, `var(--signal)`, `var(--hover)`, `var(--panel)`) — not Tailwind `slate-*`. They are redefined for light, dark, and midnight.
- **Project images**: Drop screenshots in `public/projects/`. Reference as `/projects/filename.jpg`.
- **Skill icons**: Drop in `public/skills/`. Reference in `HeroIcons.tsx`.

## Rejected approaches
- **TanStack Router**: incompatible with the App Router — adopting it means
  leaving Next.js (Vite SPA or TanStack Start) and losing prerendered HTML and
  per-page metadata, which a portfolio needs most.
- **TanStack Query / SWR**: there is nothing to cache. All page content is
  static TypeScript imported at build time and prerendered; the only network
  call in the app is `Chatbot.tsx` POSTing to `/api/chat`, which is a mutation.

## Commands
```bash
npm run dev      # dev server
npm run build    # production build (static export)
npx tsc --noEmit # type check only
npm run lint     # ESLint
```
- **No test suite** in this project.
- **Build order**: `npx tsc --noEmit` → `npm run build`. TypeScript errors will block the build.

## Chatbot API (`src/app/api/chat/route.ts`)
- Uses OpenAI `gpt-4o-mini` if `OPENAI_API_KEY` is set.
- Falls back to `getOfflineReply()` if no API key or on error.
- Guardrails block requests containing harmful keywords + code generation requests.

## Environment Variables
- `OPENAI_API_KEY` — optional, enables AI chatbot. Without it, chatbot uses offline replies.

## Updating This File
If you change the architecture (e.g., move Navbar out of layout, add a test suite, change the theme system), update this file so the next agent doesn't repeat the same mistakes.
