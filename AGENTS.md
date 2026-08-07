# AGENTS.md — Portfolio Project

## Stack & Versions
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` syntax in `globals.css`)
- Framer Motion for animations
- tsParticles for background effects
- OpenAI API for chatbot (with offline fallback)

## Architecture
- **Navbar is in root layout** (`src/app/layout.tsx`). Do **not** add `<Navbar />` to individual pages — it causes duplicate navbars and build errors.
- **Navbar is sticky and has a mobile sheet.** The mobile menu is rendered as a sibling of `<nav>`, not inside it — the navbar's `backdrop-blur-md` creates a containing block that would trap a `fixed` overlay. Keep it outside if you refactor.
- **Shared links live in `src/app/data/Social.ts`** (`socialLinks`, `EMAIL`, `RESUME_URL`). Import from there instead of redeclaring the arrays.
- **Theme switching has two entry points**: `ThemeToggle.tsx` (visible, in the navbar and mobile sheet) and the ⌘K palette. Both call `setTheme` from `AppUIProvider`.
- **Client components** using Framer Motion (`motion`, `AnimatePresence`) must have `"use client"` at the top. Static generation fails without it.
- **Data sources**: `src/app/data/Projects.ts` (projects), `src/app/data/Blog.ts` (blog posts), and `src/app/data/HeroIcons.ts` (skills, about text).
- **Blog**: `/blog` listing + `/blog/[slug]` detail. Static TypeScript posts (no MDX). Giscus comments are optional and not wired by default.
- **Theme system**: Custom light/dark/midnight via `localStorage` key `portfolio-theme`. The theme script runs inline in `layout.tsx` before React hydrates.

## Key Gotchas
- **Next.js `<Image>` does not handle SVGs well from `public/`**. Use conditional rendering: `.svg` → `<img>`, `.png`/`.jpg` → `<Image>`.
- **Particles background** (`particles-background.tsx`) uses `position: fixed` covering the viewport. It **must** have `pointer-events-none` or it blocks clicks on everything below it (including navbar links).
- **Navbar links** need `relative z-10` on the `<nav>` to stay above the particles layer.
- **`page-shell`** class is the main container: `max-w-6xl px-6 lg:px-8 mx-auto`.

## Common Patterns
- **Use design tokens, not raw Tailwind palette colors.** `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-accent`, `bg-primary`/`text-primary-foreground`. These already adapt to light/dark/midnight, so a `dark:` twin is almost always wrong. Hardcoded `slate-*` remains only where it is deliberate: gradients painted over images, and `SearchPalette.tsx`, which is intentionally a dark command palette in every theme.
- **Section layout**: `.section-band` + `.page-shell` wrapper. Variant classes: `.section-band--paper`, `.section-band--mist`, `.section-band--sand`, `.section-band--slate`. `.section-band` already carries responsive vertical padding — don't add your own `py-*`.
- **Shared classes in `globals.css`**: `.section-eyebrow` (kicker above a heading), `.section-title` (the `Projects.` / `Tools.` h2 scale), `.card-surface` (bordered translucent card), `.focus-ring` (focus-visible ring — use instead of retyping the five `focus-visible:*` utilities), `.hover-lift`, `.reveal-on-hover` (hidden until the parent `.group` is hovered; stays visible on touch devices).
- **Project images**: Drop screenshots in `public/projects/` (e.g., `public/projects/civireport.jpg`). Reference as `/projects/filename.jpg`.
- **Skill icons**: Drop in `public/skills/`. Reference in `HeroIcons.ts`.
- **Kicker labels**: Use the `.section-eyebrow` class.

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
