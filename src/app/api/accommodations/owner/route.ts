import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getOwnerAccommodations, getDashboardStats } from '@/services/accommodation.service';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// Fonction pour récupérer l'utilisateur connecté (à remplacer par ton système d'auth)
async function getCurrentUser(request: NextRequest) {
  // TODO: Implémenter la vérification du token JWT
  // Pour l'instant, on retourne un ID de test
  return {
    id: '674f3b8e9c8d4e001f8b4567',
    name: 'Utilisateur Test',
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const includeStats = searchParams.get('stats') === 'true';

    // Récupérer les établissements
    const accommodationsResult = await getOwnerAccommodations(user.id, status);

    if (!accommodationsResult.success) {
      return NextResponse.json(
        { success: false, error: accommodationsResult.error },
        { status: 500 }
      );
    }

    // Récupérer les stats si demandé
    let stats = null;
    if (includeStats) {
      const statsResult = await getDashboardStats(user.id);
      if (statsResult.success) {
        stats = statsResult.data;
      }
    }

    return NextResponse.json({
      success: true,
      data: accommodationsResult.data,
      stats,
    });
  } catch (error: any) {
    console.error('❌ Erreur API GET /api/accommodations/owner:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}