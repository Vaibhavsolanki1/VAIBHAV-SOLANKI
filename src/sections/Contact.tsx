import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Check, Copy, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { MagneticButton } from '../components/MagneticButton';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'vaibhav.solanki@example.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#06b6d4', '#8b5cf6'],
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-4 max-w-5xl mx-auto">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none" />

      <GlassmorphicCard glowColor="purple" className="p-8 sm:p-12 text-center border-indigo-500/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>START A CONVERSATION</span>
        </motion.div>

        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          Let's Build Something <br />
          <span className="text-gradient">Amazing Together</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light mb-10 leading-relaxed">
          Whether you're looking for a passionate software engineer for your engineering team, discussing AI startups, or collaborating on competitive programming—my inbox is open.
        </p>

        {/* Email Copy Card */}
        <div className="inline-flex items-center gap-3 p-2 pl-5 rounded-full bg-slate-950 border border-white/10 shadow-2xl mb-10 max-w-full">
          <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="font-mono text-xs sm:text-sm text-slate-200 truncate">{email}</span>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs transition-colors"
            data-cursor
            data-cursor-text="Copy"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social & Resume Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            variant="glass"
            href="https://linkedin.com/in/vaibhavsolanki"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
          </MagneticButton>

          <MagneticButton
            variant="glass"
            href="https://github.com/vaibhavsolanki"
          >
            <GithubIcon className="w-4 h-4 text-purple-400" />
            <span>GitHub</span>
          </MagneticButton>

          <MagneticButton
            variant="primary"
            href="/resume.pdf"
          >
            <FileText className="w-4 h-4 text-cyan-300" />
            <span>Download Resume</span>
          </MagneticButton>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-white/10 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Vaibhav Solanki. All rights reserved.</div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with React, Tailwind & Three.js</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current inline ml-1" />
          </div>
        </div>
      </GlassmorphicCard>
    </section>
  );
};
