import React, { useState, useEffect } from 'react';

interface TickerItem {
  id: string;
  val: number;
  label: string;
}

const INITIAL_UNSORTED: TickerItem[] = [
  { id: 'item-82', val: 82, label: 'Item A' },
  { id: 'item-15', val: 15, label: 'Item B' },
  { id: 'item-94', val: 94, label: 'Item C' },
  { id: 'item-30', val: 30, label: 'Item D' },
  { id: 'item-68', val: 68, label: 'Item E' },
];

export const LiveMovingBanner: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>(INITIAL_UNSORTED);
  const [compareIndices, setCompareIndices] = useState<[number, number] | null>([0, 1]);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [pass, setPass] = useState<number>(1);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    let currentArr = [...INITIAL_UNSORTED];
    let i = 0;
    let j = 0;
    let currentPass = 1;
    let currentSorted: number[] = [];

    const interval = setInterval(() => {
      const n = currentArr.length;

      if (i >= n - 1) {
        // Complete state
        setIsComplete(true);
        setCompareIndices(null);
        setIsSwapping(false);
        setSortedIndices([0, 1, 2, 3, 4]);

        // Reset after 3 seconds pause
        setTimeout(() => {
          currentArr = [
            { id: `item-${Date.now()}-1`, val: 75, label: 'Item A' },
            { id: `item-${Date.now()}-2`, val: 20, label: 'Item B' },
            { id: `item-${Date.now()}-3`, val: 90, label: 'Item C' },
            { id: `item-${Date.now()}-4`, val: 40, label: 'Item D' },
            { id: `item-${Date.now()}-5`, val: 60, label: 'Item E' },
          ];
          i = 0;
          j = 0;
          currentPass = 1;
          currentSorted = [];
          setItems([...currentArr]);
          setPass(1);
          setSortedIndices([]);
          setIsComplete(false);
        }, 3000);

        return;
      }

      if (j < n - 1 - i) {
        setCompareIndices([j, j + 1]);
        setPass(currentPass);

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
        // Pass completed for element (n - 1 - i)
        currentSorted.push(n - 1 - i);
        setSortedIndices([...currentSorted]);
        i++;
        j = 0;
        currentPass++;
      }
    }, 1600); // Decent professional pace (1.6s per step)

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...items.map((it) => it.val), 1);

  return (
    <div className="w-full bg-card border-2 border-accent/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden my-6 transition-all duration-300 hover:shadow-2xl hover:border-accent">
      {/* Live Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-textSecondary/15 pb-3.5 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono font-black text-accent tracking-widest uppercase">
            LIVE DETERMINISTIC BUBBLE SORT ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-lg font-extrabold">
            Pass #{pass}
          </span>
          {isComplete && (
            <span className="text-xs font-mono bg-accent text-onAccent px-3 py-1 rounded-lg font-extrabold animate-bounce">
              ✨ 100% SORTED!
            </span>
          )}
        </div>
      </div>

      {/* Floating Swap Badge */}
      {isSwapping && compareIndices && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-accent text-onAccent font-black text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-onAccent animate-bounce flex items-center gap-1.5 font-mono tracking-wider">
          <span>🔀</span>
          <span>LIVE SWAP EXECUTION</span>
          <span>⇄</span>
        </div>
      )}

      {/* Smooth Moving Elements Track */}
      <div className="relative my-4 min-h-[140px] flex items-end justify-center gap-3 sm:gap-6 px-4 py-4 border-b border-textSecondary/10 overflow-x-auto">
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
                transformStyle = 'translate-x-3 -translate-y-2 rotate-2';
              } else if (compareIndices && compareIndices[1] === idx) {
                transformStyle = '-translate-x-3 -translate-y-2 -rotate-2';
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
              {/* Dynamic Value Height Bar */}
              <div className="w-full flex flex-col justify-end items-center h-24 mb-2">
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 flex items-center justify-center text-xs font-mono font-extrabold ${
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

              {/* Card Badge */}
              <div
                className={`w-full p-2 rounded-xl border text-center transition-all duration-700 flex flex-col items-center justify-center gap-0.5 ${cardStyle}`}
              >
                <span className="text-xs font-extrabold truncate w-full">{item.label}</span>
                <span className="text-[10px] opacity-75 font-mono font-semibold">[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticker Bottom Description */}
      <div className="text-center pt-1">
        <p className="text-xs font-mono text-textSecondary font-bold">
          ⚡ Real deterministic bubble sort pass running at a smooth 1.6s professional pace
        </p>
      </div>
    </div>
  );
};

export default LiveMovingBanner;
