import * as React from 'react';
import { cn } from '@/lib/cn';

export function Chip({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 text-xs text-white/75',
        className
      )}
      {...props}
    />
  );
}
