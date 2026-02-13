import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: data: https:; connect-src 'self' https://www.google-analytics.com;",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  async headers() {
    return [
      // IMPORTANT: règle plus spécifique AVANT la règle globale
      {
        // couvre /inventory.root.json + /inventory.youtube.catalog.json etc.
        source: "/inventory:rest*",
        headers: [
          ...SECURITY_HEADERS,
          // Empêche la mise en cache (navigateur + CDN) des inventaires
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
        ],
      },
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
