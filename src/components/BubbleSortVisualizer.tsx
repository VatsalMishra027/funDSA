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

export const playAudioSFX = (type: 'click' | 'compare' | 'swap' | 'sorted' | 'party', enabled: boolean = true) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } else if (type === 'compare') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'swap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.18);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'sorted') {
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, i) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, now + i * 0.07);
        noteGain.gain.setValueAtTime(0.12, now + i * 0.07);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.18);
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.start(now + i * 0.07);
        noteOsc.stop(now + i * 0.07 + 0.18);
      });
    } else if (type === 'party') {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, i) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, now + i * 0.09);
        noteGain.gain.setValueAtTime(0.22, now + i * 0.09);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.start(now + i * 0.09);
        noteOsc.stop(now + i * 0.09 + 0.35);
      });
    }
  } catch (e) {
    // Silent catch
  }
};

export const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  items: initialItems,
  title = 'Bubble Sort Visualizer',
}) => {
  const prepareItems = (rawItems: VisualizerItem[]): InternalItem[] =>
    rawItems.map((item, idx) => ({
      ...item,
      id: item.id || `item-${idx}-${item.label}-${item.value}`,
    }));

  const [steps, setSteps] = useState<StepState[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1500);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateSteps = (startItems: InternalItem[]) => {
    const generatedSteps: StepState[] = [];
    const arr = [...startItems];
    const n = arr.length;
    const sortedIndices: number[] = [];

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

        generatedSteps.push({
          items: [...arr],
          compareIndices: [j, j + 1],
          isSwapping: false,
          pass,
          sortedIndices: [...sortedIndices],
          message: `Pass ${pass}: Compare kar rahe hain ${itemA.label} (${itemA.value}) vs ${itemB.label} (${itemB.value})...`,
        });

        if (arr[j].value > arr[j + 1].value) {
          swappedInThisPass = true;

          generatedSteps.push({
            items: [...arr],
            compareIndices: [j, j + 1],
            isSwapping: true,
            pass,
            sortedIndices: [...sortedIndices],
            message: `${itemA.value} > ${itemB.value} (Left > Right) — Swapping positions! 🔀`,
          });

          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          generatedSteps.push({
            items: [...arr],
            compareIndices: [j, j + 1],
            isSwapping: false,
            pass,
            sortedIndices: [...sortedIndices],
            message: `Swapped! Ab ${arr[j].label} pehle aa gaya, ${arr[j + 1].label} aage chala gaya.`,
          });
        } else {
          generatedSteps.push({
            items: [...arr],
            compareIndices: [j, j + 1],
            isSwapping: false,
            pass,
            sortedIndices: [...sortedIndices],
            message: `${itemA.value} <= ${itemB.value} — Sahi order mein hain, swap ki zaroorat nahi. 👍`,
          });
        }
      }

      const settledIndex = n - 1 - i;
      sortedIndices.push(settledIndex);

      generatedSteps.push({
        items: [...arr],
        compareIndices: null,
        isSwapping: false,
        pass,
        sortedIndices: [...sortedIndices],
        message: `Pass ${pass} Complete! Largest value ${arr[settledIndex].label} (${arr[settledIndex].value}) end par settle ho gayi! 🎯`,
        isPassComplete: true,
      });

      pass++;

      if (!swappedInThisPass) {
        for (let k = 0; k < n; k++) {
          if (!sortedIndices.includes(k)) {
            sortedIndices.push(k);
          }
        }
        break;
      }
    }

    const allSorted = arr.map((_, idx) => idx);
    generatedSteps.push({
      items: [...arr],
      compareIndices: null,
      isSwapping: false,
      pass: pass - 1,
      sortedIndices: allSorted,
      message: 'Mubarak ho! Saare items 100% sorted order mein hain! 🎉',
      isFullySorted: true,
    });

    return generatedSteps;
  };

  useEffect(() => {
    const formatted = prepareItems(initialItems);
    const newSteps = generateSteps(formatted);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [initialItems]);

  useEffect(() => {
    const step = steps[currentStepIndex];
    if (step) {
      if (step.isFullySorted) {
        playAudioSFX('sorted', soundEnabled);
      } else if (step.isSwapping) {
        playAudioSFX('swap', soundEnabled);
      } else if (step.compareIndices) {
        playAudioSFX('compare', soundEnabled);
      }
    }
  }, [currentStepIndex, soundEnabled, steps]);

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
    playAudioSFX('click', soundEnabled);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    playAudioSFX('click', soundEnabled);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    playAudioSFX('click', soundEnabled);
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

  const maxValue = Math.max(...initialItems.map((item) => item.value), 1);

  return (
    <div className="w-full bg-card border border-textSecondary/20 rounded-3xl p-5 sm:p-7 shadow-md transition-all relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-main">{title}</h3>
          <p className="text-sm text-textSecondary font-medium">
            Step {currentStepIndex + 1} of {steps.length} • Pass {currentStep.pass}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playAudioSFX('click', true);
              setSoundEnabled(!soundEnabled);
            }}
            className="px-3.5 py-2 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-xs font-bold transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-current text-accent" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <span>{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          <span className="bg-bg border border-textSecondary/30 text-textSecondary text-xs px-3.5 py-2 rounded-xl font-mono font-bold">
            Pass: <strong className="text-accent text-sm font-extrabold">{currentStep.pass}</strong>
          </span>
        </div>
      </div>

      <div
        className={`mb-6 p-4 rounded-xl text-base font-semibold border transition-all duration-300 ${
          currentStep.isPassComplete || currentStep.isFullySorted
            ? 'bg-focusBg border-focusBorder text-focusText ring-2 ring-focusBorder/50'
            : currentStep.isSwapping
            ? 'bg-accent/15 border-accent text-accent'
            : 'bg-bg border-textSecondary/20 text-main'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">
            {currentStep.isFullySorted
              ? '🏆'
              : currentStep.isSwapping
              ? '🔀'
              : currentStep.compareIndices
              ? '🔍'
              : '📌'}
          </span>
          <span className="leading-snug">{currentStep.message}</span>
        </div>
      </div>

      <div className="relative my-8 min-h-[260px] flex items-end justify-center gap-3 sm:gap-6 px-3 py-8 border-b border-textSecondary/15 overflow-x-auto">
        {currentStep.isSwapping && currentStep.compareIndices && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-accent text-onAccent font-extrabold text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-onAccent animate-bounce flex items-center gap-1.5 tracking-wider uppercase font-mono">
            <span>🔀</span>
            <span>SWAPPING POSITIONS</span>
            <span>⇄</span>
          </div>
        )}

        {currentStep.items.map((item, idx) => {
          const isComparing = currentStep.compareIndices?.includes(idx);
          const isSorted = currentStep.sortedIndices.includes(idx);
          const heightPercent = Math.max((item.value / maxValue) * 100, 28);

          let cardStyle = 'bg-bg border-textSecondary/30 text-main';
          let transformStyle = '';

          if (isSorted) {
            cardStyle = 'bg-focusBg border-focusBorder text-focusText font-extrabold shadow-sm';
          } else if (isComparing) {
            if (currentStep.isSwapping) {
              cardStyle =
                'bg-accent text-onAccent border-accent font-extrabold scale-110 shadow-xl ring-4 ring-accent/50 z-20';
              
              if (currentStep.compareIndices && currentStep.compareIndices[0] === idx) {
                transformStyle = 'translate-x-4 -translate-y-4 rotate-3';
              } else if (currentStep.compareIndices && currentStep.compareIndices[1] === idx) {
                transformStyle = '-translate-x-4 -translate-y-4 -rotate-3';
              }
            } else {
              cardStyle =
                'bg-accent2/30 border-accent2 text-main font-bold scale-105 shadow-md -translate-y-2 ring-2 ring-accent2/70 z-10';
            }
          }

          return (
            <div
              key={item.id}
              className={`flex flex-col items-center flex-1 max-w-[95px] min-w-[64px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${transformStyle}`}
            >
              <div className="w-full flex flex-col justify-end items-center h-36 mb-2">
                <div
                  className={`w-full rounded-t-xl transition-all duration-700 flex items-center justify-center text-xs font-mono font-extrabold shadow-xs ${
                    isComparing && currentStep.isSwapping
                      ? 'bg-accent text-onAccent'
                      : isComparing
                      ? 'bg-accent2 text-focusText'
                      : isSorted
                      ? 'bg-focusBorder text-focusText'
                      : 'bg-textSecondary/25 text-textSecondary'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {item.value}
                </div>
              </div>

              <div
                className={`w-full p-3 rounded-2xl border text-center transition-all duration-700 flex flex-col items-center justify-center gap-1 ${cardStyle}`}
              >
                {item.icon && <span className="text-xl">{item.icon}</span>}
                <span className="text-xs font-extrabold truncate w-full" title={item.label}>
                  {item.label}
                </span>
                <span className="text-[11px] opacity-75 font-mono font-semibold">[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Toolbar with Modern Vector SVG Icons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          {/* Autoplay / Pause Button */}
          <button
            onClick={() => {
              playAudioSFX('click', soundEnabled);
              setIsPlaying(!isPlaying);
            }}
            disabled={currentStepIndex >= steps.length - 1 && !isPlaying}
            className="btn-primary px-6 py-3 rounded-xl font-black text-sm shadow-md flex items-center gap-2.5 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Autoplay</span>
              </>
            )}
          </button>

          {/* Prev Step Button */}
          <button
            onClick={handleStepBackward}
            disabled={currentStepIndex === 0 || isPlaying}
            className="px-4 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent hover:-translate-y-0.5 text-sm font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 fill-current text-textSecondary" viewBox="0 0 24 24">
              <path d="M11 18V6l-8.5 6L11 18zm.5-6l8.5 6V6l-8.5 6z" />
            </svg>
            <span>Prev</span>
          </button>

          {/* Next Step Button */}
          <button
            onClick={handleStepForward}
            disabled={currentStepIndex >= steps.length - 1 || isPlaying}
            className="px-4 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent hover:-translate-y-0.5 text-sm font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <svg className="w-4 h-4 fill-current text-textSecondary" viewBox="0 0 24 24">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
            </svg>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl border border-textSecondary/30 bg-bg text-textSecondary hover:text-main hover:border-textSecondary hover:-translate-y-0.5 text-sm font-bold flex items-center gap-1.5 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            <span>Reset</span>
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2.5 text-xs font-bold text-textSecondary bg-bg border border-textSecondary/20 px-4 py-2.5 rounded-xl">
          <span>Speed:</span>
          <input
            type="range"
            min="300"
            max="1800"
            step="100"
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="w-24 accent-accent cursor-pointer"
          />
          <span className="font-mono w-12 text-right">{speedMs}ms</span>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
