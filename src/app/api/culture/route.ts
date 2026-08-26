import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { CulturalArticle } from '@/models/CulturalArticle';

export async function GET() {
  try {
    await connectDB();
    const articles = await CulturalArticle.find({ isActive: true })
      .sort({ isFeatured: -1, publishedAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: articles });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
