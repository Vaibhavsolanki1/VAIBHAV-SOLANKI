import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, Brain, Flag, Cpu } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

export const Chapter6_Beyond: React.FC = () => {
  const [carPos, setCarPos] = useState(0);

  const triggerF1Drive = () => {
    setCarPos(100);
    setTimeout(() => setCarPos(0), 2000);
  };

  return (
    <section id="beyond" className="relative py-32 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-pink-500/10 border border-pink-500/30 text-pink-400">
          CHAPTER 06
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-pink-500/30 to-transparent" />
      </div>

      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Beyond <span className="text-gradient-cyan">Coding</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl font-light">
          Engineering is fueled by strategic thinking, speed, and analytical passions outside the code editor.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Chess & Strategy */}
        <GlassmorphicCard glowColor="amber" className="border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              Strategy & Focus
            </span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Chess & Mind Games
          </h3>
          <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
            Founder & President of the College Chess Club. Chess sharpens tactical foresight, pattern recognition, and decision making under time pressure.
          </p>

          {/* Mini Interactive 4x4 Chess Board Visualizer */}
          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 max-w-xs mx-auto">
            <div className="text-[10px] font-mono text-slate-400 mb-2 text-center uppercase tracking-wider">
              Chess Board Visualizer
            </div>
            <div className="grid grid-cols-4 gap-1 w-40 h-40 mx-auto border border-amber-500/30 p-1 bg-slate-900 rounded">
              {[...Array(16)].map((_, i) => {
                const isBlack = (Math.floor(i / 4) + (i % 4)) % 2 === 1;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    className={`flex items-center justify-center rounded text-xs transition-colors ${
                      isBlack ? 'bg-amber-900/60 text-amber-200' : 'bg-amber-100/20 text-white'
                    }`}
                  >
                    {i === 0 ? '♔' : i === 15 ? '♚' : i === 5 ? '♘' : i === 10 ? '♝' : ''}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GlassmorphicCard>

        {/* Card 2: Formula 1 */}
        <GlassmorphicCard glowColor="cyan" className="border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                Aerodynamics & Speed
              </span>
              <Flag className="w-5 h-5 text-cyan-400" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Formula 1 & Telemetry
            </h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
              Fascinated by high-speed telemetry, pit stop strategy, and aerodynamic precision engineering.
            </p>
          </div>

          {/* Interactive F1 Drive Track */}
          <div className="bg-slate-950 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span>Track Telemetry</span>
              <button
                onClick={triggerF1Drive}
                className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
              >
                Launch DRS 🏎️
              </button>
            </div>

            <div className="relative h-10 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center px-2">
              <div className="absolute inset-x-0 top-1/2 h-0.5 border-b border-dashed border-slate-700" />
              <motion.div
                animate={{ x: carPos === 100 ? 320 : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="relative z-10 text-xl"
              >
                🏎️
              </motion.div>
            </div>
          </div>
        </GlassmorphicCard>

        {/* Card 3: Competitive Programming */}
        <GlassmorphicCard glowColor="purple" className="border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
              Algorithmic Rigor
            </span>
            <Activity className="w-5 h-5 text-purple-400" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Competitive Programming
          </h3>
          <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
            Solving complex algorithmic problems under strict memory and time bounds on Codeforces, LeetCode, and preparing for ICPC.
          </p>

          {/* Rating Progress Graph Bar Visual */}
          <div className="bg-slate-950 p-4 rounded-xl border border-white/10">
            <div className="text-xs font-mono text-slate-400 mb-3 flex justify-between">
              <span>Codeforces Rating Growth</span>
              <span className="text-purple-400 font-bold">1450+ Rating</span>
            </div>
            <div className="flex items-end gap-2 h-20 pt-2">
              {[40, 55, 70, 65, 80, 95].map((val, i) => (
                <div key={i} className="flex-1 bg-slate-900 rounded-t overflow-hidden flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t"
                  />
                </div>
              ))}
            </div>
          </div>
        </GlassmorphicCard>

        {/* Card 4: AI Research */}
        <GlassmorphicCard glowColor="blue" className="border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
              Neural Frontiers
            </span>
            <Brain className="w-5 h-5 text-blue-400" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            AI & World Models
          </h3>
          <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
            Exploring agentic AI systems, diffusion architectures, knowledge graphs, and human-computer cognitive resonance.
          </p>

          {/* Neural Net Nodes Graphic */}
          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-center">
            <div className="inline-flex items-center gap-3 text-cyan-300 font-mono text-xs py-2 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 animate-pulse">
              <Cpu className="w-4 h-4" />
              <span>Neural Graph Active</span>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </section>
  );
};
