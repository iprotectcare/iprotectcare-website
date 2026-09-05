import { describe, expect, it } from "vitest";
import { devices } from "@/content/devices";
import { business } from "@/content/business";

/**
 * Launch-readiness gate (spec §12): enabled with LAUNCH_CHECK=1.
 * Skipped by default so TODO markers don't fail every dev build,
 * but the launch checklist runs `LAUNCH_CHECK=1 npx vitest run` and
 * must be green before go-live.
 */
describe.skipIf(!process.env.LAUNCH_CHECK)("launch readiness", () => {
  it("no TODO markers remain anywhere in content", () => {
    const blob = JSON.stringify({ devices, business });
    const hits = blob.match(/TODO[^"]*/g) ?? [];
    expect(hits, `unresolved: ${hits.join(" | ")}`).toHaveLength(0);
  });
});
