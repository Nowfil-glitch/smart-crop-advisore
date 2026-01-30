import { cn } from '@/lib/cn';

export function ProgressBar({
  value,
  className,
}: {
  value: number; // 0..1
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className={cn('h-2 w-full rounded-full bg-white/10', className)}>
      <div
        className="h-2 rounded-full bg-gradient-to-r from-accent-400/80 to-accent2-400/80"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
