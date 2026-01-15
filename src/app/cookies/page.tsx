'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/context/CookieContext';

interface CookieInfo {
  name: string;
  purpose: string;
  duration: string;
  category: string;
}

const cookiesUsed: CookieInfo[] = [
  {
    name: 'charmastery_cookie_consent',
    purpose: 'Almacena si el usuario ha dado su consentimiento para cookies',
    duration: '1 año',
    category: 'Esencial',
  },
  {
    name: 'charmastery_cookie_preferences',
    purpose: 'Almacena las preferencias de cookies del usuario',
    duration: '1 año',
    category: 'Esencial',
  },
  {
    name: 'charmastery_cart',
    purpose: 'Almacena los items del carrito de compras',
    duration: 'Permanente (localStorage)',
    category: 'Esencial',
  },
  {
    name: 'charmastery_auth',
    purpose: 'Mantiene la sesión del usuario iniciada',
    duration: 'Sesión',
    category: 'Esencial',
  },
  {
    name: '_ga, _gid',
    purpose: 'Google Analytics - Análisis de tráfico y comportamiento del usuario',
    duration: '2 años / 24 horas',
    category: 'Analítica',
  },
  {
    name: '_fbp',
    purpose: 'Facebook Pixel - Seguimiento de conversiones y remarketing',
    duration: '3 meses',
    category: 'Marketing',
  },
];

