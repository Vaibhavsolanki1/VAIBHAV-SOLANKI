import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Brain, Flag, Cpu, ExternalLink } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { useCodeforces } from '../hooks/useCodeforces';
import { useTheme } from '../context/ThemeContext';

export const Chapter6_Beyond = () => {
  const [carPos, setCarPos] = useState(0);
  const cf = useCodeforces('vaibhav2927');
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';
  const accentHex = isMono ? '#ffffff' : isCosmic ? '#ec4899' : '#ef4444';

  const triggerF1Drive = () => {
    setCarPos(100);
    setTimeout(() => setCarPos(0), 2000);
  };

  return (
    <section id="beyond" className="relative py-14 sm:py-16 px-4 max-w-6xl mx-auto w-full overflow-hidden">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 06
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </motion.div>

      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Beyond <span className="text-gradient">Coding</span>
        </h2>
        <p className="text-zinc-300 text-lg max-w-2xl font-light">
          What fuels the engineering beyond the editor.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Chess & Strategy */}
        <GlassmorphicCard glowColor="pink" className="border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/20">
              Strategy & Focus
            </span>
            <Trophy className="w-5 h-5 text-red-500" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Chess & Mind Games
          </h3>
          <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
            College Chess Club founder. Tactical thinking and pattern recognition under pressure.
          </p>

          {/* Mini Interactive 4x4 Chess Board Visualizer */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-white/10 max-w-xs mx-auto">
            <div className="text-[10px] font-mono text-zinc-400 mb-2 text-center uppercase tracking-wider">
              Chess Board Visualizer
            </div>
            <div className="grid grid-cols-4 gap-1 w-40 h-40 mx-auto border border-red-500/30 p-1 bg-neutral-900 rounded">
              {[...Array(16)].map((_, i) => {
                const isBlack = (Math.floor(i / 4) + (i % 4)) % 2 === 1;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    className={`flex items-center justify-center rounded text-xs transition-colors ${
                      isBlack ? 'bg-red-950/60 text-red-300' : 'bg-white/10 text-white'
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
        <GlassmorphicCard glowColor="pink" className="border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                Aerodynamics & Speed
              </span>
              <Flag className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Formula 1 & Telemetry
            </h3>
            <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
              High-speed telemetry, pit strategy, and aerodynamic precision.
            </p>
          </div>

          {/* Interactive F1 Drive Track */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
              <span>Track Telemetry</span>
              <button
                onClick={triggerF1Drive}
                className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors cursor-pointer"
              >
                Launch DRS
              </button>
            </div>

            <div className="relative h-10 bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 flex items-center px-2">
              <div className="absolute inset-x-0 top-1/2 h-0.5 border-b border-dashed border-neutral-700" />
              <motion.div
                animate={{ x: carPos === 100 ? 320 : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="relative z-10 flex items-center"
              >
                <svg
                  viewBox="0 0 48 20"
                  className={`w-9 h-4 text-red-500 ${
                    isMono
                      ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                      : isCosmic
                      ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.65)]'
                      : 'drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                  }`}
                >
                  <path d="M4 13 L12 8 L28 8 L40 11 L46 13 L46 15 L4 15 Z" fill="currentColor" />
                  <rect x="2" y="10" width="4" height="3" rx="0.5" fill="#ffffff" />
                  <circle cx="13" cy="15.5" r="3" fill="#0a0a0a" stroke="#ffffff" strokeWidth="1.2" />
                  <circle cx="37" cy="15.5" r="3" fill="#0a0a0a" stroke="#ffffff" strokeWidth="1.2" />
                </svg>
              </motion.div>
            </div>
          </div>
        </GlassmorphicCard>

        {/* Card 3: Competitive Programming (Live Codeforces Integration) */}
        <GlassmorphicCard glowColor="pink" className="border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/20">
                  Algorithmic Rigor
                </span>
                {cf.isLive && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Live API
                  </span>
                )}
              </div>
              <a
                href="https://codeforces.com/profile/vaibhav2927"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                title="View Codeforces Profile"
                aria-label="Codeforces Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-2xl font-bold text-white">
                Competitive Programming
              </h3>
              <a
                href="https://codeforces.com/profile/vaibhav2927"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-red-400 hover:underline"
              >
                @vaibhav2927
              </a>
            </div>

            <p className="text-zinc-300 text-sm font-light leading-relaxed mb-5">
              Algorithmic problem solving under strict time & memory bounds.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-950/80 border border-white/10 mb-4 text-center">
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Rating</div>
                <div className="font-syncopate font-bold text-lg text-white">
                  {cf.user?.rating ?? 1056}
                </div>
              </div>
              <div className="border-x border-white/10">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Rank</div>
                <div className="font-mono font-bold text-xs sm:text-sm text-red-400 uppercase">
                  {cf.user?.rank ?? 'NEWBIE'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Solved</div>
                <div className="font-syncopate font-bold text-lg text-white">
                  {cf.totalSolved}+
                </div>
              </div>
            </div>

            {/* Real Rating Progression SVG Line Chart */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-white/10">
              <div className="text-xs font-mono text-zinc-400 mb-3 flex justify-between items-center">
                <span>Codeforces Rating Growth</span>
                <span className="text-red-400 font-bold font-mono">
                  {cf.user?.maxRating ?? cf.user?.rating ?? 1056} Peak
                </span>
              </div>
              {(() => {
                const points = cf.contests.length > 0 ? cf.contests : [];
                const width = 320;
                const height = 84;
                const padX = 12;
                const padY = 12;
                const maxVal = Math.max(...points.map((x) => x.newRating), 1150);
                const minVal = Math.min(...points.map((x) => x.newRating), 300);
                const span = Math.max(maxVal - minVal, 100);
                const coords = points.map((c, idx) => {
                  const x =
                    points.length === 1
                      ? width / 2
                      : padX + (idx / (points.length - 1)) * (width - padX * 2);
                  const y =
                    height - padY - ((c.newRating - minVal) / span) * (height - padY * 2);
                  return { x, y, c };
                });
                const linePath = coords
                  .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
                  .join(' ');
                const areaPath =
                  coords.length > 0
                    ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${height} L ${coords[0].x.toFixed(1)} ${height} Z`
                    : '';

                return (
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24 overflow-visible">
                    <defs>
                      <linearGradient id="cfAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accentHex} stopOpacity="0.35" />
                        <stop offset="100%" stopColor={accentHex} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Subtle horizontal guide lines */}
                    <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1={padX} y1={height / 2} x2={width - padX} y2={height / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    {areaPath && <path d={areaPath} fill="url(#cfAreaGrad)" />}
                    {linePath && (
                      <motion.path
                        d={linePath}
                        fill="none"
                        stroke={accentHex}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: 'easeOut' }}
                      />
                    )}
                    {coords.map(({ x, y, c }, idx) => (
                      <g key={c.contestId ?? idx} className="group cursor-pointer">
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#0a0a0a"
                          stroke={accentHex}
                          strokeWidth="2"
                        >
                          <title>{`${c.contestName}\nRating: ${c.newRating}\nRank: #${c.rank}`}</title>
                        </circle>
                      </g>
                    ))}
                  </svg>
                );
              })()}
              <div className="flex justify-between items-center mt-2 text-[9px] font-mono text-zinc-500">
                <span>
                  {cf.contests[0] ? `Start (${cf.contests[0].newRating})` : 'R1111 (371)'}
                </span>
                <span>
                  {cf.contests.length > 0
                    ? `${cf.contests.length} Rated Rounds`
                    : '6 Rated Rounds'}
                </span>
                <span>
                  {cf.contests[cf.contests.length - 1]
                    ? `Latest (${cf.contests[cf.contests.length - 1].newRating})`
                    : 'R1120 (1056)'}
                </span>
              </div>
            </div>

            {/* Algorithmic Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cf.topTags.map((t) => (
                <span
                  key={t.tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
                >
                  #{t.tag} ({t.count})
                </span>
              ))}
            </div>
          </div>
        </GlassmorphicCard>

        {/* Card 4: AI Research */}
        <GlassmorphicCard glowColor="pink" className="border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-zinc-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
              Neural Frontiers
            </span>
            <Brain className="w-5 h-5 text-red-500" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            AI & World Models
          </h3>
          <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
            Agentic AI, diffusion models, knowledge graphs.
          </p>

          {/* Neural Net Nodes Graphic */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-white/10 text-center">
            <div className="inline-flex items-center gap-3 text-red-300 font-mono text-xs py-2 px-4 rounded-full bg-red-500/10 border border-red-500/20">
              <Cpu className="w-4 h-4 text-red-500" />
              <span>Neural Graph Active</span>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </section>
  );
};
