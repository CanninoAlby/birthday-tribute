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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm"
    >
      <div className="bg-white/85 backdrop-blur-md border border-champagne-200/90 py-2 px-4 rounded-full shadow-card flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-sans font-medium text-champagne-800">
          <Heart className="w-3.5 h-3.5 text-roseGold-500 fill-roseGold-500" />
          <span>Reason <span className="font-semibold text-champagne-900">{currentNumber}</span> of {totalReasons}</span>
        </div>

        <div className="flex-1 max-w-[120px] h-1.5 bg-champagne-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-roseGold-400 to-champagne-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <span className="text-[11px] font-sans font-medium text-champagne-500">
          {progressPercent}%
        </span>
      </div>
    </motion.div>
  );
};
