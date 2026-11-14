import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Terminal,
  FileCode,
  Cpu,
  Braces,
  Layers,
  Server,
  Database,
  Zap,
  Brain,
  Bot,
  Network,
  Wand2,
  Box,
  Activity,
  Share2,
  X,
  Star,
  GitBranch,
  ExternalLink,
} from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { GithubIcon } from '../components/Icons';
import { useGitHub } from '../hooks/useGitHub';
import { useTheme } from '../context/ThemeContext';
import { formatRelativeTime } from '../services/github';
import { stopSmoothScroll, startSmoothScroll } from '../components/SmoothScroll';

interface Skill {
  name: string;
  category: 'AI & ML' | 'Languages' | 'Fullstack' | 'Data & Infra';
  proficiency: number;
  level: string;
  usedIn: string[];
  keywords: string[];
  color: string;
  glow: string;
  icon: ReactNode;
}

interface CuratedRepo {
  name: string;
  description: string;
  language: string;
  url: string;
  tags: string[];
}

const curatedRepos: CuratedRepo[] = [
  {
    name: 'maitri',
    description: 'AI-powered mental wellness companion with emotion processing, LLM personalization, and PostgreSQL telemetry.',
    language: 'TypeScript / Python',
    url: 'https://github.com/vaibhavsolanki1/maitri',
    tags: ['maitri', 'llm', 'agents', 'rag', 'vectors', 'python', 'typescript', 'node.js', 'postgresql', 'supabase'],
  },
  {
    name: 'oasis',
    description: 'GenAI multimedia generation suite with diffusion pipelines, AI audio synthesis, and browser timeline editor.',
    language: 'Python / React',
    url: 'https://github.com/vaibhavsolanki1/oasis',
    tags: ['oasis', 'diffusers', 'python', 'typescript', 'react', 'fastapi', 'genai', 'ml'],
  },
  {
    name: 'defnet',
    description: 'Autonomous cyber defense platform powered by twin AI agents, PyTorch, knowledge graphs, and Docker.',
    language: 'Python',
    url: 'https://github.com/vaibhavsolanki1/defnet',
    tags: ['defnet', 'pytorch', 'knowledge graphs', 'agents', 'llm', 'python', 'fastapi', 'docker', 'react', 'scikit-learn'],
  },
  {
    name: 'student-passport',
    description: 'Decentralized Web3 digital identity protocol for verifiable academic credentials on Polygon.',
    language: 'TypeScript / Solidity',
    url: 'https://github.com/vaibhavsolanki1/student-passport',
    tags: ['student passport', 'react', 'typescript', 'web3'],
  },
  {
    name: 'algorithms-library',
    description: 'Competitive programming templates, graph theory, DP, and data structures in C++ and Java.',
    language: 'C++ / Java',
    url: 'https://github.com/vaibhavsolanki1/algorithms-library',
    tags: ['c++', 'java', 'dsa', 'algorithms', 'competitive programming'],
  },
];

const iconClass = 'w-6 h-6 text-zinc-200 group-hover:text-red-400 transition-colors';

