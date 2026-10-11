import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { markAsRead } from '@/services/notification.service';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });

    const { id } = await params;
    await markAsRead(id, payload.userId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
