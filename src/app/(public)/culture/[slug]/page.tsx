import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { CulturalArticle } from '@/models/CulturalArticle';
import { formatDate } from '@/lib/utils';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const article = await CulturalArticle.findOne({ slug, isActive: true }).lean();
  if (!article) return { title: 'Article introuvable' };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const article = await CulturalArticle.findOne({ slug, isActive: true }).lean();
  if (!article) notFound();

  const a = JSON.parse(JSON.stringify(article));

  return (
    <article className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <nav className="text-sm text-gray-500 flex gap-1">
        <Link href="/culture" className="hover:text-kpalime-green" prefetch>Culture</Link>
        <span>/</span>
        <span className="text-kpalime-dark font-medium truncate">{a.title}</span>
      </nav>

      {a.coverImage && (
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
          <Image src={a.coverImage} alt={a.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
        </div>
      )}

      <div className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight">{a.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="px-2 py-0.5 bg-kpalime-sand rounded-full text-xs font-medium capitalize">{a.category}</span>
          {a.publishedAt && <span>{formatDate(a.publishedAt)}</span>}
          {a.author && <span>Par {a.author}</span>}
        </div>
      </div>

      <div className="prose prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        {a.content}
      </div>

      <div className="pt-6 border-t border-gray-100">
        <Link href="/culture" className="text-kpalime-green font-medium hover:underline" prefetch>
          ← Retour aux articles culturels
        </Link>
      </div>
    </article>
  );
}
