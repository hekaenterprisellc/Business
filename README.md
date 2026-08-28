# Heka Enterprise

> Websites, online stores & branding for Nairobi business — a premium editorial marketing site built with Next.js 16.

A redesign of [hekaenterprisellc.netlify.app](https://hekaenterprisellc.netlify.app/) into a warm, editorial, conversion-focused marketing experience. Warm Nairobi palette (cream · ink · terracotta · forest), Fraunces serif headlines, Framer Motion scroll-driven animations, a working contact API backed by Prisma/SQLite, and a fully accessible, responsive layout.

---

## ✨ Features

- **Editorial hero** with an auto-cycling browser-window preview carousel (real product screenshots).
- **Scroll-spy navbar** with active-section highlighting + animated pill indicator.
- **Scroll progress bar** fixed to the top of the viewport.
- **Services bento** — numbered cards with hover glow and tag chips.
- **Portfolio/Work** — vertical scroll-down sequence with parallax case-study rows.
- **Why Us** — dark section with an authentic WhatsApp conversation mockup as social proof.
- **Process** — scroll-driven draw-in timeline: the connecting line fills and each node crossfades from number → checkmark as you scroll.
- **Pricing** — one-time vs. monthly-care billing toggle + per-plan WhatsApp deep-links with pre-filled messages.
- **FAQ** — accordion + `FAQPage` JSON-LD structured data for SEO rich results.
- **Contact form** — validated, rate-limited, persisted to SQLite via Prisma, with success/error toast feedback.
- **Sticky footer** pushed to bottom on short pages, natural flow on long pages.
- **Accessibility** — skip-to-content link, `aria-labelledby` on all sections, visible focus rings, reduced-motion support.
- **Security** — strict TypeScript builds, React strict mode, security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS), input length caps + rate limiting on the contact API.

---

## 🧱 Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/) (New York) |
| Animation | Framer Motion 12 |
| Icons | lucide-react |
| Database | Prisma ORM + SQLite |
| Toasts | Sonner |
| Fonts | Fraunces (serif), Geist + Geist Mono (sans/mono) |

---

## 🚀 Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20
- [Bun](https://bun.sh/) (preferred runtime / package manager)
- SQLite (bundled — no separate server needed)

### Install & run

```bash
bun install                 # install dependencies

# database (first run only)
cp .env.example .env        # then edit DATABASE_URL if needed
bun run db:push             # create SQLite schema

bun run dev                 # start dev server on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
bun run build               # type-check + build (fails on TS errors)
bun run start               # serve the standalone production build
```

---

## 📁 Project structure

```
.
├── prisma/
│   └── schema.prisma           # ContactMessage model
├── public/
│   └── heka/                   # generated brand & case-study imagery
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts # POST contact endpoint (validated, rate-limited)
│   │   ├── globals.css          # warm Nairobi design tokens + utilities
│   │   ├── layout.tsx           # fonts (Fraunces/Geist) + metadata + toasters
│   │   └── page.tsx             # composes all sections
│   ├── components/
│   │   ├── sections/            # page sections (hero, navbar, pricing, …)
│   │   └── ui/                  # shadcn/ui primitives
│   ├── hooks/
│   │   ├── use-scroll.ts        # scroll progress + scroll-spy
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   └── lib/
│       ├── anim.ts             # shared Framer Motion variants
│       ├── db.ts                # Prisma client singleton
│       └── utils.ts            # cn() helper
├── next.config.ts              # strict mode + security headers
├── tailwind.config.ts
└── package.json
```

---

## 🎨 Design system

The palette is defined as OKLCH tokens in `src/app/globals.css`:

| Token | OKLCH | Usage |
| --- | --- | --- |
| `--cream` | `0.965 0.012 75` | Page background |
| `--ink` | `0.205 0.012 50` | Primary text / dark sections |
| `--terracotta` | `0.628 0.178 38` | Accent, CTAs, highlights |
| `--forest` | `0.34 0.045 155` | Secondary accent (M-Pesa, trust) |
| `--sand` | `0.905 0.028 75` | Muted backgrounds |
| `--clay` | `0.78 0.075 55` | Tertiary accent |

Typography pairs **Fraunces** (editorial serif, optical sizing) for headlines with **Geist** for body and **Geist Mono** for labels/microcopy.

---

## 🔌 API

### `POST /api/contact`

Submit a contact message. Persists to the `ContactMessage` table.

**Body:**

```json
{
  "name": "Wanjiru Kamau",
  "email": "you@business.co.ke",
  "business": "Sweet Crumbs Bakery",
  "need": "Need a 3-page website with M-Pesa checkout."
}
```

**Responses:**

- `201` — `{ ok: true, id, createdAt, message }`
- `422` — missing/invalid fields
- `429` — rate limited (max 5 per IP per 10 min)
- `500` — server error (message is generic, never leaks internals)

---

## 🛡️ Security notes

- TypeScript build errors fail the production build (`ignoreBuildErrors: false`).
- React strict mode enabled for catching subtle bugs.
- Security headers applied to all routes via `next.config.ts`.
- Contact API validates input shape, caps field lengths, and applies an in-memory rate limit. Swap the in-memory limiter for Redis in a scaled deployment.
- `.env*` is gitignored; only `.env.example` is committed.
- The FAQ JSON-LD uses `dangerouslySetInnerHTML` with **static, controlled** content only — no user input flows into it.

---

## ♿ Accessibility

- Skip-to-content link (visible on focus).
- Every section has `aria-labelledby` pointing to its heading.
- Keyboard-visible focus rings (terracotta).
- `prefers-reduced-motion` respected — animations collapse to near-instant.
- Color contrast tuned for WCAG AA on both light and dark sections.

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 🙏 Credits

Built for **Heka Enterprise** — a Nairobi web & design shop. Imagery generated with the z-ai image-generation skill.
