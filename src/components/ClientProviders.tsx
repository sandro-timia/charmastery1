'use client';

import { Suspense, lazy } from 'react';
import { CookieProvider } from '@/context/CookieContext';
import { CartProvider } from '@/context/CartContext';

// Lazy load AuthProvider para diferir la inicialización de Firebase
const AuthProvider = lazy(() =>
  import('@/context/AuthContext').then(mod => ({ default: mod.AuthProvider }))
);

// Fallback mientras carga Firebase (invisible para no afectar UX)
function AuthFallback({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AuthFallback>{children}</AuthFallback>}>
      <AuthProvider>
        <CookieProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CookieProvider>
      </AuthProvider>
    </Suspense>
  );
}
