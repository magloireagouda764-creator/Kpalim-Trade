import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    else filter.status = 'approved';

    const shops = await Shop.find(filter).sort({ isFeatured: -1, createdAt: -1 }).populate('ownerId', 'name email');
    return NextResponse.json({ success: true, data: shops });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'vendor') {
      return NextResponse.json({ success: false, error: 'Réservé aux vendeurs' }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const existing = await Shop.findOne({ ownerId: payload.userId });
    if (existing) return NextResponse.json({ success: false, error: 'Vous avez déjà une boutique' }, { status: 409 });

    const shop = await Shop.create({ ...body, ownerId: payload.userId });
    return NextResponse.json({ success: true, data: shop }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
