# How apple.com does scroll animation — and how we replicate it

Research date: 2026-09-05. Evidence gathered by fetching and inspecting the live
markup, JS bundles, and CSS of `apple.com` (homepage), `/macbook-air/`, and
`/iphone/`. This maps Apple's actual techniques onto our stack
(Next.js 15 + Tailwind v4 + Motion, per the design spec §3).

---

## 1. What Apple actually does (observed, not guessed)

### 1.1 A scroll-position engine, not CSS scroll-timeline

`main.built.js` on /macbook-air/ contains ~30 `requestAnimationFrame` call
sites and ~27 reads of `scrollY`/`scrollTop`, plus `IntersectionObserver` for
visibility gating. There is **no** CSS `animation-timeline` / `scroll-timeline`
usage. Apple runs a classic rAF loop: read scroll position once per frame,
compute each section's progress (0→1), write `transform`s.

Key implication for us: Motion's `useScroll()` + `useTransform()` is the same
architecture, already optimized (passive listeners, single rAF, no layout
thrash). We don't need to hand-roll anything.

### 1.2 Viewport-relative keyframes declared in markup

Every animated media element carries JSON config in data attributes:

```html
<video muted playsinline data-inline-media data-alpha preload="none" role="img"
  data-inline-media-load-keyframe='{"start": "t - 200vh", "end": "b + 200vh"}'
  data-inline-media-play-keyframe='{"start": "t - 50vh",  "end": "b"}'
  data-inline-media-reset-keyframe='{"start": "t - 100vh", "end": "b"}'
  data-inline-media-basepath="...">
```

`t` / `b` = the element's top/bottom relative to the viewport. So:
- **load** window: start fetching the video 200vh before it enters (lazy but
  never late — the asset is ready by the time you see it),
- **play** window: play when the top is 50vh from entering,
- **reset** window: rewind when scrolled back above it.

Equivalent in Motion: `useScroll({ target, offset: ["start 150vh", "end start"] })`
gives the same viewport-relative progress; `whileInView` + `viewport={{ margin }}`
covers the trigger cases.

### 1.3 Section-scoped animation groups

Sections are tagged `data-anim-scroll-group="Section - Design"`,
`"Section - Performance"`, etc. Each group is an independent scroll-linked
timeline — animations never span sections, so any section can be reordered or
dropped without breaking choreography. We should keep the same rule: **one
component = one timeline**.

### 1.4 Video as the animation medium, image as the fallback

The modern Apple pages animate with short, muted, `playsinline` **videos**
(some with alpha channels — `data-alpha`), not canvas frame sequences (zero
`<canvas>` on /macbook-air/). Every video has a `*_startframe_*.png` poster
(e.g. `privacy_startframe__fakgfg6clriq_large_2x.png`) so the first frame is
identical whether or not the video ever plays. `currentTime` shows up 14× in
the bundle — a few segments are scroll-scrubbed, but most are simply
play-on-enter / reset-on-leave.

For us: hero and section flourishes can be 2–4s muted `.mp4`/`.webm` loops
with a poster; play via `whileInView`. Scrubbing video by scroll is possible
(`useScroll` progress → `video.currentTime`) but only worth it for one hero
moment, if any — it requires keyframe-dense encoding to seek smoothly.

### 1.5 Sticky is used sparingly

Only **one** `position:sticky` in the entire overview CSS. Apple's sections
mostly scroll normally; the "pinned stage while content scrubs" effect is
reserved for one or two moments per page. Restraint is the design.

### 1.6 Transforms only, with will-change and reduced-motion

The CSS animates via `transform: translate…` (32 uses) with targeted
`will-change` (6 uses — not sprayed everywhere). `prefers-reduced-motion`
appears in both JS and CSS: with reduced motion, videos don't autoplay and the
startframe poster stands in. Our spec §3 already mandates this; Apple confirms
the pattern — **the page must be fully legible with zero motion**.

### 1.7 Responsive asset ladder

Every image ships as `small/medium/large` × `1x/2x` (+ `tall` crops for
portrait viewports), e.g. `hero_..._large_2x.jpg`. `next/image` with `sizes`
gives us this for free; the takeaway is they also swap **art direction** per
breakpoint (`largetall` ≠ cropped `large`), which `<picture>`/`getImageProps`
handles.

---

## 2. Pattern → implementation map for iProtectCare

| Apple pattern | Where we use it | Implementation in our stack |
|---|---|---|
| Fade/rise reveal on section enter | Every section heading + card grid | `motion.div` `initial={{opacity:0, y:24}}` `whileInView={{opacity:1, y:0}}` `viewport={{once:true, margin:"-15%"}}` |
| Staggered children | Device grid, why-us tiles | Motion `staggerChildren: 0.08` on the parent variant |
| Play-on-enter muted video w/ poster | Homepage hero, one device-page flourish | `<video muted playsInline preload="none" poster>` + `whileInView` play; poster = startframe export |
| Sticky stage + scrolling copy | ONE section max (e.g. repair-process steps) | Parent `relative h-[300vh]`, child `sticky top-0 h-screen`; `useScroll({target})` + `useTransform` drives the stage |
| Scroll-linked parallax drift | Hero device image (subtle, ±20px) | `useScroll()` + `useTransform(scrollYProgress, [0,1], [0,-20])` |
| Load-ahead media windows | All below-fold imagery/video | `next/image` lazy default; for video, IntersectionObserver with `rootMargin: "200% 0px"` before setting `src` |
| Reduced motion fallback | Everywhere | Motion's `useReducedMotion()`; posters shown, reveals become plain opacity or nothing |
| Responsive art direction | Hero across mobile/desktop | `<picture>` or `getImageProps` with distinct portrait/landscape crops |

Rules Apple's implementation validates (keep these):
1. Animate `transform`/`opacity` only; never layout properties.
2. One scroll timeline per section; no cross-section choreography.
3. Sticky-scrub is a once-per-page spice, not a default.
4. Every animated medium has a static first-frame equivalent.
5. Motion is additive: disable it all and the page still works.

---

## 3. Apple media pulled for reuse (see `design-assets/reference/apple.com/`)

- Root: homepage hero/promo tiles (event hero, back-to-school, iPhone/Watch
  heroes) — useful as **art-direction references** for gradient/lighting style.
- `iphone/` — iPhone line-up renders and section imagery (25 files).
- `mac/`, `ipad/`, `watch/` — product tiles from the buying pages (25 each);
  clean renders on neutral backgrounds, the closest match to our device-page
  hero slots.
- `airpods/`, `macbook-air/` — additional renders incl. `startframe` posters,
  which show exactly how Apple frames a video's first frame.
- `manifest.json` in the folder maps every file back to its source URL + page.

**Licensing caution (spec §"reference sites" decision still stands):** these
files are Apple's copyrighted marketing assets, downloaded for design
reference. For production, prefer (a) Apple's official press/newsroom assets
under their usage terms, (b) our own shop photography, (c) free-license stock
(Unsplash/Pexels). Using Apple product renders on a repair-shop site is
widespread practice but is technically at Apple's tolerance, and we must keep
the site's existing non-affiliation disclaimer prominent either way.
