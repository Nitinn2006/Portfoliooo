import * as THREE from 'three';
import { content } from '../content';

/**
 * Creates a procedural 512x512 canvas texture for the main monitor screen.
 * Displays a realistic dark data-science IDE / analytics dashboard.
 */
export function createMonitorScreenTexture(): THREE.CanvasTexture {
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

  // 1. Dark IDE background
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, size, size);

  // 2. Window title bar
  ctx.fillStyle = '#141824';
  ctx.fillRect(0, 0, size, 36);

  // Window control dots
  const dots = ['#ef4444', '#f59e0b', '#10b981'];
  dots.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(20 + i * 16, 18, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Title text
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('nitin-kashyap — data-analytics — vscode', 78, 22);

  // 3. Tab bar
  ctx.fillStyle = '#0f131d';
  ctx.fillRect(0, 36, size, 30);
  ctx.fillStyle = '#1e2436';
  ctx.fillRect(0, 36, 170, 30);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(0, 64, 170, 2); // active tab indicator
  ctx.fillStyle = '#ffffff';
  ctx.font = '11px monospace';
  ctx.fillText('⚡ netflix_eda.py', 16, 55);

  ctx.fillStyle = '#64748b';
  ctx.fillText('safar_adas.py', 185, 55);

  // 4. Code lines with syntax highlighting
  const codeLines: { text: string; color: string; indent?: number }[] = [
    { text: 'import pandas as pd', color: '#f43f5e' },
    { text: 'import matplotlib.pyplot as plt', color: '#f43f5e' },
    { text: 'from sklearn.model_selection import train_test_split', color: '#38bdf8' },
    { text: '', color: '#ffffff' },
    { text: '# Load Nitin Kashyap Portfolio Dataset', color: '#64748b' },
    { text: 'df = pd.read_csv("netflix_titles.csv")', color: '#e2e8f0' },
    { text: 'df_clean = df.dropna(subset=["date_added"])', color: '#e2e8f0' },
    { text: 'movies = df[df["type"] == "Movie"] # ~70% catalog', color: '#34d399' },
    { text: 'top_country = df["country"].mode()[0] # US 46%', color: '#fbbf24' },
    { text: 'print("✓ Dataset cleaned: 8,800+ records processed")', color: '#a78bfa' },
  ];

  let lineY = 92;
  codeLines.forEach((line, idx) => {
    // Line number
    ctx.fillStyle = '#334155';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(String(idx + 1), 32, lineY);

    // Code text
    ctx.textAlign = 'left';
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 48, lineY);
    lineY += 20;
  });

  // 5. Mini Analytics Bar Chart Dashboard below code
  ctx.fillStyle = '#111624';
  ctx.fillRect(24, 305, size - 48, 185);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.strokeRect(24, 305, size - 48, 185);

  // Chart title
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('ANALYTICS SUMMARY • CATALOG BY YEAR', 38, 330);

  // Bar chart data
  const bars = [
    { label: '2016', val: 50 },
    { label: '2017', val: 90 },
    { label: '2018', val: 125 },
    { label: '2019', val: 155, highlight: true }, // Peak additions
    { label: '2020', val: 140 },
    { label: '2021', val: 130 },
  ];

  const chartBottom = 460;
  bars.forEach((b, i) => {
    const x = 50 + i * 70;
    const barH = b.val * 0.7;
    const y = chartBottom - barH;

    ctx.fillStyle = b.highlight ? '#f43f5e' : '#38bdf8';
    ctx.fillRect(x, y, 42, barH);

    // Bar top value
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(b.val), x + 21, y - 6);

    // Year label
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(b.label, x + 21, chartBottom + 16);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a procedural 512x512 canvas texture for the open Notebook (About section).
 */
export function createNotebookTexture(): THREE.CanvasTexture {
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

  // Cream/parchment paper background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, size, size);

  // Notebook spine line in center
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(size / 2 - 2, 0, 4, size);

  // Ruled horizontal lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let y = 60; y < size - 20; y += 24) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(size - 20, y);
    ctx.stroke();
  }

  // Pink margin line on left page
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(55, 20);
  ctx.lineTo(55, size - 20);
  ctx.stroke();

  // Left Page Content (About Nitin & Education)
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('NITIN KASHYAP', 68, 52);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('DATA ANALYST • AI/ML', 68, 76);

  ctx.fillStyle = '#334155';
  ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('BCA student at PSIT Kanpur (CSJMU)', 68, 100);
  ctx.fillText('Specialized in Data Analytics & AI/ML', 68, 124);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('CORE COMPETENCIES:', 68, 172);

  const skillsLeft = ['• Python & SQL', '• Pandas, NumPy, Excel', '• Matplotlib & Seaborn', '• Computer Vision (MediaPipe)'];
  skillsLeft.forEach((s, idx) => {
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px monospace';
    ctx.fillText(s, 68, 196 + idx * 24);
  });

  // Right Page Content (Focus & Projects)
  const rightX = size / 2 + 25;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('KEY MILESTONES', rightX, 52);

  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('HACKATHONS & CERTS', rightX, 76);

  const milestones = [
    '• SIH 2026: Team SAFAR (2nd)',
    '• Kaggle: Pandas Certified',
    '• Kaggle: Intro to ML Certified',
    '• Hand Gesture Flower Gen',
    '• Netflix Data Analytics EDA',
  ];
  milestones.forEach((m, idx) => {
    ctx.fillStyle = '#334155';
    ctx.font = '11px monospace';
    ctx.fillText(m, rightX, 108 + idx * 26);
  });

  // Signature at bottom right
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'italic 14px Georgia, serif';
  ctx.fillText('Nitin Kashyap', rightX + 60, 440);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a procedural 512x512 canvas texture for the Phone lock screen (Contact section).
 */
export function createPhoneScreenTexture(): THREE.CanvasTexture {
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

  // Dark phone wallpaper with subtle gradient
  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Status bar
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('21:42', 36, 40);

  ctx.textAlign = 'right';
  ctx.fillText('5G  100%', size - 36, 40);

  // Large Time & Date
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('21:42', size / 2, 130);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('Kanpur, Uttar Pradesh', size / 2, 165);

  // Notification Card: Connect with Nitin
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.fillRect(32, 210, size - 64, 130);
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 210, size - 64, 130);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('EMAIL DIRECT', 52, 240);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(content.contact.email, 52, 270);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px monospace';
  ctx.fillText('github.com/Nitinn2006', 52, 305);

  // Bottom action bar
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(size / 2 - 40, 470, 80, 5); // home bar

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
