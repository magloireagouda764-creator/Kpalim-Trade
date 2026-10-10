import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Accommodation } from '@/models/Accommodation';
import { uploadImage, deleteImage } from '@/services/cloudinary.service';
import { UPLOAD_LIMITS } from '@/lib/config';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// ============================================
// POST : Uploader une nouvelle photo
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

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return NextResponse.json({ success: false, error: 'Fiche non trouvée' }, { status: 404 });
    }

    const body = await request.json();
    const { image, category } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image manquante' }, { status: 400 });
    }

    if (accommodation.images.length >= UPLOAD_LIMITS.maxImagesPerAccommodation) {
      return NextResponse.json(
        { success: false, error: `Nombre maximum de photos atteint (${UPLOAD_LIMITS.maxImagesPerAccommodation})` },
        { status: 400 }
      );
    }

    const uploadResult = await uploadImage(image, {
      folder: `kpalim-trade/accommodations/${id}`,
      category: category || 'autre',
    });

    if (!uploadResult.success) {
      return NextResponse.json({ success: false, error: uploadResult.error }, { status: 400 });
    }

    accommodation.images.push({
      public_id: uploadResult.data!.public_id,
      secure_url: uploadResult.data!.secure_url,
      category: category || 'autre',
      uploadedAt: new Date(),
    });

    await accommodation.save();

    return NextResponse.json(
      { success: true, message: 'Photo uploadée avec succès', data: uploadResult.data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur API POST /api/accommodations/[id]/photos:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// ============================================
// DELETE : Supprimer une photo
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

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('public_id');

    if (!publicId) {
      return NextResponse.json({ success: false, error: 'public_id manquant' }, { status: 400 });
    }

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return NextResponse.json({ success: false, error: 'Fiche non trouvée' }, { status: 404 });
    }

    const deleteResult = await deleteImage(publicId);
    if (!deleteResult.success) {
      return NextResponse.json({ success: false, error: deleteResult.error }, { status: 400 });
    }

    accommodation.images = accommodation.images.filter(
      (img: any) => img.public_id !== publicId
    );

    await accommodation.save();

    return NextResponse.json({ success: true, message: 'Photo supprimée avec succès' }, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API DELETE /api/accommodations/[id]/photos:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}