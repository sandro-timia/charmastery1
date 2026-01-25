'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { masteryProgram } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

export default function Cart() {
  const { items, subtotal, isCartOpen, addToCart, openCart, closeCart, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show cart items after component has mounted on client
  const displayItems = mounted ? items : [];
  const displaySubtotal = mounted ? subtotal : 0;

  // Allow redirect flows (e.g. /?openCart=1) to open cart automatically
  useEffect(() => {
    const shouldOpen = searchParams.get('openCart') === '1';
    const add = searchParams.get('add');
    if (!shouldOpen && !add) return;

    if (add === 'mastery') {
      addToCart(masteryProgram);
    }
    if (shouldOpen) {
      openCart();
    }

    router.replace('/');
  }, [searchParams, addToCart, openCart, router]);

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0B] border-l border-[rgba(201,162,39,0.2)] z-50 transform transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[rgba(201,162,39,0.1)]">
            <h2
              className="text-2xl font-serif text-[#F5F5F5]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Tu Carrito
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
              aria-label="Cerrar carrito"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {displayItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 mb-6 rounded-full bg-[#1A1A1F] border border-[rgba(201,162,39,0.2)] flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#8A8A8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-serif text-[#F5F5F5] mb-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Tu carrito está vacío
                </h3>
                <p className="text-[#8A8A8E] text-sm mb-6">
                  Descubre trucos increíbles para dominar
                </p>
                <div className="w-full max-w-xs space-y-3">
                  <button
                    type="button"
                    onClick={() => addToCart(masteryProgram)}
                    className="btn-gold-filled w-full"
                  >
                    Añadir Acceso Total (${masteryProgram.price})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      const el = document.getElementById('tricks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-gold w-full"
                  >
                    Ver Trucos
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {displayItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {displayItems.length > 0 && (
            <div className="p-6 border-t border-[rgba(201,162,39,0.1)] bg-[#121214]">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#8A8A8E]">Subtotal</span>
                <span className="text-2xl font-serif text-[#C9A227]" style={{ fontFamily: 'var(--font-serif)' }}>
                  ${displaySubtotal}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="btn-gold-filled w-full"
                  onClick={() => {
                    // Gate checkout behind auth
                    closeCart();
                    if (!isLoading && user) {
                      router.push('/checkout');
                    } else {
                      router.push('/auth?next=checkout');
                    }
                  }}
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-[#8A8A8E] hover:text-[#ef4444] text-sm transition-colors"
                >
                  Vaciar Carrito
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-[rgba(201,162,39,0.1)]">
                <div className="flex items-center gap-2 text-[#8A8A8E] text-xs">
                  <svg className="w-4 h-4 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pago Seguro
                </div>
                <div className="flex items-center gap-2 text-[#8A8A8E] text-xs">
                  <svg className="w-4 h-4 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Acceso Instantáneo
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

