import React from 'react';

interface BrainLogoMarkProps {
  className?: string;
  size?: number;
}

export const BrainLogoMark: React.FC<BrainLogoMarkProps> = ({
  className = '',
  size = 40,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,94,54,0.35)]"
      >
        <defs>
          <linearGradient id="brain-grad-component" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A57" />
            <stop offset="50%" stopColor="#E05338" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="glow-component" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          d="M 50 12 C 32 12 18 24 18 42 C 18 52 24 60 30 66 C 34 70 38 78 44 86 C 46 88 50 88 52 85 C 58 78 62 70 66 66 C 74 60 82 52 82 42 C 82 24 68 12 50 12 Z"
          stroke="url(#brain-grad-component)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 32 30 C 26 36 28 48 38 46 C 44 44 42 34 36 32 C 32 30 36 24 44 26 C 48 27 50 32 46 38"
          stroke="url(#brain-grad-component)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 30 54 C 36 50 44 54 42 64 C 40 70 48 74 52 68"
          stroke="url(#brain-grad-component)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        <line x1="64" y1="26" x2="56" y2="38" stroke="url(#brain-grad-component)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="64" y1="26" x2="74" y2="38" stroke="url(#brain-grad-component)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="56" y1="38" x2="50" y2="52" stroke="url(#brain-grad-component)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="56" y1="38" x2="60" y2="52" stroke="url(#brain-grad-component)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="74" y1="38" x2="70" y2="52" stroke="url(#brain-grad-component)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="74" y1="38" x2="80" y2="52" stroke="url(#brain-grad-component)" strokeWidth="3.5" strokeLinecap="round" />

        <rect x="60" y="22" width="8" height="8" rx="2" fill="#FF7A57" filter="url(#glow-component)" />
        <rect x="52" y="34" width="8" height="8" rx="2" fill="#E05338" />
        <rect x="70" y="34" width="8" height="8" rx="2" fill="#38BDF8" />
        <circle cx="50" cy="52" r="3.5" fill="#E05338" />
        <circle cx="60" cy="52" r="3.5" fill="#FF7A57" />
        <circle cx="70" cy="52" r="3.5" fill="#38BDF8" />
        <circle cx="80" cy="52" r="3.5" fill="#818CF8" />
      </svg>
    </div>
  );
};

export default BrainLogoMark;
