import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Security Headers to fix CSV report errors and harden security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevents clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevents MIME type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Privacy control
          },
          {
            key: 'Content-Security-Policy',
            // Basic CSP: Allows scripts/styles from self and Google Fonts/Analytics. 
            // Added 'unsafe-inline' for styles which is often needed for CSS-in-JS libraries or Tailwind.
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: data: https:; connect-src 'self' https://www.google-analytics.com;",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // By default, only .mdx files are compiled. 
  // We keep this to ensure explicit handling.
  extension: /\.mdx?$/, 
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug, // Adds IDs to headings (required for autolink)
      [rehypeAutolinkHeadings, { behavior: "wrap" }], // Wraps the heading text in a link
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }], // Opens external links in new tab
    ],
  },
});

// Wrap the Next.js config with the MDX configuration
export default withMDX(nextConfig);