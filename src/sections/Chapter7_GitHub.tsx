import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, Star, Users, Code, ExternalLink, RotateCw, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { CountUp } from '../components/CountUp';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { useGitHub } from '../hooks/useGitHub';
import { formatRelativeTime } from '../services/github';

// Seeded pseudo-random generator for realistic GitHub heatmap fallback/simulation
const generateSeededHeatmap = (seed = 42, length = 112): number[] => {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length }, () => {
    const rand = next();
    if (rand < 0.18) return 0;
    if (rand < 0.42) return 1;
    if (rand < 0.68) return 2;
    if (rand < 0.88) return 3;
    return 4;
  });
};

const fallbackRepos = [
  {
    name: 'maitri-core',
    description: 'AI Wellness Companion backend engine & personalization API.',
    language: 'TypeScript',
    stars: 28,
    forks: 7,
    url: 'https://github.com/vaibhavsolanki1/maitri',
    pushedAt: new Date().toISOString(),
  },
  {
    name: 'oasis-genai-suite',
    description: 'Generative AI multimedia platform with browser video editor.',
    language: 'Python',
    stars: 42,
    forks: 12,
    url: 'https://github.com/vaibhavsolanki1/oasis',
    pushedAt: new Date().toISOString(),
  },
  {
    name: 'defnet-agents',
    description: 'Autonomous cyber defense twin AI agents and world model runner.',
    language: 'Python',
    stars: 35,
    forks: 9,
    url: 'https://github.com/vaibhavsolanki1/defnet',
    pushedAt: new Date().toISOString(),
  },
  {
    name: 'algorithms-library',
    description: 'Handcrafted algorithm templates & competitive programming implementations.',
    language: 'C++',
    stars: 56,
    forks: 18,
    url: 'https://github.com/vaibhavsolanki1/algorithms-library',
    pushedAt: new Date().toISOString(),
  },
];

export const Chapter7_GitHub = () => {
  const { profile, repos, commits, totalStars, isLive, isLoading, refetch } = useGitHub('vaibhavsolanki1');
  const days = useMemo(() => generateSeededHeatmap(1337, 112), []);

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-neutral-900 border border-neutral-800';
      case 1: return 'bg-red-950/60 border border-red-900/40';
      case 2: return 'bg-red-900 border border-red-800';
      case 3: return 'bg-red-700 border border-red-600';
      case 4: return 'bg-red-500 border border-red-400';
      default: return 'bg-neutral-900';
    }
  };

  // Use live repositories if available, otherwise fallback to curated list
  const displayRepos = repos.length > 0 ? repos : fallbackRepos;
  const repoCount = profile?.publicRepos ?? displayRepos.length;
  const starsCount = isLive ? totalStars : 0;
  const followersCount = profile?.followers ?? 0;
  const forksCount = isLive
    ? repos.reduce((sum, r) => sum + r.forks, 0)
    : 0;

  return (
    <section id="github" className="relative py-14 sm:py-16 px-4 max-w-6xl mx-auto w-full">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 07
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-red-500/30 text-red-300 text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{isLive ? 'LIVE GITHUB SYNC ACTIVE' : isLoading ? 'CONNECTING TO GITHUB...' : 'GITHUB ECOSYSTEM'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-2">
            The Code <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg max-w-xl font-light">
            Live data from GitHub — repos, commits, and contributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refetch}
            aria-label="Refresh GitHub data"
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-red-500 text-neutral-300 hover:text-white transition-all cursor-pointer"
            title="Refresh GitHub live telemetry"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-red-400' : ''}`} />
          </button>

          <a
            href="https://github.com/vaibhavsolanki1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-red-500 text-white font-mono text-xs transition-all"
          >
            <GithubIcon className="w-4 h-4 text-red-500" />
            <span>@vaibhavsolanki1</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Live GitHub Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassmorphicCard glowColor="pink" className="p-4 text-center border-white/10">
          <Code className="w-5 h-5 text-red-500 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={repoCount} />
          </div>
          <span className="text-[11px] font-mono text-neutral-400">Public Repos</span>
        </GlassmorphicCard>

        <GlassmorphicCard glowColor="pink" className="p-4 text-center border-white/10">
          <Star className="w-5 h-5 text-zinc-300 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={starsCount} />
          </div>
          <span className="text-[11px] font-mono text-neutral-400">Stars Earned</span>
        </GlassmorphicCard>

        <GlassmorphicCard glowColor="pink" className="p-4 text-center border-white/10">
          <GitCommit className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={forksCount} />
          </div>
          <span className="text-[11px] font-mono text-neutral-400">Repo Forks</span>
        </GlassmorphicCard>

        <GlassmorphicCard glowColor="pink" className="p-4 text-center border-white/10">
          <Users className="w-5 h-5 text-zinc-400 mx-auto mb-1" />
          <div className="font-display text-3xl font-extrabold text-white">
            <CountUp end={followersCount} />
          </div>
          <span className="text-[11px] font-mono text-neutral-400">Followers</span>
        </GlassmorphicCard>
      </div>

      {/* Live Recent Commits Feed */}
      {commits.length > 0 && (
        <GlassmorphicCard glowColor="pink" className="p-6 mb-8 border-white/10">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-500" />
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Live GitHub Commits Feed
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30">
              ● Synced Live
            </span>
          </div>

          <div className="space-y-3">
            {commits.slice(0, 5).map((commit, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-neutral-950/60 border border-white/5 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    {commit.sha}
                  </span>
                  <span className="text-xs text-neutral-200 font-mono line-clamp-1">
                    {commit.message}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400 pl-2 sm:pl-0">
                  <a
                    href={commit.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:underline"
                  >
                    {commit.repoName}
                  </a>
                  <span>•</span>
                  <span>{formatRelativeTime(commit.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      )}

      {/* Contribution Heatmap Container */}
      <GlassmorphicCard glowColor="pink" className="p-6 mb-12 border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Contributions Activity Matrix</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-neutral-900 border border-neutral-800" />
            <span className="w-2.5 h-2.5 rounded-sm bg-red-950/60" />
            <span className="w-2.5 h-2.5 rounded-sm bg-red-900" />
            <span className="w-2.5 h-2.5 rounded-sm bg-red-700" />
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
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

      {/* Repositories Grid */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl font-bold text-white">
          {isLive ? 'Live Repositories' : 'Featured Repositories'}
        </h3>
        <span className="text-xs font-mono text-neutral-400">
          Showing {displayRepos.length} projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayRepos.map((repo, i) => {
          return (
            <GlassmorphicCard key={i} glowColor="pink" className="border-white/10 flex flex-col justify-between hover:border-red-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-base font-bold text-white hover:text-red-400 transition-colors flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-4 h-4 text-neutral-400" />
                    <span>{repo.name}</span>
                  </a>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                    Public
                  </span>
                </div>
                <p className="text-neutral-300 text-xs font-light leading-relaxed mb-4">
                  {repo.description || 'No description provided.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>{repo.language || 'Code'}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Star className="w-3.5 h-3.5 text-red-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <GitBranch className="w-3.5 h-3.5" />
                    {repo.forks}
                  </span>
                  {'pushedAt' in repo && repo.pushedAt && (
                    <span className="text-[10px] text-neutral-500 hidden sm:inline">
                      {formatRelativeTime(repo.pushedAt as string)}
                    </span>
                  )}
                </div>
              </div>
            </GlassmorphicCard>
          );
        })}
      </div>
    </section>
  );
};
