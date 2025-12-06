'use client';

import { useState } from 'react';

export default function SignUpSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section id="signup" className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A1D6A]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Card Container */}
        <div className="glass rounded-2xl p-8 md:p-12 gold-border relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#C9A227]/20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[#C9A227]/20" />

          {/* Content */}
          <div className="text-center relative">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#2D1B4E]/50 border border-[#4A1D6A] flex items-center justify-center animate-pulse-gold">
              <svg
                className="w-10 h-10 text-[#C9A227]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {/* Headline */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F5F5F5] mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Enter the Hidden Circle
            </h2>

            {/* Subtext */}
            <p className="text-[#8A8A8E] mb-8 max-w-lg mx-auto">
              Get early access to new tricks, exclusive discounts, and tour announcements 
              before anyone else.
            </p>

            {/* Form */}
            {isSubmitted ? (
              <div className="animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-serif text-[#C9A227] mb-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  You&apos;re In
                </h3>
                <p className="text-[#8A8A8E]">
                  Watch your inbox for secrets revealed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="input-dark flex-1 rounded-sm"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-gold-filled whitespace-nowrap rounded-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      'Join Now'
                    )}
                  </button>
                </div>
                <p className="text-[#5A5A5E] text-xs mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

