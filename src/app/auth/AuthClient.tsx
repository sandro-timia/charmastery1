'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { countries } from '@/data/countries';

type Mode = 'signin' | 'signup';

export default function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading, signIn, signUp } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [country, setCountry] = useState('');
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
        await signUp({ email, password, confirmPassword, name: name || undefined, instagram: instagram || undefined, country: country || undefined });
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

      <div className={`relative mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${mode === 'signup' ? 'max-w-3xl' : 'max-w-xl'}`}>
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
              {mode === 'signin' ? (
                /* Sign In - Single Column */
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
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
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-dark w-full rounded-sm"
                      placeholder="Tu contraseña"
                      autoComplete="current-password"
                    />
                  </div>
                </>
              ) : (
                /* Sign Up - Two Columns */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Column 1: Account Credentials */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
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
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-dark w-full rounded-sm"
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="new-password"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                        Repetir Contraseña
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
                  </div>

                  {/* Column 2: Personal Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                        Nombre y Apellido
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-dark w-full rounded-sm"
                        placeholder="Tu nombre completo"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                        País
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="input-dark w-full rounded-sm appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238A8A8E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                          backgroundSize: '20px',
                          paddingRight: '40px',
                        }}
                      >
                        <option value="" disabled>Selecciona tu país</option>
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                        Instagram <span className="text-[#5A5A5E]">(opcional)</span>
                      </label>
                      <div className="relative flex items-center">
                        {/* Instagram Icon and @ symbol */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                          <svg 
                            className="w-5 h-5" 
                            viewBox="0 0 24 24"
                          >
                            <defs>
                              <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFDC80" />
                                <stop offset="10%" stopColor="#FCAF45" />
                                <stop offset="30%" stopColor="#F77737" />
                                <stop offset="50%" stopColor="#F56040" />
                                <stop offset="70%" stopColor="#E1306C" />
                                <stop offset="90%" stopColor="#C13584" />
                                <stop offset="100%" stopColor="#833AB4" />
                              </linearGradient>
                            </defs>
                            <path 
                              fill="url(#instagram-gradient)"
                              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            />
                          </svg>
                          <span className="text-[#8A8A8E] text-base">@</span>
                        </div>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value.replace(/^@/, ''))}
                          className="input-dark w-full rounded-sm"
                          style={{ paddingLeft: '64px' }}
                          placeholder="tu_usuario"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
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

              {mode === 'signin' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => router.push('/auth/forgot-password')}
                    className="text-[#C9A227] text-sm hover:text-[#D4AF37] hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

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

