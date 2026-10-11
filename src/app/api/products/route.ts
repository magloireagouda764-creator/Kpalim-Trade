import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(50, Number(searchParams.get('limit')) || ITEMS_PER_PAGE);
    const category = searchParams.get('category');
    const shop = searchParams.get('shop');
    const search = searchParams.get('q');
    const featured = searchParams.get('featured');

    const filter: Record<string, unknown> = { status: 'active' };
    if (category) filter.categoryId = category;
    if (shop) filter.shopId = shop;
    if (featured === 'true') filter.isFeatured = true;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ isFeatured: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('shopId', 'name slug logo')
        .populate('categoryId', 'name slug'),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || (payload.role !== 'vendor' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const product = await Product.create({ ...body, shopId: body.shopId });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
