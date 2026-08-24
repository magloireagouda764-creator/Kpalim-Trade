'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Price } from '@/components/currency/Price';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      <button onClick={() => setOpen(true)} className="relative touch-target p-2 text-kpalime-dark hover:text-kpalime-green transition-colors" aria-label="Panier">
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-kpalime-earth rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl animate-slide-up md:animate-none flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Panier ({totalItems})</h2>
              <button onClick={() => setOpen(false)} className="touch-target p-2 text-gray-400 hover:text-gray-600" aria-label="Fermer">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-center py-12 text-gray-400">Votre panier est vide</p>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                      <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <Price amount={item.price} className="text-sm text-kpalime-green" />
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="touch-target w-7 h-7 rounded border flex items-center justify-center text-sm" disabled={item.quantity <= 1}>−</button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="touch-target w-7 h-7 rounded border flex items-center justify-center text-sm" disabled={item.quantity >= item.stock}>+</button>
                        <button onClick={() => removeItem(item.productId)} className="ml-auto text-xs text-red-500 touch-target px-2">Supprimer</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <Price amount={totalPrice} />
                </div>
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  <Button className="w-full touch-target">Passer la commande</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
