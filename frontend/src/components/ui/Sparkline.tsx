import { cn } from '@/lib/cn';

export function Sparkline({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  if (!values.length) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const w = 90;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-7 w-24', className)}>
      <polyline
        fill="none"
        stroke="rgba(34,211,238,0.9)"
        strokeWidth="2"
        points={pts}
      />
    </svg>
  );
}
