import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Code2, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from '../components/Icons';
import { TypewriterText } from '../components/TypewriterText';
import { MagneticButton } from '../components/MagneticButton';
import { CountUp } from '../components/CountUp';
import { useCodeforces } from '../hooks/useCodeforces';
import { useTheme } from '../context/ThemeContext';
import mascotImg from '../assets/mascot.webp';
import noirMascotImg from '../assets/noir_mascot.webp';
import cosmicMascotImg from '../assets/cosmic_mascot.webp';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cf = useCodeforces('vaibhav2927');
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';
  const activeMascot = isMono
    ? noirMascotImg
    : isCosmic
    ? cosmicMascotImg
    : mascotImg;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const typingPhrases = [
    'Building MAITRI',
    'Mastering Algorithms',
    'Building AI Products',
    'Learning Every Day',
  ];

  // 60FPS Scroll Transforms:
  // 1. Title: Starts centered in background, glides smoothly to top center as a sleek header
  const titleY = useTransform(scrollYProgress, [0, 0.38], ['0vh', '-15vh']);
  const titleScale = useTransform(scrollYProgress, [0, 0.38], [1, 0.48]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.38, 0.55], [1, 1, 0]);

  // 2. Mascot: Starts centered, glides down to bottom-right and dissolves as the fixed companion docks in
  const mascotX = useTransform(scrollYProgress, [0, 0.38], ['0vw', '26vw']);
  const mascotY = useTransform(scrollYProgress, [0, 0.38], ['0vh', '4vh']);
  const mascotScale = useTransform(scrollYProgress, [0, 0.38], [1, 0.45]);
  const mascotOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 0.8, 0]);

  // 3. Ambient Glow: Fades with the hero transition
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // 4. Foreground HUD: Promptly dissolves so stats never creep up into the navbar
  const hudOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.38], [1, 0.6, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, 15]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[135vh] w-full bg-[var(--theme-bg)]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between pt-20 pb-6 px-4 sm:px-8 overflow-hidden select-none">
        {/* Background Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* Ambient Backlight Glows (GPU Accelerated) */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] md:w-[720px] h-[340px] sm:h-[560px] md:h-[720px] rounded-full blur-[100px] pointer-events-none transform-gpu ${
            isMono
              ? 'bg-white/[0.08]'
              : isCosmic
              ? 'bg-purple-600/[0.24]'
              : 'bg-red-600/[0.22]'
          }`}
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className={`absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[320px] md:w-[420px] h-[200px] sm:h-[320px] md:h-[420px] rounded-full blur-[60px] pointer-events-none transform-gpu ${
            isMono
              ? 'bg-zinc-400/[0.12]'
              : isCosmic
              ? 'bg-pink-500/[0.26]'
              : 'bg-red-500/[0.28]'
          }`}
        />

        {/* Top spacer */}
        <div className="w-full h-1 pointer-events-none" />

        {/* Layer 1 (z-10): Typography Behind Mascot -> Glides to top center as header */}
        <motion.div
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none origin-center transform-gpu"
        >
          <div className="w-full max-w-6xl px-4 flex flex-col items-center justify-center">
            <h1 className="font-syncopate font-black text-4xl sm:text-6xl md:text-7xl lg:text-[6.8rem] xl:text-[8.2rem] uppercase tracking-[0.14em] sm:tracking-[0.18em] lg:tracking-[0.22em] leading-[0.95] text-center select-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                VAIBHAV
              </span>
              <span
                className={`block text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 via-zinc-400 to-red-950/70 ${
                  isMono
                    ? 'drop-shadow-[0_10px_35px_rgba(255,255,255,0.2)]'
                    : isCosmic
                    ? 'drop-shadow-[0_10px_35px_rgba(236,72,153,0.38)]'
                    : 'drop-shadow-[0_10px_35px_rgba(220,38,38,0.35)]'
                } mt-1 sm:mt-2`}
              >
                SOLANKI
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Layer 2 (z-20): Cyber Samurai Mascot -> Glides down to bottom-right, clickable */}
        <motion.div
          style={{ x: mascotX, y: mascotY, scale: mascotScale, opacity: mascotOpacity }}
          className="absolute bottom-0 inset-x-0 z-20 flex justify-center items-end pointer-events-none origin-bottom transform-gpu"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative flex items-end justify-center pointer-events-auto cursor-pointer group"
            data-cursor
            data-cursor-text="Home"
            title="Click to return to top"
          >
            {/* Mascot Image with lightweight gradient mask & GPU compositing */}
            <img
              src={activeMascot}
              alt="Vaibhav Solanki Mascot"
              className="h-[52vh] sm:h-[62vh] md:h-[68vh] lg:h-[72vh] max-h-[700px] w-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] select-none group-hover:scale-[1.02] transition-transform duration-300 transform-gpu"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 14%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 14%, black 100%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Layer 3 (z-30): Foreground Elements & HUD */}
        <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col items-center justify-end h-full pointer-events-none pb-2">
          {/* Bottom HUD & Actions (Fades promptly on scroll so stats never reach navbar) */}
          <motion.div
            style={{ opacity: hudOpacity }}
            className="w-full flex flex-col md:flex-row items-center md:items-end justify-between px-2 sm:px-6 pb-2 gap-6 pointer-events-none mt-auto transform-gpu"
          >
            {/* Left Stats Column */}
            <div className="hidden md:flex flex-col gap-3.5 text-left pointer-events-auto min-w-[140px]">
              <div className="group">
                <div className="font-syncopate font-black text-2xl lg:text-3xl text-white tracking-wider flex items-center gap-1 leading-none">
                  <CountUp end={cf.user?.rating ?? 1056} duration={1.2} />
                  <span className="text-red-500 text-xs font-mono font-normal uppercase tracking-normal ml-1">
                    {cf.user?.rank ?? 'Peak'}
                  </span>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1">
                  Codeforces Rating
                </div>
              </div>
              <div className="group">
                <div className="font-syncopate font-black text-2xl lg:text-3xl text-white tracking-wider flex items-center gap-1 leading-none">
                  <CountUp end={cf.contests.length || 6} duration={1} />
                  <span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1">
                  Rated Contests
                </div>
              </div>
              <div className="group">
                <div className="font-syncopate font-black text-2xl lg:text-3xl text-white tracking-wider flex items-center gap-1 leading-none">
                  <CountUp end={4} duration={0.8} />
                  <span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1">
                  Production Apps
                </div>
              </div>
            </div>

            {/* Mobile-only Stats Bar */}
            <div className="flex md:hidden items-center justify-center gap-4 text-center pointer-events-auto py-1 px-4 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md">
              <div>
                <span className="font-syncopate font-bold text-sm text-white">{cf.user?.rating ?? 1056}</span>
                <span className="block text-[9px] font-mono text-zinc-400">CF Rating</span>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div>
                <span className="font-syncopate font-bold text-sm text-white">{cf.contests.length || 6}</span>
                <span className="block text-[9px] font-mono text-zinc-400">Contests</span>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div>
                <span className="font-syncopate font-bold text-sm text-white">4<span className="text-red-500">+</span></span>
                <span className="block text-[9px] font-mono text-zinc-400">Apps</span>
              </div>
            </div>

            {/* Center Controls & Scroll Cue */}
            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="flex flex-col items-center gap-3 pointer-events-auto"
            >
              {/* Typewriter Capsule */}
              <div className="glass-panel inline-flex items-center px-4 py-1.5 rounded-full border-white/10 shadow-2xl text-xs sm:text-sm font-mono text-red-300 bg-neutral-950/85 backdrop-blur-xl">
                <span className="text-zinc-500 mr-2 text-xs">currently:</span>
                <TypewriterText phrases={typingPhrases} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton
                  variant="primary"
                  onClick={() => {
                    const el = document.getElementById('beginning');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else if (onNavigate) {
                      onNavigate('journey');
                    }
                  }}
                >
                  <span>Explore My Journey</span>
                  <ArrowDown className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('projects');
                    } else {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Code2 className="w-4 h-4 text-red-400" />
                  <span>View Projects</span>
                </MagneticButton>
              </div>

              {/* Scroll Cue */}
              <div className="flex flex-col items-center gap-1.5 mt-2 pointer-events-none">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-zinc-500 uppercase font-medium">
                  Scroll to unveil chapter 1
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-4 h-7 rounded-full border border-zinc-700/80 flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm"
                >
                  <div className="w-1 h-1.5 rounded-full bg-red-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Socials Pill */}
            <div className="flex md:flex-col lg:flex-row items-center gap-2.5 pointer-events-auto min-w-[140px] justify-end">
              <a
                href="https://github.com/vaibhavsolanki1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaibhav-solanki-b5790b253"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://codeforces.com/profile/vaibhav2927"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codeforces Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="Codeforces"
              >
                <CodeforcesIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:vaibhavsolankijee@gmail.com"
                aria-label="Email Vaibhav"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume PDF"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950/80 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                title="Download Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
