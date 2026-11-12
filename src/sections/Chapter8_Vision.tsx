import { motion } from 'framer-motion';
import { Sparkles, Sun, Heart, Compass } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

export const Chapter8_Vision = () => {
  return (
    <section id="vision" className="relative flex items-center justify-center py-16 sm:py-20 px-4 overflow-hidden w-full">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Chapter Marker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase mb-12"
        >
          <Sun className="w-3.5 h-3.5 text-red-500" />
          <span>CHAPTER 08 • MY VISION</span>
        </motion.div>

        {/* Cinematic Vision Quote with TextReveal */}
        <div className="space-y-6 sm:space-y-8 mb-16 flex flex-col items-center">
          <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
            <TextReveal delay={0.1}>"I don't just want to write software.</TextReveal>
          </h3>

          <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gradient tracking-tight">
            <TextReveal delay={0.4}>I want to build technology that genuinely improves people's lives.</TextReveal>
          </h3>

          <div className="font-display text-2xl sm:text-4xl font-semibold leading-relaxed text-neutral-300 font-light tracking-wide max-w-3xl mx-auto">
            <TextReveal delay={0.8}>Every line of code is another step toward that vision."</TextReveal>
          </div>
        </div>

        {/* Vision Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left"
        >
          <div className="glass-panel p-5 rounded-2xl border-white/10 bg-neutral-950/60">
            <Compass className="w-5 h-5 text-red-500 mb-2" />
            <h4 className="font-display text-white font-bold text-base mb-1">Human Centric</h4>
            <p className="text-neutral-400 text-xs font-light">AI that empowers human potential rather than replacing it.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-white/10 bg-neutral-950/60">
            <Heart className="w-5 h-5 text-red-500 mb-2" />
            <h4 className="font-display text-white font-bold text-base mb-1">Mental Wellness</h4>
            <p className="text-neutral-400 text-xs font-light">Transforming healthcare and personal growth via MAITRI.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-white/10 bg-neutral-950/60">
            <Sparkles className="w-5 h-5 text-red-500 mb-2" />
            <h4 className="font-display text-white font-bold text-base mb-1">Relentless Excellence</h4>
            <p className="text-neutral-400 text-xs font-light">Constantly mastering algorithms, architecture, and design.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
