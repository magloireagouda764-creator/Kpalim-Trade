import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    
    // ✅ CORRECTION 1 : On populate buyerId et sellerId au lieu de userId
    const order = await Order.findById(id)
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .lean();

    if (!order) return NextResponse.json({ success: false, error: 'Commande introuvable' }, { status: 404 });
    
    // ✅ CORRECTION 2 : On vérifie si l'utilisateur est l'acheteur OU le vendeur
    // (On gère le cas où buyerId/sellerId est un objet peuplé ou juste un ID)
    const buyerIdStr = typeof order.buyerId === 'object' ? (order.buyerId as any)._id.toString() : String(order.buyerId);
    const sellerIdStr = typeof order.sellerId === 'object' ? (order.sellerId as any)._id.toString() : String(order.sellerId);

    if (payload.role !== 'admin' && buyerIdStr !== payload.userId && sellerIdStr !== payload.userId) {
      return NextResponse.json({ success: false, error: 'Accès refusé' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const update: Record<string, unknown> = {};
    
    if (body.status) update.status = body.status;
    if (body.paymentStatus) update.paymentStatus = body.paymentStatus;
    if (body.status === 'delivered') update.deliveredAt = new Date();

    const order = await Order.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!order) return NextResponse.json({ success: false, error: 'Commande introuvable' }, { status: 404 });

    return NextResponse.json({ success: true, data: order });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}