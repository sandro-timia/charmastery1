'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Firebase handles password reset via its own hosted page.
// This page now redirects users to the forgot-password page.
export default function ResetPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to forgot-password page after a brief delay
    const timer = setTimeout(() => {
      router.push('/auth/forgot-password');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#4A1D6A]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 md:p-10 gold-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227]/5 via-transparent to-[#C9A227]/5 pointer-events-none" />

          <div className="relative text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-serif text-[#F5F5F5] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Restablecer Contraseña
            </h1>
            
            <p className="text-[#8A8A8E] mb-6">
              Para restablecer tu contraseña, revisa tu correo electrónico y haz clic en el enlace que te enviamos.
            </p>

            <p className="text-[#5A5A5E] text-sm mb-6">
              Redirigiendo a la página de recuperación...
            </p>

            <button
              type="button"
              onClick={() => router.push('/auth/forgot-password')}
              className="btn-gold-filled rounded-sm"
            >
              Solicitar nuevo enlace
            </button>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => router.push('/auth')}
                className="text-[#8A8A8E] hover:text-[#F5F5F5] text-sm transition-colors"
              >
                Volver a iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
