import { Suspense } from 'react';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { ProductFilter } from '@/components/marketplace/ProductFilter';
import { Skeleton } from '@/components/ui/Skeleton';

async function FilterSidebar() {
  await connectDB();
  const categories = await Category.find({ isActive: true }).sort({ position: 1 }).lean();
  return <ProductFilter categories={JSON.parse(JSON.stringify(categories))} />;
}

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-20">
            <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}>
              <FilterSidebar />
            </Suspense>
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
