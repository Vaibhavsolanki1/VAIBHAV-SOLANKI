import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

interface LoadingScreenProps {
  onComplete: () => void;
  onMidpoint?: () => void;
  variant?: 'intro' | 'transition';
  targetPageName?: string;
}

export const LoadingScreen = ({
  onComplete,
  onMidpoint,
  variant = 'intro',
  targetPageName = '',
}: LoadingScreenProps) => {
  const midpointTriggered = useRef(false);

  const isTransition = variant === 'transition';
  const duration = isTransition ? 650 : 2000;

  useEffect(() => {
    const startTime = Date.now();

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);

      // Trigger midpoint page swap when transition screen covers the viewport
      if (onMidpoint && !midpointTriggered.current && pct >= 45) {
        midpointTriggered.current = true;
        onMidpoint();
      }

      if (pct >= 100) {
        clearInterval(checkInterval);
        setTimeout(() => {
          onComplete();
        }, isTransition ? 50 : 200);
      }
    }, 16);

    return () => clearInterval(checkInterval);
  }, [duration, isTransition, onComplete, onMidpoint]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 2.4,
        filter: 'blur(12px)',
        transition: {
          duration: isTransition ? 0.55 : 0.85,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      transition={{ duration: isTransition ? 0.2 : 0.4 }}
      className="fixed inset-0 z-[99999] bg-[var(--theme-bg)] flex flex-col items-center justify-center overflow-hidden select-none cursor-default origin-center"
      aria-label="Loading portfolio experience"
    >
      {/* Clean Grid Overlay */}
      <motion.div
        exit={{ scale: 3, opacity: 0, transition: { duration: isTransition ? 0.5 : 0.8 } }}
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none origin-center"
      />

      {/* Center Stage Container */}
      <motion.div
        exit={{
          scale: 3.2,
          opacity: 0,
          filter: 'blur(16px)',
          transition: {
            duration: isTransition ? 0.5 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-md mx-auto origin-center"
      >
        {/* Monogram Logo - Crisp, clean, matte */}
        <motion.div
          initial={{ scale: isTransition ? 0.95 : 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: isTransition ? 0.35 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5"
        >
          <img
            src={logoImg}
            alt="Geometric VS Monogram Logo"
            className={`object-contain w-auto ${
              isTransition ? 'h-18 sm:h-22' : 'h-24 sm:h-30'
            }`}
          />
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isTransition ? 0.1 : 0.25, duration: 0.4 }}
          className="space-y-1.5"
        >
          <h1 className="font-syncopate text-white font-bold text-sm sm:text-base tracking-[0.3em] uppercase">
            VAIBHAV SOLANKI
          </h1>
          <p className="text-[10px] font-mono text-zinc-400 tracking-[0.22em] uppercase">
            {isTransition ? targetPageName.toUpperCase() || 'PORTFOLIO' : 'PORTFOLIO EXPERIENCE'}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
