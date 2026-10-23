import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { content, AchievementItem } from '../../content';
import { createCertificateTexture } from '../../utils/certificateTexture';
import {
  createMonitorScreenTexture,
  createNotebookTexture,
  createPhoneScreenTexture,
} from '../../utils/propTextures';

/**
 * Desk with emissive pink edge strip, positioned center-front of room.
 * Desktop surface at y ~= 0.85
 */
export const Desk: React.FC = () => {
  return (
    <group position={[0, 0, -2.2]}>
      {/* Desktop Surface */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[3.2, 0.06, 1.2]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Front edge pink accent strip (emissive) */}
      <mesh position={[0, 0.84, 0.59]}>
        <boxGeometry args={[3.2, 0.02, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Back edge subtle accent */}
      <mesh position={[0, 0.84, -0.59]}>
        <boxGeometry args={[3.2, 0.015, 0.015]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Left Leg Panel */}
      <mesh position={[-1.45, 0.42, 0]}>
        <boxGeometry args={[0.06, 0.84, 1.1]} />
        <meshStandardMaterial color="#12151e" roughness={0.7} />
      </mesh>

      {/* Right Leg Panel */}
      <mesh position={[1.45, 0.42, 0]}>
        <boxGeometry args={[0.06, 0.84, 1.1]} />
        <meshStandardMaterial color="#12151e" roughness={0.7} />
      </mesh>

      {/* Back Panel / Cable Management */}
      <mesh position={[0, 0.42, -0.55]}>
        <boxGeometry args={[2.84, 0.84, 0.04]} />
        <meshStandardMaterial color="#0e111a" roughness={0.8} />
      </mesh>

      {/* Drawer block right side */}
      <mesh position={[1.0, 0.42, 0.05]}>
        <boxGeometry args={[0.85, 0.6, 0.9]} />
        <meshStandardMaterial color="#14171f" roughness={0.7} />
      </mesh>
      {/* Drawer handle */}
      <mesh position={[1.0, 0.48, 0.52]}>
        <boxGeometry args={[0.3, 0.03, 0.03]} />
        <meshStandardMaterial color="#2a3040" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
};

/**
 * Monitor on a stand, centered on the desk.
 * Displays a realistic dark data-science IDE and analytics dashboard (Projects target).
 */
export const Monitor: React.FC = () => {
  const screenTexture = useMemo(() => createMonitorScreenTexture(), []);

  return (
    <group position={[0, 0.88, -2.5]}>
      {/* Stand base */}
      <mesh position={[0, 0, 0.15]}>
        <boxGeometry args={[0.4, 0.03, 0.3]} />
        <meshStandardMaterial color="#101420" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.44, 0.08]} />
        <meshStandardMaterial color="#101420" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Screen bezel */}
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[1.35, 0.8, 0.04]} />
        <meshStandardMaterial color="#0a0c12" roughness={0.6} />
      </mesh>

      {/* Screen with rich IDE / data analytics dashboard texture */}
      <mesh position={[0, 0.62, 0.025]}>
        <planeGeometry args={[1.25, 0.7]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Dedicated monitor glow light illuminating the desk surface in front */}
      <pointLight
        position={[0, 0.62, 0.4]}
        intensity={2.2}
        distance={4}
        decay={2}
        color="#38bdf8"
      />

      {/* Small power LED */}
      <mesh position={[0, 0.26, 0.025]}>
        <circleGeometry args={[0.012, 12]} />
        <meshBasicMaterial color="#22c55e" toneMapped={false} />
      </mesh>
    </group>
  );
};

/**
 * Small desk lamp with warm point light.
 */
