'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }
interface ToastCtx { addToast: (message: string, type?: Toast['type']) => void; }

const Ctx = createContext<ToastCtx>({ addToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-kpalime-dark' };

  return (
    <Ctx.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-4 right-4 z-[80] space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className={cn('px-4 py-3 rounded-lg text-white text-sm font-medium shadow-lg animate-slide-up pointer-events-auto', colors[t.type])}>
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() { return useContext(Ctx); }
