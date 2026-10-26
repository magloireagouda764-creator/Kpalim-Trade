import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';
import { OwnerCode } from '@/models/OwnerCode';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    await connectDB();

    // Vérifier l'authentification
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Vous devez être connecté pour soumettre un établissement.' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validation des champs obligatoires
    const requiredFields = [
      'name',
      'type',
      'region',
      'city',
      'address',
      'phone',
      'email',
      'ownerName',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Le champ "${field}" est obligatoire.` },
          { status: 400 }
        );
      }
    }

    // Générer un code unique
    const code = await OwnerCode.generateCode();

    // Créer l'établissement
    const accommodation = await Accommodation.create({
      name: body.name,
      type: body.type,
      description: body.description || '',
      region: body.region,
      city: body.city,
      address: body.address,
      phone: body.phone,
      email: body.email,
      ownerId: new mongoose.Types.ObjectId(payload.userId),
      ownerName: body.ownerName,
      status: 'pending',
      isActive: false,
    });

    // Créer le code d'accès
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
      { success: false, error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}