import React, { useState } from 'react';
import { playAudioSFX } from './BubbleSortVisualizer';

interface QuestionItem {
  id: number;
  concept: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const MASTER_QUIZ_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    concept: 'Array Indexing',
    question: 'Computer mein array/list ka sabse pehle element kis position (index) se shuru hota hai?',
    options: ['1 (pehle se shuru)', '0 (Zero-based index)', '10 (random position)'],
    correctIndex: 1,
    explanation: 'Array indices hamesha zero [0] se shuru hote hain.',
  },
  {
    id: 2,
    concept: 'Adjacent Pair Comparison',
    question: 'Bubble sort ek step mein kitne elements ko aapas mein compare karta hai?',
    options: ['Poore array ko ek sath', 'Sirf 2 adjacent (bagal waale) items ko', '3 random items ko'],
    correctIndex: 1,
    explanation: 'Bubble sort ek baar mein sirf 2 adjacent elements ko dekhta hai.',
  },
  {
    id: 3,
    concept: 'Swapping Rule',
    question: 'Bubble sort mein elements ki position (swap) kab badli jaati hai?',
    options: [
      'Jab pehla element doosre se chhota ho',
      'Jab pehla element doosre se BADA ho (Left > Right)',
      'Hamesha har step par random swap hota hai',
    ],
    correctIndex: 1,
    explanation: 'Bada element aage bhejne ke liye swap Tabhi hota hai jab Left > Right.',
  },
  {
    id: 4,
    concept: 'Pass Outcome',
    question: 'Ek poora Pass (shuru se end tak) complete hone par kya guarantee hoti hai?',
    options: [
      'Poora array pehle pass mein hi sort ho jata hai',
      'Sabse BADA element array ke end mein settle ho jata hai',
      'Kuch nahi badalta, waise hi rehta hai',
    ],
    correctIndex: 1,
    explanation: 'Floating bubble ki tarah largest element end par settle ho jata hai.',
  },
  {
    id: 5,
    concept: 'Termination Condition',
    question: 'Bubble sort algorithm kab finalized stop hoti hai?',
    options: [
      'Fixed 10 passes ke baad',
      'Jab ek poore pass mein 0 swaps (no swaps) hon',
      'Jab browser close kar do',
    ],
    correctIndex: 1,
    explanation: 'Jab 0 swaps hote hain pass mein, matlab array 100% sorted hai.',
  },
  {
    id: 6,
    concept: 'Time Complexity',
    question: 'Worst-case scenario mein Bubble Sort ki Time Complexity kya hoti hai?',
    options: ['O(1) - Instant', 'O(N) - Linear', 'O(N²) - Quadratic (N × N operations)'],
    correctIndex: 2,
    explanation: 'Reversed list ke liye (N × N) comparisons ki zaroorat hoti hai, so O(N²).',
  },
];

