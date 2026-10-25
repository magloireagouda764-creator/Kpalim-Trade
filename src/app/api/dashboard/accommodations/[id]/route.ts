import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';
import { Accommodation } from '@/models/Accommodation';
import mongoose from 'mongoose';

// GET : Récupérer les données d'un établissement pour l'édition
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const accommodation = await Accommodation.findById(id).lean();

    if (!accommodation) {
      return NextResponse.json({ success: false, error: 'Établissement introuvable' }, { status: 404 });
    }

    // 🔒 SÉCURITÉ : Vérifier que l'utilisateur connecté est bien le propriétaire
    if (accommodation.ownerId.toString() !== payload.userId) {
      return NextResponse.json({ success: false, error: 'Accès refusé. Vous n\'êtes pas le propriétaire de cet établissement.' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: accommodation });
  } catch (error) {
    console.error('Erreur API GET Accommodation:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH : Mettre à jour l'établissement
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const accommodation = await Accommodation.findById(id);

    if (!accommodation) {
      return NextResponse.json({ success: false, error: 'Établissement introuvable' }, { status: 404 });
    }

    // 🔒 SÉCURITÉ : Vérifier le propriétaire
    if (accommodation.ownerId.toString() !== payload.userId) {
      return NextResponse.json({ success: false, error: 'Accès refusé' }, { status: 403 });
    }

    // 🔒 RÈGLE MÉTIER : Interdire la modification si la fiche est déjà en cours de validation ou approuvée
    if (accommodation.status === 'pending' || accommodation.status === 'approved') {
      return NextResponse.json({ 
        success: false, 
        error: 'Impossible de modifier une fiche en cours de validation ou déjà approuvée.' 
      }, { status: 400 });
    }

    const body = await req.json();

    // Mise à jour des champs autorisés
    const updateData = {
      name: body.name,
      type: body.type,
      description: body.description,
      address: body.address,
      city: body.city,
      region: body.region,
      phone: body.phone,
      email: body.email,
      capacity: Number(body.capacity),
      roomsCount: Number(body.roomsCount),
      priceRange: body.priceRange,
      amenities: Array.isArray(body.amenities) ? body.amenities : body.amenities.split(',').map((a: string) => a.trim()),
      // 🔒 RÉINITIALISATION DU STATUT : La fiche doit repasser en validation
      status: 'pending',
      rejectionReason: undefined, // On efface l'ancien motif de refus car une nouvelle version est soumise
      correctionRequest: undefined,
    };

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, data: updatedAccommodation });
  } catch (error: any) {
    console.error('Erreur API PATCH Accommodation:', error);
    return NextResponse.json({ success: false, error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}