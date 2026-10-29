import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { code, name } = body;
    
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Code et nom sont obligatoires' }, 
        { status: 400 }
      );
    }

    // Rechercher l'établissement avec ce code ET ce nom
    const establishment = await Accommodation.findOne({ 
      ownerCode: code.toUpperCase(),
      name: { $regex: new RegExp(`^${name}$`, 'i') }, // Comparaison insensible à la casse
      status: 'approved',
      isActive: true 
    })
    .select('_id name type city region')
    .lean();

    if (!establishment) {
      return NextResponse.json(
        { error: 'Code ou nom incorrect. Vérifiez vos informations.' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: establishment 
    });
    
  } catch (error) {
    console.error('Erreur vérification accès:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' }, 
      { status: 500 }
    );
  }
}