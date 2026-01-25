'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Trick } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

interface TrickCardProps {
  trick: Trick;
  index: number;
}

export default function TrickCard({ trick, index }: TrickCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const hasBackDescription = !!trick.backDescription;
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  // Handle escape key for video modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsVideoModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isVideoModalOpen, handleKeyDown]);

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

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'Principiante';
      case 'Intermediate':
        return 'Intermedio';
      case 'Advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  const handleCardClick = () => {
    if (hasBackDescription) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleTutorialClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    
    // If user is not logged in OR hasn't paid for subscription, redirect to mastery program section
    if (!user || !user.hasSubscription) {
      if (pathname === '/') {
        // On main page, scroll to the section
        const element = document.getElementById('mastery-program');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // On other pages, navigate to main page with hash
        router.push('/#mastery-program');
      }
      return;
    }
    
    // User is logged in AND has subscription - open video modal
    if (trick.youtubeId) {
      setIsVideoModalOpen(true);
    }
  };

  const closeVideoModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVideoModalOpen(false);
  };

  // Flippable card version
  if (hasBackDescription) {
    return (
      <>
        <div
          className="animate-fade-in-up"
          style={{ 
            animationDelay: `${index * 0.1}s`, 
            opacity: 0, 
            animationFillMode: 'forwards',
            perspective: '1000px'
          }}
        >
          <div
            onClick={handleCardClick}
            className="relative w-full h-[400px] cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
          {/* Front of Card */}
          <div
            className="group absolute inset-0 bg-[#1A1A1F] rounded-lg overflow-hidden gold-border card-lift"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Click indicator */}
            <div className="absolute top-3 right-3 z-10 bg-[#C9A227]/90 text-[#0A0A0B] text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Click para ver más
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-[4/3.5] overflow-hidden">
              <Image
                src={trick.thumbnail}
                alt={trick.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                quality={75}
              />
              {/* Diagonal yellow to purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/30 via-transparent to-[#2D1B4E]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Title and Difficulty Badge */}
              <div className="flex items-center justify-between">
                <h3
                  className="text-xl font-serif text-[#F5F5F5] group-hover:text-[#C9A227] transition-colors"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {trick.name}
                </h3>
                <span className={`badge ${getDifficultyClass(trick.difficulty)} ml-2 shrink-0`}>
                  {getDifficultyLabel(trick.difficulty)}
                </span>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_rgba(201,162,39,0.1)]" />
            </div>
          </div>

          {/* Back of Card */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1A1A1F] to-[#2D1B4E]/40 rounded-lg overflow-hidden gold-border"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Content */}
            <div className="relative h-full p-5 flex flex-col">
              {/* Close hint */}
              <div className="absolute top-3 right-3 z-10 bg-[#C9A227]/90 text-[#0A0A0B] text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Click para cerrar
              </div>

              {/* Title */}
              <h3
                className="text-xl font-serif text-[#C9A227] mb-3 pr-24"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {trick.name}
              </h3>

              {/* Divider */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent mb-4" />

              {/* Full Description */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <p className="text-[#E5E5E5] text-sm leading-relaxed whitespace-pre-line">
                  {trick.backDescription}
                </p>
              </div>

              {/* Tutorial Button */}
              <div className="mt-4 pt-3 border-t border-[#C9A227]/20">
                <button
                  onClick={handleTutorialClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-[#0A0A0B] font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && trick.youtubeId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={closeVideoModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />

          {/* Modal Content */}
          <div 
            className="relative w-full max-w-5xl z-10 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Cerrar video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Title */}
            <h2
              id="video-modal-title"
              className="text-white text-xl md:text-2xl font-serif mb-4 text-center"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Tutorial: {trick.name}
            </h2>

            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl shadow-black/50 gold-border">
              <iframe
                src={`https://www.youtube.com/embed/${trick.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`Tutorial: ${trick.name}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Description */}
            <p className="text-[#8A8A8E] text-center mt-4 text-sm md:text-base">
              {trick.description}
            </p>
          </div>
        </div>
      )}
      </>
    );
  }

  // Regular card (non-flippable)
  return (
    <div
      className={`group relative bg-[#1A1A1F] rounded-lg overflow-hidden gold-border card-lift animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3.5] overflow-hidden">
        <Image
          src={trick.thumbnail}
          alt={trick.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={75}
        />
        {/* Diagonal yellow to purple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/30 via-transparent to-[#2D1B4E]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Difficulty Badge */}
        <div className="flex items-center justify-between">
          <h3
            className="text-xl font-serif text-[#F5F5F5] group-hover:text-[#C9A227] transition-colors"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {trick.name}
          </h3>
          <span className={`badge ${getDifficultyClass(trick.difficulty)} ml-2 shrink-0`}>
            {getDifficultyLabel(trick.difficulty)}
          </span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_rgba(201,162,39,0.1)]" />
      </div>
    </div>
  );
}

