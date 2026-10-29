import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';

export async function GET() {
  try {
    await connectDB();

    let code;
    let isUnique = false;

    // Générer un code à 4 chiffres jusqu'à ce qu'on en trouve un qui n'existe pas
    while (!isUnique) {
      code = Math.floor(1000 + Math.random() * 9000).toString();
      
      const existing = await Accommodation.findOne({ ownerCode: code });
      if (!existing) {
        isUnique = true;
      }
    }

    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error('Erreur génération code:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}