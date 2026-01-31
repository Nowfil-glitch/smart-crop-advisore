'use client';

import * as React from 'react';
import { useRef, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'premium' | 'elevated';
  hover?: 'none' | 'lift' | 'glow' | 'tilt';
  glowColor?: string;
}

export function GlassCard({
  className,
  variant = 'default',
  hover = 'lift',
  glowColor = 'rgba(16, 185, 129, 0.15)',
  children,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current || hover === 'none') return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Update cursor-following glow
    glowRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
    glowRef.current.style.opacity = '1';

    // Apply tilt effect
    if (hover === 'tilt' && cardRef.current) {
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }
  }, [hover, glowColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !glowRef.current) return;

    glowRef.current.style.opacity = '0';

    if (hover === 'tilt') {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  }, [hover]);

  const variantClasses = {
    default: 'glass grain',
    premium: 'glass-premium grain',
    elevated: 'glass grain shadow-depth',
  };

  const hoverClasses = {
    none: '',
    lift: 'card-hover',
    glow: 'card-hover gradient-border',
    tilt: '',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        variantClasses[variant],
        hoverClasses[hover],
        'relative overflow-hidden transition-all duration-300 ease-premium',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {/* Inner glow layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
