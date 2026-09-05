import type { Device } from "./types";

export const macbook: Device = {
  slug: "macbook-repair",
  name: "MacBook",
  navLabel: "MacBook Repair",
  heroTitle: "MacBook repair in Koramangala",
  heroSub:
    "Screens, batteries, keyboards and logic boards for MacBook Air and Pro — Intel and Apple silicon — with free diagnosis first.",
  formDeviceType: "MacBook",
  image: { src: "/images/devices/macbook.jpg", alt: "Two MacBook Air laptops, one open and one closed" },
  models: [
    "MacBook 12″ Retina (2017)",
    "MacBook Air 13″ (2017)",
    "MacBook Air Retina (2018–2019)",
    "MacBook Air (2020, Intel)",
    "MacBook Air (M1, 2020)",
    "MacBook Air 13″ (M2, 2022)",
    "MacBook Air 15″ (M2, 2023)",
    "MacBook Air 13″ / 15″ (M3, 2024)",
    "MacBook Air 13″ / 15″ (M4, 2025)",
    "MacBook Pro 13″ (2016–2020, Intel)",
    "MacBook Pro 13″ (M1, 2020)",
    "MacBook Pro 13″ (M2, 2022)",
    "MacBook Pro 15″ (2016–2019)",
    "MacBook Pro 16″ (2019, Intel)",
    "MacBook Pro 14″ / 16″ (M1 Pro/Max, 2021)",
    "MacBook Pro 14″ / 16″ (M2 Pro/Max, 2023)",
    "MacBook Pro 14″ / 16″ (M3 family, 2023)",
    "MacBook Pro 14″ / 16″ (M4 family, 2024)",
    "MacBook Pro 14″ (M5, 2025)",
  ],
  repairs: [
    {
      slug: "screen",
      name: "Screen replacement",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Cracked panels, backlight faults, and flexgate display-cable issues.",
    },
    {
      slug: "battery",
      name: "Battery replacement",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Service-warning, swollen or fast-draining batteries replaced.",
    },
    {
      slug: "keyboard",
      name: "Keyboard replacement",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Sticky or dead keys — including butterfly-keyboard models.",
    },
    {
      slug: "trackpad",
      name: "Trackpad repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Unresponsive clicks or erratic cursors fixed.",
    },
    {
      slug: "logic-board",
      name: "Logic board repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Component-level microsoldering for no-power and no-display faults.",
    },
    {
      slug: "liquid-damage",
      name: "Liquid damage treatment",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Spilled coffee or water? Board cleaning and corrosion repair.",
    },
    {
      slug: "data-recovery",
      name: "Data recovery & storage",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Files recovered from Macs that won't boot; SSD upgrades on supported models.",
    },
  ],
  faq: [
    {
      q: "I spilled water on my MacBook. Is it dead?",
      a: "Not necessarily — but switch it off immediately, don't charge it, and bring it in fast. Quick board cleaning saves most liquid-damaged MacBooks.",
    },
    {
      q: "Can Apple silicon MacBooks be repaired outside Apple?",
      a: "Yes. Screens, batteries, keyboards and many board-level faults on M1–M5 machines are repairable independently, usually at a significant saving.",
    },
    {
      q: "My MacBook battery says 'Service Recommended'. Is it urgent?",
      a: "It means the battery is past its healthy cycle life. It won't fail overnight, but capacity and stability will keep dropping — replacement restores full runtime.",
    },
    {
      q: "How long does a MacBook repair take?",
      a: "Batteries and keyboards are often same-day or next-day. Screens and board-level repairs typically take 2–5 days depending on parts.",
    },
  ],
  metaTitle: "MacBook Repair in Koramangala, Bengaluru | iProtectCare",
  metaDescription:
    "MacBook Air and Pro repair in Koramangala, Bengaluru — screens, batteries, keyboards, liquid damage and logic boards. Free diagnosis and fixed quotes.",
};
