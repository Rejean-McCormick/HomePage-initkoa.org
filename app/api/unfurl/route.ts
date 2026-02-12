// C:\MyCode\OkidoWiki\HomePage\app\api\unfurl\route.ts
import { NextResponse } from 'next/server';
import dns from 'node:dns/promises';
import net from 'node:net';

export const runtime = 'nodejs';

type UnfurlResponse = {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
};

function pickMeta(html: string, key: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    'i'
  );
  return html.match(re)?.[1]?.trim() ?? null;
}

function pickTitleTag(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m?.[1]?.trim() ?? null;
}

function isPrivateIp(ip: string): boolean {
  if (!net.isIP(ip)) return false;
  // IPv4 private ranges
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map((x) => Number(x));
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }
  // IPv6: loopback, link-local, unique local
  const v = ip.toLowerCase();
  if (v === '::1') return true;
  if (v.startsWith('fe80:')) return true; // link-local
  if (v.startsWith('fc') || v.startsWith('fd')) return true; // ULA
  return false;
}

async function blockPrivateHosts(hostname: string) {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local')) return true;

  // If hostname is already an IP
  if (net.isIP(hostname) && isPrivateIp(hostname)) return true;

  // Resolve DNS and block if any resolved IP is private
  try {
    const res = await dns.lookup(hostname, { all: true });
    return res.some((r) => isPrivateIp(r.address));
  } catch {
    // If DNS fails, treat as blocked to be safe
    return true;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('url');
  if (!raw) return NextResponse.json({ error: 'missing url' }, { status: 400 });

  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return NextResponse.json({ error: 'bad url' }, { status: 400 });
  }

  if (!['http:', 'https:'].includes(u.protocol)) {
    return NextResponse.json({ error: 'bad protocol' }, { status: 400 });
  }

  if (await blockPrivateHosts(u.hostname)) {
    return NextResponse.json({ error: 'blocked host' }, { status: 400 });
  }

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 8000);

  try {
    const r = await fetch(u.toString(), {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (LinkPreviewBot)',
        accept: 'text/html,application/xhtml+xml',
      },
      cache: 'no-store',
    });

    const contentType = r.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('text/html')) {
      return NextResponse.json({ error: 'not html' }, { status: 415 });
    }

    const html = await r.text();

    const title =
      pickMeta(html, 'og:title') ??
      pickMeta(html, 'twitter:title') ??
      pickTitleTag(html);

    const description =
      pickMeta(html, 'og:description') ??
      pickMeta(html, 'twitter:description') ??
      pickMeta(html, 'description');

    let image =
      pickMeta(html, 'og:image') ??
      pickMeta(html, 'og:image:url') ??
      pickMeta(html, 'twitter:image');

    if (image) {
      try {
        image = new URL(image, u.toString()).toString();
      } catch {
        // ignore
      }
    }

    const siteName = pickMeta(html, 'og:site_name');

    const out: UnfurlResponse = {
      url: u.toString(),
      title: title ?? null,
      description: description ?? null,
      image: image ?? null,
      siteName: siteName ?? null,
    };

    return NextResponse.json(out, {
      headers: {
        // cache côté client/edge si tu veux (ajuste selon tes besoins)
        'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    const name = (e as { name?: string })?.name;
    return NextResponse.json({ error: name === 'AbortError' ? 'timeout' : 'fetch failed' }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
