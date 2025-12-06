'use client';

import { useState, useRef, useEffect } from 'react';
import { HeroVideo } from '@/data/mockData';

interface VideoCardProps {
  video: HeroVideo;
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked
        });
        setVideoEnded(false);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden gold-border gold-glow-hover card-lift group">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.posterUrl}
        muted
        playsInline
        onEnded={handleVideoEnd}
        onLoadedData={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#1A1A1F] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Title (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className="text-xl md:text-2xl font-serif text-[#F5F5F5] mb-2"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {video.title}
        </h3>
        {!videoEnded && (
          <div className="flex items-center gap-2 text-[#8A8A8E] text-sm">
            <span className="w-2 h-2 bg-[#C9A227] rounded-full animate-pulse" />
            <span>Now Playing</span>
          </div>
        )}
      </div>

      {/* CTA Overlay (when video ends) */}
      <div
        className={`absolute inset-0 bg-[#0A0A0B]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${
          videoEnded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#C9A227] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#C9A227]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h4
            className="text-2xl font-serif text-[#F5F5F5] mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Want to learn this?
          </h4>
          <p className="text-[#8A8A8E] mb-6 text-sm">
            Unlock the complete tutorial and master this illusion
          </p>
          <button className="btn-gold-filled w-full max-w-xs">
            See Full Explanation — ${video.price}
          </button>
          <button
            onClick={handleReplay}
            className="mt-4 text-[#8A8A8E] hover:text-[#C9A227] text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Replay Video
          </button>
        </div>
      </div>
    </div>
  );
}

