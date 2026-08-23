import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
      <Link href="/marketplace" prefetch className="shrink-0 snap-start px-4 py-2 rounded-full bg-kpalime-green text-white text-sm font-medium whitespace-nowrap touch-target">
        Tous
      </Link>
      {categories.map((cat) => (
        <Link key={cat._id} href={`/marketplace/categories/${cat.slug}`} prefetch className="shrink-0 snap-start px-4 py-2 rounded-full border border-gray-200 text-sm font-medium whitespace-nowrap hover:border-kpalime-green hover:text-kpalime-green transition-colors touch-target">
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
