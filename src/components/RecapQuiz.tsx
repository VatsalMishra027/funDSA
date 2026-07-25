import React, { useState } from 'react';

interface QuestionItem {
  id: number;
  concept: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const RECAP_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    concept: 'List Basics',
    question: 'Computer mein array/list ka sabse pehle item ka seat number (index) kya hota hai?',
    options: ['1 (pehle se shuru)', '0 (zero-based index)', '10 (random)'],
    correctIndex: 1,
    explanation: 'Sahi! Array indices zero [0] se shuru hote hain.',
  },
  {
    id: 2,
    concept: 'Comparison',
    question: 'Bubble sort ek baar mein kitne elements ko dekhta/compare karta hai?',
    options: ['Saare elements ek sath', 'Sirf 2 adjacent (bagal waale) items', '3 items ek sath'],
    correctIndex: 1,
    explanation: 'Bilkul! Hamesha 2 adjacent elements compare hote hain.',
  },
  {
    id: 3,
    concept: 'Swapping',
    question: 'Bubble sort mein items ki positions Swap kab hoti hain?',
    options: [
      'Jab pehla element doosre se chhota ho',
      'Jab pehla element doosre se BADA ho',
      'Hamesha har step par random swap karte hain',
    ],
    correctIndex: 1,
    explanation: 'Awesome! Bada element aage bhejne ke liye swap karte hain.',
  },
  {
    id: 4,
    concept: 'One Pass',
    question: 'Ek full Pass complete hone par kya guarantee hoti hai?',
    options: [
      'Sabse BADA element array ke end par settle ho jata hai',
      'Poora array pehle pass mein hi sort ho jata hai',
      'Kuch nahi hota, waise hi rehta hai',
    ],
    correctIndex: 0,
    explanation: 'Spot on! Floating bubble ki tarah largest element end mein pahunch jata hai.',
  },
  {
    id: 5,
    concept: 'Repeat until Sorted',
    question: 'Bubble sort execution kab finalized stop hota hai?',
    options: [
      'Fixed 10 passes ke baad',
      'Jab ek full pass mein KOI swap na pade (0 swaps)',
      'Jab teacher class chhod kar chale jayein',
    ],
    correctIndex: 1,
    explanation: 'Bingo! Jab 0 swaps hote hain pass mein, matlab array 100% sorted hai.',
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
    RECAP_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const allAnswered = Object.keys(userAnswers).length === RECAP_QUESTIONS.length;
  const finalScore = calculateScore();

  return (
    <div className="space-y-8">
      {/* Questions Stack */}
      <div className="space-y-6">
        {RECAP_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isSelected = selected !== undefined;
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
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${isCorrect ? 'bg-focusBg text-focusText' : 'bg-accent/15 text-accent'}`}>
                    {isCorrect ? '✓ Correct' : '✕ Wrong'}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-main leading-relaxed">
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
                      className={`w-full p-3.5 rounded-xl border text-sm text-left transition-all font-medium flex items-center justify-between ${btnStyle}`}
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
                <p className="text-xs font-medium text-textSecondary pt-1">
                  💡 <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Result Box */}
      <div className="bg-card border border-textSecondary/20 rounded-2xl p-6 text-center space-y-4 shadow-md">
        {!submitted ? (
          <div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="btn-primary px-8 py-3.5 rounded-xl font-bold text-base shadow-chalk disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz Answers 🚀
            </button>
            {!allAnswered && (
              <p className="text-xs text-textSecondary mt-2">
                Pehle saare 5 questions ke options select kar lo!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="inline-block bg-focusBg border border-focusBorder text-focusText text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Quiz Completed! 🎯
            </div>

            <h3 className="text-3xl font-extrabold text-main">
              Tumhara Score: <span className="text-accent">{finalScore}/5</span>
            </h3>

            <p className="text-sm font-semibold text-textSecondary max-w-md mx-auto">
              {finalScore === 5
                ? '🏆 PRO BUBBLE SORT MASTER! Saare concepts crystal clear hain, koi rok nahi sakta!'
                : finalScore >= 3
                ? '🌟 SHABASH! Zabarjast performance. Bas thodi aur practice aur perfect ho jaoge.'
                : '👍 GOOD TRY! Koi tension nahi, dobara attempt karo ya modules revisit karo.'}
            </p>

            <div className="pt-2 flex justify-center gap-4">
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
