import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar/Navbar';
import { PageTransition } from '@/components/motion/PageTransition';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Smart Crop Advisor',
  description: 'AI Smart Crop Advisor — frontend prototype',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <body className="min-h-dvh bg-bg-950 font-sans text-slate-100 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.12),transparent_60%)]" />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-20 md:px-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
