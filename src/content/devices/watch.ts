import type { Device } from "./types";

export const watch: Device = {
  slug: "apple-watch-repair",
  name: "Apple Watch",
  navLabel: "Apple Watch Repair",
  heroTitle: "Apple Watch repair in Koramangala",
  heroSub:
    "Cracked screens, worn batteries and water damage on every Apple Watch from Series 3 to Ultra — free diagnosis first.",
  formDeviceType: "Apple Watch",
  models: [
    "Apple Watch Series 3",
    "Apple Watch Series 4",
    "Apple Watch Series 5",
    "Apple Watch SE (1st gen, 2020)",
    "Apple Watch Series 6",
    "Apple Watch Series 7",
    "Apple Watch Series 8",
    "Apple Watch Ultra (2022)",
    "Apple Watch SE (2nd gen, 2022)",
    "Apple Watch Series 9",
    "Apple Watch Ultra 2",
    "Apple Watch Series 10",
    "Apple Watch Series 11",
    "Apple Watch SE 3",
    "Apple Watch Ultra 3",
    "Newer 2026 Apple Watch (TODO: confirm 2026 models)",
  ],
  repairs: [
    {
      slug: "screen",
      name: "Screen replacement",
      priceBand: "TODO: price band",
      blurb: "Cracked or lifted displays replaced and resealed.",
    },
    {
      slug: "battery",
      name: "Battery replacement",
      priceBand: "TODO: price band",
      blurb: "Not lasting the day, or a swollen battery pushing the screen up.",
    },
    {
      slug: "water-damage",
      name: "Water damage treatment",
      priceBand: "TODO: price band",
      blurb: "Cleaning and repair after the seal has let water in.",
    },
    {
      slug: "buttons",
      name: "Crown & button repair",
      priceBand: "TODO: price band",
      blurb: "Stuck digital crowns and unresponsive side buttons.",
    },
  ],
  faq: [
    {
      q: "My Apple Watch screen popped off. Can it be reattached?",
      a: "A lifting screen is usually a swollen battery underneath. We replace the battery and reseal or replace the screen — don't press it back down yourself.",
    },
    {
      q: "Is an Apple Watch screen worth repairing?",
      a: "For Series 7 and newer, and all Ultra models, usually yes — a screen repair costs well under a new watch. For older models we'll give you an honest recommendation with the free diagnosis.",
    },
    {
      q: "Will my watch stay water-resistant after a repair?",
      a: "We reseal watches after opening, but factory-level water resistance can't be guaranteed after any opening — we'll be upfront about that for your model.",
    },
  ],
  metaTitle: "Apple Watch Repair in Koramangala, Bengaluru | iProtectCare",
  metaDescription:
    "Apple Watch screen and battery replacement in Koramangala, Bengaluru — Series 3 to Ultra 3. Free diagnosis, fixed quotes, warranty on every repair.",
};
