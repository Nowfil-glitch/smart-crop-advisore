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
        <div
          className={cn(
            'grain mt-3 flex items-center justify-between rounded-glass border border-white/10 bg-white/[0.035] px-4 py-3 shadow-glass backdrop-blur-glass transition-all duration-300',
            scrolled && 'bg-white/[0.06] shadow-glow'
          )}
        >
          <Link href="/" className="group flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-400/90 to-accent2-400/85 shadow-glow transition-transform duration-300 group-hover:rotate-3" />
            <span className="text-sm font-semibold tracking-tight text-white/90">
              Smart Crop Advisor
            </span>
          </Link>

          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition',
                    active
                      ? 'border border-white/10 bg-white/[0.06] text-white shadow-glow'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/settings"
              className={cn(
                'ml-1 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/[0.08] hover:text-white'
              )}
            >
              Settings
            </Link>
          </nav>

          <div className="md:hidden">
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-white/80"
            >
              Open
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
