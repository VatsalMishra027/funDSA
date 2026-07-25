import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore, markModuleComplete } from '../stores/student';
import BubbleSortVisualizer from './BubbleSortVisualizer';
import CheckInQuiz from './CheckInQuiz';
import GlossaryTerm from './GlossaryTerm';

export interface ConceptModuleViewProps {
  concept: string;
  moduleTitle: string;
  moduleBadge: string;
  prevHref?: string;
  nextHref?: string;
}

interface AnalogyData {
  analogy_text: string;
  example_items: { label: string; value: number; icon?: string }[];
  focus_line: string;
  checkin_question: string;
  checkin_options: string[];
  checkin_correct_index: number;
}

export const ConceptModuleView: React.FC<ConceptModuleViewProps> = ({
  concept,
  moduleTitle,
  moduleBadge,
  prevHref,
  nextHref,
}) => {
  const profile = useStore(studentStore);
  const [data, setData] = useState<AnalogyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('/api/generate-analogy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        concept,
        interests: profile.interests,
        studentName: profile.name || 'Dost',
      }),
    })
      .then((res) => res.json())
      .then((resData: AnalogyData) => {
        if (isMounted) {
          setData(resData);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load analogy:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [concept, profile.interests, profile.name]);

  const handleQuizCorrect = () => {
    markModuleComplete(concept);
  };

  // Helper to render analogy text with glossary terms (array, swap, pass)
  const renderTextWithGlossary = (text: string) => {
    if (!text) return null;

    // Simple replacement helper for first mentions
    const words = text.split(' ');
    let arrayMentioned = false;
    let swapMentioned = false;
    let passMentioned = false;

    return words.map((word, index) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();

      if (cleanWord === 'array' && !arrayMentioned) {
        arrayMentioned = true;
        return (
          <React.Fragment key={index}>
            <GlossaryTerm term="array" definition="Array = Computer waali line ya list, jisme saare items ek sequence mein baithte hain.">
              {word}
            </GlossaryTerm>{' '}
          </React.Fragment>
        );
      }

      if (cleanWord === 'swap' && !swapMentioned) {
        swapMentioned = true;
        return (
          <React.Fragment key={index}>
            <GlossaryTerm term="swap" definition="Swap = Do items ki aapas mein position (jagah) badal dena.">
              {word}
            </GlossaryTerm>{' '}
          </React.Fragment>
        );
      }

      if (cleanWord === 'pass' && !passMentioned) {
        passMentioned = true;
        return (
          <React.Fragment key={index}>
            <GlossaryTerm term="pass" definition="Pass = Shuru se end tak ek poori round trip jisme pairs check hote hain.">
              {word}
            </GlossaryTerm>{' '}
          </React.Fragment>
        );
      }

      return word + ' ';
    });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-8 bg-textSecondary/20 rounded-xl w-1/3 mx-auto"></div>
        <div className="h-12 bg-textSecondary/20 rounded-xl w-3/4 mx-auto"></div>
        <div className="h-48 bg-card rounded-2xl border border-textSecondary/20"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-accent font-bold">Analogy load karne mein dikkat hui!</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary px-6 py-2.5 rounded-xl font-bold text-sm"
        >
          Refresh Karo 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3 text-center">
        <span className="bg-focusBg border border-focusBorder text-focusText text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          {moduleBadge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
          {moduleTitle}
        </h1>
        {profile.name && (
          <p className="text-xs text-textSecondary font-medium">
            Personalized for <strong>{profile.name}</strong> • Interests: {profile.interests.join(', ') || 'Everyday Life'}
          </p>
        )}
      </div>

      {/* 1. Short Story / Analogy Section */}
      <div className="bg-card border border-textSecondary/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <h3 className="font-bold text-lg text-main">Aao Samjhein (Simple Story)</h3>
        </div>
        <p className="text-base leading-relaxed text-main font-medium">
          {renderTextWithGlossary(data.analogy_text)}
        </p>
      </div>

      {/* 2. Visualizer Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-base text-main flex items-center gap-2">
            <span>⚡</span> Visual Action
          </h3>
          <span className="text-xs text-textSecondary font-mono">
            Interactive Visualizer
          </span>
        </div>
        <BubbleSortVisualizer
          items={data.example_items}
          title={`${moduleTitle} Step Visualizer`}
        />
      </div>

      {/* 3. Dhyan Do! Focus Callout */}
      <div className="dhyan-do-box p-5 rounded-2xl shadow-sm space-y-1">
        <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
          <span>💡</span>
          <span>DHYAN DO!</span>
        </div>
        <p className="text-sm font-semibold leading-relaxed">
          {data.focus_line}
        </p>
      </div>

      {/* 4. Samajh Gaye? Check-in Quiz */}
      <CheckInQuiz
        question={data.checkin_question}
        options={data.checkin_options}
        correctIndex={data.checkin_correct_index}
        onCorrect={handleQuizCorrect}
      />

      {/* 5. Navigation Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-textSecondary/20">
        {prevHref ? (
          <a
            href={prevHref}
            class="px-5 py-2.5 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-semibold transition-all"
          >
            ← Previous Concept
          </a>
        ) : (
          <div></div>
        )}

        {nextHref && (
          <a
            href={nextHref}
            class="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-1.5"
          >
            <span>Agla Module</span>
            <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ConceptModuleView;
