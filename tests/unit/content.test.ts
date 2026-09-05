import { describe, expect, it } from "vitest";
import { devices, getDevice } from "@/content/devices";
import { business } from "@/content/business";
import { sixPromises } from "@/content/why-us";
import { commonRepairs } from "@/content/repairs";
import { steps } from "@/content/process";
import { generalFaq } from "@/content/faq";

describe("device content integrity", () => {
  it("exposes exactly the five routed device slugs, in nav order", () => {
    expect(devices.map((d) => d.slug)).toEqual([
      "iphone-repair",
      "ipad-repair",
      "macbook-repair",
      "mac-repair",
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

  it("every repair has a price band: a real range or an explicit TODO", () => {
    for (const d of devices) {
      expect(d.repairs.length, d.slug).toBeGreaterThanOrEqual(3);
      for (const r of d.repairs) {
        expect(r.priceBand, `${d.slug}/${r.slug}`).toMatch(/(^From ₹|^₹|TODO)/);
      }
    }
  });

  it("mac-repair covers iMac, Mac mini and Mac Studio", () => {
    const mac = getDevice("mac-repair");
    expect(mac).toBeDefined();
    const joined = mac!.models.join(" ");
    expect(joined).toContain("iMac");
    expect(joined).toContain("Mac mini");
    expect(joined).toContain("Mac Studio");
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
