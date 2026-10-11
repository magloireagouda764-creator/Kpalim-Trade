import { cookies } from 'next/headers';
import Link from 'next/link';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { getUserNotifications } from '@/services/notification.service';

export const metadata: Metadata = { title: 'Notifications' };

export default async function NotificationsPage() {
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  if (!payload) return <p>Non autorisé</p>;

  const notifications = await getUserNotifications(payload.userId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif: any) => (
            <li key={notif._id} className="p-4 rounded-md bg-night-light border border-white/10">
              {notif.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}