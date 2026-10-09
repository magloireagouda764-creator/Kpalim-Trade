import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Accommodation } from '@/models/Accommodation';

// Fonction pour se connecter à la base de données (adapte selon ton setup existant)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const type = searchParams.get('type'); // ex: 'hotel', 'guesthouse'
    
    // Filtre de base pour le public : uniquement les approuvés et actifs
    const query: any = {
      status: 'approved',
      isActive: true,
    };

    if (region) query.region = region;
    if (type) query.type = type;

    const accommodations = await Accommodation.find(query)
      .select('name slug type city district priceRange amenities banner images isFeatured')
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: accommodations }, { status: 200 });
  } catch (error) {
    console.error('Erreur API Accommodations GET:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}