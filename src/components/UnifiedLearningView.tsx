import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';
import BubbleSortVisualizer, { type VisualizerItem, playAudioSFX } from './BubbleSortVisualizer';
import GlossaryTerm from './GlossaryTerm';

export const UnifiedLearningView: React.FC = () => {
  const profile = useStore(studentStore);
  const studentName = profile.name || 'Dost';

  const [demoItems, setDemoItems] = useState<VisualizerItem[]>([
    { label: 'Samosa', value: 15, icon: '🥟' },
    { label: 'Chai', value: 10, icon: '☕' },
    { label: 'Maggi', value: 45, icon: '🍜' },
    { label: 'Pizza', value: 250, icon: '🍕' },
    { label: 'Roll', value: 80, icon: '🌯' },
  ]);

  useEffect(() => {
    if (profile.interests.includes('Cricket')) {
      setDemoItems([
        { label: 'Gill', value: 91, icon: '⭐' },
        { label: 'Pant', value: 125, icon: '🔥' },
        { label: 'Dhoni', value: 148, icon: '🧤' },
        { label: 'Kohli', value: 183, icon: '🏏' },
        { label: 'Rohit', value: 264, icon: '💥' },
      ]);
    } else if (profile.interests.includes('Gaming')) {
      setDemoItems([
        { label: 'Medic', value: 4, icon: '💊' },
        { label: 'Scout', value: 11, icon: '🔭' },
        { label: 'Sniper', value: 14, icon: '🎯' },
        { label: 'Rusher', value: 22, icon: '⚡' },
      ]);
    }
  }, [profile.interests]);

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-10">
      {/* Welcome Header */}
      <div className="text-center space-y-3">
        <span className="bg-focusBg border border-focusBorder text-focusText text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Complete Bubble Sort Master Guide
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Bubble Sort: <span className="text-accent font-handwritten text-4xl sm:text-6xl">Sab Kuch Ek Sath</span> 🧼
        </h1>
        <p className="text-textSecondary text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Welcome <strong>{studentName}</strong>! Yahan Bubble Sort ke saare concepts intuitive Hinglish aur formal CS textbook definitions ke sath compiled hain.
        </p>
      </div>

      {/* 📘 Formal CS Definition Box for Professionalism */}
      <div className="bg-card border-2 border-accent/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-accent">
          <span className="text-2xl">📘</span>
          <h3 className="font-extrabold text-xl">Formal CS Definition (Textbook Specification)</h3>
        </div>
        <blockquote className="text-sm sm:text-base italic text-main leading-relaxed border-l-4 border-accent pl-4 py-1 font-mono bg-bg/50 rounded-r-xl">
          "Bubble Sort is an elementary comparison-based sorting algorithm. It repeatedly steps through an array A[0..N-1], compares adjacent elements at indices i and i+1, and swaps them if A[i] &gt; A[i+1]. After each pass k, the k-th largest element is guaranteed to settle into its final position at index N-k. The algorithm terminates when a full pass executes with 0 swaps."
        </blockquote>
        <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono font-bold">
          <span className="bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-lg">Time Complexity: O(N²)</span>
          <span className="bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-lg">Space Complexity: O(1) Auxiliary</span>
          <span className="bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-lg">Algorithmic Property: Stable & In-Place</span>
        </div>
      </div>

      {/* 1. What is an Array / List? */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl font-extrabold text-main">1. Concept 1: List & Index Mechanics</h2>
        </div>
        <p className="text-base sm:text-lg leading-relaxed font-medium text-main">
          Computer memory mein jab hum elements ko sequence mein store karte hain, toh use{' '}
          <GlossaryTerm term="array" definition="Array = Computer waali line ya list, jisme saare items ek sequence mein baithte hain.">
            array
          </GlossaryTerm>{' '}
          bolte hain. Har element ka ek seat number hota hai jise{' '}
          <GlossaryTerm term="index" definition="Index = List ke andar kisi item ka exact seat number (hamesha 0 se shuru hota hai).">
            index
          </GlossaryTerm>{' '}
          bolte hain, aur computer hamesha <strong>index 0</strong> se indexing start karta hai!
        </p>
      </div>

      {/* 2. Core Mechanics: Comparison & Swapping */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl font-extrabold text-main">2. Concept 2: Adjacent Comparison & Swapping</h2>
        </div>
        <p className="text-base sm:text-lg leading-relaxed font-medium text-main">
          Bubble Sort pure list ko ek sath sort nahi karta. Yeh single step mein sirf <strong>2 adjacent (bagal waale)</strong> items ko compare karta hai. 
          Agar pehla item doosre se bada hai (Left &gt; Right), toh dono ki position{' '}
          <GlossaryTerm term="swap" definition="Swap = Do items ki aapas mein position (jagah) exchange kar dena.">
            swap
          </GlossaryTerm>{' '}
          ho jaati hai!
        </p>

        <div className="dhyan-do-box p-4 sm:p-5 rounded-2xl space-y-1">
          <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
            <span>💡</span>
            <span>KEY TAKEAWAY</span>
          </div>
          <p className="text-base sm:text-lg font-semibold">
            If A[i] &gt; A[i+1] 👉 Swap positions! <br />
            If A[i] ≤ A[i+1] 👉 Maintain position, advance index!
          </p>
        </div>
      </div>

      {/* 3. Live Interactive Visualizer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-extrabold text-main flex items-center gap-2">
            <span>⚡</span> 3. Interactive Audio Visualizer
          </h2>
          <span className="text-xs font-mono bg-focusBg text-focusText border border-focusBorder px-2.5 py-1 rounded font-bold">
            Interactive Island
          </span>
        </div>
        <BubbleSortVisualizer items={demoItems} title="Bubble Sort Step-by-Step Action" />
      </div>

      {/* 4. One Pass & Settle Property */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl font-extrabold text-main">4. Concept 3: Pass Settlement & Termination</h2>
        </div>
        <p className="text-base sm:text-lg leading-relaxed font-medium text-main">
          Jab hum index 0 se end tak saare adjacent pairs check kar lete hain, toh use 1{' '}
          <GlossaryTerm term="pass" definition="Pass = Shuru se end tak ek poori round trip jisme pairs check hote hain.">
            Pass
          </GlossaryTerm>{' '}
          kehte hain.
        </p>
        <div className="bg-bg border border-textSecondary/30 p-5 rounded-2xl space-y-3 text-base font-medium">
          <p>🎯 <strong>Pass 1 Outcome:</strong> Sabse BADA element array ke last index par permanently settle ho jata hai!</p>
          <p>🛑 <strong>Termination Criteria:</strong> Bubble sort tab terminate hota hai jab ek full pass mein <strong>0 swaps</strong> execute hon — meaning array is fully sorted!</p>
        </div>
      </div>

      {/* 5. Time Complexity Section */}
      <details className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm group cursor-pointer">
        <summary className="font-extrabold text-xl text-main flex items-center justify-between list-none">
          <span className="flex items-center gap-2">
            <span>⏱️</span> 5. Asymptotic Time & Space Complexity
          </span>
          <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
        </summary>

        <div className="pt-4 space-y-4 text-base leading-relaxed border-t border-textSecondary/15 mt-4">
          <div className="dhyan-do-box p-4 rounded-xl space-y-1">
            <p className="font-bold text-base">Worst & Average Case Complexity: O(N²)</p>
            <p className="text-sm font-medium">
              Reversed array ke case mein total comparisons N × (N-1) / 2 = O(N²) hote hain.
            </p>
          </div>

          <div className="bg-focusBg border border-focusBorder text-focusText p-4 rounded-xl space-y-1">
            <p className="font-bold text-base">Best Case Complexity: O(N)</p>
            <p className="text-sm font-medium">
              Sorted array ke case mein, 0 swaps detected hote hi algorithm 1 pass (N-1 comparisons) ke baad terminate ho jati hai.
            </p>
          </div>
        </div>
      </details>

      {/* Action Banner to Master Quiz */}
      <div className="bg-card border-2 border-focusBorder rounded-3xl p-8 text-center space-y-5 shadow-md">
        <span className="text-4xl">🧠</span>
        <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to test your understanding?</h3>
        <p className="text-base sm:text-lg text-textSecondary max-w-md mx-auto font-medium">
          Saare core concepts aur formal definitions review ho chuke hain. Now attempt the 6-Question Master Quiz!
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href="/quiz"
            onClick={() => playAudioSFX('click', true)}
            className="btn-primary px-8 py-3.5 rounded-xl font-extrabold text-lg shadow-chalk inline-flex items-center gap-2"
          >
            <span>Take 6-Question Master Quiz</span>
            <span>🎯</span>
          </a>
          <a
            href="/playground"
            onClick={() => playAudioSFX('click', true)}
            className="px-6 py-3.5 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent font-bold text-base inline-flex items-center gap-2"
          >
            <span>🧪 Try Playground</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLearningView;
