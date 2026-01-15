'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { itemCount, toggleCart } = useCart();
  const { user, isLoading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section on homepage
      if (pathname === '/') {
        const sections = ['tricks', 'tours', 'about'];
        let currentSection: string | null = null;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (with some offset for header)
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = sectionId;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            className="px-4 py-2 border-2 border-[#C9A227] rounded-sm text-2xl md:text-3xl font-serif tracking-[0.2em] text-[#C9A227] hover:text-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            CHARMASTERY
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('tricks')}
              className={`text-sm uppercase tracking-[0.15em] transition-colors ${
                pathname === '/' && activeSection === 'tricks'
                  ? 'text-[#C9A227]'
                  : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
              }`}
            >
              Trucos
            </button>
            <button
              onClick={() => scrollToSection('tours')}
              className={`text-sm uppercase tracking-[0.15em] transition-colors ${
                pathname === '/' && activeSection === 'tours'
                  ? 'text-[#C9A227]'
                  : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
              }`}
            >
              Giras
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm uppercase tracking-[0.15em] transition-colors ${
                pathname === '/' && activeSection === 'about'
                  ? 'text-[#C9A227]'
                  : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
              }`}
            >
              Nosotros
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
                  Mi Cuenta
                </Link>
                <Link
                  href="/media"
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] font-semibold transition-all ${
                    pathname === '/media'
                      ? 'bg-[#C9A227] text-[#0A0A0B]'
                      : 'bg-[#C9A227] text-[#0A0A0B] hover:bg-[#D4AF37] hover:shadow-[0_0_22px_rgba(201,162,39,0.22)]'
                  }`}
                >
                  Aprender
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center justify-center rounded-full bg-[#1A1A1F] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F5F5F5] border border-[rgba(201,162,39,0.18)] hover:border-[rgba(201,162,39,0.35)] hover:shadow-[0_0_18px_rgba(201,162,39,0.12)] transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#C9A227] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#0A0A0B] font-semibold hover:bg-[#D4AF37] hover:shadow-[0_0_22px_rgba(201,162,39,0.22)] transition"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-[#F5F5F5] hover:text-[#C9A227] transition-colors group"
              aria-label={`Carrito de compras con ${itemCount} artículos`}
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
            <button
              className="md:hidden p-2 text-[#F5F5F5]"
              aria-label="Menú"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 pb-6 bg-[#0A0A0B]/95 backdrop-blur-md">
            <button
              onClick={() => scrollToSection('tricks')}
              className={`w-full text-left py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#1A1A1F] rounded-lg px-3 transition-colors ${
                pathname === '/' && activeSection === 'tricks'
                  ? 'text-[#C9A227]'
                  : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
              }`}
            >
              Trucos
            </button>
            <button
              onClick={() => scrollToSection('tours')}
              className={`w-full text-left py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#1A1A1F] rounded-lg px-3 transition-colors ${
                pathname === '/' && activeSection === 'tours'
                  ? 'text-[#C9A227]'
                  : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
              }`}
            >
              Giras
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`w-full text-left py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#1A1A1F] rounded-lg px-3 transition-colors ${
                pathname === '/' && activeSection === 'about'
                  ? 'text-[#C9A227]'
                  : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
              }`}
            >
              Nosotros
            </button>

            {/* Divider */}
            <div className="h-px bg-[#2A2A2F] my-2" />

            {/* Auth Section */}
            {!isLoading && user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#1A1A1F] rounded-lg px-3 transition-colors ${
                    pathname === '/account'
                      ? 'text-[#C9A227]'
                      : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
                  }`}
                >
                  Mi Cuenta
                </Link>
                <Link
                  href="/media"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#1A1A1F] rounded-lg px-3 transition-colors ${
                    pathname === '/media'
                      ? 'text-[#C9A227]'
                      : 'text-[#8A8A8E] hover:text-[#F5F5F5]'
                  }`}
                >
                  Aprender
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 text-sm uppercase tracking-[0.15em] text-[#8A8A8E] hover:text-[#F5F5F5] hover:bg-[#1A1A1F] rounded-lg px-3 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm uppercase tracking-[0.15em] bg-[#C9A227] text-[#0A0A0B] font-semibold hover:bg-[#D4AF37] rounded-lg px-3 transition-colors mt-2"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

