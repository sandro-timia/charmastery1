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
    name: "Pegasus Link",
    description: "Dos ligas se enlazan mágicamente dentro del puño cerrado del espectador",
    backDescription: "Le entregas una liga al espectador para que la examine y cierre su puño alrededor de ella. Tú sostienes otra liga idéntica frente a él. En un instante, tu liga desaparece completamente de tu mano abierta.\n\nAquí viene lo perturbador: cuando el espectador abre su puño, descubre que las dos ligas están mágicamente enlazadas entre sí.\n\nLo que hace este truco devastador es que sucede completamente en su espacio - en su mano cerrada, bajo su control total. No hay switches, no hay distracciones, no hay \"pásame la liga\". La magia atraviesa la barrera física de su puño y manipula un objeto que nunca salió de su posesión.\n\nEs íntimo, imposible de racionalizar, y deja esa inquietante sensación de que algo sobrenatural acaba de ocurrir dentro de su propia mano.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768607420/pegasus_link2_c8fvp7.jpg"
  },
  {
    id: 2,
    name: "Caido-Z Divination",
    description: "Adivina el signo zodiacal del espectador letra por letra",
    backDescription: "Le pides al participante que visualice su signo zodiacal - solo que lo piense, que lo sienta. Entonces comienza el ritual.\n\nCon preguntas aparentemente inocentes, comienzas a formar la palabra letra por letra. \"Veo algo... ¿una L?\" Sus ojos se abren. \"Después viene una E...\" La tensión crece. Cada letra correcta es un pequeño milagro que construye hacia algo más grande.\n\nEl ambiente se transforma con cada acierto. Las personas alrededor contienen la respiración. \"O... ahora una N...\" Cuando llegas a la última letra, toda la energía de la sala converge en ese momento.\n\n\"LEO.\"\n\nEl clímax es devastador porque no llegaste de golpe - construiste el asombro letra por letra, creando múltiples momentos memorables en una sola revelación. Cada letra correcta es imposible de explicar, y juntas forman una experiencia que el espectador recordará por años.\n\nEste efecto es puro mentalismo social: íntimo, interactivo, y absolutamente inexplicable.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768608022/caidoz2_wvf9cg.jpg"
  },
  {
    id: 3,
    name: "Tic Tac Toc",
    description: "Adivina cantidad y transforma el color de tic tacs con un toque mágico",
    backDescription: "Le ofreces al participante una caja de Tic Tacs blancos - completamente ordinaria, sellada, que pueden examinar. Le pides que lleve sus manos detrás de la espalda, saque algunos sin mirar, y cierre el puño. Nadie sabe cuántos tiene. Ni siquiera él.\n\nTú lo miras a los ojos, haces una pausa... y dices el número exacto. Imposible. Pero eso es solo el calentamiento.\n\nPara el segundo acto, le pides que repita el proceso: manos atrás, saca algunos Tic Tacs blancos, puño cerrado hacia adelante. Entonces haces algo inesperado: tocas su camisa - digamos que es azul - y \"espolvoreamos\" ese color sobre su puño cerrado.\n\nCuando abre la mano, los Tic Tacs ya no son blancos. Son azules. Del mismo tono exacto que su ropa.\n\nEste efecto es devastador porque combina dos imposibilidades: primero la adivinación que desafía la lógica, luego una transformación física que ocurre dentro de SU puño cerrado, con un color que depende de lo que ELLOS decidieron vestir esa noche. Personal, visual, y absolutamente inexplicable.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768607724/tictactoc2_ewuxae.jpg"
  },
  {
    id: 4,
    name: "Transpo Paradigm",
    description: "Dos cartas firmadas cambian de manos en un choque imposible",
    backDescription: "Le pides al participante que firme una carta - su nombre, su firma única. La coloca sobre la mesa y la cubre con ambas manos. Nadie más la toca.\n\nTú haces exactamente lo mismo: firmas otra carta con tu nombre y la cubres con tus manos. Dos cartas firmadas, cada una bajo el control absoluto de su dueño.\n\nEntonces viene el momento: ambos levantan sus manos y las chocan en el aire. Un gesto simple, casi infantil. Pero cuando cada uno mira la carta que tiene debajo de sus manos...\n\nLas cartas han cambiado de lugar. Él tiene tu carta firmada. Tú tienes la suya.\n\nNo hubo intercambio. No hubo distracción. Las cartas atravesaron el espacio - o el tiempo - en el instante del choque. Las firmas lo prueban: no hay duplicados, no hay trucos.\n\nTranspo Paradigm es el tipo de magia que rompe la realidad de forma colaborativa. El participante no solo observa - es parte activa del imposible. Y eso lo hace inolvidable.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768608729/transpoparadigm2_bffstu.jpg"
  },
  {
    id: 5,
    name: "Voltarum",
    description: "Adivina palabras escritas en secreto mientras estás volteado y a metros de distancia",
    backDescription: "Le entregas un papel y un bolígrafo al espectador. Te volteas y te alejas varios metros - lo suficiente para que sea físicamente imposible ver o escuchar nada. Le pides que escriba cualquier cosa: una palabra, un número, el nombre de alguien, una fecha... lo que quiera. Libertad absoluta.\n\nCuando termina, le pides que rompa el papel en pedazos pequeños. Puede guardarlos en su puño cerrado o tirarlos - no importa. Tú nunca tocas esos pedazos.\n\nTe das la vuelta. Te acercas lentamente. Lo miras a los ojos, y después de unos segundos de concentración... dices exactamente lo que escribió.\n\nNo hubo cómplices. No hubo espejos. No hubo contacto con el papel destruido. El espectador tuvo control total desde el principio hasta el final.\n\nVoltarum es mentalismo en su forma más pura: una demostración de lo imposible que no depende de cartas, objetos trucados ni preparación visible. Solo tú, el espectador, y un pensamiento que de alguna manera lograste extraer de la nada.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768608446/voltarum2_hldczb.jpg"
  },
  {
    id: 6,
    name: "Invisible X",
    description: "Adivina una carta elegida sin tocar jamás la baraja",
    backDescription: "Le entregas la baraja al espectador - pueden examinarla, verificar que es normal. Les muestras las cartas para que vean que están mezcladas, todas diferentes.\n\nAhora le pides que corte la baraja. Y que vuelva a cortar. Y otra vez. Las veces que quiera, hasta que se sienta completamente satisfecho de que nadie podría saber dónde quedó cada carta.\n\nCuando termina, le pides que mire la carta que quedó encima de todas. Que la memorice. Puede guardarla en su bolsillo o perderla en medio del mazo - su elección.\n\nTe acercas. No tocas las cartas. No haces preguntas sospechosas. Solo lo miras, y después de un momento de tensión... nombras su carta exacta.\n\nInvisible X elimina toda posibilidad de explicación racional. El espectador controló cada corte. Tú nunca tocaste la baraja después de entregársela. Y sin embargo, de alguna manera, sabías exactamente qué carta eligió el destino - o él - en ese momento único e irrepetible.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768607096/invisiblex2_the1ai.jpg"
  },
  {
    id: 7,
    name: "Dynamic Monte",
    description: "El clásico juego de las tres cartas donde el espectador siempre pierde",
    backDescription: "Muestras solo tres cartas: dos nueves - uno de trébol, uno de picas - y la reina de corazones. Simple. Le pides al espectador que no pierda de vista a la reina. Que la siga con los ojos. Que se concentre.\n\nComienzas a mover las cartas lentamente. Muy lentamente. El espectador está seguro de que sabe dónde está la reina. Es imposible que lo engañen a esta velocidad.\n\nSeñala. Se equivoca.\n\nLo intentan de nuevo. Esta vez aún más lento. El espectador jura que esta vez no hay forma de fallar. Señala con total confianza.\n\nSe equivoca otra vez.\n\nY entonces las cosas se ponen extrañas. Volteas las cartas y... ¿dónde está la reina? De pronto parece que nunca hubo una reina. O que las tres cartas son nueves. La realidad se distorsiona frente a sus ojos.\n\nDynamic Monte no es solo un juego de habilidad - es una demostración de que la percepción humana es increíblemente fácil de manipular. Y eso, en el contexto correcto, es absolutamente fascinante de presenciar.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Beginner",
    price: 5,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768608975/dynamicmonte2_tynkcs.jpg"
  },
  {
    id: 8,
    name: "Sugar Trap",
    description: "Predice pensamientos libres con una historia de Instagram publicada hace horas",
    backDescription: "Le pides a ella que piense en un lugar al que le gustaría ir de vacaciones. Cualquier lugar del mundo. Luego le pides que piense en una marca de ropa - pero debe usar una letra de la palabra anterior para empezar. Finalmente, un instrumento musical.\n\nEs un proceso aparentemente libre, con decisiones encadenadas que ella misma construye. Nadie podría predecir esa combinación específica.\n\nTú intentas adivinar. La mitad de las veces aciertas - y es impresionante. Y cuando fallas, le pides que revise tu Instagram. Específicamente, una historia que publicaste hace horas. Antes de conocerla. Antes de saber que existía.\n\nAhí está. La respuesta correcta. Publicada horas antes del encuentro.\n\n¿Cómo es posible? No importa si aciertas en vivo o no - la historia de Instagram siempre tiene la respuesta. Sugar Trap mezcla mentalismo con redes sociales de una manera que hace que el efecto sea verificable, compartible, y absolutamente moderno. Es el tipo de magia que genera conversación... y seguidores.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Intermediate",
    price: 10,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768605425/sugartrap_c9fafl.jpg"
  },
  {
    id: 9,
    name: "FlaMarte",
    description: "Un cerillo quemado vuelve a encenderse en las manos del espectador",
    backDescription: "Extraes un cerillo de una caja ordinaria. Lo enciendes, dejas que la llama dance por un momento, y luego lo soplas. El cerillo está quemado, usado, muerto. Se lo entregas al espectador para que lo sostenga.\n\nEntonces le dices algo: \"El amor a primera vista genera calor\". Señalas el cerillo quemado en su mano y le pides que piense en la persona que más le gusta. Que visualice su rostro. Que sienta esa emoción.\n\nLo miras fijamente a los ojos. Sonríes de manera pícara. Y en ese instante...\n\nEl cerillo se enciende. En sus manos. Un cerillo que ya fue usado. Un cerillo que debería ser imposible de encender.\n\nFlaMarte es magia con carga emocional. No es solo un efecto visual impresionante - es un momento íntimo que conecta lo imposible con algo profundamente personal. La persona que imaginaron, el calor que sintieron, y una llama que no debería existir. Todo ocurriendo literalmente en sus propias manos.\n\nEs el tipo de magia que no se olvida. Porque no solo lo vieron - lo sintieron.",
    youtubeId: "dQw4w9WgXcQ",
    difficulty: "Advanced",
    price: 15,
    thumbnail: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768609367/flamarte2_c4oyti.jpg"
  }
];

