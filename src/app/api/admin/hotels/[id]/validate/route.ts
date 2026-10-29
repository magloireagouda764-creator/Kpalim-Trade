import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';
import mongoose from 'mongoose';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status, rejectionReason, correctionRequest } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const validStatuses = ['approved', 'rejected', 'needs_correction'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    const updateData: any = { status };

    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    if (status === 'needs_correction' && correctionRequest) {
      updateData.correctionRequest = correctionRequest;
    }

    if (status === 'approved') {
      updateData.isActive = true;
      updateData.publishedAt = new Date();
    }

    const hotel = await Accommodation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!hotel) {
      return NextResponse.json({ error: 'Hôtel non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: hotel });
  } catch (error: any) {
    console.error('Erreur API POST /api/admin/hotels/[id]/validate:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}