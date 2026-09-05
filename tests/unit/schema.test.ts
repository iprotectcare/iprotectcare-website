import { describe, expect, it } from "vitest";
import { bookingSchema } from "@/lib/schema";

const valid = {
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
  startedAt: 1757060000000,
};

describe("bookingSchema", () => {
  it("accepts a fully valid booking", () => {
    const r = bookingSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("accepts a booking without the optional fields", () => {
    const rest = Object.fromEntries(
      Object.entries(valid).filter(([k]) => !["notes", "address", "pin"].includes(k)),
    );
    expect(bookingSchema.safeParse(rest).success).toBe(true);
  });

  it("requires a 10-digit phone starting 6-9", () => {
    expect(bookingSchema.safeParse({ ...valid, phone: "9886844485" }).success).toBe(true);
    expect(bookingSchema.safeParse({ ...valid, phone: "1234567890" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, phone: "900000000" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, phone: "90000000000" }).success).toBe(false);
  });

  it("strips spaces and an accidental +91 prefix from the phone", () => {
    const r = bookingSchema.safeParse({ ...valid, phone: "+91 90000 00000" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.phone).toBe("9000000000");
  });

  it("validates the optional 6-digit PIN", () => {
    expect(bookingSchema.safeParse({ ...valid, pin: "56003" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, pin: "" }).success).toBe(true); // empty select/input → treated as absent
  });

  it("refuses without consent", () => {
    expect(bookingSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("refuses empty model or unknown device type", () => {
    expect(bookingSchema.safeParse({ ...valid, model: "" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, deviceType: "Nokia" }).success).toBe(false);
  });

  it("trims the name and refuses a blank one", () => {
    const r = bookingSchema.safeParse({ ...valid, name: "  Jane Doe  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe("Jane Doe");
    expect(bookingSchema.safeParse({ ...valid, name: "   " }).success).toBe(false);
  });

  it("email is optional, but must be valid when given", () => {
    expect(bookingSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, email: "" }).success).toBe(true);
    const { email: _e, ...noEmail } = { ...valid };
    void _e;
    expect(bookingSchema.safeParse(noEmail).success).toBe(true);
  });

  it("passes the honeypot field through untouched when present", () => {
    const r = bookingSchema.safeParse({ ...valid, company: "spam co" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.company).toBe("spam co");
  });
});
