import type { Device } from "./types";

export const mac: Device = {
  slug: "mac-repair",
  name: "Mac desktop",
  navLabel: "iMac & Mac Repair",
  heroTitle: "iMac, Mac mini & Mac Studio repair in Koramangala",
  heroSub:
    "Displays, storage, power and logic board faults on every Mac desktop, diagnosed free with a fixed quote before any work.",
  formDeviceType: "Mac desktop",
  image: { src: "/images/devices/mac.jpg", alt: "A hand holding a Mac mini" },
  models: [
    "iMac 21.5″ (2017–2019, Intel)",
    "iMac 27″ (2017–2020, Intel)",
    "iMac 24″ (M1, 2021)",
    "iMac 24″ (M3, 2023)",
    "iMac 24″ (M4, 2024)",
    "Mac mini (2018, Intel)",
    "Mac mini (M1, 2020)",
    "Mac mini (M2 / M2 Pro, 2023)",
    "Mac mini (M4 / M4 Pro, 2024)",
    "Mac Studio (M1 Max/Ultra, 2022)",
    "Mac Studio (M2 Max/Ultra, 2023)",
    "Mac Studio (M4 Max / M3 Ultra, 2025)",
  ],
  repairs: [
    {
      slug: "display",
      name: "iMac display replacement",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Cracked glass, dead pixels, backlight and image faults.",
    },
    {
      slug: "storage",
      name: "Storage upgrade & repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Failing drives replaced; SSD upgrades where the model supports it.",
    },
    {
      slug: "power",
      name: "Power & no-boot repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Dead power supplies and Macs that chime but never start.",
    },
    {
      slug: "logic-board",
      name: "Logic board repair",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Component-level diagnosis and microsoldering.",
    },
    {
      slug: "data-recovery",
      name: "Data recovery",
      priceBand: "Quoted at your free diagnosis",
      blurb: "Files recovered from machines that no longer boot.",
    },
  ],
  faq: [
    {
      q: "My iMac won't turn on at all. What's the likely cause?",
      a: "Usually the power supply or a board-level fault. Both are repairable — we diagnose free and quote before touching anything.",
    },
    {
      q: "Can you upgrade my Mac mini's storage?",
      a: "On Intel and some Apple silicon models, yes. Bring it in and we'll confirm what your exact model supports.",
    },
    {
      q: "Do you service Mac Studio?",
      a: "Yes — Mac Studio, Mac mini and iMac are all covered, including Apple silicon models.",
    },
  ],
  metaTitle: "iMac, Mac mini & Mac Studio Repair in Koramangala | iProtectCare",
  metaDescription:
    "Mac desktop repair in Koramangala, Bengaluru — iMac displays, Mac mini and Mac Studio power, storage and logic board faults. Free diagnosis, fixed quotes.",
};
