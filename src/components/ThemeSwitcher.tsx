import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Orbit, X } from 'lucide-react';
import { useTheme, type Theme } from '../context/ThemeContext';
import mascotImg from '../assets/mascot.webp';
import noirMascotImg from '../assets/noir_mascot.webp';
import cosmicMascotImg from '../assets/cosmic_mascot.webp';

interface ThemeOption {
  id: Theme;
  label: string;
  angleDeg: number;
  tagline: string;
  accentColor: string;
  swatches: [string, string, string];
  mascot: string;
  icon: (className?: string) => ReactNode;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'crimson',
    label: 'Crimson',
    angleDeg: -90,
    tagline: 'Red · White · Black',
    accentColor: '#ef4444',
    swatches: ['#050608', '#ef4444', '#ffffff'],
    mascot: mascotImg,
    icon: (cls = 'w-4 h-4') => <Flame className={cls} />,
  },
  {
    id: 'mono',
    label: 'Noir',
    angleDeg: 30,
    tagline: 'Black · White · Grey',
    accentColor: '#ffffff',
    swatches: ['#000000', '#ffffff', '#71717a'],
    mascot: noirMascotImg,
    icon: (cls = 'w-4 h-4') => <Sparkles className={cls} />,
  },
  {
    id: 'cosmic',
    label: 'Cosmic',
    angleDeg: 150,
    tagline: 'Black · Pink · Purple',
    accentColor: '#ec4899',
    swatches: ['#000000', '#ec4899', '#9333ea'],
    mascot: cosmicMascotImg,
    icon: (cls = 'w-4 h-4') => <Orbit className={cls} />,
  },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);

  const activeOption = themeOptions.find((t) => t.id === theme) ?? themeOptions[0];
  const previewOption =
    themeOptions.find((t) => t.id === (hoveredTheme ?? theme)) ?? activeOption;

  useEffect(() => {
    const onToggle = () => setIsOpen((prev) => !prev);
    const onClose = () => setIsOpen(false);
    window.addEventListener('vs:toggle-theme-dial', onToggle);
    window.addEventListener('vs:close-modals', onClose);
    return () => {
      window.removeEventListener('vs:toggle-theme-dial', onToggle);
      window.removeEventListener('vs:close-modals', onClose);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (id: Theme) => {
    setTheme(id);
    setHoveredTheme(null);
    setIsOpen(false);
  };

  // Dial geometry
  const dialRadius = 114;

  return (
    <>
      {/* Theme Pill Trigger with "Change the Theme" text (Top-Right) */}
      <div className="fixed top-3.5 right-3 sm:top-5 sm:right-6 z-50 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          aria-label={`Change the theme (current: ${activeOption.label})`}
          title={`Change the Theme (Press T) • Current: ${activeOption.label}`}
          className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-neutral-950/90 border border-white/15 hover:border-[var(--theme-primary,rgba(239,68,68,0.6))] backdrop-blur-xl shadow-xl cursor-pointer transition-all duration-200"
          data-cursor
          data-cursor-text="Theme"
        >
          {/* Theme Icon with Accent Color */}
          <span
            className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12"
            style={{ color: activeOption.accentColor }}
          >
            {activeOption.icon('w-3.5 h-3.5 sm:w-4 sm:h-4')}
          </span>

          {/* Text: Change the Theme */}
          <span className="text-[11px] sm:text-xs font-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap">
            Change the Theme
          </span>

          {/* Keyboard shortcut hint */}
          <kbd className="hidden sm:inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-400 group-hover:text-zinc-200 leading-none">
            T
          </kbd>
        </motion.button>
      </div>

      {/* Centered Radial Theme Dial Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="theme-dial-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-xl flex flex-col items-center justify-center p-4 select-none"
          >
            {/* Header Label */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mb-8 text-center pointer-events-none"
            >
              <span className="text-[11px] font-mono tracking-[0.28em] text-zinc-400 uppercase block mb-1">
                Select Experience
              </span>
              <h2 className="font-syncopate text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
                Theme Dial
              </h2>
            </motion.div>

            {/* Radial Dial Container */}
            <motion.div
              key="theme-dial-wheel"
              initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[300px] h-[300px] sm:w-[330px] sm:h-[330px] flex items-center justify-center"
            >
              {/* Outer & Inner Dial Rings SVG */}
              <svg
                viewBox="0 0 320 320"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Outer dashed orbital track */}
                <circle
                  cx="160"
                  cy="160"
                  r={dialRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                {/* Inner subtle hub ring */}
                <circle
                  cx="160"
                  cy="160"
                  r="64"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
                {/* Radial spokes toward each of the 3 themes */}
                {themeOptions.map((opt) => {
                  const rad = (opt.angleDeg * Math.PI) / 180;
                  const x1 = 160 + 64 * Math.cos(rad);
                  const y1 = 160 + 64 * Math.sin(rad);
                  const x2 = 160 + dialRadius * Math.cos(rad);
                  const y2 = 160 + dialRadius * Math.sin(rad);
                  const isHighlighted = previewOption.id === opt.id;
                  return (
                    <line
                      key={opt.id}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isHighlighted ? opt.accentColor : 'rgba(255,255,255,0.1)'}
                      strokeWidth={isHighlighted ? '2' : '1'}
                      strokeOpacity={isHighlighted ? 0.85 : 1}
                    />
                  );
                })}
              </svg>

              {/* Center Hub Preview */}
              <motion.div
                key={previewOption.id}
                initial={{ opacity: 0.6, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-28 h-28 sm:w-30 sm:h-30 rounded-full bg-zinc-950/95 border flex flex-col items-center justify-center overflow-hidden shadow-2xl text-center p-2"
                style={{
                  borderColor: previewOption.accentColor,
                  boxShadow: `0 0 35px ${previewOption.accentColor}33`,
                }}
              >
                <img
                  src={previewOption.mascot}
                  alt={previewOption.label}
                  className="w-16 h-16 object-contain object-top drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
                />
                <span className="font-syncopate font-bold text-[10px] text-white uppercase tracking-wider mt-0.5">
                  {previewOption.label}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  {previewOption.swatches.map((hex, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full border border-white/25"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* 3 Radial Theme Nodes */}
              {themeOptions.map((opt) => {
                const rad = (opt.angleDeg * Math.PI) / 180;
                // Offset from center in percentage of 320px viewbox
                const leftPct = 50 + (dialRadius / 320) * 100 * Math.cos(rad);
                const topPct = 50 + (dialRadius / 320) * 100 * Math.sin(rad);
                const isSelected = theme === opt.id;
                const isHovered = hoveredTheme === opt.id;

                return (
                  <div
                    key={opt.id}
                    className="absolute z-20"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredTheme(opt.id)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      onClick={() => handleSelect(opt.id)}
                      aria-label={`Activate ${opt.label} theme (${opt.tagline})`}
                      style={{
                        borderColor:
                          isSelected || isHovered ? opt.accentColor : 'rgba(255,255,255,0.18)',
                        boxShadow:
                          isSelected || isHovered
                            ? `0 0 24px ${opt.accentColor}55`
                            : '0 8px 25px rgba(0,0,0,0.75)',
                      }}
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-zinc-950/95 border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors backdrop-blur-xl"
                      data-cursor
                      data-cursor-text={opt.label}
                    >
                      <span style={{ color: opt.accentColor }}>{opt.icon('w-5 h-5')}</span>
                      <span className="font-mono text-[11px] font-bold text-white">
                        {opt.label}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
                        {isSelected ? 'Active' : 'Select'}
                      </span>
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>

            {/* Active Tagline + Close Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mt-8 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs font-mono text-zinc-300 tracking-wider">
                {previewOption.tagline}
              </p>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close theme dial"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
                data-cursor
                data-cursor-text="Close"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
