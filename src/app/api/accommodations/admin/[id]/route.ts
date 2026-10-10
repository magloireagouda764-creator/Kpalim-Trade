import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { adminUpdateStatus } from '@/services/accommodation.service';
import { AccommodationStatus } from '@/types/accommodation';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// ============================================
// PATCH : Approuver / Refuser / Corriger / Suspendre
// ============================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const { status, adminNote, rejectionReason, correctionRequest } = body;

    const validStatuses: AccommodationStatus[] = [
      'approved', 'rejected', 'needs_correction', 'suspended',
    ];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Statut invalide' },
        { status: 400 }
      );
    }

    if (status === 'rejected' && !rejectionReason) {
      return NextResponse.json(
        { success: false, error: 'Un motif de refus est obligatoire' },
        { status: 400 }
      );
    }

    if (status === 'needs_correction' && !correctionRequest) {
      return NextResponse.json(
        { success: false, error: 'Une demande de correction est obligatoire' },
        { status: 400 }
      );
    }

    const result = await adminUpdateStatus(id, status, adminNote, rejectionReason, correctionRequest);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, message: `Fiche ${status === 'approved' ? 'approuvée' : status === 'rejected' ? 'refusée' : status === 'needs_correction' ? 'marquée à corriger' : 'suspendue'} avec succès` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur API PATCH /api/accommodations/admin/[id]:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// ============================================
// GET : Récupérer une fiche (admin)
// ============================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const { Accommodation } = await import('@/models/Accommodation');
    const accommodation = await Accommodation.findById(id);

    if (!accommodation) {
      return NextResponse.json({ success: false, error: 'Fiche non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: accommodation }, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET /api/accommodations/admin/[id]:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}