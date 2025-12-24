// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Fixed: Added 'www' to match your actual domain usage in the report
  const baseUrl = 'https://www.okido.wiki';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',      // Keep: Internal tools
        '/admin/',        // Keep: Admin dashboard
        '/api/',          // Keep: Backend endpoints
        // REMOVED: '/_next/' -> Google needs this to render your page content (JS/CSS)
        // REMOVED: '/static/' -> Google needs this to see your images and assets
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}