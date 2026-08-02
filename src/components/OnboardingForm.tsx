import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  studentStore,
  setStudentName,
  setStudentInterests,
} from '../stores/student';
import { playAudioSFX } from './BubbleSortVisualizer';

const INTEREST_CHIPS = [
  { id: 'Food', label: 'Food', icon: '🥟' },
  { id: 'Music/Singing', label: 'Music/Singing', icon: '🎧' },
  { id: 'Cricket', label: 'Cricket', icon: '🏏' },
  { id: 'Bollywood/Movies', label: 'Bollywood/Movies', icon: '🎬' },
  { id: 'Gaming', label: 'Gaming', icon: '🎮' },
  { id: 'Fitness', label: 'Fitness', icon: '🏋️‍♂️' },
  { id: 'Fashion', label: 'Fashion', icon: '👗' },
  { id: 'Travel', label: 'Travel', icon: '✈️' },
];

export const OnboardingForm: React.FC = () => {
  const profile = useStore(studentStore);
  const [name, setName] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (profile.name) setName(profile.name);
    if (profile.interests && profile.interests.length > 0) {
      setSelectedInterests(profile.interests);
    }
  }, [profile]);

  const toggleInterest = (id: string) => {
    playAudioSFX('click', true);
    setErrorMsg('');
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      if (selectedInterests.length >= 3) {
        setErrorMsg('Max 3 interests hi chun sakte ho! 🛑');
        return;
      }
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playAudioSFX('click', true);
    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMsg('Arre naam toh batate jao! (Type your name) ✏️');
      return;
    }

    if (selectedInterests.length < 2) {
      setErrorMsg('Kam se kam 2 interests chunna zaroori hai! 🎯');
      return;
    }

    if (selectedInterests.length > 3) {
      setErrorMsg('Maximum 3 interests allowed hain! 🛑');
      return;
    }

    setStudentName(trimmedName);
    setStudentInterests(selectedInterests);

    window.location.href = '/learn';
  };

  const isSelectionValid = selectedInterests.length >= 2 && selectedInterests.length <= 3 && name.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="student-name" className="block text-sm font-bold text-main">
          Tumhara Naam Kya Hai? <span className="text-accent">*</span>
        </label>
        <input
          id="student-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errorMsg) setErrorMsg('');
          }}
          placeholder="e.g. Rahul, Ananya, Yash..."
          className="w-full px-4 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main focus:outline-none focus:ring-2 focus:ring-accent2/80 font-medium text-base placeholder:text-textSecondary/60 transition-all"
        />
        <p className="text-xs text-textSecondary">
          Bas wohi naam likho jisse dost bulate hain!
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-main">
            Tumhare Top 2 ya 3 Hobbies Kya Hain? <span className="text-accent">*</span>
          </label>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-bg border border-textSecondary/20 text-textSecondary font-semibold">
            {selectedInterests.length}/3 Selected
          </span>
        </div>

        <p className="text-xs text-textSecondary leading-relaxed">
          Select <strong>2 ya 3</strong> chips to customize your learning guide:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {INTEREST_CHIPS.map((chip) => {
            const isSelected = selectedInterests.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => toggleInterest(chip.id)}
                className={`px-3 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${isSelected
                  ? 'bg-accent text-onAccent border-accent shadow-sm scale-[1.02]'
                  : 'bg-bg text-main border-textSecondary/30 hover:border-accent2/80'
                  }`}
              >
                <span>{chip.icon}</span>
                <span className="truncate">{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-accent/15 border border-accent text-accent text-xs font-semibold flex items-center gap-2 animate-shake">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {!errorMsg && selectedInterests.length > 0 && selectedInterests.length < 2 && (
        <div className="p-3 rounded-xl bg-focusBg border border-focusBorder text-focusText text-xs font-medium">
          💡 Ek aur interest chun lo! (Minimum 2 required)
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={!isSelectionValid}
          className="group relative w-full inline-flex items-center justify-center gap-3.5 bg-gradient-to-r from-accent via-[#E05338] to-accent2 text-onAccent px-8 py-4.5 rounded-2xl font-black text-xl shadow-xl shadow-accent/25 border border-accent2/50 ring-1 ring-white/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/40 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none transition-all duration-300 overflow-hidden"
        >
          {/* Light Shimmer Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

          <span className="tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Start Learning</span>

          {/* Hyper-Crisp Official Vector Rocket Launch Icon */}
          <span className="p-2 rounded-xl bg-white/20 border border-white/30 text-white shadow-sm group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default OnboardingForm;
