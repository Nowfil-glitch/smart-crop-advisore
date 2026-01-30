import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative min-h-[78vh] overflow-hidden rounded-glass border border-white/10 shadow-glass">
        {/* Decorative hero background (replaces external Spline embeds) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.05),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />

        <div className="relative z-10 grid gap-8 p-6 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                AI‑powered crop advisor
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                Smarter crop decisions,
                <span className="text-white/80"> built for real farms.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-base text-white/70 md:text-xl">
                Smart Crop Advisor combines weather, soil health, pest risk and market signals to recommend crops you can
                actually grow — with clear reasons, not black-box answers.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <GlassButton asChild size="lg">
                  <Link href="/onboarding">Get recommendations</Link>
                </GlassButton>
                <GlassButton asChild size="lg" variant="secondary">
                  <Link href="/dashboard">Explore dashboard</Link>
                </GlassButton>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/65">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                  Explainable scoring
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Low-data UI</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Fast demo mode</span>
              </div>
            </div>

            <div className="glass grain relative h-[320px] overflow-hidden p-0 md:h-[380px] lg:h-[420px]">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.35),rgba(139,92,246,0.28),rgba(34,211,238,0.25),rgba(255,255,255,0.05),rgba(34,211,238,0.35))]" />
                <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_65%)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08),transparent_40%)]" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/35" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-wide text-white/60">Built for clarity</div>
              <div className="mt-2 text-lg font-semibold">See the “why”</div>
              <div className="mt-2 text-sm text-white/65">
                Transparent factors — season fit, water needs, ROI and risk.
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-wide text-white/60">Designed for speed</div>
              <div className="mt-2 text-lg font-semibold">Works on slow networks</div>
              <div className="mt-2 text-sm text-white/65">Skeleton loading, cached results, lightweight UI.</div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-wide text-white/60">Ready for action</div>
              <div className="mt-2 text-lg font-semibold">From advice to plan</div>
              <div className="mt-2 text-sm text-white/65">Next steps, alerts, and practical recommendations.</div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Step 1</div>
          <div className="mt-3 text-2xl font-semibold">Describe your farm</div>
          <div className="mt-3 text-sm text-white/65">Location, season, soil and budget in a guided flow.</div>
        </GlassCard>
        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Step 2</div>
          <div className="mt-3 text-2xl font-semibold">Get ranked crops</div>
          <div className="mt-3 text-sm text-white/65">Yield, ROI, water needs and risk — in one view.</div>
        </GlassCard>
        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Step 3</div>
          <div className="mt-3 text-2xl font-semibold">Act with confidence</div>
          <div className="mt-3 text-sm text-white/65">Weather alerts, soil guidance, pest UI and market trends.</div>
        </GlassCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Weather intelligence</div>
          <div className="mt-3 text-3xl font-semibold">Forecasts that matter</div>
          <p className="mt-3 text-sm text-white/65">
            Simple rainfall probability, temperature trends, and action-focused alerts for irrigation and spraying.
          </p>
          <div className="mt-6">
            <GlassButton asChild variant="secondary">
              <Link href="/weather">View weather</Link>
            </GlassButton>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Soil + input planning</div>
          <div className="mt-3 text-3xl font-semibold">Make nutrients predictable</div>
          <p className="mt-3 text-sm text-white/65">
            Quick NPK/pH checks with fertilizer guidance and organic alternatives — optimized for clarity.
          </p>
          <div className="mt-6">
            <GlassButton asChild variant="secondary">
              <Link href="/soil">Analyze soil</Link>
            </GlassButton>
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Pest & disease UI</div>
          <div className="mt-3 text-3xl font-semibold">Faster scouting decisions</div>
          <p className="mt-3 text-sm text-white/65">
            Upload a leaf image to see a demo diagnosis and recommended organic + chemical actions.
          </p>
          <div className="mt-6">
            <GlassButton asChild variant="secondary">
              <Link href="/pest-detect">Try pest detect</Link>
            </GlassButton>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="text-xs uppercase tracking-wide text-white/60">Market insight</div>
          <div className="mt-3 text-3xl font-semibold">Plan for profit</div>
          <p className="mt-3 text-sm text-white/65">
            Track price changes, trends, and use the built-in estimator to sanity-check profitability.
          </p>
          <div className="mt-6">
            <GlassButton asChild variant="secondary">
              <Link href="/market">Open market</Link>
            </GlassButton>
          </div>
        </GlassCard>
      </section>

      <section className="glass grain p-10 md:p-12">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-wide text-white/60">Ready to see it in action?</div>
          <div className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Get crop recommendations in under a minute.
          </div>
          <p className="mt-4 text-sm text-white/65">This is a demo prototype: fast, visual, and focused on explainability.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <GlassButton asChild size="lg">
              <Link href="/onboarding">Start the demo</Link>
            </GlassButton>
            <GlassButton asChild size="lg" variant="secondary">
              <Link href="/settings">Demo reset & settings</Link>
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  );
}
