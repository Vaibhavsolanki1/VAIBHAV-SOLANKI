import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import mascotImg from '../assets/mascot.webp';
import noirMascotImg from '../assets/noir_mascot.webp';
import cosmicMascotImg from '../assets/cosmic_mascot.webp';

interface MascotCompanionProps {
  activePage: string;
  onNavigateHome: () => void;
}

export const MascotCompanion = ({
  activePage,
  onNavigateHome,
}: MascotCompanionProps) => {
  const [showCompanion, setShowCompanion] = useState(false);
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';
  const activeMascot = isMono
    ? noirMascotImg
    : isCosmic
    ? cosmicMascotImg
    : mascotImg;

  useEffect(() => {
    const handleScroll = () => {
      // On 'home', show once scrolled past the initial hero view (scrollY > 350)
      // On other pages (projects, skills, journey, contact), show whenever scrolled past 80px
      const threshold = activePage === 'home' ? 320 : 80;
      setShowCompanion(window.scrollY > threshold || activePage !== 'home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleClick = () => {
    if (activePage !== 'home') {
      onNavigateHome();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showCompanion && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 30, x: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30, x: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleClick}
          aria-label="Return to Home page"
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 group cursor-pointer select-none focus:outline-none"
          data-cursor
          data-cursor-text="Home"
        >
          {/* Tooltip Pill on Hover */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-red-500/40 text-[11px] font-mono text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-2xl backdrop-blur-xl pointer-events-none">
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3 text-red-500" />
          </span>

          {/* Mascot Floating Orb */}
          <div
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-950/90 border border-red-500/40 group-hover:border-red-500 ${
              isMono
                ? 'shadow-[0_0_20px_rgba(255,255,255,0.22)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                : isCosmic
                ? 'shadow-[0_0_20px_rgba(236,72,153,0.35)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.65)]'
                : 'shadow-[0_0_20px_rgba(220,38,38,0.35)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]'
            } flex items-center justify-center overflow-hidden backdrop-blur-xl transition-all duration-300`}
          >
            {/* Ambient breathing glow inside orb */}
            <motion.div
              animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.95, 1.08, 0.95] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-red-600/35 rounded-full blur-sm pointer-events-none transform-gpu"
            />

            {/* Mascot Image */}
            <img
              src={activeMascot}
              alt="VS Cyber Mascot"
              className="relative z-10 w-full h-full object-contain object-top translate-y-1.5 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

