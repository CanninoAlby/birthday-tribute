import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc3, Music } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';

interface FloatingAudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const FloatingAudioPlayer: React.FC<FloatingAudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay policy prevented it, prompt user to tap
        setShowPrompt(true);
      });
    }
  }, [autoPlayTrigger, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);
    setShowPrompt(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={giftConfig.audio.audioUrl}
        loop
        preload="auto"
      />

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {/* Friendly Initial Invite Prompt */}
        <AnimatePresence>
          {showPrompt && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-card border border-champagne-200 text-xs text-champagne-800 flex items-center gap-2 cursor-pointer hover:bg-white transition-colors"
              onClick={togglePlay}
            >
              <Music className="w-3.5 h-3.5 text-roseGold-500 animate-bounce" />
              <span>{giftConfig.audio.autoPlayPrompt}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Player Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 bg-white/85 backdrop-blur-md border border-champagne-200/90 py-2 px-3 rounded-full shadow-card hover:shadow-candle transition-all duration-300"
        >
          {/* Vinyl Disc Icon */}
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause music" : "Play music"}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-champagne-900 text-champagne-100 hover:text-white transition-colors shadow-sm focus:outline-none"
          >
            <Disc3
              className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow text-roseGold-300' : ''}`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
            </div>
          </button>

          {/* Song Details */}
          <div className="max-w-[130px] sm:max-w-[180px] overflow-hidden cursor-pointer" onClick={togglePlay}>
            <p className="text-xs font-medium text-champagne-900 truncate">
              {giftConfig.audio.title}
            </p>
            <p className="text-[10px] text-champagne-600 truncate">
              {isPlaying ? 'Now Playing' : giftConfig.audio.artist}
            </p>
          </div>

          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            className="p-1.5 rounded-full text-champagne-600 hover:text-champagne-900 hover:bg-champagne-100/60 transition-colors focus:outline-none"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-roseGold-600" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </motion.div>
      </div>
    </>
  );
};
