// app/robots.ts
import type { MetadataRoute } from "next";

export const runtime = "nodejs";

const DEFAULT_SITE_URL = "https://initkoa.org";

function canonicalizeBaseUrl(raw?: string | null): string {
  let s = String(raw || "").trim();

  if (!s) return DEFAULT_SITE_URL;

  if (!/^https?:\/\//i.test(s)) {
    s = `https://${s}`;
  }

  s = s.replace(/\/+$/, "");

  try {
    const u = new URL(s);

    if (u.hostname === "www.initkoa.org") {
      u.hostname = "initkoa.org";
    }

    u.protocol = "https:";

    return u.toString().replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function getBaseUrl(): string {
  return canonicalizeBaseUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_URL ||
      DEFAULT_SITE_URL
  );
}

function getHost(baseUrl: string): string {
  try {
    return new URL(baseUrl).host;
  } catch {
    return "initkoa.org";
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
    sitemap: `${baseUrl}/sitemap.xml`,
    host,
  };
}