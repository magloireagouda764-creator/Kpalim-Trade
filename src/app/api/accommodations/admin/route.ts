import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminAccommodations } from '@/services/accommodation.service';
import { AccommodationStatus, TogoRegion, AccommodationType } from '@/types/accommodation';

// ============================================
// CONNEXION À LA BASE DE DONNÉES
// ============================================
async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI non défini');
  }
  
  await mongoose.connect(MONGODB_URI);
}

// ============================================
// GET : Liste de toutes les fiches (admin uniquement)
// ============================================
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // TODO: Vérifier que l'utilisateur est admin
    // Pour l'instant, on accepte toutes les requêtes

    const { searchParams } = new URL(request.url);
    
    const filters = {
      status: searchParams.get('status') as AccommodationStatus || undefined,
      region: searchParams.get('region') as TogoRegion || undefined,
      type: searchParams.get('type') as AccommodationType || undefined,
    };

    const result = await getAdminAccommodations(filters);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET /api/accommodations/admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}