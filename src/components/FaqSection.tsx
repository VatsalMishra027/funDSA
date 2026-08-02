import React, { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  icon: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'What is the best way to start learning DSA for beginners in 2026?',
    answer:
      'The best way to start learning DSA for beginners is to combine step-by-step visual animations with real-world analogies before jumping into complex LeetCode problems. Focus first on foundational data structures like Arrays and elementary sorting algorithms like Bubble Sort. Visualizing element comparisons and swaps builds long-term mental intuition.',
    category: 'Getting Started',
    icon: '🚀',
  },
  {
    question: 'Should I learn Java DSA for beginners or DSA for beginners in Python?',
    answer:
      'Both Java and Python are fantastic choices for learning DSA! Java is excellent for understanding strong typing, memory references, and enterprise technical interview standards. Python offers clean, pseudocode-like syntax for fast prototyping. Data Structures & Algorithms are language-agnostic logic patterns, so mastering visual intuition transfers seamlessly across Java, Python, C++, or JavaScript.',
    category: 'Languages',
    icon: '💻',
  },
  {
    question: 'How long does it take for a beginner to master Data Structures & Algorithms?',
    answer:
      'For beginners practicing 1 to 2 hours daily, core DSA concepts (Arrays, Sorting, Searching, Stacks, Queues, and Recursion) can be mastered in 4 to 8 weeks. Using interactive visualizers and hands-on playgrounds drastically reduces the learning curve compared to passive textbook reading.',
    category: 'Timeline',
    icon: '⏱️',
  },
  {
    question: 'What are the best resources to learn DSA for beginners?',
    answer:
      'The best resources combine interactive visual visualizers, step-by-step execution guides, personalized analogies, and practice playgrounds. Platforms like padhDSA provide an active learning environment where you can see elements move in real time with spatial audio feedback, making it far more effective than passive video playlists.',
    category: 'Resources',
    icon: '📚',
  },
  {
    question: 'Is advanced math required to learn DSA for beginners?',
    answer:
      'No, high-level advanced mathematics is not required! Basic arithmetic and logical reasoning are all you need to start. Concepts like Big-O time complexity and space complexity are best learned intuitively by counting step operations rather than solving complex equations.',
    category: 'Prerequisites',
    icon: '🧮',
  },
  {
    question: 'How do I get better at DSA for coding interviews?',
    answer:
      'To get better at DSA, follow a 4-step framework: 1) Visualize the algorithm step-by-step using interactive visualizers, 2) Connect abstract concepts to everyday analogies (like sorting cricket scores or food prices), 3) Test yourself with targeted check-in quizzes, and 4) Build custom test cases in an interactive playground.',
    category: 'Interviews',
    icon: '🎯',
  },
  {
    question: 'Why is Bubble Sort recommended as the first sorting algorithm for beginners?',
    answer:
      'Bubble Sort is ideal for beginners because it clearly demonstrates fundamental array mechanics: 0-based indexing, adjacent element comparison (Left > Right), element swapping, and multi-pass iteration in a straightforward, visual manner.',
    category: 'Algorithms',
    icon: '🧼',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto space-y-8 pt-16 border-t border-textSecondary/15 relative">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-accent2/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-focusBg/90 border border-focusBorder text-focusText text-xs font-mono font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
          <span>❓ FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-main">
          Everything You Need to Know About <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-accent via-[#FF7A57] to-accent2 bg-clip-text text-transparent font-handwritten text-4xl sm:text-6xl">
            DSA for Beginners
          </span>
        </h2>
        <p className="text-textSecondary text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Got questions about starting your Data Structures & Algorithms journey? Here are clear, expert answers to the most common beginner queries.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4 pt-4">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`group transition-all duration-300 rounded-3xl border ${
                isOpen
                  ? 'bg-card/90 backdrop-blur-xl border-accent/50 shadow-xl ring-1 ring-accent/20'
                  : 'bg-card/60 backdrop-blur-md border-textSecondary/20 hover:border-accent/30 shadow-sm hover:shadow-md'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-10 h-10 rounded-2xl bg-focusBg border border-focusBorder text-focusText flex items-center justify-center text-xl shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono font-extrabold text-accent uppercase tracking-wider block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold text-main leading-snug">
                      {item.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-accent text-onAccent border-accent rotate-180 shadow-sm'
                      : 'bg-bg text-textSecondary border-textSecondary/30 group-hover:border-accent group-hover:text-main'
                  }`}
                >
                  ↓
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-sm sm:text-base text-textSecondary leading-relaxed font-medium border-t border-textSecondary/10 mt-1 animate-fadeIn">
                  <p className="pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
