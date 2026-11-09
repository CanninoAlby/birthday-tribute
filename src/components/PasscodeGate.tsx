import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { triggerGrandCelebration } from '../utils/confetti';

interface PasscodeGateProps {
  onUnlock: () => void;
}

export const PasscodeGate: React.FC<PasscodeGateProps> = ({ onUnlock }) => {
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim().toLowerCase() === giftConfig.security.passcode.trim().toLowerCase()) {
      setIsUnlocking(true);
      setError(false);
      triggerGrandCelebration();
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-10 bg-gradient-to-b from-champagne-100 via-champagne-50 to-champagne-100">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-champagne-200 shadow-soft text-center relative overflow-hidden"
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-roseGold-400 via-champagne-400 to-roseGold-400" />

        {/* Icon Lock / Unlock */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-champagne-100 flex items-center justify-center text-champagne-700 shadow-inner">
          <AnimatePresence mode="wait">
            {isUnlocking ? (
              <motion.div
                key="unlocked"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-roseGold-600"
              >
                <Unlock className="w-8 h-8 stroke-[1.75]" />
              </motion.div>
            ) : (
              <motion.div
                key="locked"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Lock className="w-8 h-8 stroke-[1.75]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-700 text-xs font-medium uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Private Birthday Invitation</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-champagne-900 mb-2">
          {giftConfig.security.lockScreenTitle}
        </h1>

        <p className="text-sm text-champagne-700 font-sans mb-8">
          {giftConfig.security.lockScreenSubtitle}
        </p>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <input
              type="text"
              autoFocus
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              placeholder="Enter passcode..."
              className={`w-full px-5 py-3.5 rounded-2xl bg-champagne-50/70 border text-center font-sans tracking-widest text-lg text-champagne-900 placeholder:text-champagne-400 placeholder:tracking-normal focus:outline-none transition-all duration-200 ${
                error
                  ? 'border-red-400 ring-2 ring-red-200 bg-red-50/50'
                  : 'border-champagne-300 focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200'
              }`}
            />
          </motion.div>

          <button
            type="submit"
            disabled={!enteredCode.trim() || isUnlocking}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-champagne-600 via-champagne-500 to-roseGold-500 hover:from-champagne-700 hover:to-roseGold-600 text-white font-medium shadow-candle flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isUnlocking ? (
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                Unwrapping...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Unlock Birthday Surprise</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </button>
        </form>

        {/* Hint Section */}
        <div className="mt-6 pt-4 border-t border-champagne-100 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs text-champagne-600 hover:text-champagne-800 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need a clue?</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-xs text-champagne-700 bg-champagne-100/70 rounded-xl px-3 py-2 border border-champagne-200"
              >
                {giftConfig.security.passcodeHint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
