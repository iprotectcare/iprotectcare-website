export type Repair = {
  slug: string;
  name: string;
  /** Honest "starting from" band, or an explicit TODO marker until real prices land. */
  priceBand: string;
  blurb: string;
};

export type DeviceFaq = { q: string; a: string };

export type Device = {
  /** URL segment, e.g. "iphone-repair" */
  slug: string;
  name: string;
  navLabel: string;
  heroTitle: string;
  heroSub: string;
  /** Value used by the booking form's device-type select. */
  formDeviceType: "iPhone" | "iPad" | "MacBook" | "Mac desktop" | "Apple Watch";
  models: string[];
  repairs: Repair[];
  faq: DeviceFaq[];
  metaTitle: string;
  metaDescription: string;
};
