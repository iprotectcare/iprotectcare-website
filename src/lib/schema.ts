import { z } from "zod";

/**
 * Shared client + server validation (spec §8). The client uses it for UX;
 * the API route re-validates with the same schema as the security boundary.
 */

export const deviceTypes = [
  "iPhone",
  "iPad",
  "MacBook",
  "Apple Watch",
  "Other",
] as const;

export type DeviceType = (typeof deviceTypes)[number];

/** Generic issue list used when device type is "Other" (spec §8). */
export const genericIssues = [
  "Screen",
  "Battery",
  "Water damage",
  "Charging port",
  "Won't power on",
  "Other",
] as const;

const phone = z
  .string()
  .transform((v) => v.replace(/[\s-]/g, "").replace(/^\+91/, ""))
  .pipe(
    z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number starting 6–9"),
  );

const optionalTrimmed = z
  .string()
  .trim()
  .max(1000)
  .optional()
  .transform((v) => (v === "" ? undefined : v));

export const bookingSchema = z.object({
  deviceType: z.enum(deviceTypes),
  model: z.string().trim().min(1, "Choose your model").max(100),
  issue: z.string().trim().min(1, "Choose the issue").max(100),
  notes: optionalTrimmed,
  name: z.string().trim().min(1, "Enter your name").max(100),
  phone,
  email: z.string().trim().email("Enter a valid email").max(200),
  address: optionalTrimmed,
  pin: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(z.string().regex(/^\d{6}$/, "PIN is 6 digits").optional()),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree so we can contact you" }),
  }),
  /** Honeypot — real users never see or fill this. Server discards if set. */
  company: z.string().max(200).optional(),
  /** Epoch ms when the form rendered; server checks minimum fill time. */
  startedAt: z.number().int().nonnegative(),
});

export type Booking = z.infer<typeof bookingSchema>;
