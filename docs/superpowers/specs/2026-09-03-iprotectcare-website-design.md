# iProtectCare Website — Design Spec

**Date:** 2026-09-03
**Status:** Approved, ready for implementation planning
**Domain:** https://www.iprotectcare.in (Vercel)

## 1. Purpose

iProtectCare is an independent Apple device repair business in Koramangala, Bengaluru,
established 2026. The website must do three things:

1. Convince a visitor the shop is credible, despite having no trading history and no reviews.
2. Get that visitor to call, WhatsApp, or submit a repair request.
3. Rank for local repair searches ("iPhone screen repair Koramangala", "MacBook battery
   replacement Bangalore").

Primary conversion is the Book-a-Repair form. Call and WhatsApp are always one tap away.

### Reference sites

Three competitors were reviewed for structure, not for assets:

- `ionecare.in` — closest structural match: hero, device grid, why-us, testimonials,
  facility photos, FAQ. Converts via phone/WhatsApp/callback.
- `icareindia.in` — similar, plus a B2B page and an explicit non-affiliation disclaimer.
- `icareservice.co.in` — Apple Authorised: protection plans, store locator, repair-status
  lookup, appointment portal.

Their **layout and content patterns** are reused. Their **images are not** — those are
copyrighted competitor assets. Imagery comes from Apple's official press assets and
free-license stock (Unsplash/Pexels), in image slots designed so the owner's own shop and
team photos can replace them by editing one content file.

### Legal positioning

iProtectCare is **not** an Apple Authorised Service Provider. Copy must never imply Apple
endorsement. No Apple logos. No "Apple Certified" claims. The footer carries:

> iProtectCare is an independent service provider and is not affiliated with, authorised
> by, or endorsed by Apple Inc. Apple, iPhone, iPad, MacBook, iMac and Apple Watch are
> trademarks of Apple Inc.

### Trust strategy

A business founded in 2026 with zero reviews cannot use the trust signals the reference
sites use (years in operation, named testimonials, Apple authorisation). Fabricating them
is dishonest and independently verifiable by customers. The "Why iProtectCare" section is
therefore built only from claims true on day one:

- Free diagnosis before you pay anything
- Warranty on every repair
- Transparent quoted pricing, no hidden charges
- Same-day turnaround on common repairs
- Quality replacement parts
- A real shop in Koramangala you can walk into

A testimonials section is designed but ships hidden, with a content flag to enable it once
real reviews exist.

## 2. Business details

Source of truth: `src/content/business.ts`. Every component reads from it; nothing is
hardcoded.

| Field | Value |
|---|---|
| Name | iProtectCare |
| Area | Koramangala, Bengaluru 560034 |
| Street address | `TODO: confirm full street line` |
| Phone | +91 98868 44485 |
| WhatsApp | +91 98868 44485 (assumed same — `TODO: confirm`) |
| Email | iprotectcaretechnology@gmail.com |
| Hours | 09:30 – 21:30, all days (`TODO: confirm 7-day`) |
| Established | 2026 |
| Logo | `TODO` — placeholder wordmark until supplied |

## 3. Decisions taken

| Decision | Choice | Reasoning |
|---|---|---|
| Conversion model | Call/WhatsApp CTAs + Book-a-Repair form | Form captures leads that would otherwise bounce |
| Lead storage | Google Sheet via Apps Script web app | No GCP project, no service-account key to rotate |
| WhatsApp delivery | `wa.me` prefill, customer taps send | Zero cost, zero approval; Sheet row written regardless so no lead is lost |
| Future WhatsApp upgrade | `lib/notify.ts` seam | Cloud API or a gateway drops in without touching UI |
| Page scope | Home + 5 device pages + about/faq/contact/book | Device pages are what rank in search |
| Visual direction | Apple-like minimal | Sits naturally beside the products being repaired |
| Theming | Light + dark, OS-default with manual toggle | Explicitly requested |
| Stack | Next.js 15 App Router, TypeScript, Tailwind v4, Motion | Zero-config Vercel target, static generation, image optimisation |
| CMS | None — typed content files | Five-page site; content editable on GitHub, auto-deploys |

### Rejected

- **WhatsApp Cloud API / paid gateway (now).** Meta business verification plus a dedicated
  number that can no longer be used in the normal WhatsApp app; gateways cost
  ₹999–2,500/month. Premature before lead volume exists.
- **Astro.** Lighter, but the island model fights multi-section scroll choreography.
- **Sanity CMS.** A second service and a schema to maintain for content that changes a few
  times a year. Clean later upgrade — components already read from a content layer.
- **Blog / B2B pages.** An empty blog reads worse than no blog.
- **CAPTCHA.** Blocks real leads to stop spam that does not yet exist. Honeypot plus
  fill-time check instead.

## 4. Site map

```
/                      home
/iphone-repair         \
/ipad-repair            |
/macbook-repair         |  one template, five content files
/mac-repair             |
/apple-watch-repair    /
/book                  standalone form
/about
/faq
/contact
/privacy  /terms       footer-linked only
```

`/mac-repair` covers iMac, Mac mini and Mac Studio. Scoping it to iMac alone would dead-end
Mac mini owners.

### Homepage anatomy

1. **Sticky header** — wordmark; nav of Devices (dropdown of all five), About, FAQ,
   Contact; theme toggle; "Book Repair" button.
   Mobile: full-screen sheet, plus a **persistent bottom bar** pinning Call · WhatsApp ·
   Book within thumb reach. Highest-value mobile decision on the site.
2. **Hero** — display headline, one-line promise, dual CTA, device visual, and a trust
   strip: *Free diagnosis · Warranty on repairs · Same-day on common fixes · Quality parts*.
3. **Device grid** — five cards linking to device pages.
4. **What we fix** — carousel: screen, battery, water damage, charging port, logic board,
   keyboard, camera, data recovery.
5. **Why iProtectCare** — six promise cards (§1).
6. **How it works** — four steps on `surface-contrast`: tell us → free diagnosis and fixed
   quote → we repair → collect or delivered.
7. **Book a Repair** — the form, inline.
8. **Find us** — address, hours, map, directions.
9. **FAQ** — accordion, 6–7 entries.
10. **Footer** — contact, device links, hours, non-affiliation disclaimer.

**Testimonials** are built but ship hidden behind the content flag in §1. When real reviews
exist, the section slots in between *Why iProtectCare* and *How it works*. Until then it
renders nothing — the page must not show an empty or placeholder-filled review block.

### Device page template

Hero naming the device and supported models → repairs for that device with indicative price
bands → the four-step process → device-specific FAQ → form. Five content files drive all
five pages; a sixth device is a data entry, not a new page.

**Price bands.** Honest "starting from" ranges per repair, not exact prices. Pricing is the
most-asked question and a page that dodges it sends people to a competitor who doesn't.
Real numbers required before launch; `TODO` in content files until supplied.

## 5. Design system

**Type.** Geist, display and body. SF-adjacent without being a knockoff, ships as an npm
package so it self-hosts with no network request blocking first paint, and its tight
display cut holds up at 56–80px hero sizes. Fluid `clamp()` sizing scales continuously from
360px to 1440px rather than stepping at breakpoints.

**Colour.**

| Token | Light | Dark |
|---|---|---|
| `surface` | `#FFFFFF` | `#0B0B0C` |
| `surface-raised` | `#F5F5F7` | `#161618` |
| `surface-contrast` | `#1D1D1F` | `#161618` |
| `text-primary` | `#1D1D1F` | `#F5F5F7` |
| `accent` | single blue, retunable when the logo lands | same |

`surface-contrast` inverts by design: a hardcoded dark band looks deliberate on a white
page and invisible on a dark one. Every pairing meets WCAG AA — including accent on both
surfaces, which is where these palettes usually fail.

**Theming.** CSS custom properties on `:root` and `[data-theme="dark"]`, mapped into
Tailwind v4 via `@theme`. Components write `bg-surface` / `text-primary`, never a raw hex.
Defaults to OS setting; toggle overrides; choice persists in `localStorage`; a blocking
script in `<head>` applies it before first paint so dark-mode users never get a white flash.

**Layout.** 4px base scale. Content container 1200px, 1440px for full-bleed showcase
sections. Vertical rhythm via `clamp()` so sections breathe on desktop and tighten on
mobile instead of leaving phone users scrolling dead space.

**Mobile.** Written phone-first, complexity added upward. 44px minimum tap targets. Bottom
action bar always reachable. Carousels respond to swipe, not only arrows.

## 6. Motion

**Scroll reveals.** `opacity 0 → 1` with a 16px rise, ~500ms ease-out, children staggered
60ms. Fires once via `IntersectionObserver`, never a scroll listener, and never replays on
scroll-back — replaying is what makes animated sites feel cheap on a second pass.

**Scroll-linked, sparingly.** Hero device drifts slower than the page and softens as it
leaves. Process timeline draws its connecting line on descent. Nothing else. No
scroll-jacking, no pinned sections stealing the wheel: on an Apple-like design restraint is
the aesthetic, and hijacked scrolling is the fastest way to lose a phone user.

**Carousels.** Embla (~6KB): real swipe physics, snap points, keyboard arrows, no layout
thrash. Two — "What we fix" as a peeking multi-card track showing a sliver of the next card
so it reads as scrollable, and a per-device gallery. Autoplay off by default; if enabled on
the gallery it pauses on hover and focus.

**Hover.** Device cards lift 4px with a hairline border brighten and a radial highlight
tracking the cursor. Images scale to 1.03 inside a clipped frame. Buttons shift brightness;
links grow an underline from the left. All pointer effects gated behind `(hover: hover)` so
they never fire on touch, where they would stick after a tap.

**Performance.** `transform` and `opacity` only — never width, height, top or left — so
everything is GPU-composited and holds 60fps on a mid-range Android.

**`prefers-reduced-motion`.** Reveals instant, parallax off, autoplay off, cursor glow off.
Content identical; only movement goes.

## 7. Code architecture

```
src/
  app/
    layout.tsx              theme script, fonts, LocalBusiness JSON-LD
    page.tsx                home
    [device]/page.tsx       generateStaticParams → 5 device pages
    book/ about/ faq/ contact/ privacy/ terms/
    api/book/route.ts       the only server code
  components/
    layout/                 Header, Nav, Footer, ThemeToggle, MobileActionBar
    sections/               Hero, DeviceGrid, RepairCarousel, WhyUs, Process,
                            Testimonials (flag-gated), FindUs, Faq, CtaBand
    ui/                     Button, Card, Accordion, Carousel, Field, Reveal, Section
    forms/                  BookRepairForm
  content/
    business.ts             §2 — single source of truth
    devices/*.ts            5 files: models, repairs, price bands, copy, FAQ
    faq.ts  repairs.ts  process.ts  why-us.ts
  lib/
    schema.ts               Zod, shared client + server
    whatsapp.ts             message builder + wa.me URL
    sheets.ts               Apps Script POST
    notify.ts               swappable delivery seam
    jsonld.ts  seo.ts
```

Every string, price and phone number lives in `content/`. Components read; they never
hardcode. This is what makes the CMS upgrade cheap later, and why prices are editable on
GitHub without touching a component.

## 8. Book-a-Repair form

### Fields

| Field | Type | Required |
|---|---|---|
| Device type | select — iPhone, iPad, MacBook, Mac desktop, Apple Watch, Other | yes |
| Model | select, filtered by device type, ends "Other / not sure" | yes |
| Issue | select of that device's common repairs + "Other" | yes |
| Notes | textarea | no |
| Name | text, placeholder "Jane Doe" | yes |
| Phone | tel, fixed `+91` prefix, 10 digits starting 6–9 | yes |
| Email | email | yes |
| Address | textarea + optional 6-digit PIN | no |
| Consent | checkbox — "I agree to be contacted about this repair" | yes |

When device type is **Other**, the model dropdown collapses to a free-text input and the
Issue dropdown falls back to a generic list (screen, battery, water damage, charging port,
won't power on, other). Submit is disabled until consent is ticked. The model dropdown is disabled until a device
is chosen, then repopulates and clears any stale selection.

**No real person's name, email or phone number appears anywhere in code, content, tests or
examples.** Sample data is generic: Jane Doe, jane.doe@example.com, +91 90000 00000. The
business phone and email appear only as contact details and as the WhatsApp destination.

### Model lists — 2017 to 2026

Plain arrays in `content/devices/*.ts`; next year's models are a one-line addition.

| Device | Approx. count | Range |
|---|---|---|
| iPhone | ~30 | iPhone 8 onward, plus SE 2nd/3rd gen |
| iPad | ~20 | base, Air, mini, Pro |
| MacBook | ~25 | late-Intel through Apple silicon, Air and Pro |
| Mac desktop | ~12 | iMac, Mac mini, Mac Studio |
| Apple Watch | ~15 | Series 3 onward, SE, Ultra |

**Model data is reliable through 2025 and thins out for 2026 releases.** Unverifiable 2026
models are marked `TODO: confirm` rather than invented — a wrong model name is exactly the
error a customer notices. Owner must verify the newest group before launch.

### Pipeline

1. Client validates on blur (react-hook-form + Zod).
2. `POST /api/book`.
3. Server **re-validates with the same Zod schema**. Client validation is UX, not a
   security boundary.
4. Bot defence: hidden honeypot field plus minimum fill-time check.
5. Server POSTs to the Apps Script URL with a shared secret; the script appends a row.
6. Response returns success plus the prefilled WhatsApp message.
7. Success state renders a large **"Send on WhatsApp"** button.

**WhatsApp is never auto-opened after the request resolves.** Browsers block popups not
tied to a direct user gesture, so an `await`-then-open silently fails for a share of users.
The tapped button is a real gesture, opens reliably, and is honest about what happens next.

### Failure handling

Designed so a lead is never lost:

- **Sheet write fails** — still show the WhatsApp button, log the error. The lead reaching
  the owner beats the row existing.
- **Whole request fails** — error state shows tap-to-call and WhatsApp directly.
- **Apps Script slow** — `AbortController` at 8 seconds rather than hanging.
- Raw errors never surface to the user.

### Google Sheet columns

`Timestamp | Date | Time | Device | Model | Issue | Notes | Name | Phone | Email | Address | PIN | Consent | Source Page`

Date and time are formatted **in Asia/Kolkata by the Apps Script**, not by the serverless
function. Vercel runs UTC; computing them server-side would log 04:00 for a 09:30 booking.

### WhatsApp message

WhatsApp renders `*bold*` and newlines and nothing else, so it is one line per field. Empty
optional fields are dropped rather than sent blank. The whole string is
`encodeURIComponent`'d into the `wa.me` link.

```
*New Repair Request* — iProtectCare

*Device:* iPhone 14 Pro
*Issue:* Screen replacement
*Notes:* Cracked after a drop

*Name:* Jane Doe
*Phone:* +91 90000 00000
*Email:* jane.doe@example.com
*Address:* 5th Block, Koramangala — 560034

_Sent from iprotectcare.in_
```

### Environment variables

| Variable | Purpose |
|---|---|
| `SHEETS_WEBHOOK_URL` | Deployed Apps Script web app endpoint |
| `SHEETS_SHARED_SECRET` | Rejects unauthenticated writes to the Sheet |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Destination for the `wa.me` link |

## 9. SEO

Unique title and description per page. Canonical URLs on `https://www.iprotectcare.in`.
Generated `sitemap.xml` and `robots.txt`. OpenGraph images so shared links look
intentional.

Structured data carries local search: `LocalBusiness` in the root layout with the
Koramangala address, hours and phone; `Service` on each device page; `FAQPage` on the FAQ.
This is what makes Google surface hours and a call button directly in results.

**The single biggest lever for "iPhone repair near me" is a verified Google Business
Profile with photos and reviews, not the website.** The site supports it; it cannot replace
it. Set it up in parallel.

## 10. Performance

Everything statically generated. Images via `next/image` as AVIF/WebP with explicit
dimensions so nothing shifts during load. Fonts self-hosted. Hero image marked priority.
Target Lighthouse 95+ on mobile throttled to 4G.

## 11. Accessibility

Semantic landmarks, skip link, visible focus rings, every input labelled, form status
announced via `aria-live`, keyboard-operable accordion and carousel, AA contrast in both
themes, and the reduced-motion handling in §6.

## 12. Testing

Proportionate to a marketing site — cover the logic that would break silently, plus the one
flow that earns money. Written test-first.

**Vitest**
- Zod schema: phone format, PIN format, consent required, optional-field handling.
- WhatsApp message builder: encoding, omitted optional fields, bold formatting.
- Content integrity: every device has models, and no duplicate model names. Price bands
  must be either a real range or an explicit `TODO` marker — never absent, never an empty
  string. A separate launch-readiness test asserts zero `TODO` markers remain; it is
  skipped by default and enabled via `LAUNCH_CHECK=1`, so it gates the launch without
  failing every build during development.

**Playwright**
- Book-a-Repair happy path: fill → submit against a mocked endpoint → success state →
  assert the decoded WhatsApp link message is correct.
- Failure path: mocked 500 → error state exposes call and WhatsApp.
- Theme toggle persists across reload with no flash.
- Mobile nav and bottom action bar.

## 13. Deployment

GitHub → Vercel. Env vars in the Vercel dashboard. `www.iprotectcare.in` canonical, apex
redirects to it. Preview deploy per branch.

## 14. Open items before launch

1. Full street address line.
2. Confirm WhatsApp number matches the phone number.
3. Confirm 7-day opening hours.
4. Logo asset.
5. Real price bands for every listed repair.
6. Verify 2026 device models.
7. Owner's own shop and team photos, replacing stock.
8. Google Business Profile created and verified.
