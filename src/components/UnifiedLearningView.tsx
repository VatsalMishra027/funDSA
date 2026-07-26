import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';
import BubbleSortVisualizer, { type VisualizerItem, playAudioSFX } from './BubbleSortVisualizer';
import GlossaryTerm from './GlossaryTerm';
import CategoryIcon from './CategoryIcon';

export const UnifiedLearningView: React.FC = () => {
  const profile = useStore(studentStore);
  const studentName = profile.name || 'Dost';

  // Default 6 highly unsorted food items
  const [demoItems, setDemoItems] = useState<VisualizerItem[]>([
    { label: 'Pizza', value: 250, icon: '🍕' },
    { label: 'Chai', value: 10, icon: '☕' },
    { label: 'Roll', value: 80, icon: '🌯' },
    { label: 'Samosa', value: 15, icon: '🥟' },
    { label: 'Burger', value: 120, icon: '🍔' },
    { label: 'Maggi', value: 45, icon: '🍜' },
  ]);

  useEffect(() => {
    if (profile.interests.includes('Cricket')) {
      setDemoItems([
        { label: 'Rohit', value: 264, icon: '💥' },
        { label: 'Gill', value: 91, icon: '⭐' },
        { label: 'Dhoni', value: 148, icon: '🧤' },
        { label: 'Bumrah', value: 16, icon: '⚡' },
        { label: 'Kohli', value: 183, icon: '🏏' },
        { label: 'Pant', value: 125, icon: '🔥' },
      ]);
    } else if (profile.interests.includes('Gaming')) {
      setDemoItems([
        { label: 'Rusher', value: 22, icon: '⚡' },
        { label: 'Medic', value: 4, icon: '💊' },
        { label: 'Leader', value: 35, icon: '🏆' },
        { label: 'Scout', value: 11, icon: '🔭' },
        { label: 'Captain', value: 28, icon: '🎖️' },
        { label: 'Sniper', value: 14, icon: '🎯' },
      ]);
    } else if (profile.interests.includes('Bollywood/Movies')) {
      setDemoItems([
        { label: 'Blockbuster', value: 96, icon: '🏆' },
        { label: 'Flop', value: 30, icon: '🍅' },
        { label: 'Cult Classic', value: 74, icon: '🎬' },
        { label: 'Dissected', value: 18, icon: '🎟️' },
        { label: 'Hit Film', value: 82, icon: '🍿' },
        { label: 'Average', value: 65, icon: '🎥' },
      ]);
    } else if (profile.interests.includes('Music/Singing')) {
      setDemoItems([
        { label: 'Viral Track', value: 340, icon: '🔥' },
        { label: 'Garage Song', value: 8, icon: '🎸' },
        { label: 'Pop Hit', value: 120, icon: '🎧' },
        { label: 'Indie Track', value: 12, icon: '🎙️' },
        { label: 'Rock Single', value: 95, icon: '📻' },
        { label: 'Acoustic', value: 45, icon: '🎼' },
      ]);
    } else if (profile.interests.includes('Fitness')) {
      setDemoItems([
        { label: 'PR Max', value: 110, icon: '⚡' },
        { label: 'Warmup', value: 40, icon: '👟' },
        { label: 'Heavy Set', value: 95, icon: '💪' },
        { label: 'Light Set', value: 50, icon: '🏋️‍♂️' },
        { label: 'Peak Lift', value: 125, icon: '🏆' },
        { label: 'Set 1', value: 65, icon: '👟' },
      ]);
    } else if (profile.interests.includes('Fashion')) {
      setDemoItems([
        { label: 'Limited Ed', value: 500, icon: '💎' },
        { label: 'Canvas', value: 50, icon: '👟' },
        { label: 'Vintage', value: 250, icon: '👗' },
        { label: 'Socks', value: 15, icon: '🧦' },
        { label: 'High Tops', value: 320, icon: '🧢' },
        { label: 'Streetwear', value: 120, icon: '👕' },
      ]);
    } else if (profile.interests.includes('Travel')) {
      setDemoItems([
        { label: 'Overseas', value: 7500, icon: '✈️' },
        { label: 'Local Hop', value: 450, icon: '🚕' },
        { label: 'Island Trip', value: 2800, icon: '🏖️' },
        { label: 'Taxi Ride', value: 85, icon: '🛵' },
        { label: 'Intercity', value: 1800, icon: '🚆' },
        { label: 'Domestic', value: 1200, icon: '✈️' },
      ]);
    }
  }, [profile.interests]);

  // Context Explanation Generator based on Active Interest
  let activeContextExplanation = '🍕 Food Context: Yahan numbers items ke Relative Prices in ₹ (e.g., Pizza ₹250, Chai ₹10) ko represent kar rahe hain. Lower price items left aur higher price right mein bubble up honge!';

  if (profile.interests.includes('Cricket')) {
    activeContextExplanation = '🏏 Cricket Context: Yahan numbers players ke Highest Match Runs / Scores (e.g., Rohit 264 runs, Kohli 183 runs) ko represent kar rahe hain!';
  } else if (profile.interests.includes('Gaming')) {
    activeContextExplanation = '🎮 Gaming Context: Yahan numbers players ke Total Match Kills (e.g., Leader 35 kills, Rusher 22 kills) ko represent kar rahe hain!';
  } else if (profile.interests.includes('Bollywood/Movies')) {
    activeContextExplanation = '🎬 Movies Context: Yahan numbers films ke Box Office Collections in ₹ Crores (e.g., Blockbuster 96Cr, Flop 30Cr) ko represent kar rahe hain!';
  } else if (profile.interests.includes('Music/Singing')) {
    activeContextExplanation = '🎧 Music Context: Yahan numbers tracks ke Total Streams in Millions (e.g., Viral Track 340M, Indie 12M) ko represent kar rahe hain!';
  } else if (profile.interests.includes('Fitness')) {
    activeContextExplanation = '🏋️‍♂️ Fitness Context: Yahan numbers Bench Press / Lift Weights in kg (e.g., PR Max 110kg, Warmup 40kg) ko represent kar rahe hain!';
  } else if (profile.interests.includes('Fashion')) {
    activeContextExplanation = '👗 Fashion Context: Yahan numbers fashion items ke Price in $ / ₹ (e.g., Limited Ed $500, Socks $15) ko represent kar rahe hain!';
  } else if (profile.interests.includes('Travel')) {
    activeContextExplanation = '✈️ Travel Context: Yahan numbers travel destinations ke Distance in km (e.g., Overseas 7500km, Local Hop 450km) ko represent kar rahe hain!';
  }

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

      {/* Premium Dual-Tone Formal CS Definition Box */}
      <div className="bg-card border-2 border-accent/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-3">
        <div className="flex items-center gap-3 text-accent">
          <div className="p-2.5 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center shadow-xs">
            <CategoryIcon name="book" className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-extrabold text-xl">Formal CS Definition (Textbook Specification)</h3>
        </div>
        <blockquote className="text-sm sm:text-base italic text-main leading-relaxed border-l-4 border-accent pl-4 py-1 font-mono bg-bg/50 rounded-r-xl">
          "Bubble Sort is an elementary comparison-based sorting algorithm. It repeatedly steps through an array A[0..N-1], compares adjacent elements at indices i and i+1, and swaps them if A[i] &gt; A[i+1]. After each pass k, the k-th largest element is guaranteed to settle into its final position at index N-k. The algorithm terminates when a full pass executes with 0 swaps."
        </blockquote>
        <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono font-bold">
          <span className="bg-focusBg text-focusText border border-focusBorder px-3 py-1.5 rounded-xl">
            <GlossaryTerm term="Time Complexity" definition="Time Complexity = Total TIME kitna lagega. O(N²) ka matlab hai N items ke liye ~N × N operations (e.g. 10 items ➔ ~100 steps).">
              Time Complexity: O(N²)
            </GlossaryTerm>
          </span>
          <span className="bg-focusBg text-focusText border border-focusBorder px-3 py-1.5 rounded-xl">
            <GlossaryTerm term="Space Complexity" definition="Space Complexity = Extra MEMORY kitni lagegi. O(1) Auxiliary ka matlab ZERO extra memory! Nayi list nahi banani padti.">
              Space Complexity: O(1) Auxiliary
            </GlossaryTerm>
          </span>
          <span className="bg-focusBg text-focusText border border-focusBorder px-3 py-1.5 rounded-xl">
            <GlossaryTerm term="Stable & In-Place" definition="In-Place = Zero extra array memory. Stable = Same value waale items ka original sequence order hamesha intact rehta hai!">
              Property: Stable & In-Place
            </GlossaryTerm>
          </span>
        </div>

        {/* Beginner-Friendly "Ye Sab Hawabazi Hai" Encouragement Banner */}
        <div className="bg-focusBg border-2 border-focusBorder text-focusText p-4 sm:p-5 rounded-2xl space-y-1 shadow-xs mt-3">
          <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
            <span className="text-xl">😎</span>
            <span>TENSION MAT LO — YE SAB TEXTBOOK HAWABAZI HAI!</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold opacity-95 leading-relaxed">
            Agar computer science ke ye heavy jargon & formal terms pehli baar mein samajh nahi aaye, toh zero stress! 
            Ye sirf interviews ke liye textbook definition hai. Neeche hum poore Bubble Sort ko bilkul simple everyday Hinglish mein step-by-step master karenge! 🚀
          </p>
        </div>
      </div>

      {/* 1. Concept 1: List & Index Mechanics */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-xs">
            <CategoryIcon name="list" className="w-6 h-6 text-amber-500" />
          </div>
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

      {/* 2. Concept 2: Adjacent Comparison & Swapping */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center shadow-xs">
            <CategoryIcon name="swap" className="w-6 h-6 text-accent" />
          </div>
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

      {/* 3. Interactive Step-by-Step Visualizer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-extrabold text-main flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-xs">
              <CategoryIcon name="sparkles" className="w-6 h-6 text-amber-500" />
            </div>
            <span>3. Interactive Step-by-Step Visualizer (6 Unsorted Items)</span>
          </h2>
          <span className="text-xs font-mono bg-focusBg text-focusText border border-focusBorder px-2.5 py-1 rounded font-bold">
            Interactive Island
          </span>
        </div>

        {/* Dynamic Context Explanation Helper Card */}
        <div className="bg-bg border border-textSecondary/20 p-4 rounded-2xl text-xs sm:text-sm font-semibold text-textSecondary flex items-start gap-2 shadow-xs">
          <span className="text-base">💡</span>
          <span className="leading-relaxed">{activeContextExplanation}</span>
        </div>

        <BubbleSortVisualizer items={demoItems} title="Bubble Sort Step-by-Step Action" />
      </div>

      {/* 4. Concept 3: Pass Settlement & Termination */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center shadow-xs">
            <CategoryIcon name="target" className="w-6 h-6 text-rose-500" />
          </div>
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

      {/* 5. Asymptotic Time & Space Complexity */}
      <details className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm group cursor-pointer">
        <summary className="font-extrabold text-xl text-main flex items-center justify-between list-none">
          <span className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-2xl flex items-center justify-center shadow-xs">
              <CategoryIcon name="clock" className="w-6 h-6 text-sky-500" />
            </div>
            <span>5. Asymptotic Time & Space Complexity</span>
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
        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center shadow-xs">
          <CategoryIcon name="brain" className="w-8 h-8 text-purple-500" />
        </div>
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
            <CategoryIcon name="target" className="w-5 h-5 text-onAccent" />
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
