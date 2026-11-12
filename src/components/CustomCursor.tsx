import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast, ultra-responsive spring physics for instantaneous fluid cursor tracking
  const springConfig = { damping: 36, stiffness: 850, mass: 0.12 };
  const orbX = useSpring(cursorX, springConfig);
  const orbY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        if (text) setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Precise Tracking Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full flex items-center justify-center border border-white/30"
        style={{
          x: orbX,
          y: orbY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (hoverText ? 72 : 44) : 28,
          height: isHovered ? (hoverText ? 72 : 44) : 28,
          borderColor: isHovered
            ? isMono
              ? 'rgba(255, 255, 255, 0.75)'
              : isCosmic
              ? 'rgba(236, 72, 153, 0.85)'
              : 'rgba(239, 68, 68, 0.8)'
            : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isHovered
            ? isMono
              ? 'rgba(255, 255, 255, 0.08)'
              : isCosmic
              ? 'rgba(168, 85, 247, 0.12)'
              : 'rgba(239, 68, 68, 0.08)'
            : 'rgba(255, 255, 255, 0.02)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 600, mass: 0.15 }}
      >
        {hoverText && (
          <span className="text-[9px] font-mono tracking-widest font-bold text-white uppercase text-center px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Precise Center Core Dot */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full ${
          isMono
            ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
            : isCosmic
            ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.85)]'
            : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};
