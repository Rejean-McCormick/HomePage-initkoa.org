import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://okido.wiki';

  return [
    // --- 1. ROOT & LANDING ---
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/why`, // The Diagnosis
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`, // The Architect
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/principles`, // Radical Lucidity, etc.
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // --- 2. STRATEGIC INITIATIVES HUB ---
    {
      url: `${baseUrl}/initiatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance`, // The Dashboard
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // --- 3. THE KERNEL (CONSTITUTION) ---
    {
      url: `${baseUrl}/initiatives/civic-governance/constitution`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance/constitution/ekoh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance/constitution/orgo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance/constitution/rights`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // --- 4. ACTIVE MODULES ---
    // Education
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/education`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Economy
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/economy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Justice (Hub & Deep Dives)
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/justice`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/justice/ai-model`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/justice/efficiency`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/justice/access`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // International
    {
      url: `${baseUrl}/initiatives/civic-governance/modules/international`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // --- 5. THEORY & ROADMAP ---
    {
      url: `${baseUrl}/initiatives/pi-theory`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // --- 6. TECHNOLOGY STACK ---
    {
      url: `${baseUrl}/platforms`, // Konnaxion, Ethikos, etc.
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}