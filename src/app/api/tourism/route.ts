import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { TourismSite } from '@/models/TourismSite';

export async function GET() {
  try {
    await connectDB();
    const sites = await TourismSite.find({ isActive: true }).sort({ isFeatured: -1, name: 1 }).lean();
    return NextResponse.json({ success: true, data: sites });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}