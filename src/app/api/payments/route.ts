import { NextResponse, type NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/models/Payment';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { createPayment } from '@/services/payment.service';
import { initiateMobileMoneyPayment } from '@/services/mobilemoney.service';

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload) return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    // Créer le paiement en base
    const payment = await createPayment({
      orderId: body.orderId,
      userId: payload.userId,
      amount: body.amount,
      method: body.method,
      phoneNumber: body.phoneNumber,
      operator: body.operator,
    });

    // Si Mobile Money, initier auprès du fournisseur
    if (body.method === 'mobile_money') {
      const mmResult = await initiateMobileMoneyPayment({
        amount: body.amount,
        phoneNumber: body.phoneNumber,
        operator: body.operator,
        orderId: body.orderId,
      });

      if (mmResult.success && mmResult.transactionId) {
        await Payment.findByIdAndUpdate(payment._id, { providerTransactionId: mmResult.transactionId });
      }

      return NextResponse.json({
        success: true,
        data: { paymentId: payment._id, transactionId: mmResult.transactionId, message: mmResult.message },
      });
    }

    return NextResponse.json({ success: true, data: { paymentId: payment._id } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromCookie(req.headers.get('cookie') || '');
    const payload = token ? await verifyToken(token) : null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ success: false, error: 'Admin uniquement' }, { status: 403 });

    await connectDB();
    const payments = await Payment.find().sort({ createdAt: -1 }).populate('userId', 'name email').lean();
    return NextResponse.json({ success: true, data: payments });
  } catch {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
