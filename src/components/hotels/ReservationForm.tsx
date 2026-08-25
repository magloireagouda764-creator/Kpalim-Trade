'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Props {
  hotelName: string;
  hotelPhone: string;
  hotelWhatsapp?: string;
}

export function ReservationForm({ hotelName, hotelPhone, hotelWhatsapp }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', arrival: '', departure: '', guests: '2', message: '' });
  const [sent, setSent] = useState(false);

  const handleWhatsApp = () => {
    if (!hotelWhatsapp) return;
    const text = `Bonjour, je souhaite réserver à ${hotelName}.\n\nNom: ${form.name}\nArrivée: ${form.arrival}\nDépart: ${form.departure}\nPersonnes: ${form.guests}\n${form.message ? `Message: ${form.message}` : ''}`;
    window.open(`https://wa.me/${hotelWhatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  const handleCall = () => {
    window.location.href = `tel:${hotelPhone}`;
  };

  return (
    <div className="p-5 rounded-xl border border-gray-100 bg-white space-y-4">
      <h3 className="font-bold text-lg">Réserver</h3>
      <Input label="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <Input label="Téléphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Arrivée" type="date" value={form.arrival} onChange={(e) => setForm({ ...form, arrival: e.target.value })} required />
        <Input label="Départ" type="date" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} required />
      </div>
      <Input label="Nombre de personnes" type="number" min="1" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-kpalime-dark">Message (optionnel)</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-kpalime-green focus:ring-2 focus:ring-kpalime-green/20 focus:outline-none transition-all" />
      </div>

      {sent ? (
        <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm text-center">✅ Redirection vers WhatsApp...</div>
      ) : (
        <div className="flex gap-2">
          {hotelWhatsapp && (
            <Button onClick={handleWhatsApp} variant="primary" className="flex-1 touch-target">💬 WhatsApp</Button>
          )}
          <Button onClick={handleCall} variant="outline" className="flex-1 touch-target">📞 Appeler</Button>
        </div>
      )}
      <p className="text-xs text-gray-400 text-center">La réservation est confirmée directement avec l'établissement.</p>
    </div>
  );
}
