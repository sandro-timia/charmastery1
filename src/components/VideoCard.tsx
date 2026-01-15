'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroVideo } from '@/data/mockData';

interface VideoCardProps {
  video: HeroVideo;
  isActive: boolean;
  onWatchFullPerformance?: () => void;
}

export default function VideoCard({ video, isActive, onWatchFullPerformance }: VideoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [gifKey, setGifKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Reset GIF when card becomes active
  useEffect(() => {
    if (isActive) {
      // Reset GIF by changing key (forces reload)
      setGifKey((prev) => prev + 1);
    }
  }, [isActive]);

  // Ensure loading state resolves even if image is already cached
  useEffect(() => {
    // when the src changes, show loader until we confirm it's complete
    setIsLoaded(false);

    const img = imgRef.current;
    if (img && img.complete) {
      setIsLoaded(true);
    }
  }, [gifKey, hasError, video.gifUrl, video.posterUrl]);

  return (
    <div className="relative w-full">
      {/* Media Frame */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden gold-border gold-glow-hover card-lift group">
        {/* GIF */}
        <img
          ref={imgRef}
          key={gifKey}
          src={hasError ? video.posterUrl : video.gifUrl}
          alt={video.title}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // Avoid infinite spinner if a 3rd-party GIF host blocks requests
            setHasError(true);
            setIsLoaded(true);
          }}
          loading="eager"
          decoding="async"
          className={[
            'absolute inset-0 w-full h-full object-cover',
            // Subtle dim for side cards without CSS filters (keeps GIF animation reliable)
            isActive ? '' : 'opacity-80',
          ].join(' ')}
        />

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#1A1A1F] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 video-overlay" />

        {/* Extra dim overlay for side cards */}
        {!isActive && <div className="absolute inset-0 bg-black/20" />}

        {/* Active Title (inside the frame) */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3
              className="text-xl md:text-2xl font-serif text-[#F5F5F5] mb-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {video.title}
            </h3>
            {onWatchFullPerformance && (
              <button
                type="button"
                onClick={onWatchFullPerformance}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#C9A227] px-5 py-3 text-sm font-semibold text-[#0A0A0B] transition-all hover:bg-[#D4AF37] hover:shadow-[0_0_24px_rgba(201,162,39,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
                aria-label={`Ver video: ${video.title}`}
              >
                <span className="uppercase tracking-wider">Ver video</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Side Cards: keep the box, move text outside */}
      {!isActive && (
        <div className="absolute left-0 right-0 top-full mt-3 px-2">
          <p
            className="text-base md:text-lg leading-snug font-serif text-[#F5F5F5] text-center whitespace-normal break-words"
            style={{ fontFamily: 'var(--font-serif)' }}
            title={video.title}
          >
            {video.title}
          </p>
        </div>
      )}
    </div>
  );
}
