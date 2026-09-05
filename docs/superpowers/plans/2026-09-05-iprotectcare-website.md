# iProtectCare Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete iProtectCare marketing + lead-capture website: home, five device pages off one template, book/about/faq/contact/privacy/terms, with the Book-a-Repair → Google Sheet → WhatsApp pipeline.

**Architecture:** Statically generated Next.js 15 App Router site. All copy/prices/contact data live in typed files under `src/content/`; components only read. One serverless route (`/api/book`) re-validates with the shared Zod schema, writes to a Google Sheet via Apps Script, and returns a prefilled `wa.me` URL that the success screen renders as a tap-to-send button.

**Tech Stack:** Next.js 15 (App Router, TS strict), Tailwind v4 (`@theme` tokens), Motion (scroll reveals/parallax), Embla (carousels), react-hook-form + Zod, Geist (npm), Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-03-iprotectcare-website-design.md` — the spec travels with this plan; executors read both.

## Global Constraints

- Stack floors: `next@15`, Tailwind v4, TypeScript strict; deploy target Vercel, everything statically generated except `/api/book`.
- Colour tokens (light / dark): `surface #FFFFFF / #0B0B0C`, `surface-raised #F5F5F7 / #161618`, `surface-contrast #1D1D1F / #161618`, `text-primary #1D1D1F / #F5F5F7`, single blue `accent` (use `#0071E3`, retunable). Components write `bg-surface` / `text-primary` etc., never raw hex.
- Theme: CSS vars on `:root` + `[data-theme="dark"]`, OS default, manual toggle, `localStorage` persist, blocking `<head>` script — no white flash.
- Motion: `transform`/`opacity` only; reveals fire once (16px rise, ~500ms, 60ms stagger); parallax only on hero device + process line; everything off under `prefers-reduced-motion`; pointer effects gated `(hover: hover)`.
- Mobile: 44px min tap targets; persistent bottom bar Call · WhatsApp · Book; carousels swipe.
- Copy rules: no Apple endorsement implication, no Apple logos; footer disclaimer verbatim: "iProtectCare is an independent service provider and is not affiliated with, authorised by, or endorsed by Apple Inc. Apple, iPhone, iPad, MacBook, iMac and Apple Watch are trademarks of Apple Inc."
- No real person's name/email/phone anywhere in code, tests or examples — Jane Doe, `jane.doe@example.com`, `+91 90000 00000`. Business phone `+91 98868 44485` and email `iprotectcaretechnology@gmail.com` appear only as contact details / WhatsApp destination.
- Unknown facts are explicit `TODO:` markers in content (street address, 7-day hours confirm, price bands, 2026 models) — never invented. Launch-readiness test (`LAUNCH_CHECK=1`) asserts zero remain; skipped by default.
- Env vars: `SHEETS_WEBHOOK_URL`, `SHEETS_SHARED_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (checked-in `.env.example` with empty values).
- Commit after every task (working tree green: `npm test` + `npm run build`).

---

## File Structure

```
src/
  app/
    layout.tsx  page.tsx  globals.css
    [device]/page.tsx
    book/page.tsx  about/page.tsx  faq/page.tsx  contact/page.tsx
    privacy/page.tsx  terms/page.tsx
    api/book/route.ts
    sitemap.ts  robots.ts
  components/
    layout/  Header.tsx NavDesktop.tsx NavMobile.tsx Footer.tsx
             ThemeToggle.tsx MobileActionBar.tsx
    sections/ Hero.tsx DeviceGrid.tsx RepairCarousel.tsx WhyUs.tsx
              Process.tsx Testimonials.tsx FindUs.tsx FaqSection.tsx CtaBand.tsx
    ui/      Button.tsx Card.tsx Section.tsx Reveal.tsx Accordion.tsx
             Field.tsx Carousel.tsx
    forms/   BookRepairForm.tsx
  content/
    business.ts  site.ts  why-us.ts  repairs.ts  process.ts  faq.ts
    testimonials.ts  devices/index.ts + iphone.ts ipad.ts macbook.ts mac.ts watch.ts
  lib/
    schema.ts whatsapp.ts sheets.ts notify.ts jsonld.ts seo.ts
