'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { requestPasswordReset } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const link = await requestPasswordReset(email);
      setResetLink(link);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#4A1D6A]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.push('/auth')}
          className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
          aria-label="Volver a iniciar sesión"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a iniciar sesión
        </button>

        <div className="glass rounded-2xl p-8 md:p-10 gold-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227]/5 via-transparent to-[#C9A227]/5 pointer-events-none" />

          <div className="relative">
            <div className="text-center mb-8">
              <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-xs mb-3">
                Recuperar Acceso
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-[#F5F5F5]" style={{ fontFamily: 'var(--font-serif)' }}>
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="text-[#8A8A8E] mt-3">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </div>

            {success ? (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#F5F5F5] font-semibold">¡Enlace generado!</p>
                      <p className="text-[#8A8A8E] text-sm">El enlace expira en 1 hora.</p>
                    </div>
                  </div>
                </div>

                {/* Reset Link Display (for demo purposes) */}
                <div className="rounded-lg border border-[rgba(201,162,39,0.3)] bg-[#0A0A0B]/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                    Enlace de restablecimiento (demo)
                  </p>
                  <p className="text-[#8A8A8E] text-xs mb-3">
                    En producción, este enlace se enviaría por correo electrónico. Por ahora, haz click en el botón de abajo:
                  </p>
                  {resetLink && (
                    <button
                      type="button"
                      onClick={() => router.push(resetLink.replace(window.location.origin, ''))}
                      className="btn-gold-filled rounded-sm w-full"
                    >
                      Restablecer Contraseña
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/auth')}
                  className="btn-gold rounded-sm w-full"
                >
                  Volver a iniciar sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A8E] mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-dark w-full rounded-sm"
                    placeholder="tu@dominio.com"
                    autoComplete="email"
                  />
                </div>

                {error && (
                  <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-filled rounded-sm w-full disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
                </button>

                <p className="text-[#5A5A5E] text-xs text-center pt-2">
                  Recuerda revisar tu carpeta de spam si no encuentras el correo.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
