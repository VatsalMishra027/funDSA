import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';
import BubbleSortVisualizer, { type VisualizerItem } from './BubbleSortVisualizer';
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
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Bubble Sort: <span class="text-accent font-handwritten text-4xl sm:text-6xl">Sab Kuch Ek Sath</span> 🧼
        </h1>
        <p class="text-textSecondary text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Welcome <strong>{studentName}</strong>! Yahan Bubble Sort ke saare concepts ek hi jagah simplified format mein hain.
        </p>
      </div>

      {/* 1. What is an Array / List? */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl font-extrabold text-main">1. Pehle Samjhein: List & Index</h2>
        </div>
        <p className="text-base leading-relaxed font-medium text-main">
          Computer mein jab hum kisi data ko line mein rakhte hain, toh use{' '}
          <GlossaryTerm term="array" definition="Array = Computer waali line ya list, jisme saare items ek sequence mein baithte hain.">
            array
          </GlossaryTerm>{' '}
          bolte hain. Har item ka ek seat number hota hai jise{' '}
          <GlossaryTerm term="index" definition="Index = List ke andar kisi item ka exact seat number (hamesha 0 se shuru hota hai).">
            index
          </GlossaryTerm>{' '}
          bolte hain, aur computer hamesha <strong>index 0</strong> se shuru karta hai!
        </p>
      </div>

      {/* 2. Core Mechanics: Comparison & Swapping */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl font-extrabold text-main">2. Core Logic: Compare & Swap</h2>
        </div>
        <p className="text-base leading-relaxed font-medium text-main">
          Bubble Sort pure list ko ek sath nahi dekhta! Yeh ek baar mein sirf <strong>2 adjacent (bagal waale)</strong> items ko compare karta hai. 
          Agar pehla item doosre se bada hai (Left &gt; Right), toh dono ki position{' '}
          <GlossaryTerm term="swap" definition="Swap = Do items ki aapas mein position (jagah) exchange kar dena.">
            swap
          </GlossaryTerm>{' '}
          ho jaati hai!
        </p>

        <div className="dhyan-do-box p-4 sm:p-5 rounded-2xl space-y-1">
          <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
            <span>💡</span>
            <span>DHYAN DO!</span>
          </div>
          <p className="text-sm sm:text-base font-semibold">
            Left &gt; Right? 👉 Swap Karo! <br />
            Left ≤ Right? 👉 Kuch mat karo, aage badho!
          </p>
        </div>
      </div>

      {/* 3. Live Interactive Visualizer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-extrabold text-main flex items-center gap-2">
            <span>⚡</span> 3. Visual Action & Audio Feedback
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
          <h2 className="text-2xl font-extrabold text-main">4. One Pass & Termination Rule</h2>
        </div>
        <p className="text-base leading-relaxed font-medium text-main">
          Jab hum shuru se end tak saare adjacent pairs check kar lete hain, toh use ek{' '}
          <GlossaryTerm term="pass" definition="Pass = Shuru se end tak ek poori round trip jisme pairs check hote hain.">
            Pass
          </GlossaryTerm>{' '}
          kehte hain.
        </p>
        <div className="bg-bg border border-textSecondary/30 p-5 rounded-2xl space-y-2 text-sm sm:text-base font-medium">
          <p>🎯 <strong>Pass 1 Outcome:</strong> Sabse BADA element array ke last position par permanently settle ho jata hai!</p>
          <p>🛑 <strong>Algorithm Termination:</strong> Bubble sort tab stop hota hai jab ek poore pass mein <strong>0 swaps</strong> hon — matlab list 100% sorted hai!</p>
        </div>
      </div>

      {/* 5. Optional Time Complexity */}
      <details className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm group cursor-pointer">
        <summary className="font-extrabold text-lg sm:text-xl text-main flex items-center justify-between list-none">
          <span className="flex items-center gap-2">
            <span>⏱️</span> 5. Time & Space Complexity (Optional Info)
          </span>
          <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
        </summary>

        <div className="pt-4 space-y-4 text-sm sm:text-base leading-relaxed border-t border-textSecondary/15 mt-4">
          <div className="dhyan-do-box p-4 rounded-xl space-y-1">
            <p className="font-bold text-base">Worst & Average Case: O(N²)</p>
            <p className="text-xs sm:text-sm font-medium">
              Agar list reversed order mein hai, toh comparisons ~ N × (N-1) / 2 = <strong>O(N²)</strong> hote hain.
            </p>
          </div>

          <div className="bg-focusBg border border-focusBorder text-focusText p-4 rounded-xl space-y-1">
            <p className="font-bold text-base">Best Case: O(N)</p>
            <p className="text-xs sm:text-sm font-medium">
              Agar list pehle se sorted hai, 0 swaps hone ki wajah se 1 pass mein <strong>O(N)</strong> me stop ho jata hai.
            </p>
          </div>
        </div>
      </details>

      {/* Action Banner to Master Quiz */}
      <div className="bg-card border-2 border-focusBorder rounded-3xl p-8 text-center space-y-5 shadow-md">
        <span className="text-3xl">🧠</span>
        <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to test your understanding?</h3>
        <p className="text-base text-textSecondary max-w-md mx-auto font-medium">
          Sab kuch ek jagah samajh liya hai! Ab 6-question Master Quiz attempt karo aur apna Completion Badge claim karo.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href="/quiz"
            className="btn-primary px-8 py-3.5 rounded-xl font-extrabold text-lg shadow-chalk inline-flex items-center gap-2"
          >
            <span>Take 6-Question Master Quiz</span>
            <span>🎯</span>
          </a>
          <a
            href="/playground"
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
