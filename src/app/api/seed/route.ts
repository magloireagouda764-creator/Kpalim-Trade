import { NextResponse } from 'next/server';
import { seedEssentialData } from '@/lib/seed';

/**
 * Endpoint de seed pour initialiser les données essentielles.
 * ⚠️ À utiliser uniquement en développement ou au premier déploiement.
 * En production, protéger ce endpoint ou le supprimer.
 */
export async function GET() {
  try {
    const result = await seedEssentialData();
    return NextResponse.json({
      success: true,
      message: 'Données essentielles initialisées',
      data: result,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur lors du seed' }, { status: 500 });
  }
}
