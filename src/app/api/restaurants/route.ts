import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createRestaurant } from '@/services/restaurant.service';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation des champs obligatoires
    const requiredFields = ['name', 'type', 'description', 'ownerName', 'phone', 'region', 'city', 'address', 'cuisines', 'priceRange', 'ownerId'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Champs manquants : ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await createRestaurant(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: result.data,
        message: 'Restaurant créé avec succès' 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Erreur API POST /api/restaurants:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}