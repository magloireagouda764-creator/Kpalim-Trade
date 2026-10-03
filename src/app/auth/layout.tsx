import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-night via-night-light to-night relative overflow-hidden">
      {/* Halos décoratifs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="w-full max-w-md relative animate-slide-up">
        <Link
          href="/"
          prefetch
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
        {children}
      </div>
    </div>
  );
}