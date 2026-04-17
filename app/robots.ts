import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const DISALLOW_PATHS = ["/private", "/admin", "/api"];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOW_PATHS,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}