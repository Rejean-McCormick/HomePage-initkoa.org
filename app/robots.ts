import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.okido.wiki';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',      // Internal tools
        '/admin/',        // Admin dashboard
        '/api/',          // Backend endpoints (AI agents read static files instead)
      ],
    },
    // On déclare le sitemap classique ET le sitemap IA
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/ai-sitemap.json`
    ],
    host: baseUrl,
  };
}