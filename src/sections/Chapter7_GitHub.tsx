import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, Star, GitPullRequest, Code } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { CountUp } from '../components/CountUp';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface Repo {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  url: string;
}

const featuredRepos: Repo[] = [
  {
    name: 'maitri-core',
    desc: 'AI Wellness Companion backend engine & personalization API.',
    lang: 'TypeScript',
    langColor: 'bg-blue-500',
    stars: 28,
    forks: 7,
    url: 'https://github.com/vaibhavsolanki/maitri-core',
  },
  {
    name: 'oasis-genai-suite',
    desc: 'Generative AI multimedia platform with browser video editor.',
    lang: 'Python',
    langColor: 'bg-amber-500',
    stars: 42,
    forks: 12,
    url: 'https://github.com/vaibhavsolanki/oasis-genai-suite',
  },
  {
    name: 'defnet-agents',
    desc: 'Autonomous cyber defense twin AI agents and world model runner.',
    lang: 'Python',
    langColor: 'bg-emerald-500',
    stars: 35,
    forks: 9,
    url: 'https://github.com/vaibhavsolanki/defnet-agents',
  },
  {
    name: 'icpc-cp-library',
    desc: 'Handcrafted algorithm templates & competitive programming implementations.',
    lang: 'C++',
    langColor: 'bg-purple-500',
    stars: 56,
    forks: 18,
    url: 'https://github.com/vaibhavsolanki/icpc-cp-library',
  },
];

export const Chapter7_GitHub: React.FC = () => {
  const days = Array.from({ length: 112 }, () => Math.floor(Math.random() * 5));

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-900 border border-slate-800';
      case 1: return 'bg-emerald-950 border border-emerald-900';
      case 2: return 'bg-emerald-800 border border-emerald-700';
      case 3: return 'bg-emerald-600 border border-emerald-500';
      case 4: return 'bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.6)]';
      default: return 'bg-slate-900';
    }
  };

  return (
    <section id="github" className="relative py-32 px-4 max-w-6xl mx-auto">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          CHAPTER 07
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent" />
      </div>

      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-2">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-xl font-light">
            Proof of relentless consistency. Code committed day after day.
          </p>
        </div>

        <a
          href="https://github.com/vaibhavsolanki"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-emerald-400 text-white font-mono text-xs transition-all shadow-lg hover:shadow-emerald-500/20"
        >
          <GithubIcon className="w-4 h-4 text-emerald-400" />
          <span>@vaibhavsolanki</span>
        </a>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassmorphicCard glowColor="purple" className="p-4 text-center">
          <GitCommit className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={1280} suffix="+" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">Total Commits</span>
        </GlassmorphicCard>

        <GlassmorphicCard glowColor="cyan" className="p-4 text-center">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={160} suffix="+" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">Stars Earned</span>
        </GlassmorphicCard>

        <GlassmorphicCard glowColor="blue" className="p-4 text-center">
          <GitPullRequest className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={45} suffix="+" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">PRs Merged</span>
        </GlassmorphicCard>

        <GlassmorphicCard glowColor="amber" className="p-4 text-center">
          <Code className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={32} suffix="" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">Repositories</span>
        </GlassmorphicCard>
      </div>

      {/* Contribution Heatmap Container */}
      <GlassmorphicCard glowColor="cyan" className="p-6 mb-12 border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>1,280 contributions in 2026</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-800" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2 no-scrollbar">
          {days.map((level, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.003 }}
              className={`w-3.5 h-3.5 rounded-sm ${getColorClass(level)} hover:scale-125 transition-transform cursor-pointer`}
              title={`Contribution level: ${level}`}
            />
          ))}
        </div>
      </GlassmorphicCard>

      {/* Featured Repositories Grid */}
      <h3 className="font-display text-2xl font-bold text-white mb-6">
        Featured Repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredRepos.map((repo, i) => (
          <GlassmorphicCard key={i} glowColor="purple" className="border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-base font-bold text-cyan-300 hover:underline flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4 text-slate-400" />
                  <span>{repo.name}</span>
                </a>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  Public
                </span>
              </div>
              <p className="text-slate-300 text-xs font-light leading-relaxed mb-4">
                {repo.desc}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                <span>{repo.lang}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                  {repo.forks}
                </span>
              </div>
            </div>
          </GlassmorphicCard>
        ))}
      </div>
    </section>
  );
};
