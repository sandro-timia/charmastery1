'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { items, subtotal, clearCart, openCart } = useCart();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/auth?next=checkout');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 gold-border">
            <p className="text-[#8A8A8E]">Redirigiendo a iniciar sesión…</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#4A1D6A]/18 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8A8A8E]">Pago</p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#F5F5F5]" style={{ fontFamily: 'var(--font-serif)' }}>
              Asegura tu acceso
            </h1>
            <p className="text-[#8A8A8E] mt-2">
              Sesión iniciada como <span className="text-[#C9A227]">{user.email}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn-gold"
          >
            Volver al inicio
          </button>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 gold-border">
          {items.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-serif text-[#F5F5F5]" style={{ fontFamily: 'var(--font-serif)' }}>
                Tu carrito está vacío
              </h2>
              <p className="text-[#8A8A8E] mt-2">
                Añade el programa a tu carrito para continuar.
              </p>
              <button
                type="button"
                className="btn-gold-filled mt-6"
                onClick={() => {
                  openCart();
                  router.push('/');
                }}
              >
                Abrir carrito
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 rounded-lg border border-[rgba(201,162,39,0.12)] bg-[#0A0A0B]/40 p-4"
                  >
                    <div className="min-w-0">
                      <p className="text-[#F5F5F5] font-serif text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                        {item.name}
                      </p>
                      <p className="text-[#8A8A8E] text-sm mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#C9A227] font-semibold">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-divider mt-8" />

              <div className="flex items-center justify-between mt-6">
                <span className="text-[#8A8A8E]">Total</span>
                <span className="text-3xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                  ${subtotal}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="btn-gold-filled w-full"
                  onClick={() => {
                    // Placeholder checkout action (no payment processor yet)
                    alert('El flujo de pago aún no está conectado.');
                  }}
                >
                  Realizar pedido (demo)
                </button>
                <button
                  type="button"
                  className="w-full py-2 text-[#8A8A8E] hover:text-[#ef4444] text-sm transition-colors"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

