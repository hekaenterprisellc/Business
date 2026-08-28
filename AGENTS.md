# AGENTS.md

> Operating manual for AI coding agents (Claude, Copilot, Cursor, etc.) working on this repository.

This file gives agents the context they need to make consistent, correct changes without breaking the project's conventions.

---

## Project at a glance

**Heka Enterprise** is a single-page marketing website for a Nairobi web/design agency, built with **Next.js 16 (App Router) + TypeScript 5 (strict) + Tailwind CSS 4 + shadcn/ui + Framer Motion + Prisma/SQLite**.

The only user-visible route is `/` (`src/app/page.tsx`). All content lives in composed section components under `src/components/sections/`.

---

## Golden rules (non-negotiable)

1. **Never use `bun run build`.** Use `bun run dev` for development (runs on port 3000 only). Use `bun run lint` to check code quality.
2. **`z-ai-web-dev-sdk` MUST be used in backend code only.** Never import it in client components (`"use client"`).
3. **All API requests use relative paths.** Never write absolute URLs (incl. `http://localhost:PORT`). For cross-service requests, pass the port via `?XTransformPort=PORT` query param.
4. **Use existing shadcn/ui components** in `src/components/ui/` — don't rebuild primitives from scratch.
5. **Prefer editing existing files.** Don't create new files unless explicitly required.
6. **No emojis in code** unless the user asks for them.
7. **Sticky footer required** — the root layout uses `min-h-screen flex flex-col` with `main flex-1` and the footer pushed to the bottom. Preserve this structure.
8. **No indigo/blue colors.** The palette is warm: cream / ink / terracotta / forest / sand / clay (see `src/app/globals.css`).
9. **Mobile-first, responsive.** Test changes at both 390px and 1440px widths.
10. **TypeScript strict** — build fails on type errors. Don't use `any` unless unavoidable.

---

## Where things live

```
src/
├── app/
│   ├── api/contact/route.ts   ← contact form endpoint (validated, rate-limited)
│   ├── globals.css            ← design tokens, keyframes, utilities
│   ├── layout.tsx             ← fonts + metadata + toasters
│   └── page.tsx               ← composes all sections
├── components/
│   ├── sections/              ← page sections (all "use client")
│   └── ui/                    ← shadcn/ui primitives (don't edit unless needed)
├── hooks/                     ← use-scroll, use-mobile, use-toast
└── lib/
    ├── anim.ts                ← shared Framer Motion variants
    ├── db.ts                  ← Prisma client singleton
    └── utils.ts               ← cn() class merge
```

---

## Architecture conventions

### Sections
- Every section is a named export under `src/components/sections/`.
- Every `<section>` has a unique `id` (for scroll-spy + anchor nav) and `aria-labelledby` pointing to its heading.
- Sections use Framer Motion `whileInView` with the shared variants in `src/lib/anim.ts` (`fadeUp`, `staggerParent`, `viewportOnce`).

### Animations
- Shared variants live in `src/lib/anim.ts` — reuse them, don't redefine per-component.
- Scroll-driven animations use `useScroll` + `useTransform` + `useSpring` from Framer Motion (see `process.tsx` for the pattern).
- Always respect `prefers-reduced-motion` (handled globally in `globals.css`).

### Data
- Prisma schema lives in `prisma/schema.prisma`. After editing: `bun run db:push`.
- Database client: `import { db } from "@/lib/db"`.
- SQLite only — primitive types can't be lists in the schema.

### Styling
- Tailwind CSS 4 with CSS-variable-based tokens (OKLCH).
- Brand tokens: `--cream`, `--ink`, `--terracotta`, `--forest`, `--sand`, `--clay`.
- Use these via Tailwind classes like `bg-terracotta`, `text-cream`, `bg-ink`.
- Editorial utilities in `globals.css`: `.font-serif`, `.text-balance`, `.grain-overlay`, `.link-underline`, `.animate-marquee`, `.animate-slow-spin`.

### Fonts
- Fraunces (serif, optical sizing) → `--font-fraunces` → `.font-serif`.
- Geist + Geist Mono → `--font-geist-sans` / `--font-geist-mono`.

---

## How to make common changes

| Task | Where |
| --- | --- |
| Add a new section | Create `src/components/sections/<name>.tsx`, import + compose in `page.tsx`, add its id to `NAV_LINKS` + `SECTION_IDS` in `navbar.tsx`. |
| Change a section's copy | Edit the const arrays at the top of the relevant section file (e.g. `SERVICES`, `PLANS`, `FAQS`, `CASES`, `REASONS`). |
| Change brand colors | Edit `:root` tokens in `src/app/globals.css`. |
| Add an API route | Create `src/app/api/<name>/route.ts`. Always validate input + handle errors without leaking internals. |
| Change the Prisma schema | Edit `prisma/schema.prisma` → run `bun run db:push`. |

---

## Verification checklist (before declaring done)

1. `bun run lint` → clean.
2. `tail -20 dev.log` → no errors, `GET / 200`.
3. Open `http://localhost:3000` via agent-browser:
   - Page renders (no white screen, no hydration error).
   - Core interactions work (contact form, FAQ accordion, mobile menu, carousel, scroll-spy).
   - Sticky footer at bottom on short content; pushed down naturally on long content.
   - No console errors.
4. Mobile (390px) + desktop (1440px) both look right.

---

## Don't do

- Don't create test files (no test framework is configured).
- Don't create documentation files unless explicitly requested.
- Don't add `console.log` in committed code.
- Don't disable TypeScript checks (`ignoreBuildErrors`, `@ts-ignore`) to ship faster.
- Don't introduce indigo/blue colors.
- Don't import `z-ai-web-dev-sdk` in client components.
- Don't write absolute URLs or hardcode ports in fetch/WebSocket calls.

---

## When unsure

Read `src/app/globals.css` (design tokens), `src/lib/anim.ts` (animation patterns), and `src/components/sections/process.tsx` (the most advanced scroll-driven example) before making changes. Match existing conventions.
