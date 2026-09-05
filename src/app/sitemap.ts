import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { devices } from "@/content/devices";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/book", "/about", "/faq", "/contact"];
  return [
    ...staticRoutes.map((path) => ({
      url: `${business.domain}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...devices.map((d) => ({
      url: `${business.domain}/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
