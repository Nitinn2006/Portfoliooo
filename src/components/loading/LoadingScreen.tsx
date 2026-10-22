import React from 'react';
import { content } from '../../content';

interface LoadingScreenProps {
  /** 0-1 progress value */
  progress: number;
  /** True once the intro camera animation has finished and the screen should fade out */
  done: boolean;
}

/**
 * Full-screen loading overlay shown while the 3D scene initializes.
 * Fades out when `done` is true.
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, done }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] transition-opacity duration-700 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={done}
    >
      {/* Name */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
        {content.header.name}
      </h1>
      <p className="font-mono text-xs tracking-widest text-slate-400 flex items-center gap-2 mb-10">
        <span>{content.header.role}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
        <span>AI/ML</span>
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
        <span>{content.header.location}</span>
      </p>

      {/* Progress bar */}
      <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-rose-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>

      <p className="mt-3 text-[11px] font-mono tracking-widest text-slate-500">
        {progress < 1 ? 'LOADING ROOM' : 'ENTERING'}
      </p>
    </div>
  );
};
