import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';

const items = [
  {
    href: '/recommendations',
    title: 'Crop Recommendations',
    desc: 'Ranked crops + explainability.',
  },
  { href: '/weather', title: 'Weather & Alerts', desc: 'Forecast, rainfall and smart alerts.' },
  { href: '/soil', title: 'Soil Health', desc: 'NPK, pH and fertilizer guidance.' },
  { href: '/pest-detect', title: 'Pest Detection (UI)', desc: 'Upload leaf image and view diagnosis.' },
  { href: '/market', title: 'Market Insights', desc: 'Prices, trends and profit estimate.' },
  { href: '/settings', title: 'Settings', desc: 'Language, theme and accessibility.' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="mt-1 text-white/65">Quick access to features (mock data frontend).</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <GlassCard className="p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/[0.08]">
              <div className="text-lg font-semibold">{item.title}</div>
              <div className="mt-1 text-sm text-white/65">{item.desc}</div>
              <div className="mt-4 text-sm text-accent-300/90">Open →</div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
