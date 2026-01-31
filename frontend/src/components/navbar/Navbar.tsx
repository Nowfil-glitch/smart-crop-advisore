'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/recommendations', label: 'Crops' },
  { href: '/weather', label: 'Weather' },
  { href: '/soil', label: 'Soil' },
  { href: '/pest-detect', label: 'Pests' },
  { href: '/market', label: 'Market' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav
          className={cn(
            // Base pill shape
            'mt-4 flex items-center justify-between',
            'rounded-full border px-5 py-3',
            // Glass effect
            'backdrop-blur-[16px]',
            'transition-all duration-500 ease-premium',
            // Default state
            'border-white/[0.06] bg-white/[0.03]',
            'shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_4px_24px_rgba(0,0,0,0.2)]',
            // Scrolled state - enhanced glow
            scrolled && cn(
              'border-white/[0.1] bg-white/[0.05]',
              'shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_30px_rgba(16,185,129,0.08),0_8px_32px_rgba(0,0,0,0.3)]'
            )
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div
              className={cn(
                'relative h-8 w-8 rounded-full',
                'bg-gradient-to-br from-accent-400 to-accent2-400',
                'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
                'transition-all duration-300',
                'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
                'group-hover:scale-105'
              )}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white/90 transition-colors group-hover:text-white">
              Smart Crop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-sm font-medium',
                    'rounded-full transition-all duration-300 ease-premium',
                    active
                      ? cn(
                        'text-white',
                        'bg-white/[0.08] border border-white/[0.1]',
                        'shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      )
                      : cn(
                        'text-white/60',
                        'hover:text-white hover:bg-white/[0.05]'
                      )
                  )}
                >
                  {/* Active indicator dot */}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                  {item.label}
                </Link>
              );
            })}

            {/* Settings button */}
            <Link
              href="/settings"
              className={cn(
                'ml-2 px-4 py-1.5 text-sm font-medium',
                'rounded-full border border-white/[0.1] bg-white/[0.04]',
                'text-white/70',
                'transition-all duration-300 ease-premium',
                'hover:border-accent-500/30 hover:bg-white/[0.08] hover:text-white',
                'hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              )}
            >
              Settings
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              href="/dashboard"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium',
                'rounded-full border border-white/[0.1] bg-gradient-to-r from-accent-500 to-accent2-500',
                'text-bg-base',
                'shadow-glow transition-all duration-300',
                'hover:shadow-glow-strong hover:brightness-110'
              )}
            >
              Open App
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
