'use client';

import { useMemo } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/Badge';
import { useSettings } from '@/components/settings/useSettings';
import { resetDemoState } from '@/lib/demoReset';

export default function SettingsPage() {
  const { settings, setSettings } = useSettings();

  const langLabel = useMemo(() => {
    return settings.language === 'en' ? 'English' : settings.language === 'hi' ? 'Hindi' : 'Telugu';
  }, [settings.language]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="mt-1 text-white/65">Language and accessibility toggles (frontend-only scaffolding).</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Language</div>
              <div className="mt-1 text-sm text-white/65">Current: {langLabel}</div>
            </div>
            <Badge>i18n scaffold</Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {([
              { k: 'en', label: 'English' },
              { k: 'hi', label: 'Hindi' },
              { k: 'te', label: 'Telugu' },
            ] as const).map((x) => (
              <button
                key={x.k}
                type="button"
                className={
                  'rounded-xl border px-3 py-3 text-sm transition ' +
                  (settings.language === x.k
                    ? 'border-accent-300/40 bg-accent-300/15'
                    : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]')
                }
                onClick={() => setSettings((s) => ({ ...s, language: x.k }))}
              >
                {x.label}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-sm font-semibold">Accessibility</div>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div>
                <div className="text-sm font-medium">High contrast</div>
                <div className="mt-1 text-xs text-white/60">Improve readability over glass surfaces.</div>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => setSettings((s) => ({ ...s, highContrast: e.target.checked }))}
              />
            </label>

            <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div>
                <div className="text-sm font-medium">Reduced motion (app)</div>
                <div className="mt-1 text-xs text-white/60">Disables 3D embed + reduces animations where possible.</div>
              </div>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => setSettings((s) => ({ ...s, reducedMotion: e.target.checked }))}
              />
            </label>

            <div className="text-xs text-white/55">
              Note: This prototype stores settings locally. A full app would integrate this into all motion/3D features.
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <GlassButton
              variant="secondary"
              onClick={() => setSettings({ language: 'en', highContrast: false, reducedMotion: false })}
            >
              Reset
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="text-sm font-semibold">Demo Reset</div>
        <div className="mt-2 text-sm text-white/70">
          Clear saved demo data (onboarding answers, cached recommendations, and settings) and return to the home screen.
        </div>
        <div className="mt-4 flex justify-end">
          <GlassButton
            variant="secondary"
            onClick={() => {
              const ok = window.confirm('Reset demo data? This will clear local saved state and reload the app.');
              if (!ok) return;
              resetDemoState();
            }}
          >
            Reset Demo
          </GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-sm font-semibold">Voice UI (stub)</div>
        <div className="mt-2 text-sm text-white/70">
          Add a microphone button and “Listening…” modal state in feature pages later.
        </div>
      </GlassCard>
    </div>
  );
}
