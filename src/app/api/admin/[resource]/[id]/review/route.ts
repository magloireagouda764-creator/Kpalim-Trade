import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { Restaurant } from '@/models/Restaurant';
import { Hotel } from '@/models/Hotel';
import { TourismSite } from '@/models/TourismSite';
import { Event } from '@/models/Event';
import { Shop } from '@/models/Shop';
import { Product } from '@/models/Product';
import { Service } from '@/models/Service';
import mongoose from 'mongoose';

const MODELS: Record<string, any> = {
  restaurants: Restaurant,
  hotels: Hotel,
  tourism: TourismSite,
  events: Event,
  shops: Shop,
  products: Product,
  services: Service,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    await connectDB();
    const { resource, id } = await params;

    // Sécurité : Admin uniquement
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès refusé' }, { status: 403 });
    }

    const Model = MODELS[resource];
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Ressource non reconnue' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const item = await Model.findById(id).lean();
    if (!item) {
      return NextResponse.json({ success: false, error: 'Fiche introuvable' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Erreur API GET admin:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}