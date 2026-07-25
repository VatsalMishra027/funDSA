import React, { useState, useEffect, useRef } from 'react';

interface BubbleNode {
  id: string;
  val: number;
  label: string;
  color: string;
}

const INITIAL_NODES: BubbleNode[] = [
  { id: 'b1', val: 78, label: 'Element 01', color: 'from-amber-500 to-orange-600' },
  { id: 'b2', val: 14, label: 'Element 02', color: 'from-rose-500 to-red-600' },
  { id: 'b3', val: 92, label: 'Element 03', color: 'from-emerald-500 to-teal-600' },
  { id: 'b4', val: 35, label: 'Element 04', color: 'from-sky-500 to-blue-600' },
  { id: 'b5', val: 60, label: 'Element 05', color: 'from-purple-500 to-indigo-600' },
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

  // Initialize Web Audio API for spatial proximity sound
  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (!gainNodeRef.current && audioCtxRef.current) {
        const gain = audioCtxRef.current.createGain();
        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gain;
      }
    } catch (e) {
      // Audio setup fallback
    }
  };

  // Play proximity tone synchronized with animation pulse
  const triggerSpatialSoundPulse = (freq: number) => {
    if (!spatialAudioEnabled || !audioCtxRef.current || !gainNodeRef.current) return;
    try {
      const now = audioCtxRef.current.currentTime;
      const osc = audioCtxRef.current.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const pulseGain = audioCtxRef.current.createGain();
      // Apply calculated proximity volume
      pulseGain.gain.setValueAtTime(proximityVolume * 0.15, now);
      pulseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(pulseGain);
      pulseGain.connect(gainNodeRef.current);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Silent catch
    }
  };

  // Calculate Distance & Spatial Volume on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const containerCenter = rect.top + rect.height / 2;

      const maxDistance = window.innerHeight * 0.9;
      const distance = Math.abs(viewportCenter - containerCenter);

      if (distance < maxDistance) {
        // Linear gain attenuation based on distance (1 when centered, 0 when far)
        const vol = Math.max(0, 1 - distance / maxDistance);
        setProximityVolume(vol);
      } else {
        setProximityVolume(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        triggerSpatialSoundPulse(880); // High completion pulse

        setTimeout(() => {
          arr = [
            { id: `b-${Date.now()}-1`, val: 85, label: 'Elem A', color: 'from-amber-500 to-orange-600' },
            { id: `b-${Date.now()}-2`, val: 20, label: 'Elem B', color: 'from-rose-500 to-red-600' },
            { id: `b-${Date.now()}-3`, val: 95, label: 'Elem C', color: 'from-emerald-500 to-teal-600' },
            { id: `b-${Date.now()}-4`, val: 40, label: 'Elem D', color: 'from-sky-500 to-blue-600' },
            { id: `b-${Date.now()}-5`, val: 65, label: 'Elem E', color: 'from-purple-500 to-indigo-600' },
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
          triggerSpatialSoundPulse(440 + arr[j].val * 3); // Frequency scales with value
        } else {
          setIsSwapping(false);
          triggerSpatialSoundPulse(320);
        }

        j++;
      } else {
        i++;
        j = 0;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [spatialAudioEnabled, proximityVolume]);

  const toggleSpatialAudio = () => {
    if (!spatialAudioEnabled) {
      initAudio();
      setSpatialAudioEnabled(true);
    } else {
      setSpatialAudioEnabled(false);
    }
  };

  const maxValue = Math.max(...nodes.map((n) => n.val), 1);

  return (
    <div
      ref={containerRef}
      className="w-full bg-card/90 backdrop-blur-xl border-2 border-accent/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8 transition-all duration-500"
    >
      {/* Header Bar with Spatial Audio Distance Meter */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-textSecondary/15 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono font-black text-accent tracking-widest uppercase">
            3D SPATIAL AUDIO ALGORITHM WAVE
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Spatial Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSpatialAudio}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all flex items-center gap-2 ${
              spatialAudioEnabled
                ? 'bg-accent text-onAccent border-accent ring-2 ring-accent/50 shadow-md'
                : 'bg-bg text-main border-textSecondary/30 hover:border-accent'
            }`}
          >
            <span>{spatialAudioEnabled ? '🎧 Spatial Audio ON' : '🔇 Enable Spatial Audio'}</span>
          </button>

          {/* Distance Volume Indicator */}
          {spatialAudioEnabled && (
            <div className="flex items-center gap-1.5 bg-bg border border-textSecondary/20 px-3 py-1 rounded-xl text-xs font-mono font-bold text-textSecondary">
              <span>Proximity Vol:</span>
              <div className="w-12 bg-textSecondary/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${Math.round(proximityVolume * 100)}%` }}
                ></div>
              </div>
              <span>{Math.round(proximityVolume * 100)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Proximity Sound Status Hint */}
      {spatialAudioEnabled && (
        <div className="mb-4 text-center">
          <p className="text-xs font-mono text-accent font-bold animate-pulse">
            🔊 Scroll up & down! Volume increases when centered near this visualizer and fades when moving away.
          </p>
        </div>
      )}

      {/* Floating 3D Bubble Wave Stream */}
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
              {/* Dynamic Bubbly Gradient Bar */}
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

              {/* Bubbly Glass Pill */}
              <div
                className={`w-full p-3 rounded-2xl border text-center transition-all duration-700 flex flex-col items-center justify-center gap-0.5 ${glowClass}`}
              >
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
