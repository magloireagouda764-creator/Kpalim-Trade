import Image from 'next/image';
import { Price } from '@/components/currency/Price';

interface Props {
  item: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    isLocal: boolean;
    dietaryTags: string[];
  };
}

export function MenuItemComponent({ item }: Props) {
  return (
    <div className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
      {item.image && (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm">{item.name}</h4>
          {item.isLocal && <span className="px-1.5 py-0.5 text-[10px] bg-kpalime-earth/10 text-kpalime-earth rounded font-bold">Local</span>}
        </div>
        {item.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>}
        {item.dietaryTags.length > 0 && (
          <div className="flex gap-1 mt-1">
            {item.dietaryTags.map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-gray-100 text-gray-500 rounded">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <Price amount={item.price} className="text-sm shrink-0" />
    </div>
  );
}
