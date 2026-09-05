import { expect, test } from "@playwright/test";

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile project only");

  test("bottom action bar pins Call · WhatsApp · Book", async ({ page }) => {
    await page.goto("/");
    const bar = page.getByRole("navigation", { name: "Quick actions" });
    await expect(bar).toBeVisible();
    await expect(bar.getByRole("link", { name: "Call" })).toHaveAttribute("href", /^tel:/);
    await expect(bar.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", /wa\.me/);
    await expect(bar.getByRole("link", { name: "Book" })).toHaveAttribute("href", "/book");
  });

  test("hamburger opens the sheet and navigates to a device page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "iPhone Repair" }).click();
    await expect(page).toHaveURL(/\/iphone-repair$/);
    await expect(
      page.getByRole("heading", { name: "iPhone repair in Koramangala" }),
    ).toBeVisible();
  });
});
