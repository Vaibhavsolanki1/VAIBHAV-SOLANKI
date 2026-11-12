import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  tiltEffect?: boolean;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'pink' | 'amber';
  onClick?: () => void;
}

export const GlassmorphicCard = ({
  children,
  className = '',
  tiltEffect = true,
  onClick,
}: GlassmorphicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative rounded-2xl glass-card p-6 overflow-hidden transition-colors duration-300 group ${className}`}
    >
      {/* Subtle Matte Light Sheen */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.035), transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