const skills: Skill[] = [
  // AI & ML
  { name: 'PyTorch', category: 'AI & ML', proficiency: 92, level: 'Advanced', usedIn: ['DefNet', 'Neural Nets'], keywords: ['pytorch', 'torch', 'defnet', 'neural', 'deep', 'ml', 'ai'], color: 'from-red-600 to-zinc-400', glow: '#ef4444', icon: <Brain className={iconClass} /> },
  { name: 'LLMs & Agents', category: 'AI & ML', proficiency: 94, level: 'Advanced', usedIn: ['MAITRI', 'DefNet'], keywords: ['llm', 'agent', 'maitri', 'defnet', 'gpt', 'ai', 'langchain'], color: 'from-red-600 to-red-500', glow: '#ef4444', icon: <Bot className={iconClass} /> },
  { name: 'Diffusers', category: 'AI & ML', proficiency: 88, level: 'Proficient', usedIn: ['Oasis', 'GenAI Pipelines'], keywords: ['diffusers', 'diffusion', 'oasis', 'genai', 'stable', 'image', 'video'], color: 'from-zinc-400 to-red-500', glow: '#ef4444', icon: <Wand2 className={iconClass} /> },
  { name: 'Knowledge Graphs', category: 'AI & ML', proficiency: 89, level: 'Proficient', usedIn: ['DefNet', 'World Models'], keywords: ['knowledge graph', 'graph', 'defnet', 'world model', 'neo4j'], color: 'from-red-700 to-zinc-400', glow: '#ef4444', icon: <Network className={iconClass} /> },
  { name: 'RAG & Vectors', category: 'AI & ML', proficiency: 90, level: 'Advanced', usedIn: ['MAITRI', 'Semantic Search'], keywords: ['rag', 'vector', 'embedding', 'maitri', 'semantic', 'search', 'pgvector'], color: 'from-red-600 to-zinc-300', glow: '#ef4444', icon: <Share2 className={iconClass} /> },
  { name: 'Scikit-Learn', category: 'AI & ML', proficiency: 88, level: 'Proficient', usedIn: ['ML Pipelines', 'Telemetry'], keywords: ['scikit', 'sklearn', 'ml', 'telemetry', 'defnet', 'python'], color: 'from-zinc-500 to-red-600', glow: '#ef4444', icon: <Activity className={iconClass} /> },

  // Languages
  { name: 'Python', category: 'Languages', proficiency: 95, level: 'Expert', usedIn: ['Oasis', 'DefNet', 'MAITRI'], keywords: ['python', 'fastapi', 'oasis', 'defnet', 'maitri', 'ml', 'ai'], color: 'from-red-600 to-zinc-400', glow: '#ef4444', icon: <Terminal className={iconClass} /> },
  { name: 'TypeScript', category: 'Languages', proficiency: 90, level: 'Advanced', usedIn: ['MAITRI', 'Oasis', 'Portfolio'], keywords: ['typescript', 'react', 'maitri', 'oasis', 'portfolio', 'vite'], color: 'from-red-600 to-red-500', glow: '#ef4444', icon: <FileCode className={iconClass} /> },
  { name: 'C++', category: 'Languages', proficiency: 92, level: 'Advanced', usedIn: ['Competitive Programming', 'Algorithms'], keywords: ['c++', 'cpp', 'algorithm', 'dsa', 'competitive', 'codeforces'], color: 'from-red-500 to-zinc-400', glow: '#dc2626', icon: <Cpu className={iconClass} /> },
  { name: 'Java', category: 'Languages', proficiency: 88, level: 'Proficient', usedIn: ['DSA', 'Backend Architecture'], keywords: ['java', 'dsa', 'algorithm', 'spring', 'backend'], color: 'from-red-600 to-neutral-400', glow: '#ef4444', icon: <Braces className={iconClass} /> },

  // Fullstack
  { name: 'React', category: 'Fullstack', proficiency: 94, level: 'Advanced', usedIn: ['Oasis', 'Student Passport', 'Portfolio'], keywords: ['react', 'frontend', 'oasis', 'passport', 'portfolio', 'tailwind'], color: 'from-red-600 to-zinc-300', glow: '#ef4444', icon: <Layers className={iconClass} /> },
  { name: 'FastAPI', category: 'Fullstack', proficiency: 90, level: 'Advanced', usedIn: ['Oasis', 'DefNet', 'AI APIs'], keywords: ['fastapi', 'python', 'api', 'oasis', 'defnet'], color: 'from-red-600 to-zinc-400', glow: '#ef4444', icon: <Zap className={iconClass} /> },
  { name: 'Node.js', category: 'Fullstack', proficiency: 90, level: 'Advanced', usedIn: ['MAITRI Backend', 'REST APIs'], keywords: ['node', 'express', 'maitri', 'backend', 'api', 'typescript'], color: 'from-zinc-400 to-red-600', glow: '#ef4444', icon: <Server className={iconClass} /> },

  // Data & Infra
  { name: 'PostgreSQL', category: 'Data & Infra', proficiency: 88, level: 'Proficient', usedIn: ['MAITRI Database', 'Relational Schemas'], keywords: ['postgres', 'postgresql', 'sql', 'maitri', 'database'], color: 'from-red-700 to-zinc-400', glow: '#ef4444', icon: <Database className={iconClass} /> },
  { name: 'Docker', category: 'Data & Infra', proficiency: 86, level: 'Proficient', usedIn: ['DefNet', 'Containerized ML'], keywords: ['docker', 'container', 'defnet', 'deploy'], color: 'from-zinc-500 to-red-600', glow: '#ef4444', icon: <Box className={iconClass} /> },
  { name: 'Supabase', category: 'Data & Infra', proficiency: 88, level: 'Proficient', usedIn: ['Realtime DB', 'Auth & Vectors'], keywords: ['supabase', 'postgres', 'auth', 'maitri'], color: 'from-red-600 to-zinc-400', glow: '#ef4444', icon: <Sparkles className={iconClass} /> },
];

