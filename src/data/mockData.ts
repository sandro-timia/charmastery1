// Types
export interface Trick {
  id: number;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  thumbnail: string;
}

export interface MediaItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  category: 'tutorials' | 'charm-tips' | 'footages';
}

export interface Tour {
  id: number;
  city: string;
  country: string;
  date: string;
  venue: string;
  spotsLeft?: number;
}

export interface HeroVideo {
  id: number;
  title: string;
  gifUrl: string;
  duration: number; // duration in milliseconds
  posterUrl: string;
  youtubeId: string;
}

// Mock Tricks Data
export const tricks: Trick[] = [
  {
    id: 1,
    name: "The Vanishing Coin",
    description: "Make any coin disappear and reappear at will",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Mind Reader",
    description: "Reveal a chosen card without ever seeing it",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://images.unsplash.com/photo-1529480780361-e08c4d67a141?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Card to Impossible Location",
    description: "Transport a signed card to an impossible place",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 4,
    name: "The Floating Ring",
    description: "Levitate a borrowed ring in mid-air",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Shadow Deck",
    description: "Control any card chosen from a shuffled deck",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 6,
    name: "The Mentalist's Secret",
    description: "Read thoughts and predict choices",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Phantom Silk",
    description: "Make silk vanish and appear anywhere",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 8,
    name: "The Ambitious Card",
    description: "A signed card rises to the top repeatedly",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Invisible Deck",
    description: "The ultimate card revelation effect",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=400&h=300&fit=crop&q=80"
  }
];

// Mastery Program (used by "Begin Your Transformation" CTA)
export const masteryProgram: Trick = {
  id: 1000,
  name: 'Complete Mastery Program',
  description:
    'Lifetime access to all connection techniques, video tutorials, and social frameworks.',
  difficulty: 'Advanced',
  price: 39,
  thumbnail:
    'https://images.unsplash.com/photo-1520975693411-6a7b017ed5c3?w=400&h=300&fit=crop&q=80',
};

// Mock Tour Dates
export const tours: Tour[] = [
  {
    id: 1,
    city: "Lima",
    country: "Peru",
    date: "March 15, 2026",
    venue: "Teatro Municipal",
    spotsLeft: 12
  },
  {
    id: 2,
    city: "Madrid",
    country: "Spain",
    date: "April 22, 2026",
    venue: "Círculo de Bellas Artes",
    spotsLeft: 8
  },
  {
    id: 3,
    city: "Tokyo",
    country: "Japan",
    date: "May 10, 2026",
    venue: "Shibuya Hall",
    spotsLeft: 15
  },
  {
    id: 4,
    city: "New York",
    country: "USA",
    date: "June 5, 2026",
    venue: "The McKittrick Hotel",
    spotsLeft: 6
  },
  {
    id: 5,
    city: "London",
    country: "UK",
    date: "July 18, 2026",
    venue: "The Magic Circle",
    spotsLeft: 10
  },
  {
    id: 6,
    city: "Sydney",
    country: "Australia",
    date: "August 30, 2026",
    venue: "The Rocks Theatre",
    spotsLeft: 20
  }
];

// Hero GIFs for carousel
export const heroVideos: HeroVideo[] = [
  {
    id: 1,
    title: "Instant Connection",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzQzcWtsZ205dmE4dGNwNzg0MmE2dG9ycXBnMmljeWw5YWk0dGZ1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/POFJCzW5GXtWFRMJ1C/giphy.gif",
    posterUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzQzcWtsZ205dmE4dGNwNzg0MmE2dG9ycXBnMmljeWw5YWk0dGZ1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/POFJCzW5GXtWFRMJ1C/giphy.gif",
    duration: 1000,
    // TODO: replace with your real full-performance YouTube video ID
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Break the Ice",
    gifUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-819.35b52617.gif",
    posterUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-819.35b52617.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Create Wonder",
    gifUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-825.785bafb6.gif",
    posterUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-825.785bafb6.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Unforgettable Moments",
    gifUrl: "https://media1.tenor.com/m/iFVXlWJ-sPoAAAAd/pose-mini-dress.gif",
    posterUrl: "https://media1.tenor.com/m/iFVXlWJ-sPoAAAAd/pose-mini-dress.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 5,
    title: "Social Mastery",
    gifUrl: "https://chumley.barstoolsports.com/union/2024/01/01/hot-girl-gif-46.5e54689e.jpg?fit=bounds&format=pjpg&auto=webp&quality=85%2C75&width=1200",
    posterUrl: "https://chumley.barstoolsports.com/union/2024/01/01/hot-girl-gif-46.5e54689e.jpg?fit=bounds&format=pjpg&auto=webp&quality=85%2C75&width=1200",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  }
];

// Media Library Content
export const mediaItems: MediaItem[] = [
  // Tutorials - Step-by-step trick tutorials
  {
    id: 1,
    title: "The Vanishing Coin",
    description: "Learn the classic coin vanish that will leave everyone speechless",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorials"
  },
  {
    id: 2,
    title: "Card Control Basics",
    description: "Master the fundamental card controls every magician needs",
    thumbnail: "https://images.unsplash.com/photo-1529480780361-e08c4d67a141?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorials"
  },
  {
    id: 3,
    title: "The Double Lift",
    description: "Perfect the double lift technique for seamless card magic",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorials"
  },
  {
    id: 4,
    title: "Palm Techniques",
    description: "Essential palming methods for coins and small objects",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorials"
  },
  {
    id: 5,
    title: "The Ambitious Card",
    description: "Make a signed card rise to the top of the deck repeatedly",
    thumbnail: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorials"
  },
  {
    id: 6,
    title: "Invisible Thread Work",
    description: "Create impossible levitations with invisible thread techniques",
    thumbnail: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorials"
  },

  // Charm Tips - Social rapport and connection advice
  {
    id: 7,
    title: "First Impressions",
    description: "How to captivate someone within the first 30 seconds of meeting them",
    thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 8,
    title: "Reading Body Language",
    description: "Decode subtle cues to understand what people are really thinking",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 9,
    title: "The Art of Storytelling",
    description: "Transform any magic trick into an unforgettable narrative experience",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 10,
    title: "Building Rapport Instantly",
    description: "Psychological techniques to create immediate connection with strangers",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 11,
    title: "Voice & Presence",
    description: "Command attention through vocal tonality and stage presence",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 12,
    title: "Handling Hecklers",
    description: "Turn challenging audience members into your biggest fans",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },

  // Footages - Live performance recordings
  {
    id: 13,
    title: "Street Magic - Madrid",
    description: "Live street performance in the heart of Madrid",
    thumbnail: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 14,
    title: "Club Performance",
    description: "Intimate close-up magic at an exclusive London venue",
    thumbnail: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 15,
    title: "Private Event",
    description: "VIP performance at a celebrity birthday party",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 16,
    title: "Tokyo Street Session",
    description: "Amazing reactions from the streets of Shibuya",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 17,
    title: "Beach Party Magic",
    description: "Summer performance at an Ibiza beach club",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 18,
    title: "Theater Show Highlights",
    description: "Best moments from our sold-out Lima theater performance",
    thumbnail: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  }
];

