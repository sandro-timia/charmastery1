'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Trick } from '@/data/mockData';

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

