import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ReasonItem } from '../types';

interface ScrollyCardProps {
  reason: ReasonItem;
  index: number;
  total: number;
}

export const ScrollyCard: React.FC<ScrollyCardProps> = ({ reason, index, total }) => {
  const [likes, setLikes] = useState(0);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const formattedNumber = String(reason.id || index + 1).padStart(2, '0');

  return (
    <div
      id={`reason-card-${index}`}
      className="min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center py-6 sm:py-8 px-3 sm:px-4 snap-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-9 border border-champagne-200/90 shadow-card hover:shadow-candle transition-all duration-300 relative overflow-hidden group"
      >
        {/* Top Header: Reason Number */}
        <div className="flex items-center justify-between mb-5 border-b border-champagne-100/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-serif text-roseGold-600 font-bold text-lg sm:text-xl">
              #{formattedNumber}
            </span>
            <span className="text-xs uppercase tracking-widest text-champagne-400 font-sans">
              of {total}
            </span>
          </div>
        </div>

        {/* Reason Content (Pure Intimate Words) */}
        <p className="font-serif text-base sm:text-lg text-champagne-900 leading-relaxed sm:leading-loose mb-6">
          {reason.description}
        </p>

        {/* Bottom Reaction Row */}
        <div className="pt-3 border-t border-champagne-100/80 flex items-center justify-end">
          <div className="relative">
            <button
              onClick={handleLike}
              className={`p-2.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
                likes > 0
                  ? 'bg-roseGold-50 border-roseGold-300 text-roseGold-600 shadow-sm'
                  : 'bg-white border-champagne-200 text-champagne-600 hover:text-roseGold-600 hover:bg-roseGold-50/50'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  likes > 0 ? 'fill-roseGold-600 scale-110' : ''
                }`}
              />
              {likes > 0 && (
                <span className="text-xs font-semibold">{likes}</span>
              )}
            </button>

            {/* Heart Burst Particle */}
            {showHeartBurst && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -24, scale: 1.4 }}
                transition={{ duration: 0.7 }}
                className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none text-roseGold-500"
              >
                <Heart className="w-5 h-5 fill-roseGold-500" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
