import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  tech: string[];
  highlights: string[];
  gradient: string;
  glowColor: 'blue' | 'purple' | 'cyan' | 'amber';
  githubUrl?: string;
  liveUrl?: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 'maitri',
    title: 'MAITRI',
    subtitle: 'AI Wellness Companion & Health Ecosystem',
    role: 'Founder & Lead Architect',
    description:
      'An intelligent AI companion designed for personalized mental wellness and health tracking, featuring custom AI algorithms, emotion processing, and future IoT hardware integration.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'Tailwind', 'LLMs'],
    highlights: [
      'Founder leading 4–5 engineering team',
      '12 Active Beta Testers onboarded',
      'Real-time AI personalization engine',
      'Designing custom hardware telemetry integration',
    ],
    gradient: 'from-indigo-600/30 via-purple-600/20 to-cyan-500/30',
    glowColor: 'purple',
    githubUrl: 'https://github.com/vaibhavsolanki/maitri',
    liveUrl: 'https://maitri-ai.vercel.app',
    status: 'Flagship Startup',
  },
  {
    id: 'oasis',
    title: 'Oasis',
    subtitle: 'Next-Gen AI Multimedia Generation Suite',
    role: 'Frontend Developer',
    description:
      'Generative AI platform integrating video generation models, diffusion pipelines, AI music synthesis, and an interactive browser audio/video timeline editor.',
    tech: ['React', 'TypeScript', 'Python', 'Web Audio API', 'Diffusers', 'FastAPI'],
    highlights: [
      'High-throughput web timeline editor',
      'Real-time diffusion preview streams',
      'Seamless multi-modal generation pipeline',
    ],
    gradient: 'from-cyan-600/30 via-blue-600/20 to-indigo-500/30',
    glowColor: 'cyan',
    githubUrl: 'https://github.com/vaibhavsolanki/oasis',
    liveUrl: 'https://oasis-genai.vercel.app',
    status: 'AI Platform',
  },
  {
    id: 'defnet',
    title: 'DefNet',
    subtitle: 'Autonomous AI Cyber Defense & Threat Intelligence',
    role: 'Creator & Architect',
    description:
      'Autonomous cyber defense platform utilizing Twin AI Agents, Knowledge Graphs, and World Models to predict, simulate, and defend against targeted vector attacks.',
    tech: ['Python', 'Knowledge Graphs', 'PyTorch', 'FastAPI', 'Docker', 'React'],
    highlights: [
      'Dual-agent adversarial simulation loop',
      'Graph-based attack surface modeling',
      'Automated mitigation playbook dispatch',
    ],
    gradient: 'from-emerald-600/30 via-teal-600/20 to-blue-500/30',
    glowColor: 'blue',
    githubUrl: 'https://github.com/vaibhavsolanki/defnet',
    liveUrl: 'https://defnet-ai.vercel.app',
    status: 'Cybersecurity AI',
  },
  {
    id: 'student-passport',
    title: 'Student Passport',
    subtitle: 'Web3 Verified Digital Identity & Credentials',
    role: 'Lead Developer',
    description:
      'Decentralized identity protocol ensuring tamper-proof academic certificates, skills verification, and dynamic non-transferable student NFTs.',
    tech: ['Solidity', 'React', 'Ethers.js', 'Polygon', 'IPFS', 'Tailwind'],
    highlights: [
      'Zero-knowledge proof credential verification',
      'Deployed on Polygon testnet',
      'Instant verifiable cryptographic diplomas',
    ],
    gradient: 'from-amber-600/30 via-purple-600/20 to-indigo-500/30',
    glowColor: 'amber',
    githubUrl: 'https://github.com/vaibhavsolanki/student-passport',
    liveUrl: 'https://student-passport-web3.vercel.app',
    status: 'Web3 & Identity',
  },
];

export const Chapter2_Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>(projects[0].id);

  return (
    <section id="projects" className="relative py-32 px-4 max-w-6xl mx-auto">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
          CHAPTER 02
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
      </div>

      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Falling in Love with <span className="text-gradient-cyan">Building</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl font-light">
          Engineering is not just writing lines of code — it is crafting living solutions. Explore my holographic product showcase.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => {
          const isSelected = activeProject === proj.id;
          return (
            <motion.div
              key={proj.id}
              onClick={() => setActiveProject(proj.id)}
              className="cursor-pointer"
            >
              <GlassmorphicCard
                glowColor={proj.glowColor}
                className={`h-full border border-white/10 hover:border-cyan-500/40 transition-all duration-500 ${
                  isSelected ? 'ring-2 ring-cyan-400/50 bg-slate-900/90' : ''
                }`}
              >
                {/* Hologram Card Ambient Top Accent */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${proj.gradient}`} />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    {proj.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{proj.role}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-4">{proj.subtitle}</p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {proj.description}
                </p>

                {/* Highlights Bullet List */}
                <div className="space-y-2 mb-6 bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Key Achievements:
                  </span>
                  {proj.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <Sparkles className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Holographic Action Links */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:border-indigo-500/60 text-xs font-medium transition-all group/btn"
                      data-cursor
                      data-cursor-text="Code"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-indigo-400 transition-colors" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-semibold shadow-md hover:shadow-cyan-500/30 transition-all group/btn"
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
      </div>
    </section>
  );
};
