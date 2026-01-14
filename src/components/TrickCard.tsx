'use client';

import Image from 'next/image';
import { Trick } from '@/data/mockData';

interface TrickCardProps {
  trick: Trick;
  index: number;
}

export default function TrickCard({ trick, index }: TrickCardProps) {
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
        <p className="text-[#8A8A8E] text-sm line-clamp-2">
          {trick.description}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_rgba(201,162,39,0.1)]" />
      </div>
    </div>
  );
}

