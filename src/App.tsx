import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothScroll, resetSmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { ParticleField } from './components/ParticleField';
import { Navigation, type PageId } from './components/Navigation';
import { PagePlaceholder } from './components/PagePlaceholder';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ShortcutsModal } from './components/ShortcutsModal';
import { MascotCompanion } from './components/MascotCompanion';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingScreen } from './components/LoadingScreen';

// Lazy-loaded pages for code-splitting, instant initial paint, and lightweight runtime DOM
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const validPages: PageId[] = ['home', 'projects', 'skills', 'journey', 'contact'];

const getPageFromHash = (): PageId => {
  const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
};

function MainApp() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [transitionState, setTransitionState] = useState<{
    isTransitioning: boolean;
    targetPage: PageId | null;
  }>({
    isTransitioning: false,
    targetPage: null,
  });

  const triggerPageTransition = (newPage: PageId) => {
    if (newPage === activePage) {
      resetSmoothScroll();
      return;
    }
    setTransitionState({
      isTransitioning: true,
      targetPage: newPage,
    });
  };

  // Sync state with browser hash navigation (back/forward history and direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      if (newPage !== activePage) {
        triggerPageTransition(newPage);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePage]);

  const handlePageChange = (page: PageId) => {
    triggerPageTransition(page);
  };

  const handleTransitionMidpoint = () => {
    if (transitionState.targetPage) {
      setActivePage(transitionState.targetPage);
      window.location.hash =
        transitionState.targetPage === 'home' ? '' : `#${transitionState.targetPage}`;
      resetSmoothScroll();
    }
  };

  const handleTransitionComplete = () => {
    setTransitionState({ isTransitioning: false, targetPage: null });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={(p) => handlePageChange(p as PageId)} />;
      case 'projects':
        return <ProjectsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'journey':
        return <JourneyPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={(p) => handlePageChange(p as PageId)} />;
    }
  };

  return (
    <SmoothScroll>
      {/* 1. Initial Site Boot Sequence with Centered Monogram Logo */}
      <AnimatePresence>
        {isSiteLoading && (
          <LoadingScreen
            variant="intro"
            onComplete={() => setIsSiteLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* 2. Page-to-Page Loading Transition with Centered Monogram Logo */}
      <AnimatePresence>
        {transitionState.isTransitioning && transitionState.targetPage && (
          <LoadingScreen
            variant="transition"
            targetPageName={transitionState.targetPage}
            onMidpoint={handleTransitionMidpoint}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen selection:bg-red-500/30 selection:text-red-200">
        {/* Custom AI Cursor Orb */}
        <CustomCursor />

        {/* 3D Particle Space Field */}
        <ParticleField />

        {/* Floating Chapter / Page Navigation Bar */}
        <Navigation activePage={activePage} onPageChange={handlePageChange} />

        {/* Top-Right Floating Theme Switcher Pill */}
        <ThemeSwitcher />

        {/* Persistent Floating Keyboard Shortcuts Trigger & Guide */}
        <ShortcutsModal onNavigate={handlePageChange} />

        {/* Draggable Rotating Vinyl Disc & Audio Deck */}
        <MusicPlayer />

        {/* Persistent Floating Mascot Companion at Bottom-Right */}
        <MascotCompanion
          activePage={activePage}
          onNavigateHome={() => handlePageChange('home')}
        />

        {/* Main Content Router with Smooth Page Transitions */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Suspense fallback={<PagePlaceholder />}>
                {renderActivePage()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer with Cyber Mascot on every page */}
        <Footer onNavigate={handlePageChange} />
      </div>
    </SmoothScroll>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;
