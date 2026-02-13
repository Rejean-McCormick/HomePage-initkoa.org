// app/robots.ts
import type { MetadataRoute } from "next";

export const runtime = "nodejs";

// Use ONE canonical base URL (match sitemap.ts / canonical tags)
function getBaseUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  const inferred = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  return (explicit || inferred || "http://localhost:3000").replace(/\/+$/, "");
}

function getHost(baseUrl: string): string {
  try {
    return new URL(baseUrl).host;
  } catch {
    return baseUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  const host = getHost(baseUrl);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private", "/admin", "/api"],
      },
    ],
    // Only list the real XML sitemap(s) here
    sitemap: [`${baseUrl}/sitemap.xml`],
    host,
  };
}
