'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

interface Props {
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
}

export function AddToCartButton({ productId, name, price, image, stock }: Props) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find((i) => i.productId === productId);
  const canAdd = stock > 0 && (!inCart || inCart.quantity < stock);

  const handleAdd = () => {
    if (!canAdd) return;
    addItem({ productId, name, price, image, stock });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (stock === 0) {
    return <Button disabled variant="outline" className="w-full">Rupture de stock</Button>;
  }

  return (
    <Button onClick={handleAdd} disabled={!canAdd} className="w-full touch-target" variant={added ? 'secondary' : 'primary'}>
      {added ? '✓ Ajouté' : inCart ? `Dans le panier (${inCart.quantity})` : 'Ajouter au panier'}
    </Button>
  );
}
