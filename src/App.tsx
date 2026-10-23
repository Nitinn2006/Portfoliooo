import React, { useEffect, useState } from 'react';
import { HUD, NavSection } from './components/HUD';
import { Scene } from './components/Scene';
import { ContentPanel } from './components/panels/ContentPanel';
import { SemanticPortfolio } from './components/semantic/SemanticPortfolio';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  // Initialize viewMode accurately at startup: mobile (<768px) starts in 2D, desktop in 3D
  const [viewMode, setViewMode] = useState<'3d' | '2d'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? '2d' : '3d';
    }
    return '3d';
  });
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

  // Window resize check
  useEffect(() => {
    const checkViewport = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && viewMode !== '2d') {
        setViewMode('2d');
        setIntroDone(true);
      }
    };

    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [viewMode]);

  // Sync body scroll capability: 3D mode locks viewport to 100vh, 2D mode allows smooth natural scrolling
  useEffect(() => {
    if (viewMode === '3d') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [viewMode]);

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
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07090e] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Initial Loading Screen with smooth fade out */}
      <LoadingScreen
        progress={loadingProgress}
        done={introDone || viewMode === '2d'}
      />

      {/* 3D Scene Layer with silky cross-fade (stays mounted to prevent WebGL context loss) */}
      <div
        className={`fixed inset-0 transition-opacity duration-500 ease-in-out ${
          viewMode === '3d'
            ? 'opacity-100 z-10 pointer-events-auto'
            : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
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
      </div>

      {/* Semantic 2D HTML Content Layer with smooth opacity cross-fade */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          viewMode === '2d'
            ? 'relative z-20 opacity-100 pointer-events-auto min-h-screen'
            : 'fixed top-0 left-0 w-full h-0 max-h-0 overflow-hidden opacity-0 pointer-events-none -z-50'
        }`}
      >
        <SemanticPortfolio
          isVisibleInViewport={viewMode === '2d'}
          onSwitchTo3D={() => handleToggleViewMode()}
        />
      </div>
    </div>
  );
};

export default App;
