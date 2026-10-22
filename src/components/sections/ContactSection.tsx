import React from 'react';
import { content } from '../../content';

interface ContactSectionProps {
  variant?: 'page' | 'modal';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ variant = 'page' }) => {
  const isModal = variant === 'modal';
  const hasLinkedIn = Boolean(content.contact.linkedinUrl && content.contact.linkedinUrl.trim() !== '');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={isModal ? 'space-y-6' : 'py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6'}
    >
      <header className={isModal ? 'border-b border-white/10 pb-4' : 'mb-10'}>
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs tracking-widest uppercase mb-1">
          <span>04</span>
          <span className="w-8 h-px bg-rose-500/40" />
          <span>Connect</span>
        </div>
        <h2
          id="contact-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
        >
          {content.contact.sectionTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          {content.contact.sectionSubtitle}
        </p>
      </header>

      <div
        className={`rounded-2xl border p-6 sm:p-8 ${
          isModal
            ? 'bg-slate-900/60 border-white/10'
            : 'bg-slate-900/40 border-white/10 shadow-lg shadow-black/20'
        }`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email Direct */}
          <div className="flex flex-col justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                Email
              </span>
              <div className="mt-1 text-sm font-mono text-white break-all">
                {content.contact.email}
              </div>
            </div>
            <a
              href={`mailto:${content.contact.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
            >
              <span>Send Message</span>
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* GitHub Profile */}
          <div className="flex flex-col justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                GitHub
              </span>
              <div className="mt-1 text-sm font-mono text-white">
                github.com/Nitinn2006
              </div>
            </div>
            <a
              href={content.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
            >
              <span>View Repositories</span>
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

          {/* LinkedIn Button - ONLY rendered if non-empty, NO '#' links anywhere */}
          {hasLinkedIn && (
            <div className="flex flex-col justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                  LinkedIn
                </span>
                <div className="mt-1 text-sm font-mono text-white">
                  Professional Profile
                </div>
              </div>
              <a
                href={content.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
              >
                <span>Connect</span>
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
          )}

          {/* CV Download Card */}
          <div className="flex flex-col justify-between p-4 rounded-xl border border-rose-500/20 bg-rose-950/20 sm:col-span-2 lg:col-span-1">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-rose-300">
                Curriculum Vitae
              </span>
              <div className="mt-1 text-sm font-semibold text-white">
                Nitin_Kashyap_CV.pdf
              </div>
            </div>
            <a
              href={content.contact.cvPath}
              download
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-xs font-mono font-semibold text-white transition-all hover:bg-rose-600 shadow-md shadow-rose-950/50"
            >
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>{content.contact.cvButtonLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
