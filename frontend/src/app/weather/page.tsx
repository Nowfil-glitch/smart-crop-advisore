'use client';

import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { fetchWeather } from '@/lib/apiClient';
import type { WeatherAlert, WeatherDay } from '@/lib/mockApi';

function pct(p: number) {
  return `${Math.round(p * 100)}%`;
}

export default function WeatherPage() {
  const [days, setDays] = useState<WeatherDay[] | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [locationLabel, setLocationLabel] = useState<string>('');
  const [manualLocation, setManualLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);

  async function loadWeather(input?: { latitude?: number; longitude?: number; location?: string }, label?: string) {
    setError(null);
    if (label) setLocationLabel(label);
    const res = await fetchWeather(input);
    setDays(res.data.days);
    setAlerts(res.data.alerts);
    setLastUpdated(res.lastUpdated);
    if (res.location?.place) {
      setLocationLabel(res.location.place);
    }
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingLocation(true);

        if (!navigator.geolocation) {
          await loadWeather(undefined, 'Default location');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            if (!mounted) return;
            try {
              await loadWeather(
                { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
                'Using your current location'
              );
            } catch (e: any) {
              setError(e?.message ?? 'Failed to load weather');
            }
          },
          async () => {
            if (!mounted) return;
            // Permission denied or unavailable: fall back to default.
            try {
              await loadWeather(undefined, 'Default location');
            } catch (e: any) {
              setError(e?.message ?? 'Failed to load weather');
            }
          },
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
        );
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load weather');
      } finally {
        if (mounted) setLoadingLocation(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const header = useMemo(() => {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Weather & Alerts</h2>
          <p className="mt-1 text-white/65">
            Live forecast (Open-Meteo){locationLabel ? ` • ${locationLabel}` : ''}.{' '}
            {lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString()}` : ''}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-accent-300/40"
            placeholder="Search location (e.g. Pune, India)"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
          />
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.08]"
            onClick={async () => {
              if (!manualLocation.trim()) return;
              try {
                setLoadingLocation(true);
                await loadWeather({ location: manualLocation.trim() }, `Location: ${manualLocation.trim()}`);
              } catch (e: any) {
                setError(e?.message ?? 'Failed to load weather');
              } finally {
                setLoadingLocation(false);
              }
            }}
          >
            Search
          </button>
        </div>

        {loadingLocation ? <div className="text-xs text-white/60">Loading location & forecast…</div> : null}
      </div>
    );
  }, [lastUpdated, locationLabel, manualLocation, loadingLocation]);

  if (error) {
    return (
      <div className="space-y-4">
        {header}
        <GlassCard className="p-6">
          <div className="text-sm font-semibold">Could not load weather</div>
          <div className="mt-1 text-sm text-white/65">{error}</div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {header}

      <section className="grid gap-4 md:grid-cols-3">
        {(days ?? Array.from({ length: 6 })).map((d: any, i) => (
          <GlassCard key={d?.date ?? i} className="p-5">
            {!days ? (
              <Skeleton className="h-20" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{d.date}</div>
                  <Badge tone={d.condition === 'Rain' ? 'warn' : 'neutral'}>{d.condition}</Badge>
                </div>
                <div className="mt-3 text-3xl font-semibold">{d.tempC}°C</div>
                <div className="mt-1 text-sm text-white/65">Rain chance: {pct(d.rainProb)}</div>
              </>
            )}
          </GlassCard>
        ))}
      </section>

      <section className="space-y-3">
        <div className="text-sm font-semibold">Smart Alerts</div>
        <div className="grid gap-4 md:grid-cols-2">
          {(alerts ?? Array.from({ length: 2 })).map((a: any, i) => (
            <GlassCard key={a?.id ?? i} className="p-6">
              {!alerts ? (
                <Skeleton className="h-24" />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold">{a.type}</div>
                    <Badge tone={a.severity === 'High' ? 'bad' : a.severity === 'Medium' ? 'warn' : 'good'}>
                      {a.severity}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-white/70">{a.message}</div>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/70">
                    {a.suggestions.map((s: string) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
