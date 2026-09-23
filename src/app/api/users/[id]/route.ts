import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { logAdminAction } from '@/services/audit.service';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const user = await User.findByIdAndUpdate(id, body, { new: true }).select('-password');
    if (!user) return NextResponse.json({ success: false, error: 'Utilisateur introuvable' }, { status: 404 });

    await logAdminAction({ adminId: payload.userId, action: 'update_user', modelType: 'User', modelId: id, changes: body });

    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });

    await connectDB();
    const { id } = await params;
    await User.findByIdAndDelete(id);

    await logAdminAction({ adminId: payload.userId, action: 'delete_user', modelType: 'User', modelId: id });

    return NextResponse.json({ success: true, message: 'Utilisateur supprimé' });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
