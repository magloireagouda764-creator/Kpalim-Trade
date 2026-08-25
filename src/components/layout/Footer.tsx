import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-kpalime-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">{APP_NAME}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">La plateforme numérique de référence de Kpalimé. Commerce, tourisme, culture et services locaux.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explorer</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/marketplace" className="hover:text-white transition-colors" prefetch>Boutique</Link></li>
              <li><Link href="/tourism" className="hover:text-white transition-colors" prefetch>Tourisme</Link></li>
              <li><Link href="/hotels" className="hover:text-white transition-colors" prefetch>Hôtels</Link></li>
              <li><Link href="/restaurants" className="hover:text-white transition-colors" prefetch>Restaurants</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Communauté</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/events" className="hover:text-white transition-colors" prefetch>Événements</Link></li>
              <li><Link href="/culture" className="hover:text-white transition-colors" prefetch>Culture</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors" prefetch>Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors" prefetch>À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors" prefetch>Nous contacter</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {APP_NAME}. Tous droits réservés. Fait avec ❤️ pour Kpalimé.
        </div>
      </div>
    </footer>
  );
}
