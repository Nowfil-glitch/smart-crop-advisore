import * as React from 'react';
import { cn } from '@/lib/cn';

export function Badge({
  className,
  tone = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  tone?: 'neutral' | 'good' | 'warn' | 'bad';
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        tone === 'good' && 'border-accent-300/30 bg-accent-300/15 text-accent-300',
        tone === 'warn' && 'border-amber-300/30 bg-amber-300/15 text-amber-100',
        tone === 'bad' && 'border-rose-300/30 bg-rose-300/15 text-rose-100',
        tone === 'neutral' && 'border-white/15 bg-white/[0.04] text-white/80',
        className
      )}
      {...props}
    />
  );
}
