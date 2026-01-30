'use client';

import * as React from 'react';
import Link from 'next/link';
import { Slot } from './Slot';
import { cn } from '@/lib/cn';

type Props = {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GlassButton({
  variant = 'primary',
  size = 'md',
  asChild,
  className,
  ...props
}: Props) {
  const Comp: any = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-300/30 disabled:cursor-not-allowed disabled:opacity-60',
        size === 'lg' ? 'px-5 py-2.5 text-base' : '',
        variant === 'primary'
          ? 'border-white/10 bg-gradient-to-br from-accent-400/95 to-accent2-400/90 text-bg-950 shadow-glow hover:brightness-110 active:scale-[0.98]'
          : 'border-white/15 bg-white/[0.04] text-slate-100 hover:bg-white/[0.08] active:scale-[0.98]',
        className
      )}
      {...props}
    />
  );
}

// Convenience for link usage
export function GlassButtonLink({
  href,
  children,
  ...rest
}: { href: string; children: React.ReactNode } & Omit<Props, 'asChild'>) {
  return (
    <GlassButton asChild {...rest}>
      <Link href={href}>{children}</Link>
    </GlassButton>
  );
}
