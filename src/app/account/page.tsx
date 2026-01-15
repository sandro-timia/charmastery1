'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/auth');
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 gold-border">
            <p className="text-[#8A8A8E]">Loading…</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#0A0A0B]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 gold-border">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8A8A8E] mb-3">
            My Account
          </p>
          <h1
            className="text-3xl md:text-4xl font-serif text-[#F5F5F5]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Account details
          </h1>
          <p className="text-[#8A8A8E] mt-3">
            Signed in as <span className="text-[#C9A227]">{user.email}</span>
          </p>

          <div className="section-divider mt-8" />

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button type="button" className="btn-gold-filled" onClick={() => router.push('/')}>
              Back home
            </button>
            <button
              type="button"
              className="btn-gold"
              onClick={() => {
                signOut();
                router.push('/');
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

