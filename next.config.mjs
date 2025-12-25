import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include MD/MDX as routable pages in the App Router
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Fix your case-sensitive route mismatch so clicks + client routing never 404
  async redirects() {
    return [
      {
        source: "/platforms/konnaxion/kollective-intelligence/:path*",
        destination: "/platforms/konnaxion/Kollective-Intelligence/:path*",
        permanent: true,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "font-src 'self' https://fonts.gstatic.com; " +
              "img-src 'self' blob: data: https:; " +
              "connect-src 'self' https://www.google-analytics.com;",
          },
        ],
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
