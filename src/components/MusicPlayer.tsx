import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  Repeat,
  Music,
  Radio,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import terrorAudio from '../assets/audio/terror-reble.mp3';
import crimsonMascot from '../assets/mascot.webp';
import noirMascot from '../assets/noir_mascot.webp';
import cosmicMascot from '../assets/cosmic_mascot.webp';

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const MusicPlayer = () => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartTimeRef = useRef(0);

  // Active theme mascot for center vinyl label
  const activeMascot =
    theme === 'mono'
      ? noirMascot
      : theme === 'cosmic'
      ? cosmicMascot
      : crimsonMascot;

  // Sync volume & loop with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isMuted, isLooping]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented by browser policy:', err);
        });
    }
  }, [isPlaying]);

  // Handle global shortcuts ('M' to toggle play, 'Shift+M' to toggle player)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if (isTyping || e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        if (e.shiftKey) {
          setIsOpen((prev) => !prev);
        } else {
          togglePlay();
        }
      }
    };

    const handleCustomToggle = () => togglePlay();
    const handleCustomOpen = () => setIsOpen((prev) => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('vs:toggle-music', handleCustomToggle);
    window.addEventListener('vs:open-music-player', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('vs:toggle-music', handleCustomToggle);
      window.removeEventListener('vs:open-music-player', handleCustomOpen);
    };
  }, [togglePlay]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleSkip = (offsetSeconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + offsetSeconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleEnded = () => {
    if (!isLooping) {
      setIsPlaying(false);
    }
  };

  // Disc drag and click distinction
  const onDragStart = () => {
    isDraggingRef.current = true;
    dragStartTimeRef.current = Date.now();
  };

  const onDragEnd = () => {
    // Keep isDraggingRef true for a short window so following click event is ignored
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 150);
  };

  const onDiscClick = () => {
    if (!isDraggingRef.current) {
      setIsOpen((prev) => !prev);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={terrorAudio}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* DRAGGABLE ROTATING VINYL DISC */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.12}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
        className="fixed z-40 cursor-grab select-none touch-none"
        style={{
          // Safe default starting placement: bottom-20 left-4
          bottom: '5.5rem',
          left: '1rem',
        }}
        aria-label="Floating Vinyl Music Player - Drag anywhere, click to open player"
      >
        <div
          onClick={onDiscClick}
          className="relative group p-1.5 rounded-full"
          title="Terror - Reble (prod by Tre Ess) • Click to open player, Drag to reposition"
        >
          {/* Outer Pulsing Sound Glow when playing */}
          {isPlaying && (
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-[var(--theme-glow)] blur-md pointer-events-none"
            />
          )}

          {/* The Vinyl Disc Body */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-[2px] shadow-2xl border border-white/20">
            {/* Spinning Grooves Container */}
            <div
              className={`w-full h-full rounded-full relative overflow-hidden flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{
                animationDuration: '3.6s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {/* Concentric Vinyl Grooves Pattern */}
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background:
                    'repeating-radial-gradient(circle at center, #18181b 0px, #18181b 1.5px, #09090b 2px, #09090b 3.5px)',
                }}
              />

              {/* Anisotropic Light Reflection Sheen */}
              <div
                className="absolute inset-0 rounded-full opacity-40 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.2) 60deg, transparent 120deg, rgba(255,255,255,0.15) 240deg, transparent 300deg)',
                }}
              />

              {/* Center Vinyl Label */}
              <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[var(--theme-primary)] via-neutral-900 to-zinc-950 p-[1.5px] shadow-inner flex items-center justify-center border border-white/30">
                <img
                  src={activeMascot}
                  alt="Track Center Artwork"
                  className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                />
                {/* Center Spindle Hole */}
                <div className="absolute w-1.5 h-1.5 rounded-full bg-black border border-white/60 shadow-inner" />
              </div>
            </div>

            {/* Quick Status Floating Badge on disc */}
            <div className="absolute -top-1 -right-1 z-20 flex items-center justify-center">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-5 h-5 rounded-full bg-neutral-950 border border-white/30 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <div className="flex items-center gap-[1.5px]">
                    <span className="w-[1.5px] h-2 bg-[var(--theme-primary)] rounded-full animate-pulse" />
                    <span className="w-[1.5px] h-3 bg-[var(--theme-primary)] rounded-full animate-pulse delay-75" />
                    <span className="w-[1.5px] h-1.5 bg-[var(--theme-primary)] rounded-full animate-pulse delay-150" />
                  </div>
                ) : (
                  <Play className="w-2.5 h-2.5 ml-0.5 fill-white text-white" />
                )}
              </div>
            </div>
          </div>

          {/* Hover Tooltip */}
          <div className="absolute left-1/2 -top-8 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-2.5 py-1 rounded-md bg-neutral-950/90 border border-white/15 text-[10px] font-mono text-zinc-300 shadow-xl backdrop-blur-md">
            {isPlaying ? 'Playing • Click for Deck' : 'Terror - Reble • Click to Play'}
          </div>
        </div>
      </motion.div>

      {/* MUSIC PLAYER FLOATING MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Glassmorphic Player Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-sm bg-neutral-950/95 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 60px -15px var(--theme-glow, rgba(239, 68, 68, 0.25))',
              }}
            >
              {/* Subtle Ambient Background Gradient */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[var(--theme-primary)]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[var(--theme-tertiary,rgba(147,51,234,0.15))]/15 blur-3xl pointer-events-none" />

              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {isPlaying && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-primary)] opacity-75" />
                    )}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-primary)]" />
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                    AUDIO EXPERIENCE
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close music player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Showcase Turntable & Vinyl Sleeve */}
              <div className="relative py-6 flex flex-col items-center justify-center">
                {/* Turntable Sleeve with Spinning Vinyl */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Turntable Base Platter */}
                  <div className="absolute inset-0 rounded-full bg-neutral-900 border border-white/10 shadow-inner" />

                  {/* Spinning Vinyl */}
                  <div
                    className={`relative w-32 h-32 rounded-full shadow-2xl p-1 flex items-center justify-center border border-white/20 ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{
                      animationDuration: '4s',
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite',
                    }}
                  >
                    {/* Vinyl Grooves */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'repeating-radial-gradient(circle at center, #18181b 0px, #18181b 2px, #09090b 2.5px, #09090b 4px)',
                      }}
                    />

                    {/* Sheen */}
                    <div
                      className="absolute inset-0 rounded-full opacity-40 pointer-events-none"
                      style={{
                        background:
                          'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.25) 60deg, transparent 120deg, rgba(255,255,255,0.2) 240deg, transparent 300deg)',
                      }}
                    />

                    {/* Vinyl Center Label */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--theme-primary)] to-zinc-900 p-0.5 border border-white/30 flex items-center justify-center shadow-lg">
                      <img
                        src={activeMascot}
                        alt="Center Mascot"
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-black border border-white/70" />
                    </div>
                  </div>

                  {/* Tonearm Needle */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 24 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute -top-2 -right-1 w-12 h-20 origin-top-right pointer-events-none z-20"
                  >
                    <div className="w-1.5 h-16 bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-full shadow-md ml-auto mr-1" />
                    <div className="w-3 h-4 bg-red-600 rounded-sm -mt-1 ml-auto mr-0.5 shadow-sm" />
                  </motion.div>
                </div>

                {/* Track Information */}
                <div className="text-center mt-4 space-y-1">
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">
                    Terror
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Reble (prod. by Tre Ess)
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                      SHILLONG HIP HOP
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--theme-primary)]/15 border border-[var(--theme-primary)]/30 text-[var(--theme-primary)]">
                      PORTFOLIO OST
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Timestamps */}
              <div className="space-y-1.5 pt-2">
                <div className="relative flex items-center group">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Seek audio position"
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)] focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, var(--theme-primary) 0%, var(--theme-primary) ${progressPercent}%, #27272a ${progressPercent}%, #27272a 100%)`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between pt-4">
                {/* Loop toggle */}
                <button
                  onClick={() => setIsLooping((prev) => !prev)}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isLooping
                      ? 'text-[var(--theme-primary)] bg-white/5'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  title={isLooping ? 'Loop: On' : 'Loop: Off'}
                  aria-label="Toggle loop"
                >
                  <Repeat className="w-4 h-4" />
                </button>

                {/* Rewind 10s */}
                <button
                  onClick={() => handleSkip(-10)}
                  className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Rewind 10 seconds"
                  aria-label="Rewind 10 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Primary Play / Pause Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={togglePlay}
                  className="w-13 h-13 rounded-full bg-[var(--theme-primary)] text-white flex items-center justify-center shadow-lg transition-transform cursor-pointer"
                  style={{
                    boxShadow: '0 0 25px var(--theme-glow, rgba(239, 68, 68, 0.4))',
                  }}
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </motion.button>

                {/* Forward 10s */}
                <button
                  onClick={() => handleSkip(10)}
                  className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Skip 10 seconds"
                  aria-label="Skip 10 seconds"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Mute / Unmute */}
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isMuted
                      ? 'text-red-400 bg-red-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Volume Slider Bar */}
              <div className="pt-4 flex items-center gap-3">
                <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVol = parseFloat(e.target.value);
                    setVolume(newVol);
                    if (isMuted && newVol > 0) setIsMuted(false);
                  }}
                  aria-label="Volume slider"
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)]"
                />
                <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              {/* Footer Shortcuts Hint */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Music className="w-3 h-3 text-[var(--theme-primary)]" />
                  Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-300">M</kbd> to toggle
                </span>
                <span>Drag disc anywhere</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
