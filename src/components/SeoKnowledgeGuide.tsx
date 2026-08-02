import React, { useState } from 'react';

const LANGUAGE_SNIPPETS = {
  java: {
    lang: 'Java',
    icon: '☕',
    title: 'Java DSA for Beginners',
    desc: 'Strong typing, memory references, & Enterprise CS interview standard.',
    code: `// Java Bubble Sort Pass
public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  },
  python: {
    lang: 'Python',
    icon: '🐍',
    title: 'DSA for Beginners in Python',
    desc: 'Clean pseudocode-like syntax, fast prototyping, & beginner readability.',
    code: `# Python Bubble Sort Pass
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                # Tuple swap logic
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
  },
  cpp: {
    lang: 'C++',
    icon: '⚡',
    title: 'C++ DSA for Beginners',
    desc: 'Low-level pointer arithmetic, manual memory, & competitive speed.',
    code: `// C++ Bubble Sort Pass
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },
};

export const SeoKnowledgeGuide: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'java' | 'python' | 'cpp'>('java');

  return (
    <section className="max-w-4xl mx-auto space-y-12 pt-16 border-t border-textSecondary/15 relative">
      {/* Decorative Subtle Glowing Background Blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Main Glassmorphic Hero Title Header */}
      <div className="relative bg-card/60 backdrop-blur-xl border border-accent/25 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2.5 bg-focusBg/90 border border-focusBorder text-focusText text-xs font-mono font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span>Complete 2026 Developer Guide • Data Structures & Algorithms</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-main">
          Master Data Structures & Algorithms: The Ultimate Guide to{' '}
          <span className="bg-gradient-to-r from-accent via-[#FF7A57] to-accent2 bg-clip-text text-transparent font-handwritten text-4xl sm:text-6xl">
            DSA for Beginners
          </span>
        </h2>

        <p className="text-textSecondary text-base sm:text-xl leading-relaxed font-medium max-w-3xl">
          If you are wondering <strong>how to start learning dsa for beginners</strong> without feeling overwhelmed by complex mathematical formulas and dry textbook descriptions, you have arrived at the right place. Data Structures and Algorithms (DSA) form the core backbone of modern computer science, technical interviews, and software engineering. However, traditional lectures often fail beginners because they focus on abstract theory rather than visual intuition.
        </p>
      </div>

      {/* Dual Modern Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div className="group relative bg-card/70 backdrop-blur-md border border-textSecondary/20 hover:border-accent/50 p-7 sm:p-9 rounded-3xl space-y-4 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
            🚀
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-main tracking-tight">
            How to Start DSA for Beginners in 2026
          </h3>
          <p className="text-sm sm:text-base text-textSecondary leading-relaxed font-medium">
            Understanding <strong>how to start dsa for beginners</strong> begins with picking the right fundamental concepts. Rather than trying to solve 500+ LeetCode problems immediately, start by mastering elementary building blocks like Arrays, Lists, and basic sorting algorithms (such as Bubble Sort, Selection Sort, and Insertion Sort). Developing visual mental models for index positions, comparisons, and element swaps builds the foundational logic necessary to tackle advanced topics like dynamic programming and graph theory later on.
          </p>
        </div>

        <div className="group relative bg-card/70 backdrop-blur-md border border-textSecondary/20 hover:border-accent2/50 p-7 sm:p-9 rounded-3xl space-y-4 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-accent2/15 border border-accent2/30 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
            🧠
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-main tracking-tight">
            The Best Way to Learn DSA for Beginners: Visual Intuition
          </h3>
          <p className="text-sm sm:text-base text-textSecondary leading-relaxed font-medium">
            What is the <strong>best way to learn dsa for beginners</strong>? Experience shows that interactive step-by-step visual animation outperforms plain code reading every time. When you can physically see how array elements shift during a swap operation or hear real-time spatial audio cues for comparison passes, the logic locks into long-term memory. Combine visual visualizers with real-world everyday analogies—such as sorting cricket scores, food prices, or gaming levels—to transform abstract CS theory into effortless understanding.
          </p>
        </div>
      </div>

      {/* 4-Step Interactive Roadmap Timeline */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-extrabold text-accent uppercase tracking-wider">
            Step-By-Step Success Plan
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-main tracking-tight">
            How to Get Better at DSA for Beginners & Crack Technical Coding Interviews
          </h3>
          <p className="text-base sm:text-lg text-textSecondary max-w-2xl mx-auto font-medium">
            If you want to know <strong>how to get better at dsa for beginners</strong>, consistency and active practice are essential. Follow this 4-step roadmap:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-card/70 border border-textSecondary/20 hover:border-accent/40 p-6 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-[#E05338] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-main">Visualize First</h4>
              <p className="text-sm text-textSecondary leading-relaxed font-medium">
                Use step-by-step visual animation engines to understand array comparisons, pointer movements, and swap operations visually.
              </p>
            </div>
          </div>

          <div className="bg-card/70 border border-textSecondary/20 hover:border-accent/40 p-6 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-[#E05338] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-main">Relate with Everyday Analogies</h4>
              <p className="text-sm text-textSecondary leading-relaxed font-medium">
                Connect abstract algorithms with real-life contexts like food prices, movie ratings, or sports leaderboards.
              </p>
            </div>
          </div>

          <div className="bg-card/70 border border-textSecondary/20 hover:border-accent/40 p-6 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-[#E05338] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-main">Test with Interactive Quizzes</h4>
              <p className="text-sm text-textSecondary leading-relaxed font-medium">
                Attempt targeted check-in quizzes to validate your understanding of Big-O time and space complexity.
              </p>
            </div>
          </div>

          <div className="bg-card/70 border border-textSecondary/20 hover:border-accent/40 p-6 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-[#E05338] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              4
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-main">Build in the Interactive Playground</h4>
              <p className="text-sm text-textSecondary leading-relaxed font-medium">
                Create custom array inputs, adjust execution speed, and observe algorithm state changes in real time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Banner: Why padhDSA Belongs in the Best Resources */}
      <div className="relative bg-gradient-to-br from-focusBg via-card to-focusBg border-2 border-focusBorder text-focusText p-8 sm:p-12 rounded-3xl space-y-4 shadow-xl overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <span className="text-3xl">🌟</span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Why padhDSA Belongs in the Best Resources to Learn DSA for Beginners 2026
          </h3>
        </div>

        <p className="text-sm sm:text-base font-semibold leading-relaxed opacity-95">
          When exploring the <strong>best resources to learn dsa for beginners</strong> or looking for the <strong>best youtube channel to learn dsa for beginners</strong>, learners often get trapped watching hours of passive video playlists without getting real hands-on practice. <strong>padhDSA</strong> fixes this by providing an all-in-one interactive platform where visual animation, audio feedback, personalized interest-based analogies, and self-assessment quizzes come together. Whether you are learning <strong>how to learn dsa for beginners</strong> from scratch or refreshing your core computer science foundations in 2026, padhDSA gives you the clearest, fastest path to mastery!
        </p>

        <div className="pt-2">
          <a
            href="/onboarding"
            className="inline-flex items-center gap-2.5 bg-focusBorder text-focusText font-black px-7 py-3.5 rounded-2xl text-base shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Start Interactive Learning Now</span>
            <span>➔</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SeoKnowledgeGuide;
