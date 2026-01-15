'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function DemoCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const email = searchParams.get('email') || '';
  const sessionId = searchParams.get('session_id') || '';

  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Redirect to success page
    router.push(`/checkout/success?session_id=${sessionId}`);
  };

  const handleCancel = () => {
    router.push('/checkout');
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4 pt-24 pb-8">
      <div className="w-full max-w-md">
        {/* Demo Banner */}
        <div className="bg-[#C9A227] text-[#0A0A0B] text-center py-2 px-4 rounded-t-xl font-semibold text-sm">
          🎭 MODO DEMO - Simulación de Stripe Checkout
        </div>

        <div className="bg-[#1A1A1F] rounded-b-2xl p-6 border border-[rgba(201,162,39,0.2)] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#C9A227] flex items-center justify-center">
              <span className="text-xl">🎩</span>
            </div>
            <h1 className="text-lg font-semibold text-[#F5F5F5]">Charmastery</h1>
            <p className="text-[#8A8A8E] text-xs mt-1">Pago seguro</p>
          </div>

          {/* Amount */}
          <div className="bg-[#0A0A0B] rounded-xl p-3 mb-4 border border-[rgba(201,162,39,0.1)]">
            <div className="flex justify-between items-center">
              <span className="text-[#8A8A8E] text-sm">Total a pagar</span>
              <span className="text-xl font-bold text-[#C9A227]">${amount} USD</span>
            </div>
            {email && (
              <p className="text-[#5A5A5E] text-xs mt-1">
                Factura enviada a: {decodeURIComponent(email)}
              </p>
            )}
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Card Number */}
            <div>
              <label className="block text-[#8A8A8E] text-xs mb-1">Número de tarjeta</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full bg-[#0A0A0B] border border-[rgba(201,162,39,0.2)] rounded-lg px-3 py-2.5 text-[#F5F5F5] placeholder-[#5A5A5E] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                    <rect width="32" height="20" rx="2" fill="#1A1F71"/>
                    <path d="M12.5 14.5L14 5.5H16.5L15 14.5H12.5Z" fill="white"/>
                    <path d="M21.5 5.7C21 5.5 20.2 5.3 19.2 5.3C16.7 5.3 15 6.5 15 8.2C15 9.5 16.2 10.2 17.1 10.6C18 11 18.4 11.3 18.4 11.7C18.4 12.3 17.7 12.6 17 12.6C16 12.6 15.4 12.4 14.5 12L14.2 11.9L13.8 14.3C14.5 14.6 15.7 14.8 17 14.8C19.7 14.8 21.3 13.6 21.3 11.8C21.3 10.8 20.7 10 19.4 9.4C18.6 9 18.1 8.7 18.1 8.3C18.1 7.9 18.5 7.5 19.4 7.5C20.2 7.5 20.8 7.6 21.2 7.8L21.4 7.9L21.5 5.7Z" fill="white"/>
                  </svg>
                  <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                    <rect width="32" height="20" rx="2" fill="#EB001B" fillOpacity="0.1"/>
                    <circle cx="12" cy="10" r="6" fill="#EB001B"/>
                    <circle cx="20" cy="10" r="6" fill="#F79E1B"/>
                    <path d="M16 5.8C17.3 6.9 18 8.4 18 10C18 11.6 17.3 13.1 16 14.2C14.7 13.1 14 11.6 14 10C14 8.4 14.7 6.9 16 5.8Z" fill="#FF5F00"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#8A8A8E] text-xs mb-1">Vencimiento</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  maxLength={5}
                  className="w-full bg-[#0A0A0B] border border-[rgba(201,162,39,0.2)] rounded-lg px-3 py-2.5 text-[#F5F5F5] placeholder-[#5A5A5E] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-[#8A8A8E] text-xs mb-1">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  className="w-full bg-[#0A0A0B] border border-[rgba(201,162,39,0.2)] rounded-lg px-3 py-2.5 text-[#F5F5F5] placeholder-[#5A5A5E] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-[#8A8A8E] text-xs mb-1">Nombre en la tarjeta</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NOMBRE APELLIDO"
                className="w-full bg-[#0A0A0B] border border-[rgba(201,162,39,0.2)] rounded-lg px-3 py-2.5 text-[#F5F5F5] placeholder-[#5A5A5E] focus:outline-none focus:border-[#C9A227] transition-colors uppercase text-sm"
                required
              />
            </div>

            {/* Test Card Info */}
            <div className="bg-[#2D1B4E]/30 rounded-lg p-2 text-xs text-[#8A8A8E]">
              <p className="font-semibold text-[#C9A227]">💡 Tarjeta de prueba: 4242 4242 4242 4242 | MM/AA: 12/28 | CVC: 123</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#C9A227] hover:bg-[#D4AF37] text-[#0A0A0B] font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando pago...
                </span>
              ) : (
                `Pagar $${amount} USD`
              )}
            </button>

            {/* Cancel Link */}
            <button
              type="button"
              onClick={handleCancel}
              className="w-full text-[#8A8A8E] hover:text-[#F5F5F5] text-xs py-1 transition-colors"
            >
              ← Cancelar y volver
            </button>
          </form>

          {/* Stripe Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[#5A5A5E] text-xs">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
            Simulación de pago seguro
          </div>
        </div>
      </div>
    </main>
  );
}

// Loading fallback for Suspense
function DemoCheckoutLoading() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4 pt-24 pb-8">
      <div className="w-full max-w-md">
        <div className="bg-[#1A1A1F] rounded-2xl p-6 border border-[rgba(201,162,39,0.2)] shadow-2xl">
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-[#C9A227]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-[#8A8A8E]">Cargando checkout...</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DemoCheckoutPage() {
  return (
    <Suspense fallback={<DemoCheckoutLoading />}>
      <DemoCheckoutContent />
    </Suspense>
  );
}
