import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Professional } from '@/models/Professional';

export async function GET() {
  try {
    await connectDB();
    const professionals = await Professional.find({ isActive: true })
      .sort({ isFeatured: -1, name: 1 })
      .lean();
    return NextResponse.json({ success: true, data: professionals });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
