import React, { useRef } from 'react';
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
}

/**
 * Floating pink diamond marker above interactive objects.
 * Gently bobs up/down and pulses.
 * Hidden while a panel is open.
 * Label tooltip is sized in fixed screen pixels (no distanceFactor scaling).
 */
export const Hotspot: React.FC<HotspotProps> = ({
  position,
  label,
  section,
  visible,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle bob
      groupRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.08;
      // Slow rotation
      groupRef.current.rotation.y = t * 0.8;
    }
    if (glowRef.current) {
      // Pulse scale
      const pulse = 1 + Math.sin(t * 3 + position[0] * 2) * 0.15;
      glowRef.current.scale.setScalar(pulse);
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
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {/* Diamond shape: octahedron */}
      <mesh>
        <octahedronGeometry args={[0.12, 0]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.15} toneMapped={false} />
      </mesh>

      {/* Tooltip label via Html overlay: NO distanceFactor so it stays fixed screen pixels */}
      <Html
        center
        position={[0, 0.32, 0]}
        style={{ pointerEvents: 'auto', whiteSpace: 'nowrap' }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(section);
          }}
          className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-white/10 text-[11px] font-mono tracking-wider text-rose-300 hover:text-white hover:border-rose-500/50 backdrop-blur-sm shadow-lg select-none whitespace-nowrap cursor-pointer transition-colors"
        >
          {label} →
        </button>
      </Html>
    </group>
  );
};
