import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { NavSection } from '../HUD';

interface HotspotProps {
  position: [number, number, number];
  label: string;
  section: NavSection;
  visible: boolean;
  onSelect: (section: NavSection) => void;
  index?: number;
  labelOffset?: [number, number, number];
}

/**
 * Refined floating pink diamond marker above interactive objects.
 * - 40% smaller octahedron
 * - Expanding soft pulse ring (scale 1 -> 1.6, opacity 0.6 -> 0, 2s loop staggered per hotspot)
 * - Label tooltip fades in smoothly on hover or idle focus with collision-safe offset
 */
export const Hotspot: React.FC<HotspotProps> = ({
  position,
  label,
  section,
  visible,
  onSelect,
  index = 0,
  labelOffset = [0, 0.28, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle bobbing motion
      groupRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.05;
      groupRef.current.rotation.y = t * 0.75;
    }

    if (ringRef.current && ringMatRef.current) {
      // 2s pulse loop staggered per hotspot index
      const progress = ((t * 0.5 + index * 0.25) % 1);
      const scale = 1.0 + progress * 0.65;
      const opacity = (1.0 - progress) * 0.6;
      ringRef.current.scale.set(scale, scale, 1);
      ringMatRef.current.opacity = opacity;
    }
  });

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(section);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* 40% smaller diamond: octahedron radius 0.07 */}
      <mesh scale={hovered ? 1.2 : 1.0}>
        <octahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Pulsing expand ring (facing camera) */}
      <mesh ref={ringRef} rotation={[-0.4, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 24]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color="#f43f5e"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Tooltip label via Html overlay with collision-safe offset */}
      <Html
        center
        position={labelOffset}
        style={{ pointerEvents: 'auto', whiteSpace: 'nowrap' }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(section);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`px-2.5 py-1 rounded-md border font-mono tracking-wider text-[11px] backdrop-blur-md shadow-lg select-none whitespace-nowrap cursor-pointer transition-all duration-300 ${
            hovered
              ? 'opacity-100 translate-y-0 scale-105 bg-slate-950/95 border-rose-500/60 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'opacity-70 bg-slate-950/80 border-white/10 text-rose-300 hover:opacity-100'
          }`}
        >
          {label} →
        </button>
      </Html>
    </group>
  );
};
