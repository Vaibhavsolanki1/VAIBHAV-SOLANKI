import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, GraduationCap, Building2, Code2, Target, Calendar } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface TimelineNode {
  year: string;
  title: string;
  category: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  gradient: string;
}

const journeyNodes: TimelineNode[] = [
  {
    year: '2023',
    title: 'The Spark & College Entry',
    category: 'Education & DSA',
    description: 'CS Engineering. Built mastery in C++, DSA, and OOP.',
    icon: <GraduationCap className="w-5 h-5 text-red-400" />,
    tags: ['C++', 'DSA', 'Computer Science'],
    gradient: 'from-red-600/30 to-zinc-800/30',
  },
  {
    year: '2024',
    title: 'Hackathon Arena & CP',
    category: 'Competitions',
    description: 'Won 2 hackathons, started Codeforces, founded Chess Club.',
    icon: <Code2 className="w-5 h-5 text-zinc-300" />,
    tags: ['Hackathons', 'Codeforces', 'Leadership'],
    gradient: 'from-zinc-700/30 to-red-900/30',
  },
  {
    year: '2025',
    title: 'Founding MAITRI & Oasis',
    category: 'Startup & AI Products',
    description: 'Founded MAITRI with 5 devs & 12 beta testers. Built Oasis.',
    icon: <Building2 className="w-5 h-5 text-red-500" />,
    tags: ['MAITRI', 'AI Startup', 'Fullstack'],
    gradient: 'from-red-700/30 to-zinc-900/30',
  },
  {
    year: '2026',
    title: 'Scaling AI & Advanced Systems',
    category: 'Current Frontier',
    description: 'Building DefNet, competitive programming, and AI agents.',
    icon: <Rocket className="w-5 h-5 text-white" />,
    tags: ['Algorithms', 'Agentic AI', 'DefNet'],
    gradient: 'from-zinc-600/30 to-red-600/30',
  },
  {
    year: '2027+',
    title: 'Building World-Class Products',
    category: 'Future Vision',
    description: 'Building high-impact tech companies at the AI frontier.',
    icon: <Target className="w-5 h-5 text-red-400" />,
    tags: ['Frontier AI', 'Global Impact', 'Leadership'],
    gradient: 'from-red-600/30 to-zinc-900/30',
  },
];

export const Chapter5_Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative py-14 sm:py-16 px-4 max-w-6xl mx-auto w-full">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 05
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </motion.div>

      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          My <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-neutral-300 text-lg max-w-2xl font-light">
          From first terminal lines to AI startups.
        </p>
      </div>

      {/* Vertical Animated Timeline Grid */}
      <div ref={timelineRef} className="relative border-l-2 border-neutral-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {/* Animated Crimson Progress Line */}
        <motion.div
          style={{ scaleY: lineScaleY }}
          className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500 via-red-600 to-red-400 origin-top pointer-events-none transform-gpu"
        />
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
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-neutral-950 border-2 border-red-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-red-500" />
            </div>

            <GlassmorphicCard glowColor="pink" className="border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {node.year}
                </span>
                <span className="text-xs font-mono text-neutral-400">{node.category}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors flex items-center gap-2">
                {node.icon}
                <span>{node.title}</span>
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-4 font-light">
                {node.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {node.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-300 border border-neutral-800"
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
