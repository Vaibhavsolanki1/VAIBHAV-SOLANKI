import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Cpu, Milestone, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';

export type PageId = 'home' | 'projects' | 'skills' | 'journey' | 'contact';

interface NavPageItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navPages: NavPageItem[] = [
  { id: 'home', label: 'Home', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'projects', label: 'Projects', icon: <Code2 className="w-3.5 h-3.5" />, badge: '4' },
  { id: 'skills', label: 'Skills & Wins', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'journey', label: 'Journey', icon: <Milestone className="w-3.5 h-3.5" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
];

interface NavigationProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

export const Navigation = ({ activePage, onPageChange }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isMono = theme === 'mono';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Persistent Top-Left Brand Logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3.5 left-3 sm:top-5 sm:left-6 z-50 pointer-events-auto"
      >
        <button
          onClick={() => onPageChange('home')}
          aria-label="Return to home page"
          className="group flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-neutral-950/90 border border-white/15 hover:border-red-500/50 backdrop-blur-xl transition-all cursor-pointer shadow-xl hover:bg-neutral-900"
          data-cursor
          data-cursor-text="Home"
        >
          <img
            src={logoImg}
            alt="VS Logo"
            className="h-6 sm:h-7 w-auto max-w-[36px] object-contain group-hover:scale-110 transition-transform"
          />
        </button>
      </motion.div>

      {/* Floating Center Page Switcher Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none"
      >
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 shadow-2xl ${
            scrolled
              ? 'glass-panel border-white/10 backdrop-blur-2xl bg-neutral-950/85 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
              : 'bg-neutral-950/70 border border-white/10 backdrop-blur-lg'
          }`}
        >
          {/* Page Switcher Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {navPages.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                aria-label={`Navigate to ${item.label} page`}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isMono
                      ? 'text-black font-bold'
                      : 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
                data-cursor
                data-cursor-text={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPage"
                    className={`absolute inset-0 rounded-full ${
                      isMono ? 'bg-white' : 'bg-red-600'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
                {item.badge && (
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono hidden md:inline ${
                      isMono
                        ? isActive
                          ? 'bg-black/15 text-black'
                          : 'bg-white/10 text-zinc-300'
                        : 'bg-red-400/20 text-red-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </motion.header>
    </>
  );
};
