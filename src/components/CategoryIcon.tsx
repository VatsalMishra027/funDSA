import React from 'react';

export type IconType =
  | 'cricket'
  | 'food'
  | 'gaming'
  | 'movies'
  | 'music'
  | 'fitness'
  | 'fashion'
  | 'travel'
  | 'trophy'
  | 'lightbulb'
  | 'search'
  | 'list'
  | 'clock'
  | 'sparkles'
  | 'swap'
  | 'quiz'
  | 'star'
  | 'rocket'
  | 'book'
  | 'brain'
  | 'badge'
  | 'share'
  | 'check'
  | 'target';

interface CategoryIconProps {
  name: IconType;
  className?: string;
  variant?: 'gradient' | 'plain';
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  className = 'w-6 h-6',
  variant = 'gradient',
}) => {
  switch (name) {
    case 'cricket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" className="fill-amber-500/20 stroke-amber-500" strokeWidth="2" />
          <path d="M6 18L18 6" className="stroke-amber-600" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14.5 9.5l3 3" className="stroke-amber-400" strokeWidth="2" strokeLinecap="round" />
          <circle cx="7.5" cy="7.5" r="2" className="fill-rose-500" />
        </svg>
      );
    case 'food':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2a5 5 0 00-5 5v3a5 5 0 0010 0V7a5 5 0 00-5-5z"
            className="fill-orange-500/20 stroke-orange-500"
            strokeWidth="2"
          />
          <path d="M12 10v12" className="stroke-orange-600" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M8 22h8" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'gaming':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="6"
            width="20"
            height="12"
            rx="4"
            className="fill-purple-500/20 stroke-purple-500"
            strokeWidth="2"
          />
          <path d="M6 12h4m-2-2v4" className="stroke-sky-400" strokeWidth="2" strokeLinecap="round" />
          <circle cx="15" cy="11" r="1" className="fill-rose-400" />
          <circle cx="18" cy="13" r="1" className="fill-amber-400" />
        </svg>
      );
    case 'movies':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="3"
            className="fill-rose-500/20 stroke-rose-500"
            strokeWidth="2"
          />
          <path d="M7 5v14M17 5v14M3 9.5h18M3 14.5h18" className="stroke-rose-400" strokeWidth="1.5" />
        </svg>
      );
    case 'music':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="18" r="3" className="fill-emerald-500/30 stroke-emerald-500" strokeWidth="2" />
          <circle cx="18" cy="16" r="3" className="fill-emerald-500/30 stroke-emerald-500" strokeWidth="2" />
          <path d="M9 18V5l12-2v13" className="stroke-emerald-400" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'fitness':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M6 5v14M18 5v14" className="stroke-teal-500" strokeWidth="3" strokeLinecap="round" />
          <path d="M3 8v8M21 8v8" className="stroke-teal-400" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12h12" className="stroke-teal-600" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'fashion':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 7l3-4h6l3 4v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7z"
            className="fill-pink-500/20 stroke-pink-500"
            strokeWidth="2"
          />
          <path d="M9 7a3 3 0 006 0" className="stroke-pink-400" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'travel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 9l10 3 10-3-10-7zM2 17l10 5 10-5M2 13l10 5 10-5"
            className="stroke-indigo-500"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"
            className="fill-amber-400/30 stroke-amber-500"
            strokeWidth="2"
          />
          <path d="M19 15l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2L19 15z" className="fill-amber-400" />
        </svg>
      );
    case 'brain':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4a8 8 0 00-8 8c0 2.5 1.1 4.7 2.9 6.2L6 20a1 1 0 001 1h10a1 1 0 001-1l-.9-1.8A7.96 7.96 0 0020 12a8 8 0 00-8-8z"
            className="fill-purple-500/20 stroke-purple-500"
            strokeWidth="2"
          />
          <path d="M9 10a3 3 0 016 0m-3-6v3" className="stroke-purple-400" strokeWidth="2" />
        </svg>
      );
    case 'trophy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3h12v6a6 6 0 01-12 0V3z"
            className="fill-amber-400/30 stroke-amber-500"
            strokeWidth="2"
          />
          <path d="M9 21h6m-3-6v6M3 6a3 3 0 003 3M21 6a3 3 0 01-3 3" className="stroke-amber-600" strokeWidth="2" />
        </svg>
      );
    case 'rocket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.5c4 0 7.5 3 8 8.5l-4.5 4.5-4-4L16 2.5z"
            className="fill-orange-500/30 stroke-orange-500"
            strokeWidth="2"
          />
          <path d="M7.5 12.5L3 17v4h4l4.5-4.5-4-4z" className="fill-orange-400/20 stroke-orange-400" strokeWidth="2" />
          <circle cx="14.5" cy="9.5" r="1.5" className="fill-amber-300" />
        </svg>
      );
    case 'book':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19.5A2.5 2.5 0 016.5 17H20"
            className="stroke-emerald-500"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
            className="fill-emerald-500/20 stroke-emerald-500"
            strokeWidth="2"
          />
        </svg>
      );
    case 'swap':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M7 10l-4 4 4 4m-4-4h18M17 14l4-4-4-4m4 4H3" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'target':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" className="stroke-rose-500" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" className="fill-rose-500/20 stroke-rose-400" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" className="fill-rose-500" />
        </svg>
      );
    case 'star':
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            className="fill-amber-400/30 stroke-amber-500"
            strokeWidth="2"
          />
        </svg>
      );
  }
};

export default CategoryIcon;
