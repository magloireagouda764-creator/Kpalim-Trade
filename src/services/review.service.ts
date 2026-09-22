import { connectDB } from '@/lib/mongodb';
import { Review } from '@/models/Review';

export async function getReviewsFor(type: string, id: string) {
  await connectDB();
  return Review.find({ reviewableType: type, reviewableId: id, status: 'visible' })
    .sort({ createdAt: -1 })
    .populate('userId', 'name avatar')
    .lean();
}

export async function getAverageRating(type: string, id: string): Promise<number> {
  await connectDB();
  const result = await Review.aggregate([
    { $match: { reviewableType: type, reviewableId: new (await import('mongoose')).Types.ObjectId(id), status: 'visible' } },
    { $group: { _id: null, avg: { $avg: '$rating' } } },
  ]);
  return result[0]?.avg ? Math.round(result[0].avg * 10) / 10 : 0;
}
