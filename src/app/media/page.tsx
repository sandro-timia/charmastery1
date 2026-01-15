'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { mediaItems, MediaItem } from '@/data/mockData';
import VideoModal from '@/components/VideoModal';

type CategoryTab = 'tutorials' | 'charm-tips' | 'footages';

const categories: { id: CategoryTab; label: string; description: string }[] = [
  {
    id: 'tutorials',
    label: 'Tutorials',
    description: 'Step-by-step trick tutorials to master your craft',
  },
  {
    id: 'charm-tips',
    label: 'Charm Tips',
    description: 'Social mastery and rapport building techniques',
  },
  {
    id: 'footages',
    label: 'Footages',
    description: 'Live performance recordings from around the world',
  },
];

export default function MediaPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('tutorials');
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth?next=media');
    }
  }, [user, isLoading, router]);

  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const currentCategoryInfo = categories.find((c) => c.id === activeCategory);

  const handleVideoClick = (video: MediaItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-[#C9A227] text-lg animate-pulse">Loading...</div>
      </main>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#4A1D6A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#C9A227]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-xs mb-3">
            Exclusive Content
          </span>
          <h1
            className="text-3xl md:text-5xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Media Library
          </h1>
          <p className="text-[#8A8A8E] max-w-2xl mx-auto">
            Welcome back! Explore our collection of tutorials, charm tips, and exclusive footage.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#C9A227] text-[#0A0A0B] font-semibold shadow-[0_0_20px_rgba(201,162,39,0.3)]'
                  : 'bg-[#1A1A1F] text-[#8A8A8E] hover:text-[#F5F5F5] hover:bg-[#2A2A2F] border border-[#2A2A2F]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <p className="text-center text-[#8A8A8E] mb-10 text-sm sm:text-base">
          {currentCategoryInfo?.description}
        </p>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleVideoClick(item)}
              className="group relative aspect-video rounded-xl overflow-hidden gold-border bg-[#1A1A1F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#0A0A0B]"
            >
              {/* Thumbnail */}
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C9A227]/90 flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A0A0B] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3
                  className="text-[#F5F5F5] text-base sm:text-lg font-serif mb-1 text-left"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.title}
                </h3>
                {item.category === 'charm-tips' && (
                  <p className="text-[#8A8A8E] text-xs sm:text-sm text-left line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C9A227]/50 rounded-xl transition-colors duration-300 pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#8A8A8E] text-lg">No content available in this category yet.</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
