'use client';

import Image from 'next/image';
import { Trick } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

interface TrickCardProps {
  trick: Trick;
  index: number;
}

export default function TrickCard({ trick, index }: TrickCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(trick.id);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'badge-beginner';
      case 'Intermediate':
        return 'badge-intermediate';
      case 'Advanced':
        return 'badge-advanced';
      default:
        return 'badge-beginner';
    }
  };

  return (
    <div
      className={`group relative bg-[#1A1A1F] rounded-lg overflow-hidden gold-border card-lift animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={trick.thumbnail}
          alt={trick.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F] via-transparent to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-[#0A0A0B]/80 backdrop-blur px-3 py-1 rounded">
          <span className="text-[#C9A227] font-semibold">${trick.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Difficulty Badge */}
        <span className={`badge ${getDifficultyClass(trick.difficulty)} mb-3`}>
          {trick.difficulty}
        </span>

        {/* Title */}
        <h3
          className="text-xl font-serif text-[#F5F5F5] mb-2 group-hover:text-[#C9A227] transition-colors"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {trick.name}
        </h3>

        {/* Description */}
        <p className="text-[#8A8A8E] text-sm mb-4 line-clamp-2">
          {trick.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(trick)}
          disabled={inCart}
          className={`w-full py-3 text-sm uppercase tracking-wider font-medium transition-all ${
            inCart
              ? 'bg-[#2D1B4E] text-[#8A8A8E] cursor-not-allowed border border-[#4A1D6A]'
              : 'btn-gold'
          }`}
        >
          {inCart ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Cart
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_rgba(201,162,39,0.1)]" />
      </div>
    </div>
  );
}

