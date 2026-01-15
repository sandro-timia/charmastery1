import HeroCarousel from '@/components/HeroCarousel';
import TricksGrid from '@/components/TricksGrid';
import ToursSection from '@/components/ToursSection';
import SignUpSection from '@/components/SignUpSection';

export default function Home() {
  return (
    <main>
      {/* Hero Section with Video Carousel */}
      <HeroCarousel />

      {/* Individual Tricks Section */}
      <TricksGrid />

      {/* Upcoming Tours Section */}
      <ToursSection />

      {/* Sign Up / Newsletter Section */}
      <SignUpSection />

      {/* About Section */}
      <section id="about" className="py-24 bg-[#121214]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <details className="group mx-auto max-w-3xl rounded-2xl border border-[rgba(201,162,39,0.18)] bg-[#0A0A0B]/30 p-6 md:p-8 text-left">
            <summary className="list-none cursor-pointer select-none outline-none">
              <div className="flex items-start justify-between gap-6">
                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-3">
                    Why This Investment
                  </span>
                  <h2
                    className="text-4xl md:text-5xl font-serif text-[#F5F5F5]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    The Charmastery Difference
                  </h2>
                  <p className="text-[#8A8A8E] text-sm mt-3">
                    <span className="group-open:hidden">Click to expand</span>
                    <span className="hidden group-open:inline">Click to collapse</span>
                  </p>
                </div>

                <div className="mt-1 flex-shrink-0">
                  <div className="h-11 w-11 rounded-full border border-[rgba(201,162,39,0.25)] bg-[#0A0A0B]/60 flex items-center justify-center text-[#C9A227] transition-transform duration-300 group-open:rotate-180">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </summary>

            {/* Collapsible content */}
            <div className="overflow-hidden max-h-0 opacity-0 translate-y-2 transition-all duration-500 group-open:max-h-[900px] group-open:opacity-100 group-open:translate-y-0">
              <div className="pt-6 text-center">
                <p className="text-[#8A8A8E] text-lg leading-relaxed mb-6">
                  This isn&apos;t a magic course—it&apos;s a complete system for mastering human connection.
                  We use the art of wonder as a vehicle to teach you the social skills that open doors,
                  create instant rapport, and leave lasting impressions. Every technique is designed
                  to make you unforgettable.
                </p>
                <p className="text-[#8A8A8E] leading-relaxed">
                  Our clients are executives, entrepreneurs, and high-performers who understand that
                  the ability to connect authentically is the most valuable skill in business and life.
                  This is your competitive edge.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 md:gap-8 mt-12">
                  <div>
                    <p
                      className="text-4xl md:text-5xl font-serif text-[#C9A227]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      50+
                    </p>
                    <p className="text-[#8A8A8E] text-sm mt-2">Connection Techniques</p>
                  </div>
                  <div>
                    <p
                      className="text-4xl md:text-5xl font-serif text-[#C9A227]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      2K+
                    </p>
                    <p className="text-[#8A8A8E] text-sm mt-2">Elite Members</p>
                  </div>
                  <div>
                    <p
                      className="text-4xl md:text-5xl font-serif text-[#C9A227]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      25
                    </p>
                    <p className="text-[#8A8A8E] text-sm mt-2">Countries Reached</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
