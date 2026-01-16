'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { countries } from '@/data/countries';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/auth');
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 gold-border">
            <p className="text-[#8A8A8E]">Cargando…</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 gold-border">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8A8A8E] mb-3">
            Mi Cuenta
          </p>
          <h1
            className="text-3xl md:text-4xl font-serif text-[#F5F5F5]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Detalles de la cuenta
          </h1>
          <p className="text-[#8A8A8E] mt-3">
            Sesión iniciada como <span className="text-[#C9A227]">{user.email}</span>
          </p>

          {/* User Profile Info */}
          <div className="mt-6 p-4 rounded-xl bg-[#0A0A0B]/60 border border-[rgba(201,162,39,0.15)]">
            <p className="text-[#8A8A8E] text-sm mb-3">Información Personal</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.name && (
                <div>
                  <p className="text-[#5A5A5E] text-xs uppercase tracking-wider mb-1">Nombre</p>
                  <p className="text-[#F5F5F5]">{user.name}</p>
                </div>
              )}
              {user.country && (
                <div>
                  <p className="text-[#5A5A5E] text-xs uppercase tracking-wider mb-1">País</p>
                  <p className="text-[#F5F5F5]">
                    {countries.find(c => c.code === user.country)?.flag} {countries.find(c => c.code === user.country)?.name}
                  </p>
                </div>
              )}
              {user.instagram && (
                <div>
                  <p className="text-[#5A5A5E] text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <a 
                    href={`https://instagram.com/${user.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A227] hover:text-[#D4AF37] transition-colors"
                  >
                    @{user.instagram}
                  </a>
                </div>
              )}
            </div>
            {!user.name && !user.country && !user.instagram && (
              <p className="text-[#5A5A5E] text-sm italic">No hay información personal adicional</p>
            )}
          </div>

          {/* Subscription Status */}
          <div className="mt-6 p-4 rounded-xl bg-[#0A0A0B]/60 border border-[rgba(201,162,39,0.15)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8A8A8E] text-sm mb-1">Estado de Suscripción</p>
                {user.hasSubscription ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-sm font-semibold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Suscrito
                    </span>
                    <span className="text-[#F5F5F5] text-sm">Acceso completo a todos los tutoriales</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A8A8E]/20 text-[#8A8A8E] text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      No Suscrito
                    </span>
                  </div>
                )}
              </div>
              {!user.hasSubscription && (
                <button
                  type="button"
                  className="btn-gold text-xs"
                  onClick={() => router.push('/#mastery-program')}
                >
                  Obtener Acceso
                </button>
              )}
            </div>
          </div>

          <div className="section-divider mt-8" />

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button type="button" className="btn-gold-filled" onClick={() => router.push('/')}>
              Volver al inicio
            </button>
            <button
              type="button"
              className="btn-gold"
              onClick={() => {
                signOut();
                router.push('/');
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

