import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { TouristSite } from '@/models/TouristSite';
import { Price } from '@/components/currency/Price';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const site = await TouristSite.findOne({ slug, isActive: true }).lean();
  if (!site) return { title: 'Site introuvable' };
  return { title: site.name, description: site.shortDescription };
}

export default async function TouristSitePage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const site = await TouristSite.findOne({ slug, isActive: true }).lean();
  if (!site) notFound();

  const s = JSON.parse(JSON.stringify(site));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <nav className="text-sm text-gray-500 flex gap-1">
        <Link href="/tourism" className="hover:text-kpalime-green" prefetch>Tourisme</Link>
        <span>/</span>
        <span className="text-kpalime-dark font-medium">{s.name}</span>
      </nav>

      {s.images.length > 0 && (
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
          <Image src={s.images[0].secure_url} alt={s.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" />
        </div>
      )}

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{s.name}</h1>
        <p className="text-lg text-gray-600">{s.shortDescription}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">{s.description}</div>

          {s.activities.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3">Activités disponibles</h2>
              <div className="flex flex-wrap gap-2">
                {s.activities.map((a: string) => (
                  <span key={a} className="px-3 py-1.5 bg-kpalime-sand/50 rounded-lg text-sm">{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-gray-100 bg-white space-y-3">
            <h3 className="font-bold">Informations pratiques</h3>
            {s.entranceFee !== undefined && s.entranceFee > 0 && (
              <div><p className="text-xs text-gray-500">Tarif d'entrée</p><Price amount={s.entranceFee} className="text-lg" /></div>
            )}
            {s.openingHours && <div><p className="text-xs text-gray-500">Horaires</p><p className="text-sm">{s.openingHours}</p></div>}
            {s.duration && <div><p className="text-xs text-gray-500">Durée recommandée</p><p className="text-sm">{s.duration}</p></div>}
            {s.difficulty && <div><p className="text-xs text-gray-500">Difficulté</p><p className="text-sm capitalize">{s.difficulty === 'easy' ? 'Facile' : s.difficulty === 'medium' ? 'Moyenne' : 'Difficile'}</p></div>}
            {s.bestPeriod && <div><p className="text-xs text-gray-500">Meilleure période</p><p className="text-sm">{s.bestPeriod}</p></div>}
            {s.contactPhone && <div><p className="text-xs text-gray-500">Contact</p><a href={`tel:${s.contactPhone}`} className="text-sm text-kpalime-green font-medium hover:underline">📞 {s.contactPhone}</a></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
