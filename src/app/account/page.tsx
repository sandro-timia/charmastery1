'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { countries } from '@/data/countries';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, signOut, deleteAccount } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/auth');
  }, [isLoading, user, router]);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      await deleteAccount();
      router.push('/');
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Error al eliminar la cuenta.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || !user) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 gold-border">
            <p className="text-[#8A8A8E]">Cargando..</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
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

            {/* Danger Zone */}
            <div className="mt-12 pt-8 border-t border-red-500/20">
              <p className="text-red-400 text-xs uppercase tracking-wider mb-3">Zona de Peligro</p>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-[#F5F5F5] font-medium">Eliminar cuenta</p>
                    <p className="text-[#8A8A8E] text-sm mt-1">
                      Esta acción eliminará permanentemente tu cuenta y todos tus datos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="shrink-0 px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-colors text-sm font-medium"
                  >
                    Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !isDeleting && setShowDeleteModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-[#1A1A1F] border border-red-500/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            {/* Warning Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-2xl font-serif text-[#F5F5F5] text-center mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              ¿Eliminar tu cuenta?
            </h2>
            
            <p className="text-[#8A8A8E] text-center mb-6">
              Esta acción <span className="text-red-400 font-semibold">no se puede deshacer</span>. Se eliminarán permanentemente:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-[#8A8A8E] text-sm">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tu información personal
              </li>
              <li className="flex items-center gap-2 text-[#8A8A8E] text-sm">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tu historial de suscripción
              </li>
              <li className="flex items-center gap-2 text-[#8A8A8E] text-sm">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tu acceso a todos los tutoriales
              </li>
            </ul>

            {deleteError && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200 mb-4">
                {deleteError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 rounded-lg border border-[rgba(201,162,39,0.3)] text-[#F5F5F5] hover:border-[#C9A227] transition-colors font-medium disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  'Sí, eliminar mi cuenta'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
