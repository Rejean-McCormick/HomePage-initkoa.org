// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://okido.wiki';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',      // Protect private internal tools
        '/admin/',        // Protect admin dashboard
        '/api/',          // Prevent crawling of backend API endpoints
        '/_next/',        // Ignore Next.js internal build files
        '/static/',       // Ignore static assets not meant for direct indexing
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}