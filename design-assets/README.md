# design-assets

Downloaded reference imagery for the iProtectCare website build.
Collected 2026-09-05 with a crawler script; every folder has a `manifest.json`
mapping each file to its source URL and the page it was found on.

## Layout

```
reference/
  icareindia.in/       34 files  — service/step illustrations, banners
  icareservice.co.in/  30 files  — device renders (iPhone 12–14 protect-plan art), service photos
  apple.com/           48 files
    (root)             homepage hero + promo tiles, incl. *_startframe posters
    iphone/  mac/  ipad/  watch/  airpods/  macbook-air/
                       per-product renders from the buying/overview pages
```

Counts reflect the owner's 2026-09-05 curation pass (an `ionecare.in/`
folder was downloaded and later removed).

## Usage rules

- **Reference / inspiration: yes.** Layout studies, art-direction matching,
  placeholder slots during development.
- **Production: careful.** Everything here is someone else's copyrighted
  asset. The design spec's original decision stands: competitor images
  (icareindia/icareservice) must **not** ship on the live site.
  Apple renders are lower-risk in practice for a repair shop but still
  Apple's property — prefer official press assets, our own photography, or
  free-license stock for launch. Keep the non-affiliation disclaimer.
- This folder is **gitignored** (bulky + third-party content); the manifests
  let anyone re-download.

Related research: `docs/research/2026-09-05-apple-scroll-animations.md`.
