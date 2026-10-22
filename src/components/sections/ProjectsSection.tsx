import React from 'react';
import { content } from '../../content';

interface ProjectsSectionProps {
  variant?: 'page' | 'modal';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ variant = 'page' }) => {
  const isModal = variant === 'modal';

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={isModal ? 'space-y-6' : 'py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6'}
    >
      <header className={isModal ? 'border-b border-white/10 pb-4' : 'mb-10'}>
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs tracking-widest uppercase mb-1">
          <span>01</span>
          <span className="w-8 h-px bg-rose-500/40" />
          <span>Portfolio</span>
        </div>
        <h2
          id="projects-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
        >
          {content.projects.sectionTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          {content.projects.sectionSubtitle}
        </p>
      </header>

      <div className={`grid gap-6 ${isModal ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {content.projects.items.map((project) => (
          <article
            key={project.id}
            className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 p-6 ${
              project.isLead && !isModal ? 'md:col-span-2' : ''
            } ${
              isModal
                ? 'bg-slate-900/60 border-white/10 hover:border-rose-500/30'
                : 'bg-slate-900/40 border-white/10 hover:border-rose-500/40 hover:bg-slate-900/60 shadow-lg shadow-black/20'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 shrink-0">
                    {project.status}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-slate-300 mb-6">
                {project.summary}
              </p>

              {/* Big Stat Callouts for Lead Card */}
              {project.statCallouts && (
                <div className="grid grid-cols-3 gap-3 my-4 p-4 rounded-xl border border-rose-500/20 bg-rose-950/20">
                  {project.statCallouts.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xl sm:text-2xl font-mono font-extrabold text-rose-400">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub Link */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors focus:outline-none focus-visible:underline"
                aria-label={`View ${project.title} on GitHub`}
              >
                <span>GitHub</span>
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
