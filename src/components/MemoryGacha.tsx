import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, Sparkles, CircleDot, RefreshCw } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { MemorySnapshot } from '../types';

export const MemoryGacha: React.FC = () => {
  const memories = giftConfig.memories || [];
  const [currentMemory, setCurrentMemory] = useState<MemorySnapshot | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [discoveredIds, setDiscoveredIds] = useState<Set<number>>(new Set());
  const [isPlayingLive, setIsPlayingLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const rollMemory = () => {
    if (memories.length === 0 || isRolling) return;
    setIsRolling(true);
    setIsPlayingLive(false);

    // Pick a memory (try to pick a different one if multiple exist)
    let randomPick = memories[Math.floor(Math.random() * memories.length)];
    if (memories.length > 1 && currentMemory && randomPick.id === currentMemory.id) {
      const alternatives = memories.filter((m) => m.id !== currentMemory.id);
      randomPick = alternatives[Math.floor(Math.random() * alternatives.length)];
    }

    setTimeout(() => {
      setCurrentMemory(randomPick);
      setDiscoveredIds((prev) => new Set(prev).add(randomPick.id));
      setIsRolling(false);
    }, 500);
  };

  const handleStartLive = () => {
    if (currentMemory?.videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlayingLive(true);
    }
  };

  const handleStopLive = () => {
    if (currentMemory?.videoUrl && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayingLive(false);
    }
  };

  const toggleLiveOnMobile = () => {
    if (!currentMemory?.videoUrl || !videoRef.current) return;
    if (isPlayingLive) {
      handleStopLive();
    } else {
      handleStartLive();
    }
  };

  if (memories.length === 0) return null;

  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center py-16 px-4 relative z-10">
      <div className="w-full max-w-xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 border border-champagne-200 text-champagne-800 text-xs font-medium uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-roseGold-500" />
          <span>Interactive Memory Capsule</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-champagne-900 mb-2">
          Memory Gacha
        </h2>

        <p className="text-sm sm:text-base text-champagne-700 font-sans max-w-md mx-auto mb-6">
          Whenever you want to look back on a moment, roll to draw a random snapshot from our journey together.
        </p>

        {/* Counter of Discovered Memories */}
        <div className="text-xs font-medium text-champagne-500 mb-6">
          Discovered <span className="text-roseGold-700 font-bold">{discoveredIds.size}</span> of {memories.length} moments
        </div>

        {/* Polaroid Display or Initial Roll Prompt with fixed min-height to prevent layout shifts */}
        <div className="min-h-[440px] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            {isRolling ? (
              <motion.div
                key="rolling"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className="w-72 sm:w-80 h-[380px] bg-champagne-100/90 rounded-3xl border-2 border-dashed border-champagne-300 flex flex-col items-center justify-center p-6 shadow-soft select-none"
              >
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-sm mb-3">
                  <Dices className="w-8 h-8 text-roseGold-500 animate-spin" />
                </div>
                <p className="font-serif italic text-champagne-800 text-sm font-medium">
                  Drawing a random moment...
                </p>
              </motion.div>
            ) : currentMemory ? (
              /* Polaroid Card Presentation */
              <motion.div
                key={currentMemory.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm bg-white rounded-2xl p-4 sm:p-5 pb-6 border border-champagne-200 shadow-2xl relative select-none touch-pan-y"
              >
                {/* Washi Tape Decal on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-champagne-200/70 border border-champagne-300/60 rounded-sm rotate-[-2deg] shadow-xs pointer-events-none" />

                {/* Photo Frame */}
                <div
                  className="relative aspect-square w-full rounded-xl overflow-hidden bg-champagne-100 border border-champagne-100 shadow-inner cursor-pointer touch-pan-y select-none"
                  onMouseEnter={handleStartLive}
                  onMouseLeave={handleStopLive}
                  onClick={toggleLiveOnMobile}
                >
                  <img
                    draggable={false}
                    src={currentMemory.imageUrl}
                    alt={currentMemory.caption}
                    className={`w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none select-none ${
                      isPlayingLive ? 'opacity-0' : 'opacity-100'
                    }`}
                  />

                  {currentMemory.videoUrl && (
                    <video
                      ref={videoRef}
                      src={currentMemory.videoUrl}
                      playsInline
                      webkit-playsinline="true"
                      muted
                      loop
                      preload="metadata"
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none ${
                        isPlayingLive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {/* Live Photo Badge */}
                  {currentMemory.videoUrl && (
                    <div
                      className={`absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md text-[10px] font-medium transition-all pointer-events-none ${
                        isPlayingLive
                          ? 'bg-roseGold-500/90 text-white'
                          : 'bg-black/45 text-white/90'
                      }`}
                    >
                      <CircleDot className={`w-3 h-3 ${isPlayingLive ? 'animate-pulse' : ''}`} />
                      <span>LIVE</span>
                    </div>
                  )}
                </div>

                {/* Optional Polaroid Caption */}
                {currentMemory.caption && (
                  <div className="mt-4 text-center px-2">
                    <p className="font-serif italic text-base sm:text-lg text-champagne-900 leading-snug">
                      "{currentMemory.caption}"
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Initial State: Empty Gacha Ready to Roll */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className="w-72 sm:w-80 h-[380px] bg-white/70 backdrop-blur-md rounded-3xl border-2 border-champagne-200 flex flex-col items-center justify-center p-6 text-center shadow-card select-none"
              >
                <div className="w-16 h-16 rounded-2xl bg-champagne-100 flex items-center justify-center text-champagne-700 mb-4 shadow-inner">
                  <Dices className="w-8 h-8 text-roseGold-600 stroke-[1.75]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-champagne-900 mb-1">
                  Ready to Draw?
                </h3>
                <p className="text-xs text-champagne-600 max-w-[200px] mb-2 font-sans">
                  Click the button below to pull a random polaroid snapshot from our memories.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <button
          onClick={rollMemory}
          disabled={isRolling}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-roseGold-500 via-champagne-600 to-roseGold-600 hover:from-roseGold-600 hover:to-champagne-700 text-white font-medium text-sm shadow-candle hover:shadow-candle-lg transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          {isRolling ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Rolling...</span>
            </>
          ) : currentMemory ? (
            <>
              <Dices className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Roll Another Memory</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Roll a Memory</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
