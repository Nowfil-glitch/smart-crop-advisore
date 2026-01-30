'use client';

import { useRef, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/Badge';
import { fetchPestDiagnosis } from '@/lib/apiClient';
import type { PestDiagnosis } from '@/lib/mockApi';

export default function PestDetectPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PestDiagnosis | null>(null);

  function tone(sev: PestDiagnosis['severity']) {
    return sev === 'High' ? 'bad' : sev === 'Medium' ? 'warn' : 'good';
  }

  async function run() {
    if (!file) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetchPestDiagnosis(file.name);
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Pest & Disease Detection (UI)</h2>
        <p className="mt-1 text-white/65">Upload a leaf image. Diagnosis is mocked.</p>
      </div>

      <GlassCard
        className="p-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (!f) return;
          setFile(f);
          setPreview(URL.createObjectURL(f));
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="text-sm font-medium">📷 Upload image</div>
            <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-sm text-white/70">
              Drag & drop here, or
              <button
                type="button"
                className="ml-2 underline"
                onClick={() => inputRef.current?.click()}
              >
                choose a file
              </button>
              .
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }}
              />
            </div>

            <div className="flex justify-end">
              <GlassButton onClick={run} disabled={!file || loading}>
                {loading ? 'Diagnosing…' : 'Diagnose'}
              </GlassButton>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">Preview</div>
            <div className="glass flex min-h-40 items-center justify-center p-3">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Uploaded leaf"
                  className="max-h-56 w-full rounded-xl object-contain"
                />
              ) : (
                <div className="text-sm text-white/60">No image selected</div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {result ? (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{result.issue}</div>
            <Badge tone={tone(result.severity) as any}>{result.severity}</Badge>
          </div>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">Organic</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                {result.organic.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Chemical</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                {result.chemical.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm text-white/70">
            <span className="font-medium">Dosage/timing:</span> {result.dosageTiming}
          </div>
        </GlassCard>
      ) : null}
    </div>
  );
}
