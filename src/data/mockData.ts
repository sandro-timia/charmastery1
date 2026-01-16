// Types
export interface Trick {
  id: number;
  name: string;
  description: string;
  backDescription?: string; // Optional: detailed description shown when card is flipped
  youtubeId?: string; // Optional: YouTube video ID for tutorial
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
    name: "Pagasus Link",
    description: "Dos ligas se enlazan mágicamente dentro del puño cerrado del espectador",
    backDescription: "Le entregas una liga al espectador para que la examine y cierre su puño alrededor de ella. Tú sostienes otra liga idéntica frente a él. En un instante, tu liga desaparece completamente de tu mano abierta.\n\nAquí viene lo perturbador: cuando el espectador abre su puño, descubre que las dos ligas están mágicamente enlazadas entre sí.\n\nLo que hace este truco devastador es que sucede completamente en su espacio - en su mano cerrada, bajo su control total. No hay switches, no hay distracciones, no hay \"pásame la liga\". La magia atraviesa la barrera física de su puño y manipula un objeto que nunca salió de su posesión.\n\nEs íntimo, imposible de racionalizar, y deja esa inquietante sensación de que algo sobrenatural acaba de ocurrir dentro de su propia mano.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Lector de Mentes",
    description: "Revela una carta elegida sin haberla visto nunca",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://images.unsplash.com/photo-1529480780361-e08c4d67a141?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Carta al Lugar Imposible",
    description: "Transporta una carta firmada a un lugar imposible",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 4,
    name: "El Anillo Flotante",
    description: "Levita un anillo prestado en el aire",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Baraja Sombra",
    description: "Controla cualquier carta elegida de una baraja mezclada",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 6,
    name: "El Secreto del Mentalista",
    description: "Lee pensamientos y predice elecciones",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Seda Fantasma",
    description: "Haz que la seda desaparezca y aparezca en cualquier lugar",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 8,
    name: "La Carta Ambiciosa",
    description: "Una carta firmada sube repetidamente a la cima",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=400&h=300&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Baraja Invisible",
    description: "El efecto definitivo de revelación de cartas",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=400&h=300&fit=crop&q=80"
  }
];

// Mastery Program (used by "Begin Your Transformation" CTA)
export const masteryProgram: Trick = {
  id: 1000,
  name: 'Programa de Maestría Completo',
  description:
    'Acceso de por vida a todas las técnicas de conexión, tutoriales en video y frameworks sociales.',
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
    country: "Perú",
    date: "15 de Marzo, 2026",
    venue: "Teatro Municipal",
    spotsLeft: 12
  },
  {
    id: 2,
    city: "Madrid",
    country: "España",
    date: "22 de Abril, 2026",
    venue: "Círculo de Bellas Artes",
    spotsLeft: 8
  },
  {
    id: 3,
    city: "Londres",
    country: "Reino Unido",
    date: "18 de Julio, 2026",
    venue: "The Magic Circle",
    spotsLeft: 10
  }
];

// Hero GIFs for carousel
export const heroVideos: HeroVideo[] = [
  {
    id: 1,
    title: "Conexión Instantánea",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzQzcWtsZ205dmE4dGNwNzg0MmE2dG9ycXBnMmljeWw5YWk0dGZ1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/POFJCzW5GXtWFRMJ1C/giphy.gif",
    posterUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzQzcWtsZ205dmE4dGNwNzg0MmE2dG9ycXBnMmljeWw5YWk0dGZ1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/POFJCzW5GXtWFRMJ1C/giphy.gif",
    duration: 1000,
    // TODO: replace with your real full-performance YouTube video ID
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Rompe el Hielo",
    gifUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-819.35b52617.gif",
    posterUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-819.35b52617.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Crea Asombro",
    gifUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-825.785bafb6.gif",
    posterUrl: "https://chumley.barstoolsports.com/union/2026/01/11/hot-girl-gif-825.785bafb6.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Momentos Inolvidables",
    gifUrl: "https://media1.tenor.com/m/iFVXlWJ-sPoAAAAd/pose-mini-dress.gif",
    posterUrl: "https://media1.tenor.com/m/iFVXlWJ-sPoAAAAd/pose-mini-dress.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 5,
    title: "Maestría Social",
    gifUrl: "https://chumley.barstoolsports.com/union/2024/01/01/hot-girl-gif-46.5e54689e.jpg?fit=bounds&format=pjpg&auto=webp&quality=85%2C75&width=1200",
    posterUrl: "https://chumley.barstoolsports.com/union/2024/01/01/hot-girl-gif-46.5e54689e.jpg?fit=bounds&format=pjpg&auto=webp&quality=85%2C75&width=1200",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  }
];

// Media Library Content
export const mediaItems: MediaItem[] = [
  // Tips de Encanto - Consejos de rapport social y conexión
  {
    id: 1,
    title: "Primeras Impresiones",
    description: "Cómo cautivar a alguien en los primeros 30 segundos de conocerle",
    thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 2,
    title: "Lectura de Lenguaje Corporal",
    description: "Decodifica señales sutiles para entender lo que la gente realmente piensa",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 3,
    title: "El Arte de Contar Historias",
    description: "Transforma cualquier truco de magia en una experiencia narrativa inolvidable",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 4,
    title: "Creando Rapport al Instante",
    description: "Técnicas psicológicas para crear conexión inmediata con desconocidos",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 5,
    title: "Voz y Presencia",
    description: "Comanda la atención a través de la tonalidad vocal y presencia escénica",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },
  {
    id: 6,
    title: "Manejando Espectadores Difíciles",
    description: "Convierte a los miembros desafiantes del público en tus mayores fans",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "charm-tips"
  },

  // Grabaciones - Grabaciones de actuaciones en vivo
  {
    id: 7,
    title: "Magia Callejera - Madrid",
    description: "Actuación callejera en vivo en el corazón de Madrid",
    thumbnail: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 8,
    title: "Actuación en Club",
    description: "Magia de cerca íntima en un exclusivo local de Londres",
    thumbnail: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 9,
    title: "Evento Privado",
    description: "Actuación VIP en una fiesta de cumpleaños de celebridad",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 10,
    title: "Sesión Callejera en Tokio",
    description: "Reacciones increíbles de las calles de Shibuya",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 11,
    title: "Magia en Fiesta de Playa",
    description: "Actuación de verano en un club de playa de Ibiza",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  },
  {
    id: 12,
    title: "Mejores Momentos del Teatro",
    description: "Los mejores momentos de nuestra actuación en el teatro de Lima con entradas agotadas",
    thumbnail: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop&q=80",
    youtubeId: "dQw4w9WgXcQ",
    category: "footages"
  }
];

