import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
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

// Returns styling tokens for the disc in each theme's official secondary colour:
// Noir (mono) -> Secondary is White
// Cosmic -> Secondary is Pink
// Crimson -> Secondary is Red (Crimson)
const getDiscSecondaryStyle = (themeName: 'crimson' | 'mono' | 'cosmic') => {
  switch (themeName) {
    case 'mono':
      return {
        themeLabel: 'Noir White Vinyl',
        discBg: 'bg-gradient-to-br from-white via-zinc-100 to-zinc-200',
        borderColor: 'border-white',
        borderGlow: '0 0 25px rgba(255, 255, 255, 0.65)',
        haloColor: 'rgba(255, 255, 255, 0.7)',
        grooves:
          'repeating-radial-gradient(circle at center, #ffffff 0px, #ffffff 1px, #f4f4f5 1.5px, #e4e4e7 2.5px, #d4d4d8 3.5px)',
        turntableGrooves:
          'repeating-radial-gradient(circle at center, #ffffff 0px, #ffffff 1.5px, #f4f4f5 2px, #e4e4e7 3px, #a1a1aa 4.5px)',
        sheenConic:
          'conic-gradient(from 45deg, transparent 0deg, rgba(0,0,0,0.12) 60deg, transparent 120deg, rgba(0,0,0,0.08) 240deg, transparent 300deg)',
        badgeBg: 'bg-black text-white border-white/60',
        badgeBars: 'bg-white',
        centerBg: 'bg-black border-white/80',
        centerSpindle: 'bg-white border-black',
        primaryBtn: 'bg-white text-black hover:bg-zinc-200',
        primaryBtnIcon: 'fill-black text-black',
      };
    case 'cosmic':
      return {
        themeLabel: 'Cosmic Pink Vinyl',
        discBg: 'bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600',
        borderColor: 'border-pink-400',
        borderGlow: '0 0 25px rgba(236, 72, 153, 0.7)',
        haloColor: 'rgba(236, 72, 153, 0.7)',
        grooves:
          'repeating-radial-gradient(circle at center, #fbcfe8 0px, #f472b6 1.5px, #ec4899 2px, #be185d 3px, #831843 4px)',
        turntableGrooves:
          'repeating-radial-gradient(circle at center, #fbcfe8 0px, #f472b6 1.5px, #ec4899 2.5px, #be185d 3.5px, #701a75 5px)',
        sheenConic:
          'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg, rgba(255,255,255,0.2) 240deg, transparent 300deg)',
        badgeBg: 'bg-neutral-950 text-pink-400 border-pink-400/50',
        badgeBars: 'bg-pink-400',
        centerBg: 'bg-purple-950 border-pink-400',
        centerSpindle: 'bg-black border-pink-400',
        primaryBtn: 'bg-pink-500 text-white hover:bg-pink-400',
        primaryBtnIcon: 'fill-white text-white',
      };
    case 'crimson':
    default:
      return {
        themeLabel: 'Crimson Red Vinyl',
        discBg: 'bg-gradient-to-br from-red-500 via-red-600 to-red-800',
        borderColor: 'border-red-400',
        borderGlow: '0 0 25px rgba(239, 68, 68, 0.7)',
        haloColor: 'rgba(239, 68, 68, 0.7)',
        grooves:
          'repeating-radial-gradient(circle at center, #fca5a5 0px, #ef4444 1.5px, #dc2626 2px, #991b1b 3px, #7f1d1d 4px)',
        turntableGrooves:
          'repeating-radial-gradient(circle at center, #fca5a5 0px, #ef4444 1.5px, #dc2626 2.5px, #991b1b 3.5px, #450a0a 5px)',
        sheenConic:
          'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg, rgba(255,255,255,0.2) 240deg, transparent 300deg)',
        badgeBg: 'bg-neutral-950 text-red-400 border-red-500/50',
        badgeBars: 'bg-red-500',
        centerBg: 'bg-black border-red-500',
        centerSpindle: 'bg-black border-red-500',
        primaryBtn: 'bg-red-500 text-white hover:bg-red-400',
        primaryBtnIcon: 'fill-white text-white',
      };
  }
};

