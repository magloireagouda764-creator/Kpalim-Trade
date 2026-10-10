import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { submitForValidation } from '@/services/accommodation.service';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// ============================================
// POST : Soumettre pour validation
// ============================================
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const ownerId = '674f3b8e9c8d4e001f8b4567';
    const result = await submitForValidation(id, ownerId);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, message: 'Fiche soumise avec succès pour validation' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur API POST /api/accommodations/[id]/submit:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}