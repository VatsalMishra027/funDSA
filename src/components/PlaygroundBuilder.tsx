import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';
import BubbleSortVisualizer, { type VisualizerItem, playAudioSFX } from './BubbleSortVisualizer';

interface InterestPreset {
  interest: string;
  name: string;
  icon: string;
  criteriaExplanation: string;
  placeholderHint: string;
  items: VisualizerItem[];
}

const INTEREST_PRESETS: InterestPreset[] = [
  {
    interest: 'Food/Cooking',
    name: 'Food Menu Prices (₹)',
    icon: '🍕',
    criteriaExplanation: '🍕 Food Sorting Basis: Menu items unke Relative Price (in ₹) ke basis par cheapest se most expensive order mein sort hote hain.',
    placeholderHint: 'Item Label (e.g. Momos, Cold Drink)',
    items: [
      { label: 'Chai', value: 10, icon: '☕' },
      { label: 'Samosa', value: 15, icon: '🥟' },
      { label: 'Maggi', value: 45, icon: '🍜' },
      { label: 'Roll', value: 80, icon: '🌯' },
      { label: 'Burger', value: 120, icon: '🍔' },
      { label: 'Pizza', value: 250, icon: '🍕' },
    ],
  },
  {
    interest: 'Cricket',
    name: 'Cricket High Scores (Runs)',
    icon: '🏏',
    criteriaExplanation: '🏏 Cricket Sorting Basis: Batter stats unke Highest Match Score (Runs) ke basis par lowest se highest inning score order mein sort hote hain.',
    placeholderHint: 'Item Label (e.g. Bumrah, Kohli)',
    items: [
      { label: 'Bumrah', value: 16, icon: '⚡' },
      { label: 'Gill', value: 91, icon: '⭐' },
      { label: 'Pant', value: 125, icon: '🔥' },
      { label: 'Dhoni', value: 148, icon: '🧤' },
      { label: 'Kohli', value: 183, icon: '🏏' },
      { label: 'Rohit', value: 264, icon: '💥' },
    ],
  },
  {
    interest: 'Gaming',
    name: 'Gaming Player Stats (Kills)',
    icon: '🎮',
    criteriaExplanation: '🎮 Gaming Sorting Basis: Squad members unke Total Match Kills ke basis par lowest se highest MVP score order mein sort hote hain.',
    placeholderHint: 'Item Label (e.g. Medic, Sniper)',
    items: [
      { label: 'Medic', value: 4, icon: '💊' },
      { label: 'Scout', value: 11, icon: '🔭' },
      { label: 'Sniper', value: 14, icon: '🎯' },
      { label: 'Rusher', value: 22, icon: '⚡' },
      { label: 'Captain', value: 28, icon: '🎖️' },
      { label: 'Leader', value: 35, icon: '🏆' },
    ],
  },
  {
    interest: 'Bollywood/Movies',
    name: 'Box Office Hits (₹ Cr)',
    icon: '🎬',
    criteriaExplanation: '🎬 Movies Sorting Basis: Films unke Box Office Earnings (in ₹ Crores) ke basis par flop/cult se blockbuster hit order mein sort hoti hain.',
    placeholderHint: 'Item Label (e.g. Indie Film, Blockbuster)',
    items: [
      { label: 'Dissected', value: 18, icon: '🎟️' },
      { label: 'Flop', value: 30, icon: '🍅' },
      { label: 'Average', value: 65, icon: '🎥' },
      { label: 'Cult Classic', value: 74, icon: '🎬' },
      { label: 'Hit Film', value: 82, icon: '🍿' },
      { label: 'Blockbuster', value: 96, icon: '🏆' },
    ],
  },
  {
    interest: 'Music/Singing',
    name: 'Song Streams (Millions)',
    icon: '🎧',
    criteriaExplanation: '🎧 Music Sorting Basis: Tracks unke Streaming Plays (in Millions) ke basis par garage demo se global chartbuster order mein sort hote hain.',
    placeholderHint: 'Item Label (e.g. Demo Track, Chartbuster)',
    items: [
      { label: 'Garage Song', value: 8, icon: '🎸' },
      { label: 'Indie Track', value: 12, icon: '🎙️' },
      { label: 'Acoustic', value: 45, icon: '🎼' },
      { label: 'Rock Single', value: 95, icon: '📻' },
      { label: 'Pop Hit', value: 120, icon: '🎧' },
      { label: 'Viral Track', value: 340, icon: '🔥' },
    ],
  },
  {
    interest: 'Fitness',
    name: 'Gym Lifts (kg)',
    icon: '🏋️‍♂️',
    criteriaExplanation: '🏋️‍♂️ Fitness Sorting Basis: Workouts unke Lift Weight (in kg) ke basis par warmup set se personal record (PR max) order mein sort hote hain.',
    placeholderHint: 'Item Label (e.g. Dumbbell, Bench PR)',
    items: [
      { label: 'Warmup', value: 40, icon: '👟' },
      { label: 'Light Set', value: 50, icon: '🏋️‍♂️' },
      { label: 'Set 1', value: 65, icon: '👟' },
      { label: 'Heavy Set', value: 95, icon: '💪' },
      { label: 'PR Max', value: 110, icon: '⚡' },
      { label: 'Peak Lift', value: 125, icon: '🏆' },
    ],
  },
  {
    interest: 'Fashion',
    name: 'Sneaker & Fit Prices ($)',
    icon: '👗',
    criteriaExplanation: '👗 Fashion Sorting Basis: Outfits unke Retail Value (in $) ke basis par casual basics se grail sneaker order mein sort hote hain.',
    placeholderHint: 'Item Label (e.g. Socks, High Tops)',
    items: [
      { label: 'Socks', value: 15, icon: '🧦' },
      { label: 'Canvas', value: 50, icon: '👟' },
      { label: 'Streetwear', value: 120, icon: '👕' },
      { label: 'Vintage', value: 250, icon: '👗' },
      { label: 'High Tops', value: 320, icon: '🧢' },
      { label: 'Limited Ed', value: 500, icon: '💎' },
    ],
  },
  {
    interest: 'Travel',
    name: 'Flight Distances (km)',
    icon: '✈️',
    criteriaExplanation: '✈️ Travel Sorting Basis: Travel destinations ke Distance (in km) ke basis par nearby trip se overseas flight order mein sort kiya jata hai.',
    placeholderHint: 'Item Label (e.g. Short Hop, Overseas)',
    items: [
      { label: 'Taxi Ride', value: 85, icon: '🛵' },
      { label: 'Local Hop', value: 450, icon: '🚕' },
      { label: 'Domestic', value: 1200, icon: '✈️' },
      { label: 'Intercity', value: 1800, icon: '🚆' },
      { label: 'Island Trip', value: 2800, icon: '🏖️' },
      { label: 'Overseas', value: 7500, icon: '✈️' },
    ],
  },
];

