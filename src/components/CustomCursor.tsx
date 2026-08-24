import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for orb physics
  const springConfig = { damping: 25, stiffness: 250 };
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
      {/* Outer Glowing AI Orb */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full flex items-center justify-center mix-blend-screen"
        style={{
          x: orbX,
          y: orbY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (hoverText ? 80 : 50) : 32,
          height: isHovered ? (hoverText ? 80 : 50) : 32,
          background: isHovered
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 60%, rgba(6, 182, 212, 0) 100%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(99, 102, 241, 0.3) 50%, rgba(0, 0, 0, 0) 100%)',
          boxShadow: isHovered
            ? '0 0 30px rgba(139, 92, 246, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.5)'
            : '0 0 20px rgba(56, 189, 248, 0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {hoverText && (
          <span className="text-[10px] font-mono tracking-wider font-semibold text-white uppercase text-center px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Precise Center Core Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]"
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
