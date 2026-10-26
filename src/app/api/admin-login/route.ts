import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('🚀 [TEST] L\'API a été appelée !');
  
  try {
    const body = await request.json();
    console.log('🚀 [TEST] Données reçues:', body);

    if (body?.code !== '48574857') {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    console.log('🚀 [TEST] Code valide, réponse envoyée.');
    // On ne crée PAS de token ni de cookie pour ce test
    return NextResponse.json({ success: true, message: 'Test réussi, pas de blocage' });
    
  } catch (error: any) {
    console.error('🚨 [TEST] Erreur critique:', error);
    return NextResponse.json({ error: error.message || 'Erreur inconnue' }, { status: 500 });
  }
}