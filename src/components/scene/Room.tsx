import React from 'react';
import { MeshReflectorMaterial, RoundedBox } from '@react-three/drei';
import { Skyline } from './Skyline';
import {
  Desk,
  Monitor,
  DeskLamp,
  Notebook,
  Phone,
  RobotMascot,
  DeskPlant,
  Pegboard,
  Bookshelf,
} from './Furniture';

interface RoomProps {
  reducedMotion?: boolean;
}

export const Room: React.FC<RoomProps> = ({ reducedMotion }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Dark Wood Floor with Subtle Realistic Night Reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mirror={0.22}
          mixBlur={0.85}
          mixStrength={1.2}
          roughness={0.65}
          depthScale={1.0}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#121622"
          metalness={0.15}
        />
      </mesh>

      {/* Cozy Woven Area Rug under Desk */}
      <group position={[0, 0.005, -2.0]}>
        <RoundedBox
          args={[3.1, 0.008, 2.0]}
          radius={0.06}
          smoothness={4}
        >
          <meshStandardMaterial color="#0c101a" roughness={0.9} />
        </RoundedBox>
        <RoundedBox
          args={[2.98, 0.009, 1.88]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial color="#111624" roughness={0.85} />
        </RoundedBox>
        {/* Subtle accent border strip on rug */}
        <mesh position={[0, 0.006, 0.88]}>
          <boxGeometry args={[2.8, 0.002, 0.015]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={0.6} toneMapped={false} />
        </mesh>
      </group>

      {/* Floor Baseboards & Back Accent Neon Trim */}
      <mesh position={[0, 0.06, -3.95]}>
        <boxGeometry args={[14, 0.12, 0.05]} />
        <meshStandardMaterial color="#0f131c" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.08, -3.92]}>
        <boxGeometry args={[14, 0.015, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Side wall baseboards */}
      <mesh position={[-6.95, 0.06, 1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.12, 0.05]} />
        <meshStandardMaterial color="#0f131c" roughness={0.7} />
      </mesh>
      <mesh position={[6.95, 0.06, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.12, 0.05]} />
        <meshStandardMaterial color="#0f131c" roughness={0.7} />
      </mesh>

      {/* 2. Back Wall (Dark Panel Sections with Window Opening) */}
      <mesh position={[-4.5, 2.75, -4]}>
        <boxGeometry args={[5, 5.5, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>
      <mesh position={[4.5, 2.75, -4]}>
        <boxGeometry args={[5, 5.5, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>
      <mesh position={[0, 5, -4]}>
        <boxGeometry args={[4, 1, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.6, -4]}>
        <boxGeometry args={[4, 1.2, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>

      {/* Decorative Vertical Dark Wall Battens on Right Wall */}
      {[-1.5, 0, 1.5].map((offset, i) => (
        <mesh key={i} position={[3.5 + offset, 2.75, -3.88]}>
          <boxGeometry args={[0.04, 5.3, 0.04]} />
          <meshStandardMaterial color="#192030" roughness={0.5} />
        </mesh>
      ))}

      {/* Framed Wall Art: Abstract Data Architecture Poster on Back Wall */}
      <group position={[4.6, 2.9, -3.86]}>
        <RoundedBox args={[1.15, 1.55, 0.03]} radius={0.01} smoothness={4}>
          <meshStandardMaterial color="#161c28" roughness={0.5} metalness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[1.04, 1.44]} />
          <meshStandardMaterial color="#080b12" roughness={0.8} />
        </mesh>
        {/* Abstract Neural Nodes & Network Vectors */}
        {[-0.3, 0, 0.3].map((x, i) =>
          [-0.4, 0, 0.4].map((y, j) => (
            <mesh key={`node-${i}-${j}`} position={[x, y, 0.022]}>
              <circleGeometry args={[0.032, 16]} />
              <meshBasicMaterial
                color={i === 1 && j === 1 ? '#f43f5e' : (i + j) % 2 === 0 ? '#38bdf8' : '#94a3b8'}
                toneMapped={false}
              />
            </mesh>
          ))
        )}
        {[-0.2, 0.2].map((y, i) => (
          <mesh key={`line-${i}`} position={[0, y, 0.02]}>
            <planeGeometry args={[0.6, 0.005]} />
            <meshBasicMaterial color="#334155" />
          </mesh>
        ))}
        <mesh position={[0, -0.58, 0.02]}>
          <planeGeometry args={[0.7, 0.025]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Framed Minimalist Graphic Poster on Right Wall */}
      <group position={[6.95, 2.8, -1.2]} rotation={[0, -Math.PI / 2, 0]}>
        <RoundedBox args={[1.0, 1.4, 0.03]} radius={0.01} smoothness={4}>
          <meshStandardMaterial color="#161c28" roughness={0.5} metalness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.9, 1.3]} />
          <meshStandardMaterial color="#090d16" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0.02]}>
          <planeGeometry args={[0.6, 0.02]} />
          <meshBasicMaterial color="#f43f5e" toneMapped={false} />
        </mesh>
        <mesh position={[-0.1, 0.1, 0.02]}>
          <planeGeometry args={[0.4, 0.012]} />
          <meshBasicMaterial color="#38bdf8" toneMapped={false} />
        </mesh>
        <mesh position={[0.1, -0.1, 0.02]}>
          <planeGeometry args={[0.4, 0.012]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* 3. Large Window Frame and Glass */}
      <group position={[0, 2.8, -4]}>
        {/* Outer Frame */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[4.1, 0.1, 0.25]} />
          <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[4.1, 0.15, 0.35]} />
          <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[0.1, 3.2, 0.25]} />
          <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[0.1, 3.2, 0.25]} />
          <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Center Vertical Mullion */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 3.2, 0.22]} />
          <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Center Horizontal Transom */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[4.0, 0.05, 0.22]} />
          <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Window Glass Pane */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3.9, 3.1]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.12}
            roughness={0.1}
            transmission={0.85}
            ior={1.4}
            color="#93c5fd"
          />
        </mesh>

        {/* City Skyline visible outside the window */}
        <Skyline />
      </group>

      {/* 4. Side Walls */}
      <mesh position={[-7, 2.75, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5.5]} />
        <meshStandardMaterial color="#0b0e15" roughness={0.9} />
      </mesh>
      <mesh position={[7, 2.75, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5.5]} />
        <meshStandardMaterial color="#0b0e15" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#07090e" roughness={0.95} />
      </mesh>

      {/* ===== FURNITURE ===== */}

      {/* Desk with beveled edge and drawer */}
      <Desk />

      {/* Monitor on desk */}
      <Monitor />

      {/* Desk Lamp */}
      <DeskLamp />

      {/* Notebook on desk (About target) */}
      <Notebook />

      {/* Phone on desk (Contact target) */}
      <Phone />

      {/* Mascot */}
      <RobotMascot />

      {/* Plants */}
      <DeskPlant position={[-1.4, 0.88, -2.6]} />
      <DeskPlant position={[1.5, 0.88, -2.3]} />

      {/* Pegboard on left wall section (Achievements target) */}
      <Pegboard reducedMotion={reducedMotion} />

      {/* Bookshelf beside desk */}
      <Bookshelf />
    </group>
  );
};
