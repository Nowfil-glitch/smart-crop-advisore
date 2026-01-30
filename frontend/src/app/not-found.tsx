import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl">
      <GlassCard className="p-8">
        <div className="text-xl font-semibold">Page not found</div>
        <div className="mt-2 text-sm text-white/70">The page you are looking for does not exist.</div>
        <div className="mt-6">
          <GlassButton asChild>
            <Link href="/">Go home</Link>
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}
