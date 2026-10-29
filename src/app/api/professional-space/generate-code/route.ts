import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Générer un code à 6 caractères alphanumériques (ex: JH-PPQ8)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < 6; i++) {
      if (i === 2) code += '-'; // Ajouter un tiret après 2 caractères
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error('Erreur génération code:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}