import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ClientProviders } from '@/components/layout/ClientProviders';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://kpalime-trad.vercel.app',
    siteName: APP_NAME,
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: APP_NAME }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ['/og-default.svg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#2D5A27',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.className}>
      <body className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-gray-50">
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <ToastProvider>
                <Header />
                <main className="flex-1">
                  <ClientProviders>{children}</ClientProviders>
                </main>
                <Footer />
                <MobileNav />
              </ToastProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}