import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Letter Sheet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-paper rounded-3xl p-6 sm:p-12 border-2 border-champagne-300 shadow-2xl z-10 my-auto text-champagne-900 overflow-hidden"
          >
            {/* Vintage Paper Texture Line Accents */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-roseGold-400 via-champagne-500 to-roseGold-400" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-champagne-500 hover:text-champagne-900 hover:bg-champagne-100 transition-colors"
              title="Close letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="text-center pb-6 border-b border-champagne-200 mb-8">
              <div className="inline-flex items-center gap-1.5 text-roseGold-600 text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Birthday Letter</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-champagne-900">
                {giftConfig.finale.letterTitle}
              </h3>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 font-cursive text-lg sm:text-xl leading-relaxed text-champagne-800">
              <p className="font-serif italic font-semibold text-roseGold-800">
                {giftConfig.finale.letterSalutation}
              </p>

              {giftConfig.finale.letterBody.map((paragraph, idx) => (
                <p key={idx} className="indent-4">
                  {paragraph}
                </p>
              ))}

              {/* Sign-off */}
              <div className="pt-6 text-right">
                <p className="italic text-base text-champagne-600">
                  {giftConfig.finale.letterClosing}
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1 font-serif text-2xl font-bold text-roseGold-700">
                  <Heart className="w-4 h-4 fill-roseGold-600 text-roseGold-600" />
                  <span>{giftConfig.finale.senderName}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
