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

      {/* About Section (Placeholder) */}
      <section id="about" className="py-24 bg-[#121214]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-sm mb-4">
            The Art of Wonder
          </span>
          <h2
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            About Charmastery
          </h2>
          <p className="text-[#8A8A8E] text-lg leading-relaxed mb-8">
            Founded by world-renowned illusionists, Charmastery is dedicated to preserving 
            and sharing the ancient art of magic. Our carefully curated collection of tricks 
            ranges from classic sleight of hand to modern mentalism, each taught with the 
            precision and passion that only true masters can provide.
          </p>
          <p className="text-[#8A8A8E] leading-relaxed">
            Whether you&apos;re a curious beginner or a seasoned performer, our tutorials 
            will elevate your craft and unlock secrets that have captivated audiences for centuries.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div>
              <p className="text-4xl md:text-5xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                50+
              </p>
              <p className="text-[#8A8A8E] text-sm mt-2">Premium Tutorials</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                10K+
              </p>
              <p className="text-[#8A8A8E] text-sm mt-2">Students Worldwide</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                25
              </p>
              <p className="text-[#8A8A8E] text-sm mt-2">Countries Visited</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
