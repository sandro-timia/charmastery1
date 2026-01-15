'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { user, isLoading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0B]/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-[#C9A227] hover:text-[#D4AF37] transition-colors"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            CHARMASTERY
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('tricks')}
              className="text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
            >
              Tricks
            </button>
            <button
              onClick={() => scrollToSection('tours')}
              className="text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
            >
              Tours
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
            >
              About
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            {/* Auth */}
            {!isLoading && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center rounded-full bg-[#1A1A1F] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F5F5F5] border border-[rgba(201,162,39,0.18)] hover:border-[rgba(201,162,39,0.35)] hover:shadow-[0_0_18px_rgba(201,162,39,0.12)] transition"
                >
                  My Account
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center justify-center rounded-full bg-[#C9A227] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#0A0A0B] font-semibold hover:bg-[#D4AF37] hover:shadow-[0_0_22px_rgba(201,162,39,0.22)] transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="hidden sm:block text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-[#F5F5F5] hover:text-[#C9A227] transition-colors group"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A227] text-[#0A0A0B] text-xs font-bold rounded-full flex items-center justify-center animate-pulse-gold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-[#F5F5F5]" aria-label="Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

