import React, { useState, useEffect } from 'react';

interface TickerItem {
  id: string;
  val: number;
  label: string;
  icon: string;
}

const INITIAL_ITEMS: TickerItem[] = [
  { id: 'item-82', val: 82, label: 'Item A', icon: '🫧' },
  { id: 'item-15', val: 15, label: 'Item B', icon: '✨' },
  { id: 'item-94', val: 94, label: 'Item C', icon: '🎈' },
  { id: 'item-30', val: 30, label: 'Item D', icon: '🌸' },
  { id: 'item-68', val: 68, label: 'Item E', icon: '🌟' },
];

export const LiveMovingBanner: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>(INITIAL_ITEMS);
  const [compareIndices, setCompareIndices] = useState<[number, number] | null>([0, 1]);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    let currentArr = [...INITIAL_ITEMS];
    let i = 0;
    let j = 0;
    let currentSorted: number[] = [];

    const interval = setInterval(() => {
      const n = currentArr.length;

      if (i >= n - 1) {
        setIsComplete(true);
        setCompareIndices(null);
        setIsSwapping(false);
        setSortedIndices([0, 1, 2, 3, 4]);

        setTimeout(() => {
          currentArr = [
            { id: `item-${Date.now()}-1`, val: 70, label: 'Item A', icon: '🫧' },
            { id: `item-${Date.now()}-2`, val: 25, label: 'Item B', icon: '✨' },
            { id: `item-${Date.now()}-3`, val: 95, label: 'Item C', icon: '🎈' },
            { id: `item-${Date.now()}-4`, val: 35, label: 'Item D', icon: '🌸' },
            { id: `item-${Date.now()}-5`, val: 60, label: 'Item E', icon: '🌟' },
          ];
          i = 0;
          j = 0;
          currentSorted = [];
          setItems([...currentArr]);
          setSortedIndices([]);
          setIsComplete(false);
        }, 3200);

        return;
      }

      if (j < n - 1 - i) {
        setCompareIndices([j, j + 1]);

        if (currentArr[j].val > currentArr[j + 1].val) {
          setIsSwapping(true);
          const temp = currentArr[j];
          currentArr[j] = currentArr[j + 1];
          currentArr[j + 1] = temp;
          setItems([...currentArr]);
        } else {
          setIsSwapping(false);
        }

        j++;
      } else {
        currentSorted.push(n - 1 - i);
        setSortedIndices([...currentSorted]);
        i++;
        j = 0;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...items.map((it) => it.val), 1);

  return (
    <div className="w-full bg-card/90 backdrop-blur-md border-2 border-focusBorder/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden my-6 transition-all duration-500 hover:shadow-2xl hover:border-accent">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-textSecondary/15 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          <span className="text-xs font-mono font-black text-accent tracking-widest uppercase">
            LIVE BUBBLE SORT ANIMATION
          </span>
        </div>

        {isComplete ? (
          <span className="text-xs font-mono bg-accent text-onAccent px-3 py-1 rounded-full font-extrabold animate-bounce shadow-sm">
            ✨ 100% SORTED!
          </span>
        ) : (
          <span className="text-xs font-mono bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-full font-bold">
            🫧 Live Bubbling
          </span>
        )}
      </div>

      {/* Floating Cute Swap Badge */}
      {isSwapping && compareIndices && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-accent text-onAccent font-black text-xs px-4 py-1 rounded-full shadow-lg border-2 border-onAccent animate-bounce flex items-center gap-1.5 tracking-wider font-mono">
          <span>🔀</span>
          <span>SWAPPING POSITIONS</span>
          <span>⇄</span>
        </div>
      )}

      {/* Cute Smooth Rounded Elements Track */}
      <div className="relative my-2 min-h-[150px] flex items-end justify-center gap-3 sm:gap-6 px-4 py-4 border-b border-textSecondary/10 overflow-x-auto">
        {items.map((item, idx) => {
          const isComparing = compareIndices?.includes(idx);
          const isSorted = sortedIndices.includes(idx) || isComplete;
          const heightPercent = Math.max((item.val / maxValue) * 100, 32);

          let cardStyle = 'bg-bg border-textSecondary/30 text-main';
          let transformStyle = '';

          if (isSorted) {
            cardStyle = 'bg-focusBg border-focusBorder text-focusText font-extrabold shadow-sm';
          } else if (isComparing) {
            if (isSwapping) {
              cardStyle =
                'bg-accent text-onAccent border-accent font-black scale-110 shadow-xl ring-4 ring-accent/40 z-20';
              if (compareIndices && compareIndices[0] === idx) {
                transformStyle = 'translate-x-4 -translate-y-2 rotate-2';
              } else if (compareIndices && compareIndices[1] === idx) {
                transformStyle = '-translate-x-4 -translate-y-2 -rotate-2';
              }
            } else {
              cardStyle =
                'bg-accent2/30 border-accent2 text-main font-extrabold scale-105 shadow-md -translate-y-1 ring-2 ring-accent2/60 z-10';
            }
          }

          return (
            <div
              key={item.id}
              className={`flex flex-col items-center flex-1 max-w-[85px] min-w-[58px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${transformStyle}`}
            >
              {/* Dynamic Bubbly Bar */}
              <div className="w-full flex flex-col justify-end items-center h-28 mb-2">
                <div
                  className={`w-full rounded-2xl transition-all duration-700 flex items-center justify-center text-xs font-mono font-extrabold shadow-xs ${
                    isComparing && isSwapping
                      ? 'bg-accent text-onAccent'
                      : isComparing
                      ? 'bg-accent2 text-focusText'
                      : isSorted
                      ? 'bg-focusBorder text-focusText'
                      : 'bg-textSecondary/25 text-textSecondary'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {item.val}
                </div>
              </div>

              {/* Cute Pill Badge */}
              <div
                className={`w-full p-2.5 rounded-2xl border text-center transition-all duration-700 flex flex-col items-center justify-center gap-0.5 ${cardStyle}`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs font-extrabold truncate w-full">{item.label}</span>
                <span className="text-[10px] opacity-75 font-mono font-semibold">[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveMovingBanner;
