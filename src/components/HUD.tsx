import React from 'react';
import { content } from '../content';

export type NavSection = 'overview' | 'projects' | 'achievements' | 'about' | 'contact';

interface HUDProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  viewMode: '3d' | '2d';
  onToggleViewMode: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  activeSection,
  onSelectSection,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <header className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none">
      {/* Top Bar: Status Badge & Action Controls */}
      <div className="flex items-start justify-between w-full">
        {/* Top-left: Minimal status badge */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[11px] font-mono tracking-wider text-slate-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span>{content.hud.statusBadge}</span>
        </div>

        {/* Top-right: 2D/3D Mode Switcher, Audio toggle & Overview reset */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* 2D / 3D Mode Switcher */}
          <button
            type="button"
            onClick={onToggleViewMode}
            aria-label={viewMode === '3d' ? 'Switch to 2D accessible page' : 'Switch to 3D room'}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs font-mono tracking-wider text-slate-300 hover:text-white hover:border-white/20 backdrop-blur-md transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>{viewMode === '3d' ? '2D VIEW' : '3D ROOM'}</span>
          </button>

          {/* Sound Toggle (Placeholder as requested) */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            aria-label="Audio mute toggle"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/5 bg-slate-950/60 px-3 py-1.5 text-[11px] font-mono tracking-wider text-slate-500 cursor-not-allowed backdrop-blur-md transition-all opacity-60"
            title="Audio disabled in Phase 1"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
            <span>{content.hud.soundLabel}</span>
          </button>

          {/* Back to Overview button */}
          <button
            type="button"
            onClick={() => onSelectSection('overview')}
            aria-label="Return camera to overview"
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono tracking-wider backdrop-blur-md transition-all duration-200 ${
              activeSection === 'overview'
                ? 'border-white/10 bg-slate-900/60 text-slate-400'
                : 'border-rose-500/40 bg-slate-950/80 text-rose-300 hover:border-rose-400 hover:text-white shadow-[0_0_15px_rgba(244,63,94,0.25)]'
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>{content.hud.overviewLabel}</span>
          </button>
        </div>
      </div>

      {/* Bottom Area: Info (Left) and Nav Pill (Center) */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between gap-4 w-full">
        {/* Bottom-left: Name & Subtitle */}
        <div className="pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            {content.header.name}
          </h1>
          <p className="mt-1 flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400">
            <span>{content.header.role}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            <span>AI/ML</span>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            <span>{content.header.location}</span>
          </p>
        </div>

        {/* Bottom-center: Navigation Pill */}
        <nav
          aria-label="Scene navigation"
          className="pointer-events-auto md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/15 bg-slate-950/85 p-1.5 sm:p-2 backdrop-blur-xl shadow-2xl shadow-black/80"
        >
          {content.navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                aria-pressed={isActive}
                className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                  isActive
                    ? 'bg-rose-500 text-white font-semibold shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-white/80' : 'text-slate-500 group-hover:text-rose-400'
                  }`}
                >
                  {item.number}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom-right spacer to maintain balance on wide screens */}
        <div className="hidden md:block w-32" aria-hidden="true" />
      </div>
    </header>
  );
};
