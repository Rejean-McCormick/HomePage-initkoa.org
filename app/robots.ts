import type { MetadataRoute } from "next";

function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  // Fallback local/dev
  const url = (env || "http://localhost:3000").replace(/\/+$/, "");
  return url;
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/", // Internal tools
        "/admin/", // Admin dashboard
        "/api/", // Backend endpoints (AI agents read static files instead)
      ],
    },
    // Déclare le sitemap classique ET le sitemap IA
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/ai-sitemap.json`],
    host: baseUrl,
  };
}