const categories = ['All', 'AI & ML', 'Languages', 'Fullstack', 'Data & Infra'] as const;

export const Chapter4_Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { repos, isLive, isLoading } = useGitHub('vaibhavsolanki1');
  const { theme } = useTheme();
  const isMono = theme === 'mono';
  const isCosmic = theme === 'cosmic';

  useEffect(() => {
    if (!selectedSkill) return;

    // Lock background scrolling (Lenis + native body overflow)
    stopSmoothScroll();
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSkill(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      startSmoothScroll();
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedSkill]);

  const getMatchingWork = (skill: Skill) => {
    const terms = [
      skill.name.toLowerCase(),
      ...skill.keywords.map((k) => k.toLowerCase()),
      ...skill.usedIn.map((u) => u.toLowerCase()),
    ];

    const liveMatches = repos.filter((repo) => {
      const haystack = [
        repo.name,
        repo.description ?? '',
        repo.language ?? '',
        ...repo.topics,
      ]
        .join(' ')
        .toLowerCase();
      return terms.some((t) => haystack.includes(t));
    });

    const curatedMatches = curatedRepos.filter((c) => {
      // Avoid duplicating repos already matched live by name
      const alreadyLive = liveMatches.some(
        (r) => r.name.toLowerCase() === c.name.toLowerCase()
      );
      if (alreadyLive) return false;
      const haystack = `${c.name} ${c.description} ${c.language} ${c.tags.join(' ')}`.toLowerCase();
      return terms.some((t) => haystack.includes(t));
    });

    return { liveMatches, curatedMatches };
  };

  const filteredSkills = skills.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <section id="skills" className="relative py-14 sm:py-16 px-4 max-w-6xl mx-auto w-full">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 04
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </motion.div>

      <div className="mb-12">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Skills <span className="text-gradient">Galaxy</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl font-light">
          Click any node to inspect GitHub work.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Skill categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            aria-label={`Filter skills by ${cat}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white border border-red-500 font-semibold'
                : 'glass-panel text-neutral-400 hover:text-white hover:bg-white/5 border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Galaxy Grid of Skill Planets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {filteredSkills.map((skill, idx) => {
          const isSelected = selectedSkill?.name === skill.name;
          return (
            <motion.div
              key={skill.name}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedSkill(skill)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSkill(skill);
                }
              }}
              aria-label={`Inspect GitHub repositories using ${skill.name}`}
              data-cursor
              data-cursor-text="Repos"
              className="relative cursor-pointer group focus:outline-none"
            >
              <GlassmorphicCard
                glowColor="pink"
                className={`p-5 text-center transition-all duration-300 ${
                  isSelected
                    ? 'border-red-500 bg-neutral-900 -translate-y-1'
                    : 'group-hover:border-red-500/50 group-hover:-translate-y-1'
                }`}
              >
                {/* Orbital Ring Matte Badge */}
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-3 relative group-hover:scale-105 transition-transform duration-300 bg-white/5 border border-white/10 group-hover:border-red-500/40"
                >
                  <span className="relative z-10">{skill.icon}</span>
                </div>

                <h3 className="font-display font-bold text-white text-base mb-1">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-mono text-red-400 block mb-2">
                  {skill.level}
                </span>

                {/* Mini Progress Bar */}
                <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: skill.proficiency / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full bg-red-600 origin-left transform-gpu"
                  />
                </div>
              </GlassmorphicCard>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Tech Stack GitHub Modal */}
      <AnimatePresence>
        {selectedSkill && (() => {
          const { liveMatches, curatedMatches } = getMatchingWork(selectedSkill);
          return (
            <motion.div
              key="skill-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              data-lenis-prevent="true"
              className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain"
            >
              <motion.div
                key="skill-modal-card"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                className={`relative w-full max-w-2xl rounded-2xl bg-zinc-950/95 border border-red-500/40 overscroll-contain ${
                  isMono
                    ? 'shadow-[0_25px_70px_rgba(255,255,255,0.14)]'
                    : isCosmic
                    ? 'shadow-[0_25px_70px_rgba(236,72,153,0.28)]'
                    : 'shadow-[0_25px_70px_rgba(220,38,38,0.28)]'
                } overflow-hidden`}
              >
                {/* Top Crimson Accent Line */}
                <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-zinc-700" />

                <div data-lenis-prevent="true" className="p-6 sm:p-7 max-h-[82vh] overflow-y-auto overscroll-contain">
                  {/* Modal Header */}
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                        {selectedSkill.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-2xl font-bold text-white">
                            {selectedSkill.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-300 border border-red-500/20">
                            {selectedSkill.category}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-zinc-400 mt-1">
                          {selectedSkill.proficiency}% Proficiency · {selectedSkill.level}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedSkill(null)}
                      aria-label="Close modal"
                      className="p-2 rounded-full bg-zinc-900 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Relevant GitHub Repositories */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300">
                        <GithubIcon className="w-4 h-4 text-red-500" />
                        <span>Relevant GitHub Repositories</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                        {isLoading
                          ? 'Syncing GitHub...'
                          : isLive
                          ? `${liveMatches.length + curatedMatches.length} Matched`
                          : 'Curated Repos'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {liveMatches.map((repo) => (
                        <div
                          key={repo.id}
                          className="p-4 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-red-500/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-sm font-bold text-white hover:text-red-400 transition-colors flex items-center gap-1.5"
                            >
                              <span>{repo.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                            </a>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                              Live GitHub
                            </span>
                          </div>

                          <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                            {repo.description || 'Repository on GitHub.'}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                {repo.language || 'Code'}
                              </span>
                              <span className="flex items-center gap-1 text-zinc-300">
                                <Star className="w-3 h-3 text-red-500" />
                                {repo.stars}
                              </span>
                              <span className="flex items-center gap-1 text-red-400">
                                <GitBranch className="w-3 h-3" />
                                {repo.forks}
                              </span>
                              <span className="text-zinc-500">
                                {formatRelativeTime(repo.pushedAt)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded bg-zinc-950 border border-white/10 hover:border-red-500/50 text-zinc-200 hover:text-white transition-colors"
                              >
                                View Code
                              </a>
                              {repo.homepage && (
                                <a
                                  href={repo.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 rounded bg-red-600/20 border border-red-500/30 text-red-200 hover:text-white transition-colors"
                                >
                                  Live
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {curatedMatches.map((repo) => (
                        <div
                          key={repo.name}
                          className="p-4 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-red-500/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-sm font-bold text-white hover:text-red-400 transition-colors flex items-center gap-1.5"
                            >
                              <span>{repo.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                            </a>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                              Project Repo
                            </span>
                          </div>

                          <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                            {repo.description}
                          </p>

                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                              {repo.language}
                            </span>
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded bg-zinc-950 border border-white/10 hover:border-red-500/50 text-zinc-200 hover:text-white transition-colors"
                            >
                              Open on GitHub
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">
                      Applied in: {selectedSkill.usedIn.join(' · ')}
                    </span>
                    <a
                      href="https://github.com/vaibhavsolanki1?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <span>All GitHub Repos</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};
