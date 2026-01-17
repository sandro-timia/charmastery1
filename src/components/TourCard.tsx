import { Tour } from '@/data/mockData';

interface TourCardProps {
  tour: Tour;
  index: number;
}

export default function TourCard({ tour, index }: TourCardProps) {
  return (
    <div
      className={`group relative glass rounded-lg p-6 gold-border card-lift animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Location Info */}
        <div className="flex items-start gap-4">
          {/* Map Pin Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2D1B4E]/50 border border-[#4A1D6A] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#C9A227]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* City & Country */}
          <div>
            <h3
              className="text-xl md:text-2xl font-serif text-[#F5F5F5] group-hover:text-[#C9A227] transition-colors"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {tour.city}, {tour.country}
            </h3>
            <p className="text-[#8A8A8E] text-sm">{tour.venue}</p>
          </div>
        </div>

        {/* Date & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          {/* Date */}
          <div className="text-left sm:text-right">
            <p className="text-[#C9A227] font-medium">{tour.date}</p>
            {typeof tour.spotsLeft === 'number' && (
              <p className="text-[#8A8A8E] text-sm">
                Quedan <span className="text-[#ef4444]">{tour.spotsLeft}</span> plazas disponibles
              </p>
            )}
          </div>

          {/* Reserve Button */}
          <button className="btn-gold whitespace-nowrap">
            Reserva Tu Plaza
          </button>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

