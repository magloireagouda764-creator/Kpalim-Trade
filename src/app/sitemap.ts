import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Shop } from '@/models/Shop';
import { TouristSite } from '@/models/TourismSite';
import { Restaurant } from '@/models/Restaurant';
import { Event } from '@/models/Event';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kpalime-trad.vercel.app';
  const now = new Date();

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/marketplace`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tourism`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/hotels`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/restaurants`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/culture`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    await connectDB();

    const [productsData, shopsData, sitesData, restaurantsData, eventsData] = await Promise.all([
      Product.find({ status: 'active' }).select('slug updatedAt').lean(),
      Shop.find({ status: 'approved' }).select('slug updatedAt').lean(),
      TouristSite.find({ isActive: true }).select('slug updatedAt').lean(),
      Restaurant.find({ isActive: true }).select('slug updatedAt').lean(),
      Event.find({ status: 'published' }).select('slug updatedAt').lean(),
    ]);

    const products = productsData as any[];
    const shops = shopsData as any[];
    const sites = sitesData as any[];
    const restaurants = restaurantsData as any[];
    const events = eventsData as any[];

    const dynamicPages: MetadataRoute.Sitemap = [
      ...products.map((p: any) => ({
        url: `${baseUrl}/marketplace/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...shops.map((s: any) => ({
        url: `${baseUrl}/shops/${s.slug}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...sites.map((s: any) => ({
        url: `${baseUrl}/tourism/${s.slug}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...restaurants.map((r: any) => ({
        url: `${baseUrl}/restaurants/${r.slug}`,
        lastModified: r.updatedAt ? new Date(r.updatedAt) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...events.map((e: any) => ({
        url: `${baseUrl}/events/${e.slug}`,
        lastModified: e.updatedAt ? new Date(e.updatedAt) : now,
        changeFrequency: 'daily' as const,
        priority: 0.7,
      })),
    ];

    return [...staticPages, ...dynamicPages];
  } catch {
    return staticPages;
  }
}