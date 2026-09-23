import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/models/Payment';
import { markPaymentSuccess, markPaymentFailed } from '@/services/payment.service';

/**
 * Webhook pour recevoir les notifications de paiement de l'agrégateur.
 * ⚠️ En production, vérifier la signature du webhook avant traitement.
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Adapter selon le format de l'agrégateur
    const transactionId = body.transaction_id || body.transactionId;
    const status = body.status; // 'success', 'failed', 'pending'

    if (!transactionId) {
      return NextResponse.json({ success: false, error: 'transaction_id manquant' }, { status: 400 });
    }

    const payment = await Payment.findOne({ providerTransactionId: transactionId });
    if (!payment) {
      return NextResponse.json({ success: false, error: 'Paiement introuvable' }, { status: 404 });
    }

    if (status === 'success' || status === 'paid') {
      await markPaymentSuccess(payment._id.toString(), transactionId);
    } else if (status === 'failed' || status === 'cancelled') {
      await markPaymentFailed(payment._id.toString());
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur webhook' }, { status: 500 });
  }
}
