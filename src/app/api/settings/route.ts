import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Setting } from '@/models/Setting';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.find().lean();
    const settingsMap = settings.reduce((acc, s) => { acc[s.key] = s.value; return acc; }, {} as Record<string, string>);
    return NextResponse.json({ success: true, data: settingsMap });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });

    await connectDB();
    const body = await req.json();

    for (const [key, value] of Object.entries(body)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value: String(value), group: 'general' },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true, message: 'Paramètres mis à jour' });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