export const DeskLamp: React.FC = () => {
  return (
    <group position={[1.2, 0.88, -2.0]}>
      {/* Lamp base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
        <meshStandardMaterial color="#1a1e28" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Lamp arm */}
      <mesh position={[0, 0.35, -0.05]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
        <meshStandardMaterial color="#2a3040" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Lamp shade cone */}
      <mesh position={[0, 0.65, -0.08]} rotation={[0.3, 0, 0]}>
        <coneGeometry args={[0.15, 0.2, 16, 1, true]} />
        <meshStandardMaterial
          color="#1a202c"
          metalness={0.4}
          roughness={0.5}
          side={2} /* DoubleSide */
        />
      </mesh>

      {/* Inner lamp glow bulb */}
      <mesh position={[0, 0.6, -0.06]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#fbbf24" toneMapped={false} />
      </mesh>

      {/* Warm point light emanating from lamp */}
      <pointLight
        position={[0, 0.55, -0.05]}
        intensity={2.2}
        distance={4.5}
        decay={2}
        color="#f59e0b"
      />
    </group>
  );
};

/**
 * Notebook / journal on the desk (for About section target).
 * Open journal displaying Nitin's education, background, and competencies.
 */
export const Notebook: React.FC = () => {
  const notebookTexture = useMemo(() => createNotebookTexture(), []);

  return (
    <group position={[-1.1, 0.88, -1.9]}>
      {/* Open notebook base / cover */}
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.68, 0.02, 0.48]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Open notebook pages with real profile & competencies text */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.64, 0.44]} />
        <meshStandardMaterial
          map={notebookTexture}
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Dedicated warm light illuminating the open notebook */}
      <pointLight
        position={[0, 0.45, 0.1]}
        intensity={2.2}
        distance={3.5}
        decay={1.8}
        color="#fffbeb"
      />

      {/* Pen beside the notebook */}
      <mesh position={[0.42, 0.015, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.35, 8]} />
        <meshStandardMaterial color="#2a3040" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Pen tip */}
      <mesh position={[0.42, 0.015, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.01, 0.04, 8]} />
        <meshStandardMaterial color="#f43f5e" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
};

/**
 * Phone on the desk (Contact section target).
 * Displays a realistic lock-screen with direct email notification and status.
 */
export const Phone: React.FC = () => {
  const phoneTexture = useMemo(() => createPhoneScreenTexture(), []);

  return (
    <group position={[0.7, 0.88, -1.7]}>
      {/* Phone body */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.22, 0.02, 0.38]} />
        <meshStandardMaterial color="#0f1219" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Phone screen with lock-screen, clock, and contact notification */}
      <mesh position={[0, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 0.35]} />
        <meshBasicMaterial map={phoneTexture} toneMapped={false} />
      </mesh>

      {/* Dedicated point light illuminating the phone */}
      <pointLight
        position={[0, 0.35, 0]}
        intensity={2.0}
        distance={3}
        decay={1.8}
        color="#93c5fd"
      />
    </group>
  );
};

/**
 * Small robot mascot made from boxes and spheres.
 */
export const RobotMascot: React.FC = () => {
  return (
    <group position={[-0.55, 0.88, -2.55]}>
      {/* Body */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.14, 0.16, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.12, 0.1, 0.1]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.03, 0.3, 0.052]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      <mesh position={[0.03, 0.3, 0.052]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.06, 6]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.395, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.1, 0.14, 0]}>
        <boxGeometry args={[0.03, 0.1, 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.1, 0.14, 0]}>
        <boxGeometry args={[0.03, 0.1, 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.04, 0.025, 0.02]}>
        <boxGeometry args={[0.05, 0.05, 0.07]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0.04, 0.025, 0.02]}>
        <boxGeometry args={[0.05, 0.05, 0.07]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
    </group>
  );
};

/**
 * Small desk plant (succulent style).
 */
export const DeskPlant: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.07, 0.055, 0.1, 12]} />
        <meshStandardMaterial color="#3b2f2f" roughness={0.8} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.02, 12]} />
        <meshStandardMaterial color="#1a1410" roughness={0.9} />
      </mesh>

      {/* Leaves (simple spheres) */}
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#166534" roughness={0.7} />
      </mesh>
      <mesh position={[0.03, 0.19, 0.02]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.7} />
      </mesh>
      <mesh position={[-0.025, 0.18, -0.02]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#14532d" roughness={0.7} />
      </mesh>
    </group>
  );
};

interface HangingCertificateProps {
  item: AchievementItem;
  index: number;
  position: [number, number, number];
  headerColor: string;
  hasSilverMedal?: boolean;
  reducedMotion?: boolean;
}

