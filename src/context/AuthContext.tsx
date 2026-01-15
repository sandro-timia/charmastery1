'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthUser = {
  email: string;
};

type StoredUser = {
  salt: string;
  hash: string;
  createdAt: number;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signUp: (args: { email: string; password: string; confirmPassword: string }) => Promise<void>;
  signIn: (args: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = 'charmastery_users_v1';
const SESSION_KEY = 'charmastery_session_v1';

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  // simple + pragmatic email check (no DB/server)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(digest);
}

function loadUsers(): Record<string, StoredUser> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredUser>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): AuthUser | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { email?: string };
    if (!parsed?.email) return null;
    return { email: parsed.email };
  } catch {
    return null;
  }
}

function saveSession(email: string) {
  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, signedInAt: Date.now() })
  );
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = loadSession();
    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  const signUp = useCallback(
    async ({ email, password, confirmPassword }: { email: string; password: string; confirmPassword: string }) => {
      const normalized = normalizeEmail(email);

      if (!isValidEmail(normalized)) {
        throw new Error('Por favor ingresa un correo electrónico válido.');
      }
      if (password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.');
      }
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden.');
      }

      const users = loadUsers();
      if (users[normalized]) {
        throw new Error('Ya existe una cuenta con este correo. Por favor inicia sesión.');
      }

      const saltBytes = new Uint8Array(16);
      crypto.getRandomValues(saltBytes);
      const salt = bytesToBase64(saltBytes);
      const hash = await sha256Hex(`${salt}:${password}`);

      users[normalized] = { salt, hash, createdAt: Date.now() };
      saveUsers(users);

      saveSession(normalized);
      setUser({ email: normalized });
    },
    []
  );

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      throw new Error('Por favor ingresa un correo electrónico válido.');
    }
    if (!password) {
      throw new Error('Por favor ingresa tu contraseña.');
    }

    const users = loadUsers();
    const existing = users[normalized];
    if (!existing) {
      throw new Error('No se encontró una cuenta con este correo. Por favor regístrate.');
    }

    const hash = await sha256Hex(`${existing.salt}:${password}`);
    if (hash !== existing.hash) {
      throw new Error('Correo o contraseña incorrectos.');
    }

    saveSession(normalized);
    setUser({ email: normalized });
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      signUp,
      signIn,
      signOut,
    }),
    [user, isLoading, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

