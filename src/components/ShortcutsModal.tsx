import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Compass, Palette, Zap, Disc } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { PageId } from './Navigation';

interface ShortcutsModalProps {
  onNavigate: (page: PageId) => void;
}

interface ShortcutItem {
  keys: string[];
  label: string;
}

interface ShortcutGroup {
  title: string;
  icon: React.ReactNode;
  items: ShortcutItem[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Navigation',
    icon: <Compass className="w-3.5 h-3.5 text-red-400" />,
    items: [
      { keys: ['1'], label: 'Home' },
      { keys: ['2'], label: 'Projects' },
      { keys: ['3'], label: 'Skills & Wins' },
      { keys: ['4'], label: 'Journey' },
      { keys: ['5'], label: 'Contact' },
      { keys: ['H'], label: 'Back to Home' },
    ],
  },
  {
    title: 'Theme & Appearance',
    icon: <Palette className="w-3.5 h-3.5 text-red-400" />,
    items: [
      { keys: ['T'], label: 'Open / Close Theme Dial' },
      { keys: ['Shift', 'T'], label: 'Cycle Theme' },
    ],
  },
  {
    title: 'Audio & Music',
    icon: <Disc className="w-3.5 h-3.5 text-red-400" />,
    items: [
      { keys: ['M'], label: 'Toggle Play / Pause Music' },
      { keys: ['Shift', 'M'], label: 'Open Music Player Deck' },
    ],
  },
  {
    title: 'Actions & Scroll',
    icon: <Zap className="w-3.5 h-3.5 text-red-400" />,
    items: [
      { keys: ['?'], label: 'Show / Hide Shortcuts' },
      { keys: ['G'], label: 'Scroll to Top' },
      { keys: ['B'], label: 'Scroll to Footer' },
      { keys: ['Shift', 'G'], label: 'Open GitHub Profile' },
      { keys: ['Shift', 'R'], label: 'Open Resume PDF' },
      { keys: ['Esc'], label: 'Close Modal / Dial' },
    ],
  },
];

export const ShortcutsModal = ({ onNavigate }: ShortcutsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { nextTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when user is typing in an input or using Ctrl/Cmd/Alt shortcuts
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if (isTyping || e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('vs:close-modals'));
        setIsOpen((prev) => !prev);
        return;
      }

      // Page navigation shortcuts 1-5
      const pageMap: Record<string, PageId> = {
        '1': 'home',
        '2': 'projects',
        '3': 'skills',
        '4': 'journey',
        '5': 'contact',
      };

      if (pageMap[e.key]) {
        e.preventDefault();
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('vs:close-modals'));
        onNavigate(pageMap[e.key]);
        return;
      }

      const lower = e.key.toLowerCase();

      if (lower === 't') {
        e.preventDefault();
        setIsOpen(false);
        if (e.shiftKey) {
          nextTheme();
        } else {
          window.dispatchEvent(new CustomEvent('vs:toggle-theme-dial'));
        }
        return;
      }

      if (lower === 'h') {
        e.preventDefault();
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('vs:close-modals'));
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (lower === 'g') {
        e.preventDefault();
        if (e.shiftKey) {
          window.open('https://github.com/vaibhavsolanki1', '_blank', 'noopener,noreferrer');
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (lower === 'r' && e.shiftKey) {
        e.preventDefault();
        window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
        return;
      }

      if (lower === 'b') {
        e.preventDefault();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, nextTheme]);

  return (
    <>
      {/* Persistent Bottom-Left Shortcut Guide Trigger */}
      <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          aria-label="Show keyboard shortcuts (Press ?)"
          title="Keyboard Shortcuts (?)"
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-950/90 border border-white/15 hover:border-red-500/50 backdrop-blur-xl shadow-xl cursor-pointer transition-colors"
          data-cursor
          data-cursor-text="Keys"
        >
          <Keyboard className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
          <span className="hidden sm:inline text-[11px] font-mono text-zinc-300 group-hover:text-white transition-colors">
            Shortcuts
          </span>
          <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-200 leading-none">
            ?
          </kbd>
        </motion.button>
      </div>

      {/* Centered Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="shortcuts-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[85] bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              key="shortcuts-card"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl bg-zinc-950/95 border border-red-500/35 shadow-2xl overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-zinc-700" />

              <div className="p-6 sm:p-7 max-h-[82vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                      <Keyboard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Keyboard Shortcuts
                      </h3>
                      <p className="text-xs font-mono text-zinc-400">
                        Navigate chapters, themes, and quick actions
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close shortcuts guide"
                    className="p-2 rounded-full bg-zinc-900 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {shortcutGroups.map((group) => (
                    <div
                      key={group.title}
                      className={`p-4 rounded-xl bg-neutral-900/80 border border-white/10 ${
                        group.title === 'Navigation' ? 'md:row-span-2' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 mb-3 pb-2 border-b border-white/5">
                        {group.icon}
                        <span>{group.title}</span>
                      </div>

                      <div className="space-y-2.5">
                        {group.items.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="text-zinc-300 font-light">{item.label}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {item.keys.map((k, i) => (
                                <span key={i} className="inline-flex items-center gap-1">
                                  <kbd className="min-w-[24px] text-center px-2 py-0.5 rounded-md bg-zinc-950 border border-white/15 text-[11px] font-mono font-semibold text-white shadow-sm">
                                    {k}
                                  </kbd>
                                  {i < item.keys.length - 1 && (
                                    <span className="text-zinc-500 text-[10px] font-mono">+</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Hint */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Press ? or / anytime to toggle</span>
                  <span>Esc to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
