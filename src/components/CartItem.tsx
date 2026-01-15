'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

// Magic Wand Icon component
function MagicWandIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wand body - black with gold outline */}
      <rect
        x="4"
        y="17"
        width="16"
        height="4"
        rx="1"
        transform="rotate(-45 4 17)"
        fill="#1A1A1F"
        stroke="#C9A227"
        strokeWidth="1"
      />
      {/* White tip */}
      <rect
        x="16"
        y="5"
        width="5"
        height="4"
        rx="1"
        transform="rotate(-45 16 5)"
        fill="#F5F5F5"
      />
      {/* Sparkles */}
      <circle cx="20" cy="4" r="1" fill="#C9A227" />
      <circle cx="22" cy="7" r="0.7" fill="#C9A227" />
      <circle cx="18" cy="2" r="0.7" fill="#C9A227" />
    </svg>
  );
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();
  const isMasteryProgram = item.id === 1000;

  return (
    <div className="flex gap-4 p-4 bg-[#1A1A1F] rounded-lg group">
      {/* Icon/Thumbnail */}
      {isMasteryProgram ? (
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
          <MagicWandIcon />
        </div>
      ) : (
        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4
          className="font-serif text-[#F5F5F5] truncate"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {item.name}
        </h4>
        {!isMasteryProgram && (
          <p className="text-[#8A8A8E] text-sm capitalize">{item.difficulty}</p>
        )}
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

