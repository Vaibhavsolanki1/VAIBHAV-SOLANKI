import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Heart, Compass } from 'lucide-react';

export const Chapter8_Vision: React.FC = () => {
  return (
    <section id="vision" className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden">
      {/* Background Sunrise Morph Light Effect */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1.2 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute bottom-0 inset-x-0 h-[600px] bg-gradient-to-t from-amber-500/20 via-rose-500/15 to-indigo-900/0 rounded-t-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Chapter Marker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-12"
        >
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>CHAPTER 08 • MY VISION</span>
        </motion.div>

        {/* Cinematic Vision Quote */}
        <div className="space-y-6 sm:space-y-8 mb-16">
          <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
            "I don't just want to write software.
          </blockquote>

          <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gradient-gold tracking-tight">
            I want to build technology that genuinely improves people's lives.
          </blockquote>

          <blockquote className="font-display text-2xl sm:text-4xl font-semibold leading-relaxed text-slate-300 font-light tracking-wide max-w-3xl mx-auto">
            Every line of code is another step toward that vision."
          </blockquote>
        </div>

        {/* Vision Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left"
        >
          <div className="glass-panel p-5 rounded-2xl border-amber-500/20 bg-slate-950/40">
            <Compass className="w-5 h-5 text-amber-400 mb-2" />
            <h4 className="font-display text-white font-bold text-base mb-1">Human Centric</h4>
            <p className="text-slate-400 text-xs font-light">AI that empowers human potential rather than replacing it.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-rose-500/20 bg-slate-950/40">
            <Heart className="w-5 h-5 text-rose-400 mb-2" />
            <h4 className="font-display text-white font-bold text-base mb-1">Mental Wellness</h4>
            <p className="text-slate-400 text-xs font-light">Transforming healthcare and personal growth via MAITRI.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-indigo-500/20 bg-slate-950/40">
            <Sparkles className="w-5 h-5 text-indigo-400 mb-2" />
            <h4 className="font-display text-white font-bold text-base mb-1">Relentless Excellence</h4>
            <p className="text-slate-400 text-xs font-light">Constantly mastering algorithms, architecture, and design.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
