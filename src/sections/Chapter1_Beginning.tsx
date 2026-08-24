import React, { useState } from 'react';
import { BookOpen, Sparkles, Play } from 'lucide-react';
import { GlassmorphicCard } from '../components/GlassmorphicCard';

export const Chapter1_Beginning: React.FC = () => {
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
        '✨ "Hello, World! I am ready to build the future."',
        'Process exited with status code 0.',
      ]);
      setIsExecuting(false);
    }, 1400);
  };

  return (
    <section id="beginning" className="relative py-32 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
          CHAPTER 01
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Narrative Story */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            The Beginning:<br />
            <span className="text-gradient">Curiosity Turned into Passion</span>
          </h2>

          <div className="text-slate-300 space-y-4 font-light leading-relaxed text-base sm:text-lg">
            <p>
              It started with an insatiable itch: <em className="text-cyan-300 not-italic font-normal">How do machines think? How do pixels morph into living software?</em>
            </p>
            <p>
              What began as late-night experimentation with basic syntax quickly grew into an obsession with algorithms, system architecture, and artificial intelligence.
            </p>
          </div>

          {/* Key Milestones Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="glass-panel p-4 rounded-xl border-white/5 flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 mt-1">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Deep Fundamentals</h4>
                <p className="text-slate-400 text-xs mt-1">Mastered C++, Data Structures, Algorithms & OS internals.</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-white/5 flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 mt-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">First Breakthrough</h4>
                <p className="text-slate-400 text-xs mt-1">Created first automated tools & competitive coding solutions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Floating Code Terminal */}
        <div className="lg:col-span-6">
          <GlassmorphicCard glowColor="purple" className="border-indigo-500/20">
            {/* Terminal Topbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">vaibhav@terminal:~</span>
              </div>
              <button
                onClick={runHelloWorld}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono transition-colors disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run</span>
              </button>
            </div>

            {/* Code Window */}
            <div className="font-mono text-xs sm:text-sm text-slate-300 space-y-1 bg-slate-950/80 p-4 rounded-lg border border-white/5 mb-4">
              <div>
                <span className="text-purple-400">#include</span>{' '}
                <span className="text-emerald-400">&lt;iostream&gt;</span>
              </div>
              <div>
                <span className="text-purple-400">#include</span>{' '}
                <span className="text-emerald-400">&lt;string&gt;</span>
              </div>
              <div className="py-1" />
              <div>
                <span className="text-blue-400">int</span>{' '}
                <span className="text-amber-300">main</span>() &#123;
              </div>
              <div className="pl-4">
                <span className="text-blue-400">std::string</span> vision ={' '}
                <span className="text-emerald-300">"Build products that change lives"</span>;
              </div>
              <div className="pl-4">
                <span className="text-purple-400">std::cout</span> &lt;&lt;{' '}
                <span className="text-emerald-300">"Hello, World! "</span> &lt;&lt; vision &lt;&lt;{' '}
                <span className="text-purple-400">std::endl</span>;
              </div>
              <div className="pl-4">
                <span className="text-purple-400">return</span> <span className="text-cyan-400">0</span>;
              </div>
              <div>&#123;</div>
            </div>

            {/* Terminal Output Log */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 min-h-[90px]">
              <div className="text-slate-500 mb-1">// Interactive Terminal Output:</div>
              {terminalOutput.length === 0 ? (
                <div className="text-slate-600 italic">Click 'Run' above to execute code...</div>
              ) : (
                terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={line.includes('✨') ? 'text-emerald-400 font-semibold py-1' : 'text-slate-300'}
                  >
                    {line}
                  </div>
                ))
              )}
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </section>
  );
};
