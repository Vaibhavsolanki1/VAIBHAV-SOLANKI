import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, GitCommit, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { TypewriterText } from '../components/TypewriterText';
import { MagneticButton } from '../components/MagneticButton';

export const Hero: React.FC = () => {
  const typingPhrases = [
    'Building MAITRI',
    'Preparing for ICPC',
    'Building AI Products',
    'Learning Every Day',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Dynamic Background Lighting Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Floating Code Snippet Badge - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:flex absolute top-36 left-12 glass-panel p-3.5 rounded-xl max-w-xs text-xs font-mono border-white/10 shadow-2xl animate-float pointer-events-none"
      >
        <div className="flex items-center gap-2 text-slate-400 mb-2 border-b border-white/10 pb-1.5 w-full">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>maitri_core.rs</span>
        </div>
        <div className="text-slate-300 leading-relaxed">
          <span className="text-purple-400">async fn</span> <span className="text-blue-400">solve_future</span>() &#123;<br />
          &nbsp;&nbsp;<span className="text-emerald-400">let</span> vision = AI::empower();<br />
          &nbsp;&nbsp;vision.<span className="text-amber-400">ship</span>().<span className="text-cyan-400">await</span>?;<br />
          &#125;
        </div>
      </motion.div>

      {/* Floating GitHub Commit Badge - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{ animationDelay: '-3s' }}
        className="hidden lg:flex absolute top-40 right-12 glass-panel p-3.5 rounded-xl border-white/10 shadow-2xl animate-float pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">git push origin main</div>
            <div className="text-[11px] text-slate-400 font-mono">feat: deploy neural agent v2.4</div>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-indigo-500/30 mb-8 text-xs font-mono tracking-wider text-indigo-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>PORTFOLIO EXPERIENCE • 2026 EDITION</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="text-gradient hover:opacity-90 transition-opacity">
            Vaibhav Solanki.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-slate-300 font-light mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Software Engineer <span className="text-indigo-400">•</span> AI Builder{' '}
          <span className="text-cyan-400">•</span> Competitive Programmer{' '}
          <span className="text-purple-400">•</span> Startup Founder
        </motion.p>

        {/* Typing Cycle Animation Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel inline-flex items-center px-6 py-3 rounded-2xl mb-12 border-white/10 shadow-lg text-sm sm:text-base font-mono text-cyan-300"
        >
          <span className="text-slate-500 mr-3">currently:</span>
          <TypewriterText phrases={typingPhrases} />
        </motion.div>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton
            variant="primary"
            onClick={() => document.getElementById('beginning')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Explore My Journey</span>
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>View Projects</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Scroll to unveil chapter 1
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
