// lib/site-url.ts
const DEFAULT_SITE_URL = "https://initkoa.org";

export function canonicalizeSiteUrl(raw?: string | null): string {
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

export function getSiteUrl(): string {
  return canonicalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_URL ||
      DEFAULT_SITE_URL
  );
}

export function toAbsoluteUrl(pathname = "/"): string {
  const base = getSiteUrl();

  if (!pathname || pathname === "/") return base;

  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${clean}`;
}