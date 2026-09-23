import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/models/Payment';
import { Order } from '@/models/Order';
import { createNotification } from '@/services/notification.service';
import { generateSecureReference } from '@/lib/security';

interface CreatePaymentInput {
  orderId: string;
  userId: string;
  amount: number;
  method: 'cod' | 'mobile_money' | 'card';
  phoneNumber?: string;
  operator?: 't-money' | 'flooz' | 'autre';
}

export async function createPayment(input: CreatePaymentInput) {
  await connectDB();
  const payment = await Payment.create({
    ...input,
    currency: 'XOF',
    status: input.method === 'cod' ? 'pending' : 'processing',
  });

  // Si paiement à la livraison, la commande reste en attente
  if (input.method === 'cod') {
    await Order.findByIdAndUpdate(input.orderId, { paymentStatus: 'pending', paymentMethod: 'cod' });
  }

  return payment;
}

export async function markPaymentSuccess(paymentId: string, providerTransactionId?: string) {
  await connectDB();
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { status: 'success', paidAt: new Date(), providerTransactionId },
    { new: true }
  );

  if (payment) {
    await Order.findByIdAndUpdate(payment.orderId, { paymentStatus: 'paid', status: 'confirmed' });
    await createNotification({
      userId: payment.userId.toString(),
      title: 'Paiement confirmé ✅',
      body: `Votre paiement de ${payment.amount.toLocaleString('fr-FR')} FCFA a été confirmé.`,
      type: 'order',
      link: `/orders/${payment.orderId}`,
    });
  }

  return payment;
}

export async function markPaymentFailed(paymentId: string) {
  await connectDB();
  return Payment.findByIdAndUpdate(paymentId, { status: 'failed' }, { new: true });
}

export async function getPaymentsByUser(userId: string) {
  await connectDB();
  return Payment.find({ userId }).sort({ createdAt: -1 }).lean();
}

export async function getPaymentStats() {
  await connectDB();
  const [total, pending, success] = await Promise.all([
    Payment.countDocuments(),
    Payment.countDocuments({ status: 'pending' }),
    Payment.countDocuments({ status: 'success' }),
  ]);
  const revenue = await Payment.aggregate([
    { $match: { status: 'success' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  return { total, pending, success, revenue: revenue[0]?.total || 0 };
}
