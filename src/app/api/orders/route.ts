import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    // Vérification des produits
    for (const item of body.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.status !== 'active') {
        return NextResponse.json({ success: false, error: `Produit indisponible: ${item.name}` }, { status: 400 });
      }
      // ✅ CORRECTION ICI : (product.stock || 0)
      if ((product.stock || 0) < item.quantity) {
        return NextResponse.json({ success: false, error: `Stock insuffisant pour ${product.name}` }, { status: 400 });
      }
    }

    const order = await Order.create({
      ...body,
      buyerId: payload.userId,
      buyerName: payload.name,
      status: 'pending',
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}