'use client';

const PREFIX = 'sca:';

export function resetDemoState() {
  if (typeof window === 'undefined') return;

  // Remove only this app's keys.
  const keysToRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith(PREFIX)) keysToRemove.push(key);
  }

  keysToRemove.forEach((k) => window.localStorage.removeItem(k));

  // Reset any runtime-applied flags.
  delete document.documentElement.dataset.contrast;
  delete document.documentElement.dataset.reducedMotion;

  // Hard reload so all pages return to a clean state.
  window.location.href = '/';
}
