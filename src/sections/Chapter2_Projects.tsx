import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Star, GitBranch, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { useGitHub } from '../hooks/useGitHub';
import { useTheme } from '../context/ThemeContext';
import { formatRelativeTime } from '../services/github';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  tech: string[];
  highlights: string[];
  gradient: string;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'amber' | 'pink';
  githubUrl?: string;
  liveUrl?: string;
  status: string;
}

const featuredProjects: Project[] = [
  {
    id: 'maitri',
    title: 'MAITRI',
    subtitle: 'AI Wellness Companion',
    role: 'Founder & CEO',
    description:
      'AI-powered mental wellness companion with personalized health tracking and emotion processing.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'Tailwind', 'LLMs'],
    highlights: [
      'Leading 4-person eng team',
      '12 active beta testers',
      'Real-time AI personalization',
    ],
    gradient: 'from-red-600/30 via-red-950/20 to-zinc-900/30',
    glowColor: 'pink',
    githubUrl: 'https://github.com/Vaibhavsolanki1/Maitriv2.0',
    liveUrl: 'https://maitri-theta.vercel.app',
    status: 'Flagship Startup',
  },
  {
    id: 'oasis',
    title: 'Oasis',
    subtitle: 'AI Multimedia Generation Suite',
    role: 'Frontend Developer',
    description:
      'GenAI platform — video generation, diffusion pipelines, AI music, and a browser-based timeline editor.',
    tech: ['React', 'TypeScript', 'Python', 'Web Audio API', 'Diffusers', 'FastAPI'],
    highlights: [
      'Web timeline editor',
      'Real-time diffusion previews',
      'Multi-modal generation pipeline',
    ],
    gradient: 'from-zinc-600/30 via-zinc-800/20 to-red-950/30',
    glowColor: 'pink',
    githubUrl: 'https://github.com/Vaibhavsolanki1/Oasis',
    status: 'AI Platform',
  },
  {
    id: 'defnet',
    title: 'DefNet',
    subtitle: 'Autonomous Cyber Defense',
    role: 'Creator & Architect',
    description:
      'Twin AI agents with knowledge graphs to predict, simulate, and defend against cyber attacks.',
    tech: ['Python', 'Knowledge Graphs', 'PyTorch', 'FastAPI', 'Docker', 'React'],
    highlights: [
      'Dual-agent adversarial simulation',
      'Graph-based attack modeling',
      'Automated mitigation dispatch',
    ],
    gradient: 'from-red-700/30 via-zinc-900/20 to-zinc-800/30',
    glowColor: 'pink',
    githubUrl: 'https://github.com/Vaibhavsolanki1/Defenet',
    status: 'Cybersecurity AI',
  },
  {
    id: 'student-passport',
    title: 'Student Passport',
    subtitle: 'Web3 Digital Identity',
    role: 'Lead Developer',
    description:
      'Decentralized protocol for tamper-proof academic credentials and student NFTs.',
    tech: ['Solidity', 'React', 'Ethers.js', 'Polygon', 'IPFS', 'Tailwind'],
    highlights: [
      'Zero-knowledge proof verification',
      'Deployed on Polygon testnet',
      'Verifiable crypto diplomas',
    ],
    gradient: 'from-zinc-700/30 via-red-900/20 to-black',
    glowColor: 'pink',
    githubUrl: 'https://github.com/Vaibhavsolanki1/passport',
    status: 'Web3 & Identity',
  },
];

