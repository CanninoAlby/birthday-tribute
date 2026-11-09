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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm px-1"
    >
      <div className="bg-white/90 backdrop-blur-md border border-champagne-200/90 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full shadow-card flex items-center justify-between gap-2 sm:gap-3 text-xs">
        {/* Counter label - Guaranteed not to shrink */}
        <div className="flex items-center gap-1 sm:gap-1.5 font-sans font-medium text-champagne-800 shrink-0 whitespace-nowrap text-[11px] sm:text-xs">
          <Heart className="w-3.5 h-3.5 text-roseGold-500 fill-roseGold-500 shrink-0" />
          <span>
            Reason <span className="font-semibold text-champagne-900">{currentNumber}</span> of {totalReasons}
          </span>
        </div>

        {/* Flexible Bar */}
        <div className="flex-1 min-w-[40px] max-w-[90px] sm:max-w-[120px] h-1.5 bg-champagne-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-roseGold-400 to-champagne-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Percentage - Guaranteed not to clip */}
        <span className="text-[10px] sm:text-[11px] font-sans font-medium text-champagne-500 shrink-0 tabular-nums">
          {progressPercent}%
        </span>
      </div>
    </motion.div>
  );
};
