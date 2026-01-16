'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthUser = {
  email: string;
  hasSubscription: boolean;
};

type StoredUser = {
  salt: string;
  hash: string;
  createdAt: number;
  hasSubscription?: boolean;
};

type ResetToken = {
  email: string;
  token: string;
  expiresAt: number;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signUp: (args: { email: string; password: string; confirmPassword: string }) => Promise<void>;
  signIn: (args: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  markAsSubscribed: () => void;
  requestPasswordReset: (email: string) => Promise<string>; // Returns reset link
  validateResetToken: (token: string) => { valid: boolean; email?: string };
  resetPassword: (args: { token: string; newPassword: string; confirmPassword: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = 'charmastery_users_v1';
const SESSION_KEY = 'charmastery_session_v1';
const RESET_TOKENS_KEY = 'charmastery_reset_tokens_v1';

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
    
    // Load subscription status from stored user data
    const users = loadUsers();
    const userData = users[parsed.email];
    const hasSubscription = userData?.hasSubscription ?? false;
    
    return { email: parsed.email, hasSubscription };
  } catch {
    return null;
  }
}

function saveSession(email: string, hasSubscription: boolean = false) {
  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, signedInAt: Date.now(), hasSubscription })
  );
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

function loadResetTokens(): ResetToken[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RESET_TOKENS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ResetToken[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveResetTokens(tokens: ResetToken[]) {
  window.localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens));
}

function generateResetToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
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

      users[normalized] = { salt, hash, createdAt: Date.now(), hasSubscription: false };
      saveUsers(users);

      saveSession(normalized, false);
      setUser({ email: normalized, hasSubscription: false });
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

    const hasSubscription = existing.hasSubscription ?? false;
    saveSession(normalized, hasSubscription);
    setUser({ email: normalized, hasSubscription });
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const markAsSubscribed = useCallback(() => {
    if (!user) return;
    
    // Update stored user data
    const users = loadUsers();
    if (users[user.email]) {
      users[user.email].hasSubscription = true;
      saveUsers(users);
    }
    
    // Update session and state
    saveSession(user.email, true);
    setUser({ ...user, hasSubscription: true });
  }, [user]);

  const requestPasswordReset = useCallback(async (email: string): Promise<string> => {
    const normalized = normalizeEmail(email);
    
    if (!isValidEmail(normalized)) {
      throw new Error('Por favor ingresa un correo electrónico válido.');
    }

    const users = loadUsers();
    if (!users[normalized]) {
      throw new Error('No se encontró una cuenta con este correo.');
    }

    // Generate reset token
    const token = generateResetToken();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour expiry

    // Clean up expired tokens and add new one
    const tokens = loadResetTokens().filter(t => t.expiresAt > Date.now() && t.email !== normalized);
    tokens.push({ email: normalized, token, expiresAt });
    saveResetTokens(tokens);

    // Return the reset link (in production, this would be sent via email)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/auth/reset-password?token=${token}`;
  }, []);

  const validateResetToken = useCallback((token: string): { valid: boolean; email?: string } => {
    const tokens = loadResetTokens();
    const found = tokens.find(t => t.token === token && t.expiresAt > Date.now());
    
    if (found) {
      return { valid: true, email: found.email };
    }
    return { valid: false };
  }, []);

  const resetPassword = useCallback(async ({ token, newPassword, confirmPassword }: { token: string; newPassword: string; confirmPassword: string }) => {
    if (newPassword.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }
    if (newPassword !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden.');
    }

    const tokens = loadResetTokens();
    const tokenData = tokens.find(t => t.token === token && t.expiresAt > Date.now());
    
    if (!tokenData) {
      throw new Error('El enlace de restablecimiento es inválido o ha expirado.');
    }

    const users = loadUsers();
    const userData = users[tokenData.email];
    
    if (!userData) {
      throw new Error('Usuario no encontrado.');
    }

    // Generate new salt and hash for the new password
    const saltBytes = new Uint8Array(16);
    crypto.getRandomValues(saltBytes);
    const newSalt = bytesToBase64(saltBytes);
    const newHash = await sha256Hex(`${newSalt}:${newPassword}`);

    // Update user password
    users[tokenData.email] = {
      ...userData,
      salt: newSalt,
      hash: newHash,
    };
    saveUsers(users);

    // Remove used token
    const remainingTokens = tokens.filter(t => t.token !== token);
    saveResetTokens(remainingTokens);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      signUp,
      signIn,
      signOut,
      markAsSubscribed,
      requestPasswordReset,
      validateResetToken,
      resetPassword,
    }),
    [user, isLoading, signUp, signIn, signOut, markAsSubscribed, requestPasswordReset, validateResetToken, resetPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

