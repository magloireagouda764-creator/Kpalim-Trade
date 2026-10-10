import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getOwnerAccommodations } from '@/services/accommodation.service';
import { AccommodationStatus } from '@/types/accommodation';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// Fonction pour récupérer l'utilisateur connecté depuis les cookies
async function getCurrentUser(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('token')?.value || 
                  request.cookies.get('next-auth.session-token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    // TODO: Décoder le token JWT pour récupérer l'ID utilisateur
    // Pour l'instant, on retourne un ID de test
    // Dans un projet réel, il faudrait utiliser jose ou jsonwebtoken
    
    return {
      id: '674f3b8e9c8d4e001f8b4567', // ID de test - à remplacer par l'ID réel
      name: 'Utilisateur Test',
    };
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Récupérer l'utilisateur connecté
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer le filtre de statut depuis les params URL
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as AccommodationStatus || undefined;

    // Récupérer les établissements du propriétaire
    const result = await getOwnerAccommodations(user.id, status);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET /api/accommodations/owner:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}