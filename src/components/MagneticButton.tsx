import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export const MagneticButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-red-600 hover:bg-red-500 text-white font-medium transition-colors',
    secondary:
      'bg-zinc-900 text-zinc-200 border border-zinc-700/60 hover:border-red-500/50 hover:text-white',
    glass:
      'glass-card text-white hover:bg-white/10 border-white/10 hover:border-white/20',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.2 }}
      className={`relative inline-flex items-center justify-center px-6 py-3.5 rounded-full cursor-pointer text-sm font-medium tracking-wide transition-colors duration-300 group overflow-hidden ${variantStyles[variant]} ${className}`}
      data-cursor
      data-cursor-text="Click"
    >
      {/* Glow highlight inside button */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    return (
      <a
        href={href}
        onClick={onClick}
        target={target || (isExternal ? '_blank' : undefined)}
        rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent border-0 p-0 cursor-pointer"
    >
      {content}
    </button>
  );
};
