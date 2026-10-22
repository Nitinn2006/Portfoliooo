import { useSyncExternalStore } from 'react';

/**
 * Reactive hook for `prefers-reduced-motion: reduce`.
 * Returns true when the user's OS/browser requests minimal animation.
 */
const query =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

let snapshot = query?.matches ?? false;

function subscribe(cb: () => void) {
  if (!query) return () => {};
  const handler = (e: MediaQueryListEvent) => {
    snapshot = e.matches;
    cb();
  };
  query.addEventListener('change', handler);
  return () => query.removeEventListener('change', handler);
}

function getSnapshot() {
  return snapshot;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
