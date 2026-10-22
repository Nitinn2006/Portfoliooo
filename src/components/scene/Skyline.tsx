import React, { useMemo } from 'react';

interface BuildingData {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  litWindows: {
    x: number;
    y: number;
    z: number;
    color: string;
  }[];
}

export const Skyline: React.FC = () => {
  // Generate deterministic low-poly skyline building towers behind the window
  const buildings = useMemo<BuildingData[]>(() => {
    const list: BuildingData[] = [];
    const colors = ['#fde047', '#fed7aa', '#93c5fd', '#fbcfe8', '#ffffff'];

    // 16 building silhouettes in layers
    for (let i = 0; i < 18; i++) {
      const x = -9 + (i * 1.1) + ((i % 3) * 0.2);
      const z = -6.5 - ((i % 4) * 0.9);
      const width = 0.8 + ((i * 7) % 5) * 0.15;
      const depth = 0.8 + ((i * 3) % 4) * 0.15;
      const height = 2.2 + ((i * 11) % 9) * 0.45;

      const litWindows: BuildingData['litWindows'] = [];
      const floors = Math.floor(height / 0.35);
      const cols = Math.floor(width / 0.25);

      for (let f = 1; f < floors - 1; f++) {
        for (let c = 0; c < cols; c++) {
          // Randomly lit window check
          if ((i * 31 + f * 17 + c * 7) % 5 === 0) {
            litWindows.push({
              x: (c - cols / 2 + 0.5) * 0.22,
              y: f * 0.32 - height / 2,
              z: depth / 2 + 0.01,
              color: colors[(i + f + c) % colors.length],
            });
          }
        }
      }

      list.push({ x, z, width, depth, height, litWindows });
    }
    return list;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Night Sky Backdrop */}
      <mesh position={[0, 3, -11]}>
        <planeGeometry args={[30, 16]} />
        <meshBasicMaterial color="#05070e" />
      </mesh>

      {/* Distant soft moon / atmospheric glow */}
      <mesh position={[-4, 5.5, -10.5]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
      </mesh>
      <mesh position={[-4, 5.5, -10.4]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>

      {/* Buildings */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.height / 2 - 0.5, b.z]}>
          {/* Main Tower Box */}
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color="#0b0e17"
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>

          {/* Roof Spire on selected buildings */}
          {idx % 4 === 1 && (
            <mesh position={[0, b.height / 2 + 0.4, 0]}>
              <cylinderGeometry args={[0.02, 0.08, 0.8, 8]} />
              <meshStandardMaterial color="#1a202c" />
            </mesh>
          )}

          {/* Lit Windows */}
          {b.litWindows.map((w, wIdx) => (
            <mesh key={wIdx} position={[w.x, w.y, w.z]}>
              <planeGeometry args={[0.1, 0.12]} />
              <meshBasicMaterial color={w.color} toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
