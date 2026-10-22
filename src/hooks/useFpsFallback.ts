import { useEffect, useRef } from 'react';

interface FpsFallbackOptions {
  enabled: boolean;
  minFps?: number;
  sampleFrames?: number;
  onLowFps: () => void;
}

/**
 * Runs a quick 60-frame benchmark after mount.
 * If average FPS falls below minFps (default: 25), triggers onLowFps to fall back to the 2D document view.
 * Shuts off immediately after the check to prevent runtime overhead.
 */
export function useFpsFallback({
  enabled,
  minFps = 25,
  sampleFrames = 60,
  onLowFps,
}: FpsFallbackOptions) {
  const onLowFpsRef = useRef(onLowFps);
  onLowFpsRef.current = onLowFps;

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let startTime: number | null = null;
    let animId: number;

    const measure = (now: number) => {
      if (startTime === null) {
        startTime = now;
        animId = requestAnimationFrame(measure);
        return;
      }

      frameCount++;

      if (frameCount >= sampleFrames) {
        const elapsed = (now - startTime) / 1000;
        const avgFps = frameCount / elapsed;

        if (avgFps < minFps) {
          console.warn(`[Performance] Low frame rate detected (${avgFps.toFixed(1)} FPS). Switching to 2D view.`);
          onLowFpsRef.current();
        }
        return; // Done measuring
      }

      animId = requestAnimationFrame(measure);
    };

    // Slight delay before measuring to avoid cold-start compilation hitches
    const timer = setTimeout(() => {
      animId = requestAnimationFrame(measure);
    }, 1500);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [enabled, minFps, sampleFrames]);
}
