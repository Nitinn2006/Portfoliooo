import React from 'react';
import { content } from '../../content';
import { ProjectsSection } from '../sections/ProjectsSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';

interface SemanticPortfolioProps {
  isVisibleInViewport: boolean;
  onSwitchTo3D?: () => void;
}

export const SemanticPortfolio: React.FC<SemanticPortfolioProps> = ({
  isVisibleInViewport,
  onSwitchTo3D,
}) => {
  return (
    <div
      id="semantic-content"
      tabIndex={-1}
      aria-label="Portfolio document view"
      className={`w-full min-h-screen transition-opacity duration-300 ${
        isVisibleInViewport
          ? 'relative z-20 bg-[#080a0f] text-slate-100 overflow-y-auto'
          : 'absolute top-0 left-0 -z-10 opacity-0 pointer-events-none'
      }`}
    >
      {/* 2D Header & Nav */}
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {content.header.name}
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              {content.header.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <nav aria-label="Page sections" className="flex items-center gap-1 sm:gap-2">
              {content.navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {onSwitchTo3D && (
              <button
                type="button"
                onClick={onSwitchTo3D}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rose-500/40 bg-rose-950/30 text-rose-300 text-xs font-mono hover:bg-rose-900/40 transition-colors"
              >
                <span>3D Room</span>
                <span className="text-[10px]">↗</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Semantic Main Content */}
      <main className="space-y-8 divide-y divide-white/5 pb-20">
        <ProjectsSection variant="page" />
        <AchievementsSection variant="page" />
        <AboutSection variant="page" />
        <ContactSection variant="page" />
      </main>

      {/* Semantic Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto px-4">
          <p>
            {content.header.name} — {content.header.subtitle}
          </p>
          <p className="mt-2 text-slate-400">
            Semantic crawlable document layer • Single source of truth in content.ts
          </p>
        </div>
      </footer>
    </div>
  );
};
