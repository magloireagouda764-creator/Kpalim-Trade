import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Guide } from '@/models/Guide';
import { GuideCard } from '@/components/tourism/GuideCard';

export const metadata: Metadata = { title: 'Guides touristiques', description: 'Trouvez un guide touristique à Kpalimé' };

export default async function GuidesPage() {
  await connectDB();
  const guides = await Guide.find({ isActive: true }).sort({ name: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Guides touristiques</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Des guides locaux expérimentés pour vous accompagner dans la découverte de Kpalimé et ses environs.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide) => <GuideCard key={guide._id.toString()} guide={JSON.parse(JSON.stringify(guide))} />)}
      </div>
      {guides.length === 0 && <p className="text-center py-16 text-gray-400">Aucun guide disponible pour le moment</p>}
    </div>
  );
}
