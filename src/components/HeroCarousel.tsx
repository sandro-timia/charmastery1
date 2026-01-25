'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { heroVideos } from '@/data/mockData';
import VideoCard from './VideoCard';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = heroVideos.length;
  const [youtubeModalId, setYoutubeModalId] = useState<string | null>(null);

  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
    }

    autoAdvanceRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
  }, [totalSlides]);

  useEffect(() => {
    startAutoAdvance();

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [startAutoAdvance]);

  // Preload hero media (GIFs and videos) so side cards animate immediately
  useEffect(() => {
    heroVideos.forEach((v) => {
      const isVideo = /\.(mp4|webm|ogg|mov)(\?|$)/i.test(v.gifUrl);
      if (isVideo) {
        // Preload video
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = v.gifUrl;
      } else {
        // Preload image/GIF
        const img = new Image();
        img.src = v.gifUrl;
      }
      // Always preload poster
      const poster = new Image();
      poster.src = v.posterUrl;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    startAutoAdvance();
  }, [startAutoAdvance, totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAutoAdvance();
  }, [startAutoAdvance, totalSlides]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    startAutoAdvance();
  };

  const openYoutubeModal = useCallback((id: string) => {
    setYoutubeModalId(id);
  }, []);

  const closeYoutubeModal = useCallback(() => {
    setYoutubeModalId(null);
  }, []);

  useEffect(() => {
    if (!youtubeModalId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeYoutubeModal();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [youtubeModalId, closeYoutubeModal]);

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
            El Arte de la Conexión Humana
            <span className="block text-[#C4C4CC] text-xs tracking-[0.15em] mt-1 normal-case">Mago y Mentalista Sandro Calzada</span>
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <span className="text-[#9B7ED9]">Magia</span> que Consigue Abrazos de <span className="text-[#C9A227]">Desconocidos</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8A8A8E] max-w-2xl mx-auto">
            Aprende los mejores trucos de magia y mentalismo para transformar cada interacción en una conexión memorable y domina las habilidades sociales que convierten desconocidos en amigos.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative lg:pb-12">
          {/* Mobile / Tablet: single card */}
          <div className="lg:hidden flex items-center justify-center">
            <div className="w-full max-w-xs md:max-w-sm transition-all duration-500 animate-fade-in-up">
              <VideoCard
                video={heroVideos[activeIndex]}
                isActive={true}
                onWatchFullPerformance={() => {
                  const el = document.getElementById('mastery-program');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              />
            </div>
          </div>

          {/* Desktop: 3D perspective carousel */}
          <div className="hidden lg:block relative mx-auto w-full max-w-6xl h-[470px] [perspective:1400px]">
            <div className="relative w-full h-full [transform-style:preserve-3d]">
              {heroVideos.map((video, index) => {
                const rawOffset = (index - activeIndex + totalSlides) % totalSlides;
                const offset =
                  rawOffset === totalSlides - 1 ? -1 : rawOffset === 1 ? 1 : rawOffset === 0 ? 0 : 999;

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;
                const isVisible = isCenter || isLeft || isRight;

                const transform =
                  offset === 0
                    ? 'translate3d(0px, 0px, 105px) scale(1) rotateY(0deg)'
                    : offset === -1
                      ? 'translate3d(-275px, 10px, 0px) scale(0.82) rotateY(40deg)'
                      : offset === 1
                        ? 'translate3d(275px, 10px, 0px) scale(0.82) rotateY(-40deg)'
                        : 'translate3d(0px, 0px, -600px) scale(0.7) rotateY(0deg)';

                return (
                  <div
                    key={video.id}
                    className={[
                      'absolute left-1/2 top-1/2',
                      'transition-[transform,opacity] duration-700',
                      'ease-[cubic-bezier(0.2,0.8,0.2,1)]',
                      'will-change-[transform]',
                      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
                      isCenter ? 'z-30' : 'z-20',
                    ].join(' ')}
                    style={{
                      transform: `translate(-50%, -50%) ${transform}`,
                    }}
                  >
                    <div className={isCenter ? 'w-[360px]' : 'w-[300px]'}>
                      <VideoCard
                        video={video}
                        isActive={isCenter}
                        onWatchFullPerformance={
                          isCenter ? () => {
                            const el = document.getElementById('mastery-program');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          } : undefined
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[rgba(201,162,39,0.3)] bg-[#0A0A0B]/80 backdrop-blur flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0A0A0B] transition-all group"
            aria-label="Video anterior"
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
            aria-label="Siguiente video"
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

        {/* Navigation Controls Container */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3">
            {heroVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-[#C9A227]'
                    : 'bg-[#8A8A8E]/50 hover:bg-[#8A8A8E]'
                }`}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Cue */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('tricks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 rounded-full border border-[rgba(201,162,39,0.22)] bg-[#0A0A0B]/60 backdrop-blur px-5 py-3 text-xs uppercase tracking-widest text-[#8A8A8E] hover:text-[#F5F5F5] hover:border-[rgba(201,162,39,0.35)] transition"
            aria-label="Desplázate para explorar"
          >
            <span className="relative inline-flex h-6 w-4 items-start justify-center rounded-full border border-[rgba(201,162,39,0.25)]">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-[#C9A227]" />
            </span>
            <span>Desplázate para explorar</span>
            <svg className="w-4 h-4 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* YouTube Modal */}
      {youtubeModalId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Video de actuación completa"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeYoutubeModal();
          }}
        >
          {/* Video + CTA Container */}
          <div className="flex flex-col items-center gap-4 w-full max-w-5xl px-4">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[rgba(201,162,39,0.25)] bg-[#0A0A0B] shadow-2xl">
              <button
                type="button"
                onClick={closeYoutubeModal}
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
                aria-label="Cerrar video"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeModalId}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* CTA Banner - Below Video */}
            <button
              type="button"
              onClick={() => {
                closeYoutubeModal();
                setTimeout(() => {
                  const el = document.getElementById('mastery-program');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
              className="group"
            >
              <div className="px-6 py-3 bg-[#C9A227] hover:bg-[#D4AF37] rounded-full shadow-[0_0_25px_rgba(201,162,39,0.6)] hover:shadow-[0_0_35px_rgba(201,162,39,0.8)] transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0A0A0B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-[#0A0A0B] font-bold tracking-wide">Aprende a hacerlo</span>
                  <svg className="w-4 h-4 text-[#0A0A0B] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

