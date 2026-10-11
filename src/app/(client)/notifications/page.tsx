import { cookies } from 'next/headers';
import { Metadata } from 'next'; // ✅ Import ajouté ici
import Link from 'next/link';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { getUserNotifications } from '@/services/notification.service';

export const metadata: Metadata = { 
  title: 'Notifications | Kpalimé-Trade' 
};

export default async function NotificationsPage() {
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400">Non autorisé. Veuillez vous connecter.</p>
        <Link href="/auth/login" className="text-emerald-brand hover:underline mt-2 inline-block">
          Se connecter
        </Link>
      </div>
    );
  }

  // Note: Assure-toi que getUserNotifications existe dans ton service, 
  // sinon cette ligne peut être commentée temporairement pour tester le dashboard.
  let notifications: any[] = [];
  try {
    notifications = await getUserNotifications(payload.userId) || [];
  } catch (error) {
    console.error("Erreur chargement notifications:", error);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Mes notifications</h1>
      {notifications.length === 0 ? (
        <div className="p-8 rounded-md bg-night-light border border-white/10 text-center text-muted">
          Aucune nouvelle notification.
        </div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif: any) => (
            <li key={notif._id} className="p-4 rounded-md bg-night-light border border-white/10 text-white">
              {notif.message || "Nouvelle notification"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}