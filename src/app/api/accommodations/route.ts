import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getPublicAccommodations, createAccommodation } from '@/services/accommodation.service';
import { AccommodationFilters, AccommodationFormData, TogoRegion, AccommodationType } from '@/types/accommodation';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI non défini dans les variables d\'environnement');
  }
  await mongoose.connect(MONGODB_URI);
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const filters: AccommodationFilters = {
      region: searchParams.get('region') as TogoRegion || undefined,
      type: searchParams.get('type') as AccommodationType || undefined,
      city: searchParams.get('city') || undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    };

    const result = await getPublicAccommodations(filters);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET /api/accommodations:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Récupérer les données du body (y compris ownerId s'il est envoyé)
    const body: AccommodationFormData & { ownerId?: string } = await request.json();

    // Validation basique
    if (!body.name || !body.type || !body.description || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // ✅ CORRECTION : Utiliser l'ownerId envoyé par le frontend, sinon fallback sur l'ID de test
    const ownerId = body.ownerId || '674f3b8e9c8d4e001f8b4567';
    const ownerName = body.ownerName || 'Propriétaire Test';

    const result = await createAccommodation(body as AccommodationFormData, ownerId, ownerName);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Erreur API POST /api/accommodations:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}