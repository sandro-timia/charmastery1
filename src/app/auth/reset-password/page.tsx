'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { validateResetToken, resetPassword } = useAuth();
  
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      return;
    }

    const result = validateResetToken(token);
    setIsValidToken(result.valid);
    if (result.email) {
      setUserEmail(result.email);
    }
  }, [token, validateResetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await resetPassword({ token, newPassword, confirmPassword });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking token
  if (isValidToken === null) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-[#C9A227]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[#8A8A8E]">Verificando enlace...</span>
        </div>
      </main>
    );
  }

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
            {!isValidToken ? (
              // Invalid or expired token
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-serif text-[#F5F5F5] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  Enlace inválido o expirado
                </h1>
                <p className="text-[#8A8A8E] mb-6">
                  Este enlace de restablecimiento de contraseña ya no es válido. Por favor solicita uno nuevo.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/auth/forgot-password')}
                  className="btn-gold-filled rounded-sm"
                >
                  Solicitar nuevo enlace
                </button>
              </div>
            ) : success ? (
              // Success state
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-serif text-[#F5F5F5] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  ¡Contraseña actualizada!
                </h1>
                <p className="text-[#8A8A8E] mb-6">
                  Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/auth')}
                  className="btn-gold-filled rounded-sm"
                >
                  Iniciar Sesión
                </button>
              </div>
            ) : (
              // Reset password form
              <>
                <div className="text-center mb-8">
                  <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-xs mb-3">
                    Nueva Contraseña
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif text-[#F5F5F5]" style={{ fontFamily: 'var(--font-serif)' }}>
                    Restablecer contraseña
                  </h1>
                  {userEmail && (
                    <p className="text-[#8A8A8E] mt-3">
                      Ingresa una nueva contraseña para <span className="text-[#C9A227]">{userEmail}</span>
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A8E] mb-2">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="input-dark w-full rounded-sm"
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A8E] mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="input-dark w-full rounded-sm"
                      placeholder="Repite tu nueva contraseña"
                      autoComplete="new-password"
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
                    {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ResetPasswordLoading() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <svg className="animate-spin h-6 w-6 text-[#C9A227]" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-[#8A8A8E]">Cargando...</span>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
