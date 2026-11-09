import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Wind, RotateCcw } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { triggerGrandCelebration, triggerSideCannons } from '../utils/confetti';

interface BirthdayCakeProps {
  onOpenLetter: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onOpenLetter }) => {
  const [candlesLit, setCandlesLit] = useState(true);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    triggerGrandCelebration();
    triggerSideCannons();
  };

  const handleRelight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCandlesLit(true);
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center relative z-10">
      <div
        className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-champagne-200/90 shadow-card relative overflow-hidden"
      >
        {/* Ambient Candlelight Glow */}
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full transition-opacity duration-1000 pointer-events-none -z-10 ${
            candlesLit ? 'bg-candle-glow/35 blur-3xl opacity-100' : 'opacity-0'
          }`}
        />

        {/* Section Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 border border-champagne-200 text-champagne-800 text-xs font-medium uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-roseGold-500" />
          <span>The Birthday Finale</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-champagne-900 mb-2">
          {giftConfig.finale.cakeTitle}
        </h2>

        <p className="text-sm sm:text-base text-champagne-700 font-sans max-w-md mx-auto mb-6">
          {candlesLit
            ? giftConfig.finale.blowCandlesPrompt
            : giftConfig.finale.candlesBlownMessage}
        </p>

        {/* High-Fidelity Properly Grounded Birthday Cake */}
        <div
          onClick={handleBlowCandles}
          className="relative w-full max-w-[320px] mx-auto my-4 cursor-pointer select-none group"
          title={candlesLit ? "Tap or click to blow out the candles!" : "Candles are blown out!"}
        >
          <svg
            viewBox="0 0 320 280"
            className="w-full h-auto drop-shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
          >
            <defs>
              {/* Flame Glow Filter */}
              <filter id="flame-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {/* Gradients */}
              <linearGradient id="plateStand" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EDE5DA" />
                <stop offset="100%" stopColor="#D5C5B3" />
              </linearGradient>
              <linearGradient id="plateSurface" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F9F6F0" />
                <stop offset="100%" stopColor="#ECE3D7" />
              </linearGradient>
              <linearGradient id="cakeCream1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FAF4EB" />
                <stop offset="40%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F2E6D6" />
              </linearGradient>
              <linearGradient id="cakeCream2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7EFE4" />
                <stop offset="50%" stopColor="#FFFDF9" />
                <stop offset="100%" stopColor="#EEDFCF" />
              </linearGradient>
              <linearGradient id="roseFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5B7B1" />
                <stop offset="100%" stopColor="#E18A8A" />
              </linearGradient>
              <linearGradient id="candleBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4A373" />
                <stop offset="50%" stopColor="#FFF2D6" />
                <stop offset="100%" stopColor="#C9935E" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#E65100" />
                <stop offset="45%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#FFFDE7" />
              </linearGradient>
            </defs>

            {/* 1. Cake Pedestal & Plate (Completely grounded) */}
            <ellipse cx="160" cy="254" rx="56" ry="9" fill="#C5B5A2" opacity="0.4" />
            <path d="M 142 250 L 152 222 L 168 222 L 178 250 Z" fill="url(#plateStand)" stroke="#C5B5A2" strokeWidth="1" />
            {/* Plate Rim */}
            <ellipse cx="160" cy="222" rx="126" ry="16" fill="url(#plateSurface)" stroke="#D8C8B5" strokeWidth="1.5" />
            <ellipse cx="160" cy="221" rx="114" ry="13" fill="#EDE4D8" stroke="#D3C1AD" strokeWidth="1" />

            {/* 2. Bottom Tier Cake (Grounded firmly inside plate basin) */}
            {/* Cake Cylinder Base extending to y=228 */}
            <path
              d="M 68 170 L 68 214 C 68 226 108 234 160 234 C 212 234 252 226 252 214 L 252 170 Z"
              fill="url(#cakeCream2)"
              stroke="#D8C8B5"
              strokeWidth="1.5"
            />
            {/* Contact Shadow on Plate */}
            <ellipse cx="160" cy="220" rx="92" ry="11" fill="none" stroke="rgba(77, 52, 38, 0.12)" strokeWidth="3" />
            {/* Top Surface of Bottom Tier */}
            <ellipse cx="160" cy="170" rx="92" ry="15" fill="url(#cakeCream1)" stroke="#D8C8B5" strokeWidth="1.5" />

            {/* Bottom Tier Frosting Swag & Pearl Accents */}
            <path
              d="M 68 174 Q 92 192 114 178 Q 138 194 160 180 Q 182 194 206 178 Q 228 192 252 174"
              fill="none"
              stroke="#E8A9A9"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {[92, 138, 182, 228].map((x, i) => (
              <circle key={`pearl-${i}`} cx={x} cy={185} r="3.5" fill="#FFFFFF" stroke="#DCA2A0" strokeWidth="1" />
            ))}

            {/* 3. Top Tier Cake (Grounded firmly on bottom tier) */}
            <path
              d="M 104 122 L 104 166 C 104 176 128 182 160 182 C 192 182 216 176 216 166 L 216 122 Z"
              fill="url(#cakeCream2)"
              stroke="#D8C8B5"
              strokeWidth="1.5"
            />
            {/* Contact Shadow between tiers */}
            <ellipse cx="160" cy="168" rx="56" ry="8" fill="none" stroke="rgba(77, 52, 38, 0.1)" strokeWidth="2.5" />
            {/* Top Surface of Top Tier (y=122) */}
            <ellipse cx="160" cy="122" rx="56" ry="11" fill="url(#cakeCream1)" stroke="#D8C8B5" strokeWidth="1.5" />

            {/* Top Tier Strawberry Drip Icing */}
            <path
              d="M 104 124 C 111 137 116 131 122 127 C 130 141 136 137 142 128 C 150 143 158 141 164 128 C 172 142 180 136 186 127 C 194 139 202 133 208 126 C 213 130 216 124 216 124"
              fill="none"
              stroke="url(#roseFrosting)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Cream Rosettes around cake top edge */}
            {[
              { cx: 114, cy: 122 },
              { cx: 136, cy: 128 },
              { cx: 160, cy: 131 },
              { cx: 184, cy: 128 },
              { cx: 206, cy: 122 },
            ].map((pt, i) => (
              <g key={`rosette-top-${i}`}>
                <ellipse cx={pt.cx} cy={pt.cy} rx="6" ry="3.5" fill="#FFFFFF" stroke="#E2D4C3" strokeWidth="1" />
                {i % 2 === 0 && (
                  <circle cx={pt.cx} cy={pt.cy - 2} r="3" fill="#D9534F" />
                )}
              </g>
            ))}

            {/* 4. Birthday Candles (Anchored securely into the top frosting) */}
            {[
              { x: 136, y: 124, h: 36 },
              { x: 160, y: 126, h: 42 }, // Center candle slightly taller
              { x: 184, y: 124, h: 36 },
            ].map((c, i) => (
              <g key={`candle-grounded-${i}`}>
                {/* Frosting mound anchoring candle base to cake */}
                <ellipse cx={c.x} cy={c.y + 0.5} rx="5.5" ry="3" fill="#FFFFFF" stroke="#E2D4C3" strokeWidth="1" />

                {/* Candle Stick */}
                <rect
                  x={c.x - 3.5}
                  y={c.y - c.h}
                  width="7"
                  height={c.h}
                  rx="1.5"
                  fill="url(#candleBody)"
                  stroke="#BA8D65"
                  strokeWidth="1"
                />

                {/* Diagonal Candle Spiral Stripes */}
                <line x1={c.x - 3} y1={c.y - c.h + 8} x2={c.x + 3} y2={c.y - c.h + 13} stroke="#BA8D65" strokeWidth="1.2" opacity="0.65" />
                <line x1={c.x - 3} y1={c.y - c.h + 18} x2={c.x + 3} y2={c.y - c.h + 23} stroke="#BA8D65" strokeWidth="1.2" opacity="0.65" />

                {/* Candle Wick */}
                <line x1={c.x} y1={c.y - c.h} x2={c.x} y2={c.y - c.h - 5} stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" />

                {/* Animated Candle Flame or Smoke */}
                {candlesLit ? (
                  <g filter="url(#flame-glow)">
                    {/* Outer Glow Flame */}
                    <path
                      d={`M ${c.x} ${c.y - c.h - 24} C ${c.x + 6} ${c.y - c.h - 15} ${c.x + 5} ${c.y - c.h - 6} ${c.x} ${c.y - c.h - 5} C ${c.x - 5} ${c.y - c.h - 6} ${c.x - 6} ${c.y - c.h - 15} Z`}
                      fill="url(#flameGrad)"
                      className="animate-flicker origin-bottom"
                      style={{ animationDelay: `${i * 0.25}s` }}
                    />
                    {/* Inner Flame Core */}
                    <ellipse cx={c.x} cy={c.y - c.h - 11} rx="2" ry="4.5" fill="#FFFFFF" opacity="0.9" />
                  </g>
                ) : (
                  /* Wispy Smoke Drift */
                  <g opacity="0.55">
                    <path
                      d={`M ${c.x} ${c.y - c.h - 5} Q ${c.x + 4} ${c.y - c.h - 14} ${c.x - 2} ${c.y - c.h - 22} T ${c.x + 4} ${c.y - c.h - 32}`}
                      fill="none"
                      stroke="#888888"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="3 2"
                      className="transition-all duration-1000"
                    />
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Dynamic CTA Controls */}
        <div className="flex flex-col items-center gap-3 mt-4">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              className="py-3 px-6 rounded-full bg-champagne-900 hover:bg-champagne-800 text-white font-medium text-sm shadow-candle flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Wind className="w-4 h-4 text-candle-glow animate-pulse" />
              <span>Tap Here or Blow the Candles</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center gap-3"
            >
              <button
                onClick={onOpenLetter}
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-gradient-to-r from-roseGold-500 via-champagne-600 to-roseGold-600 hover:from-roseGold-600 hover:to-champagne-700 text-white font-medium shadow-candle-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>Open Your Birthday Letter</span>
              </button>

              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-1.5 text-xs text-champagne-600 hover:text-champagne-900 transition-colors mt-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight candles</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
