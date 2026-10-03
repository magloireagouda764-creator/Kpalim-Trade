import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-kpalime-sand/30 via-white to-kpalime-green/5">
      <div className="w-full max-w-md animate-slide-up">
        <Link
          href="/"
          prefetch
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-kpalime-green mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
        {children}
      </div>
    </div>
  );
}