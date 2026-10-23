import { useEffect, useRef } from 'react';

interface FpsFallbackOptions {
  enabled: boolean;
  minFps?: number;
  sampleFrames?: number;
  onLowFps: () => void;
}

/**
 * Runs a frame benchmark after GPU warmup.
 * Waits 4s for shader compilation / texture uploads before sampling 90 frames.
 * If average FPS falls below minFps (default: 20), triggers onLowFps to fall back to the 2D document view.
 * Shuts off immediately after the check to prevent runtime overhead.
 */
export function useFpsFallback({
  enabled,
  minFps = 20,
  sampleFrames = 90,
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

    // 4s delay: let GPU finish shader compilation, texture uploads, and HDRI/AO warmup
    const timer = setTimeout(() => {
      animId = requestAnimationFrame(measure);
    }, 4000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [enabled, minFps, sampleFrames]);
}
