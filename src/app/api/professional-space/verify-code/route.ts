import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json({ error: 'Code manquant' }, { status: 400 });
    }

    // Rechercher l'établissement avec ce code
    const establishment = await Accommodation.findOne({ 
      ownerCode: code.toUpperCase(),
      status: 'approved',
      isActive: true 
    })
    .select('name type city region phone email ownerId ownerName')
    .lean();

    if (!establishment) {
      return NextResponse.json({ error: 'Établissement non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: establishment });
  } catch (error) {
    console.error('Erreur vérification code:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}