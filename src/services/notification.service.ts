import { connectDB } from '@/lib/mongodb';
import { Notification } from '@/models/Notification';

interface CreateNotificationInput {
  userId: string;
  title: string;
  body: string;
  type: 'order' | 'shop' | 'product' | 'system' | 'promotion';
  link?: string;
}

export async function createNotification(input: CreateNotificationInput) {
  await connectDB();
  return Notification.create(input);
}

export async function getUserNotifications(userId: string, limit = 20) {
  await connectDB();
  return Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}

export async function markAsRead(notificationId: string, userId: string) {
  await connectDB();
  return Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { readAt: new Date() },
    { new: true }
  );
}

export async function getUnreadCount(userId: string) {
  await connectDB();
  return Notification.countDocuments({ userId, readAt: null });
}
