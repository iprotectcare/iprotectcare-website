import type { Device } from "./types";

export const ipad: Device = {
  slug: "ipad-repair",
  name: "iPad",
  navLabel: "iPad Repair",
  heroTitle: "iPad repair in Koramangala",
  heroSub:
    "Screens, batteries and charging faults for every iPad — base, mini, Air and Pro — with free diagnosis and a fixed quote.",
  formDeviceType: "iPad",
  image: { src: "/images/devices/ipad.jpg", alt: "A fanned stack of iPad Air tablets in five colours" },
  models: [
    "iPad (5th gen, 2017)",
    "iPad (6th gen, 2018)",
    "iPad (7th gen, 2019)",
    "iPad (8th gen, 2020)",
    "iPad (9th gen, 2021)",
    "iPad (10th gen, 2022)",
    "iPad (11th gen, A16)",
    "iPad mini 5 (2019)",
    "iPad mini 6 (2021)",
    "iPad mini (A17 Pro, 2024)",
    "iPad Air 3 (2019)",
    "iPad Air 4 (2020)",
    "iPad Air 5 (2022)",
    "iPad Air 11″ / 13″ (M2, 2024)",
    "iPad Air 11″ / 13″ (M3, 2025)",
    "iPad Pro 10.5″ (2017)",
    "iPad Pro 11″ (1st–4th gen, 2018–2022)",
    "iPad Pro 12.9″ (2nd–6th gen, 2017–2022)",
    "iPad Pro 11″ / 13″ (M4, 2024)",
    "iPad Pro 11″ / 13″ (M5, 2025)",
  ],
  repairs: [
    {
      slug: "screen",
      name: "Screen & digitizer replacement",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Cracked glass or unresponsive touch fixed with a genuine assembly.",
    },
    {
      slug: "battery",
      name: "Battery replacement",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Swollen or fast-draining batteries replaced safely.",
    },
    {
      slug: "charging-port",
      name: "Charging port repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Charging only at an angle, or not at all — port replaced.",
    },
    {
      slug: "water-damage",
      name: "Water damage treatment",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Board-level cleaning and repair after liquid exposure.",
    },
    {
      slug: "buttons",
      name: "Button & speaker repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Stuck power or volume buttons and crackling speakers.",
    },
  ],
  faq: [
    {
      q: "My iPad's touch stopped working after a fall. Can it be fixed?",
      a: "Almost always, yes — that's typically a digitizer fault and we replace the full assembly. Diagnosis is free, so we'll confirm before you commit.",
    },
    {
      q: "Is an iPad battery replacement worth it?",
      a: "If your iPad otherwise works well, a new battery costs a fraction of a new device and typically adds years of use.",
    },
    {
      q: "How long does an iPad screen replacement take?",
      a: "iPad screens are glued and need careful separation and curing — most are ready in 1–2 days depending on the model.",
    },
  ],
  metaTitle: "iPad Repair in Koramangala, Bengaluru | iProtectCare",
  metaDescription:
    "iPad screen, battery and charging port repair in Koramangala, Bengaluru — all models from iPad mini to iPad Pro. Free diagnosis, warranty on every repair.",
};