tests/
  unit/ schema.test.ts whatsapp.test.ts content.test.ts launch.test.ts api-book.test.ts
  e2e/  book.spec.ts theme.spec.ts mobile.spec.ts
```

---

### Task 1: Scaffold + toolchain

**Files:** Create Next 15 app in-place (`src/` layout, `@/*` alias), add deps `motion embla-carousel-react react-hook-form @hookform/resolvers zod geist`, dev deps `vitest vite-tsconfig-paths @playwright/test`. Create `vitest.config.ts`, `playwright.config.ts`, `.env.example`, npm scripts `test`, `test:e2e`.

- [x] Step 1: `git switch -c feature/website-build`.
- [x] Step 2: Scaffold `create-next-app@15` into a temp dir (`--ts --app --src-dir --tailwind --eslint --import-alias "@/*" --use-npm`), copy into repo without clobbering README/LICENSE/.gitignore/docs/history/design-assets.
- [x] Step 3: Install deps above; `vitest.config.ts` with `vite-tsconfig-paths`, test include `tests/unit/**`; `playwright.config.ts` with `webServer: npm run build && npm start`, `baseURL http://localhost:3000`, chromium + mobile (Pixel 7) projects.
- [x] Step 4: `.env.example` with the three vars, empty values.
- [x] Step 5: Verify `npm run build` and `npx vitest run` (no tests → pass with `--passWithNoTests`). Commit.

### Task 2: Design tokens + theming

**Files:** Modify `src/app/globals.css`, `src/app/layout.tsx`; create `src/components/layout/ThemeToggle.tsx`.

**Interfaces — Produces:** Tailwind utilities `bg-surface`, `bg-surface-raised`, `bg-surface-contrast`, `text-primary`, `text-secondary`, `text-accent`, `bg-accent`, `border-hairline`; `data-theme` attribute contract; `<ThemeToggle />` client component.

- [x] Step 1: `globals.css` — `@import "tailwindcss"`; `:root` + `[data-theme="dark"]` var blocks per Global Constraints; `@theme inline` mapping `--color-surface: var(--surface)` etc.; fluid type scale via `clamp()` custom properties (`--text-display: clamp(2.5rem, 1.2rem + 5vw, 5rem)` and steps down); 4px spacing base; `@media (prefers-reduced-motion: reduce)` kill-switch.
- [x] Step 2: `layout.tsx` — Geist via `geist/font/sans` (+ `GeistMono` unused: skip), blocking inline theme script before hydration:
  ```js
  try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}
  ```
  `suppressHydrationWarning` on `<html>`.
- [x] Step 3: `ThemeToggle.tsx` — client; reads `documentElement.dataset.theme` on mount, toggles, persists to `localStorage.theme`; 44px hit area; `aria-label="Switch to dark theme"/"…light theme"`.
- [x] Step 4: Build passes; manual check both themes on a stub page. Commit.

### Task 3: Content layer + integrity tests (TDD)

**Files:** Create everything under `src/content/` (see File Structure); Test: `tests/unit/content.test.ts`, `tests/unit/launch.test.ts`.

**Interfaces — Produces:**
```ts
// business.ts
export const business: { name; areaLine; streetAddress; city; pin; phone; phoneHref;
  whatsappNumber; email; hoursLine; hoursOpen; hoursClose; established: number;
  mapsUrl; domain }
// devices/index.ts
export type Repair = { slug: string; name: string; priceBand: string; blurb: string }
export type Device = { slug: string; name: string; navLabel: string; heroTitle: string;
  heroSub: string; models: string[]; repairs: Repair[]; faq: {q:string;a:string}[];
  metaTitle: string; metaDescription: string }
export const devices: Device[]  // order: iphone-repair, ipad-repair, macbook-repair, mac-repair, apple-watch-repair
export const getDevice: (slug: string) => Device | undefined
// site.ts
export const flags = { showTestimonials: false }
// why-us.ts → sixPromises: {title; body; icon}[6]
// repairs.ts → commonRepairs: {name; blurb; icon}[8]  (screen, battery, water, charging port, logic board, keyboard, camera, data recovery)
// process.ts → steps: {title; body}[4]
// faq.ts → generalFaq: {q; a}[7]
// testimonials.ts → testimonials: {quote; author; device}[]  (empty array until real reviews)
```
Model lists cover 2017→2026 per spec §8 counts; 2026-unverifiable entries carry `TODO: confirm`. Price bands: `"TODO: price band"` markers.

- [x] Step 1: Write failing `content.test.ts`: every device has ≥5 models, no duplicate model names within a device, every repair has non-empty `priceBand` (real range `/^From ₹|^₹/` or explicit `TODO`), all five slugs present, `getDevice("mac-repair")` mentions iMac/Mac mini/Mac Studio in models.
- [x] Step 2: Write failing `launch.test.ts`: `describe.skipIf(!process.env.LAUNCH_CHECK)` — asserts no `TODO` in any content export (deep-stringify scan) including `business`.
- [x] Step 3: Run — fail (files missing).
- [x] Step 4: Implement all content files. Copy tone: plain, concrete, no superlatives that imply authorization.
- [x] Step 5: `npx vitest run` — content tests pass, launch test skipped. Commit.

### Task 4: Zod schema (TDD)

**Files:** Create `src/lib/schema.ts`; Test: `tests/unit/schema.test.ts`.

**Interfaces — Produces:**
```ts
export const bookingSchema: z.ZodType<Booking>
export type Booking = { deviceType: "iPhone"|"iPad"|"MacBook"|"Mac desktop"|"Apple Watch"|"Other";
  model: string; issue: string; notes?: string; name: string; phone: string; // 10 digits, starts 6–9
  email: string; address?: string; pin?: string; consent: true;
  // bot defence — client fills, server checks:
  company?: string;        // honeypot, must be empty
  startedAt: number }      // epoch ms when form rendered
```

- [x] Step 1: Failing tests: valid booking passes; phone `"9886844485"` ok, `"1234567890"`/9-digit fail; pin `"560034"` ok, `"56003"` fails, absent ok; `consent:false` fails; empty `model` fails; `notes`/`address` optional; trims name.
- [x] Step 2: Run — fail. Step 3: Implement with `z.literal(true)` consent, `/^[6-9]\d{9}$/` phone, `/^\d{6}$/` optional pin. Step 4: Pass. Step 5: Commit.

### Task 5: WhatsApp message builder (TDD)

**Files:** Create `src/lib/whatsapp.ts`; Test: `tests/unit/whatsapp.test.ts`.

**Interfaces — Produces:**
```ts
export function buildWhatsAppMessage(b: Booking): string   // spec §8 format, drops empty optionals
export function buildWaUrl(number: string, message: string): string // https://wa.me/<digits>?text=<encoded>
```

- [x] Step 1: Failing tests: full booking renders exactly the spec §8 sample shape (`*Device:*` lines, blank-line groups, `_Sent from iprotectcare.in_`); empty notes/address lines omitted entirely; `buildWaUrl("+91 98868 44485", "a b")` → `https://wa.me/919886844485?text=a%20b`.
- [x] Step 2–5: red → implement → green → commit.

### Task 6: Sheets client + notify seam + API route (TDD)

**Files:** Create `src/lib/sheets.ts`, `src/lib/notify.ts`, `src/app/api/book/route.ts`; Test: `tests/unit/api-book.test.ts` (mocks `fetch`).

**Interfaces — Produces:**
```ts
// sheets.ts
export async function postToSheet(b: Booking, sourcePage: string): Promise<void> // throws on non-2xx; 8s AbortController; sends {secret, ...fields}
// notify.ts
export async function notifyLead(b: Booking, sourcePage: string): Promise<{sheetOk: boolean}>
// route.ts POST body: Booking & {sourcePage: string}
// 200 → {ok:true, whatsappUrl: string, sheetOk: boolean}
// 422 → {ok:false, errors: flattened}
```
Rules: honeypot non-empty OR fill-time < 3000ms → return 200 `{ok:true, whatsappUrl}` **without** writing the sheet (silent discard). Sheet failure → still 200 with `sheetOk:false` (lead not lost). Raw errors never in response body.

- [x] Step 1: Failing tests (call `POST(new Request(...))` directly, `vi.stubGlobal("fetch", ...)`, stub env): happy path writes sheet once + returns wa URL containing encoded name; invalid body → 422; honeypot filled → 200, fetch never called; sheet 500 → 200 `sheetOk:false`; sheet hang → aborts (vi.useFakeTimers) and still 200.
- [x] Step 2–5: red → implement → green → commit.

### Task 7: UI primitives

**Files:** Create `src/components/ui/{Button,Card,Section,Reveal,Accordion,Field,Carousel}.tsx`.

**Interfaces — Produces:**
```tsx
<Button href?|onClick? variant="primary"|"secondary"|"ghost" size="md"|"lg">  // renders <a> when href
<Card>…                          // surface-raised, rounded-2xl, hover lift (hover:hover only)
<Section id? tone="default"|"raised"|"contrast" width="content"|"wide">       // vertical clamp() rhythm, container
<Reveal delay?>…                 // Motion whileInView once, 16px rise; children of <RevealGroup> stagger 60ms
<Accordion items={{q,a}[]}>      // WAI-ARIA disclosure, keyboard operable, one open at a time
<Field label error? …inputProps> // label + input/select/textarea + aria-describedby error
<Carousel opts?>{slides}         // Embla wrapper, keyboard arrows, snap, peeking next card
```
`Reveal` uses `useReducedMotion()` → renders static. All interactive elements ≥44px.

- [x] Step 1: Implement; sanity-render on a scratch route; `npm run build` green. Commit. (Visual components — covered by e2e later, no unit tests.)

### Task 8: Layout shell

**Files:** Create `src/components/layout/{Header,NavDesktop,NavMobile,Footer,MobileActionBar}.tsx`; modify `src/app/layout.tsx`.

Header: sticky, blur backdrop, wordmark ("iProtectCare" text placeholder), Devices dropdown (5), About, FAQ, Contact, ThemeToggle, Book Repair button. Mobile: hamburger → full-screen sheet; `MobileActionBar` fixed bottom `md:hidden` with Call (`tel:`), WhatsApp (`wa.me`), Book (`/book`) — all from `business`. Footer: contact block, device links, hours, disclaimer verbatim, privacy/terms links. Skip link first in body.

- [x] Step 1: Implement; wire into `layout.tsx` with `<main id="main">`; build green; both themes checked. Commit.

### Task 9: Homepage sections + assembly

**Files:** Create all `src/components/sections/*`; modify `src/app/page.tsx`.

Order per spec §4: Hero (headline, promise, dual CTA Call+Book, device visual slot via `next/image` priority, trust strip) → DeviceGrid (5 cards) → RepairCarousel (Embla, peeking) → WhyUs (6 cards) → Process (4 steps on `contrast`, connecting line draws on scroll via Motion `useScroll` scoped to section) → `{flags.showTestimonials && <Testimonials/>}` → BookRepairForm inline (§10 component) → FindUs (address, hours, Google Maps embed/link) → FaqSection (Accordion, generalFaq) → Footer already in layout. Hero device image drifts slower than page (`useScroll` + `useTransform`, ±20px) and fades leaving.

- [x] Step 1: Implement sections reading only from `content/`; assemble page; build green. Commit.

### Task 10: BookRepairForm + /book page

**Files:** Create `src/components/forms/BookRepairForm.tsx`, `src/app/book/page.tsx`.

Behaviour (spec §8): RHF + zodResolver, validate on blur; device select drives model select (disabled until device chosen; repopulates + clears stale value); device "Other" → model becomes free text, issue falls back to generic list; submit disabled until consent; hidden `company` input (`tabIndex={-1} autoComplete="off"` visually hidden); `startedAt` set on mount; POST `/api/book` with `sourcePage: usePathname()`; success state replaces form: check icon, "Request received", large **Send on WhatsApp** `<a>` with returned `whatsappUrl` (never auto-open); if `sheetOk:false` identical success UI; network/500 → error state with tap-to-call + direct WhatsApp links; `aria-live="polite"` status region.

- [x] Step 1: Implement; manual happy-path against a dev stub; build green. Commit. (Covered by e2e Task 13.)

### Task 11: Device page template + static pages

**Files:** Create `src/app/[device]/page.tsx`, `src/app/{about,faq,contact,privacy,terms}/page.tsx`.

`generateStaticParams` from `devices` slugs; unknown slug → `notFound()`. Template: hero (device name + supported-models line) → repairs with price bands (Card list) → Process → device FAQ (Accordion) → BookRepairForm with device preselected (prop `defaultDevice`). Static pages from content; privacy/terms: honest minimal copy (data used only to respond to repair requests; no analytics cookies yet).

- [x] Step 1: Implement; `npm run build` shows 5 static device pages. Commit.

### Task 12: SEO + structured data

**Files:** Create `src/lib/{jsonld,seo}.ts`, `src/app/{sitemap,robots}.ts`; modify layouts/pages for metadata.

Per-page unique `title`/`description` via `seo.ts` helpers; canonical `https://www.iprotectcare.in`; `metadataBase`; OG defaults (site name, generated OG image can be static `public/og.png` placeholder). JSON-LD: `LocalBusiness` (address/hours/phone) in root layout, `Service` per device page, `FAQPage` on /faq. `sitemap.ts` lists all public routes; `robots.ts` allows all, points at sitemap.

- [x] Step 1: Implement; validate JSON-LD shape by parsing script tags in built HTML; build green. Commit.

### Task 13: Playwright e2e

**Files:** Create `tests/e2e/{book,theme,mobile}.spec.ts`.

- `book.spec.ts`: route-mock `/api/book` → 200: fill form (Jane Doe data), submit, success state, assert decoded `wa.me` href contains `*Device:* iPhone` etc.; mock 500 → error state exposes `tel:` and WhatsApp links.
- `theme.spec.ts`: toggle → reload → `data-theme` persists; no FOUC (documentElement attribute set before first paint via init script check).
- `mobile.spec.ts` (Pixel 7 project): bottom bar visible with 3 links; hamburger opens sheet; nav to device page works.
- [x] Step 1: Write specs, run `npm run test:e2e` against production build until green. Commit.

### Task 14: Polish + verification

- [x] Step 1: `npm run lint`, `npx vitest run`, `npm run test:e2e`, `npm run build` all green.
- [x] Step 2: Reduced-motion spot check (emulate via Playwright `reducedMotion: "reduce"` in theme spec).
- [x] Step 3: Update `history/2026-09-05.md`; final commit.

## Self-Review (done)

- Spec coverage: §4 site map → Tasks 9/11; §5 → Task 2; §6 → Tasks 7/9; §7 → structure; §8 → Tasks 3–6/10; §9 → Task 12; §11 → Tasks 7/8/10; §12 → Tasks 3–6/13; §13 → existing Vercel flow; §14 open items → TODO markers + launch test. Testimonials flag: Task 3 `site.ts` + Task 9 conditional.
- Type consistency: `Booking`, `Device`, `Repair` defined once (Tasks 3/4) and consumed by name elsewhere.
- No placeholder steps remain; content TODO markers are spec-mandated data gaps, not plan gaps.
