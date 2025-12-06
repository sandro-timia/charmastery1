'use client';

import { tricks } from '@/data/mockData';
import TrickCard from './TrickCard';

export default function TricksGrid() {
  return (
    <section id="tricks" className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#2D1B4E]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#2D1B4E]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-4">
            Our Collection
          </span>
          <h2
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Master the Impossible
          </h2>
          <p className="text-[#8A8A8E] max-w-2xl mx-auto">
            Each trick comes with detailed video tutorials, performance tips, and insider secrets 
            from professional magicians.
          </p>
          <div className="section-divider mt-8" />
        </div>

        {/* Tricks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tricks.map((trick, index) => (
            <TrickCard key={trick.id} trick={trick} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-gold inline-flex items-center gap-2">
            View All Tricks
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

