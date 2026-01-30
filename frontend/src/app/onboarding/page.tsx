'use client';

import { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { useRouter } from 'next/navigation';

type FormState = {
  location: string;
  season: 'kharif' | 'rabi' | 'zaid' | '';
  soilType: 'sandy' | 'loamy' | 'clayey' | '';
  npk?: { n?: number; p?: number; k?: number };
  ph?: number;
  rainfallMode: 'use-weather' | 'manual' | '';
  budget: 'low' | 'medium' | 'high' | '';
};

const STORAGE_KEY = 'sca:onboarding:v1';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>(() => {
    if (typeof window === 'undefined') {
      return { location: '', season: '', soilType: '', rainfallMode: '', budget: '' };
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { location: '', season: '', soilType: '', rainfallMode: '', budget: '' };
    }
    try {
      return JSON.parse(raw);
    } catch {
      return { location: '', season: '', soilType: '', rainfallMode: '', budget: '' };
    }
  });

  const steps = useMemo(
    () => [
      { title: 'Location', optional: false },
      { title: 'Season', optional: false },
      { title: 'Soil', optional: true },
      { title: 'Rainfall', optional: false },
      { title: 'Budget', optional: false },
    ],
    []
  );

  function persist(next: FormState) {
    setState(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function finish() {
    router.push('/recommendations');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Get Crop Advice</h2>
        <p className="mt-1 text-white/65">
          Step {step + 1} of {steps.length}: {steps[step]?.title}
        </p>
      </div>

      <GlassCard className="p-6">
        {step === 0 ? (
          <div className="space-y-4">
            <div className="text-sm font-medium">📍 Your location</div>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-accent-300/40"
              placeholder="Village / District"
              value={state.location}
              onChange={(e) => persist({ ...state, location: e.target.value })}
            />
            <div className="text-xs text-white/60">Tip: You can type your nearest town.</div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-4">
            <div className="text-sm font-medium">🗓 Season</div>
            <div className="grid grid-cols-3 gap-3">
              {([
                { k: 'kharif', label: 'Kharif' },
                { k: 'rabi', label: 'Rabi' },
                { k: 'zaid', label: 'Zaid' },
              ] as const).map((s) => (
                <button
                  key={s.k}
                  type="button"
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    state.season === s.k
                      ? 'border-accent-300/40 bg-accent-300/15'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                  }`}
                  onClick={() => persist({ ...state, season: s.k })}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">🌱 Soil (optional)</div>
              <button type="button" className="text-xs text-white/60 underline" onClick={nextStep}>
                Skip
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {([
                { k: 'sandy', label: 'Sandy' },
                { k: 'loamy', label: 'Loamy' },
                { k: 'clayey', label: 'Clayey' },
              ] as const).map((s) => (
                <button
                  key={s.k}
                  type="button"
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    state.soilType === s.k
                      ? 'border-accent2-300/40 bg-accent2-300/15'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                  }`}
                  onClick={() => persist({ ...state, soilType: s.k })}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="number"
                inputMode="decimal"
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
                placeholder="pH (e.g. 6.8)"
                value={state.ph ?? ''}
                onChange={(e) => persist({ ...state, ph: e.target.value ? Number(e.target.value) : undefined })}
              />
              <div className="grid grid-cols-3 gap-2">
                {(['n', 'p', 'k'] as const).map((key) => (
                  <input
                    key={key}
                    type="number"
                    inputMode="decimal"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm outline-none"
                    placeholder={key.toUpperCase()}
                    value={(state.npk as any)?.[key] ?? ''}
                    onChange={(e) =>
                      persist({
                        ...state,
                        npk: {
                          ...(state.npk ?? {}),
                          [key]: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="text-xs text-white/60">If you don’t have soil test values, you can skip.</div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div className="text-sm font-medium">🌧 Rainfall</div>
            <div className="grid gap-3">
              {([
                { k: 'use-weather', label: 'Use local weather data' },
                { k: 'manual', label: 'I will enter it later' },
              ] as const).map((r) => (
                <button
                  key={r.k}
                  type="button"
                  className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                    state.rainfallMode === r.k
                      ? 'border-accent-300/40 bg-accent-300/15'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                  }`}
                  onClick={() => persist({ ...state, rainfallMode: r.k })}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <div className="text-sm font-medium">💰 Budget</div>
            <div className="grid grid-cols-3 gap-3">
              {([
                { k: 'low', label: 'Low' },
                { k: 'medium', label: 'Medium' },
                { k: 'high', label: 'High' },
              ] as const).map((b) => (
                <button
                  key={b.k}
                  type="button"
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    state.budget === b.k
                      ? 'border-accent2-300/40 bg-accent2-300/15'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                  }`}
                  onClick={() => persist({ ...state, budget: b.k })}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </GlassCard>

      <div className="flex items-center justify-between">
        <GlassButton variant="secondary" onClick={prevStep} disabled={step === 0}>
          Back
        </GlassButton>

        {step < steps.length - 1 ? (
          <GlassButton onClick={nextStep}>Next</GlassButton>
        ) : (
          <GlassButton onClick={finish}>See Recommendations</GlassButton>
        )}
      </div>
    </div>
  );
}
