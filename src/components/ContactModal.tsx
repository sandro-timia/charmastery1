'use client';

import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const whatsappNumber = '+51 970668921';
  const supportEmail = 'support@charmastery.com';

  const handleSubmitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*Nuevo mensaje de Charmastery*%0A%0A*Nombre:* ${contactForm.name}%0A*Email:* ${contactForm.email}%0A%0A*Mensaje:*%0A${contactForm.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message.replace(/%0A/g, '\n'))}`;

    window.open(whatsappUrl, '_blank');

    setContactForm({ name: '', email: '', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1A1A1F] border border-[rgba(201,162,39,0.3)] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
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
  );
}
