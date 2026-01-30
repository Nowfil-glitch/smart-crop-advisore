'use client';

import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { Drawer } from '@/components/ui/Drawer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Skeleton } from '@/components/ui/Skeleton';
import { fetchRecommendations } from '@/lib/apiClient';
import type { CropRecommendation } from '@/lib/mockApi';

const CACHE_KEY = 'sca:crops:v1';

type SortKey = 'confidence' | 'roi' | 'risk' | 'water';

function labelToScore(x: CropRecommendation['roiLabel' | 'riskLabel' | 'waterLabel']) {
  if (x === 'High') return 3;
  if (x === 'Medium') return 2;
  return 1;
}

function toneForRisk(risk: CropRecommendation['riskLabel']) {
  if (risk === 'Low') return 'good';
  if (risk === 'Medium') return 'warn';
  return 'bad';
}

export default function RecommendationsPage() {
  const [data, setData] = useState<CropRecommendation[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [sort, setSort] = useState<SortKey>('confidence');
  const [filterRisk, setFilterRisk] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');

  const [selected, setSelected] = useState<CropRecommendation | null>(null);

  useEffect(() => {
    // Hydrate cached view immediately for rural/slow networks
    const cached = typeof window !== 'undefined' ? window.localStorage.getItem(CACHE_KEY) : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { data: CropRecommendation[]; lastUpdated: string };
        setData(parsed.data);
        setLastUpdated(parsed.lastUpdated);
      } catch {
        // ignore
      }
    }

    let mounted = true;
    (async () => {
      try {
        const res = await fetchRecommendations();
        if (!mounted) return;
        setData(res.data);
        setLastUpdated(res.lastUpdated);
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(res));
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? 'Failed to load recommendations');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedFiltered = useMemo(() => {
    const items = (data ?? []).filter((x) => (filterRisk === 'All' ? true : x.riskLabel === filterRisk));
    const arr = [...items];
    arr.sort((a, b) => {
      if (sort === 'confidence') return b.confidence - a.confidence;
      if (sort === 'roi') return labelToScore(b.roiLabel) - labelToScore(a.roiLabel);
      if (sort === 'risk') return labelToScore(a.riskLabel) - labelToScore(b.riskLabel); // low risk first
      return labelToScore(a.waterLabel) - labelToScore(b.waterLabel); // low water first
    });
    return arr;
  }, [data, sort, filterRisk]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Crop Recommendations</h2>
          <p className="mt-1 text-white/65">
            Ranked crops with explainability (mock).{' '}
            {lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString()}` : ''}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-xs text-white/60">
            Sort
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none sm:w-44"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="confidence">Confidence</option>
              <option value="roi">High ROI</option>
              <option value="risk">Low risk</option>
              <option value="water">Low water</option>
            </select>
          </label>

          <label className="text-xs text-white/60">
            Risk
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none sm:w-44"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>
      </div>

      {error ? (
        <GlassCard className="p-6">
          <div className="text-sm font-semibold">Could not load recommendations</div>
          <div className="mt-1 text-sm text-white/65">{error}</div>
        </GlassCard>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        {!data && !error
          ? Array.from({ length: 4 }).map((_, i) => (
              <GlassCard key={i} className="p-6">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </GlassCard>
            ))
          : null}

        {sortedFiltered.map((rec) => (
          <button key={rec.id} type="button" className="text-left" onClick={() => setSelected(rec)}>
            <GlassCard className="p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{rec.name}</div>
                  <div className="mt-1 text-sm text-white/65">
                    Confidence: {Math.round(rec.confidence * 100)}%
                  </div>
                </div>
                <Badge tone={toneForRisk(rec.riskLabel) as any}>{rec.riskLabel} risk</Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip>Yield: {rec.yieldLabel}</Chip>
                <Chip>ROI: {rec.roiLabel}</Chip>
                <Chip>Water: {rec.waterLabel}</Chip>
                {rec.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              <div className="mt-4 text-sm text-accent-300/90">View details →</div>
            </GlassCard>
          </button>
        ))}

        {data && !sortedFiltered.length ? (
          <GlassCard className="p-6 md:col-span-2">
            <div className="text-sm font-semibold">No results</div>
            <div className="mt-1 text-sm text-white/65">Try changing filters.</div>
          </GlassCard>
        ) : null}
      </section>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected ? selected.name : undefined}>
        {selected ? (
          <div className="space-y-5">
            <GlassCard className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{Math.round(selected.confidence * 100)}% confidence</Badge>
                <Chip>Yield: {selected.yieldLabel}</Chip>
                <Chip>ROI: {selected.roiLabel}</Chip>
                <Chip>Water: {selected.waterLabel}</Chip>
                <Chip>Risk: {selected.riskLabel}</Chip>
              </div>
            </GlassCard>

            <div>
              <div className="text-sm font-semibold">Why this crop?</div>
              <div className="mt-3 space-y-3">
                {selected.why.map((f) => (
                  <div key={f.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">{f.label}</div>
                      <div className="text-xs text-white/60">{Math.round(f.value * 100)}%</div>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={f.value} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Suggested actions</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/70">
                {selected.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <GlassButton variant="secondary" onClick={() => setSelected(null)}>
                Done
              </GlassButton>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