// Mastery Program (used by "Begin Your Transformation" CTA)
export const masteryProgram: Trick = {
  id: 1000,
  name: 'Programa de Maestría Completo',
  description:
    'Acceso de por vida a todas las técnicas de conexión, tutoriales en video y frameworks sociales.',
  difficulty: 'Advanced',
  price: 5,
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
    spotsLeft: 0
  },
  {
    id: 2,
    city: "Madrid",
    country: "España",
    date: "22 de Abril, 2026",
    venue: "Círculo de Bellas Artes",
    spotsLeft: 0
  },
  {
    id: 3,
    city: "Londres",
    country: "Reino Unido",
    date: "18 de Julio, 2026",
    venue: "The Magic Circle",
    spotsLeft: 0
  }
];

// Hero GIFs for carousel
export const heroVideos: HeroVideo[] = [
  {
    id: 1,
    title: "Conexión Instantánea",
    gifUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623679/Pi7_GIF_CMP_4_x6eoes.gif",
    posterUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623679/Pi7_GIF_CMP_4_x6eoes.gif",
    duration: 1000,
    // TODO: replace with your real full-performance YouTube video ID
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Rompe el Hielo",
    gifUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623687/Pi7_GIF_CMP_2_sk6njd.gif",
    posterUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623687/Pi7_GIF_CMP_2_sk6njd.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Crea Asombro",
    gifUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623688/Pi7_GIF_CMP_3_zocwgi.gif",
    posterUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623688/Pi7_GIF_CMP_3_zocwgi.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Momentos Inolvidables",
    gifUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623687/Pi7_GIF_CMP_jsokqo.gif",
    posterUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623687/Pi7_GIF_CMP_jsokqo.gif",
    duration: 1000,
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 5,
    title: "Maestría Social",
    gifUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623693/Pi7_GIF_CMP_1_txupav.gif",
    posterUrl: "https://res.cloudinary.com/dh5mrkh5q/image/upload/v1768623693/Pi7_GIF_CMP_1_txupav.gif",
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

