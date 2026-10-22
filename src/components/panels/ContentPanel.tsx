import React, { useEffect, useState } from 'react';
import { NavSection } from '../HUD';
import { ProjectsSection } from '../sections/ProjectsSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';

interface ContentPanelProps {
  activeSection: NavSection;
  onClose: () => void;
}

/** Delay (ms) after camera starts flying before the panel fades in. */
const PANEL_DELAY = 900;

const sectionComponent: Record<string, React.FC<{ variant: 'modal' }>> = {
  projects: ProjectsSection,
  achievements: AchievementsSection,
  about: AboutSection,
  contact: ContactSection,
};

/**
 * Glassmorphic HTML overlay that slides in after the camera arrives at a target.
 * Reuses the same section components from the 2D semantic page (variant="modal").
 */
export const ContentPanel: React.FC<ContentPanelProps> = ({ activeSection, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  // Show panel after camera flight delay; hide immediately on section change
  useEffect(() => {
    if (activeSection === 'overview') {
      setVisible(false);
      // Allow exit animation before unmounting
      const t = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(t);
    }

    // Mount the panel DOM immediately, but delay the visible class for CSS transition
    setRendered(true);
    setVisible(false);
    const t = setTimeout(() => setVisible(true), PANEL_DELAY);
    return () => clearTimeout(t);
  }, [activeSection]);

  if (!rendered || activeSection === 'overview') return null;

  const SectionContent = sectionComponent[activeSection];
  if (!SectionContent) return null;

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-end pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Click-away backdrop (subtle darken) */}
      <div
        className={`absolute inset-0 bg-black/20 pointer-events-auto transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label={`${activeSection} details`}
        className={`pointer-events-auto relative w-full max-w-xl lg:max-w-2xl h-[85vh] mr-4 sm:mr-6 lg:mr-10 rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
          visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xl border border-white/10 rounded-2xl" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel and return to overview"
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-mono tracking-wider text-slate-300 hover:text-white hover:border-rose-500/40 transition-all backdrop-blur-sm"
        >
          <span>CLOSE</span>
          <kbd className="text-[10px] text-slate-500 border border-white/10 rounded px-1">ESC</kbd>
        </button>

        {/* Scrollable content area */}
        <div className="relative z-[1] h-full overflow-y-auto p-6 sm:p-8 pt-14">
          <SectionContent variant="modal" />
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none rounded-b-2xl z-[2]" />
      </div>
    </div>
  );
};
