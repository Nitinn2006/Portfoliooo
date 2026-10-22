import React from 'react';
import { content } from '../../content';

interface AchievementsSectionProps {
  variant?: 'page' | 'modal';
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  variant = 'page',
}) => {
  const isModal = variant === 'modal';

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className={isModal ? 'space-y-6' : 'py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6'}
    >
      <header className={isModal ? 'border-b border-white/10 pb-4' : 'mb-10'}>
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs tracking-widest uppercase mb-1">
          <span>02</span>
          <span className="w-8 h-px bg-rose-500/40" />
          <span>Milestones</span>
        </div>
        <h2
          id="achievements-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
        >
          {content.achievements.sectionTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          {content.achievements.sectionSubtitle}
        </p>
      </header>

      <div
        className={`grid gap-4 sm:gap-6 ${
          isModal ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {content.achievements.items.map((item) => (
          <article
            key={item.id}
            className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
              isModal
                ? 'bg-slate-900/60 border-white/10 hover:border-rose-500/30'
                : 'bg-slate-900/40 border-white/10 hover:border-amber-500/40 hover:bg-slate-900/60 shadow-lg shadow-black/20'
            }`}
          >
            {/* Hanging badge visual motif */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </span>
              <span className="text-[11px] font-mono tracking-wider text-slate-400">
                {item.dateOrDetail}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              {item.issuerOrEvent}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
