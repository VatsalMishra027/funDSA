import React, { useState } from 'react';
import BubbleSortVisualizer, { type VisualizerItem } from './BubbleSortVisualizer';

const PRESET_LISTS: { name: string; icon: string; items: VisualizerItem[] }[] = [
  {
    name: 'IPL High Scores',
    icon: '🏏',
    items: [
      { label: 'Kohli', value: 183, icon: '🏏' },
      { label: 'Rohit', value: 264, icon: '💥' },
      { label: 'Dhoni', value: 148, icon: '🧤' },
      { label: 'Gill', value: 91, icon: '⭐' },
      { label: 'Pant', value: 125, icon: '🔥' },
    ],
  },
  {
    name: 'School Canteen Bill (₹)',
    icon: '🥟',
    items: [
      { label: 'Samosa', value: 15, icon: '🥟' },
      { label: 'Maggi', value: 45, icon: '🍜' },
      { label: 'Chai', value: 10, icon: '☕' },
      { label: 'Pizza', value: 250, icon: '🍕' },
      { label: 'Roll', value: 80, icon: '🌯' },
    ],
  },
  {
    name: 'PUBG Squad Kills',
    icon: '🎮',
    items: [
      { label: 'Sniper', value: 14, icon: '🎯' },
      { label: 'Rusher', value: 22, icon: '⚡' },
      { label: 'Medic', value: 4, icon: '💊' },
      { label: 'Scout', value: 11, icon: '🔭' },
    ],
  },
];

export const PlaygroundBuilder: React.FC = () => {
  const [items, setItems] = useState<VisualizerItem[]>(PRESET_LISTS[0].items);
  const [newLabel, setNewLabel] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [newIcon, setNewIcon] = useState<string>('⭐');
  const [error, setError] = useState<string>('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (items.length >= 6) {
      setError('Max 6 items allowed in playground for clean display! 🛑');
      return;
    }

    const trimmedLabel = newLabel.trim();
    const numValue = Number(newValue);

    if (!trimmedLabel) {
      setError('Item ka naam toh daalo! (e.g. Samosa, Kohli) ✏️');
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
    if (items.length <= 3) {
      setError('Kam se kam 3 items hone chahiye sorting ke liye! ⚠️');
      return;
    }
    setError('');
    setItems(items.filter((_, idx) => idx !== index));
  };

  const loadPreset = (presetItems: VisualizerItem[]) => {
    setError('');
    setItems([...presetItems]);
  };

  return (
    <div className="space-y-8">
      {/* Controls Card */}
      <div className="bg-card border border-textSecondary/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-textSecondary/15 pb-4">
          <div>
            <h3 className="font-bold text-lg text-main">Build Your Own List (4-6 Items)</h3>
            <p className="text-xs text-textSecondary">
              Apne custom items add karo ya presets try karo. Watch them bubble sort live!
            </p>
          </div>
          <span className="text-xs font-mono bg-bg border border-textSecondary/20 px-3 py-1.5 rounded-lg text-textSecondary font-bold">
            {items.length}/6 Items
          </span>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider">
            ⚡ Quick Presets Load Karo:
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_LISTS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadPreset(preset.items)}
                className="px-3 py-1.5 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Items Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider">
            📋 Current List Items:
          </label>
          <div className="flex flex-wrap gap-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-bg border border-textSecondary/30 text-main text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xs"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className="text-accent font-mono">({item.value})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="text-textSecondary hover:text-accent font-bold ml-1"
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Item Label (e.g. Samosa)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-textSecondary/30 bg-bg text-main text-sm focus:outline-none focus:ring-2 focus:ring-accent2"
              />
            </div>

            <div>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Value (e.g. 45)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-textSecondary/30 bg-bg text-main text-sm focus:outline-none focus:ring-2 focus:ring-accent2 font-mono"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-textSecondary/30 bg-bg text-main text-sm focus:outline-none focus:ring-2 focus:ring-accent2"
              >
                <option value="⭐">⭐ Star</option>
                <option value="🥟">🥟 Samosa</option>
                <option value="🏏">🏏 Cricket</option>
                <option value="🎮">🎮 Gaming</option>
                <option value="🍕">🍕 Pizza</option>
                <option value="🔥">🔥 Fire</option>
              </select>

              <button
                type="submit"
                className="btn-primary flex-1 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-1"
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
        <h3 className="font-bold text-lg text-main flex items-center gap-2">
          <span>⚡</span> Sorting Playground Visualizer
        </h3>
        <BubbleSortVisualizer
          items={items}
          title="Custom Playground List"
        />
      </div>
    </div>
  );
};

export default PlaygroundBuilder;
