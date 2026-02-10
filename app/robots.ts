import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  return (env || "http://localhost:3000").replace(/\/+$/, "");
}

function getHost(baseUrl: string): string {
  try {
    return new URL(baseUrl).host; // ex: "example.com"
  } catch {
    // fallback: enlève protocole + path
    return baseUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  const host = getHost(baseUrl);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/", // Internal tools
        "/admin/", // Admin dashboard
        "/api/", // Backend endpoints
      ],
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/ai-sitemap.json`],
    host,
  };
}
