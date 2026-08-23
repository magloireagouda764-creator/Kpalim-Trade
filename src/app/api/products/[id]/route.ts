import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id)
      .populate('shopId', 'name slug logo phone whatsapp')
      .populate('categoryId', 'name slug');

    if (!product) return NextResponse.json({ success: false, error: 'Produit introuvable' }, { status: 404 });

    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload || (payload.role !== 'vendor' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!product) return NextResponse.json({ success: false, error: 'Produit introuvable' }, { status: 404 });

    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload || (payload.role !== 'vendor' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Produit supprimé' });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
