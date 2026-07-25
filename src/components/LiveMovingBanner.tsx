import React, { useState, useEffect } from 'react';

export const LiveMovingBanner: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, val: 99, label: 'Value A', active: false, swapped: false },
    { id: 2, val: 12, label: 'Value B', active: false, swapped: false },
    { id: 3, val: 45, label: 'Value C', active: false, swapped: false },
    { id: 4, val: 8, label: 'Value D', active: false, swapped: false },
    { id: 5, val: 78, label: 'Value E', active: false, swapped: false },
  ]);

  const [activePair, setActivePair] = useState<[number, number] | null>([0, 1]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [passCount, setPassCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        let pairIndex = Math.floor(Math.random() * (next.length - 1));

        setActivePair([pairIndex, pairIndex + 1]);

        if (next[pairIndex].val > next[pairIndex + 1].val) {
          setIsSwapping(true);
          const temp = next[pairIndex];
          next[pairIndex] = next[pairIndex + 1];
          next[pairIndex + 1] = temp;
        } else {
          setIsSwapping(false);
        }

        // Shuffle if sorted
        const isSorted = next.every((val, idx, arr) => idx === 0 || arr[idx - 1].val <= val.val);
        if (isSorted) {
          setPassCount((p) => p + 1);
          return [
            { id: Date.now() + 1, val: Math.floor(Math.random() * 90) + 10, label: 'Elem 1', active: false, swapped: false },
            { id: Date.now() + 2, val: Math.floor(Math.random() * 90) + 10, label: 'Elem 2', active: false, swapped: false },
            { id: Date.now() + 3, val: Math.floor(Math.random() * 90) + 10, label: 'Elem 3', active: false, swapped: false },
            { id: Date.now() + 4, val: Math.floor(Math.random() * 90) + 10, label: 'Elem 4', active: false, swapped: false },
            { id: Date.now() + 5, val: Math.floor(Math.random() * 90) + 10, label: 'Elem 5', active: false, swapped: false },
          ];
        }

        return next;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-card border-2 border-accent/40 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden my-6">
      {/* Live Badge */}
      <div className="flex items-center justify-between border-b border-textSecondary/15 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          <span className="text-xs font-mono font-black text-accent tracking-widest uppercase">
            REAL-TIME LIVE SORT ENGINE TICKER
          </span>
        </div>
        <span className="text-xs font-mono bg-focusBg text-focusText border border-focusBorder px-2.5 py-0.5 rounded font-extrabold">
          Pass #{passCount} • Active Pulse
        </span>
      </div>

      {/* Moving Elements Track */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 overflow-x-auto min-h-[90px]">
        {items.map((item, idx) => {
          const isActive = activePair?.includes(idx);

          return (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
                isActive && isSwapping
                  ? 'bg-accent text-onAccent border-accent scale-110 -translate-y-2 shadow-lg ring-4 ring-accent/40 z-10'
                  : isActive
                  ? 'bg-accent2/30 border-accent2 text-main scale-105 -translate-y-1 shadow-md'
                  : 'bg-bg border-textSecondary/30 text-main'
              }`}
            >
              <span className="text-xs font-mono opacity-75 font-semibold">[{idx}]</span>
              <span className="text-lg font-mono font-black">{item.val}</span>
            </div>
          );
        })}
      </div>

      {/* Ticker Bottom Description */}
      <div className="text-center pt-2">
        <p className="text-[11px] font-mono text-textSecondary uppercase tracking-wider font-bold">
          ⚡ Continuous background simulation • Comparing adjacent indices & swapping live
        </p>
      </div>
    </div>
  );
};

export default LiveMovingBanner;
