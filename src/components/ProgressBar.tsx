import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ProgressBarProps {
  currentReasonIndex: number;
  totalReasons: number;
  visible: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentReasonIndex,
  totalReasons,
  visible,
}) => {
  if (!visible) return null;

  const currentNumber = Math.min(Math.max(currentReasonIndex + 1, 1), totalReasons);
  const progressPercent = Math.round((currentNumber / totalReasons) * 100);

  return (
    <div className="fixed top-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xs bg-white/95 backdrop-blur-md border border-champagne-200/90 py-1.5 px-3.5 rounded-full shadow-card flex items-center justify-between gap-2.5 text-xs pointer-events-auto"
      >
        {/* Counter label */}
        <div className="flex items-center gap-1.5 font-sans font-medium text-champagne-800 shrink-0 text-xs">
          <Heart className="w-3.5 h-3.5 text-roseGold-500 fill-roseGold-500 shrink-0" />
          <span>
            Reason <span className="font-semibold text-champagne-900">{currentNumber}</span> of {totalReasons}
          </span>
        </div>

        {/* Flexible Bar */}
        <div className="flex-1 min-w-[32px] max-w-[80px] h-1.5 bg-champagne-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-roseGold-400 to-champagne-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="text-[11px] font-sans font-medium text-champagne-500 shrink-0 tabular-nums">
          {progressPercent}%
        </span>
      </motion.div>
    </div>
  );
};
