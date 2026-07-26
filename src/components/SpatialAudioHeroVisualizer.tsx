import React, { useState, useEffect } from 'react';
import CategoryIcon, { type IconType } from './CategoryIcon';

interface BubbleNode {
  id: string;
  val: number;
  label: string;
  category: IconType;
}

const INITIAL_NODES: BubbleNode[] = [
  { id: 'b1', val: 78, label: 'Cricket Runs', category: 'cricket' },
  { id: 'b2', val: 14, label: 'Game Kills', category: 'gaming' },
  { id: 'b3', val: 92, label: 'Movie Rating', category: 'movies' },
  { id: 'b4', val: 35, label: 'Food Price', category: 'food' },
  { id: 'b5', val: 60, label: 'Fitness Weight', category: 'fitness' },
];

export const SpatialAudioHeroVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<BubbleNode[]>(INITIAL_NODES);
  const [comparePair, setComparePair] = useState<[number, number] | null>([0, 1]);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // Bubble Sort Pass Loop
  useEffect(() => {
    let arr = [...INITIAL_NODES];
    let i = 0;
    let j = 0;

    const interval = setInterval(() => {
      const n = arr.length;

      if (i >= n - 1) {
        setComparePair(null);
        setIsSwapping(false);

        setTimeout(() => {
          arr = [
            { id: `b-${Date.now()}-1`, val: 85, label: 'Cricket Runs', category: 'cricket' },
            { id: `b-${Date.now()}-2`, val: 20, label: 'Game Kills', category: 'gaming' },
            { id: `b-${Date.now()}-3`, val: 95, label: 'Movie Rating', category: 'movies' },
            { id: `b-${Date.now()}-4`, val: 40, label: 'Food Price', category: 'food' },
            { id: `b-${Date.now()}-5`, val: 65, label: 'Fitness Weight', category: 'fitness' },
          ];
          i = 0;
          j = 0;
          setNodes([...arr]);
        }, 2800);
        return;
      }

      if (j < n - 1 - i) {
        setComparePair([j, j + 1]);

        if (arr[j].val > arr[j + 1].val) {
          setIsSwapping(true);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setNodes([...arr]);
        } else {
          setIsSwapping(false);
        }

        j++;
      } else {
        i++;
        j = 0;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...nodes.map((n) => n.val), 1);

  return (
    <div
      className="w-full bg-card/90 backdrop-blur-xl border-2 border-accent/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8 transition-all duration-500"
    >
      {/* Header Bar with Premium Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-textSecondary/15 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono font-black text-accent tracking-widest uppercase flex items-center gap-2">
            <CategoryIcon name="sparkles" className="w-5 h-5 text-accent" />
            <span>INTERACTIVE ALGORITHM WAVE VISUALIZER</span>
          </span>
        </div>

        <span className="text-xs font-mono bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-xl font-extrabold">
          🫧 Real-time Bubbling
        </span>
      </div>

      {/* Floating 3D Bubble Wave Stream with Premium Dual-Tone Icons */}
      <div className="relative my-4 min-h-[180px] flex items-end justify-center gap-4 sm:gap-8 px-4 py-4 border-b border-textSecondary/10 overflow-x-auto">
        {nodes.map((node, idx) => {
          const isComparing = comparePair?.includes(idx);
          const heightPercent = Math.max((node.val / maxValue) * 100, 35);

          let transformClass = '';
          let glowClass = 'border-textSecondary/30 bg-bg text-main shadow-sm';

          if (isComparing) {
            if (isSwapping) {
              glowClass =
                'bg-accent text-onAccent border-accent font-black shadow-2xl ring-4 ring-accent/60 scale-110 z-20';
              if (comparePair && comparePair[0] === idx) {
                transformClass = 'translate-x-6 -translate-y-3 rotate-3';
              } else if (comparePair && comparePair[1] === idx) {
                transformClass = '-translate-x-6 -translate-y-3 -rotate-3';
              }
            } else {
              glowClass =
                'bg-accent2/40 border-accent2 text-main font-extrabold scale-105 -translate-y-2 ring-2 ring-accent2/70 z-10';
            }
          }

          return (
            <div
              key={node.id}
              className={`flex flex-col items-center flex-1 max-w-[95px] min-w-[65px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${transformClass}`}
            >
              {/* Dynamic Height Bar */}
              <div className="w-full flex flex-col justify-end items-center h-32 mb-2">
                <div
                  className={`w-full rounded-2xl transition-all duration-700 flex items-center justify-center text-xs font-mono font-black shadow-md ${
                    isComparing && isSwapping
                      ? 'bg-accent text-onAccent'
                      : isComparing
                      ? 'bg-accent2 text-focusText'
                      : 'bg-textSecondary/25 text-textSecondary'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {node.val}
                </div>
              </div>

              {/* Premium Dual-Tone Glass Pill Card */}
              <div
                className={`w-full p-3 rounded-2xl border text-center transition-all duration-700 flex flex-col items-center justify-center gap-1.5 ${glowClass}`}
              >
                <div className="p-2 bg-card rounded-xl border border-textSecondary/15 shadow-xs flex items-center justify-center">
                  <CategoryIcon name={node.category} className="w-5 h-5" />
                </div>
                <span className="text-xs font-black truncate w-full tracking-tight">{node.label}</span>
                <span className="text-[10px] opacity-75 font-mono font-bold">[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpatialAudioHeroVisualizer;
