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

  const [selectedLang, setSelectedLang] = useState<'python' | 'js' | 'cpp' | 'java' | 'csharp'>('python');
  const [copied, setCopied] = useState<boolean>(false);

  const CODE_SNIPPETS = {
    python: `# 🐍 Python - Bubble Sort Implementation
def bubble_sort(arr):
    n = len(arr) # Step 1: Calculate array size 📏
    
    for i in range(n): # Step 2: Outer pass loop 🔄
        for j in range(n - 1 - i): # Step 3: Compare adjacent pairs 👥
            if arr[j] > arr[j + 1]: # Step 4: Check if left > right 🔀
                arr[j], arr[j + 1] = arr[j + 1], arr[j] # Step 5: Swap positions! ✨
                
    return arr # Step 6: Return sorted array 🏆

# Example execution
print(bubble_sort([250, 10, 80, 15]))`,

    js: `// ⚡ JavaScript / TypeScript - Bubble Sort Implementation
function bubbleSort(arr) {
  let n = arr.length; // Step 1: Calculate array length 📏
  
  for (let i = 0; i < n; i++) { // Step 2: Outer pass loop 🔄
    for (let j = 0; j < n - 1 - i; j++) { // Step 3: Compare adjacent pairs 👥
      if (arr[j] > arr[j + 1]) { // Step 4: Check if left > right 🔀
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Step 5: Swap elements! ✨
      }
    }
  }
  return arr; // Step 6: Return sorted array 🏆
}

console.log(bubbleSort([250, 10, 80, 15]));`,

    cpp: `// ⚡ C++ - Bubble Sort Implementation
#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size(); // Step 1: Get vector size 📏
    
    for (int i = 0; i < n; i++) { // Step 2: Outer pass loop 🔄
        for (int j = 0; j < n - 1 - i; j++) { // Step 3: Compare adjacent pairs 👥
            if (arr[j] > arr[j + 1]) { // Step 4: Check if left > right 🔀
                std::swap(arr[j], arr[j + 1]); // Step 5: Swap elements! ✨
            }
        }
    }
}`,

    java: `// ☕ Java - Bubble Sort Implementation
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length; // Step 1: Calculate array length 📏
        
        for (int i = 0; i < n; i++) { // Step 2: Outer pass loop 🔄
            for (int j = 0; j < n - 1 - i; j++) { // Step 3: Compare adjacent pairs 👥
                if (arr[j] > arr[j + 1]) { // Step 4: Check if left > right 🔀
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp; // Step 5: Swap elements! ✨
                }
            }
        }
    }
}`,

    csharp: `// 🔷 C# - Bubble Sort Implementation
class Program {
    static void BubbleSort(int[] arr) {
        int n = arr.Length; // Step 1: Calculate array length 📏
        
        for (int i = 0; i < n; i++) { // Step 2: Outer pass loop 🔄
            for (int j = 0; j < n - 1 - i; j++) { // Step 3: Compare adjacent pairs 👥
                if (arr[j] > arr[j + 1]) { // Step 4: Check if left > right 🔀
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]); // Step 5: Swap elements! ✨
                }
            }
        }
    }
}`
  };

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

  const handleCopyCode = () => {
    playAudioSFX('click', true);
    navigator.clipboard.writeText(CODE_SNIPPETS[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <div className="dhyan-do-box p-4 sm:p-5 rounded-2xl space-y-2">
          <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
            <span>💡</span>
            <span>GOLDEN RULE (Bohot Simple Hai!):</span>
          </div>
          <div className="text-base sm:text-lg font-semibold space-y-2 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">1.</span>
              <span><strong>Agar Pehla Item Bada Hai (Left &gt; Right):</strong> Dono ki jagah aapas mein SWAP kar do! 🔀</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">2.</span>
              <span><strong>Agar Pehla Item Chhota Ya Barabar Hai:</strong> Bilkul mat chhedo, chupchap agle pair par aage badh jaao! ➡️</span>
            </div>
          </div>
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

      {/* 6. Module 6: Simple & Light Bubble Sort Code Implementations */}
      <div className="bg-card border-2 border-accent/30 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-textSecondary/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-xs">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-main">6. Module 6: Code Implementation</h2>
              <p className="text-xs sm:text-sm text-textSecondary font-medium">
                Clean, production-ready code snippets with line-by-line step explanations!
              </p>
            </div>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-bg border border-textSecondary/30 p-1.5 rounded-2xl">
            {[
              { id: 'python', label: 'Python 🐍' },
              { id: 'js', label: 'JS / TS ⚡' },
              { id: 'cpp', label: 'C++ ⚡' },
              { id: 'java', label: 'Java ☕' },
              { id: 'csharp', label: 'C# 🔷' },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  playAudioSFX('click', true);
                  setSelectedLang(lang.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedLang === lang.id
                    ? 'bg-accent text-onAccent shadow-sm scale-105'
                    : 'text-textSecondary hover:text-main hover:bg-card'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Beginner-Friendly Slang Motivation Banner */}
        <div className="bg-focusBg border-2 border-focusBorder text-focusText p-4 sm:p-5 rounded-2xl space-y-1 shadow-xs">
          <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
            <span className="text-xl">😎</span>
            <span>CODE DEKH KE TENSION MAT LO — BILKUL CHILL MAARO!</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold opacity-95 leading-relaxed">
            Agar pehli baar code dekh rahe ho toh tension lene ki zero zaroorat hai! Yeh site 100% beginner-friendly hai. Step-by-step logic samajh aagayi toh code likhna bilkul easy aur automatic ho jaayega — pure flex! 🚀
          </p>
        </div>

        {/* Crisp Light Code Container */}
        <div className="relative bg-[#fdfbf7] dark:bg-[#1c1917] text-main border-2 border-accent/25 rounded-2xl p-4 sm:p-6 shadow-sm font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          {/* Light Header Bar */}
          <div className="flex items-center justify-between border-b border-textSecondary/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-accent2 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-focusBorder inline-block"></span>
              <span className="text-xs text-textSecondary font-bold uppercase tracking-wider ml-1">
                {selectedLang}_simple_sort.code
              </span>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-xl border border-textSecondary/30 bg-bg hover:border-accent text-xs font-bold text-main shadow-xs transition-all flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <span className="text-accent">✓</span>
                  <span className="text-accent font-extrabold">Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="whitespace-pre overflow-x-auto font-mono text-main leading-relaxed">
            <code>{CODE_SNIPPETS[selectedLang]}</code>
          </pre>
        </div>
      </div>

      {/* Action Banner to Master Quiz */}
      <div className="bg-card border-2 border-focusBorder rounded-3xl p-8 text-center space-y-5 shadow-md">
        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center shadow-xs">
          <CategoryIcon name="brain" className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to test your understanding?</h3>
        <p className="text-base sm:text-lg text-textSecondary max-w-md mx-auto font-medium">
          Saare core concepts, formal definitions, aur multi-language code snippets review ho chuke hain. Now attempt the 6-Question Master Quiz!
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Quiz Button */}
          <a
            href="/quiz"
            onClick={() => playAudioSFX('click', true)}
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent via-[#E05338] to-accent2 text-onAccent px-8 sm:px-10 py-4.5 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-accent/25 border border-accent2/50 ring-1 ring-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 active:scale-98 transition-all duration-300 overflow-hidden"
          >
            {/* Light Shimmer Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

            <span className="tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Take Master Quiz</span>

            {/* Hyper-Crisp Target Vector Icon */}
            <span className="p-2 rounded-xl bg-white/20 border border-white/30 text-white shadow-sm group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
          </a>

          {/* Secondary Playground Button */}
          <a
            href="/playground"
            onClick={() => playAudioSFX('click', true)}
            className="group inline-flex items-center justify-center gap-3 bg-card border-2 border-textSecondary/30 hover:border-accent text-main px-7 py-4.5 rounded-2xl font-extrabold text-base sm:text-lg shadow-md hover:shadow-xl hover:scale-105 active:scale-98 transition-all duration-300"
          >
            {/* Vector Beaker Icon */}
            <span className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-onAccent transition-colors duration-300 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 3h15" />
                <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
                <path d="M6 14h12" />
              </svg>
            </span>

            <span>Try Playground</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLearningView;
