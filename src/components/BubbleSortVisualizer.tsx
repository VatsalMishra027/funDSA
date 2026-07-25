import React, { useState, useEffect, useRef } from 'react';

export interface VisualizerItem {
  id?: string;
  label: string;
  value: number;
  icon?: string;
}

export interface BubbleSortVisualizerProps {
  items: VisualizerItem[];
  title?: string;
}

interface InternalItem extends VisualizerItem {
  id: string;
}

interface StepState {
  items: InternalItem[];
  compareIndices: [number, number] | null;
  isSwapping: boolean;
  pass: number;
  sortedIndices: number[];
  message: string;
  isPassComplete?: boolean;
  isFullySorted?: boolean;
}

export const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  items: initialItems,
  title = 'Bubble Sort Visualizer',
}) => {
  // Add stable IDs to initial items if not provided
  const prepareItems = (rawItems: VisualizerItem[]): InternalItem[] =>
    rawItems.map((item, idx) => ({
      ...item,
      id: item.id || `item-${idx}-${item.label}-${item.value}`,
    }));

  const [steps, setSteps] = useState<StepState[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-generate all bubble sort steps for deterministic step-by-step playback
  const generateSteps = (startItems: InternalItem[]) => {
    const generatedSteps: StepState[] = [];
    const arr = [...startItems];
    const n = arr.length;
    const sortedIndices: number[] = [];

    // Initial state step
    generatedSteps.push({
      items: [...arr],
      compareIndices: null,
      isSwapping: false,
      pass: 1,
      sortedIndices: [],
      message: 'Tayyar ho? "Step" dabao ya "Autoplay" shuru karo!',
    });

    let pass = 1;
    for (let i = 0; i < n - 1; i++) {
      let swappedInThisPass = false;

      for (let j = 0; j < n - 1 - i; j++) {
        const itemA = arr[j];
        const itemB = arr[j + 1];

        // Step 1: Comparing j and j + 1
        generatedSteps.push({
          items: [...arr],
          compareIndices: [j, j + 1],
          isSwapping: false,
          pass,
          sortedIndices: [...sortedIndices],
          message: `Pass ${pass}: Compare kar rahe hain ${itemA.label} (${itemA.value}) aur ${itemB.label} (${itemB.value})...`,
        });

        if (arr[j].value > arr[j + 1].value) {
          swappedInThisPass = true;

          // Step 2: Highlighting swap intention
          generatedSteps.push({
            items: [...arr],
            compareIndices: [j, j + 1],
            isSwapping: true,
            pass,
            sortedIndices: [...sortedIndices],
            message: `${itemA.value} > ${itemB.value} hai! Iska matlab ${itemA.label} bada hai, Swap karo! 🔄`,
          });

          // Perform swap in array
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          // Step 3: Swapped state
          generatedSteps.push({
            items: [...arr],
            compareIndices: [j, j + 1],
            isSwapping: false,
            pass,
            sortedIndices: [...sortedIndices],
            message: `Swapped! Ab ${arr[j].label} pehle aa gaya, ${arr[j + 1].label} aage chala gaya.`,
          });
        } else {
          // No swap needed
          generatedSteps.push({
            items: [...arr],
            compareIndices: [j, j + 1],
            isSwapping: false,
            pass,
            sortedIndices: [...sortedIndices],
            message: `${itemA.value} <= ${itemB.value} hai. Swap ki koi zaroorat nahi, sahi order mein hain. 👍`,
          });
        }
      }

      // Mark settled element at index (n - 1 - i)
      const settledIndex = n - 1 - i;
      sortedIndices.push(settledIndex);

      generatedSteps.push({
        items: [...arr],
        compareIndices: null,
        isSwapping: false,
        pass,
        sortedIndices: [...sortedIndices],
        message: `Pass ${pass} Poora Hua! Sabse bada number ${arr[settledIndex].label} (${arr[settledIndex].value}) end par settle ho gaya! 🎯`,
        isPassComplete: true,
      });

      pass++;

      // Optimization check: if no swaps occurred during this pass, array is sorted
      if (!swappedInThisPass) {
        // Mark all remaining elements as sorted
        for (let k = 0; k < n; k++) {
          if (!sortedIndices.includes(k)) {
            sortedIndices.push(k);
          }
        }
        break;
      }
    }

    // Final state: Entire array sorted
    const allSorted = arr.map((_, idx) => idx);
    generatedSteps.push({
      items: [...arr],
      compareIndices: null,
      isSwapping: false,
      pass: pass - 1,
      sortedIndices: allSorted,
      message: 'Mubarak ho! Saare items bilkul sahi order mein sort ho chuke hain! 🎉',
      isFullySorted: true,
    });

    return generatedSteps;
  };

  // Initialize steps when initialItems change
  useEffect(() => {
    const formatted = prepareItems(initialItems);
    const newSteps = generateSteps(formatted);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [initialItems]);

  // Handle Autoplay timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const currentStep = steps[currentStepIndex] || {
    items: prepareItems(initialItems),
    compareIndices: null,
    isSwapping: false,
    pass: 1,
    sortedIndices: [],
    message: 'Loading...',
  };

  // Find max value to render proportional height bars
  const maxValue = Math.max(...initialItems.map((item) => item.value), 1);

  return (
    <div className="w-full bg-card border border-textSecondary/20 rounded-2xl p-4 sm:p-6 shadow-md transition-all">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-main">{title}</h3>
          <p className="text-xs text-textSecondary">
            Step {currentStepIndex + 1} of {steps.length} • Pass {currentStep.pass}
          </p>
        </div>

        {/* Pass Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-bg border border-textSecondary/30 text-textSecondary text-xs px-3 py-1.5 rounded-lg font-mono font-semibold">
            Pass: <strong className="text-accent font-bold">{currentStep.pass}</strong>
          </span>
          {currentStep.isFullySorted && (
            <span className="bg-focusBg border border-focusBorder text-focusText text-xs px-3 py-1.5 rounded-lg font-bold animate-bounce">
              ✓ SORTED!
            </span>
          )}
        </div>
      </div>

      {/* Hinglish Status Message Banner */}
      <div
        className={`mb-6 p-3.5 rounded-xl text-sm font-medium border transition-all ${
          currentStep.isPassComplete || currentStep.isFullySorted
            ? 'bg-focusBg border-focusBorder text-focusText font-semibold ring-2 ring-focusBorder/50'
            : currentStep.isSwapping
            ? 'bg-accent/15 border-accent text-accent font-semibold'
            : 'bg-bg border-textSecondary/20 text-main'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <span className="text-base leading-none">
            {currentStep.isFullySorted
              ? '🏆'
              : currentStep.isSwapping
              ? '⚡'
              : currentStep.compareIndices
              ? '🔍'
              : '📌'}
          </span>
          <span>{currentStep.message}</span>
        </div>
      </div>

      {/* Array Cards Visualization Row */}
      <div className="relative my-8 min-h-[220px] flex items-end justify-center gap-2 sm:gap-4 px-2 py-4 border-b border-textSecondary/15 overflow-x-auto">
        {currentStep.items.map((item, idx) => {
          const isComparing = currentStep.compareIndices?.includes(idx);
          const isSorted = currentStep.sortedIndices.includes(idx);
          const heightPercent = Math.max((item.value / maxValue) * 100, 24);

          let cardStyle = 'bg-bg border-textSecondary/30 text-main';
          if (isSorted) {
            cardStyle = 'bg-focusBg border-focusBorder text-focusText font-bold shadow-sm';
          } else if (isComparing) {
            if (currentStep.isSwapping) {
              cardStyle =
                'bg-accent text-onAccent border-accent font-bold scale-105 shadow-md -translate-y-2 ring-2 ring-accent/40';
            } else {
              cardStyle =
                'bg-accent2/20 border-accent2 text-main font-bold scale-105 shadow-sm -translate-y-1 ring-2 ring-accent2/60';
            }
          }

          return (
            <div
              key={item.id}
              className="flex flex-col items-center flex-1 max-w-[80px] min-w-[54px] transition-all duration-300 ease-out"
            >
              {/* Dynamic Value Height Bar */}
              <div className="w-full flex flex-col justify-end items-center h-28 mb-2">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 flex items-center justify-center text-xs font-mono font-bold ${
                    isComparing && currentStep.isSwapping
                      ? 'bg-accent text-onAccent'
                      : isComparing
                      ? 'bg-accent2 text-focusText'
                      : isSorted
                      ? 'bg-focusBorder text-focusText'
                      : 'bg-textSecondary/20 text-textSecondary'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {item.value}
                </div>
              </div>

              {/* Card Badge */}
              <div
                className={`w-full p-2 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 ${cardStyle}`}
              >
                {item.icon && <span className="text-base">{item.icon}</span>}
                <span className="text-xs font-semibold truncate w-full" title={item.label}>
                  {item.label}
                </span>
                <span className="text-[10px] opacity-75 font-mono">[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {/* Play / Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStepIndex >= steps.length - 1 && !isPlaying}
            className={`btn-primary px-4 py-2 rounded-xl font-bold text-sm shadow-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Autoplay'}
          </button>

          <button
            onClick={handleStepBackward}
            disabled={currentStepIndex === 0 || isPlaying}
            className="px-3 py-2 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ⏮️ Prev
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentStepIndex >= steps.length - 1 || isPlaying}
            className="px-3 py-2 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next ⏭️
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-textSecondary/30 bg-bg text-textSecondary hover:text-main hover:border-textSecondary text-sm font-medium"
          >
            🔄 Reset
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-xs font-semibold text-textSecondary bg-bg border border-textSecondary/20 px-3 py-1.5 rounded-xl">
          <span>Speed:</span>
          <input
            type="range"
            min="300"
            max="1800"
            step="100"
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="w-20 accent-accent cursor-pointer"
          />
          <span className="font-mono w-12 text-right">{speedMs}ms</span>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
