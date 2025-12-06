'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-[#1A1A1F] rounded-lg group">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4
          className="font-serif text-[#F5F5F5] truncate"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {item.name}
        </h4>
        <p className="text-[#8A8A8E] text-sm capitalize">{item.difficulty}</p>
        <p className="text-[#C9A227] font-semibold mt-1">${item.price}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-[#8A8A8E] hover:text-[#ef4444] transition-colors self-start"
        aria-label={`Remove ${item.name} from cart`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

