// app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const DISALLOW_PATHS = ["/private", "/admin", "/api"];

const EXPLICIT_ALLOW_BOTS = [
  "Googlebot",
  "Google-Extended",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
];

type RobotsRule = {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
};

function getHost(baseUrl: string): string {
  try {
    return new URL(baseUrl).host;
  } catch {
    return "initkoa.org";
  }
}

function allowRule(userAgent: string): RobotsRule {
  return {
    userAgent,
    allow: "/",
    disallow: DISALLOW_PATHS,
  };
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  const host = getHost(baseUrl);

  return {
    rules: [
      ...EXPLICIT_ALLOW_BOTS.map(allowRule),
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/md-sitemap.xml`],
    host,
  };
}