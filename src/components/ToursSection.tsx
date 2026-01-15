'use client';

import { tours } from '@/data/mockData';
import TourCard from './TourCard';

export default function ToursSection() {
  return (
    <section id="tours" className="py-16 bg-[#121214] relative overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 world-map-bg opacity-30" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-4">
            Eventos en Vivo
          </span>
          <h2
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Aprende en Persona
          </h2>
          <p className="text-[#8A8A8E] max-w-2xl mx-auto">
            Únete a talleres exclusivos alrededor del mundo. Plazas limitadas disponibles para 
            experiencias de aprendizaje íntimas y prácticas.
          </p>
          <div className="section-divider mt-8" />
        </div>

        {/* Tours List */}
        <div className="space-y-4">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#8A8A8E] mb-4">
            ¿Quieres saber cuándo venimos a tu ciudad?
          </p>
          <button className="btn-gold inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Recibir Notificaciones de Giras
          </button>
        </div>
      </div>
    </section>
  );
}

