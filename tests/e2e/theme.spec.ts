import { expect, test } from "@playwright/test";

test.describe("theme", () => {
  test("toggle persists across reload with no flash", async ({ page }) => {
    await page.goto("/");
    const initial = await page.evaluate(() => document.documentElement.dataset.theme);
    await page.getByRole("button", { name: /Switch to (dark|light) theme/ }).click();
    const flipped = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(flipped).not.toBe(initial);

    await page.reload();
    // the blocking head script must have applied the persisted theme
    // before any React hydration
    const afterReload = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(afterReload).toBe(flipped);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(flipped);
  });

  test("reduced motion still renders all content", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Your Apple device, fixed right." })).toBeVisible();
    await expect(page.getByText("Six promises, kept from day one")).toBeVisible();
    await context.close();
  });
});
