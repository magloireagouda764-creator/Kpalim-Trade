import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    if (!token) return NextResponse.json({ user: null });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ user: null });

    await connectDB();
    const user = await User.findById(payload.userId).select('-password');
    if (!user || !user.isActive) return NextResponse.json({ user: null });

    return NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
