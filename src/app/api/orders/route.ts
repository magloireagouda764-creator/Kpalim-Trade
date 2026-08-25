import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { createNotification } from '@/services/notification.service';

function generateReference(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KPT-${date}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    // Vérifier stock et récupérer prix actuel
    let subtotal = 0;
    const orderItems = [];
    for (const item of body.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.status !== 'active') {
        return NextResponse.json({ success: false, error: `Produit indisponible: ${item.name}` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ success: false, error: `Stock insuffisant pour ${product.name}` }, { status: 400 });
      }
      const price = product.discountPrice || product.price;
      subtotal += price * item.quantity;
      orderItems.push({
        productId: product._id,
        shopId: product.shopId,
        name: product.name,
        price,
        quantity: item.quantity,
        image: product.images[0]?.secure_url,
      });
    }

    const deliveryFee = body.deliveryFee || 0;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      userId: payload.userId,
      reference: generateReference(),
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: body.paymentMethod || 'cod',
      deliveryAddress: body.deliveryAddress,
      city: body.city || 'Kpalimé',
      district: body.district,
      phone: body.phone,
      note: body.note,
    });

    // Décrémenter le stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity, soldCount: item.quantity } });
    }

    // Notification client
    await createNotification({
      userId: payload.userId,
      title: 'Commande confirmée ✅',
      body: `Votre commande ${order.reference} a été enregistrée avec succès.`,
      type: 'order',
      link: `/orders/${order._id}`,
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string, unknown> = {};

    if (payload.role === 'admin') {
      const status = searchParams.get('status');
      if (status) filter.status = status;
    } else {
      filter.userId = payload.userId;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: orders });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