export const RecapQuiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (submitted) return;
    playAudioSFX('click', true);
    setUserAnswers({ ...userAnswers, [qId]: optIndex });
  };

  const handleSubmitQuiz = () => {
    playAudioSFX('party', true);
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    MASTER_QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const allAnswered = Object.keys(userAnswers).length === MASTER_QUIZ_QUESTIONS.length;
  const finalScore = calculateScore();

  return (
    <div className="space-y-8">
      {/* Questions Stack with Hover Lift Effects */}
      <div className="space-y-6">
        {MASTER_QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-card border border-textSecondary/20 rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-bg border border-textSecondary/20 px-3 py-1 rounded-lg text-textSecondary font-extrabold">
                  Q{idx + 1}. {q.concept}
                </span>
                {submitted && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${isCorrect ? 'bg-focusBg text-focusText border border-focusBorder' : 'bg-accent/15 text-accent border border-accent'}`}>
                    {isCorrect ? '✓ Correct' : '✕ Wrong'}
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-base sm:text-xl text-main leading-relaxed">
                {q.question}
              </h3>

              <div className="space-y-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    'border-textSecondary/30 bg-bg text-main hover:border-accent hover:bg-accent/5 hover:-translate-y-0.5';

                  if (selected === optIdx) {
                    btnStyle =
                      'bg-accent/15 border-accent text-accent font-extrabold ring-2 ring-accent scale-[1.01]';
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        'bg-focusBg border-focusBorder text-focusText font-extrabold ring-2 ring-focusBorder';
                    } else if (selected === optIdx && !isCorrect) {
                      btnStyle =
                        'bg-accent/20 border-accent text-accent line-through opacity-80';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full p-4 rounded-2xl border text-sm sm:text-base text-left transition-all duration-200 font-semibold flex items-center justify-between shadow-xs ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selected === optIdx && !submitted && (
                        <span className="text-accent font-black">●</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border transition-all ${isCorrect
                      ? 'bg-focusBg/90 border-focusBorder text-focusText'
                      : 'bg-accent/15 border-accent text-main'
                    }`}
                >
                  {isCorrect ? (
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm sm:text-base text-focusText flex items-center gap-1.5">
                        <span>🎯</span>
                        <span>Bingo! Bilkul Sahi Jawab!</span>
                      </div>
                      <p className="opacity-95 leading-relaxed font-semibold">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="font-extrabold text-sm sm:text-base text-accent flex items-center gap-1.5">
                        <span>❌</span>
                        <span>Galat Jawab!</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-main">
                        Sahi uttar tha: <strong className="text-accent font-mono underline">{q.options[q.correctIndex]}</strong>
                      </p>
                      <p className="text-xs sm:text-sm text-textSecondary leading-relaxed pt-0.5">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Result Box with Vector SVG Icons */}
      <div className="bg-card border-2 border-accent/40 rounded-3xl p-6 sm:p-10 text-center space-y-5 shadow-md hover:shadow-2xl hover:border-accent transition-all duration-300">
        {!submitted ? (
          <div>
            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={!allAnswered}
              className="btn-primary px-10 py-4.5 rounded-2xl font-black text-xl shadow-chalk hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Submit Master Quiz Answers 🚀
            </button>
            {!allAnswered && (
              <p className="text-xs text-textSecondary font-bold mt-3">
                Pehle saare 6 questions ke options select kar lo! ({Object.keys(userAnswers).length}/6 answered)
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-5 animate-fadeIn">
            <div className="inline-block bg-focusBg border-2 border-focusBorder text-focusText text-sm sm:text-base font-black px-5 py-2 rounded-full uppercase tracking-wider shadow-sm animate-bounce">
              Master Quiz Completed! 🏆
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-main tracking-tight">
              Tumhara Score: <span className="text-accent font-mono">{finalScore}/6</span>
            </h3>

            <p className="text-lg font-bold text-textSecondary max-w-md mx-auto leading-relaxed">
              {finalScore === 6
                ? 'BUBBLE SORT MASTER! 100% Perfect Score! Saare concepts crystal clear hain!'
                : finalScore >= 4
                  ? 'SHABASH! Zabarjast performance. Bas 1-2 minor points revision chahiye.'
                  : 'GOOD TRY! Koi tension nahi, concept guide dobara dekho aur retry karo.'}
            </p>

            <div className="pt-3 flex flex-wrap justify-center gap-4">
              {/* Retry Quiz Vector SVG Button */}
              <button
                type="button"
                onClick={() => {
                  playAudioSFX('click', true);
                  setSubmitted(false);
                  setUserAnswers({});
                }}
                className="px-6 py-3.5 rounded-2xl border-2 border-textSecondary/30 bg-bg text-main hover:border-accent hover:shadow-md text-base font-extrabold transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Retry Quiz</span>
              </button>

              {/* Get Completion Badge Vector SVG Button */}
              <a
                href="/complete"
                onClick={() => playAudioSFX('click', true)}
                className="btn-primary px-8 py-3.5 rounded-2xl font-black text-base shadow-chalk hover:scale-105 transition-transform flex items-center justify-center gap-2.5"
              >
                <span>Get Completion Badge</span>
                <svg className="w-5 h-5 fill-current text-onAccent" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H8v2h8v-2h-3v-2.1c2.12-.41 3.76-2.07 4.39-4.24C19.08 11.35 21 9.27 21 6.7V5c0-1.1-.9-2-2-2zM5 7.7V7h2v3.1c-1.15-.36-2-1.43-2-2.4zm14 0c0 .97-.85 2.04-2 2.4V7h2v.7z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecapQuiz;
