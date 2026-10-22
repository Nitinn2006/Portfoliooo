import React, { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { NavSection } from '../HUD';

/** Camera position + lookAt target for each navigation section. */
const cameraTargets: Record<NavSection, { pos: [number, number, number]; look: [number, number, number] }> = {
  overview:     { pos: [0, 3.0, 5.8],       look: [0, 1.3, 0] },
  projects:     { pos: [0, 1.6, -0.3],      look: [0, 1.5, -2.5] },
  achievements: { pos: [-2.2, 2.7, -1.0],   look: [-3.6, 2.5, -3.8] },
  about:        { pos: [-1.1, 1.7, -0.2],   look: [-1.1, 0.95, -2.0] },
  contact:      { pos: [0.7, 1.5, 0.2],     look: [0.7, 0.95, -1.7] },
};

/** Starting position for the intro fly-in (high + far, looking down at room). */
const INTRO_START_POS: [number, number, number] = [0, 5.8, 9.5];
const INTRO_START_LOOK: [number, number, number] = [0, 0, -2];

interface CameraControllerProps {
  activeSection: NavSection;
  onResetToOverview: () => void;
  reducedMotion: boolean;
  /** Called when the intro camera fly-in completes (or instantly if reduced motion). */
  onIntroComplete: () => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  activeSection,
  onResetToOverview,
  reducedMotion,
  onIntroComplete,
}) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const lookAtProxy = useRef({ x: 0, y: 1.2, z: 0 });
  const isTweening = useRef(false);
  const prevSection = useRef<NavSection>('overview');
  const introPlayed = useRef(false);

  // Intro fly-in on mount
  useEffect(() => {
    if (introPlayed.current) return;
    introPlayed.current = true;

    // If starting directly on a specific section from URL hash or reduced motion, cut directly
    if (activeSection !== 'overview' || reducedMotion) {
      const target = cameraTargets[activeSection];
      camera.position.set(...target.pos);
      lookAtProxy.current = { x: target.look[0], y: target.look[1], z: target.look[2] };
      currentLookAt.current.set(...target.look);
      camera.lookAt(currentLookAt.current);
      prevSection.current = activeSection;
      onIntroComplete();
      return;
    }

    const overview = cameraTargets.overview;

    // Start from dramatic elevated position
    camera.position.set(...INTRO_START_POS);
    lookAtProxy.current = { x: INTRO_START_LOOK[0], y: INTRO_START_LOOK[1], z: INTRO_START_LOOK[2] };
    currentLookAt.current.set(...INTRO_START_LOOK);
    camera.lookAt(currentLookAt.current);
    isTweening.current = true;

    gsap.to(camera.position, {
      x: overview.pos[0],
      y: overview.pos[1],
      z: overview.pos[2],
      duration: 2.2,
      ease: 'power3.inOut',
      delay: 0.3,
      onUpdate: () => {
        camera.lookAt(lookAtProxy.current.x, lookAtProxy.current.y, lookAtProxy.current.z);
      },
      onComplete: () => {
        isTweening.current = false;
        onIntroComplete();
      },
    });

    gsap.to(lookAtProxy.current, {
      x: overview.look[0],
      y: overview.look[1],
      z: overview.look[2],
      duration: 2.2,
      ease: 'power3.inOut',
      delay: 0.3,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally run once on mount only

  // GSAP fly-to when activeSection changes (not on intro)
  useEffect(() => {
    if (activeSection === prevSection.current) return;
    prevSection.current = activeSection;

    const target = cameraTargets[activeSection];
    const dur = reducedMotion ? 0 : 1.2;

    // Kill any in-flight tweens
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(lookAtProxy.current);

    if (dur === 0) {
      // Instant cut
      camera.position.set(...target.pos);
      lookAtProxy.current = { x: target.look[0], y: target.look[1], z: target.look[2] };
      currentLookAt.current.set(...target.look);
      camera.lookAt(currentLookAt.current);
      isTweening.current = false;
      return;
    }

    isTweening.current = true;

    gsap.to(camera.position, {
      x: target.pos[0],
      y: target.pos[1],
      z: target.pos[2],
      duration: dur,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.lookAt(lookAtProxy.current.x, lookAtProxy.current.y, lookAtProxy.current.z);
      },
      onComplete: () => {
        isTweening.current = false;
      },
    });

    gsap.to(lookAtProxy.current, {
      x: target.look[0],
      y: target.look[1],
      z: target.look[2],
      duration: dur,
      ease: 'power3.inOut',
    });
  }, [activeSection, camera, reducedMotion]);

  // ESC key
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeSection !== 'overview') {
        onResetToOverview();
      }
    },
    [activeSection, onResetToOverview],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  // Per-frame idle drift (overview only, not during tweens, skip if reduced motion)
  useFrame((state, delta) => {
    if (isTweening.current) return;

    if (activeSection === 'overview') {
      const target = cameraTargets.overview;

      if (reducedMotion) {
        // Static hold — no drift, no parallax
        camera.position.set(...target.pos);
        currentLookAt.current.set(...target.look);
        camera.lookAt(currentLookAt.current);
      } else {
        const t = state.clock.getElapsedTime();
        const driftX = Math.sin(t * 0.45) * 0.08;
        const driftY = Math.cos(t * 0.35) * 0.05;

        const goalX = target.pos[0] + state.pointer.x * 0.4 + driftX;
        const goalY = target.pos[1] + state.pointer.y * 0.25 + driftY;
        const goalZ = target.pos[2];

        const f = Math.min(delta * 2.5, 0.1);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, goalX, f);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, goalY, f);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, goalZ, f);

        currentLookAt.current.x = THREE.MathUtils.lerp(
          currentLookAt.current.x,
          target.look[0] + state.pointer.x * 0.15,
          f,
        );
        currentLookAt.current.y = THREE.MathUtils.lerp(
          currentLookAt.current.y,
          target.look[1] + state.pointer.y * 0.1,
          f,
        );
        currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, target.look[2], f);

        camera.lookAt(currentLookAt.current);
      }

      // Keep proxy in sync
      lookAtProxy.current.x = currentLookAt.current.x;
      lookAtProxy.current.y = currentLookAt.current.y;
      lookAtProxy.current.z = currentLookAt.current.z;
    }
  });

  return null;
};
