import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const DISALLOW_PATHS = ["/private", "/admin", "/api"];

function getHost(baseUrl: string): string {
  try {
    return new URL(baseUrl).host;
  } catch {
    return "initkoa.org";
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  const host = getHost(baseUrl);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOW_PATHS,
    },
    sitemap: [`${baseUrl}/sitemap.xml`],
    host,
  };
}