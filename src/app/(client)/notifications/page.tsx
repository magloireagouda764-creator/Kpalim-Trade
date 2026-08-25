import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { getUserNotifications } from '@/services/notification.service';

export const metadata: Metadata = { title: 'Notifications' };

const TYPE_ICONS: Record<string, string> = {
  order: '🛒', shop: '🏪', product: '📦', system: 'ℹ️', promotion: '🎉',
};

export default async function NotificationsPage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return <p>Non autorisé</p>;

  const notifications = await getUserNotifications(payload.userId, 50);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n._id.toString()} className={`p-4 rounded-xl border transition-colors ${n.readAt ? 'border-gray-100 bg-white' : 'border-kpalime-green/30 bg-kpalime-green/5'}`}>
            <div className="flex gap-3">
              <span className="text-xl shrink-0">{TYPE_ICONS[n.type] || '📌'}</span>
              <div className="min-w-0">
                <p className={`font-medium ${!n.readAt ? 'text-kpalime-dark' : 'text-gray-600'}`}>{n.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{n.body}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            {n.link && <Link href={n.link} className="text-xs text-kpalime-green font-medium mt-2 inline-block hover:underline" prefetch>Voir →</Link>}
          </div>
        ))}
        {notifications.length === 0 && <p className="text-center py-16 text-gray-400">Aucune notification</p>}
      </div>
    </div>
  );
}











