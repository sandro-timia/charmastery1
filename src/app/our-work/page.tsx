'use client';

import { tricks } from '@/data/mockData';
import Image from 'next/image';
import Link from 'next/link';

// Origin stories for each trick - the creative journey behind each effect
const trickOrigins: Record<number, { origin: string; inspiration: string; year: string }> = {
  1: {
    origin: "Pegasus Link nació durante una noche de insomnio en Buenos Aires. Estaba jugando con unas ligas de oficina cuando accidentalmente descubrí un movimiento que parecía imposible. Pasé los siguientes tres meses refinando la técnica hasta que el efecto fuera completamente limpio.",
    inspiration: "La idea de que algo atraviese el espacio físico siempre me fascinó. Quería crear ese momento donde la magia no solo se ve, sino que se siente en las propias manos del espectador.",
    year: "2019"
  },
  2: {
    origin: "Caido-Z Divination surgió de mi obsesión con la astrología y cómo las personas se identifican con sus signos. Noté que cuando mencionas el signo de alguien, se crea una conexión instantánea. Quería explotar ese momento.",
    inspiration: "Vi a un mentalista revelar una palabra completa de golpe, y pensé: ¿qué pasaría si construyera la tensión letra por letra? El resultado fue mucho más poderoso de lo que imaginé.",
    year: "2020"
  },
  3: {
    origin: "Tic Tac Toc fue un accidente feliz. Estaba en un café y alguien me ofreció un Tic Tac. Empecé a jugar con la caja y de pronto vi posibilidades que nadie había explorado. El efecto del cambio de color vino después, cuando experimentaba con pigmentos.",
    inspiration: "Siempre busco usar objetos cotidianos. Cuando la magia sucede con algo tan ordinario como una pastilla de menta, el impacto es mayor porque no hay sospecha de preparación.",
    year: "2021"
  },
  4: {
    origin: "Transpo Paradigm comenzó como un ejercicio teórico. Me pregunté: ¿cuál es la forma más justa de hacer que dos objetos cambien de lugar? La respuesta fue obvia - ambas personas deben tener control total sobre su objeto.",
    inspiration: "El choque de manos es un gesto universal de celebración. Convertirlo en el catalizador de lo imposible le da un significado emocional que trasciende el truco.",
    year: "2018"
  },
  5: {
    origin: "Voltarum nació de la frustración. Estaba cansado de efectos que requerían contacto con el papel o preparación visible. Quería algo puro: tú escribes, yo adivino, sin excusas ni justificaciones.",
    inspiration: "La telepatía genuina, si existiera, no necesitaría rituales elaborados. Voltarum intenta simular esa pureza - nada de tocarte la frente ni cerrar los ojos dramáticamente.",
    year: "2017"
  },
  6: {
    origin: "Invisible X fue mi respuesta a años de frustraciones con trucos de cartas que requerían que yo tocara el mazo en momentos críticos. Pasé un año entero desarrollando un sistema donde mi única interacción es verbal.",
    inspiration: "Quería que el espectador sintiera que él controló todo. Que las decisiones fueron suyas. Que de alguna manera, yo simplemente... supe.",
    year: "2022"
  },
  7: {
    origin: "Dynamic Monte es mi versión del clásico juego de las tres cartas. Lo que comenzó como un homenaje se convirtió en algo completamente nuevo cuando añadí las fases donde la realidad misma parece distorsionarse.",
    inspiration: "Los estafadores callejeros usaban este juego para robar. Yo quería recuperarlo como entretenimiento legítimo, añadiendo capas de imposibilidad que van más allá del engaño simple.",
    year: "2016"
  },
  8: {
    origin: "Sugar Trap surgió de una conversación con un amigo desarrollador. Hablábamos sobre cómo las redes sociales podrían integrarse en la magia. Esa noche no dormí - estaba demasiado emocionado programando el sistema.",
    inspiration: "La magia debe evolucionar con los tiempos. Instagram es parte de nuestras vidas. ¿Por qué no convertirlo en parte del asombro?",
    year: "2023"
  },
  9: {
    origin: "FlaMarte fue el efecto más difícil de perfeccionar. La seguridad era mi prioridad absoluta, pero también quería que el momento fuera genuinamente mágico. Tomó dos años encontrar el equilibrio perfecto.",
    inspiration: "El fuego es primordial. Cuando algo que debería estar muerto cobra vida con llamas, tocamos algo ancestral en la psique humana. Es magia en su forma más pura.",
    year: "2024"
  }
};

