import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { ProductForm } from '@/components/vendor/ProductForm';

export const metadata: Metadata = { title: 'Ajouter un produit' };

export default async function NewProductPage() {
  await connectDB();
  const categories = await Category.find({ isActive: true }).sort({ position: 1 }).lean();
  const categoryOptions = categories.map((c) => ({ value: c._id.toString(), label: c.name }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ajouter un produit</h1>
      <ProductForm categories={categoryOptions} />
    </div>
  );
}
