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
            Your Social Toolkit
          </span>
          <h2
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Break the Ice Instantly
          </h2>
          <p className="text-[#8A8A8E] max-w-2xl mx-auto">
            Each technique comes with detailed video tutorials, real-world performance tips, and live footages of genuine reactions.
          </p>
          <div className="section-divider mt-8" />
        </div>

        {/* Tricks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tricks.map((trick, index) => (
            <TrickCard key={trick.id} trick={trick} index={index} />
          ))}
        </div>

        {/* Full Pass CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-[#1A1A1F] to-[#2D1B4E]/30 rounded-2xl p-8 md:p-12 gold-border relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227]/5 via-transparent to-[#C9A227]/5 pointer-events-none" />
            
            <div className="relative">
              <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-3">
                Invest in Yourself
              </span>
              <h3
                className="text-3xl md:text-4xl font-serif text-[#F5F5F5] mb-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Complete Mastery Program
              </h3>
              <p className="text-[#8A8A8E] max-w-lg mx-auto mb-6">
                Gain lifetime access to all {tricks.length} connection techniques, video tutorials, live footages, and the social frameworks that transform how people respond to you.
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-4xl font-bold text-[#C9A227]">$497</span>
                <span className="text-[#8A8A8E] text-sm">one-time investment</span>
              </div>
              
              <button className="btn-gold inline-flex items-center gap-3 px-8 py-4 text-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Begin Your Transformation
              </button>
              
              <p className="text-[#8A8A8E] text-sm mt-4">
                ✓ Lifetime access &nbsp;•&nbsp; ✓ All future updates &nbsp;•&nbsp; ✓ 30-day money back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

