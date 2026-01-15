'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Trick } from '@/data/mockData';

const CART_STORAGE_KEY = 'charmastery_cart';

export interface CartItem extends Trick {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (trick: Trick) => void;
  removeFromCart: (trickId: number) => void;
  clearCart: () => void;
  isInCart: (trickId: number) => boolean;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to safely get cart from localStorage
function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
  }
  return [];
}

// Helper to safely save cart to localStorage
function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    const storedCart = getStoredCart();
    if (storedCart.length > 0) {
      setItems(storedCart);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveCart(items);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((trick: Trick) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === trick.id);
      if (existingItem) {
        // Item already in cart, don't add again (tricks are unique purchases)
        return prevItems;
      }
      return [...prevItems, { ...trick, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((trickId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== trickId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    // Also clear from localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const isInCart = useCallback((trickId: number) => {
    return items.some(item => item.id === trickId);
  }, [items]);

  const itemCount = items.length;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        itemCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

