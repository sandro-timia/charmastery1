'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const whatsappNumber = '+51979330221';
  const supportEmail = 'support@charmastery.com';

  const handleSubmitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Nuevo mensaje de Charmastery*%0A%0A*Nombre:* ${contactForm.name}%0A*Email:* ${contactForm.email}%0A%0A*Mensaje:*%0A${contactForm.message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message.replace(/%0A/g, '\n'))}`;
    
    window.open(whatsappUrl, '_blank');
    
    setContactForm({ name: '', email: '', message: '' });
    setIsContactOpen(false);
  };

  return (
    <>
      <footer className="bg-[#0A0A0B] border-t border-[rgba(201,162,39,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <h2
                className="text-2xl font-serif tracking-[0.2em] text-[#C9A227] mb-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                CHARMASTERY
              </h2>
              <p className="text-[#8A8A8E] text-sm leading-relaxed max-w-md mb-3">
                Domina el arte de la conexión humana. Enseñamos a personas exitosas las habilidades sociales que 
                transforman desconocidos en amigos y cada interacción en una oportunidad.
              </p>
              <p className="text-[#C9A227] text-sm italic">
                &quot;Consigue abrazos de desconocidos.&quot;
              </p>
              
              {/* Contact Info */}
              <div className="mt-6 space-y-2">
                <a
                  href={`mailto:${supportEmail}`}
                  className="flex items-center gap-2 text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {supportEmail}
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[#25D366] hover:text-[#20bd5a] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:rotate-[360deg]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {whatsappNumber}
                </a>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-[rgba(201,162,39,0.3)] flex items-center justify-center text-[#8A8A8E] hover:text-[#C9A227] hover:border-[#C9A227] transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-[rgba(201,162,39,0.3)] flex items-center justify-center text-[#8A8A8E] hover:text-[#C9A227] hover:border-[#C9A227] transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-[rgba(201,162,39,0.3)] flex items-center justify-center text-[#8A8A8E] hover:text-[#C9A227] hover:border-[#C9A227] transition-all"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#F5F5F5] font-semibold uppercase tracking-wider text-sm mb-4">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#tricks" className="text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm">
                    Ver Trucos
                  </a>
                </li>
                <li>
                  <a href="#tours" className="text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm">
                    Próximas Giras
                  </a>
                </li>
                <li>
                  <a href="#signup" className="text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm">
                    Únete al Círculo
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[#F5F5F5] font-semibold uppercase tracking-wider text-sm mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacidad" className="text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    className="text-[#8A8A8E] hover:text-[#C9A227] transition-colors text-sm"
                  >
                    Contáctanos
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider my-12 w-full max-w-none" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#5A5A5E] text-sm">
            <p>© 2026 Charmastery. Lima, Perú. Todos los secretos protegidos.</p>
            <p className="text-xs italic">
              &quot;La conexión es la moneda definitiva.&quot;
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-[#1A1A1F] border border-[rgba(201,162,39,0.3)] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3
                className="text-2xl font-serif text-[#F5F5F5] mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Contáctanos
              </h3>
              <p className="text-[#8A8A8E] text-sm">
                Envíanos un mensaje y te responderemos por WhatsApp
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitToWhatsApp} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-[#8A8A8E] text-sm mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-[#2D2D35] rounded-lg px-4 py-3 text-[#F5F5F5] placeholder-[#5A5A5E] focus:border-[#C9A227] focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[#8A8A8E] text-sm mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-[#2D2D35] rounded-lg px-4 py-3 text-[#F5F5F5] placeholder-[#5A5A5E] focus:border-[#C9A227] focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[#8A8A8E] text-sm mb-2">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-[#2D2D35] rounded-lg px-4 py-3 text-[#F5F5F5] placeholder-[#5A5A5E] focus:border-[#C9A227] focus:outline-none transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar por WhatsApp
              </button>
            </form>

            {/* Alternative contact */}
            <div className="mt-6 pt-6 border-t border-[#2D2D35] text-center">
              <p className="text-[#8A8A8E] text-sm mb-2">
                También puedes escribirnos directamente:
              </p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-[#C9A227] hover:text-[#D4AF37] text-sm transition-colors"
              >
                {supportEmail}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
