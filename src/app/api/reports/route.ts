import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Report } from '@/models/Report';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { createNotification } from '@/services/notification.service';

export async function POST(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const report = await Report.create({
      reporterId: payload.userId,
      reportableType: body.type,
      reportableId: body.id,
      reason: body.reason,
      details: body.details,
    });

    // Notifier tous les admins (en production, filtrer par rôle admin)
    await createNotification({
      userId: payload.userId,
      title: 'Signalement envoyé',
      body: `Votre signalement pour ${body.reason} a été enregistré.`,
      type: 'system',
    });

    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });

    await connectDB();
    const status = new URL(req.url).searchParams.get('status') || 'new';
    const reports = await Report.find(status === 'all' ? {} : { status })
      .sort({ createdAt: -1 })
      .populate('reporterId', 'name email')
      .lean();

    return NextResponse.json({ success: true, data: reports });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
