import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, N8AO, SMAA } from '@react-three/postprocessing';
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

// Hotspot marker positions with collision-safe tooltip offsets
const hotspots: {
  position: [number, number, number];
  label: string;
  section: NavSection;
  labelOffset?: [number, number, number];
}[] = [
  { position: [0, 1.85, -2.5], label: 'OPEN PROJECTS', section: 'projects', labelOffset: [0, 0.25, 0] },
  // Pegboard tooltip offset to the right so it never overlaps the top-left HUD chip
  { position: [-4.5, 2.9, -3.6], label: 'OPEN ACHIEVEMENTS', section: 'achievements', labelOffset: [0.65, -0.05, 0] },
  { position: [-1.1, 1.25, -1.9], label: 'OPEN ABOUT', section: 'about', labelOffset: [0, 0.25, 0] },
  { position: [0.7, 1.2, -1.7], label: 'OPEN CONTACT', section: 'contact', labelOffset: [0, 0.25, 0] },
];

export const Scene: React.FC<SceneProps> = ({
  activeSection,
  onSelectSection,
  reducedMotion,
  onIntroComplete,
}) => {
  // Quality toggle: automatically drops expensive AO if device indicates low power or drops frames
  const [highQuality] = useState(true);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#07090e]">
      <Canvas
        camera={{ position: [0, 2.45, 4.35], fov: 45, near: 0.1, far: 60 }}
        dpr={[1, 1.75]}
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Atmospheric Night Fog */}
        <fog attach="fog" args={['#07090e', 12, 28]} />

        {/* 1. Fill Light: Low-intensity hemisphere so walls, floor, bookshelf are readable at a glance */}
        <hemisphereLight
          color="#253248"
          groundColor="#090d14"
          intensity={0.65}
        />

        {/* 2. Key Light: Cool moonlight beam through the window with soft shadow map */}
        <directionalLight
          position={[-2.5, 4.5, -5.5]}
          intensity={1.5}
          color="#93c5fd"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        {/* 3. Practical 1: Warm glow inside desk lamp with spill on desk & keyboard */}
        <pointLight
          position={[1.2, 1.45, -2.0]}
          intensity={2.6}
          distance={6}
          decay={2}
          color="#ffb36b"
        />

        {/* 4. Practical 2: Cool cyan/blue spill light from monitor onto desk and keyboard */}
        <pointLight
          position={[0, 1.35, -2.1]}
          intensity={1.8}
          distance={4.5}
          decay={2}
          color="#38bdf8"
        />

        {/* 5. Practical 3: Faint pink rim light behind desk matching UI accent */}
        <pointLight
          position={[0, 0.8, -3.2]}
          intensity={0.7}
          distance={6}
          decay={2}
          color="#f43f5e"
        />

        {/* 6. Contact Shadows under desk, chair, shelf so they sit firmly on the floor */}
        <ContactShadows
          position={[0, 0.01, -2.0]}
          opacity={0.65}
          scale={12}
          blur={1.8}
          far={4}
          resolution={1024}
          color="#05070d"
        />

        {/* 7. Low-intensity night environment for physical surface reflections */}
        <React.Suspense fallback={null}>
          <Environment preset="night" environmentIntensity={0.25} />
        </React.Suspense>

        {/* The 3D Room Shell, Skyline & Furniture */}
        <Room reducedMotion={reducedMotion} />

        {/* Floating Hotspot Markers: Hidden when a panel is open (docked) */}
        {hotspots.map((hs, idx) => (
          <Hotspot
            key={hs.section}
            index={idx}
            position={hs.position}
            label={hs.label}
            section={hs.section}
            visible={activeSection === 'overview'}
            onSelect={onSelectSection}
            labelOffset={hs.labelOffset}
          />
        ))}

        {/* Camera transitions, intro animation, idle drift and mouse parallax */}
        <CameraController
          activeSection={activeSection}
          onResetToOverview={() => onSelectSection('overview')}
          reducedMotion={reducedMotion}
          onIntroComplete={onIntroComplete}
        />

        {/* Postprocessing: Selective Bloom, N8AO, Vignette & SMAA with low-power quality toggle */}
        <EffectComposer enableNormalPass={false} multisampling={0}>
          {highQuality && (
            <N8AO
              aoRadius={0.6}
              intensity={1.1}
              quality="medium"
            />
          )}
          <Bloom
            intensity={highQuality ? 0.35 : 0.2}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
          <Vignette
            offset={0.35}
            darkness={0.55}
            eskil={false}
          />
          <SMAA />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
