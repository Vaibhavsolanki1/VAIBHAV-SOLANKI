import { motion } from 'framer-motion';

export const PagePlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[85vh] pt-32 pb-20 px-4 max-w-6xl mx-auto flex flex-col justify-center"
      aria-label="Loading page content"
    >
      {/* Brand Header Skeleton */}
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/20 to-transparent" />
      </div>

      {/* Title & Subtitle Skeleton */}
      <div className="space-y-4 mb-14">
        <div className="h-12 sm:h-16 w-3/4 max-w-lg rounded-2xl bg-gradient-to-r from-red-600/15 via-rose-500/10 to-zinc-700/10 animate-pulse border border-white/5" />
        <div className="h-4 w-full max-w-xl rounded-lg bg-white/5 animate-pulse" />
        <div className="h-4 w-2/3 max-w-md rounded-lg bg-white/5 animate-pulse" />
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl glass-panel border border-white/10 bg-slate-950/40 space-y-4 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
              <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
            </div>
            <div className="h-6 w-3/4 rounded-lg bg-white/15 animate-pulse" />
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-3 w-4/5 rounded bg-white/5 animate-pulse" />
            </div>
            <div className="flex gap-2 pt-4 border-t border-white/5">
              <div className="h-6 w-16 rounded-full bg-white/5 animate-pulse" />
              <div className="h-6 w-16 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

