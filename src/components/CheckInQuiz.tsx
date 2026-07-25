import React, { useState } from 'react';

export interface CheckInQuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  onCorrect?: () => void;
}

export const CheckInQuiz: React.FC<CheckInQuizProps> = ({
  question,
  options,
  correctIndex,
  onCorrect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isCorrect = selectedIndex === correctIndex;

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    setIsSubmitted(true);
    if (idx === correctIndex && onCorrect) {
      onCorrect();
    }
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-card border border-textSecondary/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      {/* Quiz Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">🤔</span>
        <h4 className="font-bold text-lg text-main">Samajh Gaye? (Quick Check-in)</h4>
      </div>

      {/* Question Text */}
      <p className="text-sm font-semibold text-main leading-relaxed">
        {question}
      </p>

      {/* Options List */}
      <div className="space-y-2.5 pt-1">
        {options.map((opt, idx) => {
          let btnClass =
            'border-textSecondary/30 bg-bg text-main hover:border-accent2';

          if (isSubmitted) {
            if (idx === selectedIndex) {
              btnClass = isCorrect
                ? 'bg-focusBg border-focusBorder text-focusText font-bold ring-2 ring-focusBorder'
                : 'bg-accent/15 border-accent text-accent font-semibold';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted && isCorrect}
              className={`w-full p-3.5 rounded-xl border text-sm text-left transition-all flex items-center justify-between font-medium ${btnClass}`}
            >
              <span>{opt}</span>
              {isSubmitted && idx === selectedIndex && (
                <span className="text-base font-bold">
                  {isCorrect ? '✅' : '❌'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {isSubmitted && (
        <div className="pt-2">
          {isCorrect ? (
            <div className="p-3.5 rounded-xl bg-focusBg border border-focusBorder text-focusText text-xs sm:text-sm font-bold flex items-center justify-between animate-fadeIn">
              <span className="flex items-center gap-2">
                <span>🎉</span>
                <span>Waah sher! Bilkul sahi answer hai, concept crystal clear!</span>
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-accent/15 border border-accent text-accent text-xs sm:text-sm font-semibold flex items-center justify-between animate-shake">
              <span className="flex items-center gap-2">
                <span>😅</span>
                <span>Arre dost, thoda sa miss ho gaya! Koi tension nahi, dobara try karo.</span>
              </span>
              <button
                type="button"
                onClick={handleRetry}
                className="underline font-bold text-xs hover:opacity-80 ml-2"
              >
                Retry 🔄
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckInQuiz;
