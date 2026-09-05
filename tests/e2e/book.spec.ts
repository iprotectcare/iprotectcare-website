import { expect, test } from "@playwright/test";

test.describe("Book-a-Repair form", () => {
  test("happy path: submit → success state → correct WhatsApp link", async ({ page }) => {
    await page.route("**/api/book", async (route) => {
      const body = route.request().postDataJSON();
      // client sends everything the server needs
      expect(body.startedAt).toBeGreaterThan(0);
      expect(body.sourcePage).toBe("/book");
      const msg = `*New Repair Request* — iProtectCare\n\n*Device:* ${body.model}\n*Issue:* ${body.issue}`;
      await route.fulfill({
        json: {
          ok: true,
          sheetOk: true,
          whatsappUrl: `https://wa.me/919000000000?text=${encodeURIComponent(msg)}`,
        },
      });
    });

    await page.goto("/book");
    await page.getByLabel("Device type").selectOption("iPhone");
    await page.getByLabel("Model").selectOption("iPhone 14 Pro");
    await page.getByLabel("What's wrong?").selectOption("Screen replacement");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Phone").fill("9000000000");
    await page.getByLabel("Email").fill("jane.doe@example.com");
    await page.getByLabel("I agree to be contacted about this repair.").check();
    await page.getByRole("button", { name: "Request my free diagnosis" }).click();

    await expect(page.getByText("Request received")).toBeVisible();
    const wa = page.getByRole("link", { name: "Send on WhatsApp" });
    await expect(wa).toBeVisible();
    const href = decodeURIComponent((await wa.getAttribute("href")) ?? "");
    expect(href).toContain("*Device:* iPhone 14 Pro");
    expect(href).toContain("*Issue:* Screen replacement");
  });

  test("submit disabled until consent is ticked", async ({ page }) => {
    await page.goto("/book");
    await expect(
      page.getByRole("button", { name: "Request my free diagnosis" }),
    ).toBeDisabled();
  });

  test("'Other' device turns model into free text", async ({ page }) => {
    await page.goto("/book");
    await page.getByLabel("Device type").selectOption("Other");
    const model = page.getByLabel("Model");
    await expect(model).toHaveAttribute("placeholder", "Tell us what it is");
    await model.fill("Nokia 3310");
    // generic issue list applies
    const issues = page.getByLabel("What's wrong?");
    await expect(issues.locator("option", { hasText: "Won't power on" })).toHaveCount(1);
  });

  test("failure path: 500 → error state exposes call and WhatsApp", async ({ page }) => {
    await page.route("**/api/book", (route) => route.fulfill({ status: 500, body: "boom" }));
    await page.goto("/book");
    await page.getByLabel("Device type").selectOption("iPhone");
    await page.getByLabel("Model").selectOption("iPhone 14 Pro");
    await page.getByLabel("What's wrong?").selectOption("Screen replacement");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Phone").fill("9000000000");
    await page.getByLabel("Email").fill("jane.doe@example.com");
    await page.getByLabel("I agree to be contacted about this repair.").check();
    await page.getByRole("button", { name: "Request my free diagnosis" }).click();

    await expect(page.getByText("That didn't go through")).toBeVisible();
    await expect(page.getByRole("link", { name: /Call \+91/ })).toHaveAttribute(
      "href",
      /^tel:/,
    );
    await expect(page.getByRole("link", { name: "WhatsApp us" })).toHaveAttribute(
      "href",
      /wa\.me/,
    );
  });
});
