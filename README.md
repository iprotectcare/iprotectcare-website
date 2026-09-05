# iProtectCare Website

Marketing and lead-capture website for **iProtectCare** — an independent Apple
device repair shop in Koramangala, Bengaluru (established 2026). Live domain:
[www.iprotectcare.in](https://www.iprotectcare.in).

Statically generated Next.js site: a cinematic homepage, five device pages
driven by one template, and a Book-a-Repair form that logs the lead to a
Google Sheet and hands the customer a prefilled WhatsApp message.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript, static generation)
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens via `@theme`, light/dark theming
- [Motion](https://motion.dev) — scroll reveals and the two scroll-linked effects
- [Embla](https://www.embla-carousel.com) — carousels
- [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) — form validation (same schema client and server)
- Vitest (unit) + Playwright (e2e) · Deployed on Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the three variables
npm run dev                  # http://localhost:3000
```

| Env variable | Purpose |
|---|---|
| `SHEETS_WEBHOOK_URL` | Deployed Google Apps Script web app that appends a lead row |
| `SHEETS_SHARED_SECRET` | Shared secret the Apps Script requires on every write |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Destination for the wa.me handoff (digits, e.g. `919000000000`) |
| `GOOGLE_PLACES_API_KEY` | Optional — enables the live Google-reviews section (Places API (New) key) |
| `GOOGLE_PLACE_ID` | Optional — the shop's Google Place ID for that section |

Full walkthrough for obtaining every value — including the Apps Script the
Sheet webhook needs: [`docs/guides/environment-variables.md`](docs/guides/environment-variables.md).

To set up the Google-reviews section, run the interactive walkthrough — it
opens each Google page, tells you what to click, saves the values to
`.env.local`, and live-verifies the API before pointing you at Vercel:

```bash
bash scripts/setup-google-reviews.sh
```

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build (all pages static except /api/book)
npm test           # Vitest unit tests
npm run test:e2e   # Playwright e2e (builds and serves a production bundle)
npm run lint       # ESLint
```

## Editing content

**Everything a human would edit lives in `src/content/`** — components read,
they never hardcode:

- `business.ts` — name, address, phone, WhatsApp, email, hours
- `devices/*.ts` — one file per device: models, repairs, price bands, FAQ, meta
  (a sixth device is a data entry, not a new page)
- `why-us.ts`, `repairs.ts`, `process.ts`, `faq.ts` — section copy
- `site.ts` — hero copy, trust strip, and `flags.showTestimonials`
  (testimonials ship built but hidden until real reviews exist)

Editing a price on GitHub and merging is a deploy.

## Launch checklist

Content still carries explicit `TODO:` markers (street address, 7-day hours,
price bands, 2026 model names). The launch gate lists every one:

```bash
LAUNCH_CHECK=1 npx vitest run tests/unit/launch.test.ts
```

It must pass before go-live. Full open-items list: design spec §14 in
[`docs/superpowers/specs/2026-09-03-iprotectcare-website-design.md`](docs/superpowers/specs/2026-09-03-iprotectcare-website-design.md).

## Repository guide

- `docs/superpowers/specs/` — the approved design specification
- `docs/superpowers/plans/` — the implementation plan the site was built from
- `docs/research/` — apple.com scroll-animation research behind the motion work
- `history/` — per-day work log (`YYYY-MM-DD.md`)
- `design-assets/` — reference imagery manifests (images themselves are
  gitignored; see `design-assets/README.md` for licensing notes)

## Legal note

iProtectCare is an independent service provider and is not affiliated with,
authorised by, or endorsed by Apple Inc. Apple, iPhone, iPad, MacBook, iMac,
and Apple Watch are trademarks of Apple Inc.
