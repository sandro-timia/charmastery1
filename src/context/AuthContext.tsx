'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  deleteUser,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type AuthUser = {
  email: string;
  uid: string;
  hasSubscription: boolean;
  name?: string;
  instagram?: string;
  country?: string;
  createdAt?: Date;
  subscriptionDate?: Date;
};

type UserProfile = {
  email: string;
  hasSubscription: boolean;
  name?: string;
  instagram?: string;
  country?: string;
  createdAt: Timestamp | null;
  subscriptionDate?: Timestamp | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signUp: (args: { email: string; password: string; confirmPassword: string; name?: string; instagram?: string; country?: string }) => Promise<void>;
  signIn: (args: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  markAsSubscribed: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// Get user profile from Firestore
async function getUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

// Save user profile to Firestore
async function saveUserProfileToFirestore(uid: string, profile: Partial<UserProfile>): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update existing document
      await updateDoc(userRef, profile);
    } else {
      // Create new document
      await setDoc(userRef, {
        ...profile,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}

// Map Firebase error codes to user-friendly Spanish messages
function getFirebaseErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Ya existe una cuenta con este correo. Por favor inicia sesión.',
    'auth/invalid-email': 'Por favor ingresa un correo electrónico válido.',
    'auth/operation-not-allowed': 'El registro está deshabilitado temporalmente.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
    'auth/user-not-found': 'No se encontró una cuenta con este correo.',
    'auth/wrong-password': 'Correo o contraseña incorrectos.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta de nuevo más tarde.',
    'auth/network-request-failed': 'Error de conexión. Verifica tu conexión a internet.',
  };
  return errorMessages[errorCode] || 'Algo salió mal. Intenta de nuevo.';
}

// Convert Firestore Timestamp to Date
function timestampToDate(timestamp: Timestamp | null | undefined): Date | undefined {
  if (!timestamp) return undefined;
  return timestamp.toDate();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && firebaseUser.email) {
        // Get user profile from Firestore
        const profile = await getUserProfileFromFirestore(firebaseUser.uid);
        
        setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          hasSubscription: profile?.hasSubscription ?? false,
          name: profile?.name,
          instagram: profile?.instagram,
          country: profile?.country,
          createdAt: timestampToDate(profile?.createdAt),
          subscriptionDate: timestampToDate(profile?.subscriptionDate),
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = useCallback(
    async ({ email, password, confirmPassword, name, instagram, country }: { 
      email: string; 
      password: string; 
      confirmPassword: string; 
      name?: string; 
      instagram?: string; 
      country?: string 
    }) => {
      const normalized = normalizeEmail(email);

      if (password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.');
      }
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden.');
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, normalized, password);
        const firebaseUser = userCredential.user;

        // Clean profile data - only include defined values (Firestore doesn't accept undefined)
        const cleanInstagram = instagram?.trim().replace(/^@/, '');
        const cleanName = name?.trim();
        const cleanCountry = country?.trim();

        // Build profile object without undefined values
        const profileData: Record<string, unknown> = {
          email: normalized,
          hasSubscription: false,
        };
        
        if (cleanName) profileData.name = cleanName;
        if (cleanInstagram) profileData.instagram = cleanInstagram;
        if (cleanCountry) profileData.country = cleanCountry;

        // Save user profile to Firestore
        await saveUserProfileToFirestore(firebaseUser.uid, profileData as Partial<UserProfile>);

        // User state will be set by onAuthStateChanged listener
      } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };
        throw new Error(getFirebaseErrorMessage(firebaseError.code || ''));
      }
    },
    []
  );

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const normalized = normalizeEmail(email);

    if (!password) {
      throw new Error('Por favor ingresa tu contraseña.');
    }

    try {
      await signInWithEmailAndPassword(auth, normalized, password);
      // User state will be set by onAuthStateChanged listener
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      throw new Error(getFirebaseErrorMessage(firebaseError.code || ''));
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  const markAsSubscribed = useCallback(async () => {
    if (!user) return;
    
    try {
      // Update Firestore
      await saveUserProfileToFirestore(user.uid, { 
        hasSubscription: true,
        subscriptionDate: serverTimestamp() as unknown as Timestamp,
      });
      
      // Update local state
      setUser({ ...user, hasSubscription: true, subscriptionDate: new Date() });
    } catch (error) {
      console.error('Error marking as subscribed:', error);
    }
  }, [user]);

  const requestPasswordReset = useCallback(async (email: string): Promise<void> => {
    const normalized = normalizeEmail(email);

    try {
      await sendPasswordResetEmail(auth, normalized);
      // Firebase sends the email automatically
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      // Don't reveal if email exists or not for security
      if (firebaseError.code === 'auth/user-not-found') {
        // Still show success to prevent email enumeration
        return;
      }
      throw new Error(getFirebaseErrorMessage(firebaseError.code || ''));
    }
  }, []);

  const deleteAccount = useCallback(async (): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No hay usuario autenticado.');
    }

    try {
      // Delete user data from Firestore first
      await deleteDoc(doc(db, 'users', currentUser.uid));
      
      // Then delete the Firebase Auth account
      await deleteUser(currentUser);
      
      // Clear local state
      setUser(null);
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      
      // If the user needs to re-authenticate
      if (firebaseError.code === 'auth/requires-recent-login') {
        throw new Error('Por seguridad, necesitas volver a iniciar sesión antes de eliminar tu cuenta.');
      }
      
      console.error('Error deleting account:', error);
      throw new Error('Error al eliminar la cuenta. Intenta de nuevo.');
    }
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
      deleteAccount,
    }),
    [user, isLoading, signUp, signIn, signOut, markAsSubscribed, requestPasswordReset, deleteAccount]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
