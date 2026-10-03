import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ShoppingBag,
  Palmtree,
  Hotel,
  UtensilsCrossed,
  CalendarDays,
  Wrench,
  Palette,
  Info,
  HelpCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kpalime-dark text-white mt-auto">
      {/* Bandeau principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1 : À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-kpalime-green flex items-center justify-center text-white font-bold">
                KT
              </div>
              <h3 className="font-bold text-lg">{APP_NAME}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              La plateforme numérique de référence de Kpalimé. Commerce, tourisme, culture et services locaux réunis en un seul endroit.
            </p>
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-kpalime-green flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-kpalime-green flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-kpalime-green flex items-center justify-center transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-kpalime-green flex items-center justify-center transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Explorer */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Explorer</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
                { href: '/tourism', label: 'Tourisme', icon: Palmtree },
                { href: '/hotels', label: 'Hôtels', icon: Hotel },
                { href: '/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
                { href: '/events', label: 'Événements', icon: CalendarDays },
                { href: '/services', label: 'Services', icon: Wrench },
                { href: '/culture', label: 'Culture', icon: Palette },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch
                      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon size={14} className="text-kpalime-green group-hover:text-white transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Colonne 3 : Informations */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Informations</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'À propos', icon: Info },
                { href: '/contact', label: 'Nous contacter', icon: HelpCircle },
                { href: '/terms', label: "Conditions d'utilisation", icon: FileText },
                { href: '/privacy', label: 'Politique de confidentialité', icon: ShieldCheck },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch
                      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon size={14} className="text-kpalime-green group-hover:text-white transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-kpalime-green shrink-0 mt-0.5" />
                <span>Kpalimé, Région des Plateaux, Togo</span>
              </li>
              <li>
                <a
                  href="tel:+22890000000"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-kpalime-green shrink-0" />
                  <span>+228 90 00 00 00</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@kpalime-trad.tg"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-kpalime-green shrink-0" />
                  <span>contact@kpalime-trad.tg</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bandeau copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {currentYear} {APP_NAME}. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Fait avec <span className="text-red-500">❤</span> pour Kpalimé 🇹🇬
          </p>
        </div>
      </div>
    </footer>
  );
}