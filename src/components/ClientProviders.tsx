'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CookieProvider } from '@/context/CookieContext';
import { CartProvider } from '@/context/CartContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CookieProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CookieProvider>
    </AuthProvider>
  );
}
