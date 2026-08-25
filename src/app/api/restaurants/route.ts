import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Restaurant } from '@/models/Restaurant';

export async function GET() {
  try {
    await connectDB();
    const restaurants = await Restaurant.find({ isActive: true }).sort({ isFeatured: -1, name: 1 }).lean();
    return NextResponse.json({ success: true, data: restaurants });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
