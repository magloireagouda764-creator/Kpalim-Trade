import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const filter = role ? { role } : {};

    const users = await User.find(filter).sort({ createdAt: -1 }).select('-password').lean();
    return NextResponse.json({ success: true, data: users });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
