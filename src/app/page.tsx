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
          <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-4">
            Why This Investment
          </span>
          <h2
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            The Charmastery Difference
          </h2>
          <p className="text-[#8A8A8E] text-lg leading-relaxed mb-8">
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
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div>
              <p className="text-4xl md:text-5xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                50+
              </p>
              <p className="text-[#8A8A8E] text-sm mt-2">Connection Techniques</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                2K+
              </p>
              <p className="text-[#8A8A8E] text-sm mt-2">Elite Members</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                25
              </p>
              <p className="text-[#8A8A8E] text-sm mt-2">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
