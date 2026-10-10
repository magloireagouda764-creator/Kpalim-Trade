import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { submitForValidation } from '@/services/accommodation.service';

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
// POST : Soumettre une fiche pour validation
// ============================================
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Vérifier que l'ID est valide
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    // TODO: Récupérer l'ID du propriétaire depuis le token JWT
    // Pour l'instant, on utilise une valeur de test
    const ownerId = '674f3b8e9c8d4e001f8b4567';

    // Appeler le service pour soumettre la fiche
    const result = await submitForValidation(id, ownerId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Fiche soumise avec succès pour validation' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur API POST /api/accommodations/[id]/submit:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}