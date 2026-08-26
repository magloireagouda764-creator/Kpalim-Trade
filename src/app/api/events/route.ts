import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Event } from '@/models/Event';

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({ status: 'published', startDate: { $gte: new Date(Date.now() - 24 * 3600 * 1000) } })
      .sort({ isFeatured: -1, startDate: 1 })
      .lean();
    return NextResponse.json({ success: true, data: events });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
