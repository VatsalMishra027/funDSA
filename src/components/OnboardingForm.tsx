import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  studentStore,
  setStudentName,
  setStudentInterests,
} from '../stores/student';

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
    setErrorMsg('');
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      if (selectedInterests.length >= 3) {
        setErrorMsg('Max 3 interests hi chun sakte ho, bro! 🛑');
        return;
      }
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    // Save to nanostore
    setStudentName(trimmedName);
    setStudentInterests(selectedInterests);

    // Route to intro module
    window.location.href = '/learn/intro';
  };

  const isSelectionValid = selectedInterests.length >= 2 && selectedInterests.length <= 3 && name.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Student Name Input */}
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
          No formal roll numbers! Bas wohi naam likho jisse dost bulate hain.
        </p>
      </div>

      {/* Interests Selection */}
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
          Hum inhi me se funny real-life analogies banayenge. Select exactly <strong>2 ya 3</strong> chips:
        </p>

        {/* Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {INTEREST_CHIPS.map((chip) => {
            const isSelected = selectedInterests.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => toggleInterest(chip.id)}
                className={`px-3 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  isSelected
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

      {/* Hinglish Error / Hint Banner */}
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

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!isSelectionValid}
          className="w-full btn-primary py-3.5 rounded-xl font-bold text-base shadow-chalk flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
        >
          <span>Aao Seekhein! 🚀</span>
        </button>
      </div>
    </form>
  );
};

export default OnboardingForm;
