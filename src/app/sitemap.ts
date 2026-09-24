import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Shop } from '@/models/Shop';
import { TouristSite } from '@/models/TouristSite';
import { Restaurant } from '@/models/Restaurant';
import { Event } from '@/models/Event';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kpalime-trad.vercel.app';

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tourism`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/hotels`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/restaurants`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/culture`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    await connectDB();

    const [products, shops, sites, restaurants, events] = await Promise.all([
      Product.find({ status: 'active' }).select('slug updatedAt').lean(),
      Shop.find({ status: 'approved' }).select('slug updatedAt').lean(),
      TouristSite.find({ isActive: true }).select('slug updatedAt').lean(),
      Restaurant.find({ isActive: true }).select('slug updatedAt').lean(),
      Event.find({ status: 'published' }).select('slug updatedAt').lean(),
    ]);

    const dynamicPages: MetadataRoute.Sitemap = [
      ...products.map((p) => ({ url: `${baseUrl}/marketplace/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
      ...shops.map((s) => ({ url: `${baseUrl}/shops/${s.slug}`, lastModified: s.updatedAt, changeFrequency: 'weekly' as const, priority: 0.6 })),
      ...sites.map((s) => ({ url: `${baseUrl}/tourism/${s.slug}`, lastModified: s.updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 })),
      ...restaurants.map((r) => ({ url: `${baseUrl}/restaurants/${r.slug}`, lastModified: r.updatedAt, changeFrequency: 'weekly' as const, priority: 0.6 })),
      ...events.map((e) => ({ url: `${baseUrl}/events/${e.slug}`, lastModified: e.updatedAt, changeFrequency: 'daily' as const, priority: 0.7 })),
    ];

    return [...staticPages, ...dynamicPages];
  } catch {
    return staticPages;
  }
}
