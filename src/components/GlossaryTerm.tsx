import React, { useState } from 'react';

export interface GlossaryTermProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

export const GLOSSARY_DICTIONARY: Record<string, string> = {
  array: 'Array = Computer waali line ya list, jisme saare items ek sequence mein baithte hain.',
  swap: 'Swap = Do items ki aapas mein position (jagah) badal dena.',
  pass: 'Pass = Shuru se end tak ek poori round trip jisme pairs check hote hain.',
  index: 'Index = List ke andar kisi item ka exact seat number (0 se shuru hota hai).',
  algorithm: 'Algorithm = Kisi problem ko solve karne ke simple step-by-step rules.',
};

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  term,
  definition,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const key = term.toLowerCase();
  const def = definition || GLOSSARY_DICTIONARY[key] || 'Technical CS term';

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="underline decoration-accent2 decoration-2 underline-offset-4 font-bold text-accent cursor-pointer hover:bg-focusBg/50 px-1 rounded transition-colors"
      >
        {children || term} 📖
      </button>

      {isOpen && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-card border border-focusBorder text-main rounded-xl shadow-lg text-xs z-50 animate-fadeIn pointer-events-none block">
          <span className="font-bold text-accent block mb-1">
            📚 Glossary: {term}
          </span>
          <span className="text-textSecondary leading-relaxed block">{def}</span>
          <span className="w-2.5 h-2.5 bg-card border-b border-r border-focusBorder rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 block"></span>
        </span>
      )}
    </span>
  );
};

export default GlossaryTerm;
