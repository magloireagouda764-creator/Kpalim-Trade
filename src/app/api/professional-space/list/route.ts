import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';

export async function GET() {
  try {
    await connectDB();
    
    // On ne récupère que les établissements approuvés et actifs
    const establishments = await Accommodation.find({ 
      status: 'approved',
      isActive: true 
    })
    .select('name type city region') // On ne renvoie pas les données sensibles (pas de code, pas de téléphone)
    .sort({ createdAt: -1 })
    .lean();

    return NextResponse.json({ success: true, data: establishments });
  } catch (error) {
    console.error('Erreur liste établissements:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}