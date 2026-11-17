import { NextRequest, NextResponse } from "next/server";
import registry from "@/lib/koa-connections-public.json";

const allowedHosts = new Set([
  "initkoa.org",
  "docs.initkoa.org",
  "koaliscenariomosaic.netlify.app",
  "rejean-mccormick.github.io",
]);
const destinations = new Map(registry.aliases.map((entry) => [entry.path, entry.target]));

// Resolved exclusively against a versioned local allowlist: never redirect to a user-provided URL.
export function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const key = `/go/${(params.slug || []).join("/")}`;
  const destination = destinations.get(key);
  if (!destination) return new NextResponse("Unknown kOA connection alias", { status: 404 });
  const target = destination.startsWith("/")
    ? new URL(destination, request.url)
    : new URL(destination);
  if (target.protocol !== "https:" && !destination.startsWith("/")) {
    return new NextResponse("Invalid destination", { status: 500 });
  }
  if (!destination.startsWith("/") && !allowedHosts.has(target.hostname)) {
    return new NextResponse("Destination not allowed", { status: 500 });
  }
  return NextResponse.redirect(target, 307);
}
