'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Price } from '@/components/currency/Price';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ phone: '', deliveryAddress: '', district: '', note: '' });

  const deliveryFee = 1000; // Frais fixe Kpalimé
  const total = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, name: i.name, quantity: i.quantity })),
          deliveryFee,
          paymentMethod: 'cod',
          ...form,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Erreur lors de la commande');
        return;
      }

      clearCart();
      router.push(`/orders/${data.data._id}`);
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-500 mb-4">Votre panier est vide</p>
        <Button onClick={() => router.push('/marketplace')} variant="outline">Retourner à la boutique</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Finaliser la commande</h1>

      {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-bold text-lg">Informations de livraison</h2>
          <Input label="Téléphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="+228 XX XX XX XX" />
          <Input label="Adresse de livraison" value={form.deliveryAddress} onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} required placeholder="Rue, quartier, repère..." />
          <Input label="Quartier" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="Ex: Dzigbé, Kpodzi..." />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-kpalime-dark">Note (optionnel)</label>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-kpalime-green focus:ring-2 focus:ring-kpalime-green/20 focus:outline-none transition-all" placeholder="Instructions spéciales..." />
          </div>
          <div className="p-3 rounded-lg bg-kpalime-sand/50 text-sm">
            <p className="font-medium">💰 Paiement à la livraison</p>
            <p className="text-gray-500 mt-1">Vous paierez en espèces à la réception de votre commande.</p>
          </div>
          <Button type="submit" loading={loading} className="w-full touch-target text-lg">Confirmer la commande</Button>
        </form>

        <div className="p-4 rounded-xl border border-gray-100 h-fit space-y-3">
          <h2 className="font-bold text-lg">Récapitulatif</h2>
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                <Image src={item.image || '/placeholder.jpg'} alt="" fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">×{item.quantity}</p>
              </div>
              <p className="text-sm font-medium shrink-0">{(item.price * item.quantity).toLocaleString('fr-FR')}</p>
            </div>
          ))}
          <div className="pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Sous-total</span><span>{totalPrice.toLocaleString('fr-FR')} FCFA</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Livraison (Kpalimé)</span><span>{deliveryFee.toLocaleString('fr-FR')} FCFA</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><Price amount={total} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
