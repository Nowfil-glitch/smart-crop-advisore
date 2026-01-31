import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ScrollReveal, StaggerContainer } from '@/components/motion/ScrollReveal';
import { Hero3DElement } from '@/components/hero/Hero3DElement';

// Animated icons for feature cards
function ChartIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446a9 9 0 11-8.313-12.454z" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Decorative glow orbs */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 animate-pulse-glow rounded-full bg-accent-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 animate-pulse-glow animation-delay-1000 rounded-full bg-accent2-500/15 blur-[80px]" />

        <div className="relative z-10 grid min-h-[85vh] items-center gap-8 py-12 lg:grid-cols-[1fr_auto]">
          {/* Left side - Hero content */}
          <div className="flex flex-col justify-center">
            <ScrollReveal delay={0.1}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-4 py-2 text-sm text-accent-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                AI-powered crop intelligence
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              {/* Hero Title */}
              <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-gradient-hero">Smarter crop decisions,</span>
                <br />
                <span className="text-white/70">built for real farms.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              {/* Subtitle */}
              <p className="mt-6 max-w-xl text-lg text-white/60 md:text-xl">
                Smart Crop Advisor combines weather, soil health, pest risk and market signals to recommend crops you can actually grow — with{' '}
                <span className="text-gradient">clear reasons</span>, not black-box answers.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <GlassButton asChild size="lg">
                  <Link href="/onboarding">
                    Get recommendations
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </GlassButton>
                <GlassButton asChild size="lg" variant="secondary">
                  <Link href="/dashboard">Explore dashboard</Link>
                </GlassButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              {/* Feature Tags */}
              <div className="mt-10 flex flex-wrap gap-3">
                {['Explainable AI', 'Low-data friendly', 'Instant demo'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition-all duration-300 hover:border-white/20 hover:text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right side - 3D Interactive Element */}
          <div className="hidden lg:block">
            <ScrollReveal delay={0.3} direction="right">
              <Hero3DElement />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why <span className="text-gradient">Smart Crop</span>?
            </h2>
            <p className="mt-4 text-white/50">Designed for clarity, speed, and actionable insights.</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <SparkIcon />,
              title: 'See the "why"',
              subtitle: 'Built for clarity',
              description: 'Transparent factors — season fit, water needs, ROI and risk. No guessing.',
            },
            {
              icon: <BoltIcon />,
              title: 'Works on slow networks',
              subtitle: 'Designed for speed',
              description: 'Skeleton loading, cached results, and a lightweight UI for any connection.',
            },
            {
              icon: <ChartIcon />,
              title: 'From advice to plan',
              subtitle: 'Ready for action',
              description: 'Next steps, alerts, and practical recommendations you can act on today.',
            },
          ].map((feature, index) => (
            <ScrollReveal key={feature.title} delay={0.1 * (index + 1)}>
              <GlassCard className="group p-8" hover="tilt">
                <div className="mb-4 inline-flex rounded-xl bg-accent-500/10 p-3 text-accent-400 transition-all duration-300 group-hover:bg-accent-500/20 group-hover:text-accent-300">
                  {feature.icon}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                  {feature.subtitle}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              How it <span className="text-gradient">works</span>
            </h2>
            <p className="mt-4 text-white/50">Three simple steps to smarter farming decisions.</p>
          </div>
        </ScrollReveal>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-16 hidden h-[2px] w-[calc(66%-4rem)] -translate-x-1/2 bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0 md:block" />

          {[
            { step: '01', title: 'Describe your farm', desc: 'Location, season, soil and budget in a guided flow.' },
            { step: '02', title: 'Get ranked crops', desc: 'Yield, ROI, water needs and risk — in one view.' },
            { step: '03', title: 'Act with confidence', desc: 'Weather alerts, soil guidance, and pest detection.' },
          ].map((item, index) => (
            <ScrollReveal key={item.step} delay={0.15 * (index + 1)}>
              <GlassCard className="relative p-8" hover="lift">
                <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent2-500 text-sm font-bold text-bg-base shadow-glow">
                  {index + 1}
                </div>
                <div className="mt-4 text-xs font-medium uppercase tracking-wider text-accent-400">
                  Step {item.step}
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/50">{item.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <GlassCard className="p-8" hover="glow" variant="premium">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent-500/10 p-3 text-accent-400">
                <SunIcon />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Weather intelligence
                </div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Forecasts that matter</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Simple rainfall probability, temperature trends, and action-focused alerts for irrigation and spraying schedules.
            </p>
            <div className="mt-6">
              <GlassButton asChild variant="secondary">
                <Link href="/weather">View weather</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlassCard className="p-8" hover="glow" variant="premium">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent2-500/10 p-3 text-accent2-400">
                <LeafIcon />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Soil + input planning
                </div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Make nutrients predictable</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Quick NPK/pH checks with fertilizer guidance and organic alternatives — optimized for clarity.
            </p>
            <div className="mt-6">
              <GlassButton asChild variant="secondary">
                <Link href="/soil">Analyze soil</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <GlassCard className="p-8" hover="glow" variant="premium">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent-500/10 p-3 text-accent-400">
                <SparkIcon />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Pest & disease detection
                </div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Faster scouting decisions</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Upload a leaf image to see a demo diagnosis and recommended organic + chemical actions.
            </p>
            <div className="mt-6">
              <GlassButton asChild variant="secondary">
                <Link href="/pest-detect">Try pest detect</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <GlassCard className="p-8" hover="glow" variant="premium">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent2-500/10 p-3 text-accent2-400">
                <TrendIcon />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Market insight
                </div>
                <h3 className="mt-1 text-2xl font-semibold text-white">Plan for profit</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Track price changes, trends, and use the built-in estimator to sanity-check profitability.
            </p>
            <div className="mt-6">
              <GlassButton asChild variant="secondary">
                <Link href="/market">Open market</Link>
              </GlassButton>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-accent-500/10 via-transparent to-accent2-500/10 p-12 md:p-16">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-accent-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent2-500/15 blur-[80px]" />

          <div className="relative z-10 max-w-3xl">
            <div className="text-xs font-medium uppercase tracking-wider text-accent-400">
              Ready to see it in action?
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Get crop recommendations{' '}
              <span className="text-gradient">in under a minute.</span>
            </h2>
            <p className="mt-4 text-white/50">
              This is a demo prototype: fast, visual, and focused on explainability.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <GlassButton asChild size="lg">
                <Link href="/onboarding">
                  Start the demo
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </GlassButton>
              <GlassButton asChild size="lg" variant="secondary">
                <Link href="/settings">Demo reset & settings</Link>
              </GlassButton>
            </div>
          </div>

          {/* Grain overlay */}
          <div className="grain pointer-events-none absolute inset-0" />
        </section>
      </ScrollReveal>
    </div>
  );
}
