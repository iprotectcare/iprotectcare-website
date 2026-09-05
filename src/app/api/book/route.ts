import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingSchema } from "@/lib/schema";
import { buildWaUrl, buildWhatsAppMessage } from "@/lib/whatsapp";
import { notifyLead } from "@/lib/notify";

const requestSchema = bookingSchema.and(
  z.object({ sourcePage: z.string().max(200).default("/") }),
);

const MIN_FILL_MS = 3_000;

export async function POST(request: Request): Promise<NextResponse> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _form: ["Invalid request"] } }, { status: 422 });
  }

  // Server re-validates with the shared schema — client validation is UX,
  // not a security boundary (spec §8).
  const parsed = requestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { sourcePage, ...booking } = parsed.data;
  const whatsappUrl = buildWaUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    buildWhatsAppMessage(booking),
  );

  // Bot defence (spec §8): filled honeypot or an impossibly fast fill gets a
  // convincing success and no side effects — never tell a bot it was caught.
  const isBot =
    (booking.company ?? "") !== "" || Date.now() - booking.startedAt < MIN_FILL_MS;
  if (isBot) {
    return NextResponse.json({ ok: true, sheetOk: true, whatsappUrl });
  }

  const { sheetOk } = await notifyLead(booking, sourcePage);

  // Sheet failure still returns 200: the WhatsApp handoff is the lead's
  // real path to the owner, and raw errors never surface (spec §8).
  return NextResponse.json({ ok: true, sheetOk, whatsappUrl });
}
