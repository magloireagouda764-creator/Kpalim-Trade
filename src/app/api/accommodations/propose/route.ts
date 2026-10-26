import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';
import { OwnerCode } from '@/models/OwnerCode';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. Vérifier l'authentification
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Vous devez être connecté pour soumettre un établissement.' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // 2. Validation des champs obligatoires de base
    const requiredFields = ['name', 'type', 'region', 'city', 'address', 'phone', 'email', 'ownerName'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Le champ "${field}" est obligatoire.` },
          { status: 400 }
        );
      }
    }

    // 3. Générer un slug unique (ex: hotel-le-palmier-1698765432)
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    // 4. Générer un code d'accès unique
    const code = await OwnerCode.generateCode();

    // 5. Valeurs par défaut pour capacity et roomsCount si non fournies (ex: pour un restaurant)
    const capacity = body.capacity ? Number(body.capacity) : 1;
    const roomsCount = body.roomsCount ? Number(body.roomsCount) : 1;

    // 6. Créer l'établissement dans MongoDB
    const accommodation = await Accommodation.create({
      name: body.name,
      slug: uniqueSlug,
      type: body.type,
      description: body.description || body.shortDescription || 'Aucune description fournie.',
      region: body.region,
      city: body.city,
      address: body.address,
      phone: body.phone,
      email: body.email,
      ownerId: new mongoose.Types.ObjectId(payload.userId),
      ownerName: body.ownerName,
      capacity: capacity,
      roomsCount: roomsCount,
      priceRange: body.priceRange || 'Non spécifié',
      amenities: body.amenities || [],
      status: 'pending',
      isActive: false,
    });

    // 7. Créer le code d'accès lié à cet établissement
    const ownerCode = await OwnerCode.create({
      code,
      ownerId: new mongoose.Types.ObjectId(payload.userId),
      establishmentName: body.name,
      accommodationId: accommodation._id,
      status: 'pending',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    });

    return NextResponse.json({
      success: true,
      data: {
        code,
        accommodationId: accommodation._id,
        message: 'Fiche soumise avec succès. En attente de validation.',
      },
    });
  } catch (error: any) {
    console.error('Erreur API propose:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur serveur lors de la soumission.' },
      { status: 500 }
    );
  }
}