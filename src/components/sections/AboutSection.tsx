import React from 'react';
import { content } from '../../content';

interface AboutSectionProps {
  variant?: 'page' | 'modal';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ variant = 'page' }) => {
  const isModal = variant === 'modal';

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={isModal ? 'space-y-6' : 'py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6'}
    >
      <header className={isModal ? 'border-b border-white/10 pb-4' : 'mb-10'}>
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs tracking-widest uppercase mb-1">
          <span>03</span>
          <span className="w-8 h-px bg-rose-500/40" />
          <span>Profile</span>
        </div>
        <h2
          id="about-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
        >
          {content.about.sectionTitle}
        </h2>
      </header>

      <div className={`grid gap-8 ${isModal ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Bio & Education Card */}
        <div
          className={`rounded-2xl border p-6 ${
            isModal
              ? 'bg-slate-900/60 border-white/10'
              : 'lg:col-span-1 bg-slate-900/40 border-white/10 shadow-lg shadow-black/20'
          }`}
        >
          <h3 className="text-sm font-mono tracking-wider uppercase text-rose-400 mb-3">
            Background & Focus
          </h3>
          <div className="space-y-3 text-slate-300 text-sm leading-relaxed mb-6">
            {content.about.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono tracking-wider uppercase text-slate-400 mb-2">
              Education
            </h4>
            <div className="text-sm font-semibold text-white">
              {content.about.education.degree}
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              {content.about.education.institution}
            </div>
            <div className="text-xs text-rose-400/90 font-mono mt-1">
              Focus: {content.about.education.focus}
            </div>
          </div>
        </div>

        {/* Grouped Skills */}
        <div
          className={`space-y-4 ${
            isModal ? '' : 'lg:col-span-2'
          }`}
        >
          <h3 className="text-sm font-mono tracking-wider uppercase text-rose-400 mb-2">
            Technical Stack & Competencies
          </h3>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {content.about.skillGroups.map((group) => (
              <div
                key={group.category}
                className={`rounded-xl border p-4 ${
                  isModal
                    ? 'bg-slate-900/60 border-white/10'
                    : 'bg-slate-900/40 border-white/10'
                }`}
              >
                <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200 mb-2.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
