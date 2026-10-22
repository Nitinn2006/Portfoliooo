import * as THREE from 'three';

/**
 * Creates a procedural dark herringbone wood floor texture using an HTML5 Canvas.
 * Generates parquet-style angled dark wood slats with subtle tonal variations.
 */
export function createHerringboneFloorTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // Base dark stain
  ctx.fillStyle = '#11141c';
  ctx.fillRect(0, 0, size, size);

  const slatW = 32;
  const slatH = 128;
  const tones = ['#161a24', '#13161f', '#191d29', '#11141c', '#1e2230', '#151822'];

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#0a0c12';

  // Draw herringbone zig-zag slats
  for (let y = -slatH; y < size + slatH; y += slatW * 2) {
    for (let x = -slatH; x < size + slatH; x += slatH) {
      // Left slant
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = tones[Math.abs(Math.floor((x * 13 + y * 7) % tones.length))];
      ctx.fillRect(0, 0, slatH, slatW);
      ctx.strokeRect(0, 0, slatH, slatW);
      ctx.restore();

      // Right slant
      ctx.save();
      ctx.translate(x + slatH / Math.SQRT2, y);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = tones[Math.abs(Math.floor((x * 17 + y * 11) % tones.length))];
      ctx.fillRect(0, 0, slatH, slatW);
      ctx.strokeRect(0, 0, slatH, slatW);
      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}