export const PlaygroundBuilder: React.FC = () => {
  const profile = useStore(studentStore);
  const studentInterests = profile.interests || [];

  const userMatchedPresets = INTEREST_PRESETS.filter((p) =>
    studentInterests.includes(p.interest)
  );
  const displayPresets =
    userMatchedPresets.length > 0 ? userMatchedPresets : INTEREST_PRESETS.slice(0, 4);

  const [activePreset, setActivePreset] = useState<InterestPreset>(displayPresets[0]);
  const [items, setItems] = useState<VisualizerItem[]>(displayPresets[0].items);
  const [newLabel, setNewLabel] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [newIcon, setNewIcon] = useState<string>('⭐');
  const [error, setError] = useState<string>('');

  // Item Editing State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');
  const [editIcon, setEditIcon] = useState<string>('⭐');

  useEffect(() => {
    if (displayPresets.length > 0) {
      setActivePreset(displayPresets[0]);
      setItems(displayPresets[0].items);
    }
  }, [profile.interests]);

  const handleSelectPreset = (preset: InterestPreset) => {
    playAudioSFX('click', true);
    setError('');
    setEditingIndex(null);
    setActivePreset(preset);
    setItems([...preset.items]);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    playAudioSFX('click', true);
    setError('');

    if (items.length >= 6) {
      setError('Max 6 items allowed in playground for clean display! 🛑');
      return;
    }

    const trimmedLabel = newLabel.trim();
    const numValue = Number(newValue);

    if (!trimmedLabel) {
      setError(`Item ka naam toh daalo! (${activePreset.placeholderHint}) ✏️`);
      return;
    }

    if (isNaN(numValue) || newValue.trim() === '') {
      setError('Value ek valid number honi chahiye! (e.g. 50) 🔢');
      return;
    }

    const newItem: VisualizerItem = {
      id: `custom-${Date.now()}-${trimmedLabel}`,
      label: trimmedLabel,
      value: numValue,
      icon: newIcon || '⭐',
    };

    setItems([...items, newItem]);
    setNewLabel('');
    setNewValue('');
  };

  const handleRemoveItem = (index: number) => {
    playAudioSFX('click', true);
    if (items.length <= 3) {
      setError('Kam se kam 3 items hone chahiye sorting ke liye! ⚠️');
      return;
    }
    setError('');
    if (editingIndex === index) {
      setEditingIndex(null);
    }
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleStartEdit = (index: number) => {
    playAudioSFX('click', true);
    setEditingIndex(index);
    setEditLabel(items[index].label);
    setEditValue(String(items[index].value));
    setEditIcon(items[index].icon || '⭐');
    setError('');
  };

  const handleSaveEdit = (index: number) => {
    playAudioSFX('click', true);
    const trimmedLabel = editLabel.trim();
    const numValue = Number(editValue);

    if (!trimmedLabel) {
      setError('Item ka naam khali nahi reh sakta! ✏️');
      return;
    }

    if (isNaN(numValue) || editValue.trim() === '') {
      setError('Value ek valid number honi chahiye! 🔢');
      return;
    }

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      label: trimmedLabel,
      value: numValue,
      icon: editIcon,
    };

    setItems(updatedItems);
    setEditingIndex(null);
    setError('');
  };

  const handleCancelEdit = () => {
    playAudioSFX('click', true);
    setEditingIndex(null);
    setError('');
  };

  return (
    <div className="space-y-8">
      {/* Controls Card with Hover Glow Effects */}
      <div className="bg-card border border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-textSecondary/15 pb-4">
          <div>
            <h3 className="font-extrabold text-xl text-main">Build Your Custom List</h3>
            <p className="text-sm text-textSecondary font-medium">
              {profile.name ? `${profile.name}'s Onboarding Interests matched below!` : 'Pick from your selected interests or create & edit custom items:'}
            </p>
          </div>
          <span className="text-xs font-mono bg-bg border border-textSecondary/20 px-3 py-1.5 rounded-lg text-textSecondary font-bold">
            {items.length}/6 Items
          </span>
        </div>

        {/* Selected Hobbies & Interests Presets Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold text-accent uppercase tracking-wider">
              🎯 Your Selected Interest Options:
            </label>
            {studentInterests.length > 0 && (
              <span className="text-xs font-mono text-textSecondary font-semibold">
                Matched: {studentInterests.join(', ')}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {displayPresets.map((preset, idx) => {
              const isActive = activePreset.interest === preset.interest;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all duration-200 shadow-xs ${
                    isActive
                      ? 'bg-accent text-onAccent border-accent shadow-md scale-105 ring-2 ring-accent/40'
                      : 'bg-bg text-main border-textSecondary/30 hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5'
                  }`}
                >
                  <span className="text-base">{preset.icon}</span>
                  <span>{preset.name}</span>
                  <span className="text-[10px] font-mono bg-focusBg text-focusText border border-focusBorder px-1.5 py-0.5 rounded font-bold">
                    {preset.interest}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hobby Sorting Criteria Explanation Box */}
          <div className="dhyan-do-box p-4 sm:p-5 rounded-2xl space-y-1 mt-3 animate-fadeIn">
            <div className="font-extrabold text-xs sm:text-sm flex items-center gap-2">
              <span>💡</span>
              <span>HOW SORTING WORKS:</span>
            </div>
            <p className="text-sm sm:text-base font-semibold leading-relaxed">
              {activePreset.criteriaExplanation}
            </p>
          </div>
        </div>

        {/* Current Items Pills with Inline Edit Support */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-textSecondary uppercase tracking-wider">
            📋 Current Active Items in Visualizer (Click ✏️ to Edit):
          </label>
          <div className="flex flex-wrap gap-2.5">
            {items.map((item, idx) => {
              const isEditing = editingIndex === idx;

              if (isEditing) {
                return (
                  <div
                    key={idx}
                    className="bg-focusBg border-2 border-focusBorder text-main text-xs sm:text-sm font-bold p-2.5 rounded-2xl flex items-center gap-2 shadow-md animate-fadeIn"
                  >
                    <select
                      value={editIcon}
                      onChange={(e) => setEditIcon(e.target.value)}
                      className="bg-bg border border-textSecondary/30 rounded-lg p-1 text-xs focus:outline-none"
                    >
                      <option value="⭐">⭐</option>
                      <option value="🍕">🍕</option>
                      <option value="🥟">🥟</option>
                      <option value="🏏">🏏</option>
                      <option value="🎮">🎮</option>
                      <option value="🔥">🔥</option>
                      <option value="🎧">🎧</option>
                      <option value="✈️">✈️</option>
                    </select>

                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      placeholder="Name"
                      className="w-24 px-2 py-1 bg-bg border border-textSecondary/30 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent"
                    />

                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="Value"
                      className="w-16 px-2 py-1 bg-bg border border-textSecondary/30 rounded-lg text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-accent"
                    />

                    <button
                      type="button"
                      onClick={() => handleSaveEdit(idx)}
                      className="bg-accent text-onAccent px-2.5 py-1 rounded-lg text-xs font-black shadow-xs hover:scale-105 transition-transform"
                      title="Save Changes"
                    >
                      ✓ Save
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-bg border border-textSecondary/30 text-textSecondary px-2 py-1 rounded-lg text-xs font-bold hover:text-main"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="bg-bg border border-textSecondary/30 text-main text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs hover:border-accent transition-all group"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="text-accent font-mono">({item.value})</span>

                  <div className="flex items-center gap-1 ml-1 border-l border-textSecondary/20 pl-1.5">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(idx)}
                      className="text-textSecondary hover:text-accent font-bold text-xs p-1 rounded hover:bg-accent/10 transition-colors"
                      title="Edit Item"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-textSecondary hover:text-rose-500 font-bold text-xs p-1 rounded hover:bg-rose-500/10 transition-colors"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Item Form with Hobby-Specific Dynamic Placeholder */}
        <form onSubmit={handleAddItem} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder={activePreset.placeholderHint}
                className="w-full px-4 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent2 placeholder:text-textSecondary/60"
              />
            </div>

            <div>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Value (e.g. 45)"
                className="w-full px-4 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-accent2"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="px-3 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent2"
              >
                <option value="⭐">⭐ Star</option>
                <option value="🥟">🥟 Food</option>
                <option value="🏏">🏏 Cricket</option>
                <option value="🎮">🎮 Gaming</option>
                <option value="🍕">🍕 Pizza</option>
                <option value="🔥">🔥 Fire</option>
                <option value="🎧">🎧 Music</option>
                <option value="✈️">✈️ Travel</option>
              </select>

              <button
                type="submit"
                className="btn-primary flex-1 py-3 rounded-xl font-extrabold text-sm shadow-sm hover:-translate-y-0.5 flex items-center justify-center gap-1 transition-all"
              >
                <span>+ Add Item</span>
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-accent font-semibold flex items-center gap-1">
              <span>⚠️</span>
              <span>{error}</span>
            </p>
          )}
        </form>
      </div>

      {/* Live Interactive Visualizer Instance */}
      <div className="space-y-2">
        <h3 className="font-extrabold text-xl text-main flex items-center gap-2">
          <span>⚡</span> Live Sorting Visualizer ({activePreset.name})
        </h3>
        <BubbleSortVisualizer items={items} title={`Playground: ${activePreset.name}`} />
      </div>
    </div>
  );
};

export default PlaygroundBuilder;