const difficultyLabels = {
  'Beginner': 'Principiante',
  'Intermediate': 'Intermedio',
  'Advanced': 'Avanzado'
};

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#E8E4DB]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-[#2C2C2C] hover:text-[#8B4513] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Volver al inicio</span>
          </Link>
          <span className="text-[#8B7355] text-sm tracking-widest uppercase">Portfolio</span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23D4C4A8%22%20fill-opacity%3D%220.15%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#8B4513] font-medium tracking-[0.3em] uppercase text-sm mb-6">
            El Proceso Creativo
          </p>
          <h1 
            className="text-5xl md:text-7xl font-serif text-[#2C2C2C] mb-6 leading-tight"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Nuestro Trabajo
          </h1>
          <p className="text-xl text-[#5C5C5C] max-w-2xl mx-auto leading-relaxed">
            Cada efecto tiene una historia. Años de experimentación, noches sin dormir, 
            y momentos de revelación que transformaron ideas en experiencias imposibles.
          </p>
          <div className="mt-12 flex items-center justify-center gap-8 text-[#8B7355]">
            <div className="text-center">
              <span className="block text-3xl font-serif text-[#8B4513]">9</span>
              <span className="text-sm tracking-wider uppercase">Efectos</span>
            </div>
            <div className="w-px h-12 bg-[#D4C4A8]" />
            <div className="text-center">
              <span className="block text-3xl font-serif text-[#8B4513]">8+</span>
              <span className="text-sm tracking-wider uppercase">Años</span>
            </div>
            <div className="w-px h-12 bg-[#D4C4A8]" />
            <div className="text-center">
              <span className="block text-3xl font-serif text-[#8B4513]">∞</span>
              <span className="text-sm tracking-wider uppercase">Momentos</span>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Articles */}
      <main className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-24">
          {tricks.map((trick, index) => {
            const origin = trickOrigins[trick.id];
            const isEven = index % 2 === 0;
            
            return (
              <article 
                key={trick.id}
                className="relative"
              >
                {/* Article Number */}
                <div className="absolute -left-4 md:-left-16 top-0 text-[120px] md:text-[180px] font-serif text-[#E8E4DB] select-none leading-none -z-10">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start ${isEven ? '' : 'md:grid-flow-dense'}`}>
                  {/* Image */}
                  <div className={`relative ${isEven ? '' : 'md:col-start-2'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={trick.thumbnail}
                        alt={trick.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Difficulty Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`
                          px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase
                          ${trick.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' : ''}
                          ${trick.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' : ''}
                          ${trick.difficulty === 'Advanced' ? 'bg-rose-100 text-rose-800' : ''}
                        `}>
                          {difficultyLabels[trick.difficulty]}
                        </span>
                      </div>

                      {/* Year Badge */}
                      {origin && (
                        <div className="absolute bottom-4 right-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-[#2C2C2C]">
                            Creado en {origin.year}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Decorative element */}
                    <div className={`absolute -bottom-4 ${isEven ? '-right-4' : '-left-4'} w-24 h-24 border-2 border-[#D4C4A8] rounded-2xl -z-10`} />
                  </div>

                  {/* Content */}
                  <div className={`${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                    <h2 
                      className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4"
                      style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                    >
                      {trick.name}
                    </h2>
                    
                    <p className="text-lg text-[#5C5C5C] mb-6 leading-relaxed">
                      {trick.description}
                    </p>

                    {origin && (
                      <div className="space-y-6">
                        {/* Origin Story */}
                        <div className="border-l-2 border-[#8B4513] pl-6">
                          <h3 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider mb-2">
                            El Origen
                          </h3>
                          <p className="text-[#5C5C5C] leading-relaxed">
                            {origin.origin}
                          </p>
                        </div>

                        {/* Inspiration */}
                        <div className="bg-[#FFFDF8] border border-[#E8E4DB] rounded-xl p-6">
                          <h3 className="text-sm font-medium text-[#8B7355] uppercase tracking-wider mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            La Inspiración
                          </h3>
                          <p className="text-[#5C5C5C] italic leading-relaxed">
                            "{origin.inspiration}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Extended description if available */}
                    {trick.backDescription && (
                      <details className="mt-6 group">
                        <summary className="cursor-pointer text-[#8B4513] font-medium flex items-center gap-2 hover:text-[#6B3410] transition-colors">
                          <span>Leer descripción completa</span>
                          <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="mt-4 text-[#5C5C5C] leading-relaxed whitespace-pre-line text-sm border-t border-[#E8E4DB] pt-4">
                          {trick.backDescription}
                        </div>
                      </details>
                    )}
                  </div>
                </div>

                {/* Separator */}
                {index < tricks.length - 1 && (
                  <div className="mt-24 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-px bg-[#D4C4A8]" />
                      <svg className="w-6 h-6 text-[#D4C4A8]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                      </svg>
                      <div className="w-16 h-px bg-[#D4C4A8]" />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="bg-[#2C2C2C] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 
            className="text-3xl md:text-4xl font-serif mb-4"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            ¿Listo para aprender?
          </h2>
          <p className="text-[#A0A0A0] mb-8 max-w-xl mx-auto">
            Cada uno de estos efectos está disponible para que los domines. 
            Únete a nuestra comunidad de ilusionistas.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 rounded-full font-medium transition-colors"
          >
            <span>Explorar Trucos</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}
