import React, { useState, useEffect, useRef } from 'react';
import CategoryIcon from './CategoryIcon';

interface BubbleNode {
  id: string;
  val: number;
  label: string;
  category: 'cricket' | 'gaming' | 'food' | 'movies' | 'fitness';
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
  const [spatialAudioEnabled, setSpatialAudioEnabled] = useState<boolean>(false);
  const [proximityVolume, setProximityVolume] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);

  // Initialize Web Audio Engine for Spatial Audio on User Gesture
  const toggleSpatialAudio = () => {
    try {
      if (!spatialAudioEnabled) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.connect(ctx.destination);

        // Continuous Ambient Harmonic Drone
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime); // 320 Hz fundamental tone
        osc.connect(gainNode);
        osc.start();

        audioCtxRef.current = ctx;
        gainNodeRef.current = gainNode;
        oscNodeRef.current = osc;

        setSpatialAudioEnabled(true);
      } else {
        if (oscNodeRef.current) {
          oscNodeRef.current.stop();
          oscNodeRef.current.disconnect();
        }
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
        gainNodeRef.current = null;
        oscNodeRef.current = null;
        setSpatialAudioEnabled(false);
      }
    } catch (e) {
      console.error('Audio initialization error:', e);
    }
  };

  // Scroll Distance Distance Attenuation Effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const containerCenter = rect.top + rect.height / 2;

      const maxDistance = window.innerHeight * 0.85;
      const distance = Math.abs(viewportCenter - containerCenter);

      let volRatio = 0;
      if (distance < maxDistance) {
        // Smooth linear distance attenuation (1 when centered, 0 when far)
        volRatio = Math.max(0, 1 - distance / maxDistance);
      }

      setProximityVolume(volRatio);

      // Dynamically adjust Web Audio GainNode volume on every scroll frame!
      if (gainNodeRef.current && audioCtxRef.current) {
        const targetGain = volRatio * 0.15; // Max 15% volume
        gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.05);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [spatialAudioEnabled]);

  // Bubble Sort Pass Loop with Pitch Frequency Pulses
  useEffect(() => {
    let arr = [...INITIAL_NODES];
    let i = 0;
    let j = 0;

    const interval = setInterval(() => {
      const n = arr.length;

      if (i >= n - 1) {
        setComparePair(null);
        setIsSwapping(false);

        if (oscNodeRef.current && audioCtxRef.current) {
          oscNodeRef.current.frequency.setValueAtTime(523.25, audioCtxRef.current.currentTime);
        }

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

          // Shift audio pitch frequency dynamically on swap
          if (oscNodeRef.current && audioCtxRef.current) {
            const pitch = 300 + arr[j].val * 2.5;
            oscNodeRef.current.frequency.setTargetAtTime(pitch, audioCtxRef.current.currentTime, 0.05);
          }
        } else {
          setIsSwapping(false);
          if (oscNodeRef.current && audioCtxRef.current) {
            oscNodeRef.current.frequency.setTargetAtTime(320, audioCtxRef.current.currentTime, 0.05);
          }
        }

        j++;
      } else {
        i++;
        j = 0;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [spatialAudioEnabled]);

  const maxValue = Math.max(...nodes.map((n) => n.val), 1);

  return (
    <div
      ref={containerRef}
      className="w-full bg-card/90 backdrop-blur-xl border-2 border-accent/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8 transition-all duration-500"
    >
      {/* Header Bar with Vector SVG Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-textSecondary/15 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono font-black text-accent tracking-widest uppercase flex items-center gap-2">
            <CategoryIcon name="sparkles" className="w-4 h-4 text-accent" />
            <span>3D SPATIAL AUDIO ALGORITHM WAVE</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Spatial Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSpatialAudio}
            className={`px-4 py-2 rounded-xl border text-xs font-extrabold transition-all flex items-center gap-2 ${
              spatialAudioEnabled
                ? 'bg-accent text-onAccent border-accent ring-2 ring-accent/50 shadow-md scale-105'
                : 'bg-bg text-main border-textSecondary/30 hover:border-accent'
            }`}
          >
            <span>{spatialAudioEnabled ? '🎧 Spatial Audio Active' : '🔇 Turn On Spatial Audio'}</span>
          </button>

          {/* Distance Volume Meter */}
          {spatialAudioEnabled && (
            <div className="flex items-center gap-2 bg-bg border border-textSecondary/20 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-textSecondary">
              <span>Scroll Vol:</span>
              <div className="w-16 bg-textSecondary/20 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-200"
                  style={{ width: `${Math.round(proximityVolume * 100)}%` }}
                ></div>
              </div>
              <span className="text-accent font-extrabold w-8 text-right">
                {Math.round(proximityVolume * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Proximity Sound Status Banner */}
      {spatialAudioEnabled && (
        <div className="mb-4 text-center bg-focusBg border border-focusBorder p-3 rounded-2xl">
          <p className="text-xs sm:text-sm font-mono text-focusText font-bold flex items-center justify-center gap-2">
            <span>🔊</span>
            <span>
              Spatial Audio is playing! Scroll up and down to hear the volume increase near this section ({Math.round(proximityVolume * 100)}%) and fade out when moving away.
            </span>
          </p>
        </div>
      )}

      {/* Floating 3D Bubble Wave Stream with Vector SVG Icons */}
      <div className="relative my-4 min-h-[170px] flex items-end justify-center gap-4 sm:gap-8 px-4 py-4 border-b border-textSecondary/10 overflow-x-auto">
        {nodes.map((node, idx) => {
          const isComparing = comparePair?.includes(idx);
          const heightPercent = Math.max((node.val / maxValue) * 100, 35);

          let transformClass = '';
          let glowClass = 'border-textSecondary/30 bg-bg text-main';

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
              className={`flex flex-col items-center flex-1 max-w-[90px] min-w-[62px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${transformClass}`}
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

              {/* Bubbly Glass Pill with Category Vector SVG Icon */}
              <div
                className={`w-full p-2.5 rounded-2xl border text-center transition-all duration-700 flex flex-col items-center justify-center gap-1 ${glowClass}`}
              >
                <CategoryIcon name={node.category} className="w-4 h-4" />
                <span className="text-xs font-extrabold truncate w-full">{node.label}</span>
                <span className="text-[10px] opacity-75 font-mono font-semibold">[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpatialAudioHeroVisualizer;
