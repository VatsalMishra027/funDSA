import React from 'react';

export const FloatingParticlesBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-30">
      {/* Moving Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-12 w-96 h-96 bg-accent2/20 rounded-full blur-3xl animate-pulse duration-1000"></div>

      {/* Floating Animated Algorithm Elements */}
      <div className="absolute top-16 left-1/4 font-mono text-xs font-extrabold text-accent/40 animate-bounce duration-1000">
        [i] ⇄ [i+1]
      </div>
      <div className="absolute top-1/2 right-16 font-mono text-xs font-black text-accent2/50 animate-pulse">
        A[j] &gt; A[j+1]
      </div>
      <div className="absolute bottom-24 left-1/3 font-mono text-xs font-extrabold text-focusText/40 animate-bounce">
        Pass 1: Settle Max
      </div>
      <div className="absolute top-2/3 left-12 font-mono text-xs font-bold text-accent/30 animate-pulse">
        O(N²) quadratic
      </div>
    </div>
  );
};

export default FloatingParticlesBackground;
