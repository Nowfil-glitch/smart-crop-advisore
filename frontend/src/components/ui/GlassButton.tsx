'use client';

import * as React from 'react';
import Link from 'next/link';
import { Slot } from './Slot';
import { cn } from '@/lib/cn';

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shimmer?: boolean;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GlassButton({
  variant = 'primary',
  size = 'md',
  shimmer = true,
  asChild,
  className,
  children,
  ...props
}: Props) {
  const Comp: any = asChild ? Slot : 'button';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  const variantClasses = {
    primary: cn(
      'border-transparent bg-gradient-to-r from-accent-500 to-accent2-500',
      'text-bg-base font-semibold',
      'shadow-glow hover:shadow-glow-strong',
      'hover:brightness-110'
    ),
    secondary: cn(
      'border-white/10 bg-white/[0.04]',
      'text-white',
      'hover:bg-white/[0.08] hover:border-white/20'
    ),
    ghost: cn(
      'border-transparent bg-transparent',
      'text-white/70',
      'hover:text-white hover:bg-white/[0.05]'
    ),
  };

  return (
    <Comp
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center overflow-hidden',
        'rounded-full border font-medium',
        'transition-all duration-300 ease-premium',
        'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg-base',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.98]',
        // Shimmer effect
        shimmer && 'btn-shimmer',
        // Size
        sizeClasses[size],
        // Variant
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
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
