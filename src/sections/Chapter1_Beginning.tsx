import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Play } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

export const Chapter1_Beginning = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const runHelloWorld = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setTerminalOutput(['$ gcc hello.cpp -o hello', '$ ./hello']);

    setTimeout(() => {
      setTerminalOutput((prev) => [...prev, 'Initialising neural matrix...']);
    }, 600);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        '> "Hello, World! I am ready to build the future."',
        'Process exited with status code 0.',
      ]);
      setIsExecuting(false);
    }, 1400);
  };

  return (
    <section id="beginning" className="relative pt-16 pb-6 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
          CHAPTER 01
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Narrative Story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            The Beginning:<br />
            <span className="text-gradient">Curiosity Turned into Passion</span>
          </h2>

          <div className="text-neutral-300 space-y-4 font-light leading-relaxed text-base sm:text-lg">
            <p>
              It started with one question: <em className="text-red-400 not-italic font-normal">How do machines think?</em> Late-night experiments with basic syntax quickly became an obsession with algorithms and AI.
            </p>
          </div>

          {/* Key Milestones Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="glass-panel p-4 rounded-xl border-white/5 flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-red-400 mt-1">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Deep Fundamentals</h4>
                <p className="text-neutral-400 text-xs mt-1">C++, DSA & OS internals.</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-white/5 flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-red-400 mt-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">First Breakthrough</h4>
                <p className="text-neutral-400 text-xs mt-1">First automated tools & CP solutions.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Interactive Floating Code Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6"
        >
          <GlassmorphicCard glowColor="pink" className="border-white/10">
            {/* Terminal Topbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-neutral-600" />
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <span className="text-xs font-mono text-neutral-400 ml-2">vaibhav@terminal:~</span>
              </div>
              <button
                onClick={runHelloWorld}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs font-mono transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run</span>
              </button>
            </div>

            {/* Code Window */}
            <div className="font-mono text-xs sm:text-sm text-neutral-300 space-y-1 bg-neutral-950/80 p-4 rounded-lg border border-white/5 mb-4">
              <div>
                <span className="text-red-400">#include</span>{' '}
                <span className="text-neutral-300">&lt;iostream&gt;</span>
              </div>
              <div>
                <span className="text-red-400">#include</span>{' '}
                <span className="text-neutral-300">&lt;string&gt;</span>
              </div>
              <div className="py-1" />
              <div>
                <span className="text-red-400">int</span>{' '}
                <span className="text-white font-semibold">main</span>() &#123;
              </div>
              <div className="pl-4">
                <span className="text-neutral-400">std::string</span> vision ={' '}
                <span className="text-red-300">"Build products that change lives"</span>;
              </div>
              <div className="pl-4">
                <span className="text-neutral-400">std::cout</span> &lt;&lt;{' '}
                <span className="text-red-300">"Hello, World! "</span> &lt;&lt; vision &lt;&lt;{' '}
                <span className="text-neutral-400">std::endl</span>;
              </div>
              <div className="pl-4">
                <span className="text-red-400">return</span> <span className="text-white">0</span>;
              </div>
              <div>&#125;</div>
            </div>

            {/* Terminal Output Log */}
            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 font-mono text-xs text-neutral-300 min-h-[90px]">
              <div className="text-neutral-500 mb-1">// Interactive Terminal Output:</div>
              {terminalOutput.length === 0 ? (
                <div className="text-neutral-600 italic">Click 'Run' above to execute code...</div>
              ) : (
                terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={line.startsWith('>') ? 'text-red-400 font-semibold py-1' : 'text-neutral-300'}
                  >
                    {line}
                  </div>
                ))
              )}
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </section>
  );
};
