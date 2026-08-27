import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Event } from '@/models/Event';
import { EventCard } from '@/components/events/EventCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Événements à Kpalimé',
  description: 'Concerts, festivals, expositions et événements culturels à Kpalimé',
};

async function EventsContent() {
  await connectDB();
  const events = await Event.find({
    status: 'published',
    startDate: { $gte: new Date(Date.now() - 24 * 3600 * 1000) },
  }).sort({ isFeatured: -1, startDate: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Événements à Kpalimé</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Concerts, festivals, expositions, marchés... Ne manquez rien de ce qui se passe à Kpalimé.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id.toString()} event={JSON.parse(JSON.stringify(event))} />
        ))}
      </div>
      {events.length === 0 && (
        <p className="text-center py-16 text-gray-400">Aucun événement à venir pour le moment</p>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
}
