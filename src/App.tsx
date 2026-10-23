import React, { useEffect, useState } from 'react';
import { HUD, NavSection } from './components/HUD';
import { Scene } from './components/Scene';
import { ContentPanel } from './components/panels/ContentPanel';
import { SemanticPortfolio } from './components/semantic/SemanticPortfolio';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
// import { useFpsFallback } from './hooks/useFpsFallback';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [loadingProgress, setLoadingProgress] = useState(0.2);
  const [introDone, setIntroDone] = useState(false);

  const reducedMotion = usePrefersReducedMotion();

  // Progress simulation for loading screen
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingProgress(0.6), 200);
    const timer2 = setTimeout(() => setLoadingProgress(1.0), 600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Detect mobile viewports (< 768px) and default to 2D view for performance and readability
  useEffect(() => {
    const checkViewport = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setViewMode('2d');
        setIntroDone(true);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Sync URL hash with active section and support browser Back/Forward & direct links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const validSections: NavSection[] = ['projects', 'achievements', 'about', 'contact'];
      if (validSections.includes(hash as NavSection)) {
        setActiveSection(hash as NavSection);
      } else {
        setActiveSection('overview');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // ponytail: FPS fallback disabled — shader compilation on heavier post-processing
  // pipeline (N8AO, reflections, shadows, Environment HDRI) causes false positives
  // during GPU warmup. Re-enable with longer warmup if needed on truly low-end devices.
  // useFpsFallback({
  //   enabled: viewMode === '3d' && introDone,
  //   minFps: 20,
  //   sampleFrames: 90,
  //   onLowFps: () => {
  //     setViewMode('2d');
  //   },
  // });

  const handleSelectSection = (section: NavSection) => {
    setActiveSection(section);

    // Sync URL hash with plain token only
    if (section === 'overview') {
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      if (window.location.hash !== `#${section}`) {
        window.location.hash = section;
      }
    }

    if (viewMode === '2d') {
      if (section === 'overview') {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      } else {
        const targetElement = document.getElementById(section);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }
    }
  };

  const handleToggleViewMode = () => {
    const nextMode = viewMode === '3d' ? '2d' : '3d';
    setViewMode(nextMode);
    if (nextMode === '3d') {
      setActiveSection('overview');
    }
    if (nextMode === '2d') {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div
      className={`w-full bg-[#07090e] text-slate-100 selection:bg-rose-500 selection:text-white ${
        viewMode === '3d'
          ? 'fixed inset-0 h-screen overflow-hidden'
          : 'relative min-h-screen overflow-y-auto'
      }`}
    >
      {/* Initial Loading Screen */}
      <LoadingScreen
        progress={loadingProgress}
        done={introDone}
      />

      {/* 3D Scene Layer (active in 3D mode) */}
      {viewMode === '3d' && (
        <>
          <Scene
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            reducedMotion={reducedMotion}
            onIntroComplete={() => setIntroDone(true)}
          />

          {/* Glassmorphic content panels over the 3D scene */}
          <ContentPanel
            activeSection={activeSection}
            onClose={() => handleSelectSection('overview')}
          />

          <HUD
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            viewMode={viewMode}
            onToggleViewMode={handleToggleViewMode}
          />
        </>
      )}

      {/* Semantic 2D HTML Content Layer: Always preserved in DOM, never display:none */}
      <SemanticPortfolio
        isVisibleInViewport={viewMode === '2d'}
        onSwitchTo3D={() => setViewMode('3d')}
      />
    </div>
  );
};

export default App;
