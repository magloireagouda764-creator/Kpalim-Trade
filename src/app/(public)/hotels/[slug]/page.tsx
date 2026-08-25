import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';
import { Room } from '@/models/Room';
import { ReservationForm } from '@/components/hotels/ReservationForm';
import { Price } from '@/components/currency/Price';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const hotel = await Accommodation.findOne({ slug, isActive: true }).lean();
  if (!hotel) return { title: 'Hôtel introuvable' };
  return { title: hotel.name, description: hotel.description.slice(0, 160) };
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const hotel = await Accommodation.findOne({ slug, isActive: true }).lean();
  if (!hotel) notFound();

  const rooms = await Room.find({ accommodationId: hotel._id, isActive: true }).sort({ pricePerNight: 1 }).lean();
  const h = JSON.parse(JSON.stringify(hotel));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <nav className="text-sm text-gray-500 flex gap-1">
        <Link href="/hotels" className="hover:text-kpalime-green" prefetch>Hôtels</Link>
        <span>/</span>
        <span className="text-kpalime-dark font-medium">{h.name}</span>
      </nav>

      {h.images.length > 0 && (
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
          <Image src={h.images[0].secure_url} alt={h.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">{h.name}</h1>
          <p className="text-gray-600">{h.description}</p>

          {h.amenities.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3">Équipements & Services</h2>
              <div className="flex flex-wrap gap-2">
                {h.amenities.map((a: string) => (
                  <span key={a} className="px-3 py-1.5 bg-kpalime-sand/50 rounded-lg text-sm">✓ {a}</span>
                ))}
              </div>
            </div>
          )}

          {rooms.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3">Chambres disponibles</h2>
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room._id.toString()} className="p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{room.name}</p>
                      <p className="text-xs text-gray-500">{room.type} • {room.beds} • Max {room.capacity} pers.</p>
                    </div>
                    <Price amount={room.pricePerNight} className="text-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <ReservationForm hotelName={h.name} hotelPhone={h.phone} hotelWhatsapp={h.whatsapp} />
          <div className="p-4 rounded-xl border border-gray-100 text-sm space-y-2">
            <p>📍 {h.address}, {h.city}</p>
            <p>📞 <a href={`tel:${h.phone}`} className="text-kpalime-green hover:underline">{h.phone}</a></p>
            {h.whatsapp && <p>💬 <a href={`https://wa.me/${h.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-kpalime-green hover:underline">WhatsApp</a></p>}
            {h.checkInTime && <p>🕐 Check-in: {h.checkInTime} / Check-out: {h.checkOutTime}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
