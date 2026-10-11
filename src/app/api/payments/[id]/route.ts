import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/models/Payment';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getTokenFromCookie().headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const payment = await Payment.findById(id).populate('orderId', 'reference total').lean();

    if (!payment) return NextResponse.json({ success: false, error: 'Paiement introuvable' }, { status: 404 });
    if (payload.role !== 'admin' && payment.userId.toString() !== payload.userId) {
      return NextResponse.json({ success: false, error: 'Accès refusé' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: payment });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
