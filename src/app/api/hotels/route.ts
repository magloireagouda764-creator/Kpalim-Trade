import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';

export async function GET() {
  try {
    await connectDB();
    const hotels = await Accommodation.find({ isActive: true }).sort({ isFeatured: -1, name: 1 }).lean();
    return NextResponse.json({ success: true, data: hotels });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
