// app/robots.ts
import type { MetadataRoute } from "next";

export const runtime = "nodejs";

const DEFAULT_SITE_URL = "https://initkoa.org";
const DISALLOW_PATHS = ["/private", "/admin", "/api"] as const;

// Bots explicitement autorisés pour maximiser la découvrabilité IA + search.
// Le groupe "*" reste ouvert pour tous les autres crawlers respectueux.
const EXPLICIT_ALLOW_BOTS = [
  "Googlebot",
  "Google-Extended",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
] as const;

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

  const allowRule = (userAgent: string) => ({
    userAgent,
    allow: "/",
    disallow: DISALLOW_PATHS,
  });

  return {
    rules: [
      ...EXPLICIT_ALLOW_BOTS.map(allowRule),
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host,
  };
}