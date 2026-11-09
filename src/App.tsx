import React, { useState, useEffect } from 'react';
import { PasscodeGate } from './components/PasscodeGate';
import { FloatingAudioPlayer } from './components/FloatingAudioPlayer';
import { AmbientParticles } from './components/AmbientParticles';
import { HeroHeader } from './components/HeroHeader';
import { ScrollyCard } from './components/ScrollyCard';
import { MemoryGacha } from './components/MemoryGacha';
import { ProgressBar } from './components/ProgressBar';
import { BirthdayCake } from './components/BirthdayCake';
import { LetterModal } from './components/LetterModal';
import { giftConfig } from './config/giftConfig';
import { Heart, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeReasonIndex, setActiveReasonIndex] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const totalReasons = giftConfig.reasons.length;

  // Track active card via native IntersectionObserver (Zero forced reflows, 60fps smooth)
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      setShowProgressBar(window.scrollY > window.innerHeight * 0.35);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = id.match(/reason-card-(\d+)/);
            if (match) {
              setActiveReasonIndex(parseInt(match[1], 10));
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    giftConfig.reasons.forEach((_, idx) => {
      const el = document.getElementById(`reason-card-${idx}`);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isUnlocked, totalReasons]);

  const scrollToFirstReason = () => {
    const firstCard = document.getElementById('reason-card-0');
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isUnlocked) {
    return (
      <main className="relative min-h-screen">
        <AmbientParticles />
        <PasscodeGate onUnlock={() => setIsUnlocked(true)} />
      </main>
    );
  }

  return (
    <div className="relative min-h-screen bg-champagne-50 text-champagne-900 font-sans selection:bg-roseGold-200">
      {/* Background Ambience */}
      <AmbientParticles />

      {/* Floating Audio Player */}
      <FloatingAudioPlayer autoPlayTrigger={isUnlocked} />

      {/* Top Floating Progress Bar */}
      <ProgressBar
        currentReasonIndex={activeReasonIndex}
        totalReasons={totalReasons}
        visible={showProgressBar}
      />

      {/* Hero Welcome Header */}
      <HeroHeader onScrollToStart={scrollToFirstReason} />

      {/* Main Scrollytelling Timeline */}
      <main className="max-w-4xl mx-auto relative z-10 px-2 sm:px-4">
        {giftConfig.reasons.map((reason, index) => (
          <ScrollyCard
            key={reason.id}
            reason={reason}
            index={index}
            total={totalReasons}
          />
        ))}

        {/* Interactive Memory Gacha Capsule */}
        <MemoryGacha />

        {/* Grand Finale Birthday Cake */}
        <BirthdayCake onOpenLetter={() => setIsLetterOpen(true)} />
      </main>

      {/* Intimate Letter Modal */}
      <LetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 px-4 border-t border-champagne-200 text-xs text-champagne-600 bg-champagne-100/40">
        <div className="flex items-center justify-center gap-1.5 mb-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-roseGold-500" />
          <span>Crafted with love for {giftConfig.recipient.name}</span>
          <Heart className="w-3.5 h-3.5 text-roseGold-500 fill-roseGold-500" />
        </div>
        <p className="text-champagne-400">
          Happy {giftConfig.recipient.age}th Birthday • {giftConfig.recipient.birthdayDate}
        </p>
      </footer>
    </div>
  );
};

export default App;
