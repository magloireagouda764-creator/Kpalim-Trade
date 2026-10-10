import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import {
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
} from '@/services/accommodation.service';
import { AccommodationFormData } from '@/types/accommodation';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// ============================================
// GET
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

    const result = await getAccommodationById(id, { includeDocuments: false });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET /api/accommodations/[id]:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// ============================================
// PUT
// ============================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const body: Partial<AccommodationFormData> = await request.json();
    const ownerId = '674f3b8e9c8d4e001f8b4567';

    const result = await updateAccommodation(id, body, ownerId);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API PUT /api/accommodations/[id]:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// ============================================
// DELETE
// ============================================
export async function DELETE(
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
    const isAdmin = false;

    const result = await deleteAccommodation(id, ownerId, isAdmin);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API DELETE /api/accommodations/[id]:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}