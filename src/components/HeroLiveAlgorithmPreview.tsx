import React, { useState, useEffect } from 'react';

interface Step {
  leftIndex: number;
  rightIndex: number;
  sumText: string;
  comparisonText: string;
  actionText: string;
  isFound?: boolean;
}

const ARRAY_VALUES = [1, 4, 6, 8, 11, 15];
const TARGET = 14;

const STEPS: Step[] = [
  {
    leftIndex: 0,
    rightIndex: 5,
    sumText: '1 + 15 = 16',
    comparisonText: '> 14',
    actionText: 'move right in',
  },
  {
    leftIndex: 0,
    rightIndex: 4,
    sumText: '1 + 11 = 12',
    comparisonText: '< 14',
    actionText: 'move left in',
  },
  {
    leftIndex: 1,
    rightIndex: 4,
    sumText: '4 + 11 = 15',
    comparisonText: '> 14',
    actionText: 'move right in',
  },
  {
    leftIndex: 1,
    rightIndex: 3,
    sumText: '4 + 8 = 12',
    comparisonText: '< 14',
    actionText: 'move left in',
  },
  {
    leftIndex: 2,
    rightIndex: 3,
    sumText: '6 + 8 = 14',
    comparisonText: '== 14',
    actionText: 'Target Found! 🎉',
    isFound: true,
  },
];

export const HeroLiveAlgorithmPreview: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const step = STEPS[currentStepIndex];

  return (
    <div className="relative max-w-2xl mx-auto my-6 font-mono select-none">
      {/* Absolute "LIVE" Tag on Top-Left */}
      <div className="absolute -top-3 left-6 z-20 bg-[#e07a5f] text-white text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        <span>LIVE</span>
      </div>

      {/* Main Dark Code/Visualizer Terminal Window */}
      <div className="bg-[#181512] text-[#f4f1de] border-2 border-[#332e29] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Window Header Bar */}
        <div className="flex items-center justify-between border-b border-[#2d2823] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#e07a5f] inline-block opacity-80"></span>
            <span className="w-3 h-3 rounded-full bg-[#f2cc8f] inline-block opacity-80"></span>
            <span className="w-3 h-3 rounded-full bg-[#81b29a] inline-block opacity-80"></span>
          </div>

          <div className="text-xs sm:text-sm font-mono text-[#a8a29e] tracking-wide flex items-center gap-2">
            <span className="text-[#e07a5f] font-bold">two-pointers</span>
            <span>·</span>
            <span>target {TARGET}</span>
          </div>
        </div>

        {/* Array Elements & Pointer Display Area */}
        <div className="py-2 space-y-6">
          {/* Row of Array Boxes */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {ARRAY_VALUES.map((val, idx) => {
              const isLeft = idx === step.leftIndex;
              const isRight = idx === step.rightIndex;
              const isSelected = isLeft || isRight;

              return (
                <div
                  key={idx}
                  className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex items-center justify-center text-xl sm:text-3xl font-black transition-all duration-500 border-2 ${
                    step.isFound && isSelected
                      ? 'bg-[#81b29a]/20 border-[#81b29a] text-[#81b29a] scale-110 shadow-lg ring-2 ring-[#81b29a]/50'
                      : isLeft
                      ? 'bg-[#e07a5f]/15 border-[#e07a5f] text-[#e07a5f] scale-105 shadow-md'
                      : isRight
                      ? 'bg-[#3d405b]/60 border-[#e07a5f] text-[#f4f1de] scale-105 shadow-md'
                      : 'bg-[#221f1b] border-[#38332c] text-[#d6ccc2] opacity-80'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>

          {/* Pointer Arrow Indicators Row */}
          <div className="relative h-10 max-w-xs sm:max-w-md mx-auto">
            {ARRAY_VALUES.map((_, idx) => {
              const isLeft = idx === step.leftIndex;
              const isRight = idx === step.rightIndex;

              if (!isLeft && !isRight) return null;

              // Calculate percentage offset for pointer positioning
              const leftPercent = (idx / (ARRAY_VALUES.length - 1)) * 100;

              return (
                <div
                  key={idx}
                  className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
                  style={{ left: `${leftPercent}%` }}
                >
                  <span
                    className={`text-sm ${
                      isLeft ? 'text-[#e07a5f]' : 'text-[#3d85c6]'
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-xs font-black ${
                      isLeft ? 'text-[#e07a5f]' : 'text-[#3d85c6]'
                    }`}
                  >
                    {isLeft ? 'L' : 'R'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Calculation Output Footer */}
        <div className="text-center font-mono text-sm sm:text-base tracking-wide py-2 min-h-[3rem] flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-[#221f1b] border border-[#38332c] px-5 py-2.5 rounded-2xl shadow-inner transition-all duration-300">
            <span className="font-bold text-[#f4f1de]">{step.sumText}</span>
            <span className="text-[#a8a29e]">{step.comparisonText}</span>
            <span className="text-[#a8a29e]">—</span>
            <span
              className={`font-semibold ${
                step.isFound ? 'text-[#81b29a] font-bold' : 'text-[#e07a5f]'
              }`}
            >
              {step.actionText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLiveAlgorithmPreview;
