import Link from 'next/link';
import {
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube,
  ShoppingBag, Palmtree, Hotel, UtensilsCrossed, CalendarDays, Wrench, Palette,
  Info, HelpCircle, FileText, ShieldCheck,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
    { href: '/tourism', label: 'Tourisme', icon: Palmtree },
    { href: '/hotels', label: 'Hôtels', icon: Hotel },
    { href: '/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { href: '/events', label: 'Événements', icon: CalendarDays },
    { href: '/services', label: 'Services', icon: Wrench },
    { href: '/culture', label: 'Culture', icon: Palette },
  ];

  const infoLinks = [
    { href: '/about', label: 'À propos', icon: Info },
    { href: '/contact', label: 'Nous contacter', icon: HelpCircle },
    { href: '/terms', label: "Conditions d'utilisation", icon: FileText },
    { href: '/privacy', label: 'Politique de confidentialité', icon: ShieldCheck },
  ];

  return (
    <footer className="bg-night-deep border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-emerald-brand flex items-center justify-center text-white font-bold">
                KT
              </div>
              <h3 className="font-bold text-lg text-white">{APP_NAME}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-5">
              La plateforme numérique de référence de Kpalimé. Commerce, tourisme, culture et services locaux réunis en un seul endroit.
            </p>
            <div className="flex gap-2">
              {[
                { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
                { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
                { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
                { href: 'https://youtube.com', label: 'YouTube', icon: Youtube },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-muted hover:bg-emerald-brand hover:text-white hover:border-emerald-brand transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
              Explorer
              <span className="h-0.5 w-8 bg-gold rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch
                      className="group flex items-center gap-2.5 text-sm text-muted hover:text-white transition-colors"
                    >
                      <Icon size={16} className="text-emerald-brand group-hover:text-gold transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
              Informations
              <span className="h-0.5 w-8 bg-gold rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch
                      className="group flex items-center gap-2.5 text-sm text-muted hover:text-white transition-colors"
                    >
                      <Icon size={16} className="text-emerald-brand group-hover:text-gold transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
              Contact
              <span className="h-0.5 w-8 bg-gold rounded-full" />
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <MapPin size={16} className="text-emerald-brand shrink-0 mt-0.5" />
                <span>Kpalimé, Région des Plateaux, Togo</span>
              </li>
              <li>
                <a href="tel:+22890000000" className="flex items-center gap-2.5 text-sm text-muted hover:text-white transition-colors">
                  <Phone size={16} className="text-emerald-brand shrink-0" />
                  <span>+228 90 00 00 00</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@kpalime-trad.tg" className="flex items-center gap-2.5 text-sm text-muted hover:text-white transition-colors">
                  <Mail size={16} className="text-emerald-brand shrink-0" />
                  <span>contact@kpalime-trad.tg</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
          <p>© {currentYear} {APP_NAME}. Tous droits réservés.</p>
          <p>
            Fait avec <span className="text-gold">★</span> pour Kpalimé
          </p>
        </div>
      </div>
    </footer>
  );
}