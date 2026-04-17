import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' blob: data: https:",
      "connect-src 'self' https://www.google-analytics.com",
    ].join("; "),
  },
];

const STATIC_DISCOVERY_CACHE_HEADERS = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  },
  { key: "Access-Control-Allow-Origin", value: "*" },
];

/**
 * HTML canonicals stay indexable by default.
 * Non-HTML discovery surfaces are split into:
 * - indexable AI entrypoint: llms.txt
 * - noindex auxiliary artifacts and mirrors
 */
const INDEXABLE_DISCOVERY_ROBOTS_HEADERS = [
  {
    key: "X-Robots-Tag",
    value: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
];

const NOINDEX_DISCOVERY_ROBOTS_HEADERS = [
  { key: "X-Robots-Tag", value: "noindex, follow, noarchive" },
];

const ROBOTS_TXT_HEADERS = [
  ...STATIC_DISCOVERY_CACHE_HEADERS,
  ...NOINDEX_DISCOVERY_ROBOTS_HEADERS,
  { key: "Content-Type", value: "text/plain; charset=utf-8" },
];

const INDEXABLE_PLAIN_TEXT_HEADERS = [
  ...STATIC_DISCOVERY_CACHE_HEADERS,
  ...INDEXABLE_DISCOVERY_ROBOTS_HEADERS,
  { key: "Content-Type", value: "text/plain; charset=utf-8" },
];

const NOINDEX_PLAIN_TEXT_HEADERS = [
  ...STATIC_DISCOVERY_CACHE_HEADERS,
  ...NOINDEX_DISCOVERY_ROBOTS_HEADERS,
  { key: "Content-Type", value: "text/plain; charset=utf-8" },
];

const JSON_HEADERS = [
  ...STATIC_DISCOVERY_CACHE_HEADERS,
  ...NOINDEX_DISCOVERY_ROBOTS_HEADERS,
  { key: "Content-Type", value: "application/json; charset=utf-8" },
];

const XML_HEADERS = [
  ...STATIC_DISCOVERY_CACHE_HEADERS,
  ...NOINDEX_DISCOVERY_ROBOTS_HEADERS,
  { key: "Content-Type", value: "application/xml; charset=utf-8" },
];

const MARKDOWN_HEADERS = [
  ...STATIC_DISCOVERY_CACHE_HEADERS,
  ...NOINDEX_DISCOVERY_ROBOTS_HEADERS,
  { key: "Content-Type", value: "text/markdown; charset=utf-8" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      // Inventory: always fresh, never cached
      {
        source: "/inventory/:rest*",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, follow, noarchive" },
        ],
      },
      {
        source: "/inventory",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, follow, noarchive" },
        ],
      },

      // Core discovery endpoints
      {
        source: "/robots.txt",
        headers: [...SECURITY_HEADERS, ...ROBOTS_TXT_HEADERS],
      },
      {
        source: "/sitemap.xml",
        headers: [...SECURITY_HEADERS, ...XML_HEADERS],
      },
      {
        source: "/md-sitemap.xml",
        headers: [...SECURITY_HEADERS, ...XML_HEADERS],
      },

      // Curated AI entrypoint: indexable
      {
        source: "/llms.txt",
        headers: [...SECURITY_HEADERS, ...INDEXABLE_PLAIN_TEXT_HEADERS],
      },

      // Auxiliary AI artifacts: crawlable/fetchable but not canonical in search
      {
        source: "/llms-full.txt",
        headers: [...SECURITY_HEADERS, ...NOINDEX_PLAIN_TEXT_HEADERS],
      },
      {
        source: "/ai-corpus.txt",
        headers: [...SECURITY_HEADERS, ...NOINDEX_PLAIN_TEXT_HEADERS],
      },
      {
        source: "/ai-sitemap.json",
        headers: [...SECURITY_HEADERS, ...JSON_HEADERS],
      },
      {
        source: "/md-manifest.json",
        headers: [...SECURITY_HEADERS, ...JSON_HEADERS],
      },

      // Generated markdown mirrors in /public: fetchable but non-canonical
      {
        source: "/:path*.md",
        headers: [...SECURITY_HEADERS, ...MARKDOWN_HEADERS],
      },

      // Default site-wide headers for HTML/app routes
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
    ],
  },
});

export default withMDX(nextConfig);