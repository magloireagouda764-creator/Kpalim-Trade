'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';

interface Props {
  categories: { value: string; label: string }[];
}

export function ProductForm({ categories }: Props) {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ public_id: string; secure_url: string }[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', discountPrice: '', stock: '', categoryId: '' });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'products');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setImages((prev) => [...prev, data.data]);
        addToast('Image ajoutée', 'success');
      } else { addToast(data.error, 'error'); }
    } catch { addToast('Erreur upload', 'error'); } finally { setUploading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
          stock: Number(form.stock),
          images,
          slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        addToast('Produit créé avec succès !', 'success');
        router.push('/vendor/products');
      } else { addToast(data.error, 'error'); }
    } catch { addToast('Erreur réseau', 'error'); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <Input label="Nom du produit" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-kpalime-dark">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required minLength={10} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-kpalime-green focus:ring-2 focus:ring-kpalime-green/20 focus:outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Prix (FCFA)" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <Input label="Prix promo (optionnel)" type="number" min="0" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Stock" type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <Select label="Catégorie" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} options={categories} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-kpalime-dark">Images du produit</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-kpalime-green file:text-white hover:file:bg-kpalime-green-light transition-colors" />
        {uploading && <p className="text-xs text-gray-400 animate-pulse">Upload en cours...</p>}
        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <div key={img.public_id} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                <img src={img.secure_url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-bl">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" loading={loading} className="w-full touch-target">Créer le produit</Button>
    </form>
  );
}
