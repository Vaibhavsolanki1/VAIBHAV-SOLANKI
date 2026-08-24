import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Crown, Flame, Shield, Star, CheckCircle } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface Achievement {
  title: string;
  count: number;
  suffix?: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  color: 'blue' | 'purple' | 'amber' | 'cyan';
}

const achievements: Achievement[] = [
  {
    title: 'Hackathon Winner',
    count: 2,
    suffix: '×',
    description: 'First Place Champion in high-stakes regional and national tech hackathons.',
    icon: <Crown className="w-6 h-6 text-amber-400" />,
    badge: '1st Place',
    color: 'amber',
  },
  {
    title: 'Hackathon Finalist',
    count: 4,
    suffix: '×',
    description: 'Top-tier finalist status competing against hundreds of developer teams.',
    icon: <Trophy className="w-6 h-6 text-indigo-400" />,
    badge: 'Grand Finalist',
    color: 'purple',
  },
  {
    title: 'Founder of MAITRI',
    count: 1,
    suffix: 'st',
    description: 'Spearheading product, AI telemetry, and team leadership for 5 engineers.',
    icon: <Flame className="w-6 h-6 text-pink-400" />,
    badge: 'Startup Founder',
    color: 'purple',
  },
  {
    title: 'Chess Club President',
    count: 1,
    suffix: '',
    description: 'Founder & President of College Chess Club, organizing competitive tournaments.',
    icon: <Award className="w-6 h-6 text-cyan-400" />,
    badge: 'Leadership',
    color: 'cyan',
  },
  {
    title: 'GFG Campus Mantri',
    count: 1,
    suffix: '',
    description: 'Official GeeksforGeeks Campus Lead fostering coding culture for 500+ students.',
    icon: <Star className="w-6 h-6 text-emerald-400" />,
    badge: 'Community',
    color: 'blue',
  },
  {
    title: 'Codeforces Rating',
    count: 1450,
    suffix: '+',
    description: 'Competitive programming problem solver with high algorithmic accuracy.',
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    badge: 'Competitive Coder',
    color: 'purple',
  },
];

export const Chapter3_Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-32 px-4 max-w-6xl mx-auto">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-purple-400">
          CHAPTER 03
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
      </div>

      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Unlocked <span className="text-gradient-gold">Achievements</span>
        </h2>
        <p className="text-slate-300 text-lg font-light">
          Milestones earned through relentless discipline, hackathons, problem solving, and community leadership.
        </p>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <GlassmorphicCard glowColor={item.color} className="h-full border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10 shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {item.badge}
                  </span>
                </div>

                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  <CountUp end={item.count} suffix={item.suffix} />
                </div>

                <h3 className="font-display text-lg font-bold text-slate-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassmorphicCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
