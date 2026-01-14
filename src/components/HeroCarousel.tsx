'use client';

import { useState, useEffect, useCallback } from 'react';
import { heroVideos } from '@/data/mockData';
import VideoCard from './VideoCard';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroVideos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + heroVideos.length) % heroVideos.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 15000); // 15 seconds per slide
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden purple-gradient pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A1D6A]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2D1B4E]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Text */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-4">
            The Art of Human Connection
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Get Hugs from <span className="text-[#C9A227]">Strangers</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8A8A8E] max-w-2xl mx-auto">
            Transform every interaction into a memorable connection. Master the social skills that turn strangers into friends—magic is just the icebreaker.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Wrapper */}
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Previous Card (Hidden on Mobile) */}
            <div className="hidden lg:block w-64 opacity-40 scale-90 transition-all duration-500">
              <VideoCard
                video={heroVideos[(activeIndex - 1 + heroVideos.length) % heroVideos.length]}
                isActive={false}
              />
            </div>

            {/* Active Card */}
            <div className="w-full max-w-sm md:max-w-md transition-all duration-500 animate-fade-in-up">
              <VideoCard video={heroVideos[activeIndex]} isActive={true} />
            </div>

            {/* Next Card (Hidden on Mobile) */}
            <div className="hidden lg:block w-64 opacity-40 scale-90 transition-all duration-500">
              <VideoCard
                video={heroVideos[(activeIndex + 1) % heroVideos.length]}
                isActive={false}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[rgba(201,162,39,0.3)] bg-[#0A0A0B]/80 backdrop-blur flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0A0A0B] transition-all group"
            aria-label="Previous video"
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[rgba(201,162,39,0.3)] bg-[#0A0A0B]/80 backdrop-blur flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0A0A0B] transition-all group"
            aria-label="Next video"
          >
            <svg
              className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {heroVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-[#C9A227]'
                  : 'bg-[#8A8A8E]/50 hover:bg-[#8A8A8E]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2 text-[#8A8A8E]">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

