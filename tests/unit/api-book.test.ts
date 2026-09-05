import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.stubEnv("SHEETS_WEBHOOK_URL", "https://script.example.com/exec");
vi.stubEnv("SHEETS_SHARED_SECRET", "test-secret");
vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "919000000000");

import { POST } from "@/app/api/book/route";

const now = 1_757_060_000_000;

const validBody = {
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
  company: "",
  startedAt: now - 30_000, // filled 30s ago — human
  sourcePage: "/iphone-repair",
};

function req(body: unknown) {
  return new Request("http://localhost/api/book", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers({ now });
  fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("POST /api/book", () => {
  it("happy path: writes the sheet once and returns a WhatsApp URL", async () => {
    const res = await POST(req(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.sheetOk).toBe(true);
    expect(json.whatsappUrl).toContain("https://wa.me/919000000000?text=");
    expect(decodeURIComponent(json.whatsappUrl)).toContain("*Name:* Jane Doe");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://script.example.com/exec");
    const payload = JSON.parse(init.body);
    expect(payload.secret).toBe("test-secret");
    expect(payload.model).toBe("iPhone 14 Pro");
    expect(payload.sourcePage).toBe("/iphone-repair");
  });

  it("invalid body → 422 with field errors, no sheet write", async () => {
    const res = await POST(req({ ...validBody, phone: "12345" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.errors).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("filled honeypot → silent 200, nothing written", async () => {
    const res = await POST(req({ ...validBody, company: "Best SEO Agency" }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sub-3-second fill time → silent 200, nothing written", async () => {
    const res = await POST(req({ ...validBody, startedAt: now - 1000 }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sheet write fails → still 200 with the WhatsApp URL, sheetOk false", async () => {
    fetchMock.mockResolvedValue(new Response("boom", { status: 500 }));
    const res = await POST(req(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.sheetOk).toBe(false);
    expect(json.whatsappUrl).toContain("wa.me");
    // raw error text never leaks
    expect(JSON.stringify(json)).not.toContain("boom");
  });

  it("sheet endpoint hangs → aborted at 8s, still 200", async () => {
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError")),
          );
        }),
    );
    const pending = POST(req(validBody));
    await vi.advanceTimersByTimeAsync(8_100);
    const res = await pending;
    expect(res.status).toBe(200);
    expect((await res.json()).sheetOk).toBe(false);
  });
});