export default function CookiesPage() {
  const { openSettings, hasConsented } = useCookieConsent();

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#8A8A8E] hover:text-[#C9A227] transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Política de Cookies
          </h1>
          <p className="text-[#8A8A8E]">
            Última actualización: Enero 2026
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1A1A1F] border border-[rgba(201,162,39,0.2)] rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#F5F5F5] mb-4">Gestiona tus preferencias</h2>
          <p className="text-[#8A8A8E] mb-4">
            Puedes cambiar tus preferencias de cookies en cualquier momento.
          </p>
          <button
            onClick={openSettings}
            className="btn-gold-filled"
          >
            {hasConsented ? 'Modificar preferencias' : 'Configurar cookies'}
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              1. ¿Qué son las cookies?
            </h2>
            <div className="text-[#B8B8B8] space-y-4">
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, 
                tablet o móvil) cuando visitas un sitio web. Las cookies permiten que el sitio web 
                recuerde tus acciones y preferencias durante un período de tiempo.
              </p>
              <p>
                Las cookies no son dañinas y no pueden acceder a otra información de tu dispositivo. 
                Son ampliamente utilizadas para hacer que los sitios web funcionen de manera más 
                eficiente y para proporcionar información a los propietarios del sitio.
              </p>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              2. Categorías de cookies que utilizamos
            </h2>
            
            <div className="space-y-6">
              {/* Essential */}
              <div className="bg-[#1A1A1F] border border-[rgba(201,162,39,0.1)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-[#F5F5F5]">Cookies Esenciales</h3>
                  <span className="text-xs text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded">Siempre activas</span>
                </div>
                <p className="text-[#8A8A8E]">
                  Estas cookies son necesarias para el funcionamiento básico del sitio web. Sin ellas, 
                  el sitio no puede funcionar correctamente. Incluyen cookies que permiten recordar 
                  tu carrito de compras, mantener tu sesión iniciada y gestionar tus preferencias de cookies.
                </p>
              </div>

              {/* Functional */}
              <div className="bg-[#1A1A1F] border border-[rgba(201,162,39,0.1)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-[#F5F5F5]">Cookies Funcionales</h3>
                </div>
                <p className="text-[#8A8A8E]">
                  Permiten que el sitio web recuerde las elecciones que haces (como tu nombre de usuario, 
                  idioma o la región en la que te encuentras) y proporciona características mejoradas y 
                  más personalizadas. También pueden utilizarse para proporcionar servicios que has solicitado.
                </p>
              </div>

              {/* Analytics */}
              <div className="bg-[#1A1A1F] border border-[rgba(201,162,39,0.1)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-[#F5F5F5]">Cookies Analíticas</h3>
                </div>
                <p className="text-[#8A8A8E]">
                  Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando 
                  y reportando información de forma anónima. Utilizamos esta información para mejorar 
                  nuestro sitio y tu experiencia. Incluye servicios como Google Analytics.
                </p>
              </div>

              {/* Marketing */}
              <div className="bg-[#1A1A1F] border border-[rgba(201,162,39,0.1)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <h3 className="text-lg font-semibold text-[#F5F5F5]">Cookies de Marketing</h3>
                </div>
                <p className="text-[#8A8A8E]">
                  Se utilizan para rastrear a los visitantes en los sitios web con la intención de 
                  mostrar anuncios relevantes y atractivos para el usuario individual. También se 
                  utilizan para medir la efectividad de las campañas publicitarias. Incluye servicios 
                  como Facebook Pixel y Google Ads.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies List */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              3. Lista de cookies utilizadas
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[rgba(201,162,39,0.2)]">
                    <th className="py-3 px-4 text-[#C9A227] font-medium">Nombre</th>
                    <th className="py-3 px-4 text-[#C9A227] font-medium">Propósito</th>
                    <th className="py-3 px-4 text-[#C9A227] font-medium">Duración</th>
                    <th className="py-3 px-4 text-[#C9A227] font-medium">Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {cookiesUsed.map((cookie, index) => (
                    <tr key={index} className="border-b border-[rgba(201,162,39,0.1)]">
                      <td className="py-3 px-4 text-[#F5F5F5] font-mono text-sm">{cookie.name}</td>
                      <td className="py-3 px-4 text-[#8A8A8E] text-sm">{cookie.purpose}</td>
                      <td className="py-3 px-4 text-[#8A8A8E] text-sm">{cookie.duration}</td>
                      <td className="py-3 px-4 text-[#8A8A8E] text-sm">{cookie.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Browser Settings */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              4. Cómo gestionar cookies en tu navegador
            </h2>
            <div className="text-[#B8B8B8] space-y-4">
              <p>
                Además de las opciones que te proporcionamos en nuestro sitio, puedes gestionar las 
                cookies directamente desde tu navegador. Aquí te explicamos cómo hacerlo en los 
                navegadores más populares:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 bg-[#1A1A1F] rounded-lg border border-[rgba(201,162,39,0.1)] hover:border-[#C9A227] transition-colors"
                >
                  <span className="text-[#F5F5F5] font-medium">Google Chrome</span>
                  <span className="text-[#8A8A8E] text-sm block mt-1">Configuración → Privacidad y seguridad</span>
                </a>
                <a 
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 bg-[#1A1A1F] rounded-lg border border-[rgba(201,162,39,0.1)] hover:border-[#C9A227] transition-colors"
                >
                  <span className="text-[#F5F5F5] font-medium">Mozilla Firefox</span>
                  <span className="text-[#8A8A8E] text-sm block mt-1">Opciones → Privacidad y seguridad</span>
                </a>
                <a 
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 bg-[#1A1A1F] rounded-lg border border-[rgba(201,162,39,0.1)] hover:border-[#C9A227] transition-colors"
                >
                  <span className="text-[#F5F5F5] font-medium">Safari</span>
                  <span className="text-[#8A8A8E] text-sm block mt-1">Preferencias → Privacidad</span>
                </a>
                <a 
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 bg-[#1A1A1F] rounded-lg border border-[rgba(201,162,39,0.1)] hover:border-[#C9A227] transition-colors"
                >
                  <span className="text-[#F5F5F5] font-medium">Microsoft Edge</span>
                  <span className="text-[#8A8A8E] text-sm block mt-1">Configuración → Cookies y permisos</span>
                </a>
              </div>

              <p className="text-[#8A8A8E] text-sm">
                <strong className="text-[#C9A227]">Nota:</strong> Si decides bloquear todas las cookies, 
                es posible que algunas funciones del sitio no funcionen correctamente.
              </p>
            </div>
          </section>

          {/* CCPA/CPRA */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              5. Derechos de privacidad de California (CCPA/CPRA)
            </h2>
            <div className="text-[#B8B8B8] space-y-4">
              <p>
                Si eres residente de California, tienes derechos adicionales bajo la Ley de Privacidad 
                del Consumidor de California (CCPA) y la Ley de Derechos de Privacidad de California (CPRA):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Derecho a saber qué información personal recopilamos</li>
                <li>Derecho a eliminar tu información personal</li>
                <li>Derecho a optar por no participar en la venta de información personal</li>
                <li>Derecho a no ser discriminado por ejercer tus derechos de privacidad</li>
              </ul>
              <p>
                <strong className="text-[#F5F5F5]">No vendemos tu información personal.</strong> Si deseas 
                ejercer cualquiera de estos derechos, contáctanos a través de{' '}
                <a href="mailto:privacy@charmastery.com" className="text-[#C9A227] hover:underline">
                  privacy@charmastery.com
                </a>
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              6. Cambios en esta política
            </h2>
            <div className="text-[#B8B8B8] space-y-4">
              <p>
                Podemos actualizar esta política de cookies periódicamente para reflejar cambios en 
                nuestras prácticas o por otras razones operativas, legales o regulatorias. Te 
                recomendamos revisar esta página regularmente para mantenerte informado.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              7. Contacto
            </h2>
            <div className="text-[#B8B8B8] space-y-4">
              <p>
                Si tienes preguntas sobre nuestra política de cookies o cómo manejamos tus datos, 
                puedes contactarnos:
              </p>
              <div className="bg-[#1A1A1F] rounded-xl p-6 border border-[rgba(201,162,39,0.1)]">
                <p className="text-[#F5F5F5] font-medium mb-2">Charmastery</p>
                <p>Email: <a href="mailto:privacy@charmastery.com" className="text-[#C9A227] hover:underline">privacy@charmastery.com</a></p>
                <p>Soporte: <a href="mailto:support@charmastery.com" className="text-[#C9A227] hover:underline">support@charmastery.com</a></p>
                <p className="mt-2 text-[#8A8A8E]">Lima, Perú</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
