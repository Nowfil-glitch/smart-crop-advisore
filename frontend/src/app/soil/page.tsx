'use client';

import { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { fetchSoilGuidance } from '@/lib/apiClient';
import type { SoilGuidance } from '@/lib/mockApi';

function toneFor(status: 'Low' | 'Optimal' | 'High') {
  if (status === 'Optimal') return 'good';
  if (status === 'Low') return 'warn';
  return 'bad';
}

export default function SoilPage() {
  const [n, setN] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SoilGuidance | null>(null);

  const statusRows = useMemo(() => {
    if (!result) return [];
    return [
      { key: 'N', status: result.status.n, value: result.status.n === 'Optimal' ? 0.75 : 0.35 },
      { key: 'P', status: result.status.p, value: result.status.p === 'Optimal' ? 0.78 : 0.4 },
      { key: 'K', status: result.status.k, value: result.status.k === 'Optimal' ? 0.7 : 0.3 },
      { key: 'pH', status: result.status.ph, value: result.status.ph === 'Optimal' ? 0.8 : 0.45 },
    ];
  }, [result]);

  async function analyze() {
    setLoading(true);
    try {
      const res = await fetchSoilGuidance({
        n: n ? Number(n) : undefined,
        p: p ? Number(p) : undefined,
        k: k ? Number(k) : undefined,
        ph: ph ? Number(ph) : undefined,
      });
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Soil Health</h2>
        <p className="mt-1 text-white/65">Enter NPK and pH (optional). Recommendations are mocked.</p>
      </div>

      <GlassCard className="p-6">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { label: 'N', v: n, set: setN },
            { label: 'P', v: p, set: setP },
            { label: 'K', v: k, set: setK },
          ].map((x) => (
            <label key={x.label} className="space-y-1">
              <div className="text-xs text-white/60">{x.label}</div>
              <input
                type="number"
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
                value={x.v}
                onChange={(e) => x.set(e.target.value)}
                placeholder={x.label}
              />
            </label>
          ))}
          <label className="space-y-1">
            <div className="text-xs text-white/60">pH</div>
            <input
              type="number"
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              placeholder="6.5"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
          <GlassButton onClick={analyze} disabled={loading}>
            {loading ? 'Analyzing…' : 'Analyze Soil'}
          </GlassButton>
        </div>
      </GlassCard>

      {result ? (
        <div className="grid gap-4 md:grid-cols-2">
          <GlassCard className="p-6">
            <div className="text-sm font-semibold">Nutrient Status</div>
            <div className="mt-4 space-y-3">
              {statusRows.map((r) => (
                <div key={r.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">{r.key}</div>
                    <Badge tone={toneFor(r.status) as any}>{r.status}</Badge>
                  </div>
                  <ProgressBar value={r.value} />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-sm font-semibold">Fertilizer Guidance</div>
            <div className="mt-4 space-y-3">
              {result.recommendations.map((rec) => (
                <div key={rec.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-medium">{rec.title}</div>
                  <div className="mt-1 text-sm text-white/70">Dosage: {rec.dosage}</div>
                  <div className="text-sm text-white/70">Timing: {rec.timing}</div>
                  <div className="mt-2 text-xs text-white/60">{rec.costHint}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:col-span-2">
            <div className="text-sm font-semibold">Organic Alternatives</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/70">
              {result.organicAlternatives.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}
