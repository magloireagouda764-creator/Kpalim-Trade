import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Shop } from '@/models/Shop';
import { TouristSite } from '@/models/TourismSite';
import { Restaurant } from '@/models/Restaurant';
import { Event } from '@/models/Event';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const q = new URL(req.url).searchParams.get('q')?.trim();
    if (!q || q.length < 2) {
      return NextResponse.json({ success: true, data: { products: [], shops: [], sites: [], restaurants: [], events: [] } });
    }

    const regex = { $regex: q, $options: 'i' };

    const [products, shops, sites, restaurants, events] = await Promise.all([
      Product.find({ $or: [{ name: regex }, { description: regex }], status: 'active' }).limit(12).select('name slug price images').lean(),
      Shop.find({ $or: [{ name: regex }, { description: regex }], status: 'approved' }).limit(6).select('name slug logo city').lean(),
      TouristSite.find({ $or: [{ name: regex }, { shortDescription: regex }], isActive: true }).limit(6).select('name slug images category').lean(),
      Restaurant.find({ $or: [{ name: regex }, { description: regex }], isActive: true }).limit(6).select('name slug images cuisineType').lean(),
      Event.find({ $or: [{ title: regex }, { description: regex }], status: 'published' }).limit(6).select('title slug poster startDate location').lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: { products, shops, sites, restaurants, events },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
