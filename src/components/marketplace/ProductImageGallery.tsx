'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: { secure_url: string; public_id: string }[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-square bg-gray-100 rounded-xl" />;
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
        <Image src={images[active].secure_url} alt={alt} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={img.public_id} onClick={() => setActive(i)} className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors touch-target ${i === active ? 'border-kpalime-green' : 'border-transparent'}`}>
              <div className="w-full h-full relative">
                <Image src={img.secure_url} alt="" fill className="object-cover" sizes="64px" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
