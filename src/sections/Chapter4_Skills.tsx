import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface Skill {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Tools';
  proficiency: number;
  level: string;
  usedIn: string[];
  color: string;
  glow: string;
  icon: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', proficiency: 95, level: 'Expert', usedIn: ['Oasis', 'DefNet', 'MAITRI'], color: 'from-amber-500 to-emerald-500', glow: '#f59e0b', icon: '🐍' },
  { name: 'TypeScript', category: 'Languages', proficiency: 90, level: 'Advanced', usedIn: ['MAITRI', 'Oasis', 'Portfolio'], color: 'from-blue-500 to-indigo-500', glow: '#3b82f6', icon: '📘' },
  { name: 'C++', category: 'Languages', proficiency: 92, level: 'Advanced (ICPC)', usedIn: ['Competitive Programming', 'Algorithms'], color: 'from-indigo-500 to-purple-500', glow: '#8b5cf6', icon: '⚡' },
  { name: 'Java', category: 'Languages', proficiency: 88, level: 'Proficient', usedIn: ['DSA', 'Backend Architecture'], color: 'from-red-500 to-amber-500', glow: '#ef4444', icon: '☕' },
  { name: 'JavaScript', category: 'Languages', proficiency: 95, level: 'Expert', usedIn: ['All Web Apps'], color: 'from-yellow-400 to-amber-500', glow: '#eab308', icon: '🌐' },

  // Frameworks
  { name: 'React', category: 'Frameworks', proficiency: 94, level: 'Advanced', usedIn: ['Oasis', 'Student Passport', 'Portfolio'], color: 'from-cyan-400 to-blue-500', glow: '#06b6d4', icon: '⚛️' },
  { name: 'Node.js', category: 'Frameworks', proficiency: 90, level: 'Advanced', usedIn: ['MAITRI Backend', 'REST APIs'], color: 'from-emerald-500 to-teal-500', glow: '#10b981', icon: '🟢' },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', proficiency: 88, level: 'Proficient', usedIn: ['MAITRI Database', 'Relational Schemas'], color: 'from-blue-600 to-indigo-600', glow: '#2563eb', icon: '🐘' },
  { name: 'MongoDB', category: 'Databases', proficiency: 85, level: 'Proficient', usedIn: ['NoSQL Services', 'JSON Stores'], color: 'from-emerald-600 to-green-500', glow: '#059669', icon: '🍃' },
  { name: 'SQL', category: 'Databases', proficiency: 90, level: 'Advanced', usedIn: ['Complex Queries', 'Indexing'], color: 'from-cyan-500 to-blue-600', glow: '#0284c7', icon: '📊' },

  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 95, level: 'Expert', usedIn: ['CI/CD', 'Open Source', 'Team Workflow'], color: 'from-purple-500 to-pink-500', glow: '#a855f7', icon: '🐙' },
  { name: 'VS Code', category: 'Tools', proficiency: 95, level: 'Power User', usedIn: ['Daily Driver', 'Custom Extensions'], color: 'from-blue-500 to-cyan-500', glow: '#3b82f6', icon: '💻' },
  { name: 'Supabase', category: 'Tools', proficiency: 88, level: 'Proficient', usedIn: ['Realtime DB', 'Auth', 'Storage'], color: 'from-emerald-400 to-teal-500', glow: '#34d399', icon: '⚡' },
];

const categories = ['All', 'Languages', 'Frameworks', 'Databases', 'Tools'] as const;

export const Chapter4_Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const filteredSkills = skills.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <section id="skills" className="relative py-32 px-4 max-w-6xl mx-auto">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400">
          CHAPTER 04
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
      </div>

      <div className="mb-12">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Skills <span className="text-gradient">Galaxy</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl font-light">
          An interactive constellation of technologies. Hover any glowing celestial node to reveal experience details and project applications.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5 border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Galaxy Grid of Skill Planets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {filteredSkills.map((skill, idx) => {
          const isHovered = hoveredSkill?.name === skill.name;
          return (
            <motion.div
              key={skill.name}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative cursor-pointer group"
            >
              <GlassmorphicCard
                glowColor="cyan"
                className={`p-5 text-center transition-all duration-500 ${
                  isHovered ? 'ring-2 ring-cyan-400 bg-slate-900/90 -translate-y-2' : ''
                }`}
              >
                {/* Orbital Ring Glow Effect */}
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-3 relative group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `radial-gradient(circle, ${skill.glow}33 0%, rgba(0,0,0,0) 70%)`,
                    boxShadow: `0 0 25px ${skill.glow}55`,
                  }}
                >
                  <span className="relative z-10">{skill.icon}</span>
                </div>

                <h3 className="font-display font-bold text-white text-base mb-1">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 block mb-2">
                  {skill.level}
                </span>

                {/* Mini Progress Bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </GlassmorphicCard>
            </motion.div>
          );
        })}
      </div>

      {/* Hover Information Box */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="glass-panel p-6 rounded-2xl border-cyan-500/30 max-w-xl mx-auto shadow-2xl flex items-center justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{hoveredSkill.icon}</span>
                <h4 className="font-display text-xl font-bold text-white">
                  {hoveredSkill.name}
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {hoveredSkill.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mb-2">
                Proficiency: {hoveredSkill.proficiency}% ({hoveredSkill.level})
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Deployed in:</span>
                {hoveredSkill.usedIn.map((proj, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
