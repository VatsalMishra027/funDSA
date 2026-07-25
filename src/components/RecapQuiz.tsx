import React, { useState } from 'react';

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
    explanation: 'Sahi! Array indices hamesha zero [0] se shuru hote hain.',
  },
  {
    id: 2,
    concept: 'Adjacent Pair Comparison',
    question: 'Bubble sort ek step mein kitne elements ko aapas mein compare karta hai?',
    options: ['Poore array ko ek sath', 'Sirf 2 adjacent (bagal waale) items ko', '3 random items ko'],
    correctIndex: 1,
    explanation: 'Bilkul! Bubble sort ek baar mein sirf 2 adjacent elements ko dekhta hai.',
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
    explanation: 'Awesome! Bada element aage bhejne ke liye swap Tabhi hota hai jab Left > Right.',
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
    explanation: 'Spot on! Floating bubble ki tarah largest element end par settle ho jata hai.',
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
    explanation: 'Bingo! Jab 0 swaps hote hain pass mein, matlab array 100% sorted hai.',
  },
  {
    id: 6,
    concept: 'Time Complexity',
    question: 'Worst-case scenario mein Bubble Sort ki Time Complexity kya hoti hai?',
    options: ['O(1) - Instant', 'O(N) - Linear', 'O(N²) - Quadratic (N × N operations)'],
    correctIndex: 2,
    explanation: 'Great! Reversed list ke liye (N × N) comparisons ki zaroorat hoti hai, so O(N²).',
  },
];

export const RecapQuiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optIndex });
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
      {/* Questions Stack */}
      <div className="space-y-6">
        {MASTER_QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-card border border-textSecondary/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-bg border border-textSecondary/20 px-2.5 py-1 rounded text-textSecondary font-bold">
                  Q{idx + 1}. {q.concept}
                </span>
                {submitted && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded ${isCorrect ? 'bg-focusBg text-focusText' : 'bg-accent/15 text-accent'}`}>
                    {isCorrect ? '✓ Correct' : '✕ Wrong'}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base sm:text-lg text-main leading-relaxed">
                {q.question}
              </h3>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    'border-textSecondary/30 bg-bg text-main hover:border-accent2';

                  if (selected === optIdx) {
                    btnStyle =
                      'bg-accent/15 border-accent text-accent font-semibold ring-1 ring-accent';
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        'bg-focusBg border-focusBorder text-focusText font-bold ring-2 ring-focusBorder';
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
                      className={`w-full p-3.5 rounded-xl border text-sm sm:text-base text-left transition-all font-medium flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selected === optIdx && !submitted && (
                        <span className="text-accent font-bold">●</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <p className="text-xs sm:text-sm font-medium text-textSecondary pt-1">
                  💡 <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Result Box */}
      <div className="bg-card border border-textSecondary/20 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-md">
        {!submitted ? (
          <div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="btn-primary px-9 py-4 rounded-xl font-extrabold text-lg shadow-chalk disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Master Quiz Answers 🚀
            </button>
            {!allAnswered && (
              <p className="text-xs text-textSecondary font-semibold mt-2">
                Pehle saare 6 questions ke options select kar lo! ({Object.keys(userAnswers).length}/6 answered)
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="inline-block bg-focusBg border border-focusBorder text-focusText text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Master Quiz Completed! 🎯
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-main">
              Tumhara Score: <span className="text-accent">{finalScore}/6</span>
            </h3>

            <p className="text-base font-semibold text-textSecondary max-w-md mx-auto">
              {finalScore === 6
                ? '🏆 BUBBLE SORT MASTER! 100% Score! Saare concepts crystal clear hain!'
                : finalScore >= 4
                ? '🌟 SHABASH! Zabarjast performance. Bas 1-2 minor points revision chahiye.'
                : '👍 GOOD TRY! Koi tension nahi, concept guide dobara dekho aur retry karo.'}
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setUserAnswers({});
                }}
                className="px-5 py-2.5 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-semibold"
              >
                🔄 Retry Quiz
              </button>

              <a
                href="/complete"
                className="btn-primary px-7 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center gap-1.5"
              >
                <span>Get Completion Badge</span>
                <span>🏆</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecapQuiz;
