import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar/Navbar';
import { PageTransition } from '@/components/motion/PageTransition';
import { AnimatedBackground, CursorSpotlight } from '@/components/background/AnimatedBackground';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Smart Crop Advisor',
  description: 'AI Smart Crop Advisor — frontend prototype',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${nunito.variable}`}>
      <body className="min-h-dvh bg-bg-base font-sans text-slate-100 antialiased">
        {/* Animated background layers */}
        <AnimatedBackground />

        {/* Cursor spotlight effect */}
        <CursorSpotlight />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-24 md:px-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