export const MusicPlayer = () => {
  const { theme } = useTheme();
  // By default playing as requested
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isLooping, setIsLooping] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef(false);
  const userPausedRef = useRef(false);

  // Styling based on secondary colour for active theme
  const sec = getDiscSecondaryStyle(theme);

  // Active theme mascot for center vinyl label
  const activeMascot =
    theme === 'mono'
      ? noirMascot
      : theme === 'cosmic'
      ? cosmicMascot
      : crimsonMascot;

  // Resilient autoplay on mount with immediate user-gesture unlock
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let hasCleanedUp = false;

    const tryPlay = () => {
      if (hasCleanedUp || !audio || userPausedRef.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            removeListeners();
          })
          .catch(() => {
            // Autoplay blocked by browser policy; waiting for user interaction
          });
      }
    };

    const handleUserGesture = () => {
      if (!userPausedRef.current && audio && audio.paused) {
        tryPlay();
      }
    };

    const gestureEvents = [
      'pointerdown',
      'click',
      'touchstart',
      'touchend',
      'keydown',
      'scroll',
      'wheel',
    ];

    const removeListeners = () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, handleUserGesture);
        document.removeEventListener(ev, handleUserGesture);
      });
    };

    // 1. Attempt immediate autoplay
    tryPlay();

    // 2. Attach gesture listeners for instant unlock on first interaction
    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, handleUserGesture, { passive: true });
      document.addEventListener(ev, handleUserGesture, { passive: true });
    });

    return () => {
      hasCleanedUp = true;
      removeListeners();
    };
  }, []);

  // Sync volume & loop with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isLooping]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      userPausedRef.current = false;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented by browser policy:', err);
        });
    } else {
      userPausedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

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

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

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
  }, [togglePlay, isOpen]);

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
      const newTime = Math.max(
        0,
        Math.min(duration, audioRef.current.currentTime + offsetSeconds)
      );
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleEnded = () => {
    if (!isLooping) {
      setIsPlaying(false);
    }
  };

  // Disc drag vs click distinction
  const onDragStart = () => {
    isDraggingRef.current = true;
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
      {/* Hidden HTML5 Audio Element with autoPlay & preload */}
      <audio
        ref={audioRef}
        src={terrorAudio}
        autoPlay
        loop={isLooping}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* DRAGGABLE ROTATING VINYL DISC ON THE RIGHT SIDE */}
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
          // Placed on the right side by default, directly above the mascot companion
          bottom: '5.5rem',
          right: '1.25rem',
        }}
        aria-label="Floating Vinyl Music Player - Drag anywhere, click to open player"
      >
        <div
          onClick={onDiscClick}
          className="relative group p-1.5 rounded-full"
          title="Terror - Reble (prod by Tre Ess) • Drag anywhere, Click to open player"
        >
          {/* Outer Pulsing Sound Halo in Secondary Color when playing */}
          {isPlaying && (
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.35, 0.75, 0.35],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full blur-md pointer-events-none"
              style={{
                backgroundColor: sec.haloColor,
              }}
            />
          )}

          {/* The Vinyl Disc Body Styled in Secondary Colour */}
          <div
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ${sec.discBg} p-[2px] shadow-2xl border ${sec.borderColor}`}
            style={{
              boxShadow: isPlaying ? sec.borderGlow : undefined,
            }}
          >
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
              {/* Concentric Vinyl Grooves Pattern in Secondary Colour */}
              <div
                className="absolute inset-0 rounded-full opacity-80"
                style={{
                  background: sec.grooves,
                }}
              />

              {/* Anisotropic Light Reflection Sheen */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: sec.sheenConic,
                }}
              />

              {/* Center Vinyl Label with Mascot */}
              <div
                className={`relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full ${sec.centerBg} p-[1.5px] shadow-inner flex items-center justify-center`}
              >
                <img
                  src={activeMascot}
                  alt="Track Center Artwork"
                  className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                />
                {/* Center Spindle Hole */}
                <div
                  className={`absolute w-1.5 h-1.5 rounded-full ${sec.centerSpindle} shadow-inner`}
                />
              </div>
            </div>

            {/* Quick Play/Pause Status Floating Badge on disc */}
            <div className="absolute -top-1 -right-1 z-20 flex items-center justify-center">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className={`w-5 h-5 rounded-full ${sec.badgeBg} flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer border`}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <div className="flex items-center gap-[1.5px]">
                    <span
                      className={`w-[1.5px] h-2 ${sec.badgeBars} rounded-full animate-pulse`}
                    />
                    <span
                      className={`w-[1.5px] h-3 ${sec.badgeBars} rounded-full animate-pulse delay-75`}
                    />
                    <span
                      className={`w-[1.5px] h-1.5 ${sec.badgeBars} rounded-full animate-pulse delay-150`}
                    />
                  </div>
                ) : (
                  <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                )}
              </div>
            </div>
          </div>

          {/* Hover Tooltip */}
          <div className="absolute right-0 -top-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-2.5 py-1 rounded-md bg-neutral-950/90 border border-white/15 text-[10px] font-mono text-zinc-300 shadow-xl backdrop-blur-md">
            {isPlaying ? 'Playing • Click for Deck' : 'Terror - Reble • Click to Play'}
          </div>
        </div>
      </motion.div>

      {/* MUSIC PLAYER CENTERED MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur to close on click outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            />

            {/* Glassmorphic Player Card - Perfectly Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-sm bg-neutral-950/95 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
              style={{
                boxShadow: isPlaying
                  ? `0 25px 60px -15px ${sec.haloColor}`
                  : '0 25px 50px -12px rgba(0,0,0,0.7)',
              }}
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-25"
                style={{ backgroundColor: sec.haloColor }}
              />

              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {isPlaying && (
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: sec.haloColor }}
                      />
                    )}
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: sec.haloColor }}
                    />
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

              {/* Showcase Turntable & Vinyl in Secondary Colour */}
              <div className="relative py-4 flex flex-col items-center justify-center">
                {/* Turntable Sleeve with Spinning Vinyl */}
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  {/* Turntable Base Platter */}
                  <div className="absolute inset-0 rounded-full bg-neutral-900/90 border border-white/10 shadow-inner" />

                  {/* Spinning Vinyl Styled in Theme's Secondary Colour */}
                  <div
                    className={`relative w-32 h-32 rounded-full shadow-2xl p-1 flex items-center justify-center ${
                      sec.discBg
                    } border ${sec.borderColor} ${isPlaying ? 'animate-spin' : ''}`}
                    style={{
                      animationDuration: '4s',
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite',
                      boxShadow: isPlaying ? sec.borderGlow : undefined,
                    }}
                  >
                    {/* Vinyl Grooves in Secondary Colour */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: sec.turntableGrooves,
                      }}
                    />

                    {/* Sheen */}
                    <div
                      className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
                      style={{
                        background: sec.sheenConic,
                      }}
                    />

                    {/* Vinyl Center Label */}
                    <div
                      className={`relative z-10 w-11 h-11 rounded-full ${sec.centerBg} p-0.5 border flex items-center justify-center shadow-lg`}
                    >
                      <img
                        src={activeMascot}
                        alt="Center Mascot"
                        className="w-full h-full object-cover rounded-full select-none"
                      />
                      <div
                        className={`absolute w-2 h-2 rounded-full ${sec.centerSpindle}`}
                      />
                    </div>
                  </div>

                  {/* Tonearm Needle */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 22 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute -top-1 right-1 w-10 h-18 origin-top-right pointer-events-none z-20"
                  >
                    <div className="w-1.5 h-14 bg-gradient-to-b from-zinc-200 to-zinc-400 rounded-full shadow-md ml-auto mr-1" />
                    <div
                      className="w-3 h-3.5 rounded-sm -mt-0.5 ml-auto mr-0.5 shadow-sm"
                      style={{ backgroundColor: sec.haloColor }}
                    />
                  </motion.div>
                </div>

                {/* Track Information */}
                <div className="text-center mt-3.5 space-y-1">
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
                      {sec.themeLabel.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Timestamps */}
              <div className="space-y-1.5 pt-2">
                <div className="relative flex items-center group w-full">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Seek audio position"
                    className="player-slider w-full cursor-pointer focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, var(--theme-primary) 0%, var(--theme-primary) ${progressPercent}%, #27272a ${progressPercent}%, #27272a 100%)`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-0.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls - 100% Mathematically Centered Grid */}
              <div className="grid grid-cols-5 items-center pt-3.5">
                {/* 1. Loop toggle (Left) */}
                <div className="flex justify-start">
                  <button
                    onClick={() => setIsLooping((prev) => !prev)}
                    className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                      isLooping
                        ? 'text-[var(--theme-primary)] bg-white/5 border border-white/10'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title={isLooping ? 'Loop: On' : 'Loop: Off'}
                    aria-label="Toggle loop"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Rewind 10s (Mid-Left) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSkip(-10)}
                    className="p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Rewind 10 seconds"
                    aria-label="Rewind 10 seconds"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* 3. Primary Play / Pause Button (DEAD CENTER) */}
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={togglePlay}
                    className={`w-13 h-13 rounded-full ${sec.primaryBtn} flex items-center justify-center shadow-lg transition-transform cursor-pointer`}
                    style={{
                      boxShadow: isPlaying ? sec.borderGlow : undefined,
                    }}
                    title={isPlaying ? 'Pause' : 'Play'}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                  >
                    {isPlaying ? (
                      <Pause className={`w-5 h-5 ${sec.primaryBtnIcon}`} />
                    ) : (
                      <Play className={`w-5 h-5 ${sec.primaryBtnIcon} ml-0.5`} />
                    )}
                  </motion.button>
                </div>

                {/* 4. Forward 10s (Mid-Right) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSkip(10)}
                    className="p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Skip 10 seconds"
                    aria-label="Skip 10 seconds"
                  >
                    <RotateCw className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* 5. Restart Button (Right Anchor for Perfect Symmetry) */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        setCurrentTime(0);
                      }
                    }}
                    className="p-2.5 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Restart track from beginning"
                    aria-label="Restart track"
                  >
                    <RotateCcw className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>
              </div>

              {/* Volume Slider Bar */}
              <div className="pt-3.5 flex items-center gap-3 px-1">
                <Volume2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Volume slider"
                  className="player-slider w-full cursor-pointer focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, var(--theme-primary) 0%, var(--theme-primary) ${Math.round(
                      volume * 100
                    )}%, #27272a ${Math.round(volume * 100)}%, #27272a 100%)`,
                  }}
                />
                <span className="text-[10px] font-mono text-zinc-400 w-8 text-right flex-shrink-0">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Footer Shortcuts Hint */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
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
