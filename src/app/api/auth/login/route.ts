import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyPassword, createToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: parsed.data.email }).select('+password');
    if (!user || !user.isActive) {
      return NextResponse.json({ success: false, error: 'Identifiants incorrects' }, { status: 401 });
    }

    const valid = await verifyPassword(parsed.data.password, user.password);
    if (!valid) {
      return NextResponse.json({ success: false, error: 'Identifiants incorrects' }, { status: 401 });
    }

    const token = await createToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });

    response.cookies.set('kpalime_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 3600,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
