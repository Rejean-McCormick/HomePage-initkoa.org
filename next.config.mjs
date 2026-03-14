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

const AI_DISCOVERY_HEADERS = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  },
  {
    key: "X-Robots-Tag",
    value: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
  { key: "Access-Control-Allow-Origin", value: "*" },
];

const PLAIN_TEXT_HEADERS = [
  ...AI_DISCOVERY_HEADERS,
  { key: "Content-Type", value: "text/plain; charset=utf-8" },
];

const JSON_HEADERS = [
  ...AI_DISCOVERY_HEADERS,
  { key: "Content-Type", value: "application/json; charset=utf-8" },
];

const XML_HEADERS = [
  ...AI_DISCOVERY_HEADERS,
  { key: "Content-Type", value: "application/xml; charset=utf-8" },
];

const MARKDOWN_HEADERS = [
  ...AI_DISCOVERY_HEADERS,
  { key: "Content-Type", value: "text/markdown; charset=utf-8" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      {
        source: "/technology/ariane/concepts/Glossary",
        destination: "/technology/ariane/concepts/glossary",
        permanent: true,
      },
      {
        source: "/technology/ariane/concepts/Glossary/:path*",
        destination: "/technology/ariane/concepts/glossary/:path*",
        permanent: true,
      },
      {
        source: "/platforms/konnaxion/keen-konnect/:path*",
        destination: "/platforms/konnaxion/keenkonnect/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // Inventory: always fresh
      {
        source: "/inventory:rest*",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
        ],
      },

      // Core AI discovery files
      {
        source: "/llms.txt",
        headers: [...SECURITY_HEADERS, ...PLAIN_TEXT_HEADERS],
      },
      {
        source: "/llms-full.txt",
        headers: [...SECURITY_HEADERS, ...PLAIN_TEXT_HEADERS],
      },
      {
        source: "/ai-corpus.txt",
        headers: [...SECURITY_HEADERS, ...PLAIN_TEXT_HEADERS],
      },
      {
        source: "/ai-sitemap.json",
        headers: [...SECURITY_HEADERS, ...JSON_HEADERS],
      },
      {
        source: "/md-manifest.json",
        headers: [...SECURITY_HEADERS, ...JSON_HEADERS],
      },
      {
        source: "/md-sitemap.xml",
        headers: [...SECURITY_HEADERS, ...XML_HEADERS],
      },

      // Markdown mirrors generated into /public
      {
        source: "/:path*.md",
        headers: [...SECURITY_HEADERS, ...MARKDOWN_HEADERS],
      },
      {
        source: "/index.html.md",
        headers: [...SECURITY_HEADERS, ...MARKDOWN_HEADERS],
      },

      // Default site-wide headers
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