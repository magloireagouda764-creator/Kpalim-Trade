import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminAccommodations, validateAccommodation } from '@/services/accommodation.service';
import { IValidateAccommodation } from '@/types/accommodation';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// GET : Récupérer tous les établissements (admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const region = searchParams.get('region') || undefined;
    const type = searchParams.get('type') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await getAdminAccommodations({
      status: status as any,
      region: region as any,
      type: type as any,
      search,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error: any) {
    console.error('❌ Erreur API GET /api/accommodations/admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PATCH : Valider/Refuser un établissement
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { id, validation } = body;

    if (!id || !validation) {
      return NextResponse.json(
        { success: false, error: 'ID et validation requis' },
        { status: 400 }
      );
    }

    const result = await validateAccommodation(id, validation as IValidateAccommodation);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'Établissement mis à jour' });
  } catch (error: any) {
    console.error('❌ Erreur API PATCH /api/accommodations/admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}