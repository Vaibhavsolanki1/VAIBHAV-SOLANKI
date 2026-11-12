import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Crown, Flame, Shield, Star, CheckCircle } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { useCodeforces } from '../hooks/useCodeforces';

interface Achievement {
  title: string;
  count: number;
  suffix?: string;
  description: string;
  icon: ReactNode;
  badge: string;
  color: 'pink';
}

export const Chapter3_Achievements = () => {
  const { user, isLive } = useCodeforces('vaibhav2927');

  const achievements: Achievement[] = [
    {
      title: 'Hackathon Winner',
      count: 2,
      suffix: '×',
      description: '1st place in regional & national hackathons.',
      icon: <Crown className="w-6 h-6 text-red-500" />,
      badge: '1st Place',
      color: 'pink',
    },
    {
      title: 'Hackathon Finalist',
      count: 4,
      suffix: '×',
      description: 'Grand finalist among hundreds of teams.',
      icon: <Trophy className="w-6 h-6 text-zinc-300" />,
      badge: 'Grand Finalist',
      color: 'pink',
    },
    {
      title: 'Founder of MAITRI',
      count: 1,
      suffix: 'st',
      description: 'Product, AI, and team lead for 5 engineers.',
      icon: <Flame className="w-6 h-6 text-red-500" />,
      badge: 'Startup Founder',
      color: 'pink',
    },
    {
      title: 'Chess Club President',
      count: 1,
      suffix: '',
      description: 'Founded college chess club & tournaments.',
      icon: <Award className="w-6 h-6 text-white" />,
      badge: 'Leadership',
      color: 'pink',
    },
    {
      title: 'GFG Campus Mantri',
      count: 1,
      suffix: '',
      description: 'GFG Campus Lead for 500+ students.',
      icon: <Star className="w-6 h-6 text-red-400" />,
      badge: 'Community',
      color: 'pink',
    },
    {
      title: 'Codeforces Rating',
      count: user?.rating ?? 1056,
      suffix: '',
      description: '6 rated contests on Codeforces.',
      icon: <Shield className="w-6 h-6 text-zinc-300" />,
      badge: isLive ? 'Live Verified' : (user?.rank ? user.rank.toUpperCase() : 'CODEFORCES'),
      color: 'pink',
    },
  ];
  return (
    <section id="achievements" className="relative py-14 sm:py-16 px-4 max-w-6xl mx-auto w-full">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 03
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </div>

      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Unlocked <span className="text-gradient">Achievements</span>
        </h2>
        <p className="text-zinc-300 text-lg font-light">
          Hackathons, leadership, and competitive programming.
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
            <GlassmorphicCard glowColor="pink" className="h-full border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-white/10 shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-red-500" />
                    {item.badge}
                  </span>
                </div>

                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  <CountUp end={item.count} suffix={item.suffix} />
                </div>

                <h3 className="font-display text-lg font-bold text-zinc-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">
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
