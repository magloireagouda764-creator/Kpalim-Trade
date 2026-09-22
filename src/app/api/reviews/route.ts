import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Review } from '@/models/Review';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    if (!type || !id) return NextResponse.json({ success: false, error: 'Paramètres manquants' }, { status: 400 });

    const reviews = await Review.find({ reviewableType: type, reviewableId: id, status: 'visible' })
      .sort({ createdAt: -1 }).populate('userId', 'name avatar').lean();
    return NextResponse.json({ success: true, data: reviews });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json({ success: false, error: 'Note entre 1 et 5 requise' }, { status: 400 });
    }

    const existing = await Review.findOne({ userId: payload.userId, reviewableType: body.type, reviewableId: body.id });
    if (existing) return NextResponse.json({ success: false, error: 'Vous avez déjà laissé un avis' }, { status: 409 });

    const review = await Review.create({
      userId: payload.userId,
      reviewableType: body.type,
      reviewableId: body.id,
      rating: body.rating,
      comment: body.comment?.trim(),
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
