import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, GraduationCap, Building2, Code2, Target, Calendar } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface TimelineNode {
  year: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  gradient: string;
}

const journeyNodes: TimelineNode[] = [
  {
    year: '2023',
    title: 'The Spark & College Entry',
    category: 'Education & DSA',
    description: 'Enrolled in Computer Science Engineering. Built foundational mastery in C++, Data Structures, Algorithms, and Object-Oriented Design.',
    icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
    tags: ['C++', 'DSA', 'Computer Science'],
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    year: '2024',
    title: 'Hackathon Arena & CP',
    category: 'Competitions',
    description: 'Began aggressive participation in national hackathons and Codeforces. Won 2 Hackathons, became GFG Campus Mantri, and founded the Chess Club.',
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    tags: ['Hackathons', 'Codeforces', 'Leadership'],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    year: '2025',
    title: 'Founding MAITRI & Oasis',
    category: 'Startup & AI Products',
    description: 'Founded MAITRI (AI Wellness Companion), managing 5 developers and onboarded 12 active beta testers. Built Oasis GenAI multimedia suite.',
    icon: <Building2 className="w-5 h-5 text-purple-400" />,
    tags: ['MAITRI', 'AI Startup', 'Fullstack'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    year: '2026',
    title: 'Scaling AI & ICPC Quest',
    category: 'Current Frontier',
    description: 'Deep diving into Autonomous Cyber Defense (DefNet), preparing for ICPC Regionals, and building production-grade AI agentic workflows.',
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    tags: ['ICPC', 'Agentic AI', 'DefNet'],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    year: '2027+',
    title: 'Building World-Class Products',
    category: 'Future Vision',
    description: 'Establishing high-impact tech companies and leading frontier engineering teams that push the boundaries of AI & human capability.',
    icon: <Target className="w-5 h-5 text-amber-400" />,
    tags: ['Frontier AI', 'Global Impact', 'Leadership'],
    gradient: 'from-amber-500 to-red-500',
  },
];

export const Chapter5_Journey: React.FC = () => {
  return (
    <section id="journey" className="relative py-32 px-4 max-w-6xl mx-auto">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          CHAPTER 05
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent" />
      </div>

      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          My <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl font-light">
          From first terminal lines to building AI startups and competing in algorithmic battles. A chronological progression of growth.
        </p>
      </div>

      {/* Vertical Animated Timeline Grid */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {journeyNodes.map((node, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Node Orb */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <GlassmorphicCard glowColor="purple" className="border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {node.year}
                </span>
                <span className="text-xs font-mono text-slate-400">{node.category}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                {node.icon}
                <span>{node.title}</span>
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 font-light">
                {node.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {node.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </GlassmorphicCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
