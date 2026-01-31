'use client';

import { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    tiltAmount?: number;
    glowSize?: number;
}

/**
 * TiltCard - Card with 3D tilt effect and cursor-following inner glow
 */
export function TiltCard({
    children,
    className,
    glowColor = 'rgba(16, 185, 129, 0.15)',
    tiltAmount = 10,
    glowSize = 250,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -tiltAmount;
        const rotateY = ((x - centerX) / centerX) * tiltAmount;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

        // Update glow position
        glowRef.current.style.background = `radial-gradient(${glowSize}px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
        glowRef.current.style.opacity = '1';
    }, [tiltAmount, glowColor, glowSize]);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current || !glowRef.current) return;

        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        glowRef.current.style.opacity = '0';
    }, []);

    // Check for reduced motion preference
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion && cardRef.current) {
            cardRef.current.style.transform = 'none';
        }
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                'relative overflow-hidden transition-all duration-300 ease-premium',
                className
            )}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Inner glow layer */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
                aria-hidden="true"
            />
            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * ShimmerButton - Button with light sweep animation on hover
 */
export function ShimmerButton({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ShimmerButtonProps) {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
        primary: 'bg-gradient-to-r from-accent-500 to-accent2-500 text-bg-base font-medium shadow-glow hover:shadow-glow-strong',
        secondary: 'bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20',
    };

    return (
        <button
            className={cn(
                'btn-shimmer relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 ease-premium',
                'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg-base',
                'active:scale-[0.98]',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

/**
 * GlowBorder - Animated gradient border effect
 */
export function GlowBorder({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('gradient-border', className)}>
            {children}
        </div>
    );
}
