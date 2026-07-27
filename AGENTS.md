# AGENTS.md — Portfolio Project

## Stack & Versions
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` syntax in `globals.css`)
- Framer Motion for animations
- tsParticles for background effects
- OpenAI API for chatbot (with offline fallback)

## Architecture
- **Navbar is in root layout** (`src/app/layout.tsx`). Do **not** add `<Navbar />` to individual pages — it causes duplicate navbars and build errors.
- **Client components** using Framer Motion (`motion`, `AnimatePresence`) must have `"use client"` at the top. Static generation fails without it.
- **Data sources**: `src/app/data/Projects.ts` (projects) and `src/app/data/HeroIcons.ts` (skills, about text).
- **Theme system**: Custom light/dark/midnight via `localStorage` key `portfolio-theme`. The theme script runs inline in `layout.tsx` before React hydrates.

## Key Gotchas
- **Next.js `<Image>` does not handle SVGs well from `public/`**. Use conditional rendering: `.svg` → `<img>`, `.png`/`.jpg` → `<Image>`.
- **Particles background** (`particles-background.tsx`) uses `position: fixed` covering the viewport. It **must** have `pointer-events-none` or it blocks clicks on everything below it (including navbar links).
- **Navbar links** need `relative z-10` on the `<nav>` to stay above the particles layer.
- **`page-shell`** class is the main container: `max-w-6xl px-6 lg:px-8 mx-auto`.

## Common Patterns
- **Section layout**: `.section-band` + `.page-shell` wrapper. Variant classes: `.section-band--paper`, `.section-band--mist`, `.section-band--sand`, `.section-band--slate`.
- **Project images**: Drop screenshots in `public/projects/` (e.g., `public/projects/civireport.jpg`). Reference as `/projects/filename.jpg`.
- **Skill icons**: Drop in `public/skills/`. Reference in `HeroIcons.ts`.
- **Kicker labels**: Use `font-mono text-xs uppercase tracking-[0.2em] text-primary/80`.

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
