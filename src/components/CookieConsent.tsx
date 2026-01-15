'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookieConsent, CookieCategory } from '@/context/CookieContext';

interface CategoryInfo {
  id: CookieCategory;
  name: string;
  description: string;
  required: boolean;
}

const categories: CategoryInfo[] = [
  {
    id: 'essential',
    name: 'Esenciales',
    description: 'Necesarias para el funcionamiento básico del sitio. No pueden ser desactivadas.',
    required: true,
  },
  {
    id: 'functional',
    name: 'Funcionales',
    description: 'Permiten recordar tus preferencias como idioma y región.',
    required: false,
  },
  {
    id: 'analytics',
    name: 'Analíticas',
    description: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Usadas para mostrarte anuncios relevantes y medir campañas publicitarias.',
    required: false,
  },
];

export default function CookieConsent() {
  const {
    preferences,
    showBanner,
    showSettings,
    isLoaded,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openSettings,
    closeSettings,
    doNotTrack,
  } = useCookieConsent();

  const [localPrefs, setLocalPrefs] = useState(preferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  // Don't render anything until mounted and loaded
  if (!mounted || !isLoaded) return null;

  // Don't show if neither banner nor settings should be visible
  if (!showBanner && !showSettings) return null;

  const handleToggle = (category: CookieCategory) => {
    if (category === 'essential') return; // Can't toggle essential
    setLocalPrefs(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSaveSettings = () => {
    savePreferences(localPrefs);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] transition-opacity duration-300 ${
          showBanner || showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={showSettings ? closeSettings : undefined}
        aria-hidden="true"
      />

      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[1000] p-4 md:p-6 animate-slide-up"
          role="dialog"
          aria-modal="true"
          aria-label="Consentimiento de cookies"
        >
          <div className="max-w-4xl mx-auto bg-[#1A1A1F] border border-[rgba(201,162,39,0.2)] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#F5F5F5] mb-1">
                    🍪 Tu privacidad es importante
                  </h2>
                  <p className="text-[#8A8A8E] text-sm">
                    Usamos cookies para mejorar tu experiencia en nuestro sitio. 
                    Puedes aceptar todas, rechazar las no esenciales, o personalizar tus preferencias.
                    {doNotTrack && (
                      <span className="block mt-1 text-[#C9A227]">
                        Detectamos que tienes &quot;Do Not Track&quot; activado. Respetamos tu preferencia.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-[#C9A227] hover:bg-[#D4AF37] text-[#0A0A0B] font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Aceptar todas
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="flex-1 bg-transparent border border-[rgba(201,162,39,0.3)] text-[#F5F5F5] hover:border-[#C9A227] font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={openSettings}
                  className="flex-1 bg-transparent border border-[rgba(138,138,142,0.3)] text-[#8A8A8E] hover:text-[#F5F5F5] hover:border-[#8A8A8E] font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Personalizar
                </button>
              </div>

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#5A5A5E]">
                <Link href="/cookies" className="hover:text-[#C9A227] transition-colors">
                  Política de Cookies
                </Link>
                <Link href="/privacidad" className="hover:text-[#C9A227] transition-colors">
                  Política de Privacidad
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Configuración de cookies"
        >
          <div 
            className="w-full max-w-lg bg-[#1A1A1F] border border-[rgba(201,162,39,0.2)] rounded-2xl shadow-2xl my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(201,162,39,0.1)]">
              <h2 className="text-xl font-semibold text-[#F5F5F5]">
                Configuración de Cookies
              </h2>
              <button
                onClick={closeSettings}
                className="p-2 text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
                aria-label="Cerrar configuración"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Categories */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="p-4 bg-[#0A0A0B]/50 rounded-xl border border-[rgba(201,162,39,0.1)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#F5F5F5]">{category.name}</span>
                    {category.required ? (
                      <span className="text-xs text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded">
                        Requerida
                      </span>
                    ) : (
                      <button
                        onClick={() => handleToggle(category.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          localPrefs[category.id] ? 'bg-[#C9A227]' : 'bg-[#3A3A3E]'
                        }`}
                        aria-label={`${localPrefs[category.id] ? 'Desactivar' : 'Activar'} ${category.name}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            localPrefs[category.id] ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-[#8A8A8E]">{category.description}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[rgba(201,162,39,0.1)] space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 bg-[#C9A227] hover:bg-[#D4AF37] text-[#0A0A0B] font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Guardar preferencias
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 text-sm text-[#8A8A8E] hover:text-[#C9A227] transition-colors"
                >
                  Aceptar todas
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="flex-1 text-sm text-[#8A8A8E] hover:text-[#C9A227] transition-colors"
                >
                  Solo esenciales
                </button>
              </div>
              <Link 
                href="/cookies" 
                className="block text-center text-xs text-[#5A5A5E] hover:text-[#C9A227] transition-colors"
              >
                Ver política completa de cookies
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Styles for animation */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
