// app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

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

function getHost(baseUrl: string): string {
  try {
    return new URL(baseUrl).host;
  } catch {
    return "initkoa.org";
  }
}

function allowRule(userAgent: string): MetadataRoute.Robots["rules"][number] {
  return {
    userAgent,
    allow: "/",
    disallow: [...DISALLOW_PATHS],
  };
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  const host = getHost(baseUrl);

  return {
    rules: [
      ...EXPLICIT_ALLOW_BOTS.map((bot) => allowRule(bot)),
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOW_PATHS],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/md-sitemap.xml`],
    host,
  };
}