import { motion } from 'framer-motion';
import { ArrowUp, Heart, Code2, Sparkles, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';
import mascotImg from '../assets/mascot.webp';
import noirMascotImg from '../assets/noir_mascot.webp';
import cosmicMascotImg from '../assets/cosmic_mascot.webp';
import type { PageId } from './Navigation';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';
  const activeMascot = isMono
    ? noirMascotImg
    : isCosmic
    ? cosmicMascotImg
    : mascotImg;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills & Wins' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
    { id: 'all', label: 'All View' },
  ];

  return (
    <footer className="relative z-20 w-full bg-gradient-to-t from-black via-zinc-950/90 to-transparent border-t border-white/10 pt-14 pb-10 px-4 sm:px-8 mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Mascot Hero Stage (Cols 1-6) */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Mascot Character Badge with Ambient Crimson Glow */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="relative group cursor-pointer flex-shrink-0"
              title="Return to top"
              data-cursor
              data-cursor-text="Top"
            >
              {/* Backlight Glow */}
              <div className="absolute inset-0 bg-red-600/30 rounded-2xl blur-xl group-hover:bg-red-600/50 transition-colors pointer-events-none" />
              
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-zinc-950/90 border border-red-500/40 group-hover:border-red-500 shadow-2xl flex items-end justify-center overflow-hidden backdrop-blur-xl">
                <img
                  src={activeMascot}
                  alt="Vaibhav Solanki Mascot"
                  className="w-full h-full object-contain object-top translate-y-1 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
              </div>
            </motion.div>

            {/* Brand Information */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-2">
                <img src={logoImg} alt="VS Logo" className="h-6 w-auto object-contain" />
                <span className="font-syncopate font-bold text-lg text-white tracking-wider">
                  VAIBHAV SOLANKI
                </span>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm mb-4">
                Software Engineer & AI Builder.
              </p>
              <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>Open to opportunities</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Cols 7-9) */}
          <div className="md:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Navigation</span>
            </span>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all cursor-pointer inline-flex items-center gap-1.5 group"
                    data-cursor
                    data-cursor-text={link.label}
                  >
                    <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Socials (Cols 10-12) */}
          <div className="md:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase mb-4 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-red-500" />
              <span>Connect</span>
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-5">
              <a
                href="https://github.com/vaibhavsolanki1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaibhav-solanki-b5790b253"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://codeforces.com/profile/vaibhav2927"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codeforces Profile"
                className="w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="Codeforces"
              >
                <CodeforcesIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:vaibhavsolankijee@gmail.com"
                aria-label="Email Vaibhav"
                className="w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume PDF"
                className="w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="Download Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-red-500/50 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
              data-cursor
              data-cursor-text="Top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-red-500 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} Vaibhav Solanki. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Designed & Engineered with React, Three.js & Tailwind</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

