import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Check, Copy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { MagneticButton } from '../components/MagneticButton';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { useTheme } from '../context/ThemeContext';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';
  const email = 'vaibhavsolankijee@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: isMono
        ? ['#ffffff', '#d4d4d8', '#71717a']
        : isCosmic
        ? ['#ec4899', '#a855f7', '#ffffff']
        : ['#ef4444', '#ffffff', '#71717a'],
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative py-14 sm:py-16 px-4 max-w-5xl mx-auto w-full">
      <GlassmorphicCard glowColor="pink" className="p-8 sm:p-12 text-center border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>START A CONVERSATION</span>
        </motion.div>

        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          Let's Build Something <br />
          <span className="text-gradient">Amazing Together</span>
        </h2>

        <p className="text-neutral-300 text-base sm:text-lg max-w-xl mx-auto font-light mb-10 leading-relaxed">
          Looking for an engineer, building an AI startup, or want to collaborate? Let's talk.
        </p>

        {/* Email Copy Card */}
        <div className="inline-flex items-center gap-3 p-2 pl-5 rounded-full bg-neutral-950 border border-white/10 shadow-2xl mb-10 max-w-full">
          <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs sm:text-sm text-neutral-200 hover:text-red-400 transition-colors truncate"
            title="Click to send email"
          >
            {email}
          </a>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono text-xs transition-colors cursor-pointer"
            data-cursor
            data-cursor-text="Copy"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
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
            href="https://www.linkedin.com/in/vaibhav-solanki-b5790b253"
            aria-label="Visit LinkedIn profile"
          >
            <LinkedinIcon className="w-4 h-4 text-red-500" />
            <span>LinkedIn</span>
          </MagneticButton>

          <MagneticButton
            variant="glass"
            href="https://github.com/vaibhavsolanki1"
            aria-label="Visit GitHub profile"
          >
            <GithubIcon className="w-4 h-4 text-zinc-300" />
            <span>GitHub</span>
          </MagneticButton>

          {/* TODO: Add your resume.pdf to the public/ directory */}
          <MagneticButton
            variant="primary"
            href="/resume.pdf"
            aria-label="Download resume PDF"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Download Resume</span>
          </MagneticButton>
        </div>
      </GlassmorphicCard>
    </section>
  );
};
