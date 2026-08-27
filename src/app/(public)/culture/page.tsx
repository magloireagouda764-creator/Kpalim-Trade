import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { CulturalArticle } from '@/models/CulturalArticle';
import { ArticleCard } from '@/components/culture/ArticleCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Culture & Patrimoine',
  description: "Découvrez l'histoire, les traditions et le patrimoine de Kpalimé",
};

async function CultureContent() {
  await connectDB();
  const articles = await CulturalArticle.find({ isActive: true })
    .sort({ isFeatured: -1, publishedAt: -1 })
    .lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Culture & Patrimoine</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Histoire, traditions, musique, danse, gastronomie... Plongez dans la richesse culturelle de Kpalimé.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article._id.toString()} article={JSON.parse(JSON.stringify(article))} />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="text-center py-16 text-gray-400">Aucun article culturel pour le moment</p>
      )}
    </div>
  );
}

export default function CulturePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <CultureContent />
    </Suspense>
  );
}
