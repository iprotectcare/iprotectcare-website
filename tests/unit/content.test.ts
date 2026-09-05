import { describe, expect, it } from "vitest";
import { devices, getDevice } from "@/content/devices";
import { business } from "@/content/business";
import { sixPromises } from "@/content/why-us";
import { commonRepairs } from "@/content/repairs";
import { steps } from "@/content/process";
import { generalFaq } from "@/content/faq";

describe("device content integrity", () => {
  it("exposes exactly the four routed device slugs, in nav order", () => {
    // Mac desktops (iMac/Mac mini/Mac Studio) are not serviced — owner
    // decision 2026-09-05.
    expect(devices.map((d) => d.slug)).toEqual([
      "iphone-repair",
      "ipad-repair",
      "macbook-repair",
      "apple-watch-repair",
    ]);
  });

  it("every device has a workable model list with no duplicates", () => {
    for (const d of devices) {
      expect(d.models.length, d.slug).toBeGreaterThanOrEqual(5);
      expect(new Set(d.models).size, `duplicate model in ${d.slug}`).toBe(
        d.models.length,
      );
    }
  });

  it("every repair has a non-empty price line", () => {
    // Owner decision 2026-09-05: prices are quoted per device at the free
    // diagnosis, so the line is copy, not a number — but it must never be
    // absent or blank.
    for (const d of devices) {
      expect(d.repairs.length, d.slug).toBeGreaterThanOrEqual(3);
      for (const r of d.repairs) {
        expect(r.priceBand.trim().length, `${d.slug}/${r.slug}`).toBeGreaterThan(0);
      }
    }
  });

  it("every device has an image slot pointing at a real file", () => {
    for (const d of devices) {
      expect(d.image.src, d.slug).toMatch(/^\/images\/devices\/.+\.(jpg|png|webp)$/);
      expect(d.image.alt.length, d.slug).toBeGreaterThan(0);
    }
  });

  it("no Mac-desktop service claims remain in device content", () => {
    const blob = JSON.stringify(devices);
    expect(blob).not.toContain("mac-repair");
    expect(blob).not.toContain("Mac desktop");
    expect(blob).not.toContain("Mac mini");
    expect(blob).not.toContain("Mac Studio");
  });

  it("every device has hero copy, meta and FAQ", () => {
    for (const d of devices) {
      expect(d.heroTitle.length, d.slug).toBeGreaterThan(0);
      expect(d.metaTitle.length, d.slug).toBeGreaterThan(0);
      expect(d.metaDescription.length, d.slug).toBeGreaterThan(0);
      expect(d.faq.length, d.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("getDevice returns undefined for unknown slugs", () => {
    expect(getDevice("nokia-repair")).toBeUndefined();
  });
});

describe("supporting content", () => {
  it("has six why-us promises, eight common repairs, four steps, and a general FAQ", () => {
    expect(sixPromises).toHaveLength(6);
    expect(commonRepairs).toHaveLength(8);
    expect(steps).toHaveLength(4);
    expect(generalFaq.length).toBeGreaterThanOrEqual(6);
  });

  it("business details match the spec", () => {
    expect(business.phone).toBe("+91 98868 44485");
    expect(business.email).toBe("iprotectcaretechnology@gmail.com");
    expect(business.established).toBe(2026);
    expect(business.phoneHref).toBe("tel:+919886844485");
  });

  it("no real personal sample data leaks into content", () => {
    const all = JSON.stringify({ devices, sixPromises, commonRepairs, steps, generalFaq });
    // the business phone/email are allowed only in business.ts contact fields
    expect(all).not.toContain("98868");
    expect(all).not.toContain("@gmail.com");
  });
});
