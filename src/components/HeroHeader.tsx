import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Heart } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';

interface HeroHeaderProps {
  onScrollToStart: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onScrollToStart }) => {
  // Determine number and 2-line title breakdown
  const numberPart = giftConfig.hero.titleNumber || (giftConfig.hero.title.match(/^(\d+)/)?.[1] ?? '');
  
  let line1 = giftConfig.hero.titleLine1;
  let line2 = giftConfig.hero.titleLine2;

  // Fallback auto-split if not explicitly provided
  if (!line1 || !line2) {
    const rawText = giftConfig.hero.title.replace(/^(\d+)\s*/, '').trim();
    const words = rawText.split(' ');
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  }

  return (
    <header className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 max-w-4xl mx-auto">
      {/* Decorative Floating Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-candle-glow/20 blur-3xl pointer-events-none -z-10" />

      {/* Top Badge (Only 'Happy 23rd birthday, love') */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-100/90 border border-champagne-200 text-champagne-800 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-roseGold-500" />
        <span>{giftConfig.hero.badge}</span>
      </motion.div>

      {/* Hero Title Lockup: Number on the Left, 2-line Wording on the Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 sm:mb-10 flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-visible max-w-full px-2"
      >
        {numberPart && (
          <span className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl bg-gradient-to-br from-roseGold-600 via-champagne-600 to-roseGold-700 bg-clip-text text-transparent drop-shadow-sm select-none leading-tight pt-2 pb-4 pl-1 pr-3.5 sm:pr-4 inline-block overflow-visible -translate-y-1.5 sm:-translate-y-3 shrink-0">
            {numberPart}
          </span>
        )}

        <div className="flex flex-col text-left justify-center font-serif leading-[1.05] sm:leading-[1.1] relative">
          <span className="text-xl sm:text-3xl md:text-4xl text-roseGold-700 font-medium tracking-tight">
            {line1}
          </span>
          <span className="text-2xl sm:text-4xl md:text-5xl text-champagne-900 font-bold tracking-tight">
            {line2}
          </span>
          <span className="text-right font-serif italic text-xs sm:text-sm md:text-base text-roseGold-600 font-normal tracking-wide mt-0.5 sm:mt-1 select-none">
            *to me
          </span>
        </div>
      </motion.div>

      {/* Dedication Subtitle (if present) */}
      {giftConfig.hero.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-base sm:text-lg md:text-xl text-champagne-700 max-w-xl leading-relaxed mb-10"
        >
          {giftConfig.hero.subtitle}
        </motion.p>
      )}

      {/* Gentle Scroll CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col items-center gap-3"
      >
        <button
          onClick={onScrollToStart}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-champagne-900 hover:bg-champagne-800 text-champagne-50 font-medium text-sm transition-all shadow-card hover:shadow-candle"
        >
          <Heart className="w-4 h-4 text-roseGold-300 fill-roseGold-300 group-hover:scale-110 transition-transform" />
          <span>{giftConfig.hero.scrollPrompt}</span>
        </button>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-champagne-500 cursor-pointer"
          onClick={onScrollToStart}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </header>
  );
};
