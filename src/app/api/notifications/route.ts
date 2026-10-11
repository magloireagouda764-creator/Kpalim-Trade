import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { getUserNotifications, getUnreadCount } from '@/services/notification.service';

export async function GET(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });

    const [notifications, unreadCount] = await Promise.all([
      getUserNotifications(payload.userId),
      getUnreadCount(payload.userId),
    ]);

    return NextResponse.json({ success: true, data: notifications, unreadCount });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
