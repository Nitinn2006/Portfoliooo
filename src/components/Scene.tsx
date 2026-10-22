import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Room } from './scene/Room';
import { CameraController } from './scene/CameraController';
import { Hotspot } from './scene/Hotspot';
import { NavSection } from './HUD';

interface SceneProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  reducedMotion: boolean;
  onIntroComplete: () => void;
}

// Hotspot marker positions (floating above each interactive object)
const hotspots: { position: [number, number, number]; label: string; section: NavSection }[] = [
  { position: [0, 1.85, -2.5], label: 'OPEN PROJECTS', section: 'projects' },
  { position: [-4.5, 3.2, -3.6], label: 'OPEN ACHIEVEMENTS', section: 'achievements' },
  { position: [-1.1, 1.25, -1.9], label: 'OPEN ABOUT', section: 'about' },
  { position: [0.7, 1.2, -1.7], label: 'OPEN CONTACT', section: 'contact' },
];

export const Scene: React.FC<SceneProps> = ({
  activeSection,
  onSelectSection,
  reducedMotion,
  onIntroComplete,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#07090e]">
      <Canvas
        camera={{ position: [0, 3.0, 5.8], fov: 45, near: 0.1, far: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Ambient Dark Navy Fill */}
        <ambientLight intensity={0.6} color="#0d121d" />

        {/* Cool Window Moonlight / Skyline Light */}
        <directionalLight
          position={[0, 4.5, -6]}
          intensity={0.9}
          color="#93c5fd"
        />

        {/* Warm Amber Room / Desk Point Light */}
        <pointLight
          position={[1.2, 2.0, -0.5]}
          intensity={2.6}
          distance={9}
          decay={2}
          color="#f59e0b"
        />

        {/* Subtle Pink / Magenta Accent Light */}
        <pointLight
          position={[-1.2, 0.9, -1.0]}
          intensity={0.9}
          distance={6}
          decay={2}
          color="#f43f5e"
        />

        {/* The 3D Room Shell, Skyline & Furniture */}
        <Room reducedMotion={reducedMotion} />

        {/* Floating Hotspot Markers: Hidden when a panel is open (docked) */}
        {hotspots.map((hs) => (
          <Hotspot
            key={hs.section}
            position={hs.position}
            label={hs.label}
            section={hs.section}
            visible={activeSection === 'overview'}
            onSelect={onSelectSection}
          />
        ))}

        {/* Camera transitions, intro animation, idle drift and mouse parallax */}
        <CameraController
          activeSection={activeSection}
          onResetToOverview={() => onSelectSection('overview')}
          reducedMotion={reducedMotion}
          onIntroComplete={onIntroComplete}
        />

        {/* Postprocessing: Subtle Bloom */}
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.82}
            luminanceSmoothing={0.25}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
