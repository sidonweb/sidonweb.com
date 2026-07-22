# context — sidonweb.com

Handoff notes for this repository. Source of truth for what the project is, how it is
built, and what remains before launch.

## What it is

Personal portfolio for **Siddharth Singh** ("Sid"), a full-stack engineer (real-time
systems + AI) in Greater Noida, India. Single-page, dark, app-shell layout. Built and
maintained by Armaan.

- Location: `~/sidonweb`
- Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- Dependencies: `next`, `react`, `react-dom`, `simple-icons`. Dev: `tailwindcss`,
  `@tailwindcss/postcss`, `postcss`, `typescript`, type packages.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  (add -- -H 0.0.0.0 for LAN/mobile testing)
npm run build    # must stay clean
npm run start
```

## Architecture

- **Single scrolling page** (`app/page.tsx`) composed of six section components in
  `app/components/sections/`: `intro`, `work`, `stack`, `about`, `ask`, `contact`, with a
  hairline `SectionDivider` between each. Every section is an `<section id="...">`.
- **App shell** (`app/layout.tsx`): a persistent left sidebar (desktop) + scrolling main
  panel (`#scroll-root` is the desktop scroller; the window scrolls on mobile).
- **Scroll-spy nav**: the sidebar and mobile nav highlight the active section and
  smooth-scroll to it. Logic in `components/use-scroll-spy.ts`; section ids in
  `components/nav-items.tsx` (`SECTION_IDS`). Same behaviour drives the ⌘K palette,
  number keys `1–6`, and the mobile menu. Order: Overview / Work / Stack / About / Ask /
  Contact.
- **Project detail pages**: `/work/[slug]` are statically generated (SSG) from
  `projects` in `data.ts`. Back link is `/#work`; `components/hash-scroll.tsx` lands on the
  right section when arriving at `/#id`.
- **Mobile nav**: a full-screen editorial menu opened by a bottom-center pill; the pill has
  a circular scroll-progress ring (ref-driven, tracks scroll 1:1). Top bar shows the
  wordmark and an alternating availability/location readout (`nav-status.tsx`).

## Signature feature — "Ask"

`components/ask-chat.tsx` + `lib/ask-engine.ts`. A client-side retrieval bot over the site
content — no API, no keys, fully deterministic. Answers in first person with source
citations. On-brand (mirrors Sid's DocMind RAG project).

## Design system

- **Theme: dark.** Tokens in `app/globals.css` `@theme`. Neutral near-black palette
  (`bg #0a0a0b`, `surface #141417`, `fg #fafafa`, `muted #a1a1ab`, `faint #6d6d77`).
- **Colour is semantic, used sparingly:**
  - **Blue `#3b82f6`** (`--color-accent`) — the only primary accent: CTAs, active nav,
    links, focus, selection. Decorative index numbers are neutral, not accent.
  - **Violet** (`--color-ai`) — the Ask feature only.
  - **Emerald** (`--color-success`) — availability status dots only.
  - **Amber** (`--color-warning`) — star ratings only.
  Changing the primary is a one-line edit: `--color-accent*` in `globals.css`, the primary
  button shadow rgba in `button.tsx`, and one hex in `opengraph-image.tsx`.
- **Buttons**: one system, `components/button.tsx`, variants `primary` / `secondary` /
  `ghost`. Do not introduce ad-hoc button styles.
- **Fonts**: display = **Stack Sans Headline** (Google, single weight 400; loaded via
  `<link>` in `layout.tsx`; `.font-display` forces `font-weight:400`). Everything else =
  **Inter** (`next/font`).
- **Motion**: one source of entrance motion — the `Reveal` component (`components/reveal.tsx`)
  + the `.reveal` rules in `globals.css` (IntersectionObserver → `data-shown`, delay via
  `--reveal-delay`). Other motion is limited to `.pulse-dot` (availability), `.duotone`
  (imagery), `CountUp`, and small transition utilities. Respects `prefers-reduced-motion`.
- Images are `.duotone` (grayscale). Project thumbnails are 16:9; containers use
  `aspect-[16/9]` + `object-cover` so nothing crops.

## SEO

- `app/layout.tsx`: full metadata (title template, description, keywords, canonical, robots
  directives, Open Graph `profile`, Twitter card) + JSON-LD (`Person` + `WebSite`) from
  `lib/seo.ts`.
- `app/work/[slug]/page.tsx`: per-project metadata + `CreativeWork` JSON-LD, `<article>`.
- `app/sitemap.ts`, `app/robots.ts` (both use `SITE_URL` from `lib/seo.ts`),
  `app/manifest.ts`, `app/opengraph-image.tsx` (dynamic OG image).
- One `<h1>` (hero); sections use `<h2>`. Images have descriptive `alt`.

## Data

Everything content-related lives in `app/lib/data.ts`: `profile`, `socials`, `projects`,
`capabilities`, `stackGroups`, `dailyDrivers`, `facts`, `testimonials`, `clients`, `links`,
`movies`. Adding a project regenerates its detail page, card, ⌘K entry, and sitemap row.

## Before launch (placeholders to replace)

- `links.resumeUrl` — drop a real PDF at `public/resume.pdf` (or external link).
- `links.calUrl` — a Cal.com / Calendly link.
- `testimonials` in `data.ts` — currently **sample data**. Replace with real, attributable
  quotes. Do not ship fabricated reviews.
- `SITE_URL` in `lib/seo.ts` and the socials/handles assume `sidonweb.com` — confirm before
  deploy.

## iOS Safari note

The layout intentionally does **not** use `viewport-fit=cover`. Safari keeps content below
the status bar and tints that band using the solid `html` background-color set in
`globals.css`, which prevents content bleeding into the notch / Dynamic Island. The mobile
top bar is a plain solid `bg-bg` sticky bar (no blur).

## Assets

`public/`: `profile.jpg` (portrait, grayscale), `favicon.ico`, `photos/` (project
thumbnails), `logos/`. Tech logos in the Stack section come from the `simple-icons` package,
rendered in brand colour (near-black marks are lightened for contrast).
