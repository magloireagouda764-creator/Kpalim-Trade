import { NextResponse, type NextRequest } from 'next/server';
import { isValidEmail } from '@/lib/email';

// En production, stocker dans une collection MongoDB 'newsletter'
const subscribers = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 });
    }

    if (subscribers.has(email)) {
      return NextResponse.json({ success: false, error: 'Vous êtes déjà inscrit' }, { status: 409 });
    }

    subscribers.add(email);

    return NextResponse.json({
      success: true,
      message: 'Inscription à la newsletter réussie !',
    }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