const ProjectMockupFrame = ({ id, theme }: { id: string; theme: string }) => {
  const accentHex = theme === 'mono' ? '#ffffff' : theme === 'cosmic' ? '#ec4899' : '#ef4444';
  const accentDeepHex = theme === 'mono' ? '#d4d4d8' : theme === 'cosmic' ? '#a855f7' : '#dc2626';
  return (
    <div className="mb-5 rounded-xl bg-neutral-950/90 border border-white/10 overflow-hidden shadow-inner">
      {/* Window Chrome */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/80 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-zinc-600" />
          <span className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
          {id}.app
        </span>
      </div>

      {/* Tailored UI Preview Canvas */}
      <div className="h-24 px-4 py-3 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.06] via-transparent to-zinc-900/60 pointer-events-none" />

        {id === 'maitri' && (
          <div className="w-full flex items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[9px] font-mono text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                EMOTION SYNC
              </div>
              <div className="text-[11px] font-mono text-zinc-300">Wellness Index: <span className="text-white font-bold">94%</span></div>
            </div>
            <svg viewBox="0 0 120 40" className="w-32 h-12 text-red-500 overflow-visible">
              <path
                d="M 0 24 Q 15 8, 30 22 T 60 18 T 90 12 T 120 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="90" cy="12" r="3" fill="#ffffff" stroke={accentHex} strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {id === 'oasis' && (
          <div className="w-full space-y-2 relative z-10">
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
              <span>TIMELINE // 00:14:08</span>
              <span className="text-red-400">DIFFUSION 60FPS</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-3 rounded bg-zinc-900 border border-white/10 flex items-center px-1 gap-1">
                <div className="h-1.5 w-1/3 rounded-sm bg-red-600/80" />
                <div className="h-1.5 w-1/4 rounded-sm bg-zinc-500/70" />
                <div className="h-1.5 w-1/5 rounded-sm bg-red-400/60" />
              </div>
              <div className="flex items-end gap-1 h-5">
                {[35, 65, 90, 50, 80, 95, 60, 40, 75, 85, 55, 70, 45, 88].map((h, i) => (
                  <div key={i} className="flex-1 bg-red-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {id === 'defnet' && (
          <div className="w-full flex items-center justify-between gap-3 relative z-10">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-red-400">TWIN AGENT DEFENSE</div>
              <div className="text-[11px] font-mono text-zinc-300">0 Threats Active</div>
              <div className="text-[9px] font-mono text-zinc-500">Knowledge Graph: Synced</div>
            </div>
            <svg viewBox="0 0 90 50" className="w-24 h-12">
              <line x1="15" y1="25" x2="45" y2="10" stroke="#52525b" strokeWidth="1" />
              <line x1="15" y1="25" x2="45" y2="40" stroke="#52525b" strokeWidth="1" />
              <line x1="45" y1="10" x2="75" y2="25" stroke={accentHex} strokeWidth="1.5" />
              <line x1="45" y1="40" x2="75" y2="25" stroke={accentHex} strokeWidth="1.5" />
              <circle cx="15" cy="25" r="4" fill="#ffffff" />
              <circle cx="45" cy="10" r="4" fill={accentHex} />
              <circle cx="45" cy="40" r="4" fill="#a1a1aa" />
              <circle cx="75" cy="25" r="5" fill={accentDeepHex} stroke="#ffffff" strokeWidth="1" />
            </svg>
          </div>
        )}

        {id === 'student-passport' && (
          <div className="w-full flex items-center justify-between gap-3 relative z-10">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-zinc-400">POLYGON // ZK-VERIFIED</div>
              <div className="text-xs font-mono font-bold text-white">0x7F4A...91C2</div>
              <div className="text-[9px] font-mono text-red-400">● Soulbound Credential</div>
            </div>
            <div className="w-12 h-12 rounded-lg border border-red-500/40 bg-red-500/10 flex items-center justify-center font-mono text-xs font-bold text-white">
              SBT
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Chapter2_Projects = () => {
  const [activeProject, setActiveProject] = useState<string>(featuredProjects[0].id);
  const [viewMode, setViewMode] = useState<'featured' | 'live'>('featured');
  const { repos, isLive, isLoading } = useGitHub('vaibhavsolanki1');
  const { theme } = useTheme();

  return (
    <section id="projects" className="relative py-14 sm:py-16 px-4 max-w-6xl mx-auto w-full">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 02
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </motion.div>

      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-red-500/30 text-red-300 text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{isLive ? 'LIVE GITHUB DATA LINKED' : isLoading ? 'SYNCING GITHUB REPOS...' : 'PROJECTS DIRECTORY'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-3">
            Engineering & <span className="text-gradient">Creations</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light">
            Flagship products & live GitHub repos.
          </p>
        </div>

        {/* View Mode Toggle Pill */}
        <div className="inline-flex p-1 rounded-full bg-neutral-950 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setViewMode('featured')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'featured'
                ? 'bg-red-600 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Systems</span>
          </button>

          <button
            onClick={() => setViewMode('live')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'live'
                ? 'bg-red-600 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Live Repositories</span>
            {repos.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
                {repos.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'featured' ? (
          /* View 1: Featured Architectures with Live GitHub Telemetry */
          <motion.div
            key="featured-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {featuredProjects.map((proj, idx) => {
              const isSelected = activeProject === proj.id;
              // Check if there is live data matching this project
              const liveMatch = repos.find(
                (r) =>
                  r.name.toLowerCase() === proj.id.toLowerCase() ||
                  (proj.githubUrl && proj.githubUrl.toLowerCase().includes(r.name.toLowerCase()))
              );
              const activeLiveUrl =
                proj.liveUrl ||
                (liveMatch?.homepage && liveMatch.homepage.startsWith('http')
                  ? liveMatch.homepage
                  : undefined);

              return (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setActiveProject(proj.id)}
                  className="cursor-pointer"
                >
                  <GlassmorphicCard
                    glowColor="pink"
                    className={`h-full border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between ${
                      isSelected ? 'border-red-500/60 bg-neutral-900/90' : ''
                    }`}
                  >
                    <div>
                      {/* Hologram Card Top Accent */}
                      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${proj.gradient}`} />

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20">
                          {proj.status}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{proj.role}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-display text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                          {proj.title}
                        </h3>
                        {liveMatch && (
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-neutral-950 px-2 py-0.5 rounded border border-white/5">
                            <span className="flex items-center gap-1 text-zinc-300">
                              <Star className="w-3 h-3 text-red-500" />
                              {liveMatch.stars}
                            </span>
                            <span className="flex items-center gap-1 text-red-400">
                              <GitBranch className="w-3 h-3" />
                              {liveMatch.forks}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs font-medium text-zinc-400 mb-4">{proj.subtitle}</p>

                      <ProjectMockupFrame id={proj.id} theme={theme} />

                      <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light">
                        {proj.description}
                      </p>

                      {/* Highlights Bullet List */}
                      <div className="space-y-2 mb-6 bg-neutral-950/60 p-3.5 rounded-xl border border-white/5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                          Key Achievements:
                        </span>
                        {proj.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                            <Sparkles className="w-3 h-3 text-red-500 flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.tech.map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-900 text-zinc-300 border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-zinc-200 hover:text-white hover:border-red-500/60 text-xs font-medium transition-all group/btn"
                          data-cursor
                          data-cursor-text="Code"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-red-400 transition-colors" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {activeLiveUrl && (
                        <a
                          href={activeLiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all group/btn"
                          data-cursor
                          data-cursor-text="Live"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* View 2: Live Repositories directly from GitHub */
          <motion.div
            key="live-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.length > 0 ? (
              repos.map((repo) => {
                return (
                  <GlassmorphicCard
                    key={repo.id}
                    glowColor="pink"
                    className="border-white/10 flex flex-col justify-between hover:border-red-500/40 transition-colors p-5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-red-500" />
                          <span className="font-mono text-xs font-bold text-white truncate max-w-[180px]">
                            {repo.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                          ● Active
                        </span>
                      </div>

                      <p className="text-zinc-300 text-xs font-light leading-relaxed mb-4 line-clamp-3">
                        {repo.description || 'Public repository on GitHub.'}
                      </p>

                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {repo.topics.slice(0, 3).map((topic, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span>{repo.language || 'Code'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Star className="w-3 h-3 text-red-500" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1 text-red-400">
                            <GitBranch className="w-3 h-3" />
                            {repo.forks}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            {formatRelativeTime(repo.pushedAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-zinc-200 hover:text-white text-xs font-mono transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-200 hover:text-white text-xs font-mono transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassmorphicCard>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 glass-panel rounded-2xl border-white/10">
                <GithubIcon className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
                <p className="text-zinc-400 text-sm font-mono">
                  Loading live repositories from GitHub...
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
