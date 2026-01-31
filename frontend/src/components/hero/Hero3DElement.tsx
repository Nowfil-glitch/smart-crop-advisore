'use client';

import { useRef, useEffect, useCallback } from 'react';

/**
 * Hero3DElement - Interactive floating 3D visualization
 * Features orbiting data points and a central glowing core
 */
export function Hero3DElement() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>();
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const currentRotation = useRef({ x: 0, y: 0 });

    const animate = useCallback(() => {
        if (!containerRef.current) return;

        // Smooth interpolation towards mouse position
        const targetX = (mousePos.current.y - 0.5) * 20;
        const targetY = (mousePos.current.x - 0.5) * 20;

        currentRotation.current.x += (targetX - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetY - currentRotation.current.y) * 0.05;

        containerRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${currentRotation.current.x}deg) 
      rotateY(${currentRotation.current.y}deg)
    `;

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.parentElement?.getBoundingClientRect();
            if (!rect) return;
            mousePos.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            };
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <div className="relative h-[400px] w-[400px] lg:h-[500px] lg:w-[500px]">
            {/* Ambient glow */}
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-accent-500/20 blur-[80px]" />

            {/* 3D Container */}
            <div
                ref={containerRef}
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Central Core */}
                <div
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full lg:h-32 lg:w-32"
                    style={{
                        transform: 'translateZ(60px)',
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(20, 184, 166, 0.3) 50%, transparent 70%)',
                        boxShadow: '0 0 60px rgba(16, 185, 129, 0.5), inset 0 0 30px rgba(255,255,255,0.1)',
                    }}
                >
                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                    {/* AI icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/80">
                        <svg className="h-10 w-10 lg:h-12 lg:w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                    </div>
                </div>

                {/* Orbiting rings */}
                <div
                    className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full border border-accent-500/20 lg:h-64 lg:w-64"
                    style={{ transform: 'translateZ(20px) rotateX(60deg)' }}
                />
                <div
                    className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full border border-accent2-500/15 lg:h-80 lg:w-80"
                    style={{
                        transform: 'translateZ(10px) rotateX(70deg) rotateZ(45deg)',
                        animationDirection: 'reverse',
                        animationDuration: '80s'
                    }}
                />

                {/* Floating data points */}
                {[
                    { x: 20, y: 30, z: 80, delay: 0, icon: 'leaf' },
                    { x: 75, y: 25, z: 50, delay: 1, icon: 'sun' },
                    { x: 80, y: 70, z: 70, delay: 2, icon: 'drop' },
                    { x: 25, y: 75, z: 40, delay: 0.5, icon: 'chart' },
                    { x: 50, y: 15, z: 90, delay: 1.5, icon: 'seed' },
                    { x: 15, y: 50, z: 60, delay: 2.5, icon: 'temp' },
                ].map((point, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: `translateZ(${point.z}px)`,
                            animationDelay: `${point.delay}s`,
                        }}
                    >
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-accent-500/30 hover:bg-white/[0.1] lg:h-12 lg:w-12"
                            style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)' }}
                        >
                            {point.icon === 'leaf' && (
                                <svg className="h-5 w-5 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.5 0 7-3.5 7-8s-4-9-7-11c-3 2-7 6-7 11s2.5 8 7 8z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9" />
                                </svg>
                            )}
                            {point.icon === 'sun' && (
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                </svg>
                            )}
                            {point.icon === 'drop' && (
                                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c3.5 0 6-2.5 6-6 0-4-6-11-6-11S6 11 6 15c0 3.5 2.5 6 6 6z" />
                                </svg>
                            )}
                            {point.icon === 'chart' && (
                                <svg className="h-5 w-5 text-accent2-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4v8H3zM10 9h4v12h-4zM17 5h4v16h-4z" />
                                </svg>
                            )}
                            {point.icon === 'seed' && (
                                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <ellipse cx="12" cy="12" rx="4" ry="7" />
                                    <path d="M12 5v14" />
                                </svg>
                            )}
                            {point.icon === 'temp' && (
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V3M12 9a4 4 0 100 8 4 4 0 000-8z" />
                                    <path d="M12 3a1 1 0 011 1v8a3 3 0 11-2 0V4a1 1 0 011-1z" />
                                </svg>
                            )}
                        </div>
                    </div>
                ))}

                {/* Connecting lines (data flow visualization) */}
                <svg
                    className="absolute inset-0 h-full w-full opacity-30"
                    style={{ transform: 'translateZ(30px)' }}
                >
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
                        </linearGradient>
                    </defs>
                    {/* Lines connecting points to center */}
                    <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4">
                        <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
                    </line>
                    <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4">
                        <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2.5s" repeatCount="indefinite" />
                    </line>
                    <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4">
                        <animate attributeName="stroke-dashoffset" from="8" to="0" dur="3s" repeatCount="indefinite" />
                    </line>
                    <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4">
                        <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2.2s" repeatCount="indefinite" />
                    </line>
                </svg>
            </div>
        </div>
    );
}