const HangingCertificate: React.FC<HangingCertificateProps> = ({
  item,
  index,
  position,
  headerColor,
  hasSilverMedal,
  reducedMotion,
}) => {
  const swayRef = useRef<THREE.Group>(null);
  const texture = useMemo(
    () => createCertificateTexture(item, headerColor),
    [item, headerColor]
  );

  useFrame((state) => {
    if (reducedMotion || !swayRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle pendulum sway: +/- 2 degrees (0.035 rad), different phase per item
    const angle = Math.sin(t * 1.5 + index * 1.6) * 0.035;
    swayRef.current.rotation.z = angle;
  });

  return (
    <group ref={swayRef} position={position}>
      {/* Peg Pin protruding from board */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Hanging Strings from peg to certificate top corners */}
      <mesh position={[-0.09, -0.07, 0.012]} rotation={[0, 0, 0.85]}>
        <cylinderGeometry args={[0.003, 0.003, 0.22, 6]} />
        <meshBasicMaterial color="#334155" />
      </mesh>
      <mesh position={[0.09, -0.07, 0.012]} rotation={[0, 0, -0.85]}>
        <cylinderGeometry args={[0.003, 0.003, 0.22, 6]} />
        <meshBasicMaterial color="#334155" />
      </mesh>

      {/* Certificate Card Body */}
      <group position={[0, -0.36, 0.015]}>
        {/* Paper card rectangle (square to match 512x512 certificate texture) */}
        <mesh>
          <boxGeometry args={[0.48, 0.48, 0.008]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Silver Medal on Ribbon for Smart India Hackathon (2nd position) */}
        {hasSilverMedal && (
          <group position={[-0.14, -0.22, 0.01]}>
            {/* Ribbon */}
            <mesh position={[0, -0.03, 0]}>
              <boxGeometry args={[0.05, 0.08, 0.004]} />
              <meshStandardMaterial color="#2563eb" roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.03, 0.002]}>
              <boxGeometry args={[0.015, 0.08, 0.004]} />
              <meshStandardMaterial color="#ef4444" roughness={0.7} />
            </mesh>

            {/* Silver Medal Disc */}
            <mesh position={[0, -0.09, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.042, 0.042, 0.008, 24]} />
              <meshStandardMaterial
                color="#e2e8f0"
                metalness={0.92}
                roughness={0.18}
              />
            </mesh>
            {/* Inner Ring */}
            <mesh position={[0, -0.09, 0.011]}>
              <ringGeometry args={[0.024, 0.032, 24]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
            {/* Embossed '2' for 2nd position */}
            <mesh position={[0, -0.09, 0.012]}>
              <circleGeometry args={[0.018, 16]} />
              <meshStandardMaterial
                color="#f8fafc"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};

/**
 * Pegboard mounted on the left wall with illuminated accent wall panel and 3 hanging certificate cards.
 */
export const Pegboard: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion }) => {
  const items = content.achievements.items; // Exactly 3 items

  // 3 card horizontal layout slots
  const slots: { x: number; y: number; headerColor: string; hasSilverMedal?: boolean }[] = [
    { x: -0.58, y: 0.35, headerColor: '#881337', hasSilverMedal: true }, // SIH 2026 (2nd position)
    { x: 0.0,   y: 0.35, headerColor: '#0369a1' },                        // Kaggle Pandas
    { x: 0.58,  y: 0.35, headerColor: '#15803d' },                        // Kaggle Intro ML
  ];

  return (
    <group position={[-4.5, 2.6, -3.8]}>
      {/* 8. Lit wall behind the pegboard with an emissive edge glow */}
      {/* Dedicated accent wall panel behind the pegboard */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[2.3, 1.6, 0.04]} />
        <meshStandardMaterial color="#111520" roughness={0.85} />
      </mesh>

      {/* Emissive Edge Glow surrounding the wall panel */}
      <mesh position={[0, 0.81, -0.04]}>
        <boxGeometry args={[2.34, 0.02, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.81, -0.04]}>
        <boxGeometry args={[2.34, 0.02, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>
      <mesh position={[-1.16, 0, -0.04]}>
        <boxGeometry args={[0.02, 1.62, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>
      <mesh position={[1.16, 0, -0.04]}>
        <boxGeometry args={[0.02, 1.62, 0.02]} />
        <meshBasicMaterial color="#f43f5e" toneMapped={false} />
      </mesh>

      {/* Dedicated warm point light illuminating the pegboard and wall */}
      <pointLight
        position={[0, 0.6, 0.8]}
        intensity={3.2}
        distance={5}
        decay={1.8}
        color="#fffbeb"
      />

      {/* Pegboard body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.9, 1.35, 0.04]} />
        <meshStandardMaterial color="#181d2a" roughness={0.7} />
      </mesh>

      {/* Pegboard metal borders */}
      <mesh position={[0, 0.68, 0.025]}>
        <boxGeometry args={[1.92, 0.025, 0.025]} />
        <meshStandardMaterial color="#242b3d" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.68, 0.025]}>
        <boxGeometry args={[1.92, 0.025, 0.025]} />
        <meshStandardMaterial color="#242b3d" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[-0.95, 0, 0.025]}>
        <boxGeometry args={[0.025, 1.36, 0.025]} />
        <meshStandardMaterial color="#242b3d" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0.95, 0, 0.025]}>
        <boxGeometry args={[0.025, 1.36, 0.025]} />
        <meshStandardMaterial color="#242b3d" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Peg holes grid */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <mesh
            key={`peg-${row}-${col}`}
            position={[-0.8 + col * 0.178, 0.5 - row * 0.2, 0.022]}
          >
            <circleGeometry args={[0.014, 8]} />
            <meshStandardMaterial color="#0b0e15" roughness={0.9} />
          </mesh>
        ))
      )}

      {/* 5 & 6. Hanging Certificate Cards: exactly 3 matching content.ts */}
      {items.map((item, i) => {
        const slot = slots[i] || slots[0];
        return (
          <HangingCertificate
            key={item.id}
            item={item}
            index={i}
            position={[slot.x, slot.y, 0.03]}
            headerColor={slot.headerColor}
            hasSilverMedal={slot.hasSilverMedal}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
};

/**
 * Small bookshelf / shelf on the left side of the desk area.
 */
export const Bookshelf: React.FC = () => {
  const bookColors = ['#1e3a5f', '#3b1e2f', '#1a3326', '#2d2040', '#3b2f1a'];

  return (
    <group position={[-2.5, 0, -3.2]}>
      {/* Shelf frame sides */}
      <mesh position={[-0.35, 0.65, 0]}>
        <boxGeometry args={[0.04, 1.3, 0.4]} />
        <meshStandardMaterial color="#14171f" roughness={0.7} />
      </mesh>
      <mesh position={[0.35, 0.65, 0]}>
        <boxGeometry args={[0.04, 1.3, 0.4]} />
        <meshStandardMaterial color="#14171f" roughness={0.7} />
      </mesh>

      {/* Shelves (3 levels) */}
      {[0.0, 0.44, 0.88].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[0.72, 0.03, 0.4]} />
          <meshStandardMaterial color="#14171f" roughness={0.7} />
        </mesh>
      ))}

      {/* Top shelf */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.72, 0.03, 0.4]} />
        <meshStandardMaterial color="#14171f" roughness={0.7} />
      </mesh>

      {/* Books on bottom shelf */}
      {bookColors.slice(0, 4).map((color, i) => (
        <mesh key={i} position={[-0.2 + i * 0.13, 0.2, 0]}>
          <boxGeometry args={[0.08, 0.36, 0.28]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}

      {/* Books on middle shelf */}
      {bookColors.slice(1, 4).map((color, i) => (
        <mesh key={i} position={[-0.15 + i * 0.15, 0.64, 0]}>
          <boxGeometry args={[0.1, 0.34, 0.26]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}

      {/* Small item on top shelf */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.2, 0.16, 0.15]} />
        <meshStandardMaterial color="#1a202c" roughness={0.6} />
      </mesh>
    </group>
  );
};
