import confetti from 'canvas-confetti';

/**
 * Triggers a celebratory firework burst with romantic warm colors
 */
export const triggerGrandCelebration = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#BA8D65', '#BE7878', '#EBA059', '#F9E2AF', '#FDF1C5', '#FFFFFF'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Continuous gentle side cannons for the finale
 */
export const triggerSideCannons = () => {
  const end = Date.now() + 3 * 1000;
  const colors = ['#BA8D65', '#BE7878', '#EBA059', '#F9E2AF'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
