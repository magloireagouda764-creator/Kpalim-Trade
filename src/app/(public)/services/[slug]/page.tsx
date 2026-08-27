import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Professional } from '@/models/Professional';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const pro = await Professional.findOne({ slug, isActive: true }).lean();
  if (!pro) return { title: 'Professionnel introuvable' };
  return { title: pro.name, description: pro.description.slice(0, 160) };
}

export default async function ProfessionalDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const professional = await Professional.findOne({ slug, isActive: true }).lean();
  if (!professional) notFound();

  const p = JSON.parse(JSON.stringify(professional));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <nav className="text-sm text-gray-500 flex gap-1">
        <Link href="/services" className="hover:text-kpalime-green" prefetch>Services</Link>
        <span>/</span>
        <span className="text-kpalime-dark font-medium truncate">{p.name}</span>
      </nav>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={p.logo || '/placeholder.jpg'} alt={p.name} fill className="object-cover" sizes="80px" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{p.name}</h1>
          <p className="text-kpalime-earth font-medium">{p.category}</p>
          <p className="text-sm text-gray-500">📍 {p.city}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-bold text-lg mb-2">À propos</h2>
            <p className="text-gray-600 whitespace-pre-line">{p.description}</p>
          </div>

          {p.skills.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-2">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {p.skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1.5 bg-kpalime-sand/50 rounded-lg text-sm">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {p.portfolio.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-2">Réalisations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {p.portfolio.map((img: { public_id: string; secure_url: string }) => (
                  <div key={img.public_id} className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                    <Image src={img.secure_url} alt="Réalisations" fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-gray-100 bg-white space-y-3">
            <h3 className="font-bold">Contact</h3>
            <a href={`tel:${p.phone}`} className="touch-target flex items-center justify-center w-full px-4 py-2.5 bg-kpalime-green text-white rounded-lg text-sm font-medium hover:bg-kpalime-green-light transition-colors">
              📞 Appeler
            </a>
            {p.whatsapp && (
              <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noopener noreferrer" className="touch-target flex items-center justify-center w-full px-4 py-2.5 border border-kpalime-green text-kpalime-green rounded-lg text-sm font-medium hover:bg-kpalime-green hover:text-white transition-colors">
                💬 WhatsApp
              </a>
            )}
            {p.email && <p className="text-sm text-gray-600">✉️ {p.email}</p>}
            {p.address && <p className="text-sm text-gray-600">📍 {p.address}</p>}
            {p.availability && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">Disponibilité</p>
                <p className="text-sm">{p.availability}</p>
              </div>
            )}
            {p.priceRange && (
              <div>
                <p className="text-xs text-gray-500">Tarifs</p>
                <p className="text-sm">{p.priceRange}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
