import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Event } from '@/models/Event';
import { Price } from '@/components/currency/Price';
import { formatDate } from '@/lib/utils';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const event = await Event.findOne({ slug, status: 'published' }).lean();
  if (!event) return { title: 'Événement introuvable' };
  return { title: event.title, description: event.description.slice(0, 160) };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const event = await Event.findOne({ slug, status: 'published' }).lean();
  if (!event) notFound();

  const e = JSON.parse(JSON.stringify(event));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <nav className="text-sm text-gray-500 flex gap-1">
        <Link href="/events" className="hover:text-kpalime-green" prefetch>Événements</Link>
        <span>/</span>
        <span className="text-kpalime-dark font-medium truncate">{e.title}</span>
      </nav>

      {e.poster && (
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
          <Image src={e.poster} alt={e.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{e.title}</h1>
          <p className="text-gray-600 whitespace-pre-line">{e.description}</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-gray-100 bg-white space-y-3">
            <h3 className="font-bold">Informations</h3>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium">{formatDate(e.startDate)}</p>
              {e.endDate && <p className="text-xs text-gray-500">au {formatDate(e.endDate)}</p>}
            </div>
            {e.startTime && (
              <div>
                <p className="text-xs text-gray-500">Horaire</p>
                <p className="text-sm">{e.startTime}{e.endTime && ` - ${e.endTime}`}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500">Lieu</p>
              <p className="text-sm font-medium">📍 {e.location}</p>
              {e.address && <p className="text-xs text-gray-500">{e.address}</p>}
            </div>
            <div>
              <p className="text-xs text-gray-500">Tarif</p>
              <p className="text-sm font-bold">
                {e.isFree ? <span className="text-kpalime-green">Gratuit</span> : <Price amount={e.price || 0} />}
              </p>
            </div>
            {e.organizer && (
              <div>
                <p className="text-xs text-gray-500">Organisateur</p>
                <p className="text-sm">{e.organizer}</p>
              </div>
            )}
            {e.contactPhone && (
              <a href={`tel:${e.contactPhone}`} className="touch-target flex items-center justify-center w-full px-4 py-2.5 bg-kpalime-green text-white rounded-lg text-sm font-medium hover:bg-kpalime-green-light transition-colors">
                📞 Contacter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
