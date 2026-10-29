import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const hotel = await Accommodation.findById(id).lean();

    if (!hotel) {
      return NextResponse.json({ error: 'Hôtel non trouvé' }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error: any) {
    console.error('Erreur API GET /api/admin/hotels/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}