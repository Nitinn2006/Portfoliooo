import React, { useMemo } from 'react';
import { createHerringboneFloorTexture } from '../../utils/floorTexture';
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
  const floorTexture = useMemo(() => createHerringboneFloorTexture(), []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Wood Floor with Herringbone Canvas Texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      {/* Floor Baseboard & Pink Accent Neon Trim */}
      <mesh position={[0, 0.05, -3.95]}>
        <boxGeometry args={[14, 0.1, 0.05]} />
        <meshStandardMaterial color="#0f131c" roughness={0.7} />
      </mesh>
      {/* Subtle floor-edge pink accent glow line */}
      <mesh position={[0, 0.08, -3.92]}>
        <boxGeometry args={[14, 0.015, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* 2. Back Wall (Dark Panel Sections with Window Opening) */}
      {/* Left Wall Section */}
      <mesh position={[-4.5, 2.75, -4]}>
        <boxGeometry args={[5, 5.5, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>
      {/* Right Wall Section */}
      <mesh position={[4.5, 2.75, -4]}>
        <boxGeometry args={[5, 5.5, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>
      {/* Wall Header above Window */}
      <mesh position={[0, 5, -4]}>
        <boxGeometry args={[4, 1, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>
      {/* Wall Sill below Window */}
      <mesh position={[0, 0.6, -4]}>
        <boxGeometry args={[4, 1.2, 0.2]} />
        <meshStandardMaterial color="#0e111a" roughness={0.85} />
      </mesh>

      {/* Decorative Vertical Dark Wall Battens/Panels on Right Wall */}
      {[-1.5, 0, 1.5].map((offset, i) => (
        <mesh key={i} position={[3.5 + offset, 2.75, -3.88]}>
          <boxGeometry args={[0.04, 5.3, 0.04]} />
          <meshStandardMaterial color="#192030" roughness={0.5} />
        </mesh>
      ))}

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
            opacity={0.15}
            roughness={0.1}
            transmission={0.8}
            ior={1.4}
            color="#93c5fd"
          />
        </mesh>

        {/* City Skyline visible outside the window */}
        <Skyline />
      </group>

      {/* 4. Side Walls */}
      {/* Left Wall */}
      <mesh position={[-7, 2.75, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5.5]} />
        <meshStandardMaterial color="#0b0e15" roughness={0.9} />
      </mesh>
      {/* Right Wall */}
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

      {/* Desk (center-front of room) */}
      <Desk />

      {/* Monitor on desk */}
      <Monitor />

      {/* Desk Lamp (right side of desk) */}
      <DeskLamp />

      {/* Notebook on left side of desk (About target) */}
      <Notebook />

      {/* Phone on desk (Contact target) */}
      <Phone />

      {/* Robot Mascot on desk near monitor */}
      <RobotMascot />

      {/* Plants */}
      <DeskPlant position={[-1.4, 0.88, -2.6]} />
      <DeskPlant position={[1.5, 0.88, -2.3]} />

      {/* Pegboard on left wall section (Achievements target) */}
      <Pegboard reducedMotion={reducedMotion} />

      {/* Bookshelf beside desk (decorative, near About notebook) */}
      <Bookshelf />

      {/* Fake baked desk shadow on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -2.2]}>
        <planeGeometry args={[3.6, 1.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
