'use client';

import { useState, useEffect } from 'react';
import { RatingStars } from '@/components/ui/RatingStars';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';

interface Review { _id: string; rating: number; comment: string; userId: { name: string; avatar?: string }; createdAt: string; }

interface Props { type: string; id: string; }

export function ReviewSection({ type, id }: Props) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?type=${type}&id=${id}`).then((r) => r.json()).then((d) => { if (d.success) setReviews(d.data); }).finally(() => setLoading(false));
  }, [type, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, id, rating, comment }) });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => [data.data, ...prev]);
        setShowForm(false); setComment(''); setRating(5);
        addToast('Avis publié avec succès !', 'success');
      } else { addToast(data.error, 'error'); }
    } catch { addToast('Erreur réseau', 'error'); } finally { setSubmitting(false); }
  };

  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Avis ({reviews.length})</h3>
          {reviews.length > 0 && <RatingStars rating={avg} size="md" />}
        </div>
        {user && !showForm && <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>Laisser un avis</Button>}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-kpalime-green/30 bg-kpalime-green/5 space-y-3">
          <RatingStars rating={rating} interactive onChange={setRating} size="lg" />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required minLength={10} maxLength={1000} rows={3} placeholder="Votre commentaire (min. 10 caractères)..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-kpalime-green focus:ring-2 focus:ring-kpalime-green/20 focus:outline-none" />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
            <Button type="submit" loading={submitting} size="sm">Publier</Button>
          </div>
        </form>
      )}

      {loading ? <p className="text-gray-400 animate-pulse">Chargement des avis...</p> : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="flex gap-3 p-4 rounded-xl border border-gray-50">
              <Avatar name={r.userId.name} src={r.userId.avatar} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{r.userId.name}</p>
                  <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <RatingStars rating={r.rating} size="sm" />
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{r.comment}</p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-center py-8 text-gray-400">Aucun avis pour le moment</p>}
        </div>
      )}
    </div>
  );
}
