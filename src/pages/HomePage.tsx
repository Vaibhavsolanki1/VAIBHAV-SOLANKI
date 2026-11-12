import { Code2, Cpu, Milestone, Mail, ArrowRight } from 'lucide-react';
import { Hero } from '../sections/Hero';
import { Chapter1_Beginning } from '../sections/Chapter1_Beginning';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const quickLinks = [
    {
      page: 'projects',
      title: 'Featured Projects',
      desc: 'MAITRI · Oasis · DefNet · Student Passport',
      icon: <Code2 className="w-5 h-5 text-red-400" />,
      color: 'pink' as const,
      glow: '#ef4444',
      badge: '4 Projects',
    },
    {
      page: 'skills',
      title: 'Skills & Achievements',
      desc: 'Tech stack, hackathons & awards',
      icon: <Cpu className="w-5 h-5 text-zinc-300" />,
      color: 'pink' as const,
      glow: '#71717a',
      badge: 'Expertise',
    },
    {
      page: 'journey',
      title: 'Journey & Beyond',
      desc: 'Timeline, chess & F1',
      icon: <Milestone className="w-5 h-5 text-red-400" />,
      color: 'pink' as const,
      glow: '#dc2626',
      badge: 'Story',
    },
    {
      page: 'contact',
      title: 'Vision & Connect',
      desc: 'Philosophy & get in touch',
      icon: <Mail className="w-5 h-5 text-red-500" />,
      color: 'pink' as const,
      glow: '#ef4444',
      badge: 'Get in Touch',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero onNavigate={onNavigate} />

      {/* Chapter 1: The Beginning */}
      <Chapter1_Beginning />

      {/* Quick Chapter Navigation Cards */}
      <section className="pt-2 pb-16 px-4 max-w-6xl mx-auto w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400 mb-3">
            <span>DISCOVER CHAPTERS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Explore <span className="text-gradient">Portfolio Modules</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl">
            Select a chapter to explore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <GlassmorphicCard
              key={link.page}
              glowColor={link.color}
              className="cursor-pointer group hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between hover:border-red-500/40"
              onClick={() => onNavigate(link.page)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-red-500/30 transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                    {link.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                  {link.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-6">
                  {link.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-red-400 pt-3 border-t border-white/5 group-hover:translate-x-1 transition-transform">
                <span>Open Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassmorphicCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
