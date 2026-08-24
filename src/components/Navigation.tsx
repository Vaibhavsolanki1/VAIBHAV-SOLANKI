import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code2, Trophy, Cpu, Milestone, Activity, Mail } from 'lucide-react';
import { GithubIcon } from './Icons';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Start', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'beginning', label: 'Story', icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: 'projects', label: 'Projects', icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: 'achievements', label: 'Wins', icon: <Trophy className="w-3.5 h-3.5" /> },
  { id: 'skills', label: 'Skills', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'journey', label: 'Timeline', icon: <Milestone className="w-3.5 h-3.5" /> },
  { id: 'beyond', label: 'Beyond', icon: <Activity className="w-3.5 h-3.5" /> },
  { id: 'github', label: 'GitHub', icon: <GithubIcon className="w-3.5 h-3.5" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
];

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-xl bg-slate-950/70'
            : 'bg-slate-900/40 border border-white/5 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center px-3 pl-4 border-r border-white/10 mr-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
          <span className="font-display font-bold text-xs tracking-wider uppercase text-white">
            VS<span className="text-cyan-400">.2026</span>
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[75vw] sm:max-w-none py-0.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                data-cursor
                data-cursor-text={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                    transition={{ type: 'spring', duration: 0.6, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
};
