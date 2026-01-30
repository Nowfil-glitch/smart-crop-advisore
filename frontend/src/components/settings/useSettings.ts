'use client';

import { useEffect, useState } from 'react';

export type Settings = {
  language: 'en' | 'hi' | 'te';
  highContrast: boolean;
  reducedMotion: boolean;
};

const STORAGE_KEY = 'sca:settings:v1';

const defaults: Settings = {
  language: 'en',
  highContrast: false,
  reducedMotion: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setSettings({ ...defaults, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.dataset.contrast = settings.highContrast ? 'high' : 'normal';
    document.documentElement.dataset.reducedMotion = settings.reducedMotion ? 'true' : 'false';
  }, [settings]);

  return { settings, setSettings };
}
