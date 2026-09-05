import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWaUrl } from "@/lib/whatsapp";
import type { Booking } from "@/lib/schema";

const booking: Booking = {
  deviceType: "iPhone",
  model: "iPhone 14 Pro",
  issue: "Screen replacement",
  notes: "Cracked after a drop",
  name: "Jane Doe",
  phone: "9000000000",
  email: "jane.doe@example.com",
  address: "5th Block, Koramangala",
  pin: "560034",
  consent: true,
  startedAt: 0,
};

describe("buildWhatsAppMessage", () => {
  it("renders the full message in the spec §8 format", () => {
    expect(buildWhatsAppMessage(booking)).toBe(
      [
        "*New Repair Request* — iProtectCare",
        "",
        "*Device:* iPhone 14 Pro",
        "*Issue:* Screen replacement",
        "*Notes:* Cracked after a drop",
        "",
        "*Name:* Jane Doe",
        "*Phone:* +91 9000000000",
        "*Email:* jane.doe@example.com",
        "*Address:* 5th Block, Koramangala — 560034",
        "",
        "_Sent from iprotectcare.in_",
      ].join("\n"),
    );
  });

  it("drops empty optional lines instead of sending them blank", () => {
    const minimal: Booking = {
      ...booking,
      notes: undefined,
      address: undefined,
      pin: undefined,
      email: undefined,
    };
    const msg = buildWhatsAppMessage(minimal);
    expect(msg).not.toContain("*Notes:*");
    expect(msg).not.toContain("*Address:*");
    expect(msg).not.toContain("*Email:*");
    expect(msg).toContain("*Device:* iPhone 14 Pro");
    expect(msg).toContain("*Phone:* +91 9000000000");
  });

  it("labels an 'Other' device with its typed model only", () => {
    const other: Booking = { ...booking, deviceType: "Other", model: "Nokia 3310" };
    expect(buildWhatsAppMessage(other)).toContain("*Device:* Nokia 3310");
  });

  it("shows address without PIN when PIN is absent", () => {
    const noPin: Booking = { ...booking, pin: undefined };
    const line = buildWhatsAppMessage(noPin)
      .split("\n")
      .find((l) => l.startsWith("*Address:*"));
    expect(line).toBe("*Address:* 5th Block, Koramangala");
  });
});

describe("buildWaUrl", () => {
  it("normalises the number and URL-encodes the message", () => {
    expect(buildWaUrl("+91 98868 44485", "a b\nc")).toBe(
      "https://wa.me/919886844485?text=a%20b%0Ac",
    );
  });
});
