import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

interface BuildingDef {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  layer: number;
  color: string;
  windows: {
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
    color: string;
    twinkleIdx: number;
  }[];
}

/**
 * 3-layer skyline backdrop with subtle window twinkling, stars, and atmospheric depth.
 */
export const Skyline: React.FC = () => {
  const windowMeshRefs = useRef<THREE.Mesh[]>([]);

  // Generate 3 distinct layers of skyscraper silhouettes with deterministic window grids
  const { buildings, totalTwinkleCount } = useMemo(() => {
    const list: BuildingDef[] = [];
    const windowPalette = ['#fde047', '#fed7aa', '#93c5fd', '#38bdf8', '#fbcfe8', '#ffffff'];
    let twinkleCounter = 0;

    // Layer 1: Distant background towers (z ~ -13 to -14), dark silhouette, tiny windows
    for (let i = 0; i < 14; i++) {
      const x = -11 + i * 1.7 + ((i * 3) % 4) * 0.2;
      const z = -13.5 - (i % 3) * 0.6;
      const w = 1.1 + (i % 3) * 0.3;
      const h = 3.5 + ((i * 7) % 6) * 0.7;
      const d = 1.0;
      const wins: BuildingDef['windows'] = [];

      const floors = Math.floor(h / 0.45);
      const cols = Math.floor(w / 0.3);
      for (let f = 2; f < floors - 1; f++) {
        for (let c = 0; c < cols; c++) {
          if ((i * 17 + f * 7 + c * 13) % 4 === 0) {
            wins.push({
              x: (c - cols / 2 + 0.5) * 0.28,
              y: f * 0.42 - h / 2,
              z: d / 2 + 0.01,
              w: 0.07,
              h: 0.1,
              color: windowPalette[(i + f + c) % windowPalette.length],
              twinkleIdx: twinkleCounter++,
            });
          }
        }
      }
      list.push({ x, y: h / 2 - 0.5, z, w, h, d, layer: 1, color: '#060911', windows: wins });
    }

    // Layer 2: Midground towers (z ~ -9.5), medium scale with warm & cool lit grids
    for (let i = 0; i < 11; i++) {
      const x = -8 + i * 1.6 + ((i * 5) % 3) * 0.25;
      const z = -9.5 - (i % 2) * 0.8;
      const w = 1.2 + (i % 4) * 0.25;
      const h = 2.8 + ((i * 11) % 5) * 0.6;
      const d = 1.1;
      const wins: BuildingDef['windows'] = [];

      const floors = Math.floor(h / 0.38);
      const cols = Math.floor(w / 0.28);
      for (let f = 1; f < floors - 1; f++) {
        for (let c = 0; c < cols; c++) {
          if ((i * 23 + f * 11 + c * 5) % 3 === 0) {
            wins.push({
              x: (c - cols / 2 + 0.5) * 0.25,
              y: f * 0.35 - h / 2,
              z: d / 2 + 0.015,
              w: 0.09,
              h: 0.12,
              color: windowPalette[(i * 2 + f + c) % windowPalette.length],
              twinkleIdx: twinkleCounter++,
            });
          }
        }
      }
      list.push({ x, y: h / 2 - 0.6, z, w, h, d, layer: 2, color: '#090d16', windows: wins });
    }

    // Layer 3: Near foreground rooftop shapes (z ~ -6.5)
    for (let i = 0; i < 7; i++) {
      const x = -7 + i * 2.3;
      const z = -6.8 - (i % 2) * 0.5;
      const w = 1.4 + (i % 3) * 0.3;
      const h = 1.6 + (i % 3) * 0.4;
      const d = 1.2;
      list.push({ x, y: h / 2 - 0.7, z, w, h, d, layer: 3, color: '#0b101c', windows: [] });
    }

    return { buildings: list, totalTwinkleCount: twinkleCounter };
  }, []);

  // Subtle window twinkling: gently pulse a subset of windows over time
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    windowMeshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      // Staggered slow twinkle: +/- 30% intensity
      const pulse = 0.7 + Math.sin(t * 1.5 + idx * 0.8) * 0.3;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = pulse;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Night Sky Atmospheric Backdrop */}
      <mesh position={[0, 4, -16]}>
        <planeGeometry args={[45, 24]} />
        <meshBasicMaterial color="#04060c" />
      </mesh>

      {/* Subtle Starfield */}
      <Stars
        radius={45}
        depth={20}
        count={350}
        factor={2}
        saturation={0.5}
        fade
        speed={0.4}
      />

      {/* Glowing Night Moon with soft halo */}
      <mesh position={[-4.5, 6.2, -15]}>
        <circleGeometry args={[1.6, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
      </mesh>
      <mesh position={[-4.5, 6.2, -14.9]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.25} />
      </mesh>
      <mesh position={[-4.5, 6.2, -14.8]}>
        <circleGeometry args={[0.38, 32]} />
        <meshBasicMaterial color="#f0f9ff" />
      </mesh>

      {/* Buildings across all 3 depth layers */}
      {buildings.map((b, bIdx) => (
        <group key={`b-${bIdx}`} position={[b.x, b.y, b.z]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>

          {/* Roof Spire / Antenna on selected buildings */}
          {bIdx % 5 === 1 && (
            <group position={[0, b.h / 2, 0]}>
              <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.015, 0.05, 0.9, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              {/* Blinking red aviation warning light */}
              <mesh position={[0, 0.92, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ef4444" toneMapped={false} />
              </mesh>
            </group>
          )}

          {/* Lit Windows */}
          {b.windows.map((w, wIdx) => {
            const refIdx = (bIdx * 31 + wIdx) % Math.min(totalTwinkleCount, 60);
            return (
              <mesh
                key={`w-${wIdx}`}
                ref={(el) => {
                  if (el) windowMeshRefs.current[refIdx] = el;
                }}
                position={[w.x, w.y, w.z]}
              >
                <planeGeometry args={[w.w, w.h]} />
                <meshBasicMaterial
                  color={w.color}
                  transparent
                  opacity={0.85}
                  toneMapped={false}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};
