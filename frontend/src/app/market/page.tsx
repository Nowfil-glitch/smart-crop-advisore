'use client';

import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkline } from '@/components/ui/Sparkline';
import { GlassButton } from '@/components/ui/GlassButton';
import { fetchMarket } from '@/lib/apiClient';
import type { MarketPrice } from '@/lib/mockApi';

function toneFromChange(changePct: number) {
  if (changePct > 1) return 'good';
  if (changePct < -1) return 'bad';
  return 'neutral';
}

export default function MarketPage() {
  const [prices, setPrices] = useState<MarketPrice[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [area, setArea] = useState('');
  const [yieldPerAcre, setYieldPerAcre] = useState('');
  const [inputCosts, setInputCosts] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchMarket();
        if (!mounted) return;
        setPrices(res.data);
        setLastUpdated(res.lastUpdated);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load market data');
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const profit = useMemo(() => {
    const a = area ? Number(area) : 0;
    const y = yieldPerAcre ? Number(yieldPerAcre) : 0;
    const c = inputCosts ? Number(inputCosts) : 0;
    // crude estimator: assume average price across listed crops (mock)
    const avgPrice = prices?.length ? prices.reduce((s, p) => s + p.current, 0) / prices.length : 0;
    const revenue = a * y * avgPrice;
    const net = revenue - c;
    if (!a || !y || !prices?.length) return null;
    return {
      revenue,
      net,
      avgPrice,
    };
  }, [area, yieldPerAcre, inputCosts, prices]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Market Insights</h2>
        <p className="mt-1 text-white/65">
          Near-real-time prices (mock). {lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString()}` : ''}
        </p>
      </div>

      {error ? (
        <GlassCard className="p-6">
          <div className="text-sm font-semibold">Could not load market</div>
          <div className="mt-1 text-sm text-white/65">{error}</div>
        </GlassCard>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        {(prices ?? []).map((p) => (
          <GlassCard key={p.id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{p.crop}</div>
              <Badge tone={toneFromChange(p.changePct) as any}>{p.changePct > 0 ? `+${p.changePct}%` : `${p.changePct}%`}</Badge>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">{p.current}</div>
                <div className="text-xs text-white/60">{p.unit}</div>
              </div>
              <Sparkline values={p.series} />
            </div>
            <div className="mt-3 text-sm text-white/70">
              Best time to sell: <span className="font-medium text-white">{p.bestTimeToSell}</span>
            </div>
          </GlassCard>
        ))}

        {!prices && !error ? (
          Array.from({ length: 3 }).map((_, i) => (
            <GlassCard key={i} className="p-5">
              <div className="h-24 animate-pulse rounded-xl bg-white/[0.06]" />
            </GlassCard>
          ))
        ) : null}
      </section>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Profit Estimator (UI)</div>
            <div className="mt-1 text-sm text-white/65">Estimate profit using a simple client-side calculator.</div>
          </div>
          <GlassButton
            variant="secondary"
            onClick={() => {
              setArea('');
              setYieldPerAcre('');
              setInputCosts('');
            }}
          >
            Reset
          </GlassButton>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <label className="space-y-1">
            <div className="text-xs text-white/60">Area (acres)</div>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              inputMode="decimal"
              placeholder="2"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs text-white/60">Expected yield / acre (quintals)</div>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
              value={yieldPerAcre}
              onChange={(e) => setYieldPerAcre(e.target.value)}
              inputMode="decimal"
              placeholder="15"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs text-white/60">Input costs (₹)</div>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
              value={inputCosts}
              onChange={(e) => setInputCosts(e.target.value)}
              inputMode="decimal"
              placeholder="18000"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <GlassCard className="p-4">
            <div className="text-xs text-white/60">Avg price used</div>
            <div className="mt-1 text-lg font-semibold">{profit ? Math.round(profit.avgPrice) : '—'}</div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-xs text-white/60">Revenue (₹)</div>
            <div className="mt-1 text-lg font-semibold">{profit ? Math.round(profit.revenue) : '—'}</div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-xs text-white/60">Estimated profit (₹)</div>
            <div className="mt-1 text-lg font-semibold">{profit ? Math.round(profit.net) : '—'}</div>
          </GlassCard>
        </div>

        <div className="mt-3 text-xs text-white/55">
          Note: This is a simplified estimator for UI demonstration only.
        </div>
      </GlassCard>
    </div>
  );
}
