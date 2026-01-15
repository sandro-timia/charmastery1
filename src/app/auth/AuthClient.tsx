'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type Mode = 'signin' | 'signup';

export default function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading, signIn, signUp } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = useMemo(() => (mode === 'signin' ? 'Iniciar Sesión' : 'Crea tu cuenta'), [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (mode === 'signin') {
        await signIn({ email, password });
      } else {
        await signUp({ email, password, confirmPassword });
      }
      const next = searchParams.get('next');
      const add = searchParams.get('add');
      if (next === 'cart') {
        const qs = new URLSearchParams();
        qs.set('openCart', '1');
        if (add) qs.set('add', add);
        router.push(`/?${qs.toString()}`);
      } else if (next === 'checkout') {
        router.push('/checkout');
      } else if (next === 'media') {
        router.push('/media');
      } else {
        // Default redirect to media library after login
        router.push('/media');
      }
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
          onClick={() => router.push('/')}
          className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
          aria-label="Volver al inicio"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </button>

        <div className="glass rounded-2xl p-8 md:p-10 gold-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227]/5 via-transparent to-[#C9A227]/5 pointer-events-none" />

          <div className="relative">
            <div className="text-center mb-8">
              <span className="inline-block text-[#C9A227] uppercase tracking-[0.3em] text-xs mb-3">
                Acceso Charmastery
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-[#F5F5F5]" style={{ fontFamily: 'var(--font-serif)' }}>
                {title}
              </h1>
              <p className="text-[#8A8A8E] mt-3">
                {mode === 'signin'
                  ? 'Bienvenido de nuevo. Inicia sesión para continuar.'
                  : 'Regístrate con tu email y una contraseña.'}
              </p>
            </div>

            {/* Already signed in */}
            {!isLoading && user && (
              <div className="mb-6 rounded-lg border border-[rgba(201,162,39,0.2)] bg-[#0A0A0B]/50 p-4">
                <p className="text-[#F5F5F5]">
                  Has iniciado sesión como <span className="text-[#C9A227]">{user.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="mt-3 btn-gold-filled rounded-sm w-full"
                >
                  Ir al inicio
                </button>
              </div>
            )}

            {/* Mode toggle */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                }}
                className={`rounded-md px-4 py-2 text-sm uppercase tracking-[0.15em] transition ${
                  mode === 'signin'
                    ? 'bg-[#C9A227] text-[#0A0A0B] font-semibold'
                    : 'bg-[#1A1A1F] text-[#8A8A8E] hover:text-[#F5F5F5]'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                }}
                className={`rounded-md px-4 py-2 text-sm uppercase tracking-[0.15em] transition ${
                  mode === 'signup'
                    ? 'bg-[#C9A227] text-[#0A0A0B] font-semibold'
                    : 'bg-[#1A1A1F] text-[#8A8A8E] hover:text-[#F5F5F5]'
                }`}
              >
                Registrarse
              </button>
            </div>

            {/* Form */}
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

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A8E] mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-dark w-full rounded-sm"
                  placeholder="Mínimo 8 caracteres"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A8E] mb-2">
                    Repetir contraseña
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="input-dark w-full rounded-sm"
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="btn-gold-filled rounded-sm w-full disabled:opacity-50"
              >
                {isSubmitting ? (mode === 'signin' ? 'Iniciando sesión…' : 'Creando cuenta…') : mode === 'signin' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>

              <p className="text-[#5A5A5E] text-xs text-center pt-2">
                Sin base de datos aún — las credenciales se guardan localmente en este navegador por ahora.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

