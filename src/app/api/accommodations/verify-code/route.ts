import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { OwnerCode } from '@/models/OwnerCode';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { code, establishmentName } = body;

    if (!code || !establishmentName) {
      return NextResponse.json(
        { success: false, error: 'Code et nom de l\'établissement requis.' },
        { status: 400 }
      );
    }

    // Trouver le code
    const ownerCode = await OwnerCode.findOne({
      code: code.toUpperCase().trim(),
    });

    if (!ownerCode) {
      return NextResponse.json(
        { success: false, error: 'Code invalide.' },
        { status: 404 }
      );
    }

    // Vérifier si bloqué
    if (ownerCode.isBlocked()) {
      const minutesLeft = Math.ceil(
        (ownerCode.blockedUntil.getTime() - Date.now()) / 60000
      );
      return NextResponse.json(
        {
          success: false,
          error: `Trop de tentatives. Réessayez dans ${minutesLeft} minute(s).`,
          blocked: true,
        },
        { status: 429 }
      );
    }

    // Vérifier si expiré
    if (ownerCode.isExpired()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Code expiré. Veuillez en demander un nouveau.',
          expired: true,
        },
        { status: 410 }
      );
    }

    // Vérifier le nom de l'établissement
    if (ownerCode.establishmentName.toLowerCase() !== establishmentName.toLowerCase().trim()) {
      const isBlocked = await ownerCode.incrementAttempts();
      
      if (isBlocked) {
        return NextResponse.json(
          {
            success: false,
            error: 'Trop de tentatives. Accès bloqué pour 5 minutes.',
            blocked: true,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Nom de l'établissement incorrect. Tentatives restantes: ${5 - ownerCode.attempts}`,
        },
        { status: 401 }
      );
    }

    // Vérifier le statut
    if (ownerCode.status !== 'approved') {
      return NextResponse.json(
        {
          success: false,
          error: 'Votre établissement n\'a pas encore été validé par l\'administration.',
          pending: true,
        },
        { status: 403 }
      );
    }

    // Succès : réinitialiser les tentatives et prolonger l'expiration
    await ownerCode.resetAttempts();
    await ownerCode.refreshExpiration();

    return NextResponse.json({
      success: true,
      data: {
        accommodationId: ownerCode.accommodationId,
        code: ownerCode.code,
        message: 'Accès autorisé.',
      },
    });
  } catch (error: any) {
    console.error('Erreur API verify-code:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}