import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Review } from '@/models/Review';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { RatingStars } from '@/components/ui/RatingStars';

export const metadata: Metadata = { title: 'Gestion Avis' };

export default async function AdminReviewsPage() {
  await connectDB();

  const reviewsData = await Review.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'name')
    .lean();

  const reviews = reviewsData as any[];

  const columns = [
    {
      key: 'userId',
      header: 'Auteur',
      render: (r: any) => r.userId?.name || '-',
    },
    {
      key: 'rating',
      header: 'Note',
      render: (r: any) => <RatingStars rating={r.rating} size="sm" />,
    },
    {
      key: 'comment',
      header: 'Commentaire',
      render: (r: any) => (
        <span className="line-clamp-2 text-xs">{r.comment}</span>
      ),
      className: 'max-w-[300px]',
    },
    {
      key: 'reviewableType',
      header: 'Type',
      render: (r: any) => (
        <span className="capitalize text-xs">{r.reviewableType}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (r: any) =>
        r.createdAt
          ? new Date(r.createdAt).toLocaleDateString('fr-FR')
          : 'Date inconnue',
    },
    {
      key: 'status',
      header: 'Statut',
      render: (r: any) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des avis</h1>
      <DataTable
        columns={columns}
        data={reviews}
        getKey={(r: any) => r._id?.toString()}
        emptyMessage="Aucun avis"
      />
    </div>
  );
}