import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getPublicAccommodations, createAccommodation } from '@/services/accommodation.service';
import { AccommodationFilters, AccommodationFormData, TogoRegion, AccommodationType } from '@/types/accommodation';

// ============================================
// CONNEXION À LA BASE DE DONNÉES
// ============================================
async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI non défini dans les variables d\'environnement');
  }
  
  await mongoose.connect(MONGODB_URI);
}

// ============================================
// GET : Liste publique des établissements approuvés
// ============================================
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Récupérer les filtres depuis les paramètres URL
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
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET /api/accommodations:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// ============================================
// POST : Créer une nouvelle fiche (propriétaire)
// ============================================
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // TODO: Vérifier l'authentification côté serveur
    // Pour l'instant, on récupère les données du body
    const body: AccommodationFormData = await request.json();

    // Validation basique
    if (!body.name || !body.type || !body.description || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // TODO: Récupérer l'ID et le nom du propriétaire depuis le token JWT
    // Pour l'instant, on utilise des valeurs de test
    const ownerId = '674f3b8e9c8d4e001f8b4567'; // À remplacer par l'ID réel
    const ownerName = 'Propriétaire Test'; // À remplacer par le nom réel

    const result = await createAccommodation(body, ownerId, ownerName);

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