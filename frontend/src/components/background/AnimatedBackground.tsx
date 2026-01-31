'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * AnimatedBackground - Multi-layer cinematic background
 * Features:
 * - Drifting grid pattern
 * - Floating gradient blobs
 * - Ambient glow pulses
 * - Grain texture overlay
 */
export function AnimatedBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-base to-bg-elevated" />

            {/* Drifting grid pattern */}
            <div
                className="absolute inset-0 animate-drift opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating gradient blob 1 - Top left */}
            <div
                className="absolute -left-[20%] -top-[10%] h-[600px] w-[600px] animate-float rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Floating gradient blob 2 - Bottom right */}
            <div
                className="absolute -bottom-[15%] -right-[15%] h-[700px] w-[700px] animate-float animation-delay-2000 rounded-full opacity-25"
                style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Floating gradient blob 3 - Center */}
            <div
                className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 animate-pulse-glow rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                }}
            />

            {/* Ambient top glow */}
            <div
                className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 animate-pulse-glow animation-delay-1000 opacity-40"
                style={{
                    background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                }}
            />

            {/* Subtle vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 5, 0.4) 100%)',
                }}
            />

            {/* Grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
}

/**
 * CursorSpotlight - Mouse-following radial glow effect
 */
export function CursorSpotlight() {
    const spotlightRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>();
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    const animate = useCallback(() => {
        // Smooth interpolation
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.08;
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.08;

        if (spotlightRef.current) {
            spotlightRef.current.style.background = `
        radial-gradient(
          600px circle at ${currentPos.current.x}px ${currentPos.current.y}px,
          rgba(16, 185, 129, 0.06) 0%,
          transparent 50%
        )
      `;
        }

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [animate]);

    return (
        <div
            ref={spotlightRef}
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            aria-hidden="true"
        />
    );
}
