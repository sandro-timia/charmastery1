'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Cookie categories
export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'functional';

export interface CookiePreferences {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieContextType {
  // State
  preferences: CookiePreferences;
  hasConsented: boolean;
  isLoaded: boolean;
  showBanner: boolean;
  showSettings: boolean;
  
  // Actions
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
  resetConsent: () => void;
  
  // Helpers
  hasConsent: (category: CookieCategory) => boolean;
  isEU: boolean;
  doNotTrack: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const CONSENT_COOKIE = 'charmastery_cookie_consent';
const PREFERENCES_COOKIE = 'charmastery_cookie_preferences';
const CONSENT_DURATION_DAYS = 365;

const CookieContext = createContext<CookieContextType | undefined>(undefined);

// Cookie utilities
function setCookie(name: string, value: string, days: number): void {
  if (typeof window === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// Detect EU timezone (client-side approximation)
function detectEU(): boolean {
  if (typeof window === 'undefined') return true; // Default to strict mode on server
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const euTimezones = [
      'Europe/', 'Atlantic/Azores', 'Atlantic/Canary', 'Atlantic/Faroe',
      'Atlantic/Madeira', 'Atlantic/Reykjavik'
    ];
    return euTimezones.some(tz => timezone.startsWith(tz));
  } catch {
    return true; // Default to strict if detection fails
  }
}

// Detect Do Not Track
function detectDoNotTrack(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.doNotTrack === '1' || 
         (window as unknown as { doNotTrack?: string }).doNotTrack === '1';
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isEU, setIsEU] = useState(true);
  const [doNotTrack, setDoNotTrack] = useState(false);

  // Load consent from cookies on mount
  useEffect(() => {
    const consent = getCookie(CONSENT_COOKIE);
    const prefsString = getCookie(PREFERENCES_COOKIE);
    
    setIsEU(detectEU());
    setDoNotTrack(detectDoNotTrack());

    if (consent === 'true' && prefsString) {
      try {
        const savedPrefs = JSON.parse(prefsString) as CookiePreferences;
        setPreferences({ ...savedPrefs, essential: true });
        setHasConsented(true);
        setShowBanner(false);
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
    
    setIsLoaded(true);
  }, []);

  // Apply consent by managing scripts
  useEffect(() => {
    if (!isLoaded) return;
    
    // Enable/disable scripts based on consent
    const scripts = document.querySelectorAll('script[data-consent-category]');
    scripts.forEach(script => {
      const category = script.getAttribute('data-consent-category') as CookieCategory;
      if (category && preferences[category]) {
        // Script is allowed - if it was disabled, we'd need to reload
        script.removeAttribute('data-consent-blocked');
      } else if (category) {
        script.setAttribute('data-consent-blocked', 'true');
      }
    });

    // Dispatch event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
      detail: preferences 
    }));
  }, [preferences, isLoaded]);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    const finalPrefs = { ...prefs, essential: true };
    setCookie(CONSENT_COOKIE, 'true', CONSENT_DURATION_DAYS);
    setCookie(PREFERENCES_COOKIE, JSON.stringify(finalPrefs), CONSENT_DURATION_DAYS);
    setPreferences(finalPrefs);
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [saveConsent]);

  const rejectNonEssential = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  }, [saveConsent]);

  const savePreferences = useCallback((prefs: Partial<CookiePreferences>) => {
    saveConsent({ ...preferences, ...prefs, essential: true });
  }, [preferences, saveConsent]);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowBanner(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, [hasConsented]);

  const closeBanner = useCallback(() => {
    // For GDPR compliance, closing banner without choice = reject non-essential
    if (!hasConsented) {
      rejectNonEssential();
    }
    setShowBanner(false);
  }, [hasConsented, rejectNonEssential]);

  const resetConsent = useCallback(() => {
    deleteCookie(CONSENT_COOKIE);
    deleteCookie(PREFERENCES_COOKIE);
    setPreferences(defaultPreferences);
    setHasConsented(false);
    setShowBanner(true);
  }, []);

  const hasConsent = useCallback((category: CookieCategory): boolean => {
    return preferences[category] ?? false;
  }, [preferences]);

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        isLoaded,
        showBanner,
        showSettings,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openSettings,
        closeSettings,
        closeBanner,
        resetConsent,
        hasConsent,
        isEU,
        doNotTrack,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}
