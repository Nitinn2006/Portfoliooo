import * as THREE from 'three';
import { AchievementItem } from '../content';

/**
 * Procedurally generates a crisp 512x512 CanvasTexture for an achievement certificate.
 * Uses exact power-of-two dimensions (512x512) and LinearFilter to prevent WebGL mipmap errors.
 */
export function createCertificateTexture(
  item: AchievementItem,
  headerColor: string,
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.generateMipmaps = false;
    fallback.minFilter = THREE.LinearFilter;
    return fallback;
  }

  // 1. Parchment paper background
  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, size, size);

  // Subtle paper vignette
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    80,
    size / 2,
    size / 2,
    300
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  grad.addColorStop(1, 'rgba(226, 218, 204, 0.4)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // 2. Double border (Gold + Navy)
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#ca8a04'; // Gold
  ctx.strokeRect(16, 16, size - 32, size - 32);

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#0f172a'; // Navy fine line
  ctx.strokeRect(23, 23, size - 46, size - 46);

  // Corner decorative accents
  const corners = [
    [28, 28],
    [size - 28, 28],
    [28, size - 28],
    [size - 28, size - 28],
  ];
  ctx.fillStyle = '#ca8a04';
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Colored Header Banner
  ctx.fillStyle = headerColor;
  ctx.fillRect(25, 25, size - 50, 68);

  // Gold separator line
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#ca8a04';
  ctx.beginPath();
  ctx.moveTo(25, 93);
  ctx.lineTo(size - 25, 93);
  ctx.stroke();

  // Header Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE OF ACHIEVEMENT', size / 2, 56);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('• OFFICIAL RECORD •', size / 2, 78);

  // 4. Achievement Title
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';

  // Measure and wrap title text
  const words = item.title.split(' ');
  let line = '';
  const lines: string[] = [];
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, sans-serif';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > size - 80 && n > 0) {
      lines.push(line.trim());
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  let startY = 160;
  lines.forEach((l, i) => {
    ctx.fillText(l, size / 2, startY + i * 32);
  });

  // 5. Divider flourish
  const divY = startY + lines.length * 32 + 15;
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(size / 2 - 80, divY);
  ctx.lineTo(size / 2 + 80, divY);
  ctx.stroke();

  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.arc(size / 2, divY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 6. Issuer / Event details
  ctx.fillStyle = '#1e293b';
  ctx.font = '600 18px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(item.issuerOrEvent, size / 2, divY + 40);

  // 7. Date / Detail
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 13px monospace';
  ctx.fillText(item.dateOrDetail, size / 2, divY + 70);

  // 8. Gold Seal (bottom right)
  const sealX = size - 75;
  const sealY = size - 75;
  const sealRadius = 32;

  // Starburst teeth
  ctx.fillStyle = '#b45309';
  const teeth = 20;
  ctx.beginPath();
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? sealRadius + 3 : sealRadius - 2;
    const a = (i * Math.PI) / teeth;
    const x = sealX + r * Math.cos(a);
    const y = sealY + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  // Inner gold circle
  const sealGrad = ctx.createRadialGradient(
    sealX - 6,
    sealY - 6,
    4,
    sealX,
    sealY,
    sealRadius
  );
  sealGrad.addColorStop(0, '#fef08a');
  sealGrad.addColorStop(0.5, '#eab308');
  sealGrad.addColorStop(1, '#a16207');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius - 2, 0, Math.PI * 2);
  ctx.fill();

  // Seal inner ring
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Seal Star
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('★', sealX, sealY + 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
